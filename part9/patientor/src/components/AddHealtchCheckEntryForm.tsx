import React from "react";
import { HealthCheckEntry } from "../types";
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";
import {
  DiagnosisSelection,
  TextField,
  NumberField,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

export type HealthCheckEntryValues = Omit<HealthCheckEntry, "id">;
interface HealthCheckEntryProps {
  onSubmit: (values: HealthCheckEntryValues) => void;
}
export const AddHealthCheckEntryForm: React.FC<HealthCheckEntryProps> = ({
  onSubmit,
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
      }}
      onSubmit={(values: HealthCheckEntryValues, { resetForm }) => {
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
        if (values.healthCheckRating > 4 || values.healthCheckRating < 0) {
          errors.healthCheckRating = requiredError;
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
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={4}
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
