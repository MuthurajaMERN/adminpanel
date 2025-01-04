import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewCountry } from '../../slices/countrySlice';

const AddCountryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    mainImage: '',
    otherImages: [],
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewCountry(formData));
    setFormData({ name: '', description: '', price: '', mainImage: '', otherImages: [] });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Country</h2>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
      <input name="mainImage" placeholder="Main Image URL" value={formData.mainImage} onChange={handleChange} />
      <button type="submit">Add Country</button>
    </form>
  );
};

export default AddCountryForm;
