import React from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
    return (
        <div className="expense-list">
            <h2 className="title">Expense List</h2>
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id} className="expense-item">
                        <div className="expense-content">
                            <span className="expense-amount">${expense.amount}</span>
                            <span className="expense-description">{expense.description}</span>
                        </div>
                        <div className="expense-actions">
                            <button className="edit-button" onClick={() => onEdit(expense.id)}>Edit</button>
                            <button className="delete-button" onClick={() => onDelete(expense.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;