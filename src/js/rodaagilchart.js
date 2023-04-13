var results = [];
var canvasShow = document.querySelector("#canvas-show");
var canvasOut = document.querySelector("#canvas-out");

var formEditor = document.querySelector("#graph-editor");
// obtém o source da imagem
var imgData = canvasOut.toDataURL(); // por padrão, a imagem é PNG

var results = [];
function changeResults() {
  for (var i = 0; i < 20; i++) {
    var input = formEditor.querySelector('input[name="' + i + '"]');
    results[i] = {
      value: input ? input.value : '',
    };
  }
}

function draw(canvas) {
  var cx = canvas.getContext("2d");

  var centerX = canvas.width / 2;
  canvas.height = 0.8125 * canvas.width;
  var centerY = canvas.height / 2;
  var sizeControl = 0.065 * canvas.width;

  cx.save();

  cx.fillStyle = "white";
  cx.fillRect(0, 0, canvas.width, canvas.height);
  cx.rect(0, 0, canvas.width, canvas.height);
  cx.stroke();
  changeResults();

  colors = ["#ff7474", "#ff7474", "#ffd63f", "#00b7ad", "#00b7ad"];
  var currentAngle = -0.5 * Math.PI;
  var sliceAngle = (1 / 20) * 2 * Math.PI;

  for (var i = 5; i > 0; i--) {
    results.forEach(function (result) {
      color = result.value >= i ? colors[i - 1] : "white";
      cx.beginPath();

      cx.arc(
        centerX,
        centerY,
        sizeControl * i,
        currentAngle,
        currentAngle + sliceAngle
      );
      currentAngle += sliceAngle;
      cx.lineTo(centerX, centerY);
      cx.fillStyle = color;
      cx.fill();
      cx.stroke();
    });
  }
  count = 0;
  results.forEach(function (result) {
    if (count == 4 || count == 9 || count == 14 || count == 19) {
      var lineWidth = 6;
    } else {
      var lineWidth = 1;
    }
    count++;
    cx.beginPath();
    cx.arc(
      centerX,
      centerY,
      sizeControl * 6,
      currentAngle,
      currentAngle + sliceAngle,
      true
    );
    currentAngle += sliceAngle;
    cx.lineTo(centerX, centerY);
    cx.lineWidth = lineWidth;
    cx.stroke();
  });

  results.forEach(function (result) {
    cx.beginPath();

    cx.arc(
      centerX,
      centerY,
      sizeControl * 6,
      currentAngle,
      currentAngle + sliceAngle,
      true
    );
    currentAngle += sliceAngle;
    cx.lineWidth = 10;
    cx.strokeStyle = "white";
    cx.stroke();
  });

  // Textos do gráfico
  cx.font = 0.03125 * canvas.width + "px  Arial";
  cx.fillStyle = "#000";
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

  // Cultura
  cx.font = 0.01625 * canvas.width + "px Arial";
  cx.fillText(
    "Colaboração e",
    canvas.width * 0.51,
    canvas.height * 0.0269
  );
  cx.fillText(" comunicação", canvas.width * 0.51, canvas.height * 0.05);

  cx.fillText("Motivação e", canvas.width * 0.64, canvas.height * 0.0607);
  cx.fillText(" confiança", canvas.width * 0.64, canvas.height * 0.0847);

  cx.fillText("Autonomia e", canvas.width * 0.75, canvas.height * 0.15);
  cx.fillText(
    "auto-organização",
    canvas.width * 0.73,
    canvas.height * 0.17
  );

  cx.fillText("Kaizen", canvas.width * 0.82, canvas.height * 0.284);

  cx.fillText(
    "Interdisciplinaridade",
    canvas.width * 0.83,
    canvas.height * 0.434
  );

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
  cx.fillText(
    "Sutentável",
    canvas.width * 0.394375,
    canvas.height * 0.95
  );
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

  cx.fillText(
    "User",
    canvas.width * 0.1,
    canvas.height * 0.2846153846153846
  );
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
  cx.fillText(
    "do cliente",
    canvas.width * 0.394375,
    canvas.height * 0.05
  );

  // Informações do time e data
  cx.font = 0.0125 * canvas.width + "px Arial";

  var inputTime = formEditor.querySelector("input[name=time]")
  cx.fillText(
    "Time: " + (inputTime ? inputTime.value : ''),
    canvas.width * 0.0125,
    canvas.height * 0.09230769230769231
  );
  var inputDate = formEditor.querySelector("input[name=date]")
  cx.fillText(
    "Data: " + (inputDate ? inputDate.value : ''),
    canvas.width * 0.0125,
    canvas.height * 0.11538461538461539
  );

  imgData = canvas.toDataURL();
  cx.restore();
}

formEditor.addEventListener("change", function () {
  console.log(1);
  draw(canvasShow);
});
// salva imagem
document.getElementById("salvar").addEventListener("click", function (e) {
  draw(canvasOut);
  this.href = imgData; // source
  this.download = "Roda-Agil.png"; // nome da imagem
  return false;
});

draw(canvasShow);