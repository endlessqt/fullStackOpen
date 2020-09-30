interface Output {
  allDays: number;
  trainingDays: number;
  target: number;
  averageTime: number;
  rating: number;
  ratingDescription: string;
  success: boolean;
}
interface exercisesArgs {
  target: number;
  daysArr: Array<number>;
}
const parseArgs = (args: Array<string>): exercisesArgs => {
  if (args.length <= 3) throw new Error("not enough arguments");
  const target = Number(args[2]);
  const daysArr = args.splice(3).map((arg) => Number(arg));
  if (!isNaN(target) && !daysArr.some((val) => isNaN(val))) {
    return {
      target,
      daysArr,
    };
  }
  throw new Error("all arguments must to be numbers");
};
export const calculateExercises = (
  array: Array<number>,
  target: number
): Output => {
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
  console.log(result);
  return result;
};

try {
  const { daysArr, target } = parseArgs(process.argv);
  calculateExercises(daysArr, target);
} catch (e) {
  // eslint-disable-next-line
  console.log("something went wrong", e.message);
}
