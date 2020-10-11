import React from "react";
import { HospitalEntry } from "../types";
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
export type HospitalEntryValues = Omit<HospitalEntry, "id">;
interface HospitalEntryProps {
  onSubmit: (values: HospitalEntryValues) => void;
}
export const AddHospitalEntryForm: React.FC<HospitalEntryProps> = ({
  onSubmit,
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
        discharge: { date: "", criteria: "" },
        diagnosisCodes: [],
      }}
      onSubmit={(values: HospitalEntryValues, { resetForm }) => {
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
        if (!values.discharge) {
          errors.discharge = requiredError;
        }
        if (!values.discharge.date) {
          errors.discharge = requiredError;
        }
        if (!values.discharge.criteria) {
          errors.discharge = requiredError;
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
            <h3>Set Discharge</h3>
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
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
