
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
const buy = document.querySelector(".buy");
const start_stop = document.querySelector(".start-stop");//play\buy button

const coffee_info = document.querySelector(".coffee_info");
const coffee_info_money = document.querySelector(".coffee_info_money");

const accept_buy_button = document.querySelector(".accept_buy_button");//accept buy
const close_button = document.querySelectorAll(".close_button");

const water_error = document.querySelector(".water_error");
const beans_error = document.querySelector(".beans_error");

const service_button = document.querySelector(".service_button");

service_button.onclick = function () {
   water = 1000;
   beans = 100;
   calc_clean = 2;
   water_error.style.backgroundColor = "rgb(78, 10, 10)";
   beans_error.style.backgroundColor = "rgb(78, 10, 10)";
   box_blue[0].querySelector(".box_square").style.backgroundColor = "rgb(23, 9, 211)";
   box_blue[1].querySelector(".box_square").style.backgroundColor = "rgb(23, 9, 211)";
   service.classList.toggle("hide");
   box_container.classList.toggle("hide");
}

//close_button.onclick
for (let i = 0; i < close_button.length; i++) {
   close_button[i].onclick = function () {
      while (true) {
         if (!service.classList.contains("hide")) {
            service.classList.toggle("hide");
            box_container.classList.toggle("hide");
            break;
         }
         if (!close_button[i].classList.contains("hide")) {
            buy.classList.toggle("hide");
            box_container.classList.toggle("hide");
            break;
         }
      }
   }
}

//accept_buy_button.onclick
accept_buy_button.onclick = function () {
   while (true) {
      console.log(water);
      console.log(beans);
      console.log(calc_clean);
      if (water < 500 || beans < 50 || calc_clean < 1) {
         if (water < 500) {
            box_blue[0].querySelector(".box_square").style.backgroundColor = "rgba(230, 149, 0, 1)";
            water_error.style.backgroundColor = "rgba(230, 149, 0, 1)";
         }
         if (calc_clean < 1) {
            box_blue[1].querySelector(".box_square").style.backgroundColor = "rgba(230, 149, 0, 1)";

         }
         if (beans < 50) {
            beans_error.style.backgroundColor = "rgba(230, 149, 0, 1)";
         }
         break;
      }
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
//on\off buy.onclick
start_stop.onclick = function () {
   if (espresso == 0 || coffee == 0 || steam == 0 || hot_water == 0) {
      coffee_info.innerHTML = "";
      coffee_info_money.innerHTML = "0" + " рублей";
   }
   if (espresso == 1) {
      coffee_info.innerHTML = "Espresso X1";
      coffee_info_money.innerHTML = espresso_cost + "₽";
   }
   if (espresso == 2) {
      coffee_info.innerHTML = "Espresso X2";
      coffee_info_money.innerHTML = espresso_cost * 2 + "₽";
   }
   if (coffee == 1) {
      coffee_info.innerHTML = "Coffee X1";
      coffee_info_money.innerHTML = coffee_cost + "₽";
   }
   if (coffee == 2) {
      coffee_info.innerHTML = "Coffee X2";
      coffee_info_money.innerHTML = coffee_cost * 2 + "₽";
   }
   if (steam == 1) {
      coffee_info.innerHTML = "Steam";
      coffee_info_money.innerHTML = steam_cost + "₽";
   }
   if (hot_water == 1) {
      coffee_info.innerHTML = "Hot Water";
      coffee_info_money.innerHTML = hot_water_cost + "₽";
   }
   buy.classList.toggle("hide");
   box_container.classList.toggle("hide");
}



let box1 = document.querySelectorAll(".box1");//steam , hot water
let box2 = document.querySelectorAll(".box2");//espresso, coffee
let box3 = document.querySelectorAll(".box3");//coffee strength, water capacity
let box_blue = document.querySelectorAll(".box_blue");//blue buttons

const service = document.querySelector(".service");

let espresso = 0;
let coffee = 0;
let steam = 0;
let hot_water = 0;
let current_icon = [];

for (let i = 0; i < box1.length; i++) {
   let counter = 0;
   box1[i].onclick = function () {
      while (true) {
         if (counter == 0) {
            box1[i].querySelector(".box_square").style.backgroundColor = "rgb(228, 4, 4)";
            current_icon[0] = box1[i].querySelector(".box_square");
            if (box1[i].querySelector("img").id == "steam") steam = 1;
            if (box1[i].querySelector("img").id == "hot_water") hot_water = 1;
            counter++;
            break;
         }
         if (counter == 1) {
            box1[i].querySelector(".box_square").style.backgroundColor = "rgb(78, 10, 10)";
            current_icon.shift();
            if (box1[i].querySelector("img").id == "steam") steam = 0;
            if (box1[i].querySelector("img").id == "hot_water") hot_water = 0;
            counter = 0;
            break;
         }
      }
   }
}
for (let i = 0; i < box2.length; i++) {
   let counter = 0;
   box2[i].onclick = function () {
      while (true) {
         if (counter == 0) {
            box2[i].querySelectorAll(".box_square")[0].style.backgroundColor = "rgb(228, 4, 4)";
            current_icon[0] = box2[i].querySelectorAll(".box_square")[0];
            box2[i].querySelectorAll(".box_square")[1].style.backgroundColor = "rgb(78, 10, 10)";
            counter++;
            if (box2[i].querySelector("h3").innerHTML == "espresso") {
               espresso = counter;
            }
            if (box2[i].querySelector("h3").innerHTML == "coffee") {
               coffee = counter;
            }
            break;
         }
         if (counter == 1) {
            box2[i].querySelectorAll(".box_square")[1].style.backgroundColor = "rgb(228, 4, 4)";
            current_icon[0] = box2[i].querySelectorAll(".box_square")[1];
            box2[i].querySelectorAll(".box_square")[0].style.backgroundColor = "rgb(78, 10, 10)";
            counter++;
            if (box2[i].querySelector("h3").innerHTML == "espresso") {
               espresso = counter;
            }
            if (box2[i].querySelector("h3").innerHTML == "coffee") {
               coffee = counter;
            }
            break;
         }
         if (counter == 2) {
            box2[i].querySelectorAll(".box_square")[0].style.backgroundColor = "rgb(78, 10, 10)";
            box2[i].querySelectorAll(".box_square")[1].style.backgroundColor = "rgb(78, 10, 10)";
            current_icon.shift();
            counter = 0;
            if (box2[i].querySelector("h3").innerHTML == "espresso") {
               espresso = counter;
            }
            if (box2[i].querySelector("h3").innerHTML == "coffee") {
               coffee = counter;
            }
            break;
         }
      }
      if (i == 0) {
         box2[1].querySelectorAll(".box_square")[0].style.backgroundColor = "rgb(78, 10, 10)";
         box2[1].querySelectorAll(".box_square")[1].style.backgroundColor = "rgb(78, 10, 10)";
      }
      if (i == 1) {
         box2[0].querySelectorAll(".box_square")[0].style.backgroundColor = "rgb(78, 10, 10)";
         box2[0].querySelectorAll(".box_square")[1].style.backgroundColor = "rgb(78, 10, 10)";
      }
   }
}
for (let i = 0; i < box3.length; i++) {
   let counter = 0;
   box3[i].onclick = function () {
      while (true) {
         if (counter == 0) {
            box3[i].querySelectorAll(".box_square")[2].style.backgroundColor = "rgb(228, 4, 4)";
            current_icon.push(box3[i].querySelectorAll(".box_square")[2]);
            counter++;
            break;
         }
         if (counter == 1) {
            box3[i].querySelectorAll(".box_square")[1].style.backgroundColor = "rgb(228, 4, 4)";
            current_icon.push(box3[i].querySelectorAll(".box_square")[1]);
            counter++;
            break;
         }
         if (counter == 2) {
            box3[i].querySelectorAll(".box_square")[0].style.backgroundColor = "rgb(228, 4, 4)";
            current_icon.push(box3[i].querySelectorAll(".box_square")[0]);
            counter++;
            break;
         }
         if (counter == 3) {
            box3[i].querySelectorAll(".box_square")[0].style.backgroundColor = "rgb(78, 10, 10)";
            box3[i].querySelectorAll(".box_square")[1].style.backgroundColor = "rgb(78, 10, 10)";
            box3[i].querySelectorAll(".box_square")[2].style.backgroundColor = "rgb(78, 10, 10)";
            current_icon.pop();
            current_icon.pop();
            current_icon.pop();
            counter = 0;
            break;
         }
      }
   }
}
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