
import React from 'react';

export const Balance = ({ balance }) => {
  return (
    <>
      <h4>Your Balance</h4>
      <h1>${balance.toFixed(2)}</h1>
    </>
  );
};
