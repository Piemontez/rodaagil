var results = [];
var canvasShow = document.querySelector("#canvas-show");
var canvasOut = document.querySelector("#canvas-out");
var imgData = canvasOut.toDataURL(); // por padrão, a imagem é PNG

var chartValues = {
  startAngle: -0.5 * Math.PI,
  currentAngle: -0.5 * Math.PI,
  sliceAngle: (1 / 20) * 2 * Math.PI,
  centerX: 0,
  centerY: 0,
  sizeControl: 0,
  height: 0,
  width: 0,
};

function configureChart(canvas, chartProps) {
  chartValues.sliceAngle = (1 / chartProps.itens.length) * 2 * Math.PI;

  chartValues.centerX = canvas.width / 2;
  canvas.height = 0.8125 * canvas.width;
  chartValues.centerY = canvas.height / 2;
  chartValues.sizeControl = 0.065 * canvas.width;

  chartValues.width = canvas.width;
  chartValues.height = canvas.height;
}

function makeScorePath(centerX, centerY, radius, startAngle, endAngle) {
  var path = new Path2D();
  path.arc(centerX, centerY, radius, startAngle, endAngle);
  path.lineTo(centerX, centerY);

  return path;
}

function drawBorder(cx, width, height) {
  cx.fillStyle = "white";
  cx.fillRect(0, 0, width, height);
  cx.rect(0, 0, width, height);
  cx.stroke();
}

function drawScore(cx, chartProps) {
  var path;
  var colors = [
    chartProps.colors.min,
    chartProps.colors.min,
    chartProps.colors.med,
    chartProps.colors.max,
    chartProps.colors.max,
  ];

  for (var i = 5; i > 0; i--) {
    chartProps.itens.forEach(function (result) {
      color = result.value >= i ? colors[result.value - 1] : "white";

      cx.fillStyle = color;
      cx.strokeStyle = chartProps.colors.text;
      cx.lineWidth = 0.2;

      path = makeScorePath(
        chartValues.centerX,
        chartValues.centerY,
        chartValues.sizeControl * i,
        chartValues.currentAngle,
        chartValues.currentAngle + chartValues.sliceAngle
      );
      //cx.isPointInPath(circle, event.offsetX, event.offsetY);

      cx.fill(path);
      cx.stroke(path);

      chartValues.currentAngle += chartValues.sliceAngle;
    });
  }
}

function drawTitles(cx, chartProps) {
  // Cultura
  cx.font = 0.01 * chartValues.width + "px Arial";
  cx.fillStyle = chartProps.colors.text;

  for (var key in chartProps.itens) {
    var item = chartProps.itens[key];

    var x = chartValues.height * 0.45 * Math.cos(key);
    var y = chartValues.height * 0.45 * Math.sin(key);

    cx.fillText(item.title, x + chartValues.centerX, y + chartValues.centerY);
  }
  /*
  cx.fillText("Colaboração e", chartValues.width * 0.51, chartValues.height * 0.0269);
  cx.fillText(" comunicação", chartValues.width * 0.51, chartValues.height * 0.05);

  cx.fillText("Motivação e", chartValues.width * 0.64, chartValues.height * 0.0607);
  cx.fillText(" confiança", chartValues.width * 0.64, chartValues.height * 0.0847);

  cx.fillText("Autonomia e", chartValues.width * 0.75, chartValues.height * 0.15);
  cx.fillText("auto-organização", chartValues.width * 0.73, chartValues.height * 0.17);

  cx.fillText("Kaizen", chartValues.width * 0.82, chartValues.height * 0.284);

  cx.fillText(
    "Interdisciplinaridade",
    chartValues.width * 0.83,
    chartValues.height * 0.434
  );*/
}

function drawLines(cx, chartProps) {
  var count = 0;
  chartProps.itens.forEach(function (result) {
    if (count == 4 || count == 9 || count == 14 || count == 19) {
      var lineWidth = 4;
    } else {
      var lineWidth = 1;
    }
    count++;
    cx.beginPath();
    cx.strokeStyle = chartProps.colors.text;

    cx.arc(
      chartValues.centerX,
      chartValues.centerY,
      chartValues.sizeControl * 6,
      chartValues.currentAngle,
      chartValues.currentAngle + chartValues.sliceAngle,
      true
    );
    chartValues.currentAngle += chartValues.sliceAngle;
    cx.lineTo(chartValues.centerX, chartValues.centerY);
    cx.lineWidth = lineWidth;
    cx.stroke();
  });

  chartProps.itens.forEach(function (result) {
    cx.beginPath();
    cx.strokeStyle = "white";

    cx.arc(
      chartValues.centerX,
      chartValues.centerY,
      chartValues.sizeControl * 6,
      chartValues.currentAngle,
      chartValues.currentAngle + chartValues.sliceAngle,
      true
    );
    chartValues.currentAngle += chartValues.sliceAngle;
    cx.lineWidth = 10;
    cx.stroke();
    cx.closePath();
  });
}

function draw(canvas, chartProps) {
  var cx = canvas.getContext("2d");

  configureChart(canvas, chartProps);
  drawBorder(cx, canvas.width, canvas.height);
  drawScore(cx, chartProps);
  drawLines(cx, chartProps);

  // Textos do gráfico
  cx.font = 0.03125 * canvas.width + "px  Arial";
  cx.fillStyle = chartProps.colors.text;
  cx.fillText(
    "Valor",
    canvas.width * 0.00625,
    canvas.height * 0.038461538461538464
  );

  cx.font = 0.015 * canvas.width + "px  Arial";
  cx.fillText(
    "a Todo instante",
    canvas.width * 0.00825,
    canvas.height * 0.059661538461538464
  );

  cx.font = 0.03125 * canvas.width + "px  Arial";
  cx.fillText(
    "Pessoas",
    canvas.width * 0.875,
    canvas.height * 0.038461538461538464
  );
  cx.font = 0.015 * canvas.width + "px  Arial";
  cx.fillText(
    "sensacionais",
    canvas.width * 0.905,
    canvas.height * 0.059461538461538464
  );

  heightTitle = canvas.height * 0.9469230769230769;
  heightSubTitle = canvas.height * 0.9769230769230769;

  cx.font = 0.03125 * canvas.width + "px  Arial";
  cx.fillText("Experimente", canvas.width * 0.82, heightTitle);
  cx.font = 0.015 * canvas.width + "px  Arial";
  cx.fillText("e aprenda rápido", canvas.width * 0.88125, heightSubTitle);

  cx.font = 0.03125 * canvas.width + "px  Arial";
  cx.fillText("Segurança", canvas.width * 0.00625, heightTitle);
  cx.font = 0.015 * canvas.width + "px  Arial";
  cx.fillText("um pré requisito", canvas.width * 0.00625, heightSubTitle);

  drawTitles(cx, chartProps);
  /*
  // Organização
  cx.fillText("Práticas", canvas.width * 0.87, canvas.height * 0.561);
  cx.fillText("Lean-Agile", canvas.width * 0.858, canvas.height * 0.584);

  cx.fillText(
    "Métricas e",
    canvas.width * 0.84,
    canvas.height * 0.7076923076923077
  );
  cx.fillText(
    "ferramentas",
    canvas.width * 0.838,
    canvas.height * 0.7307692307692307
  );

  cx.fillText(
    "Comprometimento",
    canvas.width * 0.75,
    canvas.height * 0.823076923076923
  );
  cx.fillText(
    "com o produto",
    canvas.width * 0.77,
    canvas.height * 0.8461538461538461
  );

  cx.fillText(
    "Compartilhamento",
    canvas.width * 0.63125,
    canvas.height * 0.9076923076923077
  );
  cx.fillText(
    "de conhecimento",
    canvas.width * 0.64325,
    canvas.height * 0.9307692307692308
  );

  cx.fillText(
    "Ritmo das",
    canvas.width * 0.5225,
    canvas.height * 0.9461538461538461
  );
  cx.fillText(
    "Entregas",
    canvas.width * 0.530625,
    canvas.height * 0.9692307692307692
  );

  // Técnico
  cx.fillText(
    "Código",
    canvas.width * 0.399375,
    canvas.height * 0.926923076923077
  );
  cx.fillText("Sutentável", canvas.width * 0.394375, canvas.height * 0.95);
  cx.fillText(
    "(Refactoring)",
    canvas.width * 0.388125,
    canvas.height * 0.9730769230769231
  );

  cx.fillText(
    "Automações",
    canvas.width * 0.260625,
    canvas.height * 0.9153846153846154
  );
  cx.fillText(
    "(Pipeline)",
    canvas.width * 0.273125,
    canvas.height * 0.9384615384615385
  );

  cx.fillText(
    "Práticas BDD/TDD",
    canvas.width * 0.13125,
    canvas.height * 0.8153846153846154
  );
  cx.fillText(
    "e Clean Code",
    canvas.width * 0.14375,
    canvas.height * 0.8384615384615385
  );

  cx.fillText(
    "Qualidade",
    canvas.width * 0.1,
    canvas.height * 0.6923076923076923
  );
  cx.fillText(
    "E2E",
    canvas.width * 0.11875,
    canvas.height * 0.7153846153846154
  );

  cx.fillText(
    "Práticas",
    canvas.width * 0.08125,
    canvas.height * 0.5461538461538461
  );
  cx.fillText(
    "DevOps",
    canvas.width * 0.08125,
    canvas.height * 0.5692307692307692
  );

  // Negócio
  cx.fillText(
    "Quebra de Stories,",
    canvas.width * 0.03125,
    canvas.height * 0.43846153846153846
  );
  cx.fillText(
    "Features e Epics",
    canvas.width * 0.0375,
    canvas.height * 0.46153846153846156
  );

  cx.fillText("User", canvas.width * 0.1, canvas.height * 0.2846153846153846);
  cx.fillText(
    "Experience",
    canvas.width * 0.08125,
    canvas.height * 0.3076923076923077
  );

  //cx.fillText("Processo de",canvas.width * 0.14375 ,canvas.height * 0.16923076923076924);
  //cx.fillText("Criação",canvas.width * 0.159375 ,canvas.height * 0.19230769230769232);
  cx.fillText(
    "Entrega de",
    canvas.width * 0.15375,
    canvas.height * 0.14923076923076924
  );
  cx.fillText(
    "Valor",
    canvas.width * 0.169375,
    canvas.height * 0.17230769230769232
  );

  //cx.fillText("Entrega de",canvas.width * 0.26875 ,canvas.height * 0.08076923076923077);
  //cx.fillText("valor",canvas.width * 0.29375 ,canvas.height * 0.10384615384615385);
  cx.fillText(
    "Relacionamento",
    canvas.width * 0.24875,
    canvas.height * 0.06076923076923077
  );
  cx.fillText(
    "com negócio",
    canvas.width * 0.27375,
    canvas.height * 0.08384615384615385
  );

  cx.fillText(
    "Satisfação",
    canvas.width * 0.39125,
    canvas.height * 0.026923076923076925
  );
  cx.fillText("do cliente", canvas.width * 0.394375, canvas.height * 0.05);
*/
  // Informações do time e data
  cx.font = 0.0125 * canvas.width + "px Arial";

  cx.fillText(
    "Time: " + chartProps.time,
    canvas.width * 0.0125,
    canvas.height * 0.09230769230769231
  );

  cx.fillText(
    "Data: " + chartProps.date,
    canvas.width * 0.0125,
    canvas.height * 0.11538461538461539
  );

  imgData = canvas.toDataURL();
  cx.restore();
}
