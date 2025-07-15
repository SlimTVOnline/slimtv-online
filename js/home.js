// Função para inicializar o OwlCarousel
function initOwlCarousel() {
    $(document).ready(function() {
        $(".owl-carousel").owlCarousel({
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 4
                }
            }
        });
    });
}

// Função para carregar scripts jQuery e OwlCarousel dinamicamente
function loadScripts() {
    // Carregar jQuery
    let scriptJQuery = document.createElement('script');
    scriptJQuery.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    document.body.appendChild(scriptJQuery);

    // Carregar OwlCarousel somente após o jQuery ser carregado
    scriptJQuery.onload = function() {
        let scriptOwlCarousel = document.createElement('script');
        scriptOwlCarousel.src = "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js";
        document.body.appendChild(scriptOwlCarousel);

        // Inicializar o OwlCarousel após o carregamento
        scriptOwlCarousel.onload = function() {
            initOwlCarousel(); // Inicializa o OwlCarousel
        };
    };
}

// Usando IntersectionObserver para detectar quando a seção está visível
document.addEventListener('DOMContentLoaded', function() {
    const carouselSection = document.querySelector('.top10-filmes-lancamentos-section');

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadScripts(); // Carregar os scripts quando a seção estiver visível
                observer.unobserve(carouselSection); // Parar de observar após o carregamento
            }
        });
    }, {
        threshold: 0.1 // Quando 10% da seção estiver visível
    });

    observer.observe(carouselSection);
});
