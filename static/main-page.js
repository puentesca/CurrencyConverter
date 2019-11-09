//leftChanged is a boolean if true then left side changed
let inputChanged = function(leftChanged) {
	console.log("changed on left: " + leftChanged);
}

let currencyChanged = function(leftChanged) {

}

$("#input_1").on('input', function()
{
	console.log("changed on left: " + true);
});
$("#input_2").on('input', function()
{
	console.log("changed on left: " + false);
});
console.log("'main.page.js' successfully loaded.")