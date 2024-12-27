// components/CountryList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCountry, deleteCountry, fetchCountries, updateCountry } from '../../slices/countrySlice';


const CountryList = () => {
  const dispatch = useDispatch();
  const { countries, status, error } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCountry(id));
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;

  return (
    <div>
      <h2>Countries</h2>
      {countries.map((country) => (
        <div key={country._id}>
          <h3>{country.name}</h3>
          <p>{country.description}</p>
          <p>Price: ${country.price}</p>
          <img src={country.mainImage} alt={country.name} width="100" />
          <button onClick={() => handleDelete(country._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
