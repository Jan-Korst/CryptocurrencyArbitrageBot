const axios = require('axios');
require('dotenv').config();
const EXCHANGE_A_URL = process.env.EXCHANGE_A_URL;
const EXCHANGE_B_URL = process.env.EXCHANGE_B_URL;
const API_KEY_EXCHANGE_A = process.env.API_KEY_EXCHANGE_A;
const API_KEY_EXCHANGE_B = process.env.API_KEY_EXCHANGE_B;
const fetchExchangeAPrice = async (currencyPair) => {
    try {
        const response = await axios.get(`${EXCHANGE_A_URL}/api/v3/ticker/price?symbol=${currencyPair}`, {
            headers: {
                'X-API-KEY': API_KEY_EXCHANGE_A,
            },
        });
        return parseFloat(response.data.price);
    } catch (error) {
        console.error('Error fetching price from Exchange A:', error.message);
        return null;
    }
};
const fetchExchangeBPrice = async (currencyPair) => {
    try {
        const response = await axios.get(`${EXCHANGE_B_URL}/api/v1/prices/${currencyPair}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY_EXCHANGE_B}`,
            },
        });
        return parseFloat(response.data.price);
    } catch (error) {
                    console.error('Error fetching price from Exchange B:', error.message);
        return null;
    }
};
const detectArbitrageOpportunity = async (currencyPair) => {
    try {
        const priceA = await fetchExchangeAPrice(currencyPair);
        const priceB = await fetchExchangeBPrice(currencyPair);
        if (!priceA || !priceB) return;
        let profitOpportunity;
        if (priceA > priceB) {
            profitOpportunity = ((priceA - priceB) / priceB) * 100;
            console.log(`Arbitrage opportunity detected! Buy from Exchange B at ${priceB} and sell on Exchange A at ${priceA}. Potential profit: ${profitOpportunity.toFixed(2)}%`);
        } else if (priceB > priceA) {
            profitOpportunity = ((priceB - priceA) / priceA) * 100;
            console.log(`Arbitrage opportunity detected! Buy from Exchange A at ${priceA} and sell on Exchange B at ${priceB}. Potential profit: ${profitOpportunity.toFixed(2)}%`);
        } else {
            console.log('No arbitrage opportunity detected.');
        }
    } catch (error) {
        console.error('Error detecting arbitrage opportunity:', error.message);
    }
};
detectArbitrageOpportunity('BTCUSDT');
module.exports = { fetchExchangeAPrice, fetchExchangeBPrice, detectArbitrageOpportunity };