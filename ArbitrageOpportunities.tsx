import React from 'react';

interface ArbitrageOpportunity {
  exchanges: string;
  cryptocurrency: string;
  priceDifference: string;
  potentialProfit: string;
}

interface ArbitrageOpportunitiesProps {
  opportunities: ArbitrageOpportunity[];
}

const ArbitrageOpportunities: React.FC<ArbitrageOpportunitiesProps> = ({ opportunities }) => {
  return (
    <ul>
      {opportunities.map((opportunity, index) => (
        <li key={index}>
          Exchanges: {opportunity.exchanges}, Cryptocurrency: {opportunity.cryptocurrency}, 
          Price Difference: {opportunity.priceDifference}, Potential Profit: {opportunity.potentialProfit}
        </li>
      ))}
    </ul>
  );
};

export default ArbitrageOpportunities;