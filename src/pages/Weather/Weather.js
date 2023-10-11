import React from "react";
import WeatherSearch from "./WeatherSearch";

function Weather() {
  const handleSearchChange = (searchData) => {
    console.log(searchData);
  };

  return (
    <div className="max-w-3xl m-5 mx-auto">
      <WeatherSearch onSearchChange={handleSearchChange} />
    </div>
  );
}

export default Weather;
