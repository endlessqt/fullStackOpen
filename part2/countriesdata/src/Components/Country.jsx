import React from "react";
import Button from "./Button";
const Country = ({ country, handler }) => {
  return (
    <p>
      {country.name}
      <Button handler={handler} value={country.name} />
    </p>
  );
};

export default Country;
