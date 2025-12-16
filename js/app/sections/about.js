/*
* Closure pattern
* View for app: about
* Ylvali 2019
*
*
*/

/*jshint esversion: 6 */

import {app} from './../app.js';

var about = (function() {

    console.log('Loading about page');
    /*
    * Closure pattern
    * - Show the about topic in app display -
    *
    */

    var showAbout = function() {
      console.log('Displaying the about page');

      // Variables
      var displayArr; // The info to be sent to the display
      var data; // The info displayed on the page
      var text; // The text to be displayed
      var textFile; // The content txt file
      var topSet; // The variable for setting screen focus
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
          textFile = "js/app/sections/contentFiles/page2.php?v="+theVersion;
      }
      app.setTxt.addData(text, textFile);

      // Append the data to the view
      data.appendChild(text);
      // console.log(data);
      app.winDisp.content.appendChild(data);

      // Render menu
      app.menu.showMenu('About');

      // Set screen focus
      // topSet = window.rootElement.offsetTop - 55;
      // window.scrollTo(0, topSet);

    }; // End show offers

    // API: returning specific functionality
    return {
        showAbout: showAbout
      };
  }(about));

export {about};
