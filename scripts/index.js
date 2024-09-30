// Selecionando os elementos corretos
const navbar = document.querySelector('.navbar'); // Seleciona o elemento da navbar
const mobileNavbar = document.querySelector('.mobile__links'); // Seleciona os links do menu móvel
const button = document.querySelector('.burger'); // Seleciona o botão do menu móvel

// Adicionando o evento de clique para o botão do menu móvel
button.addEventListener('click', function() {
    mobileNavbar.classList.toggle('active'); // Ativa/desativa a exibição do menu móvel
    button.classList.toggle('is-active'); // Altera o estado do botão de burger para mostrar o ícone de close
});

// Adicionando o evento de scroll para a navbar
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) { // Alterar o valor de 0 para 50 para uma transição mais sutil
        navbar.classList.add('active'); // Adiciona a classe 'active' quando rola para baixo
    } else {
        navbar.classList.remove('active'); // Remove a classe 'active' quando rola para o topo
    }
});
