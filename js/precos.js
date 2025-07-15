
// CÓDIGO CORRETO PARA O ARQUIVO js/precos.js

document.addEventListener('DOMContentLoaded', function () {

    // --- SELETORES DE ELEMENTOS DO HTML ---
    const opcoesPeriodo = document.querySelectorAll('.period-selector .option');
    const indicadorSlide = document.querySelector('.period-selector .slide-indicator');

    // --- CONFIGURAÇÃO DOS PLANOS ---
    const planos = {
        essencial: {
            precoBase: 24.99,
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
            precoBase: 29.99,
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
            precoBase: 42.48,
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
            precoBase: 50.98,
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

    function moverIndicador(elementoClicado) {
        if (indicadorSlide && elementoClicado) {
            const left = elementoClicado.offsetLeft;
            const width = elementoClicado.offsetWidth;
            indicadorSlide.style.left = `${left}px`;
            indicadorSlide.style.width = `${width}px`;
        }
    }
    
    opcoesPeriodo.forEach((opcao, index) => {
        opcao.addEventListener('click', function() {
            opcoesPeriodo.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const periodoEscolhido = this.getAttribute('data-period');
            moverIndicador(this);
            atualizarPrecos(periodoEscolhido);
        });
    });

    // --- INICIALIZAÇÃO ---
    const opcaoAtivaInicial = document.querySelector('.period-selector .option.active');
    if (opcaoAtivaInicial) {
        moverIndicador(opcaoAtivaInicial);
        atualizarPrecos(opcaoAtivaInicial.getAttribute('data-period'));
    } else if (opcoesPeriodo.length > 0) {
        // Se nenhum estiver ativo, ativa o primeiro por padrão
        opcoesPeriodo[0].classList.add('active');
        moverIndicador(opcoesPeriodo[0]);
        atualizarPrecos(opcoesPeriodo[0].getAttribute('data-period'));
    }
});