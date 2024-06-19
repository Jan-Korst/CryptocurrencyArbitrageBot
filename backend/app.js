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

server.use('/api/arbitrage', arbitrageRoutes);

server.listen(serverPort, () => {
  console.log(`Arbitrage Server is running on port ${serverPort}`);
});