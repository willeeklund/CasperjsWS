//Annonsera utan konto
casper.test.begin("Test suite for Annonsera utan konto", function suite(test) {
	casper.start("http://www.arbetsformedlingen.se/For-arbetsgivare/Annonsera/Annonsera-utan-konto.html", function() {

	    casper.echo("\n-------------------------------\n");

		echoText("Kontrollerar om sidan existerar");
    });

	casper.then(function () {
		controllingPageExist_Exists(test);

		//casper.capture('screenshots/annonsera1.png');

		echoTextAndSeparators("Sidan existerar");
	});

	casper.then(function () {
	    echoText("Kontrollerar om sidans element existerar");

		controllingElementsExist_Exists(test);

		echoTextAndSeparators("Sidans element existerar");
    });

	casper.then(function () {
	    echoText("Fyller i fomruläret");

	    fillFormCorrectly_OnlyMandatory_FilledCorrectly(test);

	    //casper.capture('screenshots/annonsera2.png');

		echoTextAndSeparators("Formuläret ifyllt");
	});

	casper.then(function () {
	    echoText("Klickar på knappen Fortsätt");

	    casper.click('input[name$="btnFortsatt1"]');

		echoTextAndSeparators("Formuläret skickades");
	});

	casper.then(function() {
	    echoIfErrorMessage();

	    //casper.capture('screenshots/annonsera3.png');

		test.assertTextExists("Granska, steg 2 av 3", "Vidare på Granska, steg 2 av 3\n");
	});

    casper.run(function() {
        test.done();
    });
});

function echoText(text) {
    casper.echo(text + "\n");
}

function echoTextAndSeparators(text) {
	echoText("\n" + text);
	echoText("-------------------------------");
}

function echoIfErrorMessage() {
    var errorMessageExists = casper.evaluate(function () {
		return document.querySelector('div.errMsg') != undefined;
	});

	if(errorMessageExists) {
	    casper.echo("Formuläret hade fel:");
	    casper.echo(casper.fetchText('div.errMsg') + "\n");
	} else {
	    casper.echo("Formuläret hade inga fel\n");
	}
}

function controllingPageExist_Exists(test) {
	test.assertTextDoesntExist("UTVECKLINGSMILJÖ - (WS/UTV2/U1)", "Inte i Utvecklingsmiljön");
	test.assertExists('form[name="aspnetForm"]', 'ASP.NET-sidan finns');
	test.assertTitle("Annonsera utan konto - Arbetsförmedlingen", "Sidtiteln på Annonsera utan konto finns");
}

function controllingElementsExist_Exists(test) {
	casper.echo("Knappar");
	test.assertExists('input[name$="btnRensa1"]', "");
	test.assertExists('input[name$="btnFortsatt1"]', "");
	test.assertExists('input[name$="btnRensa2"]', "");
	test.assertExists('input[name$="btnFortsatt2"]', "");

	casper.echo("\nInformation om företaget");
	test.assertExists('input[name$="txtForetag"]', "");
	test.assertExists('input[name$="txtOrgNr"]', "");
	test.assertExists('input[name$="txtBesoksadress"]', "");
	test.assertExists('input[name$="txtPostadress"]', "");
	test.assertExists('input[name$="txtPostnummer"]', "");
	test.assertExists('input[name$="txtOrt"]', "");
	test.assertExists('input[name$="txtTelefon"]', "");
	test.assertExists('input[name$="txtFax"]', "");
	test.assertExists('input[name$="txtVaxel"]', "");
	test.assertExists('input[name$="txtHemsida"]', "");
	test.assertExists('input[name$="txtEpost"]', "");
	test.assertExists('textarea[name$="txtForetagsbeskrivning"]', "");

	casper.echo("\nInformation om ledig tjänst");
	test.assertExists('input[name$="txtArbetsplats"]', "");
	test.assertExists('input[name$="txtArbetsplatsPostnummer"]', "");
	test.assertExists('input[name$="txtArbetsplatsOrt"]', "");
	test.assertExists('input[name$="txtYrkesbenamning"]', "");
	test.assertExists('textarea[name$="txtArbetsuppgifter"]', "");
	test.assertExists('textarea[name$="txtKvalifikationer"]', "");

	casper.echo("\nAnställningsvillkor");
	test.assertExists('input[name$="txtTilltradesdatum"]', "");
	test.assertExists('select[name$="ddAnstallningstyp"]', "");
	test.assertExists('select[name$="ddErfarenhet"]', "");
	test.assertExists('select[name$="ddVaraktighet"]', "");
	test.assertExists('select[name$="ddArbetstid"]', "");
	test.assertExists('input[name$="txtArbetstidOvrigt"]', "");
	test.assertExists('select[name$="ddLoneform"]', "");
	test.assertExists('input[name$="txtLoneformOvrigt"]', "");
	test.assertExists('textarea[name$="txtOvrigavillkor"]', "");

	casper.echo("\nAnsökan");
	test.assertExists('input[name$="txtAnsokanSenastDatum"]', "");
	test.assertExists('input[name$="txtAnsokanReferensnummer"]', "");
	test.assertExists('input[name$="cbxAnsokanSkriftlig"]', "");
	test.assertExists('textarea[name$="txtAnsokanAndraUppgifter"]', "");

	casper.echo("\nKontaktpersoner");
	test.assertExists('input[name$="txtKpers1Funktion"]', "");
	test.assertExists('input[name$="txtKpers1Namn"]', "");
	test.assertExists('input[name$="txtKpers1Epost"]', "");
	test.assertExists('input[name$="txtKpers1Telefon"]', "");
	test.assertExists('input[name$="txtKpers1Fax"]', "");

	test.assertExists('input[name$="txtKpers2Funktion"]', "");
	test.assertExists('input[name$="txtKpers2Namn"]', "");
	test.assertExists('input[name$="txtKpers2Epost"]', "");
	test.assertExists('input[name$="txtKpers2Telefon"]', "");
	test.assertExists('input[name$="txtKpers2Fax"]', "");

	test.assertExists('input[name$="txtKpers3Funktion"]', "");
	test.assertExists('input[name$="txtKpers3Namn"]', "");
	test.assertExists('input[name$="txtKpers3Epost"]', "");
	test.assertExists('input[name$="txtKpers3Telefon"]', "");
	test.assertExists('input[name$="txtKpers3Fax"]', "");

	casper.echo("\nInformation till arbetsförmedlingen");
	test.assertExists('input[name$="txtAfAnnonseraFrom"]', "");
	test.assertExists('input[name$="txtAfAnnonseraTom"]', "");
	test.assertExists('textarea[name$="txtAfOvrigaUpplysningar"]', "");

}

function fillFormCorrectly_OnlyMandatory_FilledCorrectly(test) {
    casper.fillSelectors('form[name="aspnetForm"]', {
		////Information om företaget
		'input[name$="txtForetag"]': 'CasperJS_txtForetag',
		'input[name$="txtOrgNr"]': '0123456789',
		'input[name$="txtBesoksadress"]': 'CasperJS_txtBesoksadress',
		'input[name$="txtPostadress"]': 'CasperJS_txtPostadress',
		'input[name$="txtPostnummer"]': '12345',
		'input[name$="txtOrt"]': 'CasperJS_txtOrt',
		'input[name$="txtTelefon"]': '123456789',
		'textarea[name$="txtForetagsbeskrivning"]': 'CasperJS_txtForetagsbeskrivning',
		'input[name$="txtYrkesbenamning"]': 'CasperJS_txtYrkesbenamning',
		'textarea[name$="txtArbetsuppgifter"]': 'CasperJS_txtArbetsuppgifter',
		'textarea[name$="txtKvalifikationer"]': 'CasperJS_txtKvalifikationer',

		////Anställningsvillkor
		'input[name$="txtTilltradesdatum"]': 'CasperJS_',

		////Kontaktpersoner
		'input[name$="txtKpers1Funktion"]': 'CasperJS_txtKpers1Funktion',
		'input[name$="txtKpers1Namn"]': 'CasperJS_txtKpers1Namn',
		'input[name$="txtKpers1Telefon"]': '0123456789',

		////Information till arbetsförmedlingen
		'input[name$="txtAfAnnonseraFrom"]': '2014-01-01',
		'input[name$="txtAfAnnonseraTom"]': '2014-01-31'
	}, false);

	//dropdowns
	casper.evaluate(function() {
		document.querySelector('select[name$="ddAnstallningstyp"] option[value="2"]').selected = true; //Sommarjobb / feriejobb
		document.querySelector('select[name$="ddErfarenhet"] option[value="2"]').selected = true; //Erfarenhet krävs
		document.querySelector('select[name$="ddVaraktighet"] option[value="2"]').selected = true; //6 månader eller längre
		document.querySelector('select[name$="ddArbetstid"] option[value="2"]').selected = true; //Deltid
		document.querySelector('select[name$="ddLoneform"] option[value="7"]').selected = true; //Fast lön + rörlig lön
	});
}