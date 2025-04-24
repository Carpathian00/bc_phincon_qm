var Car = /** @class */ (function () {
    function Car(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    Car.prototype.displayInfo = function () {
        return {
            brand: this.brand,
            model: this.model,
            year: this.year
        };
    };
    return Car;
}());
var myCar = new Car("Toyota", "Camry", 2022);
var carInfo = myCar.displayInfo();
console.log(carInfo);
