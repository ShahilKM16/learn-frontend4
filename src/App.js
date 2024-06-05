import React, { useState } from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, text: 'Cash', amount: 500 },
    { id: 2, text: 'Book', amount: -40 },
    { id: 3, text: 'Camera', amount: -200 },
  ]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const calculateBalance = () => {
    const amounts = transactions.map(transaction => transaction.amount);
    return amounts.reduce((acc, item) => (acc += item), 0);
  };

  const calculateIncome = () => {
    const amounts = transactions.map(transaction => transaction.amount);
    return amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
  };

  const calculateExpense = () => {
    const amounts = transactions.map(transaction => transaction.amount);
    return amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1;
  };

  return (
    <div>
      <Header />
      <div className="container">
        <Balance balance={calculateBalance()} />
        <IncomeExpenses income={calculateIncome()} expense={calculateExpense()} />
        <TransactionList transactions={transactions} />
        <AddTransaction addTransaction={addTransaction} />
      </div>
    </div>
  );
};

export default App;
