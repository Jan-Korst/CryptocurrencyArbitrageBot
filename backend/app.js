require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const arbitrageRoutes = require('./routes/arbitrageRoutes');

const connectionString = process.env.MONGO_URI;
const serverPort = process.env.PORT || 3000;

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection established...'))
  .catch(err => console.error('MongoDB connection error:', err));

server.use('/api/arbitrage', arbitrageSessions);

async function checkArbitrageOpportunities() {
  const exchange1PricePromise = fetchPriceFromExchange1();
  const exchange2PricePromise = fetchPriceFromExchange2();

  const [exchange1Price, exchange2Price] = await Promise.all([exchange1PricePromise, exchange2PricePromise]);
  
  if (exchange1Price.BTC > exchange2Price.BTC) {
    console.log(`Arbitrage opportunity: Buy on Exchange 2 at ${exchange2Price.BTC} and sell on Exchange 1 at ${exchange1Price.BTC}`);
  } else if (exchange1Price.BTC < exchange2Price.BTC) {
    console.log(`Arbitrage opportunity: Buy on Exchange 1 at ${exchange1Price.BTC} and sell on Exchange 2 at ${exchange2Price.BTC}`);
  } else {
    console.log('No arbitrage opportunity found.');
  }
}

async function fetchPriceFromExchange1() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ BTC: 19000 }), 1000);
  });
}

async function fetchPriceFromExchange2() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ BTC: 19100 }), 1000);
  });
}

server.listen(serverPort, () => {
  console.log(`Arbitrage Server is running on port ${serverPort}`);
});

server.use('/api/arbitrage', arbitrageRoutes);