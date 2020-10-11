import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
export type OccupationalHealthcareValues = Omit<
  OccupationalHealthcareEntry,
  "id"
>;
interface OccupationalHealthcareEntryProps {
  onSubmit: (values: OccupationalHealthcareValues) => void;
}

export const AddOccupationalHealthCareEntry: React.FC<OccupationalHealthcareEntryProps> = ({
  onSubmit,
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        date: "",
        description: "",
        specialist: "",
        employerName: "",
        diagnosisCodes: [],
      }}
      onSubmit={(values: OccupationalHealthcareValues, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
      validate={(values) => {
        const requiredError = "Field is Required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, initialValues }) => {
        return (
          <Form className="form ui">
            <Field disabled name="type" value={initialValues.type} />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Employer Name"
              placeholder="employer name"
              name="employerName"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid centered>
              <Grid.Column width={5}>
                <Button
                  type="submit"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
