import React, { FormEvent, useState } from 'react';

interface ExchangeFormData {
  onSubmitExchange: (exchangeDetails: { name: string; apiKey: string; secretKey: string }) => void;
}

const AddExchangeForm: React.FC<ExchangeFormData> = ({ onSubmitExchange }) => {
  const [exchangeName, setExchangeName] = useState('');
  const [exchangeApiKey, setExchangeApiKey] = useState('');
  const [exchangeSecretKey, setExchangeSecretKey] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    let tempErrors: {[key: string]: string} = {};
    if (!exchangeName) tempErrors.exchangeName = "Exchange Name is required.";
    if (!exchangeApiKey) tempErrors.exchangeApiKey = "API Key is required.";
    if (!exchangeSecretKey) tempErrors.exchangeSecretKey = "Secret Key is required.";
    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    onSubmitExchange({ name: exchangeName, apiKey: exchangeApikey, secretKey: exchangeSecretKey });
    
    resetFormFields();
  };

  const resetFormFields = () => {
    setExchangeName('');
    setExchangeApiKey('');
    setExchangeSecretKey('');
    setErrors({});
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
        {errors.exchangeName && <div style={{color: 'red'}}>{errors.exchangeName}</div>}
      </div>
      <div>
        <label htmlFor="exchangeApiKey">API Key:</label>
        <input
          id="exchangeApiKey"
          type="text"
          value={exchangeApiKey}
          onChange={(e) => setExchangeApiKey(e.target]="[object Object]"= e.target.value)}
        />
        {errors.exchangeApiKey && <div style={{color: 'red'}}>{errors.exchangeApiKey}</div>}
      </div>
      <div>
        <label htmlFor="exchangeSecretKey">Secret Key:</label>
        <input
          id="exchangeSecretKey"
          type="text"
          value={exchangeSecretKey}
          onChange={(e) => setExchangeSecretKey(e.target.value)}
        />
        {errors.exchangeSecretKey && <div style={{color: 'red'}}>{errors.exchangeSecretKey}</div>}
      </div>
      <button type="submit">Add Exchange</button>
    </form>
  );
};

export default AddExchangeForm;