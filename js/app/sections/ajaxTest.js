/*
* Closure pattern
* View for app: about
* Ylva Sjölin 2019
*/

/*jshint esversion: 6 */

import {app} from './../app.js';

var ajaxTest = (function() {

    console.log('Loading ajax test page');
    /*
    * Closure pattern
    * - Show the about topic in app display -
    *
    */


    /*
    *   Display
    *
    */
    var display = function() {
      console.log('Displaying the ajax test page');

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

      /*
      *
      * Call ajax
      *
      */
      // Emil Folino API
      // Params
      apiKey = "b104fe68cc0c55e6cb27ba2d01d738e1";
      url = "https://lager.emilfolino.se/v2/orders?api_key="+apiKey;

      method = "GET";

      // Callback the catches the incoming request data
      var callback = function(res) {
          console.log(res);

          if (res) {
              data = document.createElement('DIV');
              data.className = 'contentTxt';
              response = document.createElement('P');
              response.innerHTML = 'Success, lagerAPI';
              data.appendChild(response);
              app.winDisp.content.appendChild(data);
          }
      };

      app.ajax.requestCall(method, url, callback);

      // Render menu
      app.menu.showMenu('AjaxTest');

      // Set screen focus
      // topSet = window.rootElement.offsetTop - 55;
      // window.scrollTo(0, topSet);

    }; // End ajaxTest

    // API: returning specific functionality
    return {
        display: display
      };
  }(ajaxTest));

export {ajaxTest};
