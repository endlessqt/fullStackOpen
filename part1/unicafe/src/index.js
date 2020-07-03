import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Stat = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Stats = ({ count }) => {
  const sum = () => {
    let sum = 0;
    for (let i in count) {
      sum += count[i].count;
    }
    return sum;
  };
  if (sum() === 0) {
    return <div>no feedback given</div>;
  }
  const average = () => {
    return (
      (count["good"].count * 1 +
        count["bad"].count * -1 +
        count["neutral"].count * 0) /
      sum()
    );
  };
  const goodPercentage = () => {
    return ((count["good"].count / sum()) * 100).toString() + "%";
  };

  return (
    <table>
      <tbody>
        <Stat text={count.good.text} value={count.good.count} />
        <Stat text={count.neutral.text} value={count.neutral.count} />
        <Stat text={count.bad.text} value={count.bad.count} />
        <Stat text="all" value={sum()} />
        <Stat text="average" value={average()} />
        <Stat text="positive" value={goodPercentage()} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const count = {
    good: {
      text: "good",
      count: good,
    },
    neutral: {
      text: "neutral",
      count: neutral,
    },
    bad: {
      text: "bad",
      count: bad,
    },
  };
  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <h1>Give us your feedback</h1>
      <Button handleClick={handleGoodClick} text={count.good.text} />
      <Button handleClick={handleNeutralClick} text={count.neutral.text} />
      <Button handleClick={handleBadClick} text={count.bad.text} />
      <h2>Statistics</h2>
      <Stats count={count} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
