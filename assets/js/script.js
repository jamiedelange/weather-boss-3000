var searchButton = document.querySelector("#search-button")
var inputValue = document.querySelector("#input-value")
var city = document.querySelector("#city-search-term")
var temperature = document.querySelector("#temp-field")
var humidity = document.querySelector("#humidity-field")
var windSpeed = document.querySelector("#wind-field")
var uvIndex = document.querySelector("#uv-field")
document.getElementById("search-button").addEventListener("click", e=>{
    e.preventDefault()
    console.log("userInput", inputValue.value)
   fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" + inputValue.value + "&units=imperial&appid=78abac7397dbff0934df4ef82fc5fd58"
    ).then(response=>console.log("API response ", response)).catch(err=>console.log("error", err.message))
    
});

/* 
function getWeather() {
     var citySearch = document.querySelector("#city-search") 

     fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" + inputValue.value + "&units=imperial&appid=78abac7397dbff0934df4ef82fc5fd58"
    )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var cityTemp = (data.main.temp);
            console.log(cityTemp);
            // variable to select where info will be displayed
            var cityContainerEl = document.querySelector("#main-info");
            cityContainerEl.innerHTML = "";

            var cityWeather = document.createElement("div");
            cityWeather.setAttribute("src", name);

            cityContainerEl.appendChild(cityWeather); 
        });  

};
getWeather();

 */

/* var getCity = function(name) {
    var cityUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + name + ",us&appid=78abac7397dbff0934df4ef82fc5fd58";

    fetch(cityUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) { // ??????
                console.log();
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};


getCity(); */


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