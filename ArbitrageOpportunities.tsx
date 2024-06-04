import React from 'react';

interface ArbitrageOpportunity {
  exchangeNames: string;
  cryptoAsset: string;
  priceGap: string;
  estimatedProfit: string;
}

interface ArbitrageOpportunitiesListProps {
  opportunitiesList: ArbitrageOpportunity[];
}

const ArbitrageOpportunitiesList: React.FC<ArbitrageOpportunitiesListProps> = ({ opportunitiesList }) => {
  return (
    <ul>
      {opportunitiesList.map((opportunity, index) => (
        <li key={index}>
          Exchanges: {opportunity.exchangeNames}, Crypto Asset: {opportunity.cryptoAsset}, 
          Price Gap: {opportunity.priceGap}, Estimated Profit: {opportunity.estimatedProfit}
        </li>
      ))}
    </ul>
  );
};

export default ArbitrageOpportunitiesList;