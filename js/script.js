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
	this.multiplier = 0;
	this.strong = 0;
	this.size = 0;


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

	this.ENUMS = {
		error: {
			WATER: 1,
			BEANS: 2,
			CALC_CLEAN: 4,
		},
		size: {
			SMALL: 0.2,
			MEDIUM: 1,
			BIG: 2,
		},
		strong: {
			LIGHT: 0.5,
			MEDIUM: 1,
			STRONG: 2,
		},
	}

	this.storageCheck = function () {
		let condition = 0;
		if (this.coffee.water > this.water) condition |= this.ENUMS.error.WATER;
		if (this.coffee.beans > this.beans) condition |= this.ENUMS.error.BEANS;
		if (this.coffee.calc_clean > this.calc_clean) condition |= this.ENUMS.error.CALC_CLEAN;
		return condition;
	};

	function setWarningBG(indicator) {
		indicator.style.backgroundColor = COLORS.WARNING_YELLOW;
	}

	function setConditionIndicator() {
		let condition = this.storageCheck();
		if (condition & this.ENUMS.error.WATER !== 0) setWarningBG(this.water_error);
		if (condition & this.ENUMS.error.BEANS !== 0) setWarningBG(this.beans_error);
		if (condition & this.ENUMS.error.CALC_CLEAN !== 0) setWarningBG(box_blue[1].querySelector(".box_square"));
	};
	setConditionIndicator = setConditionIndicator.bind(this);

	this.buy = function () {
		setConditionIndicator();
		this.water -= this.coffee.water * this.counter * this.multiplier;
		this.beans -= this.coffee.beans * this.counter * this.multiplier;
		this.calc_clean -= this.coffee.calc_clean;
		this.balance += this.coffee.price * this.counter * this.multiplier;

		buy.classList.toggle("hide");
		box_container.classList.toggle("hide");
	}
	this.buy = this.buy.bind(this);

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
		this.buttons.aqua_clean.style.backgroundColor = COLORS.ACTIVE_BLUE;
		this.buttons.calc_clean.style.backgroundColor = COLORS.ACTIVE_BLUE;
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

class Button {
	constructor(body) {
		this.body = body;
		this.indicators = body.querySelectorAll(".box_square");
		this.counter = 0;
		this.onClick = null;
	}

	clearIndicators() {
		for (let indicator of this.indicators) { indicator.style.backgroundColor = COLORS.PASSIVE_RED; }
	}

	set onClick(func) {
		this.body.addEventListener("click", func);
	}

}

for (const box of boxes) {
	MACHINE.buttons[box.id] = new Button(box);
}

service_button.onclick = MACHINE.service;
start_stop.onclick = MACHINE.showBuy;
accept_buy_button.onclick = MACHINE.buy;

(function () {

	MACHINE.buttons.espresso.onClick = function () {
		MACHINE.buttons.coffee.clearIndicators();
		MACHINE.buttons.coffee.counter = 0;
	};

	MACHINE.buttons.coffee.onClick = function () {
		MACHINE.buttons.espresso.clearIndicators();
		MACHINE.buttons.espresso.counter = 0;
	};



})();


(function () {

	for (const _button in MACHINE.buttons) {
		MACHINE.buttons[_button].onClick = function () {
			const btn = MACHINE.buttons[_button];
			if (btn.counter === btn.indicators.length) {
				btn.counter = 0;
				btn.clearIndicators();
				return;
			}
			btn.indicators[btn.counter].style.backgroundColor = COLORS.ACTIVE_RED;
			btn.counter++;
			MACHINE.selected = btn;
		};
	}
})();

//close_button.onclick
for (let i = 0; i < close_button.length; i++) {
	close_button[i].onclick = function () {
		close_button[i].parentElement.classList.toggle("hide");
		box_container.classList.toggle("hide");
	}
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

function processing() {

	function setflashColor(color) {
		flash_color.style.setProperty("--sq-color", color);
	}

	function blinks(amount, intervals) {
		for (let i = 0; i < amount; i++) {
			setTimeout(() => {
				console.log("blink")
			}, intervals += 1000);
			setTimeout(() => {
				console.log("blank")
			}, intervals += 1000);
		}
		setTimeout(() => { longBlink(1000) }, intervals);
	}

	function longBlink(duration) {
		setTimeout(() => {
			console.log("long blink")
			setTimeout(() => { console.log("blank") }, duration);
		}, duration * 3);
	}

	let flash_color = document.querySelector(".flash");

	blinks(3, 1000);
}
