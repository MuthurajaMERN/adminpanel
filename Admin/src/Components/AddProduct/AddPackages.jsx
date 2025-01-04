import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPackages,
  addPackage,
  updatePackage,
  deletePackage,
} from "../../slices/packagesSlice";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { packages, status, error } = useSelector((state) => state.product); // Fixed selector

  const [form, setForm] = useState({
    image: "",
    title: "",
    subtitle: "",
    category: "",
    subCategory: "",
    stars: "",
    price: "",
    discount: "",
    county: "",
    place: "",
    content: "",
    transport: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.subtitle ||
      !form.category ||
      !form.price ||
      !form.place ||
      !form.content
    ) {
      alert("Please fill out all required fields!");
      return;
    }

    if (editId) {
      dispatch(updatePackage({ id: editId, packageData: form }));
    } else {
      dispatch(addPackage(form));
    }

    setForm({
      image: "",
      title: "",
      subtitle: "",
      category: "",
      subCategory: "",
      stars: "",
      price: "",
      discount: "",
      county: "",
      place: "",
      content: "",
      transport: "",
    });
    setEditId(null);
  };

  const handleEdit = (pkg) => {
    setForm(pkg);
    setEditId(pkg._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      dispatch(deletePackage(id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel - Manage Packages</h1>

      {status === "loading" && <p>Loading packages...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {packages.length === 0 && status !== "loading" && (
        <p>No packages available. Add one to get started!</p>
      )}

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title *"
          className="p-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          placeholder="Subtitle *"
          className="p-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category *"
          className="p-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="subCategory"
          value={form.subCategory}
          onChange={handleChange}
          placeholder="SubCategory"
          className="p-3 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="stars"
          value={form.stars}
          onChange={handleChange}
          placeholder="Stars"
          className="p-3 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price *"
          className="p-3 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="discount"
          value={form.discount}
          onChange={handleChange}
          placeholder="Discount"
          className="p-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="county"
          value={form.county}
          onChange={handleChange}
          placeholder="Country"
          className="p-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="place"
          value={form.place}
          onChange={handleChange}
          placeholder="Place *"
          className="p-3 border border-gray-300 rounded-md"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content *"
          className="p-3 border border-gray-300 rounded-md col-span-2"
        ></textarea>
        <input
          type="text"
          name="transport"
          value={form.transport}
          onChange={handleChange}
          placeholder="Transport"
          className="p-3 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600 col-span-2"
        >
          {editId ? "Update Package" : "Add Package"}
        </button>
      </form>

      {/* Packages Table */}
      {packages.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg._id}>
                <td className="border border-gray-300 p-2">{pkg.title}</td>
                <td className="border border-gray-300 p-2">{pkg.category}</td>
                <td className="border border-gray-300 p-2">${pkg.price}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
