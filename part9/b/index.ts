import express from "express";
import { calcuateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});
app.get("/bmi", (req, res) => {
  const query = req.query;
  if (
    !query.weight ||
    !query.height ||
    isNaN(Number(query.weight)) ||
    isNaN(Number(query.height))
  ) {
    res.status(400).send({ error: "malformated args" });
  } else {
    const { height, weight } = query;
    res.json({
      height,
      weight,
      bmi: calcuateBmi(Number(weight), Number(height)),
    });
  }
});
app.post("/exercises", (req, res) => {
  // eslint-disable-next-line
  const { target, dailyExercises } = req.body;
  if (!target || !dailyExercises) {
    res.status(400).send({ error: "no params" });
  } else if (
    isNaN(Number(target)) ||
    !Array.isArray(dailyExercises) ||
    dailyExercises.some((val) => isNaN(val) || val === "")
  ) {
    res.status(400).send({ error: "malformatterd args" });
  } else {
    // eslint-disable-next-line
    const arr = dailyExercises.map((val) => Number(val));
    const result = calculateExercises(arr, target);
    res.send(result);
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
