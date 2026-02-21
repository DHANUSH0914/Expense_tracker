import React, { useState, useEffect } from 'react';
// CSS File for styles
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ id: '', name: '', amount: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/expenses');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name || !form.amount) {
      setError('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const newExpense = await response.json();
      setData([...data, newExpense]);
      setForm({ id: '', name: '', amount: '' });
      setError(null);
    } catch (err) {
      setError('Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
      setData(data.filter(expense => expense.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Expense Name"
          required
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {data.map(expense => (
          <li key={expense.id}>
            {expense.name}: ${expense.amount}
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
