/*
* Closure pattern
* App : setTxt
* Sets a text from a txt file to a P element
* @param elem : p element
* @param file : txt file location
*
*/
/*jshint esversion: 6 */

import {app} from './../app.js';
import L from "leaflet"; // The map

var theWeather = (function() {
    console.log('Loading the map test');
    var mapDiv; // Div for map display
    var data; // Data for the div
    var loadedMap; // Boolean for loaded map
    var form; // Form element
    var contentDiv; // The content div
    var weatherData; // weather div


    /*
    *
    * Mark the map as loaded
    *
    */
    var loadMap = function() {
        app.mapTest.loadedMap = true;
    };

    /*
    *  Print syntax
    *  Specific for the API of choice
    *  The callback to the ajax, on success
    *
    */
    var printSyntax = function(theData) {
        console.log('Printing the weatherApi');
        // console.log(theData);

        var innerCDiv; // inner content
        var weatherP; // weather paragraph
        var jsonData = JSON.parse(theData); // JSON parse the text
        console.log(jsonData);

        // Create the inner div
        innerCDiv = document.createElement('DIV');
        innerCDiv.className = 'fullP';

        while (app.theWeather.weatherData.firstChild) {
            app.theWeather.weatherData.removeChild(app.theWeather.weatherData.firstChild);
        }

        weatherP = document.createElement('P');
        weatherP.innerHTML = "<h1> Weather report </h1>";
        innerCDiv.appendChild(weatherP);
        app.theWeather.weatherData.appendChild(innerCDiv);

        // Security
        // https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
        function htmlEntities(str) {
          // return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
          return String(str).replace(/</g, ' ').replace(/>/g, ' ');
        }


        if (jsonData.cod) {
            if (jsonData.cod == "404") {
                console.log('Location was not found by the weather API');
                weatherP.innerHTML += 'Location was not found by the weather API';
            }

            if (jsonData.cod == "200") {
                console.log('Location was found by the weather API');
                var name;
                var weather;

                if (jsonData.name) {
                    if (typeof jsonData.name === "string") {
                        name = htmlEntities(jsonData.name);
                        weatherP.innerHTML += "<p> Location: "+name+"</p>";
                    }
                }

                if (jsonData.weather) {
                    if (Array.isArray(jsonData.weather)) {
                        if (jsonData.weather[0]) {
                            if (typeof jsonData.weather[0].main === "string") {
                                weatherP.innerHTML += "<p> Weather: "+ htmlEntities(jsonData.weather[0].main) +"</p>";
                            }
                            if (typeof jsonData.weather[0].description === "string") {
                                weatherP.innerHTML += "<p> Description: "+ htmlEntities(jsonData.weather[0].description)+"</p><hr/>";
                            }
                        }
                    }
                }

                if (jsonData.coord) {
                    if (typeof jsonData.coord.lon === "string" && jsonData.coord.lat === "string") {
                      if (jsonData.coord.lon && jsonData.coord.lat) {
                          weatherP.innerHTML += "<p> Longitude: "+htmlEntities(jsonData.coord.lon)+"</p>";
                          weatherP.innerHTML += "<p> Latitude: "+htmlEntities(jsonData.coord.lat)+"</p><hr/>";
                      }
                    }
                }

                if (jsonData.sys) {
                    // Get the timezone difference
                    var timezone = jsonData.timezone*1000;
                    var sunDate;
                    var sunDate2;
                    var hours;
                    var hours2;
                    var min;
                    var min2;
                    var unix;
                    var unix2;

                    if (jsonData.sys.sunrise) {

                        if (typeof jsonData.sys.sunrise === "number") {
                            // Get the unix timestamp
                            unix = (jsonData.sys.sunrise*1000)+timezone;

                            // Create the dates, UTC
                            sunDate = new Date(unix);
                            hours = sunDate.getUTCHours();
                            min = sunDate.getUTCMinutes();

                            weatherP.innerHTML += "<p> Sunrise: "+hours+":"+min+"</p>";
                        }
                    }

                    if (jsonData.sys.sunset) {

                        if (typeof jsonData.sys.sunset === "number") {
                            // Get the unix timestamp
                            unix2 = (jsonData.sys.sunset*1000)+timezone;

                            // Create the dates, UTC
                            sunDate2 = new Date(unix2);
                            hours2 = sunDate2.getUTCHours();
                            min2 = sunDate2.getUTCMinutes();

                            weatherP.innerHTML += "<p> Sunset: "+hours2+":"+min2+"</p><hr/>";
                      }
                    }
                    console.log(jsonData.sys);
                }

                if (jsonData.main) {
                    if (jsonData.main.temp && jsonData.main.temp_min && jsonData.main.temp_max) {
                        if (typeof jsonData.main.temp === "number") {
                            weatherP.innerHTML += "<p> Temperature: "+jsonData.main.temp+"</p>";
                        }
                    }
                    if (jsonData.main.pressure && jsonData.main.humidity) {
                        if (typeof jsonData.main.pressure === "number") {
                            weatherP.innerHTML += "<p> Pressure: "+jsonData.main.pressure+"</p>";
                        }
                        if (typeof jsonData.main.humidity === "number") {
                            weatherP.innerHTML += "<p> Humidity: "+jsonData.main.humidity+"</p>";
                        }
                    }
                }
                if (jsonData.wind) {
                    if (jsonData.wind.speed) {
                        if (typeof jsonData.wind.speed === "number") {
                            weatherP.innerHTML += "<p> Wind speed: "+jsonData.wind.speed+"</p><hr/>";
                        }
                    }
                }
            }
          } // End if Json data
    }; // end print syntax


    /*
    *
    * Fetch the weather, AJAX
    *
    */
    var ajaxWeather = function(userInput) {
        console.log('API weather');

        var url; // Url for the api
        var method; // method to use
        var apiKey; // api key

        apiKey= "a8412f6144becb2e622326b0422792cf";
        url = "http://api.openweathermap.org/data/2.5/weather?q="+userInput+"&units=metric&appid="+apiKey;
        method = "GET";

        app.ajax.requestCall(method, url, app.theWeather.printSyntax);
    };

    /*
    *
    * Display map
    *
    */
    var display = function() {
        var city; // The form element for city, to show on the map
        var submit; // The form element for submit
        var userInput; // The user input
        var mapBg; // The map background
        var introDiv; // The intro div
        var introP; // The intro div
        var innerCDiv; // The intro div

        // The intro
        introDiv = document.createElement('DIV');
        introDiv.className = 'fullP';
        introP = document.createElement('P');
        introP.innerHTML = "<h1> The weather </h1>";
        introP.innerHTML += "<p> Enter a city to see the map & the weather </p>";
        introDiv.appendChild(introP);

        // The inner content
        innerCDiv = document.createElement('DIV');
        innerCDiv.className = 'fullP';

        // Load new section : scroll to top & empty main
        app.winDisp.loadNewSection();
        app.mapTest.loadedMap = false;

        // Set map-load-flag to false, new load
        app.theMap.loaded = false;

        // Add a form for selecting a country
        form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "");
        form.className += 'form1';

        // Create an input element for city
        city = document.createElement("input");
        city.setAttribute("type", "text");
        city.setAttribute("name", "city");
        city.setAttribute("placeholder", "City");

        // Create a result button
        submit = document.createElement("input");
        submit.setAttribute("type", "button");
        submit.setAttribute("value", "Enter");
        submit.id += 'cityName';
        submit.className = 'btn1';

        // Prevent the page from refreshing on input field & enter key
        city.addEventListener("keydown", function(e) {
            // console.log(e);
            // console.log('Key down');
            if (e.keyCode == 13){
               event.preventDefault();
             }
        });

        // Interactivated result button
        // Enter a city, that can be displayed on the map
        submit.addEventListener("click", function() {
            var mapLocation; // location on the map
            var callb1; // the callback functionality
            var callb2; // the callback functionality

            // console.log('test');
            console.log(city.value);
            userInput = city.value;
            // app.theMap.showDirection(userInput);

            // First location input loads here
            if (app.mapTest.loadedMap === false) {
                // Get the longitude and latitude
                // Display the map
                callb1 = app.theMap.loadLocation; // map display
                callb2 = app.mapTest.loadMap; // mark map as loaded, if result
                app.theMap.geoLocation(userInput, callb1, callb2);
            }

            // Nr 1+ location input loads through this function
            if (app.mapTest.loadedMap === true) {
                app.theMap.showDirection(userInput);
            }

            // Call the weather report API, with the user input
            ajaxWeather(userInput);
        });

        // Add elems to form
        form.appendChild(city);
        form.appendChild(submit);

        // Append form
        innerCDiv.appendChild(form);

        // Add to window
        // app.winDisp.content.appendChild(form);

        // Create the content element
        contentDiv = document.createElement('DIV');
        contentDiv.className = 'contentTxt';

        // Apend the intro
        contentDiv.appendChild(introDiv);

        // Apend the form
        contentDiv.appendChild(innerCDiv);

        // Add the map
        mapBg = document.createElement('DIV');
        mapBg.className = 'mapBg';
        mapDiv = document.createElement('DIV');
        mapDiv.id = 'map';
        mapBg.appendChild(mapDiv);
        contentDiv.appendChild(mapBg);
        app.winDisp.content.appendChild(contentDiv);

        // Add weather data section
        app.theWeather.weatherData = document.createElement('DIV');
        app.theWeather.weatherData.className = 'weatherData';
        contentDiv.appendChild(app.theWeather.weatherData);

        // Load the map
        // app.theMap.loadMap();

        // Render menu
        app.menu.showMenu('Weather');
    };

    return {
        display: display,
        loadedMap: loadedMap,
        loadMap: loadMap,
        printSyntax: printSyntax,
        weatherData: weatherData
      };
  }(theWeather));

export {theWeather};
