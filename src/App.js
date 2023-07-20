import React, { useState } from 'react';
import WeatherForecast from './WeatherForecast';
import CurrencyConverter from './CurrencyConverter';
import './App.css'

const App = () => {
  const [selectedApp, setSelectedApp] = useState(null);

  const handleButtonClick = (app) => {
    setSelectedApp(app);
  };

  return (
    <div className="app">
      {selectedApp === null ? (
        <>
          <h1>Weather and Currency App</h1>
          <p>Seamlessly Convert Currencies and Forecast the Weather at Your Fingertips</p>
          <button onClick={() => handleButtonClick('weather')} class="weather">Weather Forecast</button>
          <button onClick={() => handleButtonClick('currency')} class="currency">Currency Converter</button>
        </>
      ) : (
        <>
          {selectedApp === 'weather' && <WeatherForecast />}
          {selectedApp === 'currency' && <CurrencyConverter />}
        </>
      )}
    </div>
  );
};

export default App;
