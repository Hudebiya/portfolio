// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('.toggle-icon');

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  icon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    icon.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    icon.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  }
});

// ===== TYPEWRITER HERO TEXT =====
const typedText = document.getElementById('typedText');
const message = "building things for the web...";
let i = 0;
function typeWriter() {
  if (i < message.length) {
    typedText.textContent += message.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}
typeWriter();

// ===== GSAP SCROLL REVEALS =====
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.reveal').forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});

// hero entrance
gsap.from(".terminal", { opacity: 0, y: -20, duration: 0.8, ease: "power2.out" });
gsap.from(".hero-title", { opacity: 0, y: 20, duration: 0.8, delay: 0.3, ease: "power2.out" });
gsap.from(".hero-sub", { opacity: 0, y: 20, duration: 0.8, delay: 0.5, ease: "power2.out" });
gsap.from(".hero .btn", { opacity: 0, y: 20, duration: 0.8, delay: 0.7, ease: "power2.out" });

// project card tilt on hover
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, {
      rotationY: x / 20,
      rotationX: -y / 20,
      transformPerspective: 500,
      duration: 0.4,
      ease: "power2.out"
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5, ease: "power3.out" });
  });
});

// ===== SCROLL PROGRESS BAR =====
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out"
    });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  });
});