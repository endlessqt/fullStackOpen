type Result =
  | "very severely underweigh"
  | "severly underweight"
  | "underweight"
  | "normal(healthy weight)"
  | "overweight"
  | "obese class I (moderately obese)"
  | "Obese Class II(severely obese)"
  | "obese class III(vary severely obese)";

const calcuateBmi = (weight: number, height: number): Result => {
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
console.log(calcuateBmi(75, 180));
console.log(calcuateBmi(92, 173));
console.log(calcuateBmi(52, 170));
console.log(calcuateBmi(100, 188));
