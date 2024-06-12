// src/components/AddTransaction.js
import React, { useState } from 'react';

export const AddTransaction = ({ addTransaction, categories }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState(categories ? categories[0] : ''); // Default to the first category

  const onSubmit = e => {
    e.preventDefault();

    if (!text || !amount || !category) {
      alert('Please enter text, amount, and select a category.');
      return;
    }

    if (isNaN(parseFloat(amount))) {
      alert('Please enter a valid number for the amount.');
      return;
    }

    let parsedAmount = parseFloat(amount);
    if (type === 'expense') {
      parsedAmount *= -1;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: parsedAmount,
      category
    };

    addTransaction(newTransaction);

    setText('');
    setAmount('');
    setType('income');
    setCategory(categories ? categories[0] : ''); // Reset category to the first category
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
          <label htmlFor="category">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories && categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
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
