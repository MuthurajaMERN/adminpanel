import React, { useState, useEffect } from 'react';
import { addTestimonial } from '../../slices/testimonialSlice';
import { useSelector, useDispatch } from 'react-redux';
import ListTestimonials from './ListTestimonials'; // Assuming this component displays testimonials

// Sample tourist service data (replace with your actual data)
const touristServices = [
  { title: 'Taj Mahal Tour', feedback: 'A must-see for any visitor to India!', rating: 5 },
  { title: 'Kerala Backwaters Cruise', feedback: 'Relaxing and scenic journey through the backwaters.', rating: 4 },
  { title: 'Goa Beach Vacation', feedback: 'Enjoy sun, sand, and sea in Goa!', rating: 4.5 },
];

const AdminAddTestimonial = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.testimonial.addTestimonial);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTestimonial = { name, title, text, rating, selectedService };
    dispatch(addTestimonial(newTestimonial));
    setName('');
    setTitle('');
    setText('');
    setRating(0);
    setSelectedService('');
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="rounded-md px-4 py-2 border-gray-300 focus:border-blue-500 focus:outline-none"
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="rounded-md px-4 py-2 border-gray-300 focus:border-blue-500 focus:outline-none"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Review"
          required
          className="rounded-md px-4 py-2 border-gray-300 resize-none focus:border-blue-500 focus:outline-none"
        />
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          required
          className="rounded-md px-4 py-2 border-gray-300 focus:border-blue-500 focus:outline-none"
        >
          <option value="">-- Select Service --</option>
          {touristServices.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-xl ${
                star <= rating ? 'text-yellow-500' : 'text-gray-400'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
          Add Testimonial
        </button>
      </form>

      <div>
        <h1>List Testimonials</h1>
        <ListTestimonials />
      </div>
    </>
  );
};

export default AdminAddTestimonial;