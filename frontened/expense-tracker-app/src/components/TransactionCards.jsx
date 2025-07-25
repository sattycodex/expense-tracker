import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Format INR currency
const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);

function TransactionCards({ transactions }) {
  return (
    <div className="container mt-4">
      <ul className="list-group">
        {transactions.map((txn) => (
          <li
            key={txn.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{
              marginBottom: '10px',
              border:'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              padding: '10px 15px',
            }}
          >
            <div>
              <div className="fw-semibold">{txn.category}</div>
              <small className="text-muted">{txn.time}</small>
            </div>
            <div
              className={`fw-bold ${
                txn.type === 'income' ? 'text-success' : 'text-danger'
              }`}
            >
              {txn.type === 'income' ? '+' : '-'}
              {formatCurrency(txn.amount)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionCards;