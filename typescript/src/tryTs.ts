class Car {
    public brand: string;
    public model: string;
    public year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }   

    displayInfo(): {brand: string, model: string, year: number} {
        return {
            brand: this.brand,
            model: this.model,
            year: this.year
        }
    }
}

let myCar = new Car("Toyota", "Camry", 2022);
const carInfo = myCar.displayInfo();
console.log(carInfo);

type Status = "active" | "inactive" | "deleted";

const getData = (status: Status) => {
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
    } else if (status === "inactive") {
        console.log("Data is inactive");
    } else if (status === "deleted") {
        console.log("Data is deleted");
    }
}

////////////////

interface MetaData {    
    sex: string;
    height: string;
    favNumber: number;
}

interface Person<T, A> {
    name: string;
    age: number;
    metaData: T;
    address: A;
}

const person: Person<MetaData, string> = {
    name: "Rovo",
    age: 24,
    metaData: {
        sex: "male",
        height: "170cm",
        favNumber: 7
    },
    address: "Bandung"
}
