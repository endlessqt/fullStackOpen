import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./Components/Filter";
import Content from "./Components/Content";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [showed, setShowed] = useState(true);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);
  const handleChangeFilter = (e) => {
    setNewFilter(e.target.value);
    if (newFilter.length > 1) {
      setShowed(false);
    }
  };
  const handleFilterClick = (e) => {
    setNewFilter((e.target.value = ""));
  };
  const handleButton = (e) => {
    setNewFilter(e.target.value);
  };
  const countriesToShow = showed
    ? countries
    : countries.filter((country) =>
        country.name.toLowerCase().includes(newFilter.toLowerCase())
      );

  return (
    <div>
      <Filter
        handler={handleChangeFilter}
        value={newFilter}
        click={handleFilterClick}
      />
      <Content handler={handleButton} countries={countriesToShow} />
    </div>
  );
};
export default App;
