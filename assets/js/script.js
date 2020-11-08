var searchButton = document.querySelector("#search-button")
var inputValue = document.querySelector("#input-value")
var currentTime = (moment().format('MM/DD/YYYY'));
var weather = document.querySelector("#icon-field")
var city = document.querySelector("#city-search-term")
var temperature = document.querySelector("#temp-field")
var humidity = document.querySelector("#humidity-field")
var windSpeed = document.querySelector("#wind-field")
var uvIndex = document.querySelector("#uv-field")
var date = document.querySelector("#date-field")
var apiKey = '78abac7397dbff0934df4ef82fc5fd58'


document.getElementById("search-button").addEventListener("click", e=>{
    e.preventDefault()

    /* var inputField = document.querySelector("#input-value");
        inputField.innerHTML = ""; // why isn't this working??????????? */

   fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" + inputValue.value + "&units=imperial&appid=" + apiKey
    )
    .then(function(response) {
        return response.json()
    })
    .then(function(data, response) {
        // var cityIcon = (document.appendChild(`<h2> ${data.name} (${currentTime}) <img src="https://openweathermap.org/img/w/${response.weather[0].icon}.png></h2>`))
        $('#icon-field').html(`<h2>(${currentTime}) <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"></h2>`);
        var cityName = (data.name)
        var cityTemp = (data.main.temp)
        var cityHumidity = (data.main.humidity)
        var cityWindSpeed = (data.wind.speed)
        var weatherMain = (data.weather[0].main)
        city.innerHTML = cityName;
        temperature.innerHTML = cityTemp;
        humidity.innerHTML = cityHumidity;
        windSpeed.innerHTML = cityWindSpeed;
        weather.innerHTML = weatherMain;
        console.log(data);
    });


//retrieving geolocation
function cityUV(lon, lat) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`,
        method: "GET"
    })
        .then(function (response1) {

            $(".uvIndex").html("UV Index: " + `<span class=" badge badge-danger">${(response1.value)}</span>`);
        });
}


let geocoder;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
//Get the latitude and the longitude;
function successFunction(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    console.log(lat, lng)

    //run AJAX call
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${apiKey}`,
        method: "GET"
    })

        //store all retrieved data inside of an object called "response"
        .then(function (response) {
            updateLocation(response);
        });
    cityUV(lng, lat);
};

function updateLocation(response) {
    $('.image-generation').html(`<h2>(${currentTime}) <img src="https://openweathermap.org/img/w/${response.weather[0].icon}.png"></h2>`);
}


function errorFunction() {
    alert("Geocoder failed");
}

    /* if (weatherMain = "clouds") {
        document.getElementById("icon-field").className = " fas fa-cloud";
        //console.log("clouds");
    } else if (weatherMain = "clear") {
        document.getElementById("icon-field").className = " fas fa-sun";
        console.log("clear");
    } else if (weatherMain = "rain") {
        document.getElementById("icon-field").className = " fas fa-cloud-shower-heavy";

    } */
    
});




/* ---------------------------------------------------------------*/

/* var displayCity = function() {
    // check if api returns cities
    if (????.length === 0) {
        cityContainerEl.textContent = "No cities found.";
        return;
    }
    // clear old content
    cityContainerEl.textContent = "";

    for (let i = 0; i < array.length; i++) {
        var cityName = array[i];
        
    }
} */


// this link is for what to use for the five-day forecast: https://openweathermap.org/api/one-call-api

// have to use a separate API for UV index