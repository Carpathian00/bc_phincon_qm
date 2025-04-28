function add(a, b, callback) {
    return callback(a + b);
}
var a = 10;
var b = 20;
var finalResult = add(a, b, function (result) {
    console.log(result);
    return "yes";
});
console.log(finalResult);
