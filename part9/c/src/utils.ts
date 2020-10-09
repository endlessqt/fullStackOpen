/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  Discharge,
  HospitalEntry,
  HealthCheckRating,
  NewEntry,
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
} from "./types";

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
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (healthCheck: any): HealthCheckRating => {
  if (!healthCheck || !isHealthCheckRating(healthCheck)) {
    throw new Error("incorrect or missing healthcheckrating: " + healthCheck);
  }
  return healthCheck;
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
const parseDescription = (description: any): string => {
  if (!(description && isString(description))) {
    throw new Error("incorrect description or missing: " + description);
  }
  return description;
};
const parseSpectialist = (specialist: any): string => {
  if (!(specialist && isString(specialist))) {
    throw new Error("incorrect specialist or missing:" + specialist);
  }
  return specialist;
};
const isDischarge = (discharge: any): discharge is Discharge => {
  return (
    Object.keys(discharge).includes("date") ||
    Object.keys(discharge).includes("criteria") ||
    Object.values(discharge).some((value) => !isString(value))
  );
};
const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge) || !isDate(discharge.date)) {
    throw new Error("discharge is missing or incorrect: " + discharge);
  }
  return discharge;
};
const parseEmployerName = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error("employer name is missing or incorrect: " + param);
  }
  return param;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (obj: any): NewPatient => {
  return {
    name: parseName(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseSsn(obj.ssn),
    occupation: parseOccupation(obj.occupation),
    gender: parseGender(obj.gender),
    entries: [],
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewEntry = (obj: any): NewEntry => {
  if (!obj.type) throw new Error("you must include type of entry");
  switch ((obj as Entry).type) {
    case "Hospital":
      return {
        date: parseDate(obj.date),
        description: parseDescription(obj.description),
        specialist: parseSpectialist(obj.specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: obj.type,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        diagnosisCodes: obj.diagnosisCodes ? obj.diagnosisCodes : [],
        discharge: parseDischarge(obj.discharge),
      } as HospitalEntry;
    case "HealthCheck":
      return {
        date: parseDate(obj.date),
        description: parseDescription(obj.description),
        specialist: parseSpectialist(obj.specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: obj.type,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        diagnosisCodes: obj.diagnosisCodes ? obj.diagnosisCodes : [],
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
      } as HealthCheckEntry;
    case "OccupationalHealthcare":
      return {
        date: parseDate(obj.date),
        description: parseDescription(obj.description),
        specialist: parseSpectialist(obj.specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: obj.type,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        diagnosisCodes: obj.diagnosisCodes ? obj.diagnosisCodes : [],
        employerName: parseEmployerName(obj.employerName),
      } as OccupationalHealthcareEntry;
    default:
      throw new Error("malformated entry");
  }
};

export default { toNewPatient, toNewEntry };
