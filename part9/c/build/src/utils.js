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
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (healthCheck) => {
    if (!isHealthCheckRating(healthCheck)) {
        throw new Error("incorrect or missing healthcheckrating: " + healthCheck);
    }
    return healthCheck;
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
const parseDescription = (description) => {
    if (!(description && isString(description))) {
        throw new Error("incorrect description or missing: " + description);
    }
    return description;
};
const parseSpectialist = (specialist) => {
    if (!(specialist && isString(specialist))) {
        throw new Error("incorrect specialist or missing:" + specialist);
    }
    return specialist;
};
const isDischarge = (discharge) => {
    return (Object.keys(discharge).includes("date") ||
        Object.keys(discharge).includes("criteria") ||
        Object.values(discharge).some((value) => !isString(value)));
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge) || !isDate(discharge.date)) {
        throw new Error("discharge is missing or incorrect: " + discharge);
    }
    return discharge;
};
const parseEmployerName = (param) => {
    if (!param || !isString(param)) {
        throw new Error("employer name is missing or incorrect: " + param);
    }
    return param;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (obj) => {
    return {
        name: parseName(obj.name),
        dateOfBirth: parseDate(obj.dateOfBirth),
        ssn: parseSsn(obj.ssn),
        occupation: parseOccupation(obj.occupation),
        gender: parseGender(obj.gender),
        entries: [],
    };
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewEntry = (obj) => {
    if (!obj.type)
        throw new Error("you must include type of entry");
    switch (obj.type) {
        case "Hospital":
            return {
                date: parseDate(obj.date),
                description: parseDescription(obj.description),
                specialist: parseSpectialist(obj.specialist),
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                type: obj.type,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                diagnosisCodes: obj.diagnosisCodes ? obj.diagnosisCodes : [],
                discharge: parseDischarge(obj.discharge),
            };
        case "HealthCheck":
            return {
                date: parseDate(obj.date),
                description: parseDescription(obj.description),
                specialist: parseSpectialist(obj.specialist),
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                type: obj.type,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                diagnosisCodes: obj.diagnosisCodes ? obj.diagnosisCodes : [],
                healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
            };
        case "OccupationalHealthcare":
            return {
                date: parseDate(obj.date),
                description: parseDescription(obj.description),
                specialist: parseSpectialist(obj.specialist),
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                type: obj.type,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                diagnosisCodes: obj.diagnosisCodes ? obj.diagnosisCodes : [],
                employerName: parseEmployerName(obj.employerName),
            };
        default:
            throw new Error("malformated entry");
    }
};
exports.default = { toNewPatient, toNewEntry };
