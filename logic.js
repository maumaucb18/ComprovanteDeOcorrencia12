// Verifica se o Bluetooth está disponível no dispositivo
async function verificarBluetoothDisponivel() {
  try {
      const isBluetoothAvailable = await navigator.bluetooth.getAvailability();
      return isBluetoothAvailable;
  } catch (error) {
      console.error("Erro ao verificar a disponibilidade do Bluetooth:", error);
      return false;
  }
}

// Função para imprimir via Bluetooth
async function imprimirViaBluetooth() {
  try {
      // Verificar se o Bluetooth está disponível
      const isBluetoothAvailable = await verificarBluetoothDisponivel();
      if (!isBluetoothAvailable) {
          alert("Bluetooth não disponível no dispositivo.");
          return;
      }

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
      var printContent = "Comando Rodoviário da Brigada Militar\n";
      printContent += "Certidão de Acidente de Trânsito\n";
      printContent += "Grupo Rodoviário: " + grupoRodoviario + "\n";
      printContent += "Data do Acidente: " + dataAcidente + "\n";
      printContent += "Hora do Acidente: " + horaAcidente + "\n";
      printContent += "Rodovia: " + rodovia + "\n";
      printContent += "Km: " + km + "\n";
      printContent += "Militar Atendente: " + ME + "\n";
      printContent += "Telefone de Contato: (51) 36055000\n";
      printContent += "Solicite sua ocorrência através do site http://crbm.br.rs.gov.br/solicite-sua-certidao-interno/\n";
      printContent += "Retire sua ocorrência com a chave de acesso pelo site https://crbm.bm.rs.gov.br/retire-sua-certidao/";

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
}

// Vincular a função de impressão à ação de clique do botão
document.getElementById("btnPrint").addEventListener("click", imprimirViaBluetooth);
