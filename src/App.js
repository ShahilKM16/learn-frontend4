import React, { useState } from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  
  // Function to update transactions
  const updateTransactions = (updatedTransactions) => {
    setTransactions(updatedTransactions);
  };

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

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <Balance balance={calculateBalance()} />
        <IncomeExpenses transactions={transactions} />
        {/* Pass the updateTransactions function to TransactionList component */}
        <TransactionList transactions={transactions} updateTransactions={updateTransactions} />
        <AddTransaction addTransaction={addTransaction} />
      </div>
    </div>
  );
};

export default App;
