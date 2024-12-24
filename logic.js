document.getElementById("btnPrint").addEventListener("click", async function () {
    // Obter dados do formulário
    const grupoRodoviario = document.getElementById("grupo_rodoviario").value.toUpperCase();
    const dataAcidente = document.getElementById("data_acidente").value;
    const horaAcidente = document.getElementById("hora_acidente").value;
    const rodovia = document.getElementById("rodovia").value.toUpperCase();
    const km = document.getElementById("km").value.toUpperCase();
    const ME = document.getElementById("ME").value.toUpperCase();
    const grupo = document.getElementById("grupo").value.toUpperCase();

    // Adicionando o cabeçalho
    let printContent = "<h1 style='text-align:center;'>";
    printContent += "<img src='./img/rodoviario.png' alt='Rodoviário' style='width:100px;height:auto;'><br>";
    printContent += "Comando Rodoviário da Brigada Militar</h1>";
    printContent += "<h2 style='text-align:center;'>Solicitação de Certidão de Acidente de Trânsito</h2>";
    
    // Adicionando os dados do formulário
    printContent += `<p><strong>Grupo Rodoviário:</strong> ${grupoRodoviario}</p>`;
    printContent += `<p><strong>Data do Acidente:</strong> ${dataAcidente}</p>`;
    printContent += `<p><strong>Hora do Acidente:</strong> ${horaAcidente}</p>`;
    printContent += `<p><strong>Rodovia:</strong> ${rodovia}</p>`;
    printContent += `<p><strong>Km:</strong> ${km}</p>`;
    printContent += `<p><strong>Militar Atendente:</strong> ${ME}</p>`;
    printContent += `<p><strong>Telefone de Contato:</strong> ${grupo}</p>`;
    printContent += "<p><strong>Solicite sua ocorrência através do contato </a></strong></p>";
    printContent += "<p><strong>Retire sua ocorrência com a chave de acesso enviada via WhatsApp</strong></p>";

   // Criando uma nova janela para impressão
   const win = window.open("", "printWindow");
   win.document.write("<html><head><title>Certidão de Acidente de Trânsito</title>");
   win.document.write("<style>body { font-family: Arial, sans-serif; }</style>");
   win.document.write("</head><body style='width: 80mm; margin: auto;'>");
   win.document.write(printContent);
   win.document.write("</body></html>");
   win.document.close();

    // Imprimindo a janela
    win.print();

    // Conectar à impressora Bluetooth usando a UUID
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['00001101-0000-1000-8000-00805f9b34fb'] }]
        });

        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('00001101-0000-1000-8000-00805f9b34fb');
        const characteristic = await service.getCharacteristic('2A19'); // Característica específica pode variar

        // Enviar dados para a impressora
        const textEncoder = new TextEncoder();
        const dataToPrint = textEncoder.encode(printContent);

        for (let i = 0; i < dataToPrint.length; i += 20) {
            const chunk = dataToPrint.slice(i, i + 20);
            await characteristic.writeValue(chunk);
        }

        alert("Dados enviados para a impressora via Bluetooth!");

    } catch (error) {
        console.error("Erro ao conectar à impressora Bluetooth:", error);
        alert("Erro ao conectar à impressora Bluetooth. Por favor, tente novamente.");
    }
});
