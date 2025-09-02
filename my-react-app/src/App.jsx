import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import "./index.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "e92864dbc4ab2a534e3a828b0ae716c5"; 

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      console.log("API Response:", data); // 👀 debug in console

      if (data.cod === "404" || data.cod === 404) {
        setError("City not found");
        setWeather(null);
      } else if (data.cod !== 200) {
        setError(data.message || "Error fetching data");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Error fetching data");
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}
