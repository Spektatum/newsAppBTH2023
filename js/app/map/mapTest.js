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

var mapTest = (function() {
    console.log('Loading the map test');
    var mapDiv; // Div for map display
    var data; // Data for the div
    var loadedMap; // Boolean for loaded map
    var form; // Form element

    /*
    *
    * Mark the map as loaded
    *
    */
    var loadMap = function() {
        app.mapTest.loadedMap = true;
    };

    /*
    *
    * Display map test
    *
    */
    var display = function() {
        var city; // The form element for city, to show on the map
        var submit; // The form element for submit
        var userInput; // The user input
        var contentDiv; // The content div

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
        submit.className += 'btn1';

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
        });

        // Add to form
        form.appendChild(city);
        form.appendChild(submit);

        // Add to window
        app.winDisp.content.appendChild(form);

        // Add the map
        contentDiv = document.createElement('DIV');
        contentDiv.className = 'contentTxt';
        mapDiv = document.createElement('DIV');
        mapDiv.id = 'map';
        contentDiv.appendChild(mapDiv);
        app.winDisp.content.appendChild(contentDiv);

        // Load the map
        // app.theMap.loadMap();

        // Render menu
        app.menu.showMenu('MapTest');
    };

    return {
        display: display,
        loadedMap: loadedMap,
        loadMap: loadMap
      };
  }(mapTest));

export {mapTest};
