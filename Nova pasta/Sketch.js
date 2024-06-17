const Calcular = () => {
  // elementos
  let quantia = document.getElementById("quantia");
  let Taxa_de_juros_anual = document.getElementById("Taxa_de_juros_anual");
  let anos = document.getElementById("anos");
  let Cep = document.getElementById("Cep");
  let pagamento = document.getElementById("pagamento");
  let total = document.getElementById("Total");
  let Juros_total = document.getElementById("Juros_total");

  // Obtem a entrada do usuário através dos elementos input HTML
  // Converte os Juros de porcentagem para decimais e converte as taxas anuais, por mensais
  // converte o tempo de pagamento em anos para o número de pagamentos mensais

  let principal = parseFloat(quantia.value);
  let Juros = parseFloat(Taxa_de_juros_anual.value);
  let pagamentos = parseFloat(anos.value) * 12;

  // cálculo de pagamento mensal
  let x = Math.pow(1 + Juros, pagamentos); // Math.pow() calcula potências
  let Mensal = (principal * x * Juros) / (x - 1);

  // Se ocorrer de o resultado ser finito, a entrada do usuário estava certa e podemos mostrar os resultados
  if (isFinite(Mensal)) {
    // preenche os campos de saída, arredondando e formatando para 2 casas decimais
    pagamento.innerHTML = Mensal.toFixed(2);
    total.innerHTML = (Mensal * pagamentos).toFixed(2);
    Juros_total.innerHTML = (Mensal * pagamento - principal).toFixed(2);

    // Salva a entrada do usuário, para que seus dados estejam salvos no seu retorno
    save(quantia.value, Taxa_de_juros_anual.value, anos.value, Cep.value);

    // Anúncio: localiza e exibe financeiras locais, mas ignora os erros da rede
    try {
      // captura qualquer erro que aconteça dentro das chaves
      getLenders(
        quantia.value,
        Taxa_de_juros_anual.value,
        anos.value,
        Cep.value
      );
    } catch (error) {
      // ignora os erros
      // por fim, traça o gráfico do saldo devedor, dos juros e dos pagamentos do capital
      chart(principal, Juros, Mensal, pagamentos);
    }
  } else {
    // o resultado foi NaN ou infinito, o que significa que a entrada estava incompleta ou era inválida, apaga qualquer saída escrita anteriormente
    pagamento.innerHTML = "";
    total.innerHTML = "";
    Juros_total.innerHTML = "";
    chart();
  }
};

// salva a entrada do usuário como propriedades do objeto localStorage. Essas
// props ainda vão existir quando o usuário retornar no futuro
// em alguns navegadores esse recurso não há de funcionar

//! Se você utilizar um arquivo local://URL não funcionará, mas se você utilizar protocolo HTTP funciona (mozzila FireFox)

function save(quantia, Taxa_de_juros_anual, anos, Cep) {
  if (window.localStorage) {
    // só aplica se o navegador suportar
    localStorage.quantiaDoEmpréstimo = quantia;
    localStorage.Empréstimo_Taxa_de_juros_anual = Taxa_de_juros_anual;
    localStorage.anosDoEmpréstimo = anos;
    localStorage.CepDoEmpréstimo = Cep;
  }
}

// tenta restaurar os campos de entrada automaticamente quando o documento é carregado pela primeira vez

window.onload = () => {
  // se o navegador dá suporte ao local storage e tem alguns dados armazenados
  if (window.localStorage && localStorage.quantiaDoEmpréstimo) {
    document.getElementById("quantia").value = localStorage.quantiaDoEmpréstimo;
    document.getElementById("Taxa_de_juros_anual").value =
      localStorage.Empréstimo_Taxa_de_juros_anual;
    document.getElementById("anos").value = localStorage.anosDoEmpréstimo;
    document.getElementById("Cep").value = localStorage.CepDoEmpréstimo;
  }
};

// passa a entrada do usuário para um script no lado do servidor que (teoricamente) pode retornar uma lista de links para financeiras locais interessadas
// em fazer empréstimos
