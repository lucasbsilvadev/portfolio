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
