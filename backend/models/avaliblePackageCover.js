const mongoose = require('mongoose');

const avaliblePackageCoverSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  
  mainImage: { type: String, required: [true, 'Main image URL is required'] },
  otherImages: [{ type: String }], // List of additional images
}, { timestamps: true });

module.exports = mongoose.model('avalible', avaliblePackageCoverSchema);
