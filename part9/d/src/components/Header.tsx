import React from "react";

interface HeaderProps {
  courseName: string;
}

const Header: React.FC<HeaderProps> = ({ courseName }) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

export default Header;
