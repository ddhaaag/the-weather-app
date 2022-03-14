import React from 'react'
import {
  TableRow,
  TableCell,
  Button
} from '@mui/material';

export const WeatherTableRow = ({weatherData, onRemove}) => {

  return (
    <TableRow>
      <TableCell> {weatherData.name}</TableCell>
      <TableCell sx={{display: 'flex', alignItems: 'center'}}><img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} />{weatherData.main.temp}&deg;C</TableCell>
      <TableCell>{weatherData.wind.speed}m/s</TableCell>
      <TableCell>{weatherData.main.humidity}%</TableCell>
      <TableCell>{weatherData.weather[0].description}</TableCell>
      <TableCell>
        <Button variant="outlined" onClick={() => onRemove(weatherData.id)}>Delete</Button>
      </TableCell>
    </TableRow>
  )
}
