'use strict';

var image_one = document.getElementById('image_one');
var image_two = document.getElementById('image_two');
var image_three = document.getElementById('image_three');
var blank_arr = [];
var global_clicked = 0;




if (localStorage.length === 0) {
  function Picture (name, filepath) {
    this.name = name;
    this.filepath = filepath;
    this.timesClicked = 0;
    this.timesShown = 0;
  }

  var item_one = new Picture ('r2d2_bag','img/bag.jpg');
  var item_two = new Picture ('banana', 'img/banana.jpg');
  var item_three = new Picture ('bathroom', 'img/bathroom.jpg');
  var item_four = new Picture ('boots', 'img/boots.jpg');
  var item_five = new Picture ('breakfest', 'img/breakfast.jpg');
  var item_six = new Picture ('bubblegum', 'img/bubblegum.jpg');
  var item_seven = new Picture ('chair', 'img/chair.jpg');
  var item_eight = new Picture ('cthulhu', 'img/cthulhu.jpg');
  var item_nine = new Picture ('dog-duck', 'img/dog-duck.jpg');
  var item_ten = new Picture ('dragon', 'img/dragon.jpg');
  var item_eleven = new Picture ('pen', 'img/pen.jpg');
  var item_twelve = new Picture ('pet-sweep', 'img/pet-sweep.jpg');
  var item_thirteen = new Picture ('scissors', 'img/scissors.jpg');
  var item_fourteen = new Picture ('shark', 'img/shark.jpg');
  var item_fifteen = new Picture ('sweep', 'img/sweep.png');
  var item_sixteen = new Picture ('tauntaun', 'img/tauntaun.jpg');
  var item_seventeen = new Picture ('unicorn', 'img/unicorn.jpg');
  var item_eighteen = new Picture ('usb', 'img/usb.jpg');
  var item_nineteen = new Picture ('water-can', 'img/water-can.jpg');
  var item_twenty = new Picture ('wine-glass', 'img/wine-glass.jpg');

  var object_arr = [item_one, item_two, item_three, item_four, item_five,
    item_six, item_seven, item_eight, item_nine, item_ten, item_eleven,
    item_twelve, item_thirteen, item_fourteen, item_fifteen, item_sixteen,
    item_seventeen, item_eighteen, item_nineteen, item_twenty];
} else {
  var stored_objects = localStorage.getItem('stored_objects');
  stored_objects = JSON.parse(stored_objects);
  object_arr = stored_objects;
}




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

  //adds up the number of times an image is shown
  for (var i = 0; i < object_arr.length; i++) {
    if (object_arr[i].filepath === random_one || object_arr[i].filepath === random_two || object_arr[i].filepath === random_three) {
      object_arr[i].timesShown += 1;
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
    var bye_message = document.getElementById('heading');
    bye_message.textContent = 'Thanks For Taking The Survey';
    var container = document.getElementById('container-two');
    container.textContent = '';
    container.style.backgroundColor = 'white';
    var chart = document.createElement('canvas');
    chart.setAttribute('id', 'myChart');
    container.appendChild(chart);
    for (var j = 0; j < object_arr.length; j++) {
      var percentage = (object_arr[j].timesClicked / object_arr[j].timesShown) * 100;
      object_arr[j].percent = Math.floor(percentage);
    }
    store();
    renderChart();
  }
}

// Building the chart
function renderChart() {
  var sorted_arr = [];
  for (var i = 0; i < object_arr.length; i++) {
    sorted_arr.push([object_arr[i].name, object_arr[i].timesClicked]);
    console.log(object_arr[i].name);
    sorted_arr.sort(function(a, b) {
      return b[1] - a[1];
    });
  };

  sorted_arr = sorted_arr.slice(0,8);
  //makes array for chart labels
  var item_name_arr = sorted_arr.map(function(item) {
    return item[0] ;
  });

  // makes array for chart labels height of bar
  var data_arr = sorted_arr.map(function(item) {
    return item[1] ;
  });

// makes a array of color codes
  var color_arr = ['#FC4A1A', '#F7B733', '#4ABDAC', '#FC4A1A', '#F7B733', '#4ABDAC',
    '#FC4A1A', '#F7B733'];

  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: item_name_arr,
      datasets: [{
        label: 'Number of Clicks',
        data: data_arr,
        backgroundColor: color_arr
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

//local storage functions

function store () {
  var stored_objects = JSON.stringify(object_arr);
  localStorage.setItem('stored_objects', stored_objects);
}