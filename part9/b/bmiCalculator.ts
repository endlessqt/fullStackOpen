type Result =
  | "very severely underweigh"
  | "severly underweight"
  | "underweight"
  | "normal(healthy weight)"
  | "overweight"
  | "obese class I (moderately obese)"
  | "Obese Class II(severely obese)"
  | "obese class III(vary severely obese)";
interface weightHeight {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): weightHeight => {
  if (args.length < 4) throw new Error("not enough arguments");
  if (args.length > 4) throw new Error("to many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  }
  throw new Error("arguments are not numbers");
};

export const calcuateBmi = (weight: number, height: number): Result => {
  const bmi = Math.round(weight / Math.pow(height / 100, 2));
  switch (true) {
    case bmi < 15:
      return "very severely underweigh";
    case bmi <= 16:
      return "severly underweight";
    case bmi <= 18.5:
      return "underweight";
    case bmi <= 25:
      return "normal(healthy weight)";
    case bmi <= 30:
      return "overweight";
    case bmi <= 35:
      return "obese class I (moderately obese)";
    case bmi <= 40:
      return "Obese Class II(severely obese)";
    case bmi > 40:
      return "obese class III(vary severely obese)";
    default:
      throw new Error(
        "WOW, something is incredibly wrong with you or my function"
      );
  }
};
try {
  const { weight, height } = parseArguments(process.argv);
  calcuateBmi(weight, height);
} catch (e) {
  // eslint-disable-next-line
  console.log("Error happened", e.message);
}
