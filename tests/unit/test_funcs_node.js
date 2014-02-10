console.log("Start of square-tester");

var funcs = require("./funcs");
console.log("funcs:", funcs);

var four = funcs.square(2);
var nine = funcs.square(3);

console.log("square(2): " + four);
console.log("square(3): " + nine);
