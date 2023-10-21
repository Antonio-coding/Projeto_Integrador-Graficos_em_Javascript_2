// Importe as bibliotecas necessárias
import Chart from 'chart.js/auto';

// Seleciona os elementos do canvas
const actorsCanvas = document.getElementById('actorsChart');
const actressesCanvas = document.getElementById('actressesChart');

// Função para carregar dados do arquivo CSV e criar gráficos
function createChartFromCSV(canvas, data, label, backgroundColor, borderColor) {
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: label,
                data: data.data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Função para ler dados CSV
function readCSV(file, canvas, gender) {
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            // Filtra os resultados com base no gênero
            const filteredResults = results.data.filter(item => item.Gender === gender);

            const labels = filteredResults.map(item => item.Year);
            const data = filteredResults.map(item => item.Age);

            createChartFromCSV(canvas, {
                labels,
                data
            }, `Idade dos Vencedores do Oscar (${gender})`, 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)');
        }
    });
}

// Carregando e criando gráficos para atores e atrizes
fetch('./baseDados/oscar_age.csv') // Substitua pelo caminho correto para o arquivo CSV dos atores
    .then(response => response.text())
    .then(data => readCSV(data, actorsCanvas, 'Atores'));

fetch('./baseDados/oscar_age.csv') // Substitua pelo caminho correto para o arquivo CSV das atrizes
    .then(response => response.text())
    .then(data => readCSV(data, actressesCanvas, 'Atrizes'));
