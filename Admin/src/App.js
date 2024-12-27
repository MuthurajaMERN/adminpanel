import React, { useState } from 'react';
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
import TouristCardForm from './Components/TouristCard/TouristCardForm';
import TouristCardList from './Components/TouristCard/TouristCardList';
import CountryForm from './Components/Country/countryForm';
import CountryList from './Components/Country/countryList';

import AvailablePackages from'./Components/AvaliblePackage/AvaliblePackage';

function App() {
  const [currentCard, setCurrentCard] = useState(null);

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
          <Route path="countryfrom" element={<CountryForm/>}/>
          <Route path="countrylist" element={<CountryList/>}/>

        </Route>
       
        {/* Adding routes for Tourist Cards */}
        <Route path="/touristcards" element={
          <>
          <div>
            <h1>Tourist Cards</h1>
            <TouristCardForm currentCard={currentCard} setCurrentCard={setCurrentCard} />
          </div>
          <div>
            <TouristCardList currentCard={currentCard} setCurrentCard={setCurrentCard} />
          </div>
          </>
        } />
         
      </Routes>
     
    </Provider>
  );
}

export default App;
