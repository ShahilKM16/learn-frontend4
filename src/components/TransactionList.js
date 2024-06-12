import React, { useState, useEffect } from 'react';

export const TransactionList = ({ transactions, updateTransactions }) => {
  const [filter, setFilter] = useState('');
  const [total, setTotal] = useState(0);
  const [editedTransaction, setEditedTransaction] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editedAmount, setEditedAmount] = useState('');

  // Calculate total amount for the filtered transactions
  const calculateTotal = () => {
    const filteredTransactions = transactions.filter(transaction => {
      const textMatch = transaction.text.toLowerCase().includes(filter.toLowerCase());
      const typeMatch = transaction.type.toLowerCase().includes(filter.toLowerCase());
      return textMatch || typeMatch;
    });

    const totalAmount = filteredTransactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    return totalAmount;
  };

  // Update total when filter or transactions change
  useEffect(() => {
    const totalAmount = calculateTotal();
    setTotal(totalAmount);
  }, [filter, transactions]);

  // Filter transactions by text and type
  const filteredTransactions = transactions.filter(transaction => {
    const textMatch = transaction.text.toLowerCase().includes(filter.toLowerCase());
    const typeMatch = transaction.type.toLowerCase().includes(filter.toLowerCase());
    return textMatch || typeMatch;
  });

  const handleEdit = (transaction) => {
    setEditedTransaction(transaction);
    setEditedText(transaction.text);
    setEditedAmount(transaction.amount.toString());
  };

  const handleSave = () => {
    const updatedTransactions = transactions.map(transaction => {
      if (transaction.id === editedTransaction.id) {
        return { ...transaction, text: editedText, amount: parseFloat(editedAmount) };
      }
      return transaction;
    });
    updateTransactions(updatedTransactions);
    setEditedTransaction(null);
    setEditedText('');
    setEditedAmount('');
  };

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
        <p>Total: ${total.toFixed(2)}</p>
      </div>
      <ul className="list">
        {filteredTransactions.map(transaction => (
          <li className={transaction.amount < 0 ? 'minus' : 'plus'} key={transaction.id}>
            {editedTransaction && editedTransaction.id === transaction.id ? (
              <div>
                <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                <input type="number" value={editedAmount} onChange={(e) => setEditedAmount(e.target.value)} />
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <>
                {transaction.text} ({transaction.type}) <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>
                <button onClick={() => handleEdit(transaction)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
