   // Cores para o gradiente dinâmico
   var colors = [
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]
];

var step = 0;
var colorIndices = [0, 1, 2, 3];
var gradientSpeed = 0.002;

function updateGradient() {
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    // Aplica o gradiente dinâmico no fundo
    document.getElementById('gradient').style.background = 
        "linear-gradient(to right, " + color1 + ", " + color2 + ")";

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    }
}

// Atualiza o gradiente a cada 10ms
setInterval(updateGradient, 10);

// Função para converter os dados para JSON
function convertToJSON() {
    const inputData = document.getElementById('inputData').value;
    const lines = inputData.split('\n');
    const headers = lines[0].split('\t').map(header => header.trim());
    const jsonOutput = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split('\t').map(value => value.trim());
        if (values.length === headers.length) {
            let rowObject = {};
            for (let j = 0; j < headers.length; j++) {
                rowObject[headers[j]] = values[j];
            }
            jsonOutput.push(rowObject);
        }
    }

    document.getElementById('output').textContent = JSON.stringify(jsonOutput, null, 4);
}

// Função para copiar o JSON para a área de transferência
function copyToClipboard() {
    const output = document.getElementById('output').textContent;
    const textarea = document.createElement('textarea');
    textarea.value = output;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    document.getElementById('copyMessage').textContent = 'JSON copiado para a área de transferência!';
    setTimeout(() => document.getElementById('copyMessage').textContent = '', 3000);
}