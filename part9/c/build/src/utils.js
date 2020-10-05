"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("date is missing or incorrect: " + date);
    }
    return date;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("incorrect or missing gender: " + gender);
    }
    return gender;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error("incorrect or missing ssn: " + ssn);
    }
    return ssn;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("incorrect or missing name: " + name);
    }
    return name;
};
const parseOccupation = (occupation) => {
    if (!(occupation && isString(occupation))) {
        throw new Error("incorrect occupation or missing: " + occupation);
    }
    return occupation;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (obj) => {
    return {
        name: parseName(obj.name),
        dateOfBirth: parseDate(obj.dateOfBirth),
        ssn: parseSsn(obj.ssn),
        occupation: parseOccupation(obj.occupation),
        gender: parseGender(obj.gender),
    };
};
exports.default = toNewPatient;
