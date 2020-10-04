import patientsData from "../../data/patients.json";
import { v4 as uuidv4 } from "uuid";
import { Patient, NewPatient } from "../types";

const patients: Array<Patient> = patientsData;

const getAll = (): Array<Omit<Patient, "ssn">> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
const addPatient = (obj: NewPatient): Patient => {
  const newPatient = {
    ...obj,
    id: uuidv4(),
  };
  patients.push(newPatient);
  return newPatient;
};
export default {
  getAll,
  addPatient,
};
