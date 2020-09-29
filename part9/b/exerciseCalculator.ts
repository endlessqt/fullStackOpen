interface Output {
  allDays: number;
  trainingDays: number;
  target: number;
  averageTime: number;
  rating: number;
  ratingDescription: string;
  success: boolean;
}

const calculateExercises = (array: Array<number>, target: number): Output => {
  const result = {} as Output;
  result.allDays = array.length;
  result.trainingDays = array.filter((hours) => hours !== 0).length;
  result.target = target;
  result.averageTime =
    array.reduce((total, curr) => total + curr) / array.length;
  result.success = result.averageTime >= target ? true : false;
  if (target - result.averageTime <= 0) {
    result.rating = 3;
    result.ratingDescription = "you are doing great";
  } else if (target - result.averageTime <= 0.5) {
    result.rating = 2;
    result.ratingDescription =
      "you are doing good, but you have to exercise a little bit more";
  } else {
    result.rating = 1;
    result.ratingDescription =
      "you are doing bad, pay more attention to exercises";
  }
  return result;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 1));
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 3));
