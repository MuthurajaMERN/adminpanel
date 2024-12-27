import React, { useState } from "react";
import upload_area from "../Assets/upload_area.svg";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../slices/productSlice";

const AddTouristPackage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.product.addProduct);

  const [image, setImage] = useState(null);
  const [packageDetails, setPackageDetails] = useState({
    title: "",
    description: "",
    category: "",
    subCategory: "",
  });
  const [details, setDetails] = useState([{ name: "", value: "" }]);

  const categories = {
    "Adventure Tours": ["Hiking", "Rafting", "Skydiving", "Skiing"],
    "Cultural Tours": ["City Walks", "Heritage Sites", "Museums"],
    "Luxury Tours": ["Cruises", "5-Star Hotels", "Private Jets"],
    "Wildlife Tours": ["Safari", "Bird Watching", "Jungle Camping"],
    "Beach Tours": ["Island Hopping", "Resorts", "Snorkeling"],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/svg+xml"];
      if (allowedTypes.includes(file.type)) {
        setImage(file);
      } else {
        alert("Only PNG, JPG, JPEG, and SVG files are allowed.");
      }
    }
  };

  const handleAddDetail = () => setDetails([...details, { name: "", value: "" }]);

  const handleDetailChange = (index, event) => {
    const values = [...details];
    values[index][event.target.name] = event.target.value;
    setDetails(values);
  };

  const handleDeleteDetail = (index) => {
    const values = [...details];
    values.splice(index, 1);
    setDetails(values);
  };

  const handleSubmit = () => {
    dispatch(addProduct({ packageDetails, image, details }));
  };

  return (
    <div className="flex flex-col gap-6 max-w-screen-lg mx-auto px-6 py-8">
      {/* Form Section */}
      <form
        className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1 className="col-span-2 text-2xl font-semibold text-gray-800">Add Tourist Package</h1>

        {/* Package Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Package Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={packageDetails.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter package title"
          />
        </div>

        {/* Package Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Package Description
          </label>
          <textarea
            id="description"
            name="description"
            value={packageDetails.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter package description"
          />
        </div>

        {/* Package Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Package Category
          </label>
          <select
            id="category"
            name="category"
            value={packageDetails.category}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Package Subcategory */}
        <div>
          <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700 mb-2">
            Sub Category
          </label>
          <select
            id="subCategory"
            name="subCategory"
            value={packageDetails.subCategory}
            onChange={handleInputChange}
            disabled={!packageDetails.category}
            className="w-full border border-gray-300 rounded-md p-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select SubCategory</option>
            {categories[packageDetails.category]?.map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>

        {/* Package Details */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Package Details</label>
          {details.map((detail, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <input
                type="text"
                name="name"
                placeholder="Detail Name"
                value={detail.name}
                onChange={(e) => handleDetailChange(index, e)}
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="value"
                placeholder="Detail Value"
                value={detail.value}
                onChange={(e) => handleDetailChange(index, e)}
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddDetail}
                className="text-green-500 font-bold"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => handleDeleteDetail(index)}
                className="text-red-500 font-bold"
              >
                -
              </button>
            </div>
          ))}
        </div>

        {/* Image Upload */}
        <div className="col-span-2">
          <label htmlFor="file-input" className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <label
            htmlFor="file-input"
            className="block w-32 h-32 border rounded-lg cursor-pointer overflow-hidden"
          >
            <img
              src={!image ? upload_area : URL.createObjectURL(image)}
              alt="Upload Preview"
              className="w-full h-full object-cover"
            />
          </label>
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            hidden
          />
          {image && <p className="mt-2 text-sm text-gray-500">{image.name}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Package"}
        </button>
      </form>
    </div>
  );
};

export default AddTouristPackage;
