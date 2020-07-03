import React from "react";
import Country from "./Country";
import FullCountry from "./FullCountry";

const Content = ({ countries, handler }) => {
  return (
    <div>
      {countries.length > 10 ? (
        <p>too many matches, please specify filter</p>
      ) : countries.length === 1 ? (
        <div>
          <FullCountry country={countries[0]} />
        </div>
      ) : (
        <div>
          {countries.map((country) => {
            return (
              <Country
                handler={handler}
                key={country["alpha2Code"]}
                country={country}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Content;
