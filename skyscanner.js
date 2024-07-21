const axios = require('axios');
const fs = require('fs');

async function checkServerStatus() {
    const options = {
        method: 'GET',
        url: 'https://skyscanner80.p.rapidapi.com/api/v1/checkServer',
        headers: {
            'x-rapidapi-key': '191599b847mshb9cc3b397d127d1p1f057fjsn421d4f6997fe',
            'x-rapidapi-host': 'skyscanner80.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error checking server status:', error);
        throw error;
    }
}

async function getConfig() {
    const options = {
        method: 'GET',
        url: 'https://skyscanner80.p.rapidapi.com/api/v1/get-config',
        headers: {
            'x-rapidapi-key': '191599b847mshb9cc3b397d127d1p1f057fjsn421d4f6997fe',
            'x-rapidapi-host': 'skyscanner80.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const configData = response.data;

        fs.writeFileSync('config.json', JSON.stringify(configData, null, 2), 'utf8');
        console.log('Config data saved to config.json');

        return configData;
    } catch (error) {
        console.error('Error getting config:', error);
        throw error;
    }
}

async function autoComplete() {
    const options = {
        method: 'GET',
        url: 'https://skyscanner80.p.rapidapi.com/api/v1/flights/auto-complete',
        params: {
            query: 'cwb',
            market: 'US',
            locale: 'en-US'
        },
        headers: {
            'x-rapidapi-key': '191599b847mshb9cc3b397d127d1p1f057fjsn421d4f6997fe',
            'x-rapidapi-host': 'skyscanner80.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error in auto-complete:', error);
        throw error;
    }
}

module.exports = { checkServerStatus, getConfig, autoComplete };
