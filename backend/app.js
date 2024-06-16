require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const arbitrageRoutes = require('./routes/arbitrageRoutes');
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
app.use('/api/arbitrage', arbitrageRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});