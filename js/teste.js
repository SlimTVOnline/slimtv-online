$(document).ready(function() {
    // Máscara para telefone no formato brasileiro, com celular começando com 9
    $('#telefone').mask('(00) 00000-0000');

    // Função para validar o telefone (com celular iniciando com 9)
    function validarTelefone(telefone) {
        const regexCelular = /^\(\d{2}\) 9\d{4}-\d{4}$/; // Aceita apenas celular com DDD e começando com 9
        return regexCelular.test(telefone);
    }

    // Submissão do formulário via AJAX
    $('form').on('submit', function(e) {
        e.preventDefault(); // Impede o envio tradicional do formulário

        var telefone = $('#telefone').val(); // Pega o valor do campo de telefone

        // Verifica se o telefone é válido
        if (!validarTelefone(telefone)) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Por favor, insira um número de celular válido começando com 9 no formato (00) 90000-0000.',
            });
            return;
        }

        var formData = $(this).serialize(); // Serializa os dados do formulário

        // Exibir spinner de carregamento usando SweetAlert
        Swal.fire({
            title: 'Processando...',
            html: 'Por favor, aguarde enquanto processamos sua solicitação.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(); // Exibe o spinner de carregamento
            }
        });

        $.ajax({
            type: 'POST',
            url: '/processar_teste_ajax.php', // URL para onde será enviada a requisição
            data: formData,
            dataType: 'json', // Garante que a resposta seja interpretada como JSON
            success: function(response) {
                Swal.close(); // Fecha o spinner de carregamento

                console.log("Resposta do servidor:", response);

                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: response.message,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: response.message,
                    });
                }
            },
            error: function(xhr, status, error) {
                Swal.close(); // Fecha o spinner de carregamento

                // Registra os detalhes do erro no console para depuração
                console.error("Erro AJAX:", status, error, xhr.responseText);

                // Usa a propriedade responseJSON se disponível
                var errorMsg = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMsg = xhr.responseJSON.message;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: errorMsg,
                });
            },
            complete: function(xhr, status) {
                console.log("Requisição AJAX finalizada com status:", status);
            }
        });
    });
});
