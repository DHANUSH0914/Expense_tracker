import React, { useState } from 'react';
import './App.css'; // Ensure you have Tailwind CSS imported

function App() {
  const [expense, setExpense] = useState({ name: '', amount: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!expense.name) newErrors.name = 'Expense name is required';
    if (!expense.amount) newErrors.amount = 'Amount is required';
    else if (isNaN(expense.amount)) newErrors.amount = 'Amount must be a number';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setSuccess('Expense successfully added!');
      // Here, you would typically handle adding the expense (e.g., API call)
      setExpense({ name: '', amount: '' }); // Reset form
    } else {
      setErrors(formErrors);
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
      <div className="bg-white bg-opacity-30 backdrop-blur-lg shadow-2xl rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">Expense Tracker</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-gray-700">Expense Name:</label>
            <input
              type="text"
              name="name"
              value={expense.name}
              onChange={handleInputChange}
              className="p-2 border rounded shadow focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>
          <div>
            <label className="block text-gray-700">Amount:</label>
            <input
              type="text"
              name="amount"
              value={expense.amount}
              onChange={handleInputChange}
              className="p-2 border rounded shadow focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.amount && <span className="text-red-500">{errors.amount}</span>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600 transition duration-300"
          >
            Add Expense
          </button>
          {success && <div className="text-green-500 text-center">{success}</div>}
        </form>
      </div>
    </div>
  );
}

export default App;