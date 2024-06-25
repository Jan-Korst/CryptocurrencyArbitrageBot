require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const arbitrageRoutes = require('./routes/arbitrageRoutes');

const mongoDBConnectionString = process.env.MONGO_URI;
const applicationPort = process.env.PORT || 3000;

const arbitrageServer = express();

arbitrageServer.use(cors());
arbitrageServer.use(bodyParser.json());
arbitrageServer.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(mongoDBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection established...'))
  .catch(err => console.error('MongoDB connection error:', err));

arbitrageServer.use('/api/arbitrage', arbitrageRoutes);

async function identifyArbitrageOpportunities() {
  const priceFromExchangeOnePromise = getPriceFromExchangeOne();
  const priceFromExchangeTwoPromise = getPriceFromExchangeTwo();

  const [priceFromExchangeOne, priceFromExchangeTwo] = await Promise.all([priceFromExchangeOnePromise, priceFromExchangeTwoPromise]);
  
  if (priceFromExchangeOne.BTC > priceFromExchangeTwo.BTC) {
    console.log(`Arbitrage opportunity: Buy on Exchange 2 at ${priceFromExchangeTwo.BTC} and sell on Exchange 1 at ${priceFromExchangeOne.BTC}`);
  } else if (priceFromExchangeOne.BTC < priceFromExchangeTwo.BTC) {
    console.log(`Arbitrage opportunity: Buy on Exchange 1 at ${priceFromExchangeOne.BTC} and sell on Exchange 2 at ${priceFromExchangeTwo.BTC}`);
  } else {
    console.log('No arbitrage opportunity found.');
  }
}

async function getPriceFromExchangeOne() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ BTC: 19000 }), 1000); // Simulated fetch price
  });
}

async function getPriceFromExchangeTwo() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ BTC: 19100 }), 1000); // Simulated fetch price
  });
}

arbitrageServer.listen(applicationPort, () => {
  console.log(`Arbitrage Server is running on port ${applicationPort}`);
});

arbitrageServer.use('/api/arbitrage', arbitrageRoutes);