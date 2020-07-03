import React from "react";

const Filter = ({ handler, value, click }) => {
  return (
    <>
      find countries <input onClick={click} onChange={handler} value={value} />
    </>
  );
};

export default Filter;
