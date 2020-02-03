import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import FilterForm from './components/FilterForm'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [expand, setExpand] = useState('')
  const [weather, setWeather] = useState([])

  const handleFilterChange = (event) => setFilter(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
    }, [])


  return (
    <div>
      <FilterForm filter={filter} handleFilterChange={handleFilterChange} />
      <Countries filter={filter} countries={countries} expand={expand} setExpand={setExpand} handleFilterChange={handleFilterChange} weather={weather} setWeather={setWeather}/>
    </div>
  )
}

export default App;
