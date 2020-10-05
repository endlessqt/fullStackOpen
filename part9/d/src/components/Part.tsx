import React from "react";
import { CoursePart } from "../App";

const Part: React.FC<CoursePart> = (props) => {
  switch (props.name) {
    case "Deeper type usage":
      return (
        <p>
          {props.name} {props.exerciseCount} {props.exerciseSubmissionLink}{" "}
          {props.description}
        </p>
      );
    case "Fundamentals":
      return (
        <p>
          {props.name} {props.exerciseCount} {props.description}
        </p>
      );
    case "Using props to pass data":
      return (
        <p>
          {props.name} {props.exerciseCount}
          {props.groupProjectCount}
        </p>
      );
    case "Roflan":
      return (
        <p>
          {props.name} {`Best boi in da hood: ${props.bestBoyInDaHood} DADAYA`}{" "}
          {props.exerciseCount} {props.description}
        </p>
      );
    default:
      return null;
  }
};

export default Part;
