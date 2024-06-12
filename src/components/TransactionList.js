// src/components/TransactionList.js
import React, { useState } from 'react';

export const TransactionList = ({ transactions }) => {
  const [filter, setFilter] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    const textMatch = transaction.text.toLowerCase().includes(filter.toLowerCase());
    const typeMatch = transaction.type.toLowerCase().includes(filter.toLowerCase());
    return textMatch || typeMatch;
  });

  return (
    <>
      <h3>History</h3>
      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by text or type..."
        />
      </div>
      <ul className="list">
        {filteredTransactions.map(transaction => (
          <li className={transaction.amount < 0 ? 'minus' : 'plus'} key={transaction.id}>
            {transaction.text} ({transaction.type}) <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
