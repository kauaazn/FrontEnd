let numeros = [2,4,6,7];
function quadrado(numero){
    return Math.pow(numero,2);
}
let quadrados = numeros.map(quadrado);
console.log(quadrados);

