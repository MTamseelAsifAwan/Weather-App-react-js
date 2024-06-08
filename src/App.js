import React, { useState } from 'react';
import './App.css';
import './input.css';
import Navbar2 from './Navbar';

function App() {
  const [search, setSearch] = useState('');
  const [weatherd, setWeatherd] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSearchClick = () => {
    setLoading(true); // Show the loader

    // Handle search functionality here, such as making an API call
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((res) => res.json())
      .then((res) => {
        setWeatherd(res);
      })
      .catch((error) => {
        console.error("Error occurred while fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Hide the loader after API call is complete
        setSearch(""); // Clear the search input after the search
      });
  }

  return (
    <div>
      <div className="col-md-4">
        <div className="container">
          <div className="search-container">
            <input
              className="input"
              value={search}
              type="text"
              onChange={handleInputChange}
            />
            <svg viewBox="0 0 24 24" className="search__icon" onClick={handleSearchClick}>
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="col-md-8"></div>

      {loading ? ( // Show loader if loading state is true
        <div className="hourglassBackground">
          <div className="hourglassContainer">
            <div className="hourglassCurves"></div>
            <div className="hourglassCapTop"></div>
            <div className="hourglassGlassTop"></div>
            <div className="hourglassSand"></div>
            <div className="hourglassSandStream"></div>
            <div className="hourglassCapBottom"></div>
            <div className="hourglassGlass"></div>
          </div>
        </div>
      ) : weatherd ? ( // Show weather card if weatherd is not null
        <div className="cardm">
          <div className="card">
            <div className="main">{weatherd.main.temp}°C</div>
            <div className="mainsub">{weatherd.name}, {weatherd.sys.country}</div>
          </div>
          <div className="card2">
            <div className="upper">
              <div className="humidity">
                <div className="humiditytext">Humidity <br></br>{weatherd.main.humidity}</div>
              </div>
              <div className="air">
                <div className="airtext">Wind <br></br> {weatherd.wind.speed} Km/h</div>
              </div>
            </div>
            <div className="lower">
              <div className="aqi">
                <div className="aqitext">Description<br></br> {weatherd.weather[0].description}</div>
              </div>
              <div className="realfeel">
                <div className="realfeeltext">Real Feel {weatherd.main.feels_like}</div>
              </div>
              <div className="pressure">
                <div className="pressuretext">Pressure <br></br>{weatherd.main.pressure} mbar</div>
              </div>
              <div className="card3">weather</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cardm">
          <div className="card">
            <div className="main"> No Data</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
