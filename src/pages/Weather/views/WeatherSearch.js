import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../WeatherApi";
import i18n from "../../../i18n/i18n";

const WeatherSearch = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => {
        console.error("An error occurred:", err);
        return {
          options: [],
        };
      });
  };

  const handleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#D17F14" : "white", // Arka plan rengini özelleştirin
      color: state.isFocused ? "white" : "black", // Metin rengini özelleştirin
    }),
  };
  return (
    <AsyncPaginate
      placeholder={i18n.t("weather_search")}
      debounceTimeout={600}
      value={search}
      onChange={handleChange}
      loadOptions={loadOptions}
      styles={customStyles}
    />
  );
};

export default WeatherSearch;
