import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const TouristServiceForm = () => {
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

  const [touristList, setTouristList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const initialOptions = {
    category: ['Adventure', 'Relaxation', 'Cultural', 'Nature', 'City'],
    subCategory: ['Safari', 'Mountain', 'Historical', 'Island', 'Museum'],
    county: ['USA', 'Canada', 'France', 'Germany', 'Italy'],
    place: ['New York', 'Paris', 'Berlin', 'Rome', 'Toronto'],
    transport: ['Airplane', 'Train', 'Bus', 'Car', 'Boat'],
  };

  // Fetch all tourist cards on component mount
  useEffect(() => {
    fetchTouristList();
  }, []);

  const fetchTouristList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-cards`);
      setTouristList(response.data);
    } catch (error) {
      console.error('Error fetching tourist cards:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files?.length > 0) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => formDataObj.append(key, value || ''));

    try {
      if (editItem) {
        // Update existing card
        await axios.put(`${API_BASE_URL}/put-cards/${editItem._id}`, formDataObj);
        setAlert({ type: 'success', message: 'Service updated successfully!' });
      } else {
        // Add new card
        await axios.post(`${API_BASE_URL}/touristcard/add-card`, formDataObj);
        setAlert({ type: 'success', message: 'Service added successfully!' });
      }
      fetchTouristList();
      resetForm();
    } catch (error) {
      setAlert({ type: 'error', message: 'Error saving the service!' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this card?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/delete-cards/${id}`);
      setAlert({ type: 'success', message: 'Service deleted successfully!' });
      setTouristList(touristList.filter((item) => item._id !== id)); // Remove deleted item from state
    } catch (error) {
      setAlert({ type: 'error', message: 'Error deleting the service!' });
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditItem(item);
  };

  const resetForm = () => {
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
    setEditItem(null);
  };

  return (
    <div className="p-8">
      {alert.message && (
        <div
          className={`mb-4 p-4 text-white rounded ${
            alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 mb-4">
        <div className="grid grid-cols-2 gap-4">
          {['title', 'subtitle', 'price', 'discount', 'content'].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-bold mb-2 capitalize">{field}:</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          {['category', 'subCategory', 'county', 'place', 'transport'].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-bold mb-2 capitalize">{field}:</label>
              <select
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select {field}</option>
                {initialOptions[field]?.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Stars:</label>
            <input
              type="number"
              name="stars"
              value={formData.stars}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              min="1"
              max="5"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editItem ? 'Update Service' : 'Add Service'}
          </button>
          {editItem && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className="table-auto w-full text-left bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {touristList.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="px-4 py-2">{item.title}</td>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TouristServiceForm;
