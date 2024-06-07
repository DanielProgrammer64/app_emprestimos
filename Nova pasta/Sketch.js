const Calcular = () => {
  // elementos
  let quantia = document.getElementById("quantia");
  let apr = document.getElementById("apr");
  let anos = document.getElementById("anos");
  let Cep = document.getElementById("Cep");
  let pagamento = document.getElementById("pagamento");
  let total = document.getElementById("Total");
  let Juros_total = document.getElementById("Juros_total");

  // Obtem a entrada do usuário através dos elementos input HTML
  // Converte os Juros de porcentagem para decimais e converte as taxas anuais, por mensais
  // converte o tempo de pagamento em anos para o número de pagamentos mensais

  let principal = parseFloat(quantia.value);
  let Juros = parseFloat(apr.value);
  let pagamentos = parseFloat(anos.value) * 12;

  // cálculo de pagamento mensal
  let x = Math.pow(1 + Juros, pagamentos); // Math.pow() calcula potências
  let Mensal = (principal * x * Juros) / (x - 1);

  // Se ocorrer de o resultado ser finito, a entrada do usuário estava certa e podemos mostrar os resultados
  if(isFinite(Mensal)){
    // preenche os campos de saída, arredondando e formatando para 2 casas decimais
    pagamento.innerHTML = Mensal.toFixed(2);
    total.innerHTML = (Mensal * pagamentos).toFixed(2);
    Juros_total.innerHTML = ((Mensal * pagamento)-principal).toFixed(2);

    // Salva a entrada do usuário, para que seus dados estejam salvos no seu retorno
    save(quantia.value, apr.value, anos.value, Cep.value);
  }

};
