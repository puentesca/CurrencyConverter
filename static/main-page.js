
//Holds current values for the conversion. Default vals of AUD
//(Left)
let baseCurrencySelected = "AUD";
//(Right)
let convertedCurrencySelected = "AUD";

let debugging = false; //Determines whether or not to print debugging info

//leftChanged is a boolean if true then left side changed
let inputChanged = function(leftChanged) {
	if(debugging)
		console.log("changed on left: " + leftChanged);
	updateConversion(leftChanged);
	
}

//Enable or disable debugging
function debug(enabled)
{
	debugging = enabled;
}

//Called when one sides currency is changed
let currencyChanged = function(leftChanged) {
	if(leftChanged)
	{
		baseCurrencySelected = $("#currency_select_1").val();
		$("#currency_display_1").val(baseCurrencySelected);
	}
	else
	{
		convertedCurrencySelected = $("#currency_select_2").val();
		$("#currency_display_2").val(convertedCurrencySelected);
	}
	updateConversion(!leftChanged);
}

//Called after document has completed rendering
function init()
{
	//sets functions to run on event
	$("#input_1").on('input', function() {
		inputChanged(true)
	});
	$("#input_2").on('input', function() {
		inputChanged(false)
	});

	$("#currency_select_1").on('input', function() {
		currencyChanged(true)
	});
	$("#currency_select_2").on('input', function() {
		currencyChanged(false)
	});



	initCurrencies();

	console.log("'main.page.js' successfully loaded.");
}

//Initializes the selectable lists to have all available currencies
function initCurrencies()
{
	let url = "https://api.exchangeratesapi.io/latest";
	$.ajax({
		url
	}).done(function(currencies){
		let keys = []
		//Loops through all currencies listed and adds them to an array
		for(var key in currencies["rates"])
		{
			keys.push(key);
		}
		//Adds the base conversion key
		keys.push("EUR");

		//Alphabetizes the list
		keys.sort();
		//Adds all currencies available from the API to the list
		for(var i = 0; i < keys.length; i++)
		{
			$('#currency_select_1').append('<option value="' + keys[i] + '"> ' + keys[i] + '</option>'); 
			$('#currency_select_2').append('<option value="' + keys[i] + '"> ' + keys[i] + '</option>'); 
		}
		//Sets default value
		$('#currency_select_1').val('AUD'); 
		$('#currency_select_2').val('AUD'); 
	});

	//Sets default display value
	$("#currency_display_1").val("AUD");
	$("#currency_display_2").val("AUD");

}

//Called whenever the conversions need to be updated. 
// baseIsLeft = true when the base currency to convert from is in the left position.
function updateConversion(baseIsLeft)
{
	//Assumes left side is the base
	let localBase = baseCurrencySelected;
	let localConverted = convertedCurrencySelected;
	let inputIDToConvert = "#input_1";
	let inputIDToChange = "#input_2";
	//If the right side is the base
	if(!baseIsLeft)
	{
		inputIDToConvert = "#input_2";
		inputIDToChange = "#input_1";
		localBase = convertedCurrencySelected;
		localConverted = baseCurrencySelected;
	}
	//URL To convert from base to converted currency
	let url = "https://api.exchangeratesapi.io/latest?base=" + localBase + "&symbols=" + localConverted;

	//Gets the value to convert
	let valToConvert = parseFloat($(inputIDToConvert).val());


	$.ajax({
		url
	}).done(function(result){
		 let conversionRate = result["rates"][localConverted];
		 if(debugging)
		 {
			console.log("------------------------------------");
			console.log("Main base: " + baseCurrencySelected);
			console.log("Main converted: " + convertedCurrencySelected);
			console.log("Base is left: " + baseIsLeft);
			console.log("Conversion rate: " + conversionRate);
			console.log("Val to convert: " + valToConvert);
			console.log("Result: " + (conversionRate * valToConvert));
			console.log("Converting " + localBase + " to " + localConverted );
			console.log("------------------------------------");
		 }
		 $(inputIDToChange).val( (valToConvert * conversionRate).toFixed(2));
	});
}


$(document).ready(init);