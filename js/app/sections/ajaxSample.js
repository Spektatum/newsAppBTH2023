/*
* Closure pattern
* Yso 2020
*
* Ajax Sample is the top abstraction interface for displaying data from API
*
*/

/*jshint esversion: 6 */

import {app} from './../app.js';

var ajaxSample = (function() {

    console.log('Loading ajaxSample');
    /*
    *  Print syntax
    *  Specific for the API of choice
    *
    */
    var printSyntax = function(theData) {
        console.log('Printing the syntax, ajax sample');
        console.log(theData);

        theData.forEach((element, index) => {

        });

        return 'data';

    };

    var showData = function() {
      console.log('AjaxSample');
      var ajaxValues;
      var menuName;
      var url;
      var method;
      var token;
      var useCache;
      //ajaxValues = [url, method, token, useCache];

      menuName = 'AjaxSample';

      url = "https://inshortsapi.vercel.app/news?category=technology";
      method = "GET";
      token = null;
      useCache = true;

      ajaxValues = [url, method, token, useCache];

      // Load the api Data
      app.ajaxView.display(menuName, app.ajaxSample.printSyntax, ajaxValues);

    }; // End show data

    // API: returning specific functionality
    return {
        showData: showData,
        printSyntax: printSyntax
      };
  }(ajaxSample));

export {ajaxSample};
