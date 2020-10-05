import React from "react";
import { CoursePart } from "../App";
import Part from "./Part";

interface ContentProps {
  parts: CoursePart[];
}
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Content: React.FC<ContentProps> = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        switch (part.name) {
          case "Fundamentals":
            return (
              <Part
                key={part.name}
                name={part.name}
                exerciseCount={part.exerciseCount}
                description={part.description}
              />
            );
          case "Roflan":
            return (
              <Part
                key={part.name}
                name={part.name}
                bestBoyInDaHood={part.bestBoyInDaHood}
                description={part.description}
                exerciseCount={part.exerciseCount}
              />
            );
          case "Deeper type usage":
            return (
              <Part
                key={part.name}
                name={part.name}
                exerciseCount={part.exerciseCount}
                exerciseSubmissionLink={part.exerciseSubmissionLink}
                description={part.description}
              />
            );
          case "Using props to pass data":
            return (
              <Part
                key={part.name}
                name={part.name}
                groupProjectCount={part.exerciseCount}
                exerciseCount={part.exerciseCount}
              />
            );
          default:
            return assertNever(part);
        }
      })}
    </div>
  );
};

export default Content;
