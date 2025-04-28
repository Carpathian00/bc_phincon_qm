"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animal = exports.food = void 0;
exports.subtract = subtract;
exports.default = stringModule;
const food = "rice";
exports.food = food;
const animal = "dog";
exports.animal = animal;
function subtract(a, b) {
    return a - b;
}
function stringModule() {
    return {
        generateRandomCharacters: (length) => {
            return Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('');
        },
        generateUserName: (name) => {
            return name
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('');
        }
    };
}
