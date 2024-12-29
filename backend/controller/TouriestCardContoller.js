const TouristCard = require('../models/touristCardModel');

// Create a new TouristCard
exports.createTouristCard = async (req, res) => {
  try {
    const touristCard = new TouristCard(req.body);
    await touristCard.save();
    res.status(201).json({ success: true, data: touristCard });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all TouristCards
exports.getAllTouristCards = async (req, res) => {
  try {
    const touristCards = await TouristCard.find();
    res.status(200).json({ success: true, data: touristCards });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single TouristCard by ID
exports.getTouristCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const touristCard = await TouristCard.findById(id);
    if (!touristCard) {
      return res.status(404).json({ success: false, message: "TouristCard not found" });
    }
    res.status(200).json({ success: true, data: touristCard });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a TouristCard by ID
exports.updateTouristCard = async (req, res) => {
  try {
    const { id } = req.params;
    const touristCard = await TouristCard.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!touristCard) {
      return res.status(404).json({ success: false, message: "TouristCard not found" });
    }
    res.status(200).json({ success: true, data: touristCard });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a TouristCard by ID
exports.deleteTouristCard = async (req, res) => {
  try {
    const { id } = req.params;
    const touristCard = await TouristCard.findByIdAndDelete(id);
    if (!touristCard) {
      return res.status(404).json({ success: false, message: "TouristCard not found" });
    }
    res.status(200).json({ success: true, message: "TouristCard deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
