// Hemma
casper.test.begin("Test suite for hemma.aftonbladet.se", 6, function suite(test) {
  var additionalCards = 15,
      expectedCards = 17,
      i = 0,
      grid_card_selector = ".grid-view .cards .card";

  casper.start("http://hemma.aftonbladet.se", function () {
    test.assertVisible("footer", "Footer is visible");

    test.assertEquals(
      casper.evaluate(function (grid_card_selector) {
        return document.querySelectorAll(grid_card_selector).length;
      }, grid_card_selector),
      expectedCards,
      expectedCards + " cards are listed in the grid at the bottom"
    );
    // Someimes "-1" is required here, caused by that one card in the live data
    // has already been rendered in the first 17. Luckily the backbone
    // implementation prevents the card from being printed out two times.
    // Change when needed to make it work :)
    expectedCards += additionalCards;

    test.assertEquals(
      casper.evaluate(function (grid_card_selector) {
        return document.querySelectorAll(grid_card_selector + " .card-type-post").length;
      }, grid_card_selector),
      5,
      "5 of them are articles"
    );
    // ---
    test.assertEquals(
      casper.evaluate(function () {
        return document.querySelectorAll(".grid-view .cards .card-type-ad").length;
      }),
      2,
      "2 of them are ads"
    );
  });

  // // Click for more and wait for the Ajax call to finish
  casper.thenClick('.show-more.button', function () {
    this.waitForResource('http://hemma.aftonbladet.se/wp-admin/admin-ajax.php');
  }).then(function () {
    test.assertEval(
      function () {
        return __utils__.findAll(".grid-view .cards .card").length >= 25;
      },
      additionalCards + " more grid cards are added asynchronously"
    );
  });

  casper.then(function () {
    test.assertEquals(
      casper.evaluate(function () {
        var sum = 0;
        jQuery(".card-content.card-type-bloggimport").each(function (index, item) {
          if ( 0 === jQuery(item).find("img").length ) {
            console.log("index: " + index + " has no image: ", item);
            sum++;
          }
        });
        return sum;
      }),
      0,
      "No grid cards without images are loaded"
    );
  });

  casper.run(function () {
    test.done();
  });
});