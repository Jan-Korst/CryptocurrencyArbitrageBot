const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

class Exchange {
  constructor() {
    this.infoFilePath = path.join(__dirname, 'exchangeInfo.json'); // Renamed for clarity
  }

  /**
  * Saves exchange configuration information to a file.
  * @param {string} exchangeName The name of the exchange.
  * @param {string} apiKey The API key for the exchange, defaults to environment variable.
  * @param {string} apiSecret The Secret key for the exchange, defaults to environment variable.
  */
  saveExchangeConfiguration(exchangeName, apiKey = process.env.API_KEY, apiSecret = process.env.SECRET) {
    const config = { exchangeName, apiKey, apiSecret }; // Renamed for clarity and consistency
    fs.writeFileSync(this.infoFilePath, JSON.stringify(config, null, 2), 'utf8');
  }

  /**
  * Retrieves exchange configuration information from a file.
  * @return {Object|null} The exchange configuration or null if the file does not exist or an error occurs.
  */
  loadExchangeConfiguration() { // Renamed for clarity
    try {
      return JSON.parse(fs.readFileSync(this.infoFilePath, 'utf8'));
    } catch (error) { // Renamed for clarity
      console.error(`Failed to load exchange configuration: ${ .message}`); // Added error logging for better feedback
      return null;
    }
  }
}

module.exports = Exchange;