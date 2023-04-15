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
  canvas.height = canvas.width;
  chartValues.centerY = canvas.height / 2;
  chartValues.sizeControl = 0.075 * canvas.width;

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

function drawHeaders(cx, chartProps) {
  // Textos do gráfico
  cx.font = 0.03125 * chartValues.width + "px  Arial";
  cx.fillStyle = chartProps.colors.text;

  cx.fillText(
    "Valor",
    chartValues.width * 0.00625,
    chartValues.height * 0.038461538461538464
  );

  cx.font = 0.015 * chartValues.width + "px  Arial";
  cx.fillText(
    "a Todo instante",
    chartValues.width * 0.00825,
    chartValues.height * 0.059661538461538464
  );

  cx.font = 0.03125 * chartValues.width + "px  Arial";
  cx.fillText(
    "Pessoas",
    chartValues.width * 0.875,
    chartValues.height * 0.038461538461538464
  );
  cx.font = 0.015 * chartValues.width + "px  Arial";
  cx.fillText(
    "sensacionais",
    chartValues.width * 0.905,
    chartValues.height * 0.059461538461538464
  );

  heightTitle = chartValues.height * 0.9469230769230769;
  heightSubTitle = chartValues.height * 0.9769230769230769;

  cx.font = 0.03125 * chartValues.width + "px  Arial";
  cx.fillText("Experimente", chartValues.width * 0.82, heightTitle);
  cx.font = 0.015 * chartValues.width + "px  Arial";
  cx.fillText("e aprenda rápido", chartValues.width * 0.88125, heightSubTitle);

  cx.font = 0.03125 * chartValues.width + "px  Arial";
  cx.fillText("Segurança", chartValues.width * 0.00625, heightTitle);
  cx.font = 0.015 * chartValues.width + "px  Arial";
  cx.fillText("um pré requisito", chartValues.width * 0.00625, heightSubTitle);

  // Informações do time e data
  cx.font = 0.0125 * chartValues.width + "px Arial";

  cx.fillText(
    "Time: " + chartProps.time,
    chartValues.width * 0.0125,
    chartValues.height * 0.09230769230769231
  );

  cx.fillText(
    "Data: " + chartProps.date,
    chartValues.width * 0.0125,
    chartValues.height * 0.11538461538461539
  );
}

function splitText(txt) {
  return txt.split(" ").reduce(
    (last, curr) => {
      const size = last[last.length - 1].length + curr.length;
      if (size < 17) {
        last[last.length - 1] += " " + curr;
      } else {
        last.push(curr);
      }
      return last;
    },
    [""]
  );
}

function drawTitles(cx, chartProps) {
  // Cultura
  cx.font = 0.015 * chartValues.width + "px Arial";
  cx.fillStyle = chartProps.colors.text;

  for (var key in chartProps.itens) {
    var item = chartProps.itens[key];
    const titles = splitText(item.title);

    for (var keyTxt in titles) {
      const title = titles[keyTxt];
      cx.save();

      var angle = key * chartValues.sliceAngle + chartValues.sliceAngle * 0.05 + (keyTxt * 0.006);
      var distance = chartValues.height * 0.48 - (chartValues.height * keyTxt * 0.02);
      var x = distance * Math.cos(angle);
      var y = distance * Math.sin(angle);

      cx.translate(x + chartValues.centerX, y + chartValues.centerY);
      cx.rotate(angle + Math.PI / 1.9);

      cx.fillText(title, 0, 0);

      cx.restore();
    }
  }
}

function draw(canvas, chartProps) {
  var cx = canvas.getContext("2d");
  cx.save();

  configureChart(canvas, chartProps);
  drawBorder(cx, canvas.width, canvas.height);
  drawScore(cx, chartProps);
  drawLines(cx, chartProps);

  drawHeaders(cx, chartProps);
  drawTitles(cx, chartProps);

  imgData = canvas.toDataURL();

  cx.restore();
}
