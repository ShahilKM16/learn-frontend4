
import React from 'react';

export const TransactionList = ({ transactions }) => {
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <li className={transaction.amount < 0 ? 'minus' : 'plus'} key={transaction.id}>
            {transaction.text} <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
