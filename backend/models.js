const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

class Exchange {
  constructor() {
    this.filePath = path.join(__dirname, 'exchangeInfo.json');
  }

  saveExchangeInfo(name, apiKey = process.env.API_KEY, secret = process.env.SECRET) {
    const exchangeInfo = { name, apiKey, secret };
    fs.writeFileSync(this.filePath, JSON.stringify(exchangeInfo, null, 2), 'utf8');
  }

  getExchangeInfo() {
    try {
      return JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    } catch (e) {
      return null;
    }
  }
}

module.exports = Exchange;