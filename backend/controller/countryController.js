// const Country = require('../models/Country');
const mongoose = require("mongoose");
const Product = require("../models/Country");
 
// Add a new country
const addCountry = async (req, res) => {
  try {
    const { name, description, price, mainImage, otherImages } = req.body;

    if (!name || !description || !price || !mainImage) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newCountry = new Country({ name, description, price, mainImage, otherImages });
    await newCountry.save();

    res.status(201).json({ message: 'Country added successfully', data: newCountry });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add country', error: error.message });
  }
};

// Get all countries
const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch countries', error: error.message });
  }
};

// Get a single country by ID
const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findById(id);

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch country', error: error.message });
  }
};

// Update a country by ID
const updateCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCountry = await Country.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedCountry) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.status(200).json({ message: 'Country updated successfully', data: updatedCountry });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update country', error: error.message });
  }
};

// Delete a country by ID
const deleteCountryById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCountry = await Country.findByIdAndDelete(id);

    if (!deletedCountry) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.status(200).json({ message: 'Country deleted successfully', data: deletedCountry });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete country', error: error.message });
  }
};

module.exports = {
  addCountry,
  getAllCountries,
  getCountryById,
  updateCountryById,
  deleteCountryById,
};
