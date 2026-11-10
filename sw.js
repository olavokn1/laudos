// Estação de Laudos: disponível offline. Busca na rede primeiro (para receber atualizações) e usa a cópia salva quando não há conexão.
const CACHE="laudos-v5";
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(["./","./index.html","./visualizador/","./visualizador/index.html","./manifest.webmanifest","./visualizador/manifest.webmanifest","./icons/estacao.svg","./icons/visor.svg","./icons/estacao-192.png","./icons/visor-192.png"])).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET"||new URL(r.url).origin!==location.origin) return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res})
    .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("./index.html"))));
});
