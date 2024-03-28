async function gerarPDF() {
    try {
        // Obter dados do formulário
        var grupoRodoviario = document.getElementById("grupo_rodoviario").value.toUpperCase();
        var dataAcidente = document.getElementById("data_acidente").value;
        var horaAcidente = document.getElementById("hora_acidente").value;
        var rodovia = document.getElementById("rodovia").value.toUpperCase();
        var km = document.getElementById("km").value.toUpperCase();
        var ME = document.getElementById("ME").value.toUpperCase();
  
        // Construir conteúdo do PDF
        var pdfDoc = await PDFLib.PDFDocument.create();
        var page = pdfDoc.addPage([595, 842]); // Tamanho padrão do papel A4 em pontos (595x842)
  
        var content = [
            `Comando Rodoviário da Brigada Militar`,
            `Certidão de Acidente de Trânsito`,
            `Grupo Rodoviário: ${grupoRodoviario}`,
            `Data do Acidente: ${dataAcidente}`,
            `Hora do Acidente: ${horaAcidente}`,
            `Rodovia: ${rodovia}`,
            `Km: ${km}`,
            `Militar Atendente: ${ME}`,
            `Telefone de Contato: (51) 36055000`,
            `Solicite sua ocorrência através do site http://crbm.br.rs.gov.br/solicite-sua-certidao-interno/`,
            `Retire sua ocorrência com a chave de acesso pelo site https://crbm.bm.rs.gov.br/retire-sua-certidao/`
        ];

        var lineHeight = 12; // Altura da linha de texto
        var yOffset = (page.getHeight() - (lineHeight * content.length)) / 2; // Calcular a posição vertical inicial

        for (const line of content) {
            page.drawText(line, {
                x: 50, // Margem esquerda
                y: yOffset,
                size: 12
            });
            yOffset -= lineHeight; // Atualizar a posição vertical para a próxima linha
        }
  
        // Converter PDF para Blob
        var pdfBytes = await pdfDoc.save();
        var pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  
        // Criar URL do Blob
        var pdfURL = URL.createObjectURL(pdfBlob);
  
        // Abrir o PDF em uma nova aba para impressão
        var printWindow = window.open(pdfURL);
        printWindow.onload = function() {
            printWindow.print();
        };
  
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        alert("Erro ao gerar PDF. Por favor, tente novamente.");
    }
}

// Vincular a função de geração de PDF à ação de clique do botão
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnPrint").addEventListener("click", gerarPDF);
});