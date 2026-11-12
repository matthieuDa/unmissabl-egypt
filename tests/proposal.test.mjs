import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {moneyCents,lineTotal,totals,parseProposal,proposalPresets,proposalCopy} from '../src/data/proposal.ts';
const line=(quantity,unitPrice,description='Film')=>({description,quantity,unitPrice});
const draft={version:1,lang:'fr',client:'Client',contact:'',title:'Production',sector:'hotel',location:'France',period:'Printemps 2027',validity:'30 jours',objective:'',rights:'',terms:'',vat:'20',lines:[line('1','100')]};
test('currency parsing accepts French decimal notation and preserves cent precision',()=>{
 assert.equal(moneyCents('0,10'),10);assert.equal(moneyCents('12.3'),1230);assert.equal(moneyCents(' 1490.99 '),149099);assert.equal(moneyCents('0'),0);
 for(const bad of ['', '-100', '1e3', '1.001', 'Infinity', '<img>', '1000001'])assert.equal(moneyCents(bad),null,bad);
});
test('totals include rounded VAT without floating-point money drift',()=>{
 assert.deepEqual(totals([line('3','0.10'),line('1','19.99')],'20'),{subtotal:2029,tax:406,total:2435,rate:20});
 assert.equal(lineTotal(line('0','100')),null);assert.equal(lineTotal(line('1.5','100')),null);assert.equal(lineTotal(line('1','100',' ')),null);
});
test('unspecified prices are not silently treated as free; unspecified tax is not an exemption',()=>{
 assert.deepEqual(totals([line('1','')],'20'),{subtotal:null,tax:null,total:null,rate:20});
 assert.deepEqual(totals([line('1','2500')],''),{subtotal:250000,tax:null,total:null,rate:null});
 assert.deepEqual(totals([line('1','0')],'0'),{subtotal:0,tax:0,total:0,rate:0});
 assert.equal(totals([line('1','100')],'101').total,null);
});
test('draft files reject malformed, oversized or unbounded records',()=>{
 assert.deepEqual(parseProposal(draft),draft);
 for(const bad of [null,[],{}, {...draft,version:2},{...draft,lang:'de'},{...draft,client:'a'.repeat(201)},{...draft,lines:[]},{...draft,lines:Array.from({length:16},()=>line('1','1'))},{...draft,lines:[{description:'x',quantity:1,unitPrice:'1'}]}])assert.throws(()=>parseProposal(bad));
});
test('import strips extra properties and treats markup as plain data',()=>{
 const value=parseProposal({...draft,client:'<img src=x onerror=alert(1)>',secret:'discard',lines:[{...line('1','10'),html:'discard'}]});
 assert.equal(value.client,'<img src=x onerror=alert(1)>');assert.equal('secret'in value,false);assert.equal('html'in value.lines[0],false);
 const source=readFileSync(new URL('../src/scripts/proposal.ts',import.meta.url),'utf8');assert.ok(!source.includes('innerHTML'));assert.ok(source.includes('textContent'));
});
test('all five sector presets and editor labels exist in both languages',()=>{
 assert.equal(Object.keys(proposalPresets).length,5);
 for(const p of Object.values(proposalPresets))for(const lang of ['fr','en']){assert.ok(p.name[lang]);assert.ok(p.objective[lang]);assert.ok(p.lines[lang].length>=3);}
 assert.deepEqual(Object.keys(proposalCopy.fr).sort(),Object.keys(proposalCopy.en).sort());
});
