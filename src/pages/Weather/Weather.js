import React, { useState } from "react";
import WeatherSearch from "./WeatherSearch";
import WeatherCurrent from "./WeatherCurrent";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./WeatherApi";

function Weather() {
  const [currentWeather, setCurrentWeather] = useState(null);
  // eslint-disable-next-line
  const [foreacast, setForecast] = useState(null);

  const handleSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastWeatherFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].clone().json();
        const forecastResponse = await response[0].clone().json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-3xl m-5 mx-auto rounded-md">
      <WeatherSearch onSearchChange={handleSearchChange} />
      {currentWeather && <WeatherCurrent data={currentWeather} />}
    </div>
  );
}

export default Weather;
