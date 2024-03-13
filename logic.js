// Classe para lidar com a impressora Bluetooth
class BluetoothPrinter {
  constructor() {
      this.socket = null;
  }

  async conectarImpressoraBluetooth() {
      try {
          // Solicitar permissão para acessar dispositivos Bluetooth
          const device = await navigator.bluetooth.requestDevice({
              filters: [{ services: ['00001800-0000-1000-8000-00805f9b34fb'] }],
              optionalServices: ['00001800-0000-1000-8000-00805f9b34fb']
          });

          // Conectar à impressora Bluetooth selecionada
          const server = await device.gatt.connect();
          const service = await server.getPrimaryService('00001800-0000-1000-8000-00805f9b34fb');
          const characteristic = await service.getCharacteristic('00001234-0000-1000-8000-00805f9b34fb');

          return characteristic;
      } catch (error) {
          console.error("Erro ao conectar-se à impressora Bluetooth:", error);
          return null;
      }
  }
}

// Função para verificar se o Bluetooth está disponível no dispositivo
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

      // Instanciar a classe BluetoothPrinter e conectar-se à impressora Bluetooth
      const printer = new BluetoothPrinter();
      const characteristic = await printer.conectarImpressoraBluetooth();
      if (!characteristic) {
          alert("Não foi possível conectar-se à impressora Bluetooth.");
          return;
      }

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

      // Exibir mensagem de sucesso
      alert("Documento enviado para impressão com sucesso!");
  } catch (error) {
      console.error("Erro ao imprimir:", error);
      alert("Erro ao imprimir documento. Por favor, tente novamente.");
  }
}

// Vincular a função de impressão à ação de clique do botão
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btnPrint").addEventListener("click", imprimirViaBluetooth);
});
