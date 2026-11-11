import {MAX_LINES,moneyCents,lineTotal,totals,parseProposal,proposalCopy,proposalPresets,type Proposal,type ProposalLine,type ProposalLang} from '../data/proposal';
export function setupProposals(){
 document.querySelectorAll<HTMLElement>('[data-proposal-root]').forEach(root=>{
  if(root.dataset.ready)return;
  root.dataset.ready='true';
  const lang:ProposalLang=root.dataset.lang==='en'?'en':'fr',copy=proposalCopy[lang];
  const form=root.querySelector<HTMLFormElement>('[data-proposal-form]')!;
  const editor=root.querySelector<HTMLElement>('[data-proposal-lines]')!;
  const body=root.querySelector<HTMLElement>('[data-document-lines]')!;
  const status=root.querySelector<HTMLElement>('[data-proposal-status]')!;
  const add=root.querySelector<HTMLButtonElement>('[data-add-line]')!;
  const formatter=new Intl.NumberFormat(lang==='fr'?'fr-FR':'en-GB',{style:'currency',currency:'EUR'});
  const numberFormatter=new Intl.NumberFormat(lang==='fr'?'fr-FR':'en-GB');
  const money=(cents:number|null)=>cents===null?copy.pending:formatter.format(cents/100);
  const field=(name:string)=>form.elements.namedItem(name) as HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement;
  let lineSequence=0;
  const lines=():ProposalLine[]=>Array.from(editor.querySelectorAll<HTMLElement>('[data-proposal-line]')).map(row=>({description:row.querySelector<HTMLInputElement>('[data-line-description]')!.value,quantity:row.querySelector<HTMLInputElement>('[data-line-quantity]')!.value,unitPrice:row.querySelector<HTMLInputElement>('[data-line-price]')!.value}));
  function state():Proposal {
   const data={version:1,lang,lines:lines()} as Proposal;
   for(const key of ['client','contact','title','sector','location','period','validity','objective','rights','terms','vat'] as const)data[key]=field(key).value;
   return data;
  }
  function announce(text:string){status.textContent=text;}
  function render(){
   const data=state();
   for(const key of ['client','contact','title','location','period','validity','objective','rights','terms'] as const){
    const target=root.querySelector<HTMLElement>(`[data-document="${key}"]`)!;
    target.textContent=data[key].trim()||(key==='client'?copy.clientPlaceholder:key==='title'?copy.titlePlaceholder:copy.notSet);
    if(key==='contact')target.hidden=!data[key].trim();
   }
   root.querySelector<HTMLElement>('[data-document-objective]')!.hidden=!data.objective.trim();
   body.replaceChildren();
   for(const line of data.lines){
    const row=document.createElement('tr');
    for(const text of [line.description.trim()||copy.notSet,line.quantity||'—',money(moneyCents(line.unitPrice)),money(lineTotal(line))]){const cell=document.createElement('td');cell.textContent=text;row.append(cell);}
    body.append(row);
   }
   const sum=totals(data.lines,data.vat);
   root.querySelector('[data-subtotal]')!.textContent=money(sum.subtotal);
   root.querySelector('[data-tax]')!.textContent=sum.tax===null?'—':`${money(sum.tax)} (${numberFormatter.format(sum.rate!)} %)`;
   root.querySelector('[data-total]')!.textContent=money(sum.total);
   root.querySelector<HTMLElement>('[data-total-row]')!.hidden=sum.total===null;
   root.querySelector<HTMLElement>('[data-tax-note]')!.hidden=sum.rate!==null;
   const validation=root.querySelector<HTMLElement>('[data-proposal-validation]')!;
   const invalid=data.lines.some(l=>(l.unitPrice.trim()!==''&&lineTotal(l)===null)||!/^\d{1,4}$/.test(l.quantity)||Number(l.quantity)<1)||(data.vat.trim()!==''&&sum.rate===null);
   validation.hidden=!invalid;validation.textContent=copy.invalid;
   field('vat').setAttribute('aria-invalid',String(data.vat.trim()!==''&&sum.rate===null));
   editor.querySelectorAll<HTMLElement>('[data-proposal-line]').forEach((row,index)=>{const line=data.lines[index];const quantityInvalid=!/^\d{1,4}$/.test(line.quantity)||Number(line.quantity)<1;const priceInvalid=line.unitPrice.trim()!==''&&moneyCents(line.unitPrice)===null;const descriptionInvalid=line.unitPrice.trim()!==''&&!line.description.trim();for(const [selector,invalid]of [['[data-line-quantity]',quantityInvalid],['[data-line-price]',priceInvalid],['[data-line-description]',descriptionInvalid]] as const){const input=row.querySelector<HTMLInputElement>(selector)!;input.setAttribute('aria-invalid',String(invalid));if(invalid)input.setAttribute('aria-describedby','proposal-validation');else input.removeAttribute('aria-describedby');}});
   add.disabled=data.lines.length>=MAX_LINES;
   editor.querySelectorAll<HTMLButtonElement>('[data-remove-line]').forEach(button=>button.disabled=data.lines.length<=1);
  }
  function addLine(line:ProposalLine={description:'',quantity:'1',unitPrice:''}){
   if(editor.childElementCount>=MAX_LINES)return;
   const id=++lineSequence,row=document.createElement('div');row.className='proposal-line-editor';row.dataset.proposalLine='';row.setAttribute('role','group');row.setAttribute('aria-label',`${copy.description} ${id}`);
   const specs=[['description',copy.description,line.description,300],['quantity',copy.quantity,line.quantity,4],['price',copy.price,line.unitPrice,12]] as const;
   for(const [name,labelText,value,maxLength]of specs){
    const label=document.createElement('label'),span=document.createElement('span'),input=document.createElement('input');
    span.textContent=labelText;input.id=`proposal-line-${id}-${name}`;input.value=value;input.maxLength=maxLength;input.setAttribute(`data-line-${name}`,'');
    if(name!=='description')input.inputMode=name==='quantity'?'numeric':'decimal';
    label.append(span,input);row.append(label);
   }
   const remove=document.createElement('button');remove.type='button';remove.textContent=copy.remove;remove.dataset.removeLine='';remove.setAttribute('aria-label',`${copy.remove} ${id}`);remove.addEventListener('click',()=>{const previous=row.previousElementSibling||row.nextElementSibling;row.remove();render();(previous?.querySelector('input') as HTMLInputElement|null)?.focus();});row.append(remove);editor.append(row);
  }
  function fill(data:Proposal){
   for(const key of ['client','contact','title','sector','location','period','validity','objective','rights','terms','vat'] as const)field(key).value=data[key];
   editor.replaceChildren();for(const line of data.lines)addLine(line);render();
  }
  function applyTemplate(){
   const preset=proposalPresets[field('sector').value as keyof typeof proposalPresets];if(!preset)return;
   field('objective').value=preset.objective[lang];editor.replaceChildren();preset.lines[lang].forEach(description=>addLine({description,quantity:'1',unitPrice:''}));render();
  }
  form.addEventListener('submit',event=>event.preventDefault());
  form.addEventListener('input',render);form.addEventListener('change',render);
  root.querySelector('[data-apply-template]')!.addEventListener('click',applyTemplate);
  add.addEventListener('click',()=>{addLine();render();editor.lastElementChild?.querySelector('input')?.focus();});
  root.querySelector('[data-proposal-print]')!.addEventListener('click',()=>{render();window.print();});
  root.querySelector('[data-proposal-download]')!.addEventListener('click',()=>{
   const file=new Blob([JSON.stringify(state(),null,2)],{type:'application/json'}),url=URL.createObjectURL(file),link=document.createElement('a');link.href=url;link.download=`unmissabl-proposal-${lang}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);announce(copy.saved);
  });
  root.querySelector<HTMLInputElement>('[data-proposal-import]')!.addEventListener('change',async event=>{
   const input=event.target as HTMLInputElement,file=input.files?.[0];if(!file)return;
   try{if(file.size>100_000)throw new Error('Size');const data=parseProposal(JSON.parse(await file.text()));if(data.lang!==lang){announce(copy.languageMismatch);return;}fill(data);announce(copy.loaded);}catch{announce(copy.fileError);}finally{input.value='';}
  });
  addLine();
  const sector=new URLSearchParams(location.search).get('sector')||'';
  const aliases:Record<string,string>={hospitality:'hotel',hotels:'hotel',hotellerie:'hotel',haras:'equestrian',automobile:'automotive',resorts:'resort'};
  const preset=aliases[sector]||sector;
  if(Object.hasOwn(proposalPresets,preset)){field('sector').value=preset;applyTemplate();}else render();
 });
}
