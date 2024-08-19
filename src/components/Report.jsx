import React, { useState, useEffect } from 'react';

const Report = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('');

    useEffect(() => {
        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;

                        const cityName = await getCityName(latitude, longitude);
                        setCity(cityName);
                    },
                    (err) => {
                        setError('Unable to get location');
                    }
                );
            } else {
                setError('location service is not supported by this browser.');
            }
        };

        fetchLocation();
    }, []);

    useEffect(() => {
        if (city) {
         
            const fetchWeatherData = async () => {
                try {
                    const API_KEY = '1bf7ce9527a44632ab7190306241608';
                    const baseURL = 'http://api.weatherapi.com/v1';
                    const url = `${baseURL}/current.json?key=${API_KEY}&q=${city}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    setWeatherData(data);
                } catch (err) {
                    setError('Failed to fetch weather data');
                }
            };

            fetchWeatherData();
        }
    }, [city]);

    const getCityName = async (lat, lon) => {
        try {
            const API_KEY = '1bf7ce9527a44632ab7190306241608';
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const addressComponents = data.results[0].address_components;
                const cityComponent = addressComponents.find((component) =>
                    component.types.includes('locality')
                )
                
                return cityComponent ? cityComponent.long_name : 'Unknown City';
            }
            return 'Unknown City';
        } catch (err) {
            console.error('Unable to fetch city name', err);
            return 'Unknown City';
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!weatherData) {
        return <div>Loading Wheather Plese wait...</div>;
    }

    const { location, current } = weatherData;

    return (
        <div className="weather-report">
            <div className="row">
                <div className="col-6">
                <h2 className='text-dark'>{location.name}</h2>
                <h1 className='text-dark'> {current.temp_c}°C</h1>

                <ul>
                    <li className='text-dark'><strong>Weather:</strong> {current.condition.text}</li>
                    <li className='text-dark'><strong>Humidity:</strong> {current.humidity}%</li>
                    <li className='text-dark'><strong>Wind:</strong> {current.wind_kph} kph {current.wind_dir}</li>
                    <li className='text-dark'><strong>Pressure:</strong> {current.pressure_mb} mb</li>
                </ul>
                </div>
                <div className="col-6">
                <img
                src={`https:${current.condition.icon}`}
                height={200}
                alt={current.condition.text}
                className="weather-icon"
            />
                </div>
            </div>

        </div>
    );
};

export default Report;
