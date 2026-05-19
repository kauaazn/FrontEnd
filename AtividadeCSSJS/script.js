/* Seleciona o elemento que mostra o número de cursos no carrinho. */
var contadorCarrinho = document.getElementById('contadorCarrinho');

/* Elemento usado para exibir mensagens temporárias ao usuário. */
var retorno = document.getElementById('retorno');

/* Botão que ativa o desconto nos preços dos cursos. */
var botaoDesconto = document.getElementById('botaoDesconto');

/* Todos os botões dos cursos que adicionam o item ao carrinho. */
var botoesCursos = document.getElementsByClassName('botao-carrinho');

/* Todos os cards de curso na página. */
var cartoesCursos = document.getElementsByClassName('cartao-curso');

/* Estado atual do contador do carrinho. */
var contadorCarrinhoValor = 0;

/* Define se o desconto está ativo ou não. */
var descontoAtivo = false;

/* Guarda o temporizador para esconder a mensagem de retorno. */
var tempoEsperaRetorno = null;

/*
  Recebe um número e o transforma em string no formato monetário brasileiro.
  Exemplo: 129 => "R$ 129,00"
*/
function formatarPreco(valor) {
  var formatado = valor.toFixed(2);
  return 'R$ ' + formatado.replace('.', ',');
}

/*
  Exibe uma mensagem temporária na tela e remove a classe de exibição após 2,2 segundos.
*/
function mostrarRetorno(mensagem) {
  retorno.innerText = mensagem;
  retorno.className = 'retorno show';

  if (tempoEsperaRetorno !== null) {
    clearTimeout(tempoEsperaRetorno);
  }

  tempoEsperaRetorno = setTimeout(function() {
    retorno.className = 'retorno';
  }, 2200);
}

/*
  Atualiza todos os preços dos cursos na página, aplicando desconto quando necessário.
  O valor base do curso é lido do atributo data-preco de cada card.
*/
function atualizarDesconto() {
  for (var i = 0; i < cartoesCursos.length; i++) {
    var cartao = cartoesCursos[i];
    var elementoPreco = cartao.getElementsByClassName('preco')[0];
    var precoBase = Number(cartao.getAttribute('data-preco'));
    var precoFinal = descontoAtivo ? precoBase * 0.8 : precoBase;

    elementoPreco.innerText = formatarPreco(precoFinal);
    if (descontoAtivo) {
      elementoPreco.className = 'preco com-desconto';
    } else {
      elementoPreco.className = 'preco';
    }
  }
}

/*
  Define o comportamento de cada botão "Adicionar ao carrinho".
  Se o curso ainda não foi adicionado, incrementa o contador e altera o botão.
  Caso contrário, só mostra que o curso já está no carrinho.
*/
for (var i = 0; i < botoesCursos.length; i++) {
  botoesCursos[i].addEventListener('click', function() {
    var botao = this;
    var nomeCurso = botao.getAttribute('data-curso');

    if (botao.className.indexOf('adicionado') === -1) {
      contadorCarrinhoValor = contadorCarrinhoValor + 1;
      contadorCarrinho.innerText = 'Carrinho: ' + contadorCarrinhoValor;
      botao.innerText = 'Adicionado';
      botao.className = botao.className + ' adicionado';
      mostrarRetorno("'" + nomeCurso + "' foi adicionado ao carrinho.");
    } else {
      mostrarRetorno("'" + nomeCurso + "' já está no carrinho.");
    }
  });
}

/*
  Alterna o estado do desconto quando o usuário clica no botão correspondente.
  Depois atualiza os preços e mostra uma mensagem de retorno.
*/
botaoDesconto.addEventListener('click', function() {
  descontoAtivo = !descontoAtivo;
  botaoDesconto.innerText = descontoAtivo ? 'Desconto ativo' : 'Ativar desconto';
  atualizarDesconto();
  mostrarRetorno(descontoAtivo ? 'Desconto de 20% aplicado!' : 'Desconto desativado.');
});
