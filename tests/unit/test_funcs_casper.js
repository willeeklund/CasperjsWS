var funcs = require("../../../modules/funcs.js");

casper.test.begin('assertEquals() tests', 2, function(test) {
  test.assertEquals(2*2, funcs.square(2), "2 square");
  test.assertEquals(9, funcs.square(3), "3 square");
  // test.assertEquals(7, funcs.square(3), "3 square becomes 7");
  test.done();
});