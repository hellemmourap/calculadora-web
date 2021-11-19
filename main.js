onload = () => {
  document.querySelector('#n0').onclick = () => digito(0);
  document.querySelector('#n1').onclick = () => digito(1);
  document.querySelector('#n2').onclick = () => digito(2);
  document.querySelector('#n3').onclick = () => digito(3);
  document.querySelector('#n4').onclick = () => digito(4);
  document.querySelector('#n5').onclick = () => digito(5);
  document.querySelector('#n6').onclick = () => digito(6);
  document.querySelector('#n7').onclick = () => digito(7);
  document.querySelector('#n8').onclick = () => digito(8);
  document.querySelector('#n9').onclick = () => digito(9);
  document.querySelector('#virg').onclick = virgula;
  document.querySelector('#c').onclick = limpa;
  document.querySelector('#div').onclick = () => operador('/');
  document.querySelector('#multi').onclick = () => operador('*');
  document.querySelector('#adicao').onclick = () => operador('+');
  document.querySelector('#sub').onclick = () => operador('-');
  document.querySelector('#expo').onclick = () => operador('^');
  document.querySelector('#rad').onclick = () => operador('√');
  document.querySelector('#trc').onclick = () => operador('trc');
  document.querySelector('#equals').onclick = calcula;
};
 
let valor = '0';
let numer = true;
let valorAnterior = 0;
let operacaoPendente = null;

atualizarDisplay = () => {
  let [parteInteira, parteDecimal] = valor.split(',');
  let v = '';
  c = 0;
  for(let i = parteInteira.length-1; i>=0; i--){
    if(++c > 3){
      v = '.' + v;
      c = 1;
    }
    v = parteInteira[i] + v;
  }
  v = v + (parteDecimal ? ',' + parteDecimal : '');
  document.querySelector('#display').innerHTML = v;
}
 
const digito = (n) => {
  if(numer){
    valor = '' +n;
    numer = false;
  }
  else
    valor += n;
  atualizarDisplay();
};

const virgula = () => {
  if(numer){
    valor = '0,';
    numer = false;
  }
  else if(valor.indexOf(',') == -1) valor += ',';
  atualizarDisplay();
};

const limpa = () => {
  numer = true;
  valorAnterior = 0;
  operacaoPendente = null;
  valor = '0';
  atualizarDisplay();
};

const valorAtual = () => parseFloat(valor.replace(',', '.'));
 
const operador = (op) => {
  calcula();
  valorAnterior = valorAtual();
  operacaoPendente = op;
  numer = true;
};

const calcula = () => {
  if(operacaoPendente != null) {
    let resultado;
    switch(operacaoPendente){
      case '+': 
        resultado =  valorAnterior + valorAtual(); 
        break;
      case '-': 
        resultado =  valorAnterior - valorAtual(); 
          break;
      case '*': 
        resultado =  valorAnterior * valorAtual(); 
          break;
      case '/': 
        resultado =  valorAnterior / valorAtual(); 
          break;
      case '^': 
        resultado = Math.pow(valorAnterior, valorAtual());
        break;
      case 'trc':
        resultado = Math.trunc(calcula());
        break;
      case '√' :
        resultado = Math.sqrt(valorAnterior);
        break;
    }
    valor = resultado.toString().replace('.', ','); 
  }
  numer = true;
  operacaoPendente = null;
  valorAnterior = 0;
  atualizarDisplay();
};