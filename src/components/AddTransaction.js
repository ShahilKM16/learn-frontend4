// src/components/AddTransaction.js
import React, { useState } from 'react';

export const AddTransaction = ({ addTransaction }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income'); // Default to income

  const onSubmit = e => {
    e.preventDefault();

    if (!text || !amount) {
      alert('Please enter both text and amount.');
      return;
    }

    if (isNaN(parseFloat(amount))) {
      alert('Please enter a valid number for the amount.');
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: type === 'expense' ? -parseFloat(amount) : parseFloat(amount),
      type // Set the type
    };

    addTransaction(newTransaction);

    setText('');
    setAmount('');
    setType('income'); // Reset to default type after adding transaction
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <div className="form-control">
          <label htmlFor="type">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
