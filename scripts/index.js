// Selecionando elementos
const navbar = document.querySelector('.navbar');
const mobileNavbar = document.querySelector('.mobile__links');
const button = document.querySelector('.burger');
const toggleDarkModeBtn = document.getElementById('toggleDarkModeBtn');
const body = document.body;

// Verifica se o botão existe antes de adicionar eventos
if (button) {
    button.addEventListener('click', function() {
        mobileNavbar.classList.toggle('active');
        button.classList.toggle('is-active');
    });
}

// Evento de scroll para modificar a navbar
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) {
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
});

// Função para ativar/desativar o dark mode
function toggleDarkMode() {
    body.classList.toggle('dark-mode');

    // Salva a preferência do usuário no localStorage
    localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
}

// Aplica o dark mode se estiver salvo no localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
}

// Adiciona evento ao botão do modo escuro, se existir
if (toggleDarkModeBtn) {
    toggleDarkModeBtn.addEventListener('click', toggleDarkMode);
}

// Preloader
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("fade-out");

  // remove a animação 
  setTimeout(() => {
    preloader.remove();
  }, 600); // tempo igual ao da transição CSS
});

//Efeito de digitação no Header
const typingElement = document.querySelector('.typing');
const text = "Olá! Sou Lucas Barbosa, Desenvolvedor Web";
let index = 0;

function type() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 60); // Velocidade da digitação
  }
}

window.addEventListener("load", () => {
  setTimeout(type, 400); // Espera o preloader sumir
});

// Funcionamento das partículas canvas
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    radius: Math.random() * 2 + 1,
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    // colisão nas bordas
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0f0f0f';
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

// Barra de progresso interativa do scroll

window.addEventListener("scroll", () => {
  const progressBar = document.getElementById("scroll-progress");
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${scrollPercent}%`;
});

// Scroll Reveal
const reveals = document.querySelectorAll('.scroll-reveal');

function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Aplica Tilt nos cards
VanillaTilt.init(document.querySelectorAll(".skills__item, .projects__reversed-list"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.3
});
