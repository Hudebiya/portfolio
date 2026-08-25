// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme') || 'dark';
if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('progressBar').style.width = (scrollTop / docHeight) * 100 + '%';
});


// ===== BOOT SEQUENCE (real typewriter) =====
const bootLines = [
  "Booting portfolio_os v1.0...",
  "Loading modules: [html] [css] [javascript] [gsap] ... OK",
  "Connecting to guest@hudebiya ...",
  "Welcome. Type 'help' at the bottom terminal to explore."
];

async function typeLine(text, el) {
  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    await new Promise(r => setTimeout(r, 22));
  }
}

async function runBoot() {
  for (const line of bootLines) {
    const p = document.createElement('p');
    p.style.opacity = 1;
    bootEl.appendChild(p);
    await typeLine(line, p);
    await new Promise(r => setTimeout(r, 350));
  }
  gsap.to(navEl, { opacity: 1, duration: 0.6 });
}
runBoot();

// ===== SCROLL LINKS =====
document.querySelectorAll('.cmd-nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById(link.dataset.target).scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== GSAP SCROLL REVEALS =====
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.reveal').forEach(el => {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 88%" }
  });
});

// ===== INTERACTIVE TERMINAL =====
const input = document.getElementById('terminalInput');
const out = document.getElementById('terminalOutput');

const commands = {
  help: "Available: about, skills, projects, contact, clear",
  about: "HUDEBIYA — Web Developer. Scroll up to ~/about for full bio.",
  skills: "HTML5, CSS3, JavaScript, React, Node.js, Git, GSAP, Figma",
  projects: "See ~/projects section above for full list.",
  contact: "Email: you@email.com — open to work.",
  whoami: "guest (that's you)",
  clear: null
};

input.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const cmd = input.value.trim().toLowerCase();
  input.value = '';

  const echo = document.createElement('p');
  echo.textContent = `$ ${cmd}`;
  echo.style.color = "var(--text)";
  out.appendChild(echo);

  if (cmd === 'clear') {
    out.innerHTML = '';
    return;
  }

  const response = document.createElement('p');
  if (commands[cmd]) {
    response.textContent = commands[cmd];
  } else {
    response.textContent = `command not found: ${cmd} (try 'help')`;
    response.classList.add('err');
  }
  out.appendChild(response);
  out.scrollTop = out.scrollHeight;
});

document.querySelectorAll('.cmd-block').forEach(el => {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 90%" }
  });
});

// ===== PROJECT CAROUSEL =====
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const dotsWrap = document.getElementById('carouselDots');
let current = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(dot);
});
const dots = document.querySelectorAll('.carousel-dots span');

function goToSlide(index) {
  current = (index + slides.length) % slides.length;
  gsap.to(track, { xPercent: -100 * current, duration: 0.5, ease: "power2.inOut" });
  dots.forEach(d => d.classList.remove('active'));
  dots[current].classList.add('active');
}

document.getElementById('prevSlide').addEventListener('click', () => goToSlide(current - 1));
document.getElementById('nextSlide').addEventListener('click', () => goToSlide(current + 1));

// auto-advance every 5s
setInterval(() => goToSlide(current + 1), 5000);