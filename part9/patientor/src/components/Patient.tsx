import React, { useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import {
  Entry,
  Patient,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";
import { useStateValue } from "../state";
import { updatePatient, addEntry } from "../state/reducer";
import {
  AddHospitalEntryForm,
  HospitalEntryValues,
} from "./AddHospitalEntryForm";
import {
  AddHealthCheckEntryForm,
  HealthCheckEntryValues,
} from "./AddHealtchCheckEntryForm";
import {
  AddOccupationalHealthCareEntry,
  OccupationalHealthcareValues,
} from "./AddOccupationalEntryForm";
import { Grid } from "semantic-ui-react";
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const HealthCheck = ({
  date,
  healthCheckRating,
  description,
}: HealthCheckEntry) => {
  return (
    <div style={{ marginBottom: "5px" }}>
      <b>{date}</b> <br />
      {description} <br />
      <b>Health Rating - {HealthCheckRating[healthCheckRating]}</b>
    </div>
  );
};
const Hospital = ({ date, description, discharge }: HospitalEntry) => {
  return (
    <div style={{ marginBottom: "5px" }}>
      <b>{date}</b> <br />
      {description} <br />
      Discharge date: <b>{discharge.date}</b> <br />
      Discharge criteria: <b>{discharge.criteria}</b>
    </div>
  );
};
const OccupationalHealth = ({
  date,
  description,
  employerName,
  sickLeave,
  diagnosisCodes,
}: OccupationalHealthcareEntry) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div style={{ marginBottom: "5px" }}>
      <b>
        {date} EMPLOYER: {employerName}
      </b>{" "}
      <br />
      {description} <br />
      {diagnosisCodes ? (
        <div>
          <h5>Diagnoses</h5>
          <ul>
            {diagnosisCodes?.map((code) => {
              return (
                <li key={code}>
                  {code} {diagnoses[code].name}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      {sickLeave ? (
        <div>
          Start Date: {sickLeave?.startDate} <br />
          End Date: {sickLeave?.endDate}
        </div>
      ) : null}
    </div>
  );
};
const EntryDetails = (entry: Entry) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck {...entry} />;
    case "Hospital":
      return <Hospital {...entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealth {...entry} />;
    default:
      assertNever(entry);
      return null;
  }
};

const PatientFull = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (!patients[id] || !Object.keys(patients[id]).includes("ssn")) {
          const { data } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatient(data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatient();
  }, [id, patients]);
  const submitNewEntry = async (
    values:
      | HospitalEntryValues
      | HealthCheckEntryValues
      | OccupationalHealthcareValues
  ) => {
    try {
      const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, data));
    } catch (error) {
      console.log(error.response.data);
    }
  };
  if (!patients[id] || Object.keys(diagnoses).length === 0) return null;
  return (
    <div>
      <h2>
        {patients[id].name} {'"'}
        {patients[id].gender}
        {'"'}
      </h2>
      <p>
        ssn: {patients[id].ssn} <br />
        occupation: {patients[id].occupation}
      </p>
      <Grid centered>
        <Grid.Column width={5}>
          <AddHospitalEntryForm onSubmit={submitNewEntry} />
        </Grid.Column>
        <Grid.Column width={6}>
          <AddHealthCheckEntryForm onSubmit={submitNewEntry} />
        </Grid.Column>
        <Grid.Column width={5}>
          <AddOccupationalHealthCareEntry onSubmit={submitNewEntry} />
        </Grid.Column>
      </Grid>

      <h3>entries</h3>
      {patients[id].entries.map((entry) => {
        return <EntryDetails key={entry.id} {...entry} />;
      })}
    </div>
  );
};

export default PatientFull;
