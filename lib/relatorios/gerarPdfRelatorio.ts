import jsPDF from "jspdf";
import type { Relatorio } from "./relatoriosApi";

const AZUL_ESCURO = "#0b2545";
const AZUL_CLARO = "#3b82f6";
const TEAL = "#14b8a6";
const CINZA = "#6b7280";

function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function desenharCapa(doc: jsPDF, relatorio: Relatorio) {
  const largura = doc.internal.pageSize.getWidth();
  const altura = doc.internal.pageSize.getHeight();

  // Fundo azul escuro
  doc.setFillColor(AZUL_ESCURO);
  doc.rect(0, 0, largura, altura, "F");

  // Logo / marca (texto, já que não temos o SVG real do Figma)
  doc.setTextColor("#ffffff");
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("PORTAL", largura / 2, altura / 2 - 40, { align: "center" });
  doc.text("CONTÁBIL", largura / 2, altura / 2 - 30, { align: "center" });

  // Título do relatório
  doc.setFontSize(20);
  doc.text(relatorio.nome, largura / 2, altura / 2 + 10, { align: "center", maxWidth: largura - 40 });

  // Período analisado
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Período Analisado", largura / 2, altura / 2 + 30, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.text(
    `${formatarData(relatorio.dataInicio)} - ${formatarData(relatorio.dataTermino)}`,
    largura / 2,
    altura / 2 + 38,
    { align: "center" }
  );

  // Data de emissão
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#cbd5e1");
  doc.text(`Data de Emissão: ${formatarData(relatorio.criadoEm)}`, largura / 2, altura - 20, {
    align: "center",
  });
}

function desenharCabecalhoPagina(doc: jsPDF, titulo: string) {
  doc.setFillColor("#ffffff");
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");

  doc.setTextColor(AZUL_ESCURO);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("PORTAL CONTÁBIL", 20, 20);

  doc.setFontSize(16);
  doc.text(titulo, 20, 35);
}

function desenharPaginaFiscalTributario(doc: jsPDF, relatorio: Relatorio) {
  doc.addPage();
  desenharCabecalhoPagina(doc, "Gestão de Obrigações Fiscais");

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(CINZA);
  doc.text(relatorio.descricao, 20, 48, { maxWidth: 170 });

  // Gráfico de barras simples (simulado com retângulos)
  const valores = [
    { label: "Total de Obrigações", valor: 1118, cor: AZUL_ESCURO },
    { label: "Guias Quitadas", valor: 980, cor: AZUL_CLARO },
    { label: "Guias Pendentes", valor: 138, cor: "#f87171" },
  ];
  const baseY = 130;
  const maxAltura = 60;
  const maxValor = Math.max(...valores.map((v) => v.valor));

  valores.forEach((item, index) => {
    const x = 25 + index * 55;
    const alturaBarra = (item.valor / maxValor) * maxAltura;
    doc.setFillColor(item.cor);
    doc.rect(x, baseY - alturaBarra, 35, alturaBarra, "F");
    doc.setFontSize(9);
    doc.setTextColor("#111827");
    doc.text(item.valor.toString(), x + 17.5, baseY - alturaBarra - 3, { align: "center" });
    doc.setFontSize(8);
    doc.setTextColor(CINZA);
    doc.text(item.label, x + 17.5, baseY + 8, { align: "center", maxWidth: 40 });
  });

  // Situação de regularidade (círculo simples com número no centro)
  doc.setFontSize(12);
  doc.setTextColor(AZUL_ESCURO);
  doc.setFont("helvetica", "bold");
  doc.text("Situação de Regularidade Fiscal", 20, 160);

  doc.setDrawColor(AZUL_CLARO);
  doc.setLineWidth(4);
  doc.circle(45, 185, 18, "S");
  doc.setFontSize(14);
  doc.text("1.118", 45, 187, { align: "center" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Contribuintes", 45, 193, { align: "center" });
}

function desenharPaginaGraficos(doc: jsPDF, relatorio: Relatorio) {
  doc.addPage();
  desenharCabecalhoPagina(doc, "Evolução Mensal");

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(CINZA);
  doc.text(relatorio.descricao, 20, 48, { maxWidth: 170 });

  // Gráfico de linha simples (pontos conectados)
  const pontos = [20000, 60000, 10000, 34000, 35000, 45000];
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  const baseX = 25;
  const baseY = 140;
  const largura = 160;
  const alturaGrafico = 70;
  const maxValor = Math.max(...pontos);

  doc.setDrawColor(AZUL_CLARO);
  doc.setLineWidth(1);

  const coordenadas = pontos.map((valor, index) => {
    const x = baseX + (index / (pontos.length - 1)) * largura;
    const y = baseY - (valor / maxValor) * alturaGrafico;
    return { x, y };
  });

  for (let i = 0; i < coordenadas.length - 1; i++) {
    doc.line(coordenadas[i].x, coordenadas[i].y, coordenadas[i + 1].x, coordenadas[i + 1].y);
  }

  coordenadas.forEach((ponto, index) => {
    doc.setFillColor(AZUL_CLARO);
    doc.circle(ponto.x, ponto.y, 1.5, "F");
    doc.setFontSize(7);
    doc.setTextColor(CINZA);
    doc.text(meses[index], ponto.x, baseY + 10, { align: "center" });
  });
}

function desenharPaginaPerformance(doc: jsPDF, relatorio: Relatorio) {
  doc.addPage();
  desenharCabecalhoPagina(doc, "Performance e Movimentação Financeira");

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(CINZA);
  doc.text(relatorio.descricao, 20, 48, { maxWidth: 170 });

  const cards = [
    { label: "Total Processado", valor: "R$ 152.430,00" },
    { label: "Débitos a Vencer", valor: "R$ 210.980,00" },
    { label: "Honorários", valor: "R$ 18.540,00" },
    { label: "Ticket Médio Tributário", valor: "R$ 320,00" },
  ];

  cards.forEach((card, index) => {
    const x = 20 + (index % 2) * 90;
    const y = 60 + Math.floor(index / 2) * 35;

    doc.setDrawColor("#e5e7eb");
    doc.setFillColor("#f9fafb");
    doc.roundedRect(x, y, 80, 25, 2, 2, "FD");

    doc.setFontSize(8);
    doc.setTextColor(CINZA);
    doc.text(card.label, x + 5, y + 9);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(AZUL_ESCURO);
    doc.text(card.valor, x + 5, y + 18);
    doc.setFont("helvetica", "normal");
  });
}

export function gerarPdfRelatorio(relatorio: Relatorio): jsPDF {
  const doc = new jsPDF();

  desenharCapa(doc, relatorio);

  switch (relatorio.categoria) {
    case "Fiscal e Tributário":
      desenharPaginaFiscalTributario(doc, relatorio);
      break;
    case "Gráficos":
      desenharPaginaGraficos(doc, relatorio);
      break;
    case "Performance":
      desenharPaginaPerformance(doc, relatorio);
      break;
    default:
      desenharPaginaFiscalTributario(doc, relatorio);
  }

  return doc;
}

export function baixarPdfRelatorio(relatorio: Relatorio) {
  const doc = gerarPdfRelatorio(relatorio);
  doc.save(`${relatorio.nome.replace(/\s+/g, "_")}.pdf`);
}

export function abrirPdfRelatorio(relatorio: Relatorio) {
  const doc = gerarPdfRelatorio(relatorio);
  const blobUrl = doc.output("bloburl");
  window.open(blobUrl, "_blank");
}
