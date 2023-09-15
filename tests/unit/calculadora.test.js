const calculadora = require("../../models/calculadora.js");  // importando o model

test("Test de soma", () =>{
  const resultado = calculadora.somar(100, 5);
  expect(resultado).toBe(105);
});

test("Test de subtracao", () =>{
  const resultado = calculadora.subitracao(2, 2);
  expect(resultado).toBe(0);
});

test("Test de divisao", () =>{
  const resultado = calculadora.divisao(2, 2);
  expect(resultado).toBe(1);
});

test("Test de multiplicacao", () =>{
  const resultado = calculadora.multiplicacao(9, 9);
  expect(resultado).toBe(81);
});
