var results = [];
var canvasShow = document.querySelector("#canvas-show");
var canvasOut = document.querySelector("#canvas-out");
var imgData = canvasOut.toDataURL(); // por padrão, a imagem é PNG
var fontFamily = "Roboto";

var chartValues = {
  fontTitle: "0px " + fontFamily,
  startAngle: -0.5 * Math.PI,
  currentAngle: -0.5 * Math.PI,
  sliceAngle: (1 / 20) * 2 * Math.PI,
  centerX: 0,
  centerY: 0,
  sizeControl: 0,
  height: 0,
  width: 0,
};

//
function loadProps(chartProps) {
  chartProps.itens = chartProps.groups.map((curr) => curr.itens).flat();
}

function configureChart(canvas, chartProps) {
  chartValues.sliceAngle = (1 / chartProps.itens.length) * 2 * Math.PI;

  chartValues.centerX = canvas.width / 2;
  canvas.height = canvas.width * 1.05;
  chartValues.centerY = canvas.height / 1.92;
  chartValues.sizeControl = 0.082 * canvas.width;

  chartValues.width = canvas.width;
  chartValues.height = canvas.height;

  chartValues.fontTitle = 0.03125 * chartValues.width + "px " + fontFamily;
  chartValues.fontSubtitle = 0.015 * chartValues.width + "px " + fontFamily;
}

function makeScorePath(centerX, centerY, radius, startAngle, endAngle) {
  var path = new Path2D();
  path.arc(centerX, centerY, radius, startAngle, endAngle);
  path.lineTo(centerX, centerY);

  return path;
}

function drawBorder(cx, width, height) {
  cx.fillStyle = "white";
  cx.strokeStyle = chartProps.colors.text;

  cx.fillRect(0, 0, width, height);
  cx.rect(0, 0, width, height);
  if (chartProps.drawborder) {
    cx.stroke();
  }
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
      if (result.value > 5) result.value = 5;
      if (result.value < 1) result.value = 1;

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
  const { width, height } = chartValues;
  chartValues;

  // Textos do gráfico
  cx.font = chartValues.fontTitle;
  cx.fillStyle = chartProps.colors.text;

  if (chartProps.showTitle) {
    cx.fillText(
      chartProps.time || "Informe um título",
      width * 0.0125,
      height * 0.038461538461538464
    );
  }

  if (chartProps.showDate) {
    cx.fillText(chartProps.date, width * 0.821, height * 0.038461538461538464);
  }

  heightTitle = height * 0.10230769230769231;
  heightSubTitle = height * 0.12330769230769231;

  if (chartProps.showSubtitles) {
    if (chartProps.groups.length > 0) {
      cx.font = chartValues.fontTitle;
      cx.fillText(chartProps.groups[0].title, width * 0.0125, heightTitle);
      cx.font = chartValues.fontSubtitle;
      cx.fillText(
        chartProps.groups[0].subtitle,
        width * 0.0125,
        heightSubTitle
      );
    }

    if (chartProps.groups.length > 1) {
      cx.font = chartValues.fontTitle;
      cx.fillText(chartProps.groups[1].title, width * 0.865, heightTitle);
      cx.font = chartValues.fontSubtitle;
      cx.fillText(chartProps.groups[1].subtitle, width * 0.895, heightSubTitle);
    }

    heightTitle = height * 0.9569230769230769;
    heightSubTitle = height * 0.9769230769230769;

    if (chartProps.groups.length > 2) {
      cx.font = chartValues.fontTitle;
      cx.fillText(chartProps.groups[2].title, width * 0.81, heightTitle);
      cx.font = chartValues.fontSubtitle;
      cx.fillText(
        chartProps.groups[2].subtitle,
        width * 0.87125,
        heightSubTitle
      );
    }

    if (chartProps.groups.length > 3) {
      cx.font = chartValues.fontTitle;
      cx.fillText(chartProps.groups[3].title, width * 0.0125, heightTitle);
      cx.font = chartValues.fontSubtitle;
      cx.fillText(
        chartProps.groups[3].subtitle,
        width * 0.0125,
        heightSubTitle
      );
    }
  }
}

function splitText(txt) {
  return txt.split(" ").reduce(
    (last, curr, idx) => {
      const size = last[last.length - 1].length + curr.length;
      if (!idx || size < 17) {
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
  cx.font = 0.015 * chartValues.width + "px " + fontFamily;
  cx.fillStyle = chartProps.colors.text;

  for (var key in chartProps.itens) {
    var item = chartProps.itens[key];
    const titles = splitText(item.title);

    for (var keyTxt in titles) {
      const title = titles[keyTxt];
      cx.save();

      var angle =
        key * chartValues.sliceAngle +
        Math.PI * 1.5 +
        chartValues.sliceAngle * 0.02 +
        keyTxt * 0.005;
      var distance =
        chartValues.width * 0.47 - chartValues.width * keyTxt * 0.02;
      var x = distance * Math.cos(angle);
      var y = distance * Math.sin(angle);

      cx.translate(x + chartValues.centerX, y + chartValues.centerY);
      cx.rotate(angle + Math.PI / 1.85);

      cx.fillText(title, 0, 0);

      cx.restore();
    }
  }
}

function draw(canvas, chartProps) {
  var cx = canvas.getContext("2d");
  cx.save();

  loadProps(chartProps);
  configureChart(canvas, chartProps);
  drawBorder(cx, canvas.width, canvas.height);
  drawScore(cx, chartProps);
  drawLines(cx, chartProps);

  drawHeaders(cx, chartProps);
  drawTitles(cx, chartProps);

  imgData = canvas.toDataURL();

  cx.restore();
}
