
//Holds current values for the conversion. Default vals of AUD
let leftCurrencySelected = "AUD";
let rightCurrencySelected = "AUD";

//leftChanged is a boolean if true then left side changed
let inputChanged = function(leftChanged) {
	console.log("changed on left: " + leftChanged);
}

let currencyChanged = function(leftChanged) {

}

//Called after document has completed rendering
function init()
{
	//TODO:
	//Add listener for currency selected change and have it update the variable above
	//Add listener for number input changing to have it call the conversion and auto update based on the
	//left selected currency and right selected currency
	$("#input_1").on('input', function()
	{
		console.log("changed on left: " + true);
	});
	$("#input_2").on('input', function()
	{
		console.log("changed on left: " + false);
	});
	console.log("'main.page.js' successfully loaded.");

	initCurrencies();
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
	});
}




$(document).ready(init);