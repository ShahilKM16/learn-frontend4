import React, { useState, useEffect } from 'react';

export const TransactionList = ({ transactions }) => {
  const [filter, setFilter] = useState('');
  const [total, setTotal] = useState(0);

  // Calculate total amount for the selected type
  const calculateTotal = () => {
    const filteredTransactions = transactions.filter(transaction => {
      return transaction.type.toLowerCase().includes(filter.toLowerCase());
    });

    const totalAmount = filteredTransactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    return totalAmount;
  };

  // Update total when filter changes
  useEffect(() => {
    const totalAmount = calculateTotal();
    setTotal(totalAmount);
  }, [filter, transactions]);

  // Filter transactions by type
  const filteredTransactions = transactions.filter(transaction => {
    return transaction.type.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      <h3>History</h3>
      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by type..."
        />
        <p>Total: ${total.toFixed(2)}</p>
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
