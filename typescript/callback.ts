type Callback = (num: number) => string;

function add(a: number, b: number, callback: Callback) {
    return callback(a + b);
}

const aa = 10;
const bb = 20;

const finalResult = add(aa, bb, (result) => {
    console.log(result);
    return "yes";
});

console.log(finalResult)