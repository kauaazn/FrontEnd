function somarProgessos(...progressos){
    let soma = 0;
    for(let progresso of progessos){
        soma = soma + progresso;
    }
    return soma;
}
console.log(somarProgessos(29,40,60));