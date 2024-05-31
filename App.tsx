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
  const [refreshInterval, setRefreshInterval] = useState<number>(30000); // Refresh every 30 seconds

  const fetchArbitrageOpportunities = async () => {
    const mockData: ArbitrageOpportunity[] = [
      { id: '1', exchange: 'Binance', currencyPair: 'BTC/USD', priceDifference: '2%' },
      { id: '2', exchange: 'Coinbase', currencyPair: 'ETH/USD', priceDifference: '1.5%' },
    ];
    const newData = mockData.map(opportunity => ({
      ...opportunity,
      priceDifference: (parseFloat(opportunity.priceDifference.replace('%', '')) + Math.random() * 0.5).toFixed(2) + '%',
    }));
    setOpportunities(newData);
  };

  useEffect(() => {
    fetchArbitrageOpportunities();
    const interval = setInterval(() => {
      fetchArbitrageOpportunities();
    }, refreshInterval);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [refreshInterval]);

  const handleAddExchange = () => {
    if (newExchange && !exchanges.includes(newExchange)) {
      setExchanges([...exchanges, newExchange]);
      setNewExchange('');
    }
  };

  const handleRemoveExchange = (exchangeToRemove: string) => {
    setExchanges(exchanges.filter(exchange => exchange !== exchangeToRemove));
  };

  const handleRefreshIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interval = parseInt(e.target.value, 10);
    if (!isNaN(interval) && interval > 0) {
      setRefreshInterval(interval * 1000); // Convert to milliseconds
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
        <div>
          <label>Refresh Interval (Seconds):</label>
          <input type="number" value={refreshInterval / 1000} onChange={handleRefreshInterval_change} />
        </div>
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
            <li key={index}>{exchange} <button onClick={() => handleRemoveExchange(exchange)}>Remove</button></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;