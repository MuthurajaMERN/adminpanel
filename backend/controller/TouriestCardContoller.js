const TouristCard = require("../models/TouristCardModel");

// Add a new tourist card
exports.addCard = async (req, res) => {
  try {
    const card = new TouristCard(req.body);
    await card.save();
    res.status(201).json({ success: true, data: card });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all tourist cards
exports.getAllCards = async (req, res) => {
  try {
    const cards = await TouristCard.find();
    res.status(200).json({ success: true, data: cards });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a tourist card
exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCard = await TouristCard.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCard) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }
    res.status(200).json({ success: true, data: updatedCard });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a tourist card
exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await TouristCard.findByIdAndDelete(id);
    if (!deletedCard) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }
    res.status(200).json({ success: true, data: deletedCard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
