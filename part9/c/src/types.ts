export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}
export type PublicPatient = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id">;
export type NewEntry = Omit<Entry, "id">;
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
interface BaseEntry {
  id: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk",
  "CriticalRisk",
}
export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
export interface Discharge {
  date: string;
  criteria: string;
}
export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}
export interface SickLeave {
  startDate: string;
  endDate: string;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}
export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;
