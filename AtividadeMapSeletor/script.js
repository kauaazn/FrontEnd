// ============================================================
// ETAPA 2: Seletores dos elementos principais
// ============================================================

// Elementos únicos por ID (getElementById)
const contadorCarrinho = document.querySelector('#contadorCarrinho');
const retorno          = document.querySelector('#retorno');
const botaoDesconto    = document.querySelector('#botaoDesconto');
const listaCarrinhoEl  = document.querySelector('#listaCarrinho');
const totalCarrinhoEl  = document.querySelector('#totalCarrinho');
const btnLimpar        = document.querySelector('#btnLimpar');

// Seletores do PDF — Etapa 2
const titulo        = document.getElementById('titulo-plataforma');
const campoBusca    = document.getElementById('busca-aula');
const filtroCat     = document.getElementById('filtro-categoria');
const contadorAulas = document.getElementById('aulas-concluidas');
const barra         = document.getElementById('barra-progresso');

// Coleções (querySelectorAll retorna NodeList — percorrível com forEach)
const botoesCursos  = document.querySelectorAll('.botao-carrinho');
const cartoesCursos = document.querySelectorAll('.cartao-curso');

// Também disponíveis via classe do PDF para exercício didático
const cards  = document.querySelectorAll('.card-curso');   // NodeList estática
const botoes = document.querySelectorAll('.btn-iniciar');  // NodeList estática

// ============================================================
// DESAFIO 1: Ajustes iniciais da plataforma via seletores JS
// ============================================================

// 1. Alterar o título principal da plataforma (textContent)
titulo.textContent = 'CodeStudy - Plataforma de Estudos';

// 2. Alterar o placeholder do campo de busca (atributo)
campoBusca.placeholder = 'Digite o nome do curso ou conteúdo...';

// 3. Alterar o texto do primeiro botão para "Começar agora"
botoes[0].textContent = 'Começar agora';

// 4. Destacar visualmente o primeiro card (classList.add)
cards[0].classList.add('destaque');

// 5. Adicionar classe CSS em todos os cards (forEach + classList)
cards.forEach(card => card.classList.add('card-interativo'));

// ============================================================
// CATÁLOGO E ESTADO DO CARRINHO
// ============================================================

const catalogo = [
  { id: 'js-moderno',        titulo: 'JavaScript Moderno',  instrutor: 'Ana Souza',      preco: 129 },
  { id: 'css-avancado',      titulo: 'CSS Avançado',         instrutor: 'Bruno Lima',     preco: 99  },
  { id: 'design-interfaces', titulo: 'Design de Interfaces', instrutor: 'Carla Mendes',   preco: 149 },
  { id: 'produtividade',     titulo: 'Produtividade Pessoal',instrutor: 'Diego Ferreira', preco: 79  },
];

let carrinho = [];
let descontoAtivo = false;
let timerRetorno  = null;

// ============================================================
// ETAPA 4: Progresso da plataforma
// ============================================================

let aulasConcluidas = 0;
const totalAulas    = botoes.length;

function atualizarProgresso() {
  const percentual = (aulasConcluidas / totalAulas) * 100;
  contadorAulas.textContent = aulasConcluidas;
  barra.style.width = `${percentual}%`;
}

// ============================================================
// FUNÇÕES AUXILIARES
// ============================================================

const formatarPreco = (valor) => {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
};

const mostrarRetorno = (mensagem) => {
  retorno.textContent = mensagem;
  retorno.classList.add('show');
  clearTimeout(timerRetorno);
  timerRetorno = setTimeout(() => {
    retorno.classList.remove('show');
  }, 2200);
};

const atualizarDesconto = () => {
  cartoesCursos.forEach(cartao => {
    const elementoPreco = cartao.querySelector('.preco');
    const precoBase     = Number(cartao.dataset.preco);
    const precoFinal    = descontoAtivo ? precoBase * 0.8 : precoBase;
    elementoPreco.textContent = formatarPreco(precoFinal);
    elementoPreco.classList.toggle('com-desconto', descontoAtivo);
  });
  renderizarCarrinho();
};

// Usa .map() para gerar os itens e .reduce() para calcular o total
const renderizarCarrinho = () => {
  if (carrinho.length === 0) {
    listaCarrinhoEl.innerHTML = '<li class="carrinho-vazio">Nenhum curso adicionado ainda.</li>';
    totalCarrinhoEl.textContent = 'Total: R$ 0,00';
    return;
  }

  const itensHTML = carrinho.map(curso => {
    const precoFinal = descontoAtivo ? curso.preco * 0.8 : curso.preco;
    return `
      <li class="item-carrinho">
        <div class="item-info">
          <strong>${curso.titulo}</strong>
          <span class="item-instrutor">Por ${curso.instrutor}</span>
        </div>
        <div class="item-acoes">
          <span class="item-preco">${formatarPreco(precoFinal)}</span>
          <button class="btn-remover" data-id="${curso.id}">✕</button>
        </div>
      </li>
    `;
  });

  listaCarrinhoEl.innerHTML = itensHTML.join('');

  const totalBruto = carrinho.reduce((total, curso) => {
    const precoFinal = descontoAtivo ? curso.preco * 0.8 : curso.preco;
    return total + precoFinal;
  }, 0);

  totalCarrinhoEl.textContent = 'Total: ' + formatarPreco(totalBruto);
};

// ============================================================
// EVENTOS — CARRINHO
// ============================================================

// Adiciona curso ao carrinho e incrementa o progresso
botoesCursos.forEach(botao => {
  botao.addEventListener('click', () => {
    const nomeCurso = botao.dataset.curso;

    if (botao.classList.contains('adicionado')) {
      mostrarRetorno(`'${nomeCurso}' já está no carrinho.`);
      return;
    }

    const cursoBuscado = catalogo.find(curso => curso.titulo === nomeCurso);
    if (cursoBuscado) {
      carrinho.push(cursoBuscado);
      contadorCarrinho.textContent = `Carrinho: ${carrinho.length}`;
      botao.textContent = 'Adicionado ✓';
      botao.classList.add('adicionado');
      renderizarCarrinho();
      mostrarRetorno(`'${nomeCurso}' foi adicionado ao carrinho.`);

      // Etapa 4: incrementa progresso ao iniciar/adicionar curso
      aulasConcluidas++;
      atualizarProgresso();
    }
  });
});

// Remove curso do carrinho via delegação de eventos e decrementa progresso
listaCarrinhoEl.addEventListener('click', evento => {
  const alvo = evento.target;
  if (!alvo.classList.contains('btn-remover')) return;

  const idParaRemover = alvo.dataset.id;
  carrinho = carrinho.filter(curso => curso.id !== idParaRemover);
  contadorCarrinho.textContent = `Carrinho: ${carrinho.length}`;

  const cursoRemovido = catalogo.find(curso => curso.id === idParaRemover);
  if (cursoRemovido) {
    const botaoDoCard = document.querySelector(`[data-curso="${cursoRemovido.titulo}"]`);
    if (botaoDoCard) {
      // Restaura texto original ao remover (Desafio 1 afeta apenas o primeiro botão ao carregar)
      botaoDoCard.textContent = 'Adicionar ao carrinho';
      botaoDoCard.classList.remove('adicionado');
    }
  }

  renderizarCarrinho();
  mostrarRetorno('Curso removido do carrinho.');

  // Etapa 4: decrementa progresso ao remover curso
  aulasConcluidas = Math.max(0, aulasConcluidas - 1);
  atualizarProgresso();
});

// Limpa carrinho e zera progresso
btnLimpar.addEventListener('click', () => {
  carrinho = [];
  botoesCursos.forEach(botao => {
    botao.textContent = 'Adicionar ao carrinho';
    botao.classList.remove('adicionado');
  });
  // Restaura texto do primeiro botão conforme Desafio 1
  botoes[0].textContent = 'Começar agora';
  contadorCarrinho.textContent = 'Carrinho: 0';
  renderizarCarrinho();
  mostrarRetorno('Carrinho esvaziado.');

  // Etapa 4: zera progresso ao limpar carrinho
  aulasConcluidas = 0;
  atualizarProgresso();
});

// Ativa ou desativa desconto de 20%
botaoDesconto.addEventListener('click', () => {
  descontoAtivo = !descontoAtivo;
  botaoDesconto.textContent = descontoAtivo ? 'Desconto ativo ✓' : 'Ativar desconto';
  atualizarDesconto();
  mostrarRetorno(descontoAtivo ? 'Desconto de 20% aplicado!' : 'Desconto desativado.');
});

// ============================================================
// ETAPA 4: Busca e filtro por categoria
// ============================================================

function filtrarCards() {
  const termo     = campoBusca.value.toLowerCase();
  const categoria = filtroCat.value;

  // querySelectorAll(".card-curso") — NodeList percorrida com forEach
  cards.forEach(card => {
    const tituloCurso = card.querySelector('h3').textContent.toLowerCase();
    const cat         = card.dataset.categoria;
    const matchBusca  = tituloCurso.includes(termo);
    const matchCat    = categoria === 'todos' || cat === categoria;

    // Mostra ou oculta o card conforme os filtros
    card.style.display = matchBusca && matchCat ? '' : 'none';
  });
}

// addEventListener no input de busca e no select de categoria
campoBusca.addEventListener('input', filtrarCards);
filtroCat.addEventListener('change', filtrarCards);

// ============================================================
// INICIALIZAÇÃO
// ============================================================

renderizarCarrinho();
atualizarProgresso();
