// Caches the game and its models so it opens instantly and plays offline after the first visit.
const CACHE='zero-division-v3';
const CORE=["./", "index.html", "manifest.webmanifest", "level.json", "icon-192.png", "icon-512.png", "Meshy_AI_Make_a_4_story_office_1022133150_texture.glb", "Meshy_AI_Make_a_futureristic_s_1022125526_texture.glb", "Meshy_AI_Make_a_fictional_game_1022125614_texture.glb", "Meshy_AI_Make_a_futureristic_A_1022125538_texture.glb", "Meshy_AI_Make_style_futuristic_1022125554_texture.glb", "Meshy_AI_Character_output_1.glb", "Meshy_AI_Character_output_2.glb", "Meshy_AI_Character_output_3.glb", "Meshy_AI_Character_output_4.glb", "Meshy_AI_Character_output_5.glb", "Meshy_AI_Character_output_6.glb", "Meshy_AI_Character_output_7.glb"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{
    if(res.ok||res.type==='opaque'){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}
    return res;
  })));
});
