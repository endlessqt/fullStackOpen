import React from "react";
import Person from "./Person";

const Content = ({ personsToShow, handleDelete }) => {
  return (
    <ul>
      {personsToShow.map((person) => {
        return (
          <Person
            key={person.name}
            name={person.name}
            number={person.number}
            handleDelete={() => handleDelete(person.id)}
          />
        );
      })}
    </ul>
  );
};

export default Content;
