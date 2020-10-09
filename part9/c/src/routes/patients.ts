import express from "express";
import patientService from "../services/patientService";
import utils from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAll());
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  try {
    const patient = patientService.getById(id);
    res.json(patient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});
router.post("/", (req, res) => {
  try {
    const newPatient = utils.toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});
router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  try {
    const newEntry = utils.toNewEntry(req.body);
    const addedEntry = patientService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

export default router;
