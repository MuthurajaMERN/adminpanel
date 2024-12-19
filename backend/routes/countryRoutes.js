const express = require('express');
const {
  addCountry,
  getAllCountries,
  getCountryById,
  updateCountryById,
  deleteCountryById,
} = require('../controller/countryController');

const router = express.Router();

// Route to add a new country
router.post('/countries', addCountry);

// Route to get all countries
router.get('/countries', getAllCountries);

// Route to get a single country by ID
router.get('/countries/:id', getCountryById);

// Route to update a country by ID
router.put('/countries/:id', updateCountryById);

// Route to delete a country by ID
router.delete('/countries/:id', deleteCountryById);

module.exports = router;
