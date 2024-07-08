const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
class Exchange {
  constructor() {
    this.filePath = path.join(__dirname, 'exchangeInfo.json');
  }
  saveExchangeInfo(name, apiKey, secret) {
    const exchangeInfo = {
      name,
      apiKey: apiKey ? apiKey : process.env.API_KEY, 
      secret: secret ? secret : process.env.SECRET,
    };
    fs.writeFileSync(this.filePath, JSON.stringify(exchangeInfo, null, 2), 'utf8');
  }
  getExchangeInfo() {
    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    }
    return null;
  }
}
module.exports = Exchange;