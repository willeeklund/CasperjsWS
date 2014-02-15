var config = require("./config.js");

// Sign up for all free apartments that cost less than 10.000 kr
casper.test.begin("Sign up me for the bostadskö", function (test) {
  var startUrl = "http://www.johnmattson.se/login/?returnurl=%2flagenhetsformedling%2flagenheter";
  casper.start(startUrl, function () {
    casper.capture("screenshots/bostad_login.png");
    test.info("Login page");
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
    test.info("Logged in");
    casper.capture("screenshots/bostad_logged_in.png");
    casper.click(".clickable");
  });

  var selector_address = "h1 span[id$='adress']";
  casper.waitUntilVisible(selector_address, function () {
    casper.captureSelector("screenshots/bostad_item.png", selector_address);
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
    test.info("Anmäl intresse url " + this.getCurrentUrl());
    casper.capture("screenshots/bostad_anmal_page.png");
    test.assertVisible("a[id$=Ja]", "Confirmation button visible.")
  });

  casper.thenClick("a[id$=Ja]", function () {
    test.info("Confirmation url " + this.getCurrentUrl());
    casper.capture("screenshots/bostad_confirm.png");
  });

  casper.run(function () {
    test.done();
  })
});