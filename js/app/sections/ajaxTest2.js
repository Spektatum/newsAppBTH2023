/*
* Closure pattern
* View for app: about
* Ylva Sjölin 2019
*/

/*jshint esversion: 6 */

import {app} from './../app.js';

var ajaxTest2 = (function() {

    console.log('Loading ajax test page2');
    var contentDiv; // The content div

    /*
    *  Print syntax
    *  Specific for the API of choice
    *
    */
    var printSyntax1 = function(theData) {
        console.log('Printing the syntax');
        console.log(theData);

        // SECURITY CONTROL HERE!
        theData.forEach((element, index) => {

        });

        return 'data';
    };

    /*
    *  The content
    *
    */
    var setContent = function(theData) {
        var innerContent; // Div for the inner content
        var res; // String for display

        console.log('Setting the inner content');
        // console.log(theData);

        if (theData) {
            res = app.ajaxTest2.printSyntax1(theData);
        }

        if (!theData) {
            res = "No data to display. Check the internet connection.";
            res += "No data to display. Check the internet connection.";
        }

        innerContent = document.createElement('P');
        innerContent.innerHTML = res;

        contentDiv.appendChild(innerContent);
    };


    /*
    *  Fetch
    *  Use the ajax interface
    */
    var apiData = function() {
        console.log('Fetch api data via ajax');
        var url; // The url for the API
        var method; // The method
        var res; // The result
        var token; // The token
        var useCache; // Boolean for if the cache to be used
        var ajaxArr = []; // Data array for ajax call
        var callbacks = []; // Array for callbacks

        // Callback for AJAX, no data
        function callback1(data) {
            console.log(data);
            app.ajaxTest2.setContent(null);
        }

        // Callback for AJAX, data
        function callback2(data) {
            // console.log(data);
            app.ajaxTest2.setContent(data);
        }

        url = "https://inshortsapi.vercel.app/news?category=technology";
        method = "GET";
        token = null;
        useCache = true;

        // Create arrays with values
        ajaxArr = [url, method, token, useCache];
        callbacks = [callback1, callback2];

        res = app.ajaxInterface.fetchAjax(ajaxArr, callbacks);
    };

    /*
    *   Display
    *
    */
    var display = function() {
        console.log('Displaying the ajax test page2');

        // Variables
        var url; // API url
        var apiKey; // API key
        var method; // Method (POST, GET, PUT etc)
        var res; // The result
        var data; // Response data div
        var response; // Response div

        /*
        *
        * Content
        *
        */
        // Load new section : scroll to top & empty main
        app.winDisp.loadNewSection();
        // The content div
        contentDiv = document.createElement('DIV');
        contentDiv.className = 'contentTxt';

        /*
        *
        * Call ajax
        *
        */
        app.ajaxTest2.apiData();

        /*
        *
        * Append to document
        *
        */
        app.winDisp.content.appendChild(contentDiv);


        // Render menu
        app.menu.showMenu('AjaxTest2');

        // Set screen focus
        // topSet = window.rootElement.offsetTop - 55;
        // window.scrollTo(0, topSet);

    }; // End ajaxTest

    // API: returning specific functionality
    return {
        display: display,
        apiData: apiData,
        setContent: setContent,
        printSyntax1: printSyntax1
      };
  }(ajaxTest2));

export {ajaxTest2};
