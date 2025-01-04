import React, { useState } from 'react';
import { addTestimonial } from '../../slices/testimonialSlice';
import { useSelector, useDispatch } from 'react-redux';

const AdminAddTestimonial = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.testimonial.addTestimonial);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTestimonial = { name, title, text, rating };
    dispatch(addTestimonial(newTestimonial));
    setName('');
    setTitle('');
    setText('');
    setRating(0);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className="container mx-screen p-6 md:p-6 bg-gray-600 shadow-lg rounded-lg max-w-1xl">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Add a New Testimonial</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white font-medium mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Review:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Rating:</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                className={`text-2xl cursor-pointer ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-400'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Testimonial
        </button>
        {submitted && (
          <div className="text-green-600 font-medium mt-4 text-center">
            Testimonial submitted successfully!
          </div>
        )}
      </form>
      <div className="mt-8 text-center">
        {submitted && (
          <button
            className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition duration-200"
            onClick={() => alert('Submit Testimonial action triggered!')}
          >
            Submit Testimonial
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminAddTestimonial;
