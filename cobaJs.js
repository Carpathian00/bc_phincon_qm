let a = 10;
let objA = { value: 10 };


let b = a;
b = 20;
console.log(a); // Output: 10

let objB = objA;
objB.value = 20;
console.log("objA " + objA.value); // Output: 20
console.log("objB " + objB.value); // Output: 20

// Shallow Copy Example
let originalArray = [1, 2, 3, { a: 4 }];
let shallowCopy = originalArray.slice();
shallowCopy[3].a = 10;
// console.log(originalArray); // Output: [1, 2, 3, { a: 10 }]
// console.log(shallowCopy);  // Output: [1, 2, 3, { a: 10 }]

// Deep Copy Example
let deepCopy = JSON.parse(JSON.stringify(originalArray));
deepCopy[3].a = 20;
// console.log(originalArray); // Output: [1, 2, 3, { a: 10 }]
// console.log(deepCopy);      // Output: [1, 2, 3, { a: 20 }]


let students = [
    { name: "Alice", score: 97 },
    { name: "Bob", score: 90 },
    { name: "Jon", score: 95 },
]

// shallow copy
let studentsCopy = students.slice()
studentsCopy[1].name = "Bron"
console.log(studentsCopy[1])
console.log(students[1])

// deep copy
let deepStudentsCopy = JSON.parse(JSON.stringify(students))
deepStudentsCopy[2].name = "Claude"
console.log(students[2])
console.log(deepStudentsCopy[2])