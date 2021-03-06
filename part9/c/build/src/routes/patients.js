"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientService_1.default.getAll());
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    try {
        const patient = patientService_1.default.getById(id);
        res.json(patient);
    }
    catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(error.message);
    }
});
router.post("/", (req, res) => {
    try {
        const newPatient = utils_1.default.toNewPatient(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(error.message);
    }
});
router.post("/:id/entries", (req, res) => {
    const id = req.params.id;
    try {
        const newEntry = utils_1.default.toNewEntry(req.body);
        const addedEntry = patientService_1.default.addEntry(id, newEntry);
        res.json(addedEntry);
    }
    catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(error.message);
    }
});
exports.default = router;
