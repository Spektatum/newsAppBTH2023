/*
* Closure pattern
* Yso 2020
*
* ajaxInterface, calls AJAX and sorts the response
* sends the results to callbacks
*/

/*jshint esversion: 6 */

import {app} from './app.js';

/*
*
* Ajax Interface
* An interface to the ajax module
*
*/
var ajaxInterface = (function() {

    console.log('Loading ajax interface');
    var contentDiv; // The content div

    /*
    *  Fetch
    *
    */
    var fetchAjax = function(fetchArr, callbackArr, dataObj = null) {
        console.log('Fetch ajax functionality');
        var url; // The url for the API
        var method; // The method
        var res; // The result
        var token; // The token
        var useCache; // Boolean for if the cache to be used
        var callback1; // Callback on received data
        var callback2; // Callback on no data

        // Set the callbacks
        if (callbackArr) {
            callback1 = callbackArr[0];
            callback2 = callbackArr[1];
        }


        // Callback for AJAX
        function callback(result, request) {
            console.log(result);
            console.log(request);
            console.log('AjaxTest fetch callback');

            // if request error
            if (request.error) {
                console.log(request.error.message);
                callback1();
            }

            // If no result & no request
            if (result == null && request == null) {
                console.log('No data to display');
                if (callback1) {
                    console.log('Callback functionality');
                    callback1();
                }
                // app.auth.offlineMode();
                return false;
            }

            // On success
            if (request.data) {
                console.log('Data received');
                if (request.data) {
                    // app.ajaxTest2.setContent(request.data);
                    if (callback2) {
                        console.log('Callback functionality');
                        callback2(request.data);
                    }
                }
            }

            // createDisplay(app.auth.guiDisplay, result);
        }
        url = fetchArr[0];
        method = fetchArr[1];
        token = fetchArr[2];
        useCache = fetchArr[3];
        res = app.ajax.fetchCall(dataObj, url, method, callback, token, useCache);
    };


    // API: returning specific functionality
    return {
        fetchAjax: fetchAjax
      };
  }(ajaxInterface));

export {ajaxInterface};
