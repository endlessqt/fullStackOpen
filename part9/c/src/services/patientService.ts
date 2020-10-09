import patients from "../../data/patients";
import { v4 as uuidv4 } from "uuid";
import { NewPatient, Patient, NewEntry, Entry } from "../types";
const getAll = (): Array<Omit<Patient, "ssn">> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};
const getById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};
const addPatient = (obj: NewPatient): Patient => {
  const newPatient = {
    ...obj,
    id: uuidv4(),
  };
  patients.push(newPatient);
  return newPatient;
};
const addEntry = (id: string, entry: NewEntry): Entry => {
  const patient = getById(id);
  if (!patient) throw new Error("patient is missing");
  const patientEntries = patient?.entries;
  const newEntry = {
    ...entry,
    id: uuidv4(),
  } as Entry;
  patientEntries.push(newEntry);
  return newEntry;
};
export default {
  getAll,
  addPatient,
  getById,
  addEntry,
};
