/*
* Closure pattern
* App : setTxt
* Sets a text from a txt file to a P element
* @param elem : p element
* @param file : txt file location
*
*/
/*jshint esversion: 6 */

import {app} from './app.js';

var setTxt = (function() {
    console.log('Loading text handler');

    var request; // XMLhttpRequest variable
    var res; // Result of the XMLhttpRequest variable

    /*
    *
    * Adds info to an elem argument
    *
    */
    var addData = function(elem, file) {
      console.log('Getting info from file');

        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        }

        try {
            request.onreadystatechange = function() {setInfo(elem);};
            request.open("GET", file, true);
            request.send();
        } catch (e) {
            alert("Unable to connect to server");
        }
    };

      /*
      * Sets info to the innerHTML of elem argument
      *
      */

    function setInfo(elem) {
        if (request.readyState == 4) {
            res = request.responseText;

            elem.innerHTML = res;

            //window.mainContainer.appendChild(elem);
        }
    }

    return {
        addData: addData
      };
  }(setTxt));

export {setTxt};
