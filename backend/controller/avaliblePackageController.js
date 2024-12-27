const mongoose = require("mongoose");
const avalible = require("../models/avaliblePackageCover");

const Package = avalible



app.post('/packages', async (req, res) => {
    try {
      const packageData = req.body;
      const newPackage = new Package(packageData);
      await newPackage.save();
      res.status(201).json(newPackage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get all packages
  app.get('/packages', async (req, res) => {
    try {
      const packages = await Package.find();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a package
  app.put('/packages/:id', async (req, res) => {
    try {
      const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedPackage) return res.status(404).json({ error: 'Package not found' });
      res.json(updatedPackage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Delete a package
  app.delete('/packages/:id', async (req, res) => {
    try {
      const deletedPackage = await Package.findByIdAndDelete(req.params.id);
      if (!deletedPackage) return res.status(404).json({ error: 'Package not found' });
      res.json({ message: 'Package deleted', deletedPackage });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  