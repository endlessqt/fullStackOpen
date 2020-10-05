import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartWithComment extends CoursePartBase {
  description: string;
}
interface CoursePartOne extends CoursePartWithComment {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithComment {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}
interface BestCoursePart extends CoursePartWithComment {
  name: "Roflan";
  bestBoyInDaHood: "Anton";
}
export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | BestCoursePart;

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Roflan",
      exerciseCount: 228,
      description: "Best course part ever",
      bestBoyInDaHood: "Anton",
    },
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content parts={courseParts} />
      <Total exerciseCount={courseParts.map((part) => part.exerciseCount)} />
    </div>
  );
};

export default App;
