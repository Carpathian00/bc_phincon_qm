"use strict";
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    displayInfo() {
        return {
            brand: this.brand,
            model: this.model,
            year: this.year
        };
    }
}
let myCar = new Car("Toyota", "Camry", 2022);
const carInfo = myCar.displayInfo();
console.log(carInfo);
const getData = (status) => {
    switch (status) {
        case "active":
            console.log("Data is active");
            break;
        case "inactive":
            console.log("Data is inactive");
            break;
        case "deleted":
            console.log("Data is deleted");
            break;
    }
    if (status === "active") {
        console.log("Data is active");
    }
    else if (status === "inactive") {
        console.log("Data is inactive");
    }
    else if (status === "deleted") {
        console.log("Data is deleted");
    }
};
const person = {
    name: "Rovo",
    age: 24,
    metaData: {
        sex: "male",
        height: "170cm",
        favNumber: 7
    },
    address: "Bandung"
};
