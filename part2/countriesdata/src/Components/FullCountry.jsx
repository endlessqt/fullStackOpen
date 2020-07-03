import React, {useEffect, useState} from "react";
import axios from "axios";
const FullCountry = ({ country }) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_CODE;
  useEffect(() => {
    axios.get("http://api.weatherstack.com/current", {
      params: {
        access_key: api_key,
        query: country.capital
      }
    }).then(res => setWeather(res.data.current))
  }, [country.capital, api_key])
  console.log(weather)
  return (
    <>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => {
          return <li key={language["iso639_1"]}>{language.name}</li>;
        })}
      </ul>
      <img alt="flag" src={country.flag} />
      <h3>Weather in {country.capital}</h3>
      <p><strong>Temperature:</strong> {weather.temperature} Celsius </p>
      <img alt="img" style={{width: "100px", height: "100px"}} src={weather["weather_icons"]} />
      <p>{weather["weather_descriptions"]}</p>
      <p><strong>Wind:</strong> {weather["wind_speed"]}mph direction {weather["wind_dir"]}</p>
    </>
  );
};

export default FullCountry;
