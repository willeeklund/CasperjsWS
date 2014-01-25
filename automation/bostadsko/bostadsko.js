var config = require("./config.js");

// Sign up for all free apartments that cost less than 10.000 kr
casper.test.begin("Sign up me for the bostadskö", function (test) {
  var startUrl = "http://www.johnmattson.se/login/?returnurl=%2flagenhetsformedling%2flagenheter";
  casper.start(startUrl, function () {
    casper.capture("bostad_login.png");
    this.echo("Login page");
    test.assertVisible("input[id$='User']", "Visible input for username");
    test.assertVisible("input[id$='Password']", "Visible input for password");
    casper.fillSelectors('form', {
        "input[id$='User']"    : config.user,
        "input[id$='Password']": config.password
    }, false);
    casper.click("a[id$='submit']");
  });

  var listUrl = "http://www.johnmattson.se/lagenhetsformedling/lagenheter";
  casper.waitFor(function check() {
    return this.getCurrentUrl() == listUrl;
  }, function then() {
    this.echo("Logged in");
    casper.capture("bostad_logged_in.png");
    casper.click(".clickable");
  });

  var selector_address = "h1 span[id$='adress']";
  casper.waitUntilVisible(selector_address, function () {
    casper.capture("bostad_item.png");
    var adress_name = casper.evaluate(function (selector_address) {
      return jQuery(selector_address).text();
    }, selector_address);

    test.assertNotEquals(
      adress_name,
      "",
      "There is a valid address: '" + adress_name + "'."
    );
  });

  casper.then(function () {
    var month_rent = casper.evaluate(function () {
      return parseInt(jQuery(".jmfabinfotd").text().match(/\d+ kr\/mån/gi), 10);
    });
    test.assert(0 < month_rent && month_rent < 10000, "Rent is less than 10k: " + month_rent);
  });

  casper.thenClick("a[id$=anmal]", function () {
    console.log("anmal url", this.getCurrentUrl());
    casper.capture("bostad_anmal_page.png");
  });

  casper.run(function () {
    test.done();
  })
});