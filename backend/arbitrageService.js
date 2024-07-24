const axios = require('axios');
require('dotenv').config();

const EXCHANGE_A_URL = process.env.EXCHANGE_A_URL;
const EXCHANGE_B_URL = process.env.EXCHANGE_B_URL;
const API_KEY_EXCHANGE_A = process.env.API_KEY_EXCHANGE_A;
const API_KEY_EXCHANGE_B = process.env.API_KEY_EXCHANGE_B;

const createRequestConfig = (apiKey, isExchangeA) => {
    if (isExchangeA) {
        return { headers: { 'X-API-KEY': apiKey }};
    } else {
        return { headers: { 'Authorization': `Bearer ${apiKey}` }};
    }
};

const buildEndpoint = (currencyPair, isExchangeA) => {
    return isExchangeA
        ? `/api/v3/ticker/price?symbol=${currencyPair}`
        : `/api/v1/prices/${currencyPair}`;
};

const fetchPrice = async (url, apiKey, currencyPair, isExchangeA = true) => {
    try {
        const endpoint = buildEndpoint(currencyPair, isExchangeA);
        const config = createRequestConfig(apiKey, isExchangeA);

        const response = await axios.get(url + endpoint, config);
        return parseFloat(response.data.price);
    } catch (error) {
        console.error(`Error fetching price from ${isExchangeA ? 'Exchange A' : 'Exchange B'}:`, error.message);
        return null;
    }
};

const detectArbitrageOpportunity = async (currencyPair) => {
    try {
        const priceA = await fetchPrice(EXCHANGE_A_URL, API_KEY_EXCHANGE_A, currencyPair, true);
        const priceB = await fetchPrice(EXCHANGE_B_URL, API_KEY_EXCHANGE_B, currencyPair, false);

        if (!priceA || !priceB) {
            console.log('Prices could not be fetched, aborting arbitrage detection.');
            return;
        }

        const profitAB = ((priceA - priceB) / priceB) * 100;
        const profitBA = ((priceB - priceA) / priceA) * 100;

        if (profitAB > 0) {
            console.log(`Arbitrage opportunity detected! Buy from Exchange B at ${priceB} and sell on Exchange A at ${priceA}. Potential profit: ${profitAB.toFixed(2)}%`);
        } else if (profitBA > 0) {
            console.log(`Arbitrage opportunity detected! Buy from Exchange A at ${priceA} and sell on Exchange B at ${priceB}. Potential profit: ${profitBA.toFixed(2)}%`);
        } else {
            console.log('No arbitrage opportunity detected.');
        }
    } catch (error) {
        console.error('Error detecting arbitrage opportunity:', error.message);
    }
};

detectArbitrageOpportunity('BTCUSDT');

module.exports = { fetchPrice, detectArbitrageOpportunity };