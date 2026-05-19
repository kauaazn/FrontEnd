function login(){
    // Credenciais corretas fixas para comparação
    const usuario_correto = "admin";
    const senha_correta = "1234";

    // Captura o valor digitado nos campos do formulário
    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;
    // Seleciona o parágrafo onde a mensagem será exibida
    let mensagem = document.getElementById("mensagem");

    // Verifica se algum campo está vazio e interrompe a função
    if(usuario === "" || senha === ""){
        mensagem.innerHTML = "Preencha todos os campos!";
        return;
    }

    // Compara os valores digitados com as credenciais corretas
    if (usuario === usuario_correto && senha == senha_correta){
        // Exibe mensagem de sucesso e aplica a classe de estilo verde
        mensagem.innerHTML = "Login realizado com sucesso!";
        mensagem.className = "sucesso";
    }else{
        // Exibe mensagem de erro e aplica a classe de estilo vermelho
        mensagem.innerHTML = "Usuário ou senha incorretos!";
        mensagem.className = "erro";
    }
}
