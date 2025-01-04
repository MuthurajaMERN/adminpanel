import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Sidebar from "./Components/Sidebar/Sidebar";
import HomeLayout from "./layout/HomeLayout";
import AddProduct from "./Components/AddProduct/AddPackages";
import Testimonials from "./Components/Testimonials/Testimonials";
import ListTestimonials from "./Components/Testimonials/ListTestimonials";
import AvailablePackages from "./Components/AvaliblePackage/AvaliblePackage";
import CardApp from "./Components/TouristCard/CardApp";
import ListCard from "./Components/TouristCard/TouristList";
import AddCountryForm from "./Components/Country/FromCountry";
import CountryList from "./Components/Country/AddCountry";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes with Dashboard Layout */}
        <Route path="/home" element={<Sidebar />}>
          <Route index element={<HomeLayout />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="listtestimonials" element={<ListTestimonials />} />
          <Route path="availablepackage" element={<AvailablePackages />} />
          <Route path="cardapp" element={<CardApp />} />
          <Route path="cardlist" element={<ListCard/>} />
          <Route path="addcountry" element={<AddCountryForm/>} />
          <Route path="listcountry" element={<CountryList/>} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
