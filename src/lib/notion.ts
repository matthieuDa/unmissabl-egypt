/**
 * An optional, pure import boundary. No SDK, credentials, network or filesystem.
 * The caller supplies complete Notion page data and the local schema validator.
 * Nothing in the public site imports this module to request live CMS content.
 */
export const editorialCollections = [
  'talents', 'projects', 'sectors', 'destinations', 'media', 'metrics', 'selections',
] as const;

export type EditorialCollection = typeof editorialCollections[number];
type ObjectValue = Record<string, unknown>;
type SimpleKind = 'text' | 'lines' | 'number' | 'boolean' | 'url' | 'date' | 'choice' | 'choices' | 'relation' | 'relations' | 'external-files';

export type NotionField =
  | { kind: SimpleKind; property: string; required?: boolean }
  | { kind: 'localized' | 'localized-lines'; fr: string; en: string; required?: boolean };

export type NotionMapping<T extends { id: string }> = {
  collection: EditorialCollection;
  /** A property name or stable Notion property ID. */
  idProperty?: string;
  publishProperty?: string;
  fields: Readonly<Record<string, NotionField>>;
  /** Fully resolved Notion page ID -> local content ID, across all collections. */
  relationIds?: Readonly<Record<string, string>>;
  /** Must validate the complete local record; for example a collection schema's parse method. */
  validate: (record: ObjectValue) => T;
};

export type NotionMapped<T> =
  | { status: 'mapped'; record: T; source: { pageId: string; lastEditedTime?: string } }
  | { status: 'skipped'; reason: 'archived' | 'unpublished' }
  | { status: 'invalid'; issues: string[] };

function object(value: unknown): ObjectValue | undefined {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? value as ObjectValue : undefined;
}

function property(properties: ObjectValue, key: string): ObjectValue | undefined {
  const direct = object(properties[key]);
  return direct || Object.values(properties).map(object).find((entry) => entry?.id === key);
}

function error(message: string): never {
  throw new Error(message);
}

function textValue(value: ObjectValue, key: string): string {
  if (value.type !== 'title' && value.type !== 'rich_text') error(`${key}: expected title or rich_text.`);
  const fragments = value[value.type as string];
  if (!Array.isArray(fragments)) error(`${key}: missing text fragments.`);
  return fragments.map((fragment: unknown) => {
    const item = object(fragment);
    const content = item?.plain_text ?? object(item?.text)?.content;
    if (typeof content !== 'string') error(`${key}: incomplete text fragment.`);
    return content;
  }).join('').trim();
}

function httpsUrl(value: unknown, key: string): string | undefined {
  if (value === null || value === undefined || value === '') return undefined;
  if (typeof value !== 'string') error(`${key}: expected URL text.`);
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') error(`${key}: only stable HTTPS URLs are accepted.`);
    return url.href;
  } catch {
    return error(`${key}: expected a valid HTTPS URL.`);
  }
}

function empty(value: unknown): boolean {
  return value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
}

function readValue(properties: ObjectValue, key: string, kind: SimpleKind, relationIds: Readonly<Record<string, string>>): unknown {
  const value = property(properties, key);
  if (!value) return undefined;
  if (value.has_more === true) error(`${key}: paginated property is incomplete; hydrate it before mapping.`);
  const expectType = (...types: string[]) => {
    if (!types.includes(String(value.type))) error(`${key}: expected ${types.join(' or ')}, received ${String(value.type)}.`);
  };
  switch (kind) {
    case 'text': return textValue(value, key);
    case 'lines': return textValue(value, key).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    case 'number': {
      expectType('number');
      if (value.number === null) return undefined;
      if (typeof value.number !== 'number' || !Number.isFinite(value.number)) error(`${key}: expected a finite number.`);
      return value.number;
    }
    case 'boolean':
      expectType('checkbox');
      if (typeof value.checkbox !== 'boolean') error(`${key}: expected a checkbox value.`);
      return value.checkbox;
    case 'url':
      expectType('url');
      return httpsUrl(value.url, key);
    case 'date': {
      expectType('date');
      if (value.date === null) return undefined;
      const date = object(value.date)?.start;
      if (typeof date !== 'string' || !Number.isFinite(Date.parse(date))) error(`${key}: expected an ISO date.`);
      return date;
    }
    case 'choice': {
      expectType('select', 'status');
      const selected = value[String(value.type)];
      if (selected === null) return undefined;
      const name = object(selected)?.name;
      if (typeof name !== 'string') error(`${key}: missing selected option name.`);
      return name;
    }
    case 'choices': {
      expectType('multi_select');
      if (!Array.isArray(value.multi_select)) error(`${key}: missing selected options.`);
      return value.multi_select.map((option: unknown) => {
        const name = object(option)?.name;
        if (typeof name !== 'string') error(`${key}: missing option name.`);
        return name;
      });
    }
    case 'relation':
    case 'relations': {
      expectType('relation');
      if (!Array.isArray(value.relation)) error(`${key}: missing relations.`);
      const ids = value.relation.map((item: unknown) => {
        const id = object(item)?.id;
        if (typeof id !== 'string' || !Object.hasOwn(relationIds, id)) error(`${key}: unresolved related page; include and validate its collection first.`);
        return relationIds[id];
      });
      if (kind === 'relations') return [...new Set(ids)];
      if (ids.length > 1) error(`${key}: expected one relation at most.`);
      return ids[0];
    }
    case 'external-files': {
      expectType('files');
      if (!Array.isArray(value.files)) error(`${key}: missing file list.`);
      return value.files.map((item: unknown) => {
        const file = object(item);
        if (file?.type !== 'external') error(`${key}: Notion-hosted files expire; provide a stable external media URL.`);
        const url = httpsUrl(object(file.external)?.url, key);
        if (!url) error(`${key}: missing external file URL.`);
        return { name: typeof file.name === 'string' ? file.name : '', url };
      });
    }
  }
}

/**
 * Map whitelisted properties only. Page blocks, contact data, access tokens,
 * comments and unrelated/private columns are deliberately not copied.
 */
export function mapNotionPage<T extends { id: string }>(input: unknown, mapping: NotionMapping<T>): NotionMapped<T> {
  const page = object(input);
  const properties = object(page?.properties);
  if (page?.object !== 'page' || typeof page.id !== 'string' || !properties) {
    return { status: 'invalid', issues: ['Expected a complete Notion page with an id and properties.'] };
  }
  if (page.archived === true || page.in_trash === true) return { status: 'skipped', reason: 'archived' };
  const prefix = `${mapping.collection}/${page.id}`;
  try {
    const publishKey = mapping.publishProperty || 'Publish';
    const publish = readValue(properties, publishKey, 'boolean', {});
    if (publish === undefined) error(`${publishKey}: an explicit publish checkbox is required.`);
    if (!publish) return { status: 'skipped', reason: 'unpublished' };
    const idKey = mapping.idProperty || 'Slug';
    const id = readValue(properties, idKey, 'text', {});
    if (typeof id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) error(`${idKey}: expected a stable lowercase slug.`);
    const record: ObjectValue = { id };
    for (const [field, rule] of Object.entries(mapping.fields)) {
      if (['id', '__proto__', 'constructor', 'prototype'].includes(field)) error(`${field}: reserved output key.`);
      let value: unknown;
      if ('fr' in rule) {
        const kind = rule.kind === 'localized' ? 'text' : 'lines';
        const fr = readValue(properties, rule.fr, kind, {});
        const en = readValue(properties, rule.en, kind, {});
        if (empty(fr) && empty(en) && !rule.required) continue;
        if (empty(fr) || empty(en)) error(`${field}: both FR and EN are required.`);
        value = { fr, en };
      } else {
        value = readValue(properties, rule.property, rule.kind, mapping.relationIds || {});
        if (rule.required && empty(value)) error(`${field}: required value is missing.`);
        if (empty(value)) continue;
      }
      record[field] = value;
    }
    const validated = mapping.validate(record);
    if (validated.id !== id) error('The local validator must preserve the stable content id.');
    return {
      status: 'mapped',
      record: validated,
      source: {
        pageId: page.id,
        ...(typeof page.last_edited_time === 'string' ? { lastEditedTime: page.last_edited_time } : {}),
      },
    };
  } catch (cause) {
    return { status: 'invalid', issues: [`${prefix}: ${cause instanceof Error ? cause.message : 'Local schema validation failed.'}`] };
  }
}

/** Atomic collection result: an invalid/duplicate record prevents a partial replacement. */
export function mapNotionPages<T extends { id: string }>(pages: readonly unknown[], mapping: NotionMapping<T>):
  | { status: 'valid'; records: T[]; skipped: number }
  | { status: 'invalid'; issues: string[]; skipped: number } {
  const records: T[] = [];
  const issues: string[] = [];
  const seen = new Set<string>();
  let skipped = 0;
  for (const page of pages) {
    const result = mapNotionPage(page, mapping);
    if (result.status === 'skipped') skipped += 1;
    else if (result.status === 'invalid') issues.push(...result.issues);
    else if (seen.has(result.record.id)) issues.push(`${mapping.collection}: duplicate id ${result.record.id}.`);
    else {
      seen.add(result.record.id);
      records.push(result.record);
    }
  }
  return issues.length ? { status: 'invalid', issues, skipped } : { status: 'valid', records, skipped };
}
