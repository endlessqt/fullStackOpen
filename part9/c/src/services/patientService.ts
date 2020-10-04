import patientsData from "../../data/patients.json";

import { Patient } from "../types";

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

export default {
  getAll,
};
