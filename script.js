// ======================
// Utilities & On-Load
// ======================
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// Year
$('#year').textContent = new Date().getFullYear();

// ======================
// Theme Toggle (Light/Dark)
// ======================
const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'light'){ document.body.classList.add('light'); }

function setIcon(){
  themeToggle.innerHTML = document.body.classList.contains('light')
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}
setIcon();

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  setIcon();
});

// ======================
/* Smooth Scroll for Nav */
// ======================
$$('.nav a, .footer a').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      $(href)?.scrollIntoView({ behavior:'smooth', block:'start' });
    }
  });
});

// ======================
// Typewriter Effect
// ======================
(function typewriter(){
  const el = $('#typewriter');
  const words = JSON.parse(el.getAttribute('data-words'));
  let idx = 0, ch = 0, dir = 1, pause = 0;

  function tick(){
    if(pause > 0){ pause--; return requestAnimationFrame(tick); }
    const word = words[idx];
    ch += dir;
    el.textContent = word.slice(0, ch);

    if(ch === word.length){ dir = -1; pause = 40; } // hold when full
    if(ch === 0){ dir = 1; idx = (idx + 1) % words.length; pause = 12; }

    setTimeout(tick, 40);
  }
  tick();
})();

// ======================
// Animate Skill Bars on View
// ======================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      $$('.bar span', entry.target).forEach(span => {
        const level = span.getAttribute('data-level');
        span.style.width = level + '%';
      });
      observer.unobserve(entry.target);
    }
  });
},{ threshold: 0.3 });

$$('.skill').forEach(s => observer.observe(s));

// ======================
// Contact Form (basic)
// ======================
$('#contactForm').addEventListener('submit', (e) => {
  // Let mailto handle it, but do a tiny validation
  const name = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const message = e.target.message.value.trim();
  if(!name || !email || !message){
    e.preventDefault();
    alert('Please fill all fields.');
  }
});
