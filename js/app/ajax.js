/*
* Closure pattern
* ajax
* creates cache
*/
/*jshint esversion: 6 */

import {app} from './app.js';

var ajax = (function() {
    console.log('Loading AJAX');

    var request; // XMLhttpRequest variable
    var res; // Result of the XMLhttpRequest variable
    var response; // The response text
    var controller; // controller object
    var signal; // controller signal
    var callCache; // cache for calls based on url
    var noCache; // No cache, default true
    var maxCacheTime; // The maximum time for cache

    maxCacheTime = 7000; // Default cache
    callCache = [];

    /*
    *
    * CacheTime
    *
    */
    var setCacheTime = function(newTime) {
        app.ajax.maxCacheTime = newTime;
    };

    /*
    *
    * CacheTime
    *
    */
    var getCacheTime = function(newTime) {
        return app.ajax.maxCacheTime;
    };

    /*
    *
    * Call server via XMLHttpRequest
    *
    */
    var requestCall = function(method, url, callback2, params = null, header = null) {
        console.log('Server call via XMLHttpRequest');
        // console.log(callback1);

        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        }

        try {
            request.onreadystatechange = function() {
              // console.log(request);
              if (request.readyState == 4) {
                  // res contains the data from the server
                  res = request.responseText;

                  // Send the result to the callback
                  callback2(res);
              }
            };
            request.open(method, url, true);
            if (header) {
                request.setRequestHeader('Content-Type', header);
            }
            request.send(params);
        } catch (e) {
            console.log('Unable to connect to the server');
            console.log(e);
        }
    };

    /*
    *
    * set event
    * Record connection status
    *
    */
    var setEvent = function(name, data) {
        var e = document.createEvent("Event");
        e.initEvent(name, true, true);
        e.data = data;
        window.dispatchEvent(e);
    };

    /*
    *
    * Fetch data from the server
    * Time-out call
    * If the browser is for example offline, the cache will be used
    * A timeout event is set. Which can be used in other system parts.
    *
    * Inspiration:
    * https://www.html5rocks.com/en/mobile/workingoffthegrid/
    * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
    *
    */
    var fetchTimer = function(maxWaitTime) {
        app.ajax.controller = new AbortController();
        app.ajax.signal = app.ajax.controller.signal;

        // Set timer that will abort the fetch call after a certain time
        var noResponseTimer = setTimeout(function() {
            app.ajax.controller.abort();
            console.log('Fetch API aborted');
            app.ajax.setEvent('TimedOut', 'Response time');
            return true;
          }, maxWaitTime);

        // Clear timeout callback
        var clear = function() {
            clearTimeout(noResponseTimer);
        };
        return clear;
    };

    /*
    *
    * Fetch data from the server
    * Times out the fetch call. After the set time, If no data is fetched
    * the cache will be used if activated & available.
    *
    */
    var fetchCall = function(
          dataObj,
          url,
          method,
          callback,
          token = null,
          useCache = false
          // maxTime = 5000
      ) {
        var result; // The result data
        var res; // The result
        var theBody; // The body
        var clearTimer; // Clear timer function
        var newCache; // New cache
        var foundCache; // Found cache

        // Run fetch timer
        // Set timer that aborts fetch after a certain time
        // For example, if the internet connection is down
        // Returned is the clearTimer function,
        // to clear the timer on fetch success
        // The 'AbortController' & 'controller signal' is used to achieve
        // the fetch abort.
        console.log("Cache time:" + app.ajax.getCacheTime());
        clearTimer = this.fetchTimer(app.ajax.getCacheTime());

        // Fetch body
        theBody = {
            body: JSON.stringify(dataObj),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token
            },
            method: method,
            signal: app.ajax.signal // Controller signal for aborting fetch
        };

        if (method == 'GET') {
            theBody = {
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': token
                },
                method: method,
                signal: app.ajax.signal // Controller signal for aborting fetch
            };
        }

        // Add event listener for the event on time out
        // If any cache of a previous api url call is recorded.
        // If available & the cache is set to be used, use it.
        // Send as callback
        function getCache() {
            console.log('TimeOut fetch, offline mode');
            console.log(app.ajax.callCache);
            foundCache = false;
            app.ajax.callCache.forEach(function(item, index) {
                // console.log('cache ' + item[0] );
                // console.log('cache ' + item[1] );
                // console.log('cache ' + item[2] );

                // If cache data
                if (item[0] == url) {
                    if (useCache == true) {
                        console.log('Cache found');
                        console.log('Send cache');
                        callback(item[1], item[2]);
                        foundCache = true;
                        return;
                    }

                    if (useCache == false) {
                        console.log('Cache not activated');
                        // Empty callback
                        callback(null, null);
                        foundCache = true;
                        return;
                    }
                }
            });

            if (app.ajax.callCache.length == 0) {
                console.log('No cache registered');
                callback(null, null);
                return;
            }

            if (!foundCache) {
                console.log('No cache found');
                callback(null, null);
                return;
            }
            // Remove the used event listener
            console.log('Removing timedOut eventlistener');
            window.removeEventListener("TimedOut", getCache);
        }

        // Add the eventlistener to a timeout on receiving the fetch
        // Add the same event listener to modules that should react
        window.addEventListener("TimedOut", getCache);

        // Clear the timer on fetch response
        // Save cache of result on success
        // Signal property is sent as a parameter object
        fetch(url, theBody)
        .then(function (response) {
            // console.log(response);
            // Turn off the cache timer, as not needed
            clearTimer();

            // Return response
            return response.json();
        }).then(function(result) {
            // console.log(result);
            var res;// The result

            if (result.errors) {
                // console.log('Error response: ');
                // console.log(result.errors.title);
                // console.log(result.errors.detail);

                if (result.errors.status == 500) {
                    res = "Status 500, database error. ";
                    res += "Data not accepted. Perhaps a duplicate.";
                    // res += result.errors.title;
                }

                if (result.errors.status == 401) {
                    res = "Status 401, database error. ";
                    res += result.errors.title;
                }
            }

            if (result.data) {
                res = result.data.message;
            }

            // Save cache
            // If previous cache of the url is found, delete it
            app.ajax.callCache.forEach(function(item, index) {

                // Search for the url in the array
                var found = item.find(element => element == url);

                // If found delete it
                if (found) {
                    console.log('Deleting previous cache');
                    app.ajax.callCache.splice(index, 1);
                }
            });

            // console.log(app.ajax.callCache);

            // Save the new cache
            newCache = [url, res, result];
            app.ajax.callCache.push(newCache);

            // Send callback result
            callback(res, result);
        });
    };

    return {
        requestCall: requestCall,
        fetchCall: fetchCall,
        fetchTimer: fetchTimer,
        setEvent: setEvent,
        controller: controller,
        signal: signal,
        callCache: callCache,
        maxCacheTime: maxCacheTime,
        getCacheTime: getCacheTime,
        setCacheTime: setCacheTime
      };
  }(ajax));

export {ajax};
