import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { deleteCardFromServer } from '../../slices/countrySlice';

const TouristCardList = ({ setCurrentCard }) => {
  const cards = useSelector((state) => state.touristCard.cards);
  const dispatch = useDispatch();

  
  return (
    <div>
      {cards.map((card) => (
        <div key={card.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{card.title}</h3>
          <p>Category: {card.category}</p>
          <p>Stars: {card.stars}</p>
          <p>Price: ${card.price}</p>
          <p>Transport: {card.transport}</p>
          <p>{card.subtitle}</p>
          <p>{card.content}</p>
          <button onClick={() => setCurrentCard(card)}>Edit</button>
          <button onClick={() => dispatch(deleteCardFromServer(card.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TouristCardList;
