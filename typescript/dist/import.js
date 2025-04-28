"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const export_1 = require("./export");
const export_2 = __importDefault(require("./export"));
console.log(export_1.food, export_1.animal);
console.log((0, export_2.default)().generateRandomCharacters(5));
let office = {
    name: "Phincon",
    location: "Jakarta",
    employee: 1000,
    manager: {
        name: "Rovo",
        age: 24
    }
};
const { name: officeName, location: officeLocation, employee: officeEmployee, manager: { name: managerName, age: managerAge } } = office;
console.log(officeName);
console.log(officeEmployee);
console.log(managerName);
console.log(managerAge);
