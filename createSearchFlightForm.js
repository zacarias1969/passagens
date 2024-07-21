const fs = require('fs');

// Função para ler o arquivo JSON e retornar um array de aeroportos
function lerArquivoAeroportos(filePath) {
    const dados = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(dados);
}

const aeroportos = lerArquivoAeroportos('aeroportos.json');

// Criação de um array de strings para cada aeroporto
const opcoesAeroportos = aeroportos.map(aeroporto => 
    `${aeroporto.city} (${aeroporto.iata}) ${aeroporto.airport} / ${aeroporto.country}`
);

// Gerar HTML do datalist
let datalistOptions = '';
opcoesAeroportos.forEach(opcao => {
    datalistOptions += `<option value="${opcao}">\n`;
});

// Escrever o HTML do datalist em um arquivo
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Viajando de Primeira</title>
    <link rel="icon" type="image/png" href="imagens/favIcon.png">
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        h1 {
            text-align: center;
        }
        form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }
        .checkbox-group {
            display: flex;
            gap: 10px;
        }
    </style>
</head>
<body>
    <div>
        <h1>Viajando de Primeira</h1>
        <form>
            <div class="checkbox-group">
                <label for="origem">Origem:</label>
                <input list="airportsOrigem" id="origem" name="origem" placeholder="Digite o aeroporto de origem">
                <datalist id="airportsOrigem">
                ${datalistOptions}
                </datalist>
            
                <label for="destino">Destino:</label>
                <input list="airportsDestino" id="destino" name="destino" placeholder="Digite o aeroporto de destino">
                <datalist id="airportsDestino">
                ${datalistOptions}
                </datalist>
            </div>
            
            <input type="submit" value="Pesquisar">
        </form>
    </div>
</body>
</html>

`;

fs.writeFileSync('./forms/searchFlight.html', htmlContent);
console.log('Arquivo formulario.html criado com sucesso!');
