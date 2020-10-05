"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const uuid_1 = require("uuid");
const patients = patients_json_1.default;
const getAll = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (obj) => {
    const newPatient = Object.assign(Object.assign({}, obj), { id: uuid_1.v4() });
    patients.push(newPatient);
    return newPatient;
};
exports.default = {
    getAll,
    addPatient,
};
