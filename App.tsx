import React, { useEffect, useState } from 'react';

interface ArbitrageOpportunity {
  id: string;
  exchange: string;
  currencyPair: string;
  priceDifference: string;
};

const App: React.FC = () => {
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [exchanges, setExchanges] = useState<string[]>([]);
  const [newExchange, setNewExchange] = useState<string>('');

  const fetchArbitrageOpportunities = async () => {
    const mockData: ArbitrageOpportunity[] = [
      { id: '1', exchange: 'Binance', currencyPair: 'BTC/USD', priceDifference: '2%' },
      { id: '2', exchange: 'Coinbase', currencyPair: 'ETH/USD', priceDifference: '1.5%' },
    ];
    setOpportunities(mockData);
  };

  useEffect(() => {
    fetchArbitrageOpportunities();
  }, []);

  const handleAddExchange = () => {
    if (newExchange) {
      setExchanges([...exchanges, newExchange]);
      setNewExchange('');
    }
  };

  return (
    <div>
      <h1>Cryptocurrency Arbitrage Bot</h1>
      <div>
        <h2>Arbitrage Opportunities</h2>
        <ul>
          {opportunities.map(opportunity => (
            <li key={opportunity.id}>
              {opportunity.exchange} | {opportunity.currencyPair} | {opportunity.priceDifference}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Add Exchange</h2>
        <input 
          type="text" 
          value={newExchange} 
          onChange={e => setNewExchange(e.target.value)} 
          placeholder="Enter exchange name"
        />
        <button onClick={handleAddExchange}>Add Exchange</button>
      </div>
      <div>
        <h3>Monitored Exchanges</h3>
        <ul>
          {exchanges.map((exchange, index) => (
            <li key={index}>{exchange}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;