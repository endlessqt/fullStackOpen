import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course: { name } }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  );
};
const Part = ({ part: { name, exercises } }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};
const Content = ({ course: { parts } }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
};
const Total = ({ course: { parts } }) => {
  return (
    <>
      <p>
        Final number of exercises is equals to{" "}
        {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
