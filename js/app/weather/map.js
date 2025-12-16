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

import "leaflet/dist/leaflet.css"; // The map css
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

import { OpenStreetMapProvider } from "leaflet-geosearch"; // Geosearch
// for displaying addresses

var theMapW = (function() {
    console.log('Loading the map functionality');

    var loaded; // Flag for loaded map
    var map; // The map
    loaded = false;

    /*
    *
    * Get geo location
    * Returns longitude and latitude of a place
    * Send in a callback to use the values, if wanted
    *
    */
    var geoLocation = function(location, callback = null, callback2 = null) {
        var geocoder = new OpenStreetMapProvider();
        var position;

            geocoder
                .search({ query: location })
                .then(function(result) {
                    if (result.length > 0) {
                      console.log("Latitude & longitude: ");
                      console.log([result[0].y, result[0].x]);
                      position = [result[0].y, result[0].x];
                      // L.marker([result[0].y, result[0].x]).addTo(map).bindPopup(result[0].label);
                      if (callback) {
                          callback(position);
                      }
                      if (callback2) {
                          callback2();
                      }
                    }
                });
      };


    /*
    *
    * Load map from the geo location
    * Returns longitude and latitude of a place
    *
    */
    var loadLocation = function(location) {
        console.log('Load map from location');
        app.theMap.loaded = true;
        // var mymap = L.map('map').setView([51.505, -0.09], 13);

        if (!Array.isArray(location)) {
            return false;
        }

        var places = {
              // "BTH": [56.181932, 15.590525],
              "Location": [location[0], location[1]]
              // "Stortorget": [56.160817, 15.586703],
              // "Hoglands Park": [56.164077, 15.585887],
              // "Rödebybacken": [56.261121, 15.628609].
              // "Sweden": [60.1282, 18.6435]
          };

          map = L.map('map').setView(places["Location"], 1);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: `&copy;
              <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap</a> contributors`
          }).addTo(map);

          for (var place in places) {
              if (Object.prototype.hasOwnProperty.call(places, place)) {
                  L.marker(places[place]).addTo(map).bindPopup(place);
              }
          }
    };

    /*
    *
    * Load the map
    * From preset locations
    *
    */
    var loadMap = function(userInput = null) {

        console.log('Load map');
        app.theMap.loaded = true;
        // var mymap = L.map('map').setView([51.505, -0.09], 13);

        var places = {
              "BTH": [56.181932, 15.590525],
              // "Stortorget": [56.160817, 15.586703],
              // "Hoglands Park": [56.164077, 15.585887],
              // "Rödebybacken": [56.261121, 15.628609].
              // "Sweden": [60.1282, 18.6435]
          };

          map = L.map('map').setView(places["BTH"], 1);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: `&copy;
              <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap</a> contributors`
          }).addTo(map);

          for (var place in places) {
              if (Object.prototype.hasOwnProperty.call(places, place)) {
                  L.marker(places[place]).addTo(map).bindPopup(place);
              }
          }

          // var geocoder = new OpenStreetMapProvider();
          //
          // var addresses = [
          //     userInput
          //     // "Spain",
          //     // selectedCountry,
          //     // selectedCity
          // ];
          //
          // for (var i = 0; i < addresses.length; i++) {
          //     geocoder
          //         .search({ query: addresses[i] })
          //         .then(function(result) {
          //             if (result.length > 0) {
          //                 L.marker([result[0].y, result[0].x]).addTo(map).bindPopup(result[0].label);
          //             }
          //         });
          // }
    };

    /*
    *
    * Load direction
    *
    */
  var showDirection = function(userInput) {
        var geocoder = new OpenStreetMapProvider();

        var addresses = [
            userInput
            // "Spain",
            // selectedCountry,
            // selectedCity
        ];

        for (var i = 0; i < addresses.length; i++) {
            geocoder
                .search({ query: addresses[i] })
                .then(function(result) {
                    if (result.length > 0) {
                        L.marker([result[0].y, result[0].x]).addTo(map).bindPopup(result[0].label);
                    }
                });
        }
    };


    return {
        loadMap: loadMap,
        showDirection: showDirection,
        geoLocation: geoLocation,
        loaded: loaded,
        loadLocation: loadLocation
      };
  }(theMapW));

export {theMapW};
