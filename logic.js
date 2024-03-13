document.getElementById("btnPrint").addEventListener("click", async function () {
  try {
    // Solicitar permissão para acessar dispositivos Bluetooth
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['print_service_uuid'] }],
      optionalServices: ['print_service_uuid']
    });

    // Conectar à impressora Bluetooth selecionada
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('print_service_uuid');
    const characteristic = await service.getCharacteristic('print_characteristic_uuid');

    // Obter dados do formulário
    var grupoRodoviario = document.getElementById("grupo_rodoviario").value.toUpperCase();
    var dataAcidente = document.getElementById("data_acidente").value;
    var horaAcidente = document.getElementById("hora_acidente").value;
    var rodovia = document.getElementById("rodovia").value.toUpperCase();
    var km = document.getElementById("km").value.toUpperCase();
    var ME = document.getElementById("ME").value.toUpperCase();

    // Construir conteúdo a ser impresso
    var printContent = "<h1 style='text-align:center;'>Comando Rodoviário da Brigada Militar</h1>";
    printContent += "<h2 style='text-align:center;'>Certidão de Acidente de Trânsito</h2>";
    printContent += "<p><strong>Grupo Rodoviário:</strong> " + grupoRodoviario + "</p>";
    printContent += "<p><strong>Data do Acidente:</strong> " + dataAcidente + "</p>";
    printContent += "<p><strong>Hora do Acidente:</strong> " + horaAcidente + "</p>";
    printContent += "<p><strong>Rodovia:</strong> " + rodovia + "</p>";
    printContent += "<p><strong>Km:</strong> " + km + "</p>";
    printContent += "<p><strong>Militar Atendente:</strong> " + ME + "</p>";
    printContent += "<p><strong>Telefone de Contato: (51) 36055000 </strong></p>";
    printContent += "<p><strong>Solicite sua ocorrência através do site <a href='http://crbm.br.rs.gov.br/solicite-sua-certidao-interno/'>http://crbm.br.rs.gov.br/solicite-sua-certidao-interno/</a></strong></p>";
    printContent += "<p><strong>Retire sua ocorrência com a chave de acesso pelo site <a href='https://crbm.bm.rs.gov.br/retire-sua-certidao/'>https://crbm.bm.rs.gov.br/retire-sua-certidao/</a></strong></p>";

    // Enviar dados para a impressora Bluetooth
    await characteristic.writeValue(new TextEncoder().encode(printContent));

    // Fechar a conexão com a impressora
    await server.disconnect();

    // Exibir mensagem de sucesso
    alert("Documento enviado para impressão com sucesso!");
  } catch (error) {
    console.error("Erro ao imprimir:", error);
    alert("Erro ao imprimir documento. Por favor, tente novamente.");
  }
});
