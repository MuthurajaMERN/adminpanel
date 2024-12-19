import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCards,
  addCardToServer,
  updateCardOnServer,
  deleteCardFromServer,
} from "../../slices/touristCardSlice";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { cards, isLoading, error } = useSelector((state) => state.touristCard);

  const [form, setForm] = useState({
    image: "",
    title: "",
    category: "",
    stars: "",
    price: "",
    subtitle: "",
    content: "",
    transport: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateCardOnServer({ id: editId, updatedCard: form }));
    } else {
      dispatch(addCardToServer(form));
    }
    setForm({
      image: "",
      title: "",
      category: "",
      stars: "",
      price: "",
      subtitle: "",
      content: "",
      transport: "",
    });
    setEditMode(false);
  };

  const handleEdit = (card) => {
    setEditMode(true);
    setEditId(card._id);
    setForm(card);
  };

  const handleDelete = (id) => {
    dispatch(deleteCardFromServer(id));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <form onSubmit={handleAddOrUpdate}>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="stars"
          placeholder="Stars"
          min="0"
          max="5"
          value={form.stars}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="transport"
          placeholder="Transport"
          value={form.transport}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editMode ? "Update" : "Add"}</button>
      </form>
      <ul>
        {cards.map((card) => (
          <li key={card._id}>
            <h3>{card.title}</h3>
            <p>Category: {card.category}</p>
            <p>Price: ${card.price}</p>
            <button onClick={() => handleEdit(card)}>Edit</button>
            <button onClick={() => handleDelete(card._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
