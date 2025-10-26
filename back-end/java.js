// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os botões de filtro
    const botoesFiltro = document.querySelectorAll('.nav-botao button');
    
    // Seleciona todos os cards de produtos
    const cardsProdutos = document.querySelectorAll('.produtos .card');
    
    // Mapeamento dos IDs dos botões para as categorias dos produtos (ATUALIZADO)
    const mapeamentoCategorias = {
        'Smartphone': 'smartphone',
        'notebook': 'notebook',
        'televisão': 'televisão',
        'computador': 'computador',
        'som': 'som'
    };
    
    // Adiciona evento de clique para cada botão
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', function() {
            const categoriaSelecionada = this.id;
            filtrarProdutos(categoriaSelecionada);
            
            // Remove a classe ativa de todos os botões
            botoesFiltro.forEach(btn => {
                btn.style.backgroundColor = 'white';
                btn.style.borderColor = '#ddd';
                btn.style.color = 'inherit';
            });
            
            // Adiciona a classe ativa ao botão clicado
            this.style.backgroundColor = '#007bff';
            this.style.borderColor = '#007bff';
            this.style.color = 'white';
        });
    });
    
    // Função para filtrar os produtos (ATUALIZADA)
    function filtrarProdutos(categoria) {
        const categoriaFiltro = mapeamentoCategorias[categoria];
        
        cardsProdutos.forEach(card => {
            const tituloProduto = card.querySelector('.card-title').textContent.toLowerCase();
            const descricaoProduto = card.querySelector('.descricao').textContent.toLowerCase();
            
            // Verifica se o produto pertence à categoria selecionada
            let correspondeCategoria = false;
            
            if (categoria === 'todos') {
                correspondeCategoria = true;
            } else if (categoriaFiltro) {
                // Busca por termos relacionados à categoria
                correspondeCategoria = 
                    tituloProduto.includes(categoriaFiltro) || 
                    descricaoProduto.includes(categoriaFiltro);
                
                // Buscas específicas para cada categoria
                if (categoria === 'Smartphone' && !correspondeCategoria) {
                    correspondeCategoria = 
                        tituloProduto.includes('celular') || 
                        descricaoProduto.includes('celular');
                }
                if (categoria === 'computador' && !correspondeCategoria) {
                    correspondeCategoria = 
                        tituloProduto.includes('pc') || 
                        descricaoProduto.includes('pc') ||
                        tituloProduto.includes('monitor') || 
                        descricaoProduto.includes('monitor');
                }
                if (categoria === 'televisão' && !correspondeCategoria) {
                    correspondeCategoria = 
                        tituloProduto.includes('tv') || 
                        descricaoProduto.includes('tv');
                }
            }
            
            if (correspondeCategoria) {
                card.style.display = 'block';
                card.parentElement.style.display = 'block';
            } else {
                card.style.display = 'none';
                card.parentElement.style.display = 'none';
            }
        });
    }
    
    // Adiciona botão "Todos" dinamicamente se não existir
    if (!document.getElementById('todos')) {
        const botaoTodos = document.createElement('button');
        botaoTodos.id = 'todos';
        botaoTodos.innerHTML = `Todos`;
        
        // Aplica os mesmos estilos dos outros botões
        Object.assign(botaoTodos.style, {
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '5px 20px',
            gap: '10px',
            border: '1px solid #ddd',
            backgroundColor: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        });
        
        botaoTodos.addEventListener('mouseenter', function() {
            if (this.style.backgroundColor !== '#007bff') {
                this.style.backgroundColor = '#f5f5f5';
                this.style.borderColor = '#ccc';
            }
        });
        
        botaoTodos.addEventListener('mouseleave', function() {
            if (this.style.backgroundColor !== '#007bff') {
                this.style.backgroundColor = 'white';
                this.style.borderColor = '#ddd';
            }
        });
        
        botaoTodos.addEventListener('click', function() {
            // Mostra todos os produtos
            cardsProdutos.forEach(card => {
                card.style.display = 'block';
                card.parentElement.style.display = 'block';
            });
            
            // Remove a classe ativa de todos os botões
            botoesFiltro.forEach(btn => {
                btn.style.backgroundColor = 'white';
                btn.style.borderColor = '#ddd';
                btn.style.color = 'inherit';
            });
            
            // Também reseta o botão "Todos" se estiver ativo
            botaoTodos.style.backgroundColor = 'white';
            botaoTodos.style.borderColor = '#ddd';
            botaoTodos.style.color = 'inherit';
            
            // Adiciona estilo ao botão "Todos"
            this.style.backgroundColor = '#007bff';
            this.style.borderColor = '#007bff';
            this.style.color = 'white';
        });
        
        // Adiciona o botão "Todos" no início da navegação
        document.querySelector('.nav-botao').prepend(botaoTodos);
    }
    
    // Adiciona funcionalidade de busca em tempo real
    const criarCampoBusca = () => {
        const campoBusca = document.createElement('input');
        campoBusca.type = 'text';
        campoBusca.placeholder = 'Buscar produtos...';
        
        Object.assign(campoBusca.style, {
            margin: '40px 6% 10px 6%',
            padding: '8px 15px',
            border: '1px solid #ddd',
            borderRadius: '20px',
            width: 'calc(100% - 12%)',
            maxWidth: '400px',
            display: 'block'
        });
        
        campoBusca.addEventListener('input', function() {
            const termoBusca = this.value.toLowerCase().trim();
            
            // Remove estilos dos botões durante a busca
            botoesFiltro.forEach(btn => {
                btn.style.backgroundColor = 'white';
                btn.style.borderColor = '#ddd';
                btn.style.color = 'inherit';
            });
            
            // Também reseta o botão "Todos" se existir
            const botaoTodos = document.getElementById('todos');
            if (botaoTodos) {
                botaoTodos.style.backgroundColor = 'white';
                botaoTodos.style.borderColor = '#ddd';
                botaoTodos.style.color = 'inherit';
            }
            
            cardsProdutos.forEach(card => {
                const titulo = card.querySelector('.card-title').textContent.toLowerCase();
                const descricao = card.querySelector('.descricao').textContent.toLowerCase();
                
                if (titulo.includes(termoBusca) || descricao.includes(termoBusca) || termoBusca === '') {
                    card.style.display = 'block';
                    card.parentElement.style.display = 'block';
                } else {
                    card.style.display = 'none';
                    card.parentElement.style.display = 'none';
                }
            });
        });
        
        // Insere o campo de busca antes da navegação de botões
        document.querySelector('.nav-botao').parentElement.insertBefore(campoBusca, document.querySelector('.nav-botao'));
    };
    
    // Chama a função para criar o campo de busca
    criarCampoBusca();
});