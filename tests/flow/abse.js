casper.test.begin('Test suite for aftonbladet.se', 4, function suite(test) {
  casper.start('http://www.aftonbladet.se', function () {
    test.assertUrlMatch(/^http:\/\/www\.aftonbladet\.se\/$/, 'AB frontpage loaded');
    test.assertVisible('.abSiteNav', 'Navigation element exists');
    // casper.capture('screenshots/abse_frontpage.png');
    // casper.captureSelector('screenshots/abse_navigation.png', '.abSiteNav');
  });
  casper.then(function () {
    test.assertSelectorHasText('.abSiteNav', 'Sport', 'Navigation has Sport section');
  });
  casper.then(function () {
    var nbrArticles = casper.evaluate(function () {
      return document.querySelectorAll('.abBlock').length;
    });
    test.info('Number of articles: ' + nbrArticles);
    test.assert(nbrArticles > 100, 'Hundreds of articles are shown');
  });
  casper.run(function () {
    test.done();
  });
});