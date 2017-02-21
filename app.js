'use strict';

var image_one = document.getElementById('image_one');
var image_two = document.getElementById('image_two');
var image_three = document.getElementById('image_three');
var blank_arr = [];
var global_clicked = 0;
var global_timesShown = 0;

function Picture (name, filepath, id_num) {
  this.name = name;
  this.filepath = filepath;
  this.id_num = id_num;
  this.timesClicked = 0;
  this.timesShown = 0;
}

var item_one = new Picture ('r2d2_bag','img/bag.jpg', 0);
var item_two = new Picture ('banana', 'img/banana.jpg', 1);
var item_three = new Picture ('bathroom', 'img/bathroom.jpg', 2);
var item_four = new Picture ('boots', 'img/boots.jpg', 3);
var item_five = new Picture ('breakfest', 'img/breakfast.jpg', 4);
var item_six = new Picture ('bubblegum', 'img/bubblegum.jpg', 5);
var item_seven = new Picture ('chair', 'img/chair.jpg', 6);
var item_eight = new Picture ('cthulhu', 'img/cthulhu.jpg', 7);
var item_nine = new Picture ('dog-duck', 'img/dog-duck.jpg', 8);
var item_ten = new Picture ('dragon', 'img/dragon.jpg', 9);
var item_eleven = new Picture ('pen', 'img/pen.jpg', 10);
var item_twelve = new Picture ('pet-sweep', 'img/pet-sweep.jpg', 11);
var item_thirteen = new Picture ('scissors', 'img/scissors.jpg', 12);
var item_fourteen = new Picture ('shark', 'img/shark.jpg', 13);
var item_fifteen = new Picture ('sweep', 'img/sweep.png', 14);
var item_sixteen = new Picture ('tauntaun.jpg', 'img/tauntaun.jpg', 15);
var item_seventeen = new Picture ('unicorn', 'img/unicorn.jpg', 16);
var item_eighteen = new Picture ('usb', 'img/usb.gif', 17);
var item_nineteen = new Picture ('water-can', 'img/water-can.jpg', 18);
var item_twenty = new Picture ('wine-glass', 'img/wine-glass.jpg', 19);

var object_arr = [item_one, item_two, item_three, item_four, item_five,
  item_six, item_seven, item_eight, item_nine, item_ten, item_eleven,
  item_twelve, item_thirteen, item_fourteen, item_fifteen, item_sixteen,
  item_seventeen, item_eighteen, item_nineteen, item_twenty];

var picture_arr = [image_one, image_two, image_three];

//makes a random object file path appear and returns the string
function getRandomPic(min, max) {
  var num = Math.floor(Math.random() * (max - min) + min);
  return object_arr[num].filepath;
}

//function that starts the game and to produce new pictures
function render () {
  var random_one = getRandomPic(0, 20);
  while (blank_arr.includes(random_one) === true){
    random_one = getRandomPic(0, 20);
  }
  image_one.src = random_one;
  blank_arr.push(random_one);
  var random_two = getRandomPic(0, 20);
  while (blank_arr.includes(random_two) === true){
    random_two = getRandomPic(0, 20);
  }
  image_two.src = random_two;
  blank_arr.push(random_two);
  var random_three = getRandomPic(0, 20);
  while (blank_arr.includes(random_three) === true) {
    random_three = getRandomPic(0, 20);
  }
  image_three.src = random_three;
  blank_arr.push(random_three);
  for (var i = 0; i < object_arr.length; i++) {
    if (object_arr[i].filepath === random_one || object_arr[i].filepath === random_two || object_arr[i].filepath === random_three) {
      object_arr[i].timesShown += 1;
      global_timesShown ++;
    }
  }
}
render();

//Makes the event listener for the items and how to handle the clicks
for (var i = 0; i < picture_arr.length; i++) {
  picture_arr[i].addEventListener('click', picturehandler);
}

function picturehandler (event) {
  if (global_clicked < 24) {
    var word = event.target.getAttribute('src');
    for (var i = 0; i < object_arr.length; i++) {
      if (object_arr[i].filepath === word) {
        object_arr[i].timesClicked += 1;
      }
    }
    if (blank_arr.length === 3) {
      render();
    } else if (blank_arr.length === 6) {
      blank_arr = blank_arr.slice(3,6);
      render();
    }
    global_clicked++;
  } else {
    alert('your done');
  }
}




//.includes('specialword');