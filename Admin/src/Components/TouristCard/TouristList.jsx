import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TouristCardForm from './TouristCardForm';

const API_BASE_URL = 'http://localhost:8000';

const ListCard = () => {
  const [cards, setCards] = useState([]);
  const [editCard, setEditCard] = useState(null);

  const fetchCards = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/get-cards`);
      setCards(data.data);
    } catch (err) {
      alert('Failed to fetch cards');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await axios.delete(`${API_BASE_URL}/delete-cards/${id}`);
        setCards(cards.filter((card) => card._id !== id));
        alert('Card deleted successfully!');
      } catch (err) {
        alert('Failed to delete card');
      }
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="p-6">
      <TouristCardForm refreshCards={fetchCards} editCard={editCard} setEditCard={setEditCard} />
      <h2 className="text-2xl font-bold mt-6">Tourist Cards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card._id} className="bg-white shadow-md p-4 rounded-md">
            {card.image && <img src={`${API_BASE_URL}/uploads/${card.image}`} alt={card.title} />}
            <h3 className="font-bold">{card.title}</h3>
            <p>{card.subtitle}</p>
            <div className="flex justify-between mt-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => setEditCard(card)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(card._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCard;
