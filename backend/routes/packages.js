const express = require('express');
const mongoose = require('mongoose');
const PackagesCard = require('../models/PackagesModel'); // Import the Mongoose model
const router = express.Router();

// GET all packages
router.get('/packages', async (req, res) => {
  try {
    const packages = await PackagesCard.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST a new package
router.post('/packages', async (req, res) => {
  try {
    const newPackage = new PackagesCard(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// PUT (update) a package by ID
router.put('/packages/:id', async (req, res) => {
  try {
    const updatedPackage = await PackagesCard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// DELETE a package by ID
router.delete('/packages/:id', async (req, res) => {
  try {
    const deletedPackage = await PackagesCard.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
