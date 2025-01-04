import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCountries } from '../../slices/countrySlice';

const CountryList = () => {
  const dispatch = useDispatch();
  const { countries, status, error } = useSelector((state) => state.countries);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllCountries());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Countries</h2>
      <ul>
        {countries.map((country) => (
          <li key={country._id}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
