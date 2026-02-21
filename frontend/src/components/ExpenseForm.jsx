import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ExpenseForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        date: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.description) newErrors.description = 'Description is required.';
        if (!formData.amount) newErrors.amount = 'Amount is required.';
        else if (isNaN(formData.amount) || Number(formData.amount) <= 0)
            newErrors.amount = 'Amount must be a positive number.';
        if (!formData.date) newErrors.date = 'Date is required.';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
        } else {
            onSubmit(formData);
            setFormData({ description: '', amount: '', date: '' }); // Reset form
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                {errors.description && <p className="error">{errors.description}</p>}
            </div>
            <div>
                <label>Amount</label>
                <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                />
                {errors.amount && <p className="error">{errors.amount}</p>}
            </div>
            <div>
                <label>Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
                {errors.date && <p className="error">{errors.date}</p>}
            </div>
            <button type="submit">Add Expense</button>
        </form>
    );
};

ExpenseForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ExpenseForm;