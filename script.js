/* =====================================================
   1. EDIT THIS OBJECT ONLY — the whole site and the
      AI assistant both read from it.
   ===================================================== */
const DATA = {
  name: "Moses Nganga",
  role: "Full-Stack Developer",
  tagline: "I build clean, fast web apps and AI-powered tools that solve real problems.",
  email: "ngangamoses2006@gmail.com",
  location: "Nairobi, Kenya",
  about: [
    "I'm a computer science student and developer who enjoys turning ideas into working products, from inventory systems to AI support bots.",
    "I care about readable code, simple interfaces and shipping projects that people actually use."
  ],
  stats: [["10+","Projects built"],["3","Years coding"],["5","Technologies"],["100%","Curiosity"]],
  skills: [
    { group:"Frontend", level:90, items:["HTML","CSS","JavaScript","React"] },
    { group:"Backend",  level:80, items:["Node.js","Express","Python","FastAPI"] },
    { group:"Databases",level:75, items:["MongoDB","MySQL","PostgreSQL"] },
    { group:"Tools",    level:85, items:["Git","GitHub","Docker","VS Code"] }
  ],
  projects: [
    { name:"E-Commerce Platform", type:"Full Stack", emoji:"🛒", c:["#1e1b4b","#4338ca"],
      desc:"A complete e-commerce solution with product management, shopping cart and payment integration.",
      tech:["React","Node.js","MongoDB","Stripe"], demo:"#", code:"#" },
    { name:"AI Task Manager", type:"SaaS", emoji:"🧠", c:["#064e3b","#10b981"],
      desc:"Smart task manager that uses AI to prioritize and suggest tasks based on user behavior.",
      tech:["Vue.js","Python","FastAPI","TensorFlow"], demo:"#", code:"#" },
    { name:"Social Dashboard", type:"Web App", emoji:"📊", c:["#4a044e","#d946ef"],
      desc:"All-in-one dashboard to manage social accounts, schedule posts and view analytics.",
      tech:["React","Express","PostgreSQL"], demo:"#", code:"#" },
    { name:"Hospital Management System", type:"Full Stack", emoji:"🏥", c:["#082f49","#0ea5e9"],
      desc:"Patient records, appointments and billing in one secure system for clinics.",
      tech:["PHP","MySQL","JavaScript"], demo:"#", code:"#" },
    { name:"Car Marketplace", type:"Web App", emoji:"🚗", c:["#431407","#f97316"],
      desc:"Browse, filter and list vehicles with seller profiles and saved searches.",
      tech:["HTML","CSS","JavaScript","Node.js"], demo:"#", code:"#" },
    { name:"Shop Inventory & Sales", type:"Full Stack", emoji:"📦", c:["#1e293b","#64748b"],
      desc:"Stock tracking, sales records and low-stock alerts for small shops.",
      tech:["React","Node.js","MongoDB"], demo:"#", code:"#" }
  ],
  experience: [
    { when:"2024 – Present", title:"Freelance Developer", place:"Self-employed",
      text:"Building websites and small business tools for local clients." },
    { when:"2023 – 2024", title:"Junior Web Developer (Intern)", place:"Your Company",
      text:"Worked on front-end features and bug fixes in a small team." },
    { when:"2022 – Present", title:"BSc Computer Science", place:"Your University",
      text:"Data structures, algorithms, databases and software engineering." }
  ],
  socials: [["GitHub","https://github.com/"],["LinkedIn","https://linkedin.com/"],["Twitter","https://twitter.com/"]]
};

/* =====================================================
   2. RENDER THE SITE
   ===================================================== */
const $ = s => document.querySelector(s);
const el = (tag, cls, html) => { const e=document.createElement(tag); if(cls) e.className=cls; if(html!==undefined) e.innerHTML=html; return e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

document.title = `${DATA.name} | ${DATA.role}`;
$('#heroName').textContent = DATA.name;
$('#heroTagline').textContent = DATA.tagline;
$('#aboutText').innerHTML = DATA.about.map(p=>`<p>${esc(p)}</p>`).join('');
$('#stats').innerHTML = DATA.stats.map(([n,l])=>`<div class="stat"><b class="grad-text">${esc(n)}</b><span>${esc(l)}</span></div>`).join('');

$('#skillsGrid').innerHTML = DATA.skills.map(s=>`
  <div class="skill-card">
    <h3>${esc(s.group)} <em>${s.level}%</em></h3>
    <div class="bar"><i data-w="${s.level}"></i></div>
    <div class="tags">${s.items.map(i=>`<span class="tag">${esc(i)}</span>`).join('')}</div>
  </div>`).join('');

$('#projectsGrid').innerHTML = DATA.projects.map(p=>`
  <article class="project">
    <div class="thumb" style="background:linear-gradient(135deg,${p.c[0]},${p.c[1]})" aria-hidden="true">${p.emoji}</div>
    <div class="body">
      <div class="top"><h3>${esc(p.name)}</h3><span class="badge">${esc(p.type)}</span></div>
      <p>${esc(p.desc)}</p>
      <div class="tags">${p.tech.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="links"><a href="${esc(p.demo)}">Demo</a><a href="${esc(p.code)}">Code</a></div>
    </div>
  </article>`).join('');

$('#timeline').innerHTML = DATA.experience.map(j=>`
  <div class="job"><small>${esc(j.when)} · ${esc(j.place)}</small><h3>${esc(j.title)}</h3><p>${esc(j.text)}</p></div>`).join('');

$('#socials').innerHTML = DATA.socials.map(([n,u])=>`<a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a>`).join('');
$('#footer').textContent = `© ${new Date().getFullYear()} ${DATA.name}. All rights reserved.`;

// contact form -> opens the visitor's email app (no backend needed)
$('#contactForm').addEventListener('submit', e=>{
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `${f.get('msg')}\n\nFrom: ${f.get('name')} (${f.get('email')})`;
  location.href = `mailto:${DATA.email}?subject=${encodeURIComponent('Portfolio message from '+f.get('name'))}&body=${encodeURIComponent(body)}`;
});

// mobile menu + active link on scroll + skill bars animate when visible
$('#menuBtn').onclick = () => $('#nav').classList.toggle('open');
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));
const links = [...document.querySelectorAll('#nav a')];
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      links.forEach(l=>l.classList.toggle('active', l.getAttribute('href')==='#'+en.target.id));
      if(en.target.id==='skills') document.querySelectorAll('.bar i').forEach(b=>b.style.width=b.dataset.w+'%');
    }
  });
},{threshold:.4});
document.querySelectorAll('main section').forEach(s=>io.observe(s));

/* =====================================================
   3. AI ASSISTANT
   Answers come from DATA using keyword matching, so it
   works offline and needs no API key. To use a real LLM,
   replace the body of getReply() with a fetch() to YOUR
   backend (never put an API key in this file).
   ===================================================== */
const chat = $('#chat'), msgs = $('#msgs'), input = $('#chatInput');
const SUGGEST = ["Skills","Projects","Experience","Contact","About"];

function addMsg(text, who){
  const m = el('div','m '+who);
  // allow **bold** only, after escaping everything else
  m.innerHTML = esc(text).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
  msgs.appendChild(m); msgs.scrollTop = msgs.scrollHeight; return m;
}

const INTENTS = [
  { keys:["skill","tech","stack","expert","expertise","know","language","proficien"], reply: () =>
    "**Technical skills**\n" + DATA.skills.map(s=>`• ${s.group} (${s.level}%): ${s.items.join(", ")}`).join("\n") },
  { keys:["project","built","build","portfolio","work","app"], reply: () =>
    "**Featured projects**\n" + DATA.projects.map(p=>`• ${p.name} (${p.type}): ${p.desc} Tech: ${p.tech.join(", ")}.`).join("\n") },
  { keys:["experience","job","career","education","study","degree","university","intern"], reply: () =>
    "**Experience & education**\n" + DATA.experience.map(j=>`• ${j.when}: ${j.title}, ${j.place}. ${j.text}`).join("\n") },
  { keys:["contact","email","reach","hire","touch","social","github","linkedin","available"], reply: () =>
    `You can reach ${DATA.name} at **${DATA.email}**, or use the contact form at the bottom of this page.\n` +
    DATA.socials.map(([n,u])=>`• ${n}: ${u}`).join("\n") },
  { keys:["about","who","yourself","bio","person","location","where","from"], reply: () =>
    `**${DATA.name}** is a ${DATA.role} based in ${DATA.location}.\n${DATA.about.join(" ")}` },
  { keys:["hi","hello","hey","howdy","sup"], reply: () =>
    `Hi! I'm the assistant for ${DATA.name}'s portfolio. Ask about skills, projects, experience or how to get in touch.` }
];

function getReply(q){
  const t = q.toLowerCase();
  // project name mentioned? answer about that project
  const p = DATA.projects.find(p=>t.includes(p.name.toLowerCase()) || p.name.toLowerCase().split(" ").filter(w=>w.length>4).some(w=>t.includes(w)));
  if(p) return `**${p.name}** (${p.type}): ${p.desc}\nBuilt with ${p.tech.join(", ")}.`;
  // tech mentioned? list projects that use it
  const techs = [...new Set(DATA.projects.flatMap(p=>p.tech).concat(DATA.skills.flatMap(s=>s.items)))];
  const hit = techs.find(x=>new RegExp('\\b'+x.replace(/[.+]/g,'\\$&')+'\\b','i').test(q));
  if(hit){
    const used = DATA.projects.filter(p=>p.tech.some(x=>x.toLowerCase()===hit.toLowerCase())).map(p=>p.name);
    return used.length ? `Yes, ${hit} is part of the toolkit. It's used in: ${used.join(", ")}.` : `${hit} is on the skills list.`;
  }
  // score intents
  let best=null, score=0;
  INTENTS.forEach(i=>{ const s=i.keys.filter(k=>t.includes(k)).length; if(s>score){score=s;best=i;} });
  if(best) return best.reply();
  return "I can only answer questions about this portfolio. Try asking about skills, projects, experience or contact details.";
}

function ask(q){
  q = q.trim(); if(!q) return;
  addMsg(q,'me');
  const typing = addMsg('Typing…','bot'); typing.classList.add('typing');
  setTimeout(()=>{ typing.remove(); addMsg(getReply(q),'bot'); }, 450);
}

$('#chips').innerHTML = SUGGEST.map(s=>`<button class="chip" type="button">${s}</button>`).join('');
$('#chips').addEventListener('click', e=>{ if(e.target.classList.contains('chip')) ask(e.target.textContent); });
$('#chatForm').addEventListener('submit', e=>{ e.preventDefault(); ask(input.value); input.value=''; });

function toggleChat(open){
  chat.classList.toggle('open', open);
  if(open){
    if(!msgs.children.length) addMsg(`👋 Hi there! I'm your AI assistant. Ask me anything about ${DATA.name}'s skills, projects, experience, or how to get in touch.`,'bot');
    input.focus();
  }
}
$('#openChat').onclick = () => toggleChat(!chat.classList.contains('open'));
$('#closeChat').onclick = () => toggleChat(false);
document.addEventListener('keydown', e=>{ if(e.key==='Escape') toggleChat(false); });