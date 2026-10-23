// Family data and authenticated pages are never put in an offline cache.
self.addEventListener('install',event=>{self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(self.clients.claim())});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||event.request.mode!=='navigate'||url.origin!==self.location.origin)return;
 event.respondWith(fetch(event.request).catch(()=>new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#2d5b46"><title>Kinship · Offline</title><style>body{font:16px/1.7 system-ui;background:#f7f7f2;color:#253d34;display:grid;place-items:center;min-height:90vh;margin:0}main{max-width:360px;padding:28px}h1{font:38px Georgia}a{display:inline-block;background:#2d5b46;color:white;padding:10px 22px;border-radius:10px;text-decoration:none}</style><main><h1>A little pause.</h1><p>You’re offline. Reconnect to open your family calendar and sync the latest plans.</p><a href="">Try again</a></main></html>`,{status:503,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})));
});
