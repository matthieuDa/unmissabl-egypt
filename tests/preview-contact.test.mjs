import test from 'node:test';import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';import {once} from 'node:events';import {createServer} from 'node:net';
import {readFile,unlink} from 'node:fs/promises';import {resolve} from 'node:path';

test('local preview accepts a real HTTP POST and saves a private brief file',async()=>{
 const probe=createServer();probe.listen(0,'127.0.0.1');await once(probe,'listening');const port=probe.address().port;await new Promise(resolve=>probe.close(resolve));
 const child=spawn(process.execPath,['scripts/preview-contact.mjs'],{cwd:process.cwd(),env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});
 const startup=new Promise((resolve,reject)=>{child.stdout.once('data',resolve);child.once('error',reject);child.once('exit',code=>reject(Error('Preview exited '+code)));});
 let reference;
 try{
  await Promise.race([startup,new Promise((_,reject)=>setTimeout(()=>reject(Error('Startup timeout')),5000).unref())]);
  const origin=`http://127.0.0.1:${port}`;const response=await fetch(origin+'/api/contact',{method:'POST',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify({brand:'LOCAL TEST',name:'Test',email:'test@example.com',need:'Automated local preview test',language:'en'})});
  assert.equal(response.status,200);const result=await response.json();assert.equal(result.mode,'local');reference=result.reference;
  const saved=JSON.parse(await readFile(resolve('.local/contacts',reference+'.json'),'utf8'));assert.equal(saved.brand,'LOCAL TEST');assert.equal(saved.email,'test@example.com');
  assert.equal((await fetch(origin+'/.local/contacts/'+reference+'.json')).status,404);
  assert.equal((await fetch(origin+'/api/contact',{method:'POST',headers:{origin:'https://evil.example','Content-Type':'application/json'},body:'{}'})).status,403);
 }finally{if(reference)await unlink(resolve('.local/contacts',reference+'.json'));child.kill('SIGTERM');await once(child,'exit');}
});
