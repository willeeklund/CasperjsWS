// platsbankentesting.js

//casper.options.clientScripts.push("includes/jquery.min-js");

casper.test.begin("Annonsera utan konto fungerar", 57, function suite(test) {
	casper.start("http://www.arbetsformedlingen.se/For-arbetsgivare/Annonsera/Annonsera-utan-konto.html", function() {
		
		this.echo("\n-------------------------------\n");
				
		echoText.call(this, "Kontrollerar om sidan existerar");
    });
	
	casper.then(function () {
		controllingPageExist_Exists.call(this, test);
		
		this.capture('screenshots/annonsera1.png');
		
		echoTextAndSeparators.call(this, "Sidan existerar");
		echoText.call(this, "Kontrollerar om sidans element existerar");
	});

    casper.then(function () {
		controllingElementsExist_Exists.call(this, test);
		
		echoTextAndSeparators.call(this, "Sidans element existerar");
		echoText.call(this, "Fyller i fomruläret");
    });
	
	casper.then(function () {
		fillFormCorrectly_OnlyMandatory_FilledCorrectly.call(this, test);
		this.capture('screenshots/annonsera2.png');
		echoTextAndSeparators.call(this, "Formuläret ifyllt");
		echoText.call(this, "Klickar på knappen Fortsätt");
	});
	
	casper.then(function() { 
		this.click('input[name$="btnFortsatt1"]');
		
		echoTextAndSeparators.call(this, "Formuläret skickades");
	});
	
	casper.then(function() { 
		echoIfErrorMessage.call(this);
		this.capture('screenshots/annonsera3.png');
		test.assertTextExists("Granska, steg 2 av 3", "Vidare på Granska, steg 2 av 3\n");
	});
	
    casper.run(function() {
        test.done();
    });
});

function echoText(text) {
	this.echo(text + "\n");
}

function echoTextAndSeparators(text) {
	echoText.call(this, "\n" + text);
	echoText.call(this, "-------------------------------");
}

function echoIfErrorMessage() {
	var errorMessageExists = this.evaluate(function() {
		return document.querySelector('div.errMsg') != undefined;
	});
	
	if(errorMessageExists) {
		this.echo("Formuläret hade fel:");
		this.echo(this.fetchText('div.errMsg') + "\n");
	} else {
		this.echo("Formuläret hade inga fel\n");
	}
}

function controllingPageExist_Exists(test) {
	test.assertTextDoesntExist("UTVECKLINGSMILJÖ - (WS/UTV2/U1)", "Inte i Utvecklingsmiljön");
	test.assertExists('form[name="aspnetForm"]', 'ASP.NET-sidan finns');
	test.assertTitle("Annonsera utan konto - Arbetsförmedlingen", "Sidtiteln på Annonsera utan konto finns");
}

function controllingElementsExist_Exists(test) {
	this.echo("Knappar");
	test.assertExists('input[name$="btnRensa1"]', "");
	test.assertExists('input[name$="btnFortsatt1"]', "");
	test.assertExists('input[name$="btnRensa2"]', "");
	test.assertExists('input[name$="btnFortsatt2"]', "");
	
	this.echo("\nInformation om företaget");
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
	
	this.echo("\nInformation om ledig tjänst");
	test.assertExists('input[name$="txtArbetsplats"]', "");
	test.assertExists('input[name$="txtArbetsplatsPostnummer"]', "");
	test.assertExists('input[name$="txtArbetsplatsOrt"]', "");
	test.assertExists('input[name$="txtYrkesbenamning"]', "");
	test.assertExists('textarea[name$="txtArbetsuppgifter"]', "");
	test.assertExists('textarea[name$="txtKvalifikationer"]', "");
	
	this.echo("\nAnställningsvillkor");
	test.assertExists('input[name$="txtTilltradesdatum"]', "");
	test.assertExists('select[name$="ddAnstallningstyp"]', "");
	test.assertExists('select[name$="ddErfarenhet"]', "");
	test.assertExists('select[name$="ddVaraktighet"]', "");
	test.assertExists('select[name$="ddArbetstid"]', "");
	test.assertExists('input[name$="txtArbetstidOvrigt"]', "");
	test.assertExists('select[name$="ddLoneform"]', "");
	test.assertExists('input[name$="txtLoneformOvrigt"]', "");
	test.assertExists('textarea[name$="txtOvrigavillkor"]', "");
	
	this.echo("\nAnsökan");
	test.assertExists('input[name$="txtAnsokanSenastDatum"]', "");
	test.assertExists('input[name$="txtAnsokanReferensnummer"]', "");
	test.assertExists('input[name$="cbxAnsokanSkriftlig"]', "");
	test.assertExists('textarea[name$="txtAnsokanAndraUppgifter"]', "");
	
	this.echo("\nKontaktpersoner");
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
	
	this.echo("\nInformation till arbetsförmedlingen");
	test.assertExists('input[name$="txtAfAnnonseraFrom"]', "");
	test.assertExists('input[name$="txtAfAnnonseraTom"]', "");
	test.assertExists('textarea[name$="txtAfOvrigaUpplysningar"]', "");
	
}

function fillFormCorrectly_OnlyMandatory_FilledCorrectly(test) {
	this.fillSelectors('form[name="aspnetForm"]', {
		////Information om företaget
		'input[name$="txtForetag"]': 'CasperJS_txtForetag',
		'input[name$="txtOrgNr"]': '0123456789',
		'input[name$="txtBesoksadress"]': 'CasperJS_txtBesoksadress',
		'input[name$="txtPostadress"]': 'CasperJS_txtPostadress',
		'input[name$="txtPostnummer"]': '12345',
		'input[name$="txtOrt"]': 'CasperJS_txtOrt',
		'input[name$="txtTelefon"]': '123456789',
		//'input[name$="txtFax"]': '',
		//'input[name$="txtVaxel"]': '',
		//'input[name$="txtHemsida"]': '',
		//'input[name$="txtEpost"]': '',
		'textarea[name$="txtForetagsbeskrivning"]': 'CasperJS_txtForetagsbeskrivning',

		////Information om ledig tjänst
		//'input[name$="txtArbetsplats"]': '',
		//'input[name$="txtArbetsplatsPostnummer"]': '',
		//'input[name$="txtArbetsplatsOrt"]': '',
		'input[name$="txtYrkesbenamning"]': 'CasperJS_txtYrkesbenamning',
		'textarea[name$="txtArbetsuppgifter"]': 'CasperJS_txtArbetsuppgifter',
		'textarea[name$="txtKvalifikationer"]': 'CasperJS_txtKvalifikationer',

		////Anställningsvillkor
		'input[name$="txtTilltradesdatum"]': 'CasperJS_',
		//'select[name$="ddAnstallningstyp"]': '',
		//'select[name$="ddErfarenhet"]': '',
		//'select[name$="ddVaraktighet"]': '',
		//'select[name$="ddArbetstid"]': '',
		//'input[name$="txtArbetstidOvrigt"]': '',
		//'select[name$="ddLoneform"]': '',
		//'input[name$="txtLoneformOvrigt"]': '',
		//'textarea[name$="txtOvrigavillkor"]': '',

		////Ansökan
		//'input[name$="txtAnsokanSenastDatum"]': '',
		//'input[name$="txtAnsokanReferensnummer"]': '',
		//'input[name$="cbxAnsokanSkriftlig"]': '',
		//'textarea[name$="txtAnsokanAndraUppgifter"]': '',

		////Kontaktpersoner
		'input[name$="txtKpers1Funktion"]': 'CasperJS_txtKpers1Funktion',
		'input[name$="txtKpers1Namn"]': 'CasperJS_txtKpers1Namn',
		//'input[name$="txtKpers1Epost"]': '',
		'input[name$="txtKpers1Telefon"]': '0123456789',
		//'input[name$="txtKpers1Fax"]': '',

		// 'input[name$="txtKpers2Funktion"]': '',
		// 'input[name$="txtKpers2Namn"]': '',
		// 'input[name$="txtKpers2Epost"]': '',
		// 'input[name$="txtKpers2Telefon"]': '',
		// 'input[name$="txtKpers2Fax"]': '',

		// 'input[name$="txtKpers3Funktion"]': '',
		// 'input[name$="txtKpers3Namn"]': '',
		// 'input[name$="txtKpers3Epost"]': '',
		// 'input[name$="txtKpers3Telefon"]': '',
		// 'input[name$="txtKpers3Fax"]': '',

		////Information till arbetsförmedlingen
		'input[name$="txtAfAnnonseraFrom"]': '2014-01-01',
		'input[name$="txtAfAnnonseraTom"]': '2014-01-31',
		//'textarea[name$="txtAfOvrigaUpplysningar"]': ''
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

function rest(test) {
	this.fillSelectors('form[name="aspnetForm"]', {'input[name$="txtSearch"]': 'bagare stockholm bar'}, false);
	test.assertEval(function() {
		return document.querySelector('input[name$="txtSearch"]').value === 'bagare stockholm bar';
	}, "Texten satt");
	this.click('input[name$="btnSearch"]');
	
	
	var rubrik = this.fetchText('span[id$="labelAntalPlatsannonser"]');
	test.assertMatch(rubrik, /Din sökning på 'bagare stockholm bar' gav \d+ träffar i Sverige och \d+ utomlands/, "Rubriken är hittad");
	test.assertEval(function() {
		return $('a[id$="hlRubrik"]').length == 6;
	}, "Platsbankensökning på 'bagare stockholm bar' gav 6 träffar");
}