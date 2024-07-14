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
      console.error(`Failed to load exchange configuration: ${error.message}`); // Fixed syntax for error message logging
      return null;
    }
  }

  /**
  * Updates existing exchange configuration in the file with new values.
  * If the file does not exist, it behaves like saveExchangeConfiguration.
  * @param {string} exchangeName The name of the exchange.
  * @param {Object} newConfig An object containing the new apiKey and/or apiSecret.
  */
  updateExchangeConfiguration(exchangeName, newConfig = {}) {
    let config;
    try {
      config = JSON.parse(fs.readFileSync(this.infoFilePath, 'utf8'));
      // Only update fields that are provided.
      if (newConfig.apiKey) {
        config.apiKey = newConfig.apiKey;
      }
      if (newConfig.apiSecret) {
        config.apiSecret = newConfig.apiSecret;
      }
      config.exchangeName = exchangeName; // Always update the exchange name in case it's new or changed.
      fs.writeFileSync(this.infoJsonPath, JSON.stringify(config, null, 2), 'utf8');
    } catch (error) {
      // In case there's an error reading the file (e.g., file doesn't exist), just save the new config
      this.saveExchangeConfiguration(exhibitName, newConfig.apiKey, newConfig.apiSecret);
      console.log(`Updated or created new configuration due to error: ${error.message}`);
    }
  }
}

module.exports = Exchange;