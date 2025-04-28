import { food, animal } from "./export";
import stringModule from "./export";

const myStringModule = stringModule();

const randomString = myStringModule.generateRandomCharacters(5);
const userName = myStringModule.generateUserName("Jean D'Arc");

console.log(randomString);
console.log(userName);
console.log(food, animal);

let office = {
    name: "Phincon",
    location: "Jakarta",
    employee: 1000,
    manager: {
        name: "Rovo",
        age: 24
    }
};

const { 
    name: officeName, 
    location: officeLocation, 
    employee: officeEmployee, 
    manager: { name: managerName, age: managerAge }
 } = office 

 console.log(officeName)
 console.log(officeEmployee)
 console.log(managerName)
 console.log(managerAge)