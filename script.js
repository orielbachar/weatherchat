$(document).ready(function(){
  updateDisplay(weather);
});

var fetch = function(){
var _url = 'http://api.openweathermap.org/data/2.5/weather?q=' + $('#userCity').val() +'&APPID=e59a0a6c13ebfb8326319befa05dff6e&units=metric';
  $.ajax({
  method: "GET",
  url: _url,
  dataType: "json",
  success: function(data){
    console.log(data);
    displayWeather(data);
  },
  error: function(textStatus) {
    console.log(textStatus);
  }
});
};

var STORAGE_ID = 'weather-city';

var getFromLocalStorage = function () {
  return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
}

var saveToLocalStorage = function(){
  localStorage.setItem(STORAGE_ID, JSON.stringify(weather));
}

//////////////////////Functions//////////////////////////
var weather = getFromLocalStorage();

function displayWeather(data){
var newCity = {
  city: data.name,
  temp: data.main.temp
};

saveToLocalStorage();
updateDisplay(newCity);
};

var updateDisplay = function(newCity){
var source = $("#entry-template").html();
var template = Handlebars.compile(source);
var newHTML = template(newCity);
$('citydiv').empty();
$('#citydiv').append(newHTML);
};

var commentbtn = function(){
  var _comment = $('#userComment').val() + '<br>';
  $('.commenthere').append(_comment);
}

//////////////////////BUTTONS//////////////////////////
$('#citybtn').on('click', function(){
  fetch();
});


$('body').on('click', '#citybtn2', function(){
  commentbtn();
});

$('body').on('click', '#delete', function(){
  $(this).closest(".panel-default").remove();
});
