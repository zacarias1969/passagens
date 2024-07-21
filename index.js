const { checkServerStatus, getConfig, autoComplete } = require('./skyscanner');

// Função para imprimir texto colorido no console
function printGreen(message) {
    console.log(`\x1b[32m${message}\x1b[0m`);
}

async function main() {
    try {
        const status = await checkServerStatus();
        printGreen(status.message);

        const config = await getConfig();
        //console.log('Config data:', config);

        const autoCompleteData = await autoComplete();
        console.log('Auto-complete data:');

        // Verifica se o objeto retornado possui a chave 'data'
        if (autoCompleteData && autoCompleteData.data && Array.isArray(autoCompleteData.data)) {
            autoCompleteData.data.forEach(item => {
                console.log(`ID: ${item.id}`);

                // Verifica se as propriedades presentation e navigation existem diretamente em item
                if (item.presentation) {
                    console.log(`Presentation: ${JSON.stringify(item.presentation)}`);
                } else {
                    console.log('Presentation property not found.');
                }

                if (item.navigation) {
                    console.log(`Navigation: ${JSON.stringify(item.navigation)}`);
                } else {
                    console.log('Navigation property not found.');
                }
            });
        } else {
            console.log('Unexpected auto-complete data format:', autoCompleteData);
        }
    } catch (error) {
        console.error('Failed to get server status, config or auto-complete data:', error);
    }
}

main();
