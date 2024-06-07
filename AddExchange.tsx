import React, { FormEvent, useState } from 'react';

interface AddExchangeProps {
  onAddExchange: (exchange: { name: string; apiKey: string; secret: string }) => void;
}

const AddExchange: React.FC<AddExchangeProps> = ({ onAddExchange }) => {
  const [name, setName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [secret, setSecret] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddExchange({ name, apiKey, secret });
    setName('');
    setApiKey('');
    setSecret('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Exchange Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="apiKey">API Key:</label>
        <input
          id="apiKey"
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="secret">Secret:</label>
        <input
          id="secret"
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target. value)}
        />
      </div>
      <button type="submit">Add Exchange</button>
    </form>
  );
};

export default AddExchange;