import React from 'react';

function LocationResult({ weatherData }) {
  if (!weatherData) return null;

  const {
    location: { name },
    current: { temp_c, condition, humidity, wind_kph, pressure_mb }
  } = weatherData;

  return (
    <div className="weather-report">
      <div className="row">
        <div className="col-6">
          <h4 className='text-dark'>{name}</h4>
          <h1 className='text-dark'>{temp_c}°C</h1>

          <ul>
            <li className='text-dark'><strong>Weather:</strong> {condition.text}</li>
            <li className='text-dark'><strong>Humidity:</strong> {humidity}%</li>
            <li className='text-dark'><strong>Wind:</strong> {wind_kph} kph</li>
            <li className='text-dark'><strong>Pressure:</strong> {pressure_mb} mb</li>
          </ul>
        </div>
        <div className="col-6">
          <img
            src={condition.icon}
            height={200}
            alt={condition.text} 
            className="weather-icon"
          />
        </div>
      </div>
    </div>
  );
}

export default LocationResult;
