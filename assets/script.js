document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click', ()=> btn.parentElement.classList.toggle('open'));
});
const io = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const chatbotData = {
  default:{
    intro:"Szia! Segítek eligazodni az árak, határidő, funkciók, domain, tárhely és a megfelelő csomag között. Ha leírod, milyen vállalkozásod van, konkrétabbat mondok.",
    price:"Jelenleg 3 csomag érhető el: <b>Alap 29 000 Ft</b>, <b>Standard 49 000 Ft</b>, <b>Prémium 69 000 Ft</b>. Ha külön funkció, több aloldal vagy extra tartalom kell, egyedi ajánlat is kérhető.",
    time:"Általában <b>2–3 napon belül</b> el tud indulni a munka. Egy egyszerű bemutatkozó oldal gyorsabban elkészül, több aloldalnál vagy extra tartalomnál több idő kellhet.",
    features:"A weboldal lehet <b>mobilbarát</b>, tartalmazhat <b>kapcsolati űrlapot</b>, szolgáltatásblokkokat, referencia részt, árakat, GYIK-et, videós blokkot, Google térképet és gyors kapcsolatfelvételi gombokat.",
    contact:"Írhatsz WhatsAppon, e-mailben vagy telefonon is. A megrendelés gomb biztonságosan a saját leveleződet nyitja meg előre kitöltött adatokkal, így gyorsan el tudod küldeni az igényedet.",
    seo:"Igen, a weboldal úgy készülhet, hogy gyors, mobilbarát és Google számára is jól átlátható legyen. Ez segít a bizalomépítésben és abban, hogy könnyebben rád találjanak.",
    pages:"Egy alap bemutatkozó oldal általában tartalmaz <b>főoldalt</b>, szolgáltatás részt, kapcsolat blokkot és ajánlatkérő lehetőséget. Igény szerint lehet több aloldal is.",
    domain:"Domain és tárhely beállításban is tudok segíteni. Ha még nincs saját domained, az induláshoz ezt is meg lehet oldani.",
    design:"A minta teljesen testre szabható: színek, szövegek, képek, gombok, blokkok és a vállalkozásodhoz illő stílus is módosítható.",
    examples:"A mostani minták között van építőipari, autószerelő, éttermi és fogorvosi stílus. Ezek kiindulási alapok, bármelyik átalakítható a te vállalkozásodra.",
    recommend:"Ha gyorsan induló, igényes bemutatkozó oldal kell, általában a <b>Standard</b> csomag a legjobb választás. Ha erősebb megjelenés, több blokk vagy prémium hatás kell, akkor a <b>Prémium</b> éri meg jobban.",
    trust:"A legtöbb érdeklődőt általában ez hozza: <b>jó első benyomás</b>, egyértelmű szolgáltatások, referenciák, gyors kapcsolatfelvétel és mobilbarát megjelenés.",
    fallback:"Ebben is segítek. Írd le nyugodtan egy mondatban, mivel foglalkozol és mire kell az oldal, például: <b>építőipari cégem van, kellene referencia és ajánlatkérő</b> vagy <b>autószerviznek melyik csomag a legjobb</b>."
  },
  epitoipar:{
    intro:"Építőipari sablonhoz kérdezhetsz szolgáltatásokról, referencia blokkról, ajánlatkérésről vagy arról, mit érdemes kiemelni.",
    services:"Építőipari oldalon jól működik a <b>szolgáltatáslista</b>, a munkatípusok, referenciafotók, a régió megjelölése, ügyfélvélemények és a gyors ajánlatkérés.",
    quote:"Építőipari ajánlatkérésnél érdemes megadni például: <b>milyen munkára kérsz ajánlatot</b>, mekkora a terület, melyik településen van, és van-e határidő.",
    tips:"Építőipari oldalnál különösen fontos a <b>bizalomépítés</b>: referenciák, vállalt munkák, gyors elérhetőség és mobilon is jól látható gombok.",
    recommend:"Építőipari vállalkozásnak általában a <b>Standard</b> vagy <b>Prémium</b> csomag a legjobb, mert itt sokat számítanak a referenciák, a szolgáltatásblokkok és az erős megjelenés."
  },
  auto:{
    intro:"Autószerelő sablonhoz kérdezhetsz szolgáltatásokról, időpontkérésről vagy arról, milyen elemek hozzák a legtöbb érdeklődőt.",
    services:"Autószerelő oldalon érdemes kiemelni: <b>diagnosztika, olajcsere, futómű, fék, klíma, időszakos szerviz és gumiszerviz</b>.",
    quote:"Ajánlatkérésnél jó, ha az érdeklődő meg tudja adni a <b>szerviz típusát</b>, az autó típusát és egy rövid hibaleírást.",
    tips:"Autós oldalon sokat segít az <b>azonnali kapcsolatfelvétel</b>, a nyitvatartás és a kiemelt szolgáltatások gyors megmutatása.",
    recommend:"Autószerviznek legtöbbször a <b>Standard</b> csomag az ideális. Ha több szolgáltatást, látványosabb blokkokat és erősebb bizalmi elemeket szeretnél, akkor a <b>Prémium</b> jobb választás."
  },
  etterem:{
    intro:"Éttermes sablonhoz kérdezhetsz étlapról, asztalfoglalásról, nyitvatartásról vagy ajánlatkérő blokkról.",
    services:"Étterem oldalnál jól működik az <b>étlap előnézet</b>, asztalfoglalás, nyitvatartás, különleges ajánlatok és a kapcsolat gomb.",
    quote:"Érdeklődésnél vagy foglalásnál megadható például: <b>hány főre</b>, melyik napra, illetve kell-e rendezvény vagy kiszállítás.",
    tips:"Éttermi oldalon a látványos képek, gyors foglalási lehetőség és a mobilos áttekinthetőség a legerősebb elemek.",
    recommend:"Étteremnek már az <b>Alap</b> csomag is jó indulás lehet, de ha erősebb vizuális megjelenést és több blokkot szeretnél, akkor a <b>Standard</b> ajánlott."
  },
  fogorvos:{
    intro:"Fogorvosi sablonhoz kérdezhetsz kezelésekről, időpontkérésről vagy arról, milyen blokkok erősítik a bizalmat.",
    services:"Fogorvosi oldalon kiemelhető: <b>fogkőeltávolítás, fogfehérítés, tömés, gyökérkezelés, implantátum és időpontkérés</b>.",
    quote:"Ajánlatkérésnél vagy időpontkérésnél megadható a <b>kívánt kezelés</b> és egy rövid panaszleírás is.",
    tips:"Fogorvosi oldalon különösen jól működik az orvos bemutatása, páciensvélemények, kezelési lista és az egyszerű időpontkérés.",
    recommend:"Fogorvosi szolgáltatásnál a <b>Standard</b> vagy <b>Prémium</b> csomag a legerősebb, mert itt kiemelten fontos a bizalom, az igényes megjelenés és a jó struktúra."
  }
};

const pageType = document.body.dataset.page || 'default';
const pageData = chatbotData[pageType] || chatbotData.default;
const chatLaunch = document.getElementById('chatLaunch');
const chatbox = document.getElementById('chatbox');
const chatBody = document.getElementById('chatBody');
const chatText = document.getElementById('chatText');
const chatSend = document.getElementById('chatSend');
const chatClose = document.getElementById('chatClose');
const quoteForm = document.getElementById('quoteForm');

function addBubble(text, who='bot'){
  if (!chatBody) return;
  const div = document.createElement('div');
  div.className = 'bubble ' + who;
  div.innerHTML = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function normalize(text){
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function detectBusinessType(text){
  const t = normalize(text);
  if (/(epito|burkolo|kivitelezo|szigeteles|festo|asztalos|tetofedo|villanyszerelo|vizszerelo)/.test(t)) return 'epitoipar';
  if (/(auto|autoszerelo|szerviz|diagnosztika|gumiszerviz|olajcsere|fek|futomu)/.test(t)) return 'auto';
  if (/(etterem|bistro|kavezo|pizzeria|hamburger|etel|etlap|asztalfoglalas)/.test(t)) return 'etterem';
  if (/(fogorvos|fogaszat|fogfeherites|implantatum|fogko|gyokerkezeles)/.test(t)) return 'fogorvos';
  return pageType in chatbotData ? pageType : 'default';
}

function packageAdvice(text, type){
  const t = normalize(text);
  const data = chatbotData[type] || chatbotData.default;
  if (/(melyik csomag|melyiket ajanlod|ajanlj|melyik eri meg|melyik jobb)/.test(t)) return data.recommend || chatbotData.default.recommend;
  if (/(olcso|legolcsobb|alap csomag)/.test(t)) return "Ha a cél egy gyors, kulturált online jelenlét, az <b>Alap 29 000 Ft</b> jó indulás. Ha több bizalomépítő blokk is kell, inkább a <b>Standard</b> csomagot ajánlom.";
  if (/(premium|legerosebb|komolyabb|tobb funkcio|tobb blokk)/.test(t)) return "Ha komolyabb megjelenést szeretnél több tartalommal és erősebb bizalomépítéssel, akkor a <b>Prémium 69 000 Ft</b> a legerősebb választás.";
  return '';
}

function buildContextReply(type){
  const data = chatbotData[type] || chatbotData.default;
  return (data.recommend || chatbotData.default.recommend) + "<br><br>" + (data.tips || chatbotData.default.trust);
}

function detailedNeedReply(msg, type){
  const t = normalize(msg);
  const data = chatbotData[type] || chatbotData.default;
  if (/(epito|burkolo|kivitelezo|szigeteles|festo|asztalos|tetofedo|villanyszerelo|vizszerelo)/.test(t)) {
    return "Építőipari vállalkozásnál általában ezek a legerősebb elemek: <b>szolgáltatáslista</b>, <b>referenciaképek</b>, <b>települések/régió</b>, <b>gyors ajánlatkérés</b> és mobilon jól látható kapcsolat gomb. Ha sok referenciád van, a <b>Standard</b> vagy <b>Prémium</b> csomag jobb választás.";
  }
  if (/(auto|autoszerelo|szerviz|diagnosztika|gumiszerviz|olajcsere|fek|futomu)/.test(t)) {
    return "Autószerviznek jól működik a <b>szolgáltatások</b> blokk, <b>nyitvatartás</b>, <b>időpontkérés</b>, márkák vagy típusok felsorolása és az azonnali kapcsolatfelvétel. Itt legtöbbször a <b>Standard</b> csomag a legjobb ár-érték arányú.";
  }
  if (/(etterem|bistro|kavezo|pizzeria|hamburger|etel|etlap|asztalfoglalas)/.test(t)) {
    return "Étteremhez a látványos képek, <b>étlap vagy kínálat</b>, <b>nyitvatartás</b>, térkép és <b>asztalfoglalás / kapcsolat</b> a legfontosabb. Ha a látvány is nagyon számít, a <b>Standard</b> csomag erősebb indulás.";
  }
  if (/(fogorvos|fogaszat|fogfeherites|implantatum|fogko|gyokerkezeles)/.test(t)) {
    return "Fogorvosi oldalnál a bizalom a legfontosabb: <b>kezelések</b>, <b>orvos bemutatása</b>, <b>vélemények</b>, <b>időpontkérés</b> és igényes megjelenés. Itt általában a <b>Standard</b> vagy <b>Prémium</b> csomag a jobb választás.";
  }
  return buildContextReply(type);
}

function smartReply(msg){
  const t = normalize(msg);
  const type = detectBusinessType(msg);
  const data = chatbotData[type] || chatbotData.default;
  const packageHint = packageAdvice(msg, type);

  if (/(szia|hello|hali|jo napot)/.test(t)) return pageData.intro || chatbotData.default.intro;
  if (/(mit ajanlasz|mit javasolsz|segits valasztani|nem tudom melyik|melyik legyen)/.test(t)) return buildContextReply(type);
  if (/(vallalkozasom|cegem|szakmam|mivel foglalkozom|mire van szuksegem)/.test(t)) return detailedNeedReply(msg, type);
  if (/(ar|mennyibe|csomag|fizet|koltseg|dij)/.test(t)) return packageHint || chatbotData.default.price;
  if (/(olcso|draga|sporolni|kezdesnek|indulasnak)/.test(t)) return "Kezdésnek az <b>Alap 29 000 Ft</b> is jó lehet, de ha fontos a komolyabb bizalomépítés és több tartalom, a <b>Standard 49 000 Ft</b> szokott a legjobb ár-érték arányú választás lenni.";
  if (/(mennyi ido|mikor|hatarido|elkeszul|keszul el|indul)/.test(t)) return chatbotData.default.time + "<br><br>Ha sürgős, az ajánlatkérésben írd oda, hogy <b>sürgős indulás</b>, így ehhez igazítható az ütemezés.";
  if (/(mit tud|funkcio|tartalmaz|mi van benne|mire kepes)/.test(t)) return chatbotData.default.features;
  if (/(kapcsolat|elerhetoseg|email|telefon|ajanlatkeres|ajanlatot kerek)/.test(t)) return 'Cégweb26 📞 <b>+36 70 429 2162</b><br>💬 WhatsApp: <b>+36 70 429 2162</b><br>✉️ E-mail: <b>cegweb26@gmail.com</b><br><br>Az űrlap nem külső oldalra visz, hanem biztonságosan a saját levelezőt nyitja meg kitöltött adatokkal.';
  if (/(seo|google|kereso|talalat)/.test(t)) return chatbotData.default.seo;
  if (/(oldal|aloldal|mennyi oldal|oldalak)/.test(t)) return chatbotData.default.pages;
  if (/(domain|tarhely|hosting)/.test(t)) return chatbotData.default.domain;
  if (/(design|szin|szinek|stilus|egyedi|testreszab)/.test(t)) return chatbotData.default.design;
  if (/(minta|pelda|referencia|sablon)/.test(t)) return chatbotData.default.examples;
  if (/(szolgaltatas|vallal|kezeles|muvelet|menu|etlap)/.test(t) && data.services) return data.services;
  if (/(ajanlat|idopont|foglal|felmeres)/.test(t) && data.quote) return data.quote;
  if (/(tipp|javaslat|mi fontos|hogyan legyen jobb|jobb erdeklodo|tobb ugyfel|bizalom)/.test(t)) return (data.tips || chatbotData.default.trust) + "<br><br>A legjobb eredményt az hozza, ha fent van egy erős főcím, rövid előnylista, referencia vagy értékelés, és jól látható ajánlatkérő gomb.";
  if (/(epitoipar|autoszerviz|etterem|fogorvos|vallalkozasom|vallalkozom)/.test(t)) return detailedNeedReply(msg, type);

  const words = t.split(/\s+/).filter(Boolean);
  if (words.length <= 2) return 'Írd meg röviden, mivel foglalkozol és milyen weboldalt szeretnél. Például: <b>építőipari cégnek kell modern bemutatkozó oldal</b> vagy <b>autószerviznek kérek gyorsan elkészülő oldalt</b>.';

  return (data.recommend || chatbotData.default.recommend) + "<br><br>" + chatbotData.default.fallback;
}

function ensureStart(){
  if (!chatBody || chatBody.dataset.started) return;
  chatBody.dataset.started = '1';
  addBubble(pageData.intro || chatbotData.default.intro);
}

if (chatLaunch){
  chatLaunch.addEventListener('click', ()=>{
    chatbox.classList.toggle('open');
    const opened = chatbox.classList.contains('open');
    if (opened) ensureStart();
  });
}
if (chatClose){
  chatClose.addEventListener('click', ()=>{
    chatbox.classList.remove('open');
  });
}
document.querySelectorAll('[data-chat]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const q = btn.getAttribute('data-chat');
    if (chatbox && !chatbox.classList.contains('open')) chatbox.classList.add('open');
    ensureStart();
    addBubble(q,'user');
    setTimeout(()=>addBubble(smartReply(q)),250);
  });
});
function sendChat(){
  const v = (chatText?.value || '').trim();
  if (!v) return;
  ensureStart();
  addBubble(v,'user');
  if (chatText) chatText.value = '';
  setTimeout(()=>addBubble(smartReply(v)),280);
}
if (chatSend) chatSend.addEventListener('click', sendChat);
if (chatText) chatText.addEventListener('keydown', e=>{
  if (e.key === 'Enter'){ e.preventDefault(); sendChat(); }
});

document.querySelectorAll('form[data-email-form]').forEach(form=>{
  form.addEventListener('submit', ()=>{
    const submitButton = form.querySelector('[type="submit"]');
    const notice = form.querySelector('.notice');
    if (submitButton){
      submitButton.disabled = true;
      submitButton.textContent = 'Küldés folyamatban…';
    }
    if (notice){
      notice.textContent = 'Az ajánlatkérés küldése folyamatban van. Kérlek, ne zárd be az oldalt.';
      notice.setAttribute('role', 'status');
    }
  });
});


function applyPrefill(template, pack){
  const form = document.getElementById('quoteForm');
  if (!form) return;
  const templateSelect = document.getElementById('templateSelect');
  const packageSelect = document.getElementById('packageSelect');
  if (templateSelect && template){
    const exists = [...templateSelect.options].some(o => o.value === template || o.textContent.trim() === template);
    templateSelect.value = exists ? template : templateSelect.value;
  }
  if (packageSelect && pack){
    const wanted = pack.toLowerCase();
    const match = [...packageSelect.options].find(o => o.value.toLowerCase().includes(wanted) || o.textContent.toLowerCase().includes(wanted));
    if (match) packageSelect.value = match.value;
  }
  const msg = form.querySelector('textarea[name="Üzenet"]');
  if (msg && !msg.value.trim()){
    const bits = [];
    if (template) bits.push(template);
    if (pack) bits.push(pack + ' csomag');
    msg.value = bits.length ? ('Ezt a mintát szeretném: ' + bits.join(', ') + '.') : '';
  }
}

document.querySelectorAll('.js-prefill').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    applyPrefill(btn.dataset.template || '', btn.dataset.package || '');
  });
});

(function prefillFromQuery(){
  const params = new URLSearchParams(window.location.search);
  const template = params.get('template') || '';
  const pack = params.get('csomag') || params.get('package') || '';
  if (template || pack){
    applyPrefill(template, pack);
    const form = document.getElementById('quoteForm');
    if (form){
      setTimeout(()=>form.scrollIntoView({behavior:'smooth', block:'start'}), 120);
    }
  }
})();


// Mobil hamburger menü
(function mobileMenu(){
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  function setOpen(open){
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    menu.inert = !open;
    toggle.textContent = open ? '×' : '☰';
  }

  setOpen(false);

  toggle.addEventListener('click', (event)=>{
    event.stopPropagation();
    setOpen(!menu.classList.contains('open'));
  });

  menu.addEventListener('click', (event)=>{
    const target = event.target.closest('a');
    if (target) setOpen(false);
  });

  document.addEventListener('click', (event)=>{
    if (!menu.classList.contains('open')) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    setOpen(false);
  });

  document.addEventListener('keydown', (event)=>{
    if (event.key === 'Escape' && menu.classList.contains('open')){
      setOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener('resize', ()=>{
    if (window.innerWidth > 980) setOpen(false);
  });
})();
