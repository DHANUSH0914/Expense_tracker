// Assuming we need input validation, error messages, and fix for .save() issues
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { body, validationResult } = require('express-validator');

// POST route for adding an expense
router.post('/expenses', [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('description').isString().withMessage('Description must be a string').notEmpty().withMessage('Description cannot be empty'),
  body('date').isISO8601().withMessage('Date must be a valid date')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const expense = new Expense({
    amount: req.body.amount,
    description: req.body.description,
    date: req.body.date
  });

  try {
    await expense.save(); // This line was having issues
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error saving expense', error: error.message });
  }
});

module.exports = router;