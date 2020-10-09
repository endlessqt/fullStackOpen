"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getAll = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const getById = (id) => {
    return patients_1.default.find((p) => p.id === id);
};
const addPatient = (obj) => {
    const newPatient = Object.assign(Object.assign({}, obj), { id: uuid_1.v4() });
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (id, entry) => {
    const patient = getById(id);
    if (!patient)
        throw new Error("patient is missing");
    const patientEntries = patient === null || patient === void 0 ? void 0 : patient.entries;
    const newEntry = Object.assign(Object.assign({}, entry), { id: uuid_1.v4() });
    patientEntries.push(newEntry);
    return newEntry;
};
exports.default = {
    getAll,
    addPatient,
    getById,
    addEntry,
};
