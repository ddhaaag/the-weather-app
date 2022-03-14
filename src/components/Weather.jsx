import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button,
  TextField,
  Box 
} from '@mui/material';

import { WeatherTableRow } from './WeatherTableRow';
const apiKey = 'c7ac19b60a02d9c294d6e8d21ddf2fab';

export const Weather = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState([]);
  const [cityId, setCityId] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setLocation(e.target.value);
    
  };

  const handleRemove = (id) => {
    const newWeather = weather.filter((item) => item.id !== id)

    setWeather(newWeather)
  }

  const handleClick = () => {
    getFetch();
    setLocation('')
  };

  useEffect(() => {
    const localData = sessionStorage.getItem('weather');

    if (localData) {
      setWeather(JSON.parse(localData))
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('weather', JSON.stringify(weather))
  }, [weather])

  async function getFetch() {
    try {
      const resp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      const data = await resp.data;
      console.log('clg-id',data.id);
      setCityId([...cityId, data.id])
      setWeather([...weather, data]);
     
    } catch (error) {
      setError({error: error.message})
    }
  }

  const handleUpdateData = async () => {
      const resp = await axios.get(`https://api.openweathermap.org/data/2.5/group?id=${someID}&appid=${apiKey}&units=metric`);
      const data = await resp.data.list;

      setWeather(data);
  }

  const someID = weather.map((m) => m.id)

  return (
    <>
    <Box sx={{textAlign: 'center'}}>
      <TextField   
        type="text"
        variant="standard"
        value={location}
        placeholder="type some city"
        onChange={handleChange} />
        <Button variant='outlined' onClick={handleClick}>Search</Button>
    </Box>

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 700}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>City name</TableCell>
              <TableCell>temperature</TableCell>
              <TableCell>wind</TableCell>
              <TableCell>humidity</TableCell>
              <TableCell>description</TableCell>
              <TableCell><Button variant='contained' onClick={handleUpdateData}>Update the weather</Button></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {typeof weather !== undefined ? (
              weather.map((w) => (
                <WeatherTableRow key={w.id} weatherData={w} onRemove={handleRemove} />  
              ))
            ) : 
            <p>{error}</p> 
          }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
