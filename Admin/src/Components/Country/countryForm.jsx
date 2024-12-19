// components/CountryForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCountry, updateCountry } from '../../slices/countrySlice';

const CountryForm = ({ existingData, isEditing = false, onSuccess }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.countries);

  const [formData, setFormData] = useState(
    existingData || { name: '', description: '', price: '', mainImage: '', otherImages: [] }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(updateCountry({ id: existingData._id, countryData: formData })).unwrap();
      } else {
        await dispatch(createCountry(formData)).unwrap();
      }
      onSuccess();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Country Name"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
        min="0"
      />
      <input
        type="text"
        name="mainImage"
        value={formData.mainImage}
        onChange={handleChange}
        placeholder="Main Image URL"
        required
      />
      <input
        type="text"
        name="otherImages"
        value={formData.otherImages.join(',')}
        onChange={(e) =>
          setFormData({ ...formData, otherImages: e.target.value.split(',') })
        }
        placeholder="Other Images (comma separated)"
      />
      <button type="submit">{isEditing ? 'Update Country' : 'Add Country'}</button>
      {error && <p style={{ color: 'red' }}>{error.message || 'An error occurred'}</p>}
    </form>
  );
};

export default CountryForm;
