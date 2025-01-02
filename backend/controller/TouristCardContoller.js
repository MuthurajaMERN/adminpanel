const TouristCard = require('../models/TouristCardModel');

// Create a new tourist card
exports.createTouristCard = async (req, res) => {
  try {
    const cardData = req.body;
    if (req.file) {
      cardData.image = req.file.path; // Assign uploaded image path if provided
    }
    const newCard = new TouristCard(cardData);
    await newCard.save();

    res.status(201).json({
      message: 'Tourist card created successfully!',
      card: newCard,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error creating tourist card',
      details: error.message,
    });
  }
};

// Get all tourist cards
exports.getAllTouristCards = async (req, res) => {
  try {
    const cards = await TouristCard.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching tourist cards',
      details: error.message,
    });
  }
};

// Get a single tourist card by ID
exports.getTouristCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await TouristCard.findById(id);

    if (!card) {
      return res.status(404).json({ error: 'Tourist card not found' });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching the tourist card',
      details: error.message,
    });
  }
};

// Update a tourist card by ID
exports.updateTouristCard = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.path; // Update image if provided
    }

    const updatedCard = await TouristCard.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validators run during updates
    });

    if (!updatedCard) {
      return res.status(404).json({ error: 'Tourist card not found' });
    }

    res.status(200).json({
      message: 'Tourist card updated successfully!',
      card: updatedCard,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error updating the tourist card',
      details: error.message,
    });
  }
};

// Delete a tourist card by ID
exports.deleteTouristCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await TouristCard.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({ error: 'Tourist card not found' });
    }

    res.status(200).json({
      message: 'Tourist card deleted successfully!',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error deleting the tourist card',
      details: error.message,
    });
  }
};
