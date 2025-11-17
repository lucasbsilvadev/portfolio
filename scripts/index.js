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

// Função para ativar/desativar o modo claro/escuro
function toggleDarkMode() {
    body.classList.toggle('light-mode');

    // Salva a preferência do usuário no localStorage
    localStorage.setItem('darkMode', body.classList.contains('light-mode') ? 'disabled' : 'enabled');
    
    // Atualiza as partículas quando o modo muda
    updateParticlesColor();
}

// Aplica o modo escuro se estiver salvo no localStorage (modo escuro é padrão)
if (localStorage.getItem('darkMode') !== 'disabled') {
    body.classList.remove('light-mode');
} else {
    body.classList.add('light-mode');
}

// Atualiza o texto do botão
function updateDarkModeButton() {
    if (toggleDarkModeBtn) {
        toggleDarkModeBtn.textContent = body.classList.contains('light-mode') ? 'DARK MODE 🌙' : 'LIGHT MODE ☀️';
    }
}

// Adiciona evento ao botão do modo escuro, se existir
if (toggleDarkModeBtn) {
    toggleDarkModeBtn.addEventListener('click', function() {
        toggleDarkMode();
        updateDarkModeButton();
    });
    updateDarkModeButton();
}

// Preloader - CORRIGIDO
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  
  // Garante que o preloader esteja visível e sobre todos os elementos
  preloader.style.display = 'flex';
  preloader.style.zIndex = '10000';
  
  // Adiciona a classe fade-out após um pequeno delay
  setTimeout(() => {
    preloader.classList.add("fade-out");
  }, 500);

  // Remove o preloader após a animação
  setTimeout(() => {
    preloader.remove();
  }, 1100); // tempo igual ao da transição CSS + delay
});

// Efeito de digitação no Header - CORRIGIDO
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
  setTimeout(type, 900); // Espera o preloader sumir
});

// Funcionamento das partículas canvas - CORRIGIDO
const canvas = document.getElementById('particles-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    initCanvas();

    let particles = [];

    function createParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2 + 1,
            });
        }
    }

    createParticles();

    // Função para atualizar a cor das partículas baseada no modo
    function updateParticlesColor() {
        // A animação será atualizada automaticamente no próximo frame
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
            // Cor das partículas baseada no modo atual
            ctx.fillStyle = body.classList.contains('light-mode') ? '#0f0f0f' : '#ffffff';
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();

    // Redimensionar canvas quando a janela for redimensionada
    window.addEventListener('resize', function() {
        initCanvas();
        createParticles();
    });
}

// Barra de progresso interativa do scroll
window.addEventListener("scroll", () => {
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    }
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

// Tilt nos cards - COM VERIFICAÇÃO DE SEGURANÇA
if (typeof VanillaTilt !== 'undefined') {
    const tiltElements = document.querySelectorAll(".skills__item, .projects__reversed-list");
    if (tiltElements.length > 0) {
        VanillaTilt.init(tiltElements, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3
        });
    }
}

// Modal de Skills - COM VERIFICAÇÕES
const skillModal = document.getElementById('skill-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.getElementById('modal-close');

if (skillModal && modalImg && modalTitle && modalDesc && modalClose) {
    const skillItems = document.querySelectorAll('.skills__item');

    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3');
            const desc = item.querySelector('p');

            if (img && title && desc) {
                modalImg.src = img.src;
                modalTitle.textContent = title.textContent;
                modalDesc.textContent = desc.textContent;
                skillModal.classList.remove('hidden');
            }
        });
    });

    modalClose.addEventListener('click', () => {
        skillModal.classList.add('hidden');
    });

    // Fecha ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === skillModal) {
            skillModal.classList.add('hidden');
        }
    });

    // Fecha com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !skillModal.classList.contains('hidden')) {
            skillModal.classList.add('hidden');
        }
    });
}

// Smooth scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});