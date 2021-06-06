'use strict';

var imgArray = [];
var totalClicks;
var imgBoxes = document.getElementById('boxes');

// Math function to randomize the images.
function randomizedImages() {
  return Math.floor(Math.random() * imgArray.length);
}

// This Contructor function will enable me to push all images through here
function NearbyRestaurants(foodType, fileType) {
  this.foodType = foodType;
  this.fileType = fileType;
  this.survey = 0;
  this.views = 0;
  imgArray.push(this);
}

NearbyRestaurants.images = [
  document.getElementById('firstBox'),
  document.getElementById('secondBox'),
  document.getElementById('thirdBox'),
];

NearbyRestaurants.resultsList = document.getElementById('resultsList');
totalClicks = 0;

NearbyRestaurants.justViewed = [];

new NearbyRestaurants('Mexican', 'img/mexican.jpg');
new NearbyRestaurants('Pizza', 'img/pizza.jpg');
new NearbyRestaurants('Dim Sum', 'img/dimsum.jpg');
new NearbyRestaurants('Korean BBQ', 'img/bbq.jpg');
new NearbyRestaurants('Breakfast Food', 'img/breakfast.jpg');
new NearbyRestaurants('Japanese Ramen', 'img/ramen.jpg');
new NearbyRestaurants('Sushi/Poke', 'img/sushi.jpg');
new NearbyRestaurants('Fastfood', 'img/burger.jpg');
new NearbyRestaurants('Chinese', 'img/chinese.jpg');
new NearbyRestaurants('Fried Chicken', 'img/friedchicken.jpg');
new NearbyRestaurants('Hotpot', 'img/hotpot.jpg');
new NearbyRestaurants('Italian', 'img/italian.jpg');
new NearbyRestaurants('Korean', 'img/korean.jpg');
new NearbyRestaurants('Teriyaki', 'img/teriyaki.jpg');
new NearbyRestaurants('Indian', 'img/indian.jpg');
new NearbyRestaurants('Seafood Boil', 'img/seafoodboil.jpg');
new NearbyRestaurants('Steak', 'img/steak.jpg');
new NearbyRestaurants('Thai', 'img/thai.jpg');
new NearbyRestaurants('Vietnamese', 'img/vietnamese.jpg');
new NearbyRestaurants('jjajangmyun', 'img/jjajangmyun.jpg');

//While function to ensure that no images are repeated.

// currentImage[0] indicates the first image.
function displayImage() {
  var currentImage = [];
  currentImage[0] = randomizedImages();
  while (NearbyRestaurants.justViewed.indexOf(currentImage[0]) !== -1) {
    currentImage[0] = randomizedImages();
  }

  // currentImage[1] indicates the second image.
  currentImage[1] = randomizedImages();
  while (
    currentImage[0] === currentImage[1] ||
    NearbyRestaurants.justViewed.indexOf(currentImage[1]) !== -1
  ) {
    currentImage[1] = randomizedImages();
  }

  // currentImage[3] indicates the third image.
  currentImage[2] = randomizedImages();
  while (
    currentImage[0] === currentImage[2] ||
    currentImage[1] === currentImage[2] ||
    NearbyRestaurants.justViewed.indexOf(currentImage[2]) !== -1
  ) {
    currentImage[2] = randomizedImages();
  }

  // Grabbing all images through the contructor function above.
  for (var i = 0; i < currentImage.length; i++) {
    NearbyRestaurants.images[i].src = imgArray[currentImage[i]].fileType;
    NearbyRestaurants.images[i].id = imgArray[currentImage[i]].foodType;
    //keeps track of how many times the image is viewed.
    imgArray[currentImage[i]].views += 1;
    NearbyRestaurants.justViewed[i] = currentImage[i];
  }
}

// All clicks by user tallied up.
function tallyUp() {
  for (var i = 0; i < imgArray.length; i++) {
    var resultsList = document.getElementById('resultsList');
    var liEl = document.createElement('li');
    liEl.textContent =
      imgArray[i].foodType +
      ' was chosen ' +
      imgArray[i].survey +
      ' times in ' +
      imgArray[i].views +
      ' views.';
    resultsList.appendChild(liEl);
  }
}

// Creating the chart that will show the result.
function chart() {
  var label = [];
  var data = [];
  for (var i = 0; i < imgArray.length; i++) {
    label[i] = imgArray[i].foodType;
    data[i] = imgArray[i].survey;
  }

  // color indications for each restaurants/foods.
  var colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'violet',
    'aliceblue',
    'aqua',
    'burlywood',
    'cadetblue',
    'chartreuse',
    'chocolate',
    'coral',
    'cornflowerblue',
    'cornsilk',
    'crimson',
    'cyan',
    'darkblue',
    'darkgoldenrod',
    'fuchsia',
  ];

  var ctx = document.getElementById('chart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label,
      datasets: [
        {
          label: 'show # of clicks!',
          data: data,
          backgroundColor: colors,
          borderWidth: 1,
          borderColor: 'blue',
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function mouseClicks(event) {
  // Enables the user to surpass 30 views. shows results after.
  if (totalClicks === 30) {
    imgBoxes.removeEventListener('click', mouseClicks);
    tallyUp();
    localStorage.clear();
    chart();
  }

  var imgArrayData = JSON.stringify(imgArray);
  localStorage.setItem('imgArray', imgArrayData);
  var clickTotal = JSON.stringify(totalClicks);
  localStorage.setItem('clicks', clickTotal);

  // If the user clicks on the section(the border around the images), it will give you a message.
  if (event.target.id === 'boxes') {
    return alert('Please click on the image properly!');
  }
  // Adds up the number of mouse clicks.
  totalClicks += 1;

  for (var i = 0; i < imgArray.length; i++) {
    if (event.target.id === imgArray[i].foodType) {
      imgArray[i].survey += 1;
    }
  }
  displayImage();
}

imgBoxes.addEventListener('click', mouseClicks);
displayImage();
