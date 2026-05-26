let ht = prompt("Digite as horas trabalhadas:");
let vh = prompt("Digite o valor da hora trabalhada:");  
let pd = prompt("Digite o percentual de desconto:");
let sb = ht * vh;
let td = pd / 100 * sb;
let sl = sb - td;

alert("O salário líquido é: " + sl);
alert("O salário bruto é: " + sb);
alert("O total de descontos é: " + td);
alert("Horas trabalhadas: " + ht);