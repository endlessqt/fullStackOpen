import React from "react";

const Total = ({ parts }) => {
  const total = parts.reduce((total, curr) => {
    return total + curr.exercises;
  }, 0);
  return (
    <>
      <p>Final number of exercises is equals to {total}</p>
    </>
  );
};

export default Total;
