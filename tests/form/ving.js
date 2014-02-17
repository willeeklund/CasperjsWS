casper.options.viewportSize = {
  width: 1024,
  height: 768
};

casper.test.begin('Test suite ving.se', function suite(test) {
  casper.start('http://www.ving.se/login', function () {
    casper.capture('screenshots/ving_login.png');
  });
  casper.then(function () {
    test.assertExists('input[name$="txtUserName"]', "See username field");
    test.assertExists('input[name$="txtPassWord"]', "See password field");
    casper.fillSelectors('form#aspnetForm', {
      'input[name$="txtUserName"]': 'mitt namn',
      'input[name$="txtPassWord"]': 'mitt lösenord'
    }, false);
    casper.click('input[name$="LoginButton"]');
  });
  casper.then(function () {
    casper.capture('screenshots/ving_logged_in.png');
  });
  casper.run(function () {
    test.done();
  });
});