// Silly Season
casper.test.begin("Test suite for Silly Season blog", function suite(test) {
	var expectedBlogPosts = 10,
		expectedFirstUrl = "http://www.aftonbladet.se",
		expectedSecondUrl = "http://www.aftonbladet.se/sportbladet/",
		expectedThirdUrl = "http://bloggar.aftonbladet.se/sillyseason",
		expectedFirstTitle = "Aftonbladet: Sveriges nyhetskälla och mötesplats",
		expectedSecondTitle = "Sportbladet | Aftonbladet",
		expectedThirdTitle = "Silly Season",
		sport_selector = ".abSiteNav ul li a[href='" + expectedSecondUrl + "']",
		left_sidebar_selector = "#abLeftColumn",
		silly_season_selector = "#abLeftColumn .abItem .abItemSlim a[href$='" + expectedThirdUrl + "']",
		blog_post_selector = "section.abBloggContent article";

	// -- 1 www.aftonbladet.se --
	casper.start("http://www.aftonbladet.se", function () {
		console.log("Page loaded");
		
		// -- 1a kontrollera URL och titel --
		test.assertUrlMatch(/.*www\.aftonbladet\.se/, "URL matches " + expectedFirstUrl);
		test.assertTitle(expectedFirstTitle, "Title is '" + expectedFirstTitle + "'");
		
		// -- 1b ta screenshot --
		//this.capture('screenshots/first_page.png');
		
		// -- 1c kontrollera att "Sport" finns i listan --
		test.assertSelectorHasText(sport_selector, "Sport", "'Sport' is found in navigation list");
		
		// -- 1d  klicka på "Sport"--
		casper.click(sport_selector);
		console.log("Clicked on 'Sport'");
	});
	
	// -- 2 www.aftonbladet.se/sportbladet/ --
	casper.then(function() {
		console.log("Page loaded");
		
		// -- 2a kontrollera URL och titel --
		test.assertUrlMatch(/.*www\.aftonbladet\.se\/sportbladet/, "URL matches " + expectedSecondUrl);
		test.assertTitle(expectedSecondTitle, "Title is '" + expectedSecondTitle + "'");
		
		// -- 2b ta screenshot --
		//this.capture('screenshots/second_page.png');
		
		// -- 2c kontrollera att "Sportbloggar" finns --
		test.assertSelectorHasText(left_sidebar_selector, "SPORTBLOGGAR", "'SPORTBLOGGAR' is found in left sidebar");
		
		// -- 2d kontrollera att "Silly Season-bloggen" finns --
		test.assertSelectorHasText(silly_season_selector, "SILLY SEASON FOTBOLL", "'SILLY SEASON FOTBOLL' is found under SPORTBLOGGAR");
		
		// -- 2e klicka på "Silly Season-bloggen" --
		casper.click(silly_season_selector);
		console.log("Clicked on 'Silly Season Fotboll'");
	});
	
	// -- 3 bloggar.aftonbladet.se/sillyseason/ --
	casper.then(function() {
		console.log("Page loaded");
		
		// -- 3a kontrollera URL och titel --
		test.assertUrlMatch(/.*bloggar\.aftonbladet\.se\/sillyseason/, "URL matches " + expectedThirdUrl);
		test.assertTitle(expectedThirdTitle, "Title is '" + expectedThirdTitle + "'");
		
		// -- 3b ta screenshot --
		//this.capture('screenshots/third_page.png');
		
		// -- 3c kontrollera att det finns 10 blogginlägg på sidan --
		test.assertEquals(
			casper.evaluate(function (blog_post_selector) {
				return document.querySelectorAll(blog_post_selector).length;
			}, blog_post_selector),
			expectedBlogPosts,
			expectedBlogPosts + " blog posts found"
		);
	});

	casper.run(function () {
		test.done();
	});
});