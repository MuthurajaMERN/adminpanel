import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin";
import Login from "./Components/Login";
import Register from "./Components/Register";
import HomeLayout from "./layout/HomeLayout";
import AddProduct from "./Components/AddProduct/AddProduct";
import ListProduct from "./Components/ListProduct/ListProduct";
import Edit from "./Components/editProduct/Edit";
import Testimonials from "./Components/Testimonials/Testimonials";
import ListTestimonials from "./Components/Testimonials/ListTestimonials";

import AvailablePackages from'./Components/AvaliblePackage/AvaliblePackage';
import CardApp from './Components/TouristCard/CardApp';



function App() {
  

  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<AddProduct />} />
          <Route path="listproduct" element={<ListProduct />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="listtestimonials" element={<ListTestimonials />} />
          <Route path="avalibalePackage" element={<AvailablePackages/>} />
          
          <Route path="edit/:id" element={<Edit />} />

          <Route path="card" element={<CardApp/>} />
        </Route>
       
        {/* Adding routes for Tourist Cards */}
        {/* <Route path="/CardApp" element={
          <>
          <div>
            <h1>Tourist Cards</h1>
            <TouristCardForm currentCard={currentCard} setCurrentCard={setCurrentCard} />
          </div>
          <div>
            <TouristCardTable currentCard={currentCard} setCurrentCard={setCurrentCard} />
          </div>
          
          </>
        } /> */}
         
      </Routes>
     
    </Provider>
  );
}

export default App;
