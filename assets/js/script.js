var apiKey = '78abac7397dbff0934df4ef82fc5fd58'
var momento = document.getElementById("currentDay");
var currentTime = (moment().format('MM/DD/YYYY'));

$("#search-terms").keypress(function(e){
    if(e.which == 13) {
        $("#search-btn").click();
    }
});

// UV index
function uvIndex(lon, lat) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`,
        method: "GET"
    })
        .then(function (response1) {

            $(".uvIndex").html("UV Index: " + `<span class=" badge badge-danger">${(response1.value)}</span>`);
        });
}

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}


//retrieve geolocation
let geocoder;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
function successFunction(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    console.log(lat, lng)

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${apiKey}`,
        method: "GET"
    })
        .then(function (response) {
            updateLocation(response);
        });
    uvIndex(lng, lat);
};
function updateLocation(response) {
    const windDeg = Math.round(response.wind.deg);
    const toDirection = degToCompass(windDeg);
    $(".city").html(`<h2>${response.name} (${currentTime}) <img src="https://openweathermap.org/img/w/${response.weather[0].icon}.png"></h2>`);
    $(".windspeed").text("Wind: " + toDirection + " at " + Math.round(response.wind.speed) + " mph");
    $(".humidity").text("Humidity: " + Math.round(response.main.humidity) + "%");
    $(".temperature").text("Temperature: " + Math.round(response.main.temp) + "°F");

    forecast(response.name);
}
function errorFunction() {
    alert("Geocoder failed");
}

function citySearch() {
    $("#search-btn").click(function (event) {
        //this event prevents default refreshing of the page upon button click
        event.preventDefault("click")
        let city = $("#search-terms").val().trim();
        cityArray.push(city);
        if (city != '') {
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`,
                method: "GET"
            }).then(function (response) {
                updateLocation(response);
                uvIndex(response.coord.lon, response.coord.lat)
                $("#search-history").empty();
                localStorage.setItem("weather-search-terms", JSON.stringify(cityArray));
                var recentCities = JSON.parse(localStorage.getItem("weather-search-terms"));
                cityList(recentCities);
            });
        }
    })
};
citySearch();

var searchHistory = document.getElementById("search-history");
var cityArray = JSON.parse(localStorage.getItem("weather-search-terms"));
if (cityArray&&cityArray!==null) 
{
    cityList(cityArray);
} else {
    cityArray=[];
    cityList(cityArray);
}
function cityList(cityArray) {
    for (var i = 0; i < cityArray.length; i++) {
        var btn = document.createElement("button");
        btn.setAttribute("id", cityArray[i]);
        btn.classList = "btn btn-outline-dark ";
        btn.onclick = (e) => buttonClick(e.target.id);
        btn.append(cityArray[i]);
        searchHistory.append(btn);
    }
};

//five-day forecast
function forecast(city) {
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    $.ajax({
        url: forecastURL,
        type: "GET",
    })
        .then(function (response2) {
            $("#5-day-forecast").empty();
            let j=0
            for (let i = 4; i < 40;) {
                let temp = response2.list[i].main.temp;
                let humidity = response2.list[i].main.humidity;
                let date = moment().add(j, 'days').format('l');
                let icon = response2.list[i].weather[0].icon;
                let iconurl = "https://openweathermap.org/img/w/" + icon + ".png";
                let conditions = $("<div></div>");
                let card = $("<div></div>");
                card.addClass("card mb-2 text-white");
                let cardField = $("<div></div>");
                cardField.addClass("card-body 5-day");
                let cityDate = $(`<p><strong>${date}</strong></p>`);
                cardField.append(cityDate);
                let divIcon = $(`<div><img src="${iconurl}" /></div>`);
                cardField.append(divIcon)
                let tempField = $("<p>" + Math.round(temp) + "°F</p>");
                cardField.append(tempField);
                let humidityField = $("<p>" + Math.round(humidity) + "% Humidity</p>")
                cardField.append(humidityField)
                card.append(cardField)
                conditions.append(card);
                $("#5-day-forecast").append(conditions[0]);
                i+=8;
                ++j;
            }
        });
};

const cityInfo = async (city) => {

    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    const response = await fetch(queryURL);
    const result = await response.json();
    return result;

};

const buttonClick = (city) => {

    cityInfo(city).then(response => {
        updateLocation(response);
        uvIndex(response.coord.lon, response.coord.lat);
    });
};