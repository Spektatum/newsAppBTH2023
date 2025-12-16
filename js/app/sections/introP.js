
// Closure pattern
// Returns the display app functionality
// The module exports the intro part

/*jshint esversion: 6 */

import {app} from './../app.js';

var introP = (function() {
    console.log('Loading intro');

    var displayApp = function() {
        console.log('Displaying the app');

        // Variables
        var displayArr; // The info to be sent to the display
        var data; // The info displayed on the page
        var text; // The text for appending
        var textFile; // The content text file
        var introImg; // The intro image
        var imgDiv; // Intro image div for pic size control
        var navElement; // navigate to the offers
        var theVersion; // The version nr


        /*
        *
        * Content
        *
        */

        // Load new section : scroll to top & empty main
        app.winDisp.loadNewSection();

        // Load the content from file
        theVersion = '1.0';
        data = document.createElement('DIV');
        data.className = 'contentTxt';
        text = document.createElement('P');
        textFile = '';
        if (theVersion) {
            textFile = "js/app/sections/contentFiles/page1.php?v="+theVersion;
        }
        app.setTxt.addData(text, textFile);

        // Append the data to the view
        data.appendChild(text);
        // console.log(data);
        app.winDisp.content.appendChild(data);

        // Render menu
        app.menu.showMenu('Intro');

      }; // End showMe

    return {
        displayApp: displayApp
      };
  }(introP));

export {introP};
