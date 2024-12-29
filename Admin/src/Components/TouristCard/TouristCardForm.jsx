import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const TouristCardForm = ({ refreshCards, editCard, setEditCard }) => {
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    subtitle: '',
    category: '',
    subCategory: '',
    stars: 5,
    price: '',
    discount: '0',
    county: '',
    place: '',
    content: '',
    transport: '',
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState('');

  // Predefined data arrays
  const categories = [
    { value: 'Best Place', label: 'Best Place' },
    { value: 'Visa-Free Country', label: 'Visa-Free Country' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Relaxation', label: 'Relaxation' },
    { value: 'Historical', label: 'Historical' },
  ];

  const subCategories = {
    'Best Place': ['Beach', 'Mountain', 'City', 'Desert', 'Park'],
    'Visa-Free Country': ['Europe', 'Asia', 'Africa', 'America', 'Oceania'],
    'Adventure': ['Hiking', 'Skydiving', 'Bungee Jumping', 'Mountain Climbing', 'Rafting'],
    'Relaxation': ['Spa', 'Resort', 'Yoga Retreat', 'Beach', 'Forest Retreat'],
    'Historical': ['Ancient Ruins', 'Monuments', 'Museums', 'Historical Sites', 'Religious Sites'],
  };

  useEffect(() => {
    if (editCard) {
      setFormData(editCard);
      setPreview(editCard.image || '');
    }
  }, [editCard]);

  useEffect(() => {
    if (formData.category) {
      // Reset subCategory when category changes
      setFormData((prevData) => ({
        ...prevData,
        subCategory: '',
      }));
    }
  }, [formData.category]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.subCategory) newErrors.subCategory = 'Sub-category is required';
    if (formData.stars < 0 || formData.stars > 5) newErrors.stars = 'Stars must be between 0 and 5';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.transport) newErrors.transport = 'Transport is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      if (editCard) {
        await axios.put(`${API_BASE_URL}/put-cards/${editCard._id}`, data);
        setEditCard(null);
      } else {
        await axios.post(`${API_BASE_URL}/add-card`, data);
      }
      alert('Tourist card saved successfully!');
      setFormData({
        image: null,
        title: '',
        subtitle: '',
        category: '',
        subCategory: '',
        stars: 5,
        price: '',
        discount: '0',
        county: '',
        place: '',
        content: '',
        transport: '',
      });
      setPreview('');
      refreshCards();
    } catch (error) {
      alert(`Failed to save card: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{editCard ? 'Edit Card' : 'Add Card'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`border p-2 rounded w-full ${errors.title && 'border-red-500'}`}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Sub-Category</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Sub-Category</option>
            {(subCategories[formData.category] || []).map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
          {errors.subCategory && <p className="text-red-500 text-sm">{errors.subCategory}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Stars</label>
          <input
            type="number"
            name="stars"
            value={formData.stars}
            onChange={handleChange}
            min="0"
            max="5"
            className={`border p-2 rounded w-full ${errors.stars && 'border-red-500'}`}
          />
          {errors.stars && <p className="text-red-500 text-sm">{errors.stars}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Discount</label>
          <select
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="0">0%</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="30">30%</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editCard ? 'Update Card' : 'Add Card'}
        </button>
      </form>
    </div>
  );
};

export default TouristCardForm;
