
//Holds current values for the conversion. Default vals of AUD
//(Left)
let baseCurrencySelected = "AUD";
//(Right)
let convertedCurrencySelected = "AUD";

//leftChanged is a boolean if true then left side changed
let inputChanged = function(leftChanged) {
	console.log("changed on left: " + leftChanged);
	updateConversion(leftChanged, false);
	
}

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
	updateConversion(leftChanged, true);
}

//Called after document has completed rendering
function init()
{
	//TODO:
	//Add listener for currency selected change and have it update the variable above
	//Add listener for number input changing to have it call the conversion and auto update based on the
	//left selected currency and right selected currency
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
		for(var i = 0; i < keys.length; i++)
		{
			$('#currency_select_1').append('<option value="' + keys[i] + '"> ' + keys[i] + '</option>'); 
			$('#currency_select_2').append('<option value="' + keys[i] + '"> ' + keys[i] + '</option>'); 
		}
		$('#currency_select_1').val('AUD'); 
		$('#currency_select_2').val('AUD'); 
	});

	$("#currency_display_1").val("AUD");
	$("#currency_display_2").val("AUD");

}

//Called whenever the numbers typed are changed. Uses the base value as the one to stay the same.
function updateConversion(baseIsLeft, modifySameSide)
{

	let base = baseCurrencySelected;
	let converted = convertedCurrencySelected;
	let inputIDToChange = "#input_2"; //The ID of the input box to display the conversion
	let inputIDToConvert = "#input_1"; //The ID of the input box that the number to convert is pulled from
	//If the base currency is the right side
	if(!baseIsLeft)
	{
		base = convertedCurrencySelected;
		converted = baseCurrencySelected;
		inputIDToChange = "#input_1";
		inputIDToConvert = "#input_2";
	}

	//If you change the currency, convert the currency on that side to the currency of the other side
	if(modifySameSide)
	{
		inputIDToChange = inputIDToConvert;
	}

	//URL To convert from base to converted currency
	let url = "https://api.exchangeratesapi.io/latest?base=" + base + "&symbols=" + converted;

	let valToConvert = parseFloat($(inputIDToConvert).val());

	$.ajax({
		url
	}).done(function(result){
		let conversionRate = result["rates"][converted];
		$(inputIDToChange).val( (valToConvert * conversionRate).toFixed(2));
	});
}


$(document).ready(init);