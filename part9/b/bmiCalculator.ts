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

const calcuateBmi = (weight: number, height: number): Result => {
  const bmi = Math.round(weight / Math.pow(height / 100, 2));
  switch (true) {
    case bmi < 15:
      console.log("very severely underweigh");
      return;
    case bmi <= 16:
      console.log("severly underweight");
      return;
    case bmi <= 18.5:
      console.log("underweight");
      return;
    case bmi <= 25:
      console.log("normal(healthy weight)");
      return;
    case bmi <= 30:
      console.log("overweight");
      return;
    case bmi <= 35:
      console.log("obese class I (moderately obese)");
      return;
    case bmi <= 40:
      console.log("Obese Class II(severely obese)");
      return;
    case bmi > 40:
      console.log("obese class III(vary severely obese)");
      return;
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
  console.log("Error happened", e.message);
}
