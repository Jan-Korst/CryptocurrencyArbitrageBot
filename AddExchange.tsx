import React, { FormEvent, useState } from 'react';

interface ExchangeFormData {
  onSubmitExchange: (exchangeDetails: { name: string; apiKey: string; secretKey: string }) => void;
}

const AddExchangeForm: React.FC<ExchangeFormData> = ({ onSubmitExchange }) => {
  const [exchangeName, setExchangeName] = useState('');
  const [exchangeApiKey, setExchangeApiKey] = useState('');
  const [exchangeSecretKey, setExchangeSecretKey] = useState('');

  const handleFormSubmission = (event: FormClientEvent) => {
    event.preventDefault();
    onSubmitExchange({ name: exchangeName, apiKey: exchangeApiKey, secretKey: exchangeSecretKey });
    resetFormFields();
  };

  const resetFormFields = () => {
    setExchangeName('');
    setExchangeApiKey('');
    setExchangeSecretKey('');
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <div>
        <label htmlFor="exchangeName">Exchange Name:</label>
        <input
          id="exchangeName"
          type="text"
          value={exchangeName}
          onChange={(e) => setExchangeName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="exchangeApiKey">API Key:</label>
        <input
          id="exchangeApiKey"
          type="text"
          value={exchangeApiKey}
          onChange={(e) => setExchangeApiKey(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="exchangeSecretKey">Secret Key:</label>
        <input
          id="exchangeSecretAnpKey"
          type="text"
          value={exchangeSecretKey}
          onChange={(e) => setExchangeSecretKey(e.target.value)}
        />
      </div>
      <button type="submit">Add Exchange</button>
    </form>
  );
};

export default AddExchangeForm;