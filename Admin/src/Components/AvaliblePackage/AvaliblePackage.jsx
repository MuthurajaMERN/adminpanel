import React, { useState, useEffect } from "react";
import axios from "axios";

const AvailablePackages = () => {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mainImage: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/packages");
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddPackage = async () => {
    if (isEditing) {
      await handleUpdate(editId);
      return;
    }
    try {
      const { data } = await axios.post("http://localhost:8000/packages", formData);
      setPackages([...packages, data]);
      setFormData({ name: "", description: "", mainImage: "" });
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/packages/${id}`);
      setPackages(packages.filter((pkg) => pkg._id !== id));
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedPackage = { ...formData };
      const { data } = await axios.put(`http://localhost:8000/packages/${id}`, updatedPackage);
      setPackages(packages.map((pkg) => (pkg._id === id ? data : pkg)));
      setFormData({ name: "", description: "", mainImage: "" });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  const handleEditClick = (pkg) => {
    setFormData({ name: pkg.name, description: pkg.description, mainImage: pkg.mainImage });
    setIsEditing(true);
    setEditId(pkg._id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Tourist Package Manager</h1>
      <div className="flex flex-col items-center gap-4 border p-4 rounded-md bg-gray-100 shadow-md">
        <input
          name="name"
          placeholder="Package Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded-md w-full"
        />
        <input
          name="description"
          placeholder="Package Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded-md w-full"
        />
        <input
          name="mainImage"
          placeholder="Main Image URL"
          value={formData.mainImage}
          onChange={handleChange}
          className="p-2 border rounded-md w-full"
        />
        <button
          onClick={handleAddPackage}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
        >
          {isEditing ? "Update Package" : "Add Package"}
        </button>
      </div>
      <div className="mt-8">
        {packages.length === 0 ? (
          <p className="text-center text-gray-600">No packages available</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <li
                key={pkg._id}
                className="border p-4 rounded-md shadow-md flex flex-col items-center gap-2 bg-white"
              >
                <h3 className="text-xl font-semibold">{pkg.name}</h3>
                <p className="text-gray-700">{pkg.description}</p>
                {pkg.mainImage && (
                  <img src={pkg.mainImage} alt={pkg.name} className="w-32 h-32 object-cover" />
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEditClick(pkg)}
                    className="p-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AvailablePackages;
