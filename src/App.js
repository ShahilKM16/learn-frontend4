// App.js
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const calculateIncome = () => {
    return transactions
      .filter(transaction => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const calculateExpense = () => {
    return transactions
      .filter(transaction => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0) * -1;
  };

  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  console.log(transactions); // Log the transactions array

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <Balance balance={calculateBalance()} />
        <IncomeExpenses transactions={transactions} />
        <TransactionList transactions={transactions} />
        <AddTransaction addTransaction={addTransaction} />
      </div>
    </div>
  );
};

export default App;
