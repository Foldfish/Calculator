const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const dot = document.querySelector('#dot');
const display = document.querySelector('#lower');
const displayUp = document.querySelector('#upper');
const clearAll = document.querySelectorAll('.clear');
const controls = document.querySelectorAll('#controls');

display.textContent = "0";
displayUp.textContent = "";

let arr = [];
let arrOPs = [];
let num1, num2, operator;
let index = 0;
let OpFlag = false;
let DotFlag = false;
var btnid;

digits.forEach(button =>{
	button.addEventListener('click', () => {
		arr.push(button.value);
		displayUp.textContent = arr.join("");
		OpFlag = false;
		disable(OpFlag);

		if(button.value == "."){
			DotFlag = true;
			btnid = button;
			button.disabled = true;
		}else if((index != 0)&&(DotFlag == true)){
			btnid.disabled = false;
		}


	});
});

operators.forEach(button =>{
	arrOPs.push(button);
	button.addEventListener('click', function() {
		arr.push(button.value);
		displayUp.textContent = arr.join("");

		if(button.value != "="){

			operator = button.value;
			index = arr.length - 1;
			OpFlag = true;
			disable(OpFlag);

		}else{
			num2 = parseFloat(arr.slice(index + 1, arr.length - 1).join(''));
			num1 = parseFloat(arr.slice(0, index + 1).join(''));
			display.textContent = operation(num1, num2, operator) * 100 / 100;
			OpFlag = false;
			disable(OpFlag);
		}

	});
});

clearAll.forEach(button =>{
	button.addEventListener('click', function(){
		if(button.value == "clearAll"){
			num1 = 0;
			num2 = 0;
			arr = [];
			operator = '';
			display.textContent = '';
			displayUp.textContent = '';
		}else if(button.value == 'clear'){
			arr = arr.slice(0, arr.length - 1);
			displayUp.textContent = arr.join("");;
			if(arr[index] != 0){
				//enable operator buttons in case we erasse operator
				OpFlag = false;
				disable(OpFlag);				
			}
		}
	});
});

function disable(flag){
	for(var i = 0; i < arrOPs.length; i++){
		arrOPs[i].disabled = flag;
	}
}

const operation = (num1, num2, operator) => {
	switch(operator){
		case "+":
		return addition(num1, num2);
		break;
		case "-":
		return substraction(num1, num2);
		break;
		case "/":
		return division(num1, num2);
		break;
		case "x":
		return multiplication(num1, num2);
		break;
		default: "ERROR";
	}
}

const addition = (num1, num2) =>{
	return num1 + num2;
}
const substraction = (num1, num2) =>{
	return num1 - num2;
}
const multiplication = (num1, num2) =>{
	return num1 * num2;
}
const division = (num1, num2) =>{
	if(num2 === 0){
		return "ERROR";
	}else{
		return num1 / num2;
	}
}

