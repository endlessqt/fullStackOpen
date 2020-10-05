/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};
const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("date is missing or incorrect: " + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("incorrect or missing ssn: " + ssn);
  }
  return ssn;
};
const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("incorrect or missing name: " + name);
  }
  return name;
};
const parseOccupation = (occupation: any): string => {
  if (!(occupation && isString(occupation))) {
    throw new Error("incorrect occupation or missing: " + occupation);
  }
  return occupation;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (obj: any): NewPatient => {
  return {
    name: parseName(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseSsn(obj.ssn),
    occupation: parseOccupation(obj.occupation),
    gender: parseGender(obj.gender),
  };
};

export default toNewPatient;
