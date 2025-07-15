Olá! Entendi perfeitamente o problema. Pela imagem e pela sua descrição, o seletor de período está "travado" no "Mensal". Ao clicar em "Trimestral", "Semestral" ou "Anual", a indicação visual não se move e os preços não são atualizados.

Isso geralmente acontece por uma de duas razões: ou o JavaScript não está sendo carregado corretamente, ou há um erro no próprio código que impede os "ouvintes de clique" (event listeners) de funcionarem.

Vamos resolver isso! Analisei novamente o código e encontrei um detalhe que pode ser a causa do problema, relacionado a como o seletor visual (a barra deslizante) funciona. O seu site utiliza um outro script, provavelmente slide.js, para controlar o efeito visual, e pode haver um conflito ou uma dependência que não estamos tratando no nosso precos.js.

Solução: Unificar e Simplificar
Para garantir que tudo funcione sem conflitos, vamos criar uma versão mais robusta do js/precos.js que também controlará o efeito visual do seletor. Isso elimina a chance de um script entrar em conflito com o outro.

Este novo código vai garantir que:

Ao clicar em um período, a barra indicadora deslize para a posição correta.

O preço de todos os planos seja atualizado instantaneamente.

O link de assinatura de cada plano seja modificado para o ciclo de pagamento correto.

Apresentação do Programa e Instruções de Implementação
Substitua o conteúdo do seu arquivo js/precos.js pelo código completo abaixo. Ele foi projetado para ser a única fonte de controle para o seletor de planos, tornando a manutenção mais fácil no futuro.

Código Corrigido e Otimizado para js/precos.js
JavaScript

// Aguarda o carregamento completo do conteúdo da página para executar o script.
document.addEventListener('DOMContentLoaded', function () {

    // --- SELETORES DE ELEMENTOS DO HTML ---
    // Elementos que vamos manipular no código.
    const opcoesPeriodo = document.querySelectorAll('.period-selector .option');
    const indicadorSlide = document.querySelector('.period-selector .slide-indicator');

    // --- CONFIGURAÇÃO DOS PLANOS ---
    // Um objeto central com todas as informações dos planos.
    // Facilita a manutenção de preços e links.
    const planos = {
        essencial: {
            precoBase: 24.99, //
            elementoPreco: '.gold-price',
            elementoLink: '#gold-link',
            links: {
                mensal: 'https://painelcliente.net/cart.php?a=add&pid=2&billingcycle=monthly',
                trimestral: 'https://painelcliente.net/cart.php?a=add&pid=2&billingcycle=quarterly',
                semestral: 'https://painelcliente.net/cart.php?a=add&pid=2&billingcycle=semiannually',
                anual: 'https://painelcliente.net/cart.php?a=add&pid=2&billingcycle=annually'
            }
        },
        avancado: {
            precoBase: 29.99, //
            elementoPreco: '.Premium-price',
            elementoLink: '#Premium-link',
            links: {
                mensal: 'https://painelcliente.net/cart.php?a=add&pid=3&billingcycle=monthly',
                trimestral: 'https://painelcliente.net/cart.php?a=add&pid=3&billingcycle=quarterly',
                semestral: 'https://painelcliente.net/cart.php?a=add&pid=3&billingcycle=semiannually',
                anual: 'https://painelcliente.net/cart.php?a=add&pid=3&billingcycle=annually'
            }
        },
        premium: {
            precoBase: 42.48, //
            elementoPreco: '.p2p-price',
            elementoLink: '#p2p-link',
            links: {
                mensal: 'https://painelcliente.net/cart.php?a=add&pid=4&billingcycle=monthly',
                trimestral: 'https://painelcliente.net/cart.php?a=add&pid=4&billingcycle=quarterly',
                semestral: 'https://painelcliente.net/cart.php?a=add&pid=4&billingcycle=semiannually',
                anual: 'https://painelcliente.net/cart.php?a=add&pid=4&billingcycle=annually'
            }
        },
        supremo: {
            precoBase: 50.98, //
            elementoPreco: '.elite-price',
            elementoLink: '#elite-link',
            links: {
                mensal: 'https://painelcliente.net/cart.php?a=add&pid=10&billingcycle=monthly',
                trimestral: 'https://painelcliente.net/cart.php?a=add&pid=10&billingcycle=quarterly',
                semestral: 'https://painelcliente.net/cart.php?a=add&pid=10&billingcycle=semiannually',
                anual: 'https://painelcliente.net/cart.php?a=add&pid=10&billingcycle=annually'
            }
        }
    };

    // --- CONFIGURAÇÃO DOS PERÍODOS E DESCONTOS ---
    const periodos = {
        mensal:     { meses: 1, desconto: 0 },
        trimestral: { meses: 3, desconto: 0.15 }, // 15% de desconto
        semestral:  { meses: 6, desconto: 0.20 }, // 20% de desconto
        anual:      { meses: 12, desconto: 0.30 }  // 30% de desconto
    };

    /**
     * Função que ATUALIZA OS PREÇOS de todos os planos na tela.
     * @param {string} periodoSelecionado - O período ativo (ex: 'trimestral').
     */
    function atualizarPrecos(periodoSelecionado) {
        const infoPeriodo = periodos[periodoSelecionado];

        for (const nomePlano in planos) {
            const plano = planos[nomePlano];
            const elementoPreco = document.querySelector(plano.elementoPreco);
            const elementoLink = document.querySelector(plano.elementoLink);

            if (elementoPreco && elementoLink) {
                const precoTotal = plano.precoBase * infoPeriodo.meses * (1 - infoPeriodo.desconto);
                const precoPorMes = precoTotal / infoPeriodo.meses;
                let textoPreco = `R$ ${precoPorMes.toFixed(2).replace('.', ',')}/mês`;
                
                if (periodoSelecionado !== 'mensal') {
                    const classeCorTexto = (nomePlano === 'avancado') ? 'text-white' : 'text-dark';
                    textoPreco += `<br><small class="${classeCorTexto}">(Total: R$ ${precoTotal.toFixed(2).replace('.', ',')})</small>`;
                }
                
                elementoPreco.innerHTML = textoPreco;
                elementoLink.href = plano.links[periodoSelecionado];
            }
        }
    }

    /**
     * Função que MOVE O INDICADOR VISUAL para a opção clicada.
     * @param {HTMLElement} elementoClicado - O botão de período que foi clicado.
     */
    function moverIndicador(elementoClicado) {
        if (indicadorSlide) {
            const left = elementoClicado.offsetLeft;
            const width = elementoClicado.offsetWidth;
            indicadorSlide.style.left = `${left}px`;
            indicadorSlide.style.width = `${width}px`;
        }
    }
    
    // --- LÓGICA PRINCIPAL ---
    // Adiciona o "ouvinte de clique" para cada uma das opções de período.
    opcoesPeriodo.forEach(opcao => {
        opcao.addEventListener('click', function() {
            // Remove a classe 'active' de todas as opções.
            opcoesPeriodo.forEach(opt => opt.classList.remove('active'));
            // Adiciona a classe 'active' apenas na opção clicada.
            this.classList.add('active');

            // Pega o nome do período do atributo 'data-period'.
            const periodoEscolhido = this.getAttribute('data-period');
            
            // Chama as funções para mover o indicador e atualizar os preços.
            moverIndicador(this);
            atualizarPrecos(periodoEscolhido);
        });
    });

    // --- INICIALIZAÇÃO ---
    // Garante que, ao carregar a página, o seletor e os preços
    // comecem no estado "Mensal", que é o padrão.
    const opcaoAtivaInicial = document.querySelector('.period-selector .option.active') || opcoesPeriodo[0];
    if (opcaoAtivaInicial) {
        opcaoAtivaInicial.classList.add('active'); // Garante que a primeira opção seja a ativa
        moverIndicador(opcaoAtivaInicial);
        atualizarPrecos(opcaoAtivaInicial.getAttribute('data-period'));
    }
});