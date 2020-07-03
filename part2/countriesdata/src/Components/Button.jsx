import React from "react";

const Button = ({ handler, value }) => {
  return (
    <button onClick={handler} value={value}>
      show
    </button>
  );
};

export default Button;
