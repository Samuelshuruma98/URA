  // server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Payer = require('/models/rTpayer'); // Import the payer model

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://SamueShuruma:sam1998sam@cluster0.nv2gn3g.mongodb.net/URA?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/// Function to generate TIN
function generateTIN(gender) {
    const currentYear = new Date().getFullYear();
    const genderPrefix = gender.charAt(0).toUpperCase(); // First letter of gender (M or F)
    const uniqueNumerals = generateUniqueNumerals();
  
    return `${currentYear}/${genderPrefix}/${uniqueNumerals}`;
  }
  
  // Function to generate unique 6-digit numerals
  function generateUniqueNumerals() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  
  // ... (other routes and server setup)
  
  // Route to handle payer registration
  app.post('/register-payer', async (req, res) => {
    try {
      const { name, dob, occupation, gender, phone, email, annualIncome } = req.body;
      const tin = generateTIN(gender);
  
      // Create a new payer using the Payer model
      const newPayer = new Payer({
        name,
        dob,
        occupation,
        gender,
        phone,
        email,
        annualIncome,
        tin,
      });
  
      // Save the payer to the database
      await newPayer.save();
  
      // Send a success response
      res.status(201).json({ message: 'Payer registered successfully!', tin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
