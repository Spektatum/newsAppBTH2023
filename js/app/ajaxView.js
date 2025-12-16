/*
* Closure pattern
* Yso 2020
*
* ajaxApiData, set the data to view
* Insert callback for data printing syntax
*
*/

/*jshint esversion: 6 */

import {app} from './app.js';

var ajaxView = (function() {
    console.log('Loading ajax view');
    var contentDiv; // The content div
    var syntaxCallback;

    /*
    *  Print syntax
    *  Specific for the API of choice
    *  Sample. If none inserted, this one is used
    *
    */
    var printSyntax1 = function(theData) {
        console.log('Printing the syntax');
        console.log(theData);

        theData.forEach((element, index) => {

        });

        return 'no data. default settings for syntax.';
    };

    /*
    *  The content
    *
    */
    var setContent = function(theData) {
        var innerContent; // Div for the inner content
        var res; // String for display

        res = '';
        // Clear previous content
        while (app.ajaxView.contentDiv.firstChild) {
            app.ajaxView.contentDiv.removeChild(app.ajaxView.contentDiv.firstChild);
        }
        console.log('Setting the inner content');
        // console.log(theData);

        if (theData) {
            if (syntaxCallback) {
                res = syntaxCallback(theData);
            }
            if (!syntaxCallback) {
                res = app.ajaxView.printSyntax1(theData);
            }
        }

        if (!theData) {
            // res = "No data to display. Check the internet connection.";
            if (syntaxCallback) {
                res = syntaxCallback(theData);
            }
            if (!syntaxCallback) {
                res = app.ajaxView.printSyntax1(theData);
            }
        }

        innerContent = document.createElement('P');
        innerContent.className = '';
        // console.log(res);
        if (res) {
            innerContent.innerHTML = res;
        }

        app.ajaxView.contentDiv.appendChild(innerContent);
    };


    /*
    *  Fetch
    *  Use the ajax interface
    */
    var apiData = function(ajaxArr) {
        console.log('Fetch api data via ajax');
        var res; // The result
        var callbacks = []; // Array for callbacks

        // Callback for AJAX, no data
        function callback1(data) {
            // console.log(data);
            app.ajaxView.setContent(null);
        }

        // Callback for AJAX, data
        function callback2(data) {
            // console.log(data);
            app.ajaxView.setContent(data);
        }

        // url = "";
        // method = "";
        // token = null;
        // useCache = true;

        // Create arrays with values
        // ajaxArr = [url, method, token, useCache];
        callbacks = [callback1, callback2];

        res = app.ajaxInterface.fetchAjax(ajaxArr, callbacks);
    };

    /*
    *   Display
    *
    */
    var display = function(menuName, syntaxC, ajaxArr) {
        console.log('Displaying the api data');

        // Variables
        var url; // API url
        var apiKey; // API key
        var method; // Method (POST, GET, PUT etc)
        var res; // The result
        var data; // Response data div
        var response; // Response div

        if (syntaxC) {
            syntaxCallback = syntaxC;
        }

        /*
        *
        * Content
        *
        */
        // Load new section : scroll to top & empty main
        app.winDisp.loadNewSection();

        // The content div
        app.ajaxView.contentDiv = document.createElement('DIV');
        app.ajaxView.contentDiv.className = 'contentTxt';

        console.log('Content loaded');

        /*
        *
        * Call ajax
        *
        */
        app.ajaxView.apiData(ajaxArr);


        /*
        *
        * Append to document
        *
        */
        app.winDisp.content.appendChild(app.ajaxView.contentDiv);


        // Render menu
        app.menu.showMenu(menuName);

        // Set screen focus
        // topSet = window.rootElement.offsetTop - 55;
        // window.scrollTo(0, topSet);

    }; // End ajaxTest

    // API: returning specific functionality
    return {
        display: display,
        apiData: apiData,
        setContent: setContent,
        printSyntax1: printSyntax1,
        contentDiv: contentDiv
      };
  }(ajaxView));

export {ajaxView};
