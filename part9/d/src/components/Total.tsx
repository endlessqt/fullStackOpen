import React from "react";

interface TotalProps {
  exerciseCount: Array<number>;
}

const Total: React.FC<TotalProps> = ({ exerciseCount }) => {
  return (
    <div>
      Number of exercises:{" "}
      {exerciseCount.reduce((total, currVal) => total + currVal)}
    </div>
  );
};

export default Total;
