import React, { useEffect, useRef, useState } from "react";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const App = () => {
  const input = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "" || city.trim == "") {
      alert("Enter a city name!");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_API_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert("City not found!");
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity_data: data.main.humidity,
        wind_speed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        city_name: data.name,
        weather_icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log("City Not Found");
    }
  };
  useEffect((city) => {
    search(city);
  }, []);
  return (
    <div className="container">
      <div className="weather">
        <div className="search-bar">
          <input ref={input} type="text" placeholder="Enter a city" />
          <img
            src={search_icon}
            alt=""
            className="search-btn"
            onClick={() => search(input.current.value)}
          />
        </div>
        {weatherData ? (
          <>
            <div className="cen">
              <img src={weatherData.weather_icon} alt="" />
              <h2>{weatherData.city_name}</h2>
              <h1>{weatherData.temp}°C</h1>
            </div>
            <div className="details">
              <div className="h">
                <div className="humidity">
                  <img src={humidity_icon} alt="" />
                  <h1>{weatherData.humidity_data}%</h1>
                </div>
                <h2>Humidity</h2>
              </div>
              <div className="w">
                <div className="wind">
                  <img src={wind_icon} alt="" />
                  <h1>{weatherData.wind_speed} Km/h</h1>
                </div>
                <h2>Wind Speed</h2>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default App;
