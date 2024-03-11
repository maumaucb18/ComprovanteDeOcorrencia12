document.getElementById("btnPrint").addEventListener("click", function () {
  var grupoRodoviario = document.getElementById("grupo_rodoviario").value.toUpperCase();
  var dataAcidente = document.getElementById("data_acidente").value;
  var horaAcidente = document.getElementById("hora_acidente").value;
  var rodovia = document.getElementById("rodovia").value.toUpperCase();
  var km = document.getElementById("km").value.toUpperCase();
  var ME = document.getElementById("ME").value.toUpperCase();

  // Adicionando o cabeçalho
  
  var printContent = "<h1 style='text-align:center;'>Comando Rodoviário da Brigada Militar</h1>";
  printContent += "<h2 style='text-align:center;'>Certidão de Acidente de Trânsito</h2>";
  
  // Adicionando os dados do formulário
  printContent += "<p><strong>Grupo Rodoviário:</strong> " + grupoRodoviario + "</p>";
  printContent += "<p><strong>Data do Acidente:</strong> " + dataAcidente + "</p>";
  printContent += "<p><strong>Hora do Acidente:</strong> " + horaAcidente + "</p>";
  printContent += "<p><strong>Rodovia:</strong> " + rodovia + "</p>";
  printContent += "<p><strong>Km:</strong> " + km + "</p>";
  printContent += "<p><strong>Militar Atendente:</strong> " + ME + "</p>";

  printContent += "<p><strong>Telefone de Contato: (51) 36055000 </strong></p>";
  printContent += "<p><strong>Solicite sua ocorrência através do site <a href='http://crbm.br.rs.gov.br/solicite-sua-certidao-interno/'>http://crbm.br.rs.gov.br/solicite-sua-certidao-interno/</a></strong></p>";
  printContent += "<p><strong>Retire sua ocorrência com a chave de acesso pelo site <a href='https://crbm.bm.rs.gov.br/retire-sua-certidao/'>https://crbm.bm.rs.gov.br/retire-sua-certidao/</a></strong></p>";

  // Criando uma nova janela para impressão
  var win = window.open("", "printWindow");
  win.document.write('<img src="img/rodoviario.png" "justfy-content:center">');
  win.document.write('<style>img { display: block; margin-left: auto; margin-right: auto; }</style>');
  win.document.write("<html><head><title>Certidão de Acidente de Trânsito</title>");
  win.document.write("<style>body { font-family: Arial, sans-serif; }</style>");
  win.document.write("</head><body style='width: 80mm; margin: auto;'>");
  win.document.write(printContent);
  win.document.write("</body></html>");
  win.document.close();

  // Imprimindo a janela
  win.print();
});

