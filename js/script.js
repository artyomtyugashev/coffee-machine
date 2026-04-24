"use strict";

//const money;
const espresso_cost = 60;
const coffee_cost = 120;
const steam_cost = 5;
const hot_water_cost = 10;
let total = 0;

let water = 1000;
let beans = 100;
let calc_clean = 2;

let button = document.querySelector(".button");//on-off button

const box_container = document.querySelector(".box-container");
const boxes = document.querySelectorAll(".box");
const buy = document.querySelector(".buy");
const start_stop = document.querySelector(".start-stop");//play\buy button

const coffee_info = document.querySelector(".coffee_info");
const coffee_info_money = document.querySelector(".coffee_info_money");

const accept_buy_button = document.querySelector(".accept_buy_button");//accept buy
const close_button = document.querySelectorAll(".close_button");

const water_error = document.querySelector(".water_error");
const beans_error = document.querySelector(".beans_error");

const service_button = document.querySelector(".service_button");


//box_n - where n is number of square indicators.
let box1 = document.querySelectorAll(".box1");//steam , hot water
let box2 = document.querySelectorAll(".box2");//espresso, coffee
let box3 = document.querySelectorAll(".box3");//coffee strength, water capacity
let box_blue = document.querySelectorAll(".box_blue");//blue buttons

const service = document.querySelector(".service");


const COLORS = {
	ACTIVE_RED: "rgb(228, 4, 4)",
	PASSIVE_RED: "rgb(78, 10, 10)",
	ACTIVE_BLUE: "rgb(23, 9, 211)",
	WARNING_YELLOW: "rgba(230, 149, 0, 1)",
};


const MACHINE = new function () {
	this.water = 1000;
	this.beans = 100;
	this.calc_clean = 2;

	this.balance = 0;

	this.water_error = water_error;
	this.beans_error = beans_error;

	this.selected = null;
	this.coffee = null;
	this.counter = 0;


	this.showCoffee = function () {
		console.log(this.coffee);
	}

	this.buttons = {
		espresso: {},
		coffee: {},
		strong: {},
		size: {},
		hot_water: {},
		steam: {},
		aqua_clean: {},
		calc_clean: {},
	};

	this.menu = {
		espresso: new Coffee(200, 20, 60, 1, "Espresso"),
		coffee: new Coffee(250, 25, 120, 1, "Coffee"),
		steam: new Coffee(10, 0, 5, 0, "Steam"),
		hot_water: new Coffee(200, 0, 10, 1, "Hot water"),
	};

	this.status = { //TODO: rename status -> machine_error_status
		WATER: 1,
		BEANS: 2,
		CALC_CLEAN: 4,
	};

	this.multiplier = {
		SMALL: 0.2,
		MEDIUM: 1,
		BIG: 2,
	};

	this.storageCheck = function () {
		let condition = 0;
		if (this.coffee.water > this.water) condition |= this.status.WATER;
		if (this.coffee.beans > this.beans) condition |= this.status.BEANS;
		if (this.coffee.calc_clean > this.calc_clean) condition |= this.status.CALC_CLEAN;
		return condition;
	};

	function setWarningBG(indicator) {
		indicator.style.backgroundColor = COLORS.WARNING_YELLOW;
	}

	function setConditionIndicator() {
		let condition = this.storageCheck();
		if (condition & this.status.WATER !== 0) setWarningBG(this.water_error);
		if (condition & this.status.BEANS !== 0) setWarningBG(this.beans_error);
		if (condition & this.status.CALC_CLEAN !== 0) setWarningBG(box_blue[1].querySelector(".box_square"));
	};

	this.buy = function () {
		setConditionIndicator();
		this.water -= this.coffee.water * amount; //* this.multiplier;
		this.beans -= this.coffee.beans * amount;// * this.multiplier;
		this.calc_clean -= this.coffee.calc_clean;
		this.balance += this.coffee.price * amount;//* this.multiplier;

	}

	this.showBuy = function () {
		if (this.counter > 0 && this.coffee !== undefined) {
			coffee_info.innerHTML = this.coffee.name + ' x' + this.counter;
			coffee_info_money.innerHTML = this.coffee.price * this.counter + "₽";
			buy.classList.toggle("hide");
			box_container.classList.toggle("hide");
		}
	};
	this.showBuy = this.showBuy.bind(this);

	this.service = function () {
		this.water = 1000;
		this.beans = 100;
		this.calc_clean = 2;
		this.water_error.style.backgroundColor = COLORS.PASSIVE_RED;
		this.beans_error.style.backgroundColor = COLORS.PASSIVE_RED;
		box_blue[0].querySelector(".box_square").style.backgroundColor = COLORS.ACTIVE_BLUE;
		box_blue[1].querySelector(".box_square").style.backgroundColor = COLORS.ACTIVE_BLUE;
		service.classList.toggle("hide");
		box_container.classList.toggle("hide");
	}
	this.service = this.service.bind(this);
};

function Coffee(water, beans, price, calc_clean, name) {
	this.water1 = water;
	this.beans1 = beans;
	this.price = price;
	this.calc_clean1 = calc_clean;
	this.name = name;
}

for (const box of boxes) MACHINE.buttons[box.id] = box;

service_button.onclick = MACHINE.service;
start_stop.onclick = MACHINE.showBuy;

(function () {

	function clearSquares(selected) {
		for (let square of selected.querySelectorAll(".box_square")) {
			square.style.backgroundColor = COLORS.PASSIVE_RED;
		}
	}

	for (const _button in MACHINE.buttons) {
		MACHINE.buttons[_button].addEventListener("click", function () {
			let squares = this.querySelectorAll(".box_square");
			let isNewButton = MACHINE.selected !== this;
			let counter = 0;

			if (isNewButton) {
				if (MACHINE.selected !== null) {
					clearSquares(MACHINE.selected);
					MACHINE.counter = 0;
				}
				MACHINE.selected = this;
				MACHINE.coffee = MACHINE.menu[this.id];
			} else if (MACHINE.counter === squares.length) {
				clearSquares(MACHINE.selected);
				MACHINE.counter = 0;
				return;
			}

			if (squares.length === 2) counter = MACHINE.counter;
			else counter = squares.length - MACHINE.counter - 1;

			//console.log(MACHINE.counter, 'counter is', counter, isNewButton ? 'new' : 'this');
			squares[counter].style.backgroundColor = COLORS.ACTIVE_RED;
			MACHINE.counter++;
		});
	}
})();

//close_button.onclick
for (let i = 0; i < close_button.length; i++) {
	close_button[i].onclick = function () {
		close_button[i].parentElement.classList.toggle("hide");
		box_container.classList.toggle("hide");
	}
}

//accept_buy_button.onclick
accept_buy_button.onclick = function () {
	while (true) {
		break;
		console.log(water);
		console.log(beans);
		console.log(calc_clean);
		if (espresso == 1) {
			total += espresso_cost;
			water -= 200;
			beans -= 20;
			calc_clean--;
			processing();
			zeroing();
			break;
		}
		if (espresso == 2) {
			total += espresso_cost * 2;
			water -= 400;
			beans -= 40;
			calc_clean--;
			processing();
			zeroing();
			break;
		}
		if (coffee == 1) {
			total += coffee_cost;
			water -= 250;
			beans -= 25;
			calc_clean--;
			processing();
			zeroing();
			break;
		}
		if (coffee == 2) {
			total += coffee_cost * 2;
			water -= 500;
			beans -= 50;
			calc_clean--;
			processing();
			zeroing();
			break;
		}
		if (steam == 1) {
			total += steam_cost;
			water -= 10;
			processing();
			zeroing();
			break;
		}
		if (hot_water == 1) {
			total += hot_water_cost;
			water -= 200;
			calc_clean--;
			processing();
			zeroing();
			break;
		}
	}
	buy.classList.toggle("hide");
	box_container.classList.toggle("hide");
}



//on\off button.onclick
button.onclick = function () {
	start_stop.disabled = false;
	box_container.classList.toggle("hide");
	document.querySelector(".timer_default").classList.toggle("hide");
	if (box_container.classList.contains("hide")) start_stop.disabled = true;
	if (buy.classList.contains("hide") == false) {
		buy.classList.add("hide");
		box_container.classList.add("hide");
		start_stop.disabled = true;
	}
}



let espresso = 0;
let coffee = 0;
let steam = 0;
let hot_water = 0;
let current_icon = [];

for (let i = 0; i < box_blue.length; i++) {
	box_blue[i].onclick = function () {
		while (true) {
			if (water < 500 || beans < 50 || calc_clean < 1) {
				service.classList.toggle("hide");
				box_container.classList.toggle("hide");
				break;
			}
			else {
				break;
			}
		}
	}
}

function zeroing() {
	const box = document.querySelectorAll(".box .box_square");
	for (let i = 0; i < box.length; i++) {
		if (!box[i].classList.contains("square-blue") && !box[i].classList.contains("mysquare")) {
			box[i].style.backgroundColor = "rgb(78, 10, 10)";
		}
		else if (!box[i].classList.contains("mysquare")) {
			box[i].style.backgroundColor = "rgb(23, 9, 211)";
		}
	}
}
function processing() {
	let flash_color = document.querySelector(".flash");
	const color_before = "rgb(78, 10, 10)";
	const color_after = "rgb(228, 4, 4)";

	flash_color.style.setProperty("--sq-color", color_before);
	before_color(color_before);
	setTimeout(() => {
		flash_color.style.setProperty("--sq-color", color_after);
		after_color(color_after);
		setTimeout(() => {
			flash_color.style.setProperty("--sq-color", color_before);
			before_color(color_before);
			setTimeout(() => {
				flash_color.style.setProperty("--sq-color", color_after);
				after_color(color_after);
				setTimeout(() => {
					flash_color.style.setProperty("--sq-color", color_before);
					before_color(color_before);
					setTimeout(() => {
						flash_color.style.setProperty("--sq-color", color_after);
						after_color(color_after);
						setTimeout(() => {
							flash_color.style.setProperty("--sq-color", color_before);
							before_color(color_before);
							setTimeout(() => {
								flash_color.style.setProperty("--sq-color", color_after);
								after_color(color_after);
								setTimeout(() => {
									flash_color.style.setProperty("--sq-color", color_before);
									before_color(color_before);
									after_color(color_after);
								}, 3000);
							}, 1000);
						}, 1000);
					}, 1000);
				}, 1000);
			}, 1000);
		}, 1000);
	}, 1);
}
function before_color(color_before) {
	for (let i = 0; i < current_icon.length; i++) {
		current_icon[i].style.backgroundColor = color_before;
	}
}
function after_color(color_after) {
	for (let i = 0; i < current_icon.length; i++) {
		current_icon[i].style.backgroundColor = color_after;
	}
}