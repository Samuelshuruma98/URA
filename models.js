//For models

// models/payer.js
const mongoose = require('mongoose');

const payerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  occupation: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  annualIncome: { type: Number, required: true },
  tin: { type: String, required: true },
});

const Payer = mongoose.model('Payer', payerSchema);

module.exports = Payer;
