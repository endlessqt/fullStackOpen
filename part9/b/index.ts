import express from "express";
import { calcuateBmi } from "./bmiCalculator";

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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
