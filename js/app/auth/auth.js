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

/*
*
* Authentization via JWT & https://auth.emilfolino.se/
*
*/
var auth = (function() {
    console.log('Loading authentization module');

    // Variables
    var url; // API url
    var apiKey; // API key
    var method; // Method (POST, GET, PUT etc)
    var res; // The result
    var data; // Response data div
    var response; // Response div
    var params; // The parameters
    var token; // The access token
    var userEmail; // The user email

    var contentDiv; // The content
    var resultDiv; // The result div
    var resultP; // The result P

    var offlineBtn;
    offlineBtn = false; // default

    // lager API
    // apiKey = "b104fe68cc0c55e6cb27ba2d01d738e1";

    //api key for auth: https://auth.emilfolino.se
    apiKey = "1e1c4ee7b4490c096d162943d583bbf6";


    /*
    *  Create the presentation display dynamically
    *
    */
    function createDisplay(link, txt) {
        var navElem;

        resultP = document.createElement('P');
        resultP.innerHTML = txt;

        navElem = document.createElement('button');
        navElem.className = 'btn1';
        navElem.addEventListener('click', link);
        navElem.textContent = 'OK';

        if (resultDiv) {
            // Remove previous result and reset
            while (resultDiv.firstChild) {
                resultDiv.removeChild(resultDiv.firstChild);
            }
            resultDiv.appendChild(resultP);
            resultDiv.appendChild(navElem);
        }
    }

    /*
    *
    * Login user
    *
    */
    var login = function(userEmail, userPass) {
        console.log('Login user');

        console.log(userEmail + ' ' + userPass);
        console.log('API key: ' + apiKey);

        var url; // The api url
        var method; // The method
        var res; // The returned result
        var resultP; // Result element


        // Callback from AJAX
        function callback(result, request) {
            // console.log(result);
            // console.log(request);
            console.log('Login fetch callback');
            var navElem;
            var theUser;

            // If no result & no request, call offline mode
            if (result == null && request == null) {
                console.log('No data to display');
                app.auth.offlineMode();
                return false;
            }

            // Save token
            if (request.data) {
                if (request.data.token) {
                    console.log("The user's token is saved");
                    console.log(request.data.token);
                    app.auth.token = request.data.token;
                    app.auth.userEmail = userEmail;
                    theUser = document.getElementById('theUser');
                    theUser.innerHTML = "Logged on user: "+userEmail;
                }
            }

            createDisplay(app.auth.guiDisplay, result);
        }

        var user = {
            email: userEmail,
            password: userPass,
            api_key: apiKey
        };

        url = "https://auth.emilfolino.se/login";
        method = "POST";
        res = app.ajax.fetchCall(user, url, method, callback);
    };


    /*
    *
    * Register user
    *
    */
    var register = function(userEmail, userPass) {
        console.log('Register user: ');
        console.log(userEmail + ' ' + userPass);
        // console.log('API key: ' + apiKey);

        var url; // The api url
        var method; // The method
        var res; // The returned result
        var resultP; // Result element

        // Callback from AJAX
        function callback(result, request) {
            // console.log(result);
            console.log('Register fetch callback');

            // If no result & no request, call offline mode
            if (result == null && request == null) {
                console.log('No data to display');
                app.auth.offlineMode();
                return false;
            }

            createDisplay(app.auth.guiDisplay, result);
        }

        var user = {
            email: userEmail,
            password: userPass,
            api_key: apiKey
        };

        url = "https://auth.emilfolino.se/register";
        method = "POST";
        res = app.ajax.fetchCall(user, url, method, callback);


        // Using the ajax method makeCall

        // Callback the catches the incoming request data
        // var callback1 = function(request) {
        //     console.log(request);
        //     console.log(request.target.readyState);
        //
        //     if (request.target.readyState == 4) {
        //         // res contains the data from the server
        //         res = request.target.responseText;
        //
        //         console.log(res);
        //         data = document.createElement('DIV');
        //         data.className = 'contentTxt';
        //         response = document.createElement('P');
        //         response.innerHTML = 'Success, lagerAPI';
        //         data.appendChild(response);
        //         app.winDisp.content.appendChild(data);
        //     }
        // };
        // method = 'POST';
        // url = "https://lager.emilfolino.se/v2/auth/register";
        // var user = {
        //     email: "test20?@test.com",
        //     password: "test20?",
        //     api_key: apiKey
        // };
        // params = 'api_key=b104fe68cc0c55e6cb27ba2d01d738e1';
        // params += '&email=testAgain';
        // params += '&password=testAgain';
        // header = 'application/x-www-form-urlencoded';
        // app.ajax.makeCall(method, url, callback1, params, header);
    };

    /*
    *
    * Select one user
    *
    */
    var showData = function() {
        var result; // the result data

        if (!app.auth.token) {
            console.log('No user logged on');
            result = 'Log on a user';
            createDisplay(app.auth.guiDisplay, result);
            return false;
        }

        // Callback from AJAX
        function callback(result, request) {
            // console.log(result);
            // console.log(request);
            console.log('showData fetch callback');

            // If no result & no request, call offline mode
            if (result == null && request == null) {
                console.log('No data to display');
                app.auth.offlineMode();
                return false;
            }

            // Response data to display
            var dataArr = request.data;
            if (dataArr.length == 0) {
                result = 'No data found';
            }

            if (dataArr.length > 0) {
                result = 'Artefact: ' + dataArr[0].artefact;
            }

            createDisplay(app.auth.guiDisplay, result);
        }

        token = app.auth.token;
        url = "https://auth.emilfolino.se/data?api_key=" + apiKey;
        method = "GET";
        res = app.ajax.fetchCall(null, url, method, callback, token);
    };

    /*
    *
    * User data
    *
    */
    var userData = function() {
        console.log('Display user data');

        var url; // The api url
        var method; // The method
        var res; // The returned result
        var result; // Result element
        var navElem; // The 'ok' nav button


        // Callback from AJAX
        function callback(result, request) {
            // console.log(result);
            // console.log(request);
            // console.log(request.data);
            console.log('userData fetch callback');

            var userArr; // User array
            var userData; // Html user data print

            // If no result & no request, call offline mode
            if (result == null && request == null) {
                console.log('No data to display');
                app.auth.offlineMode();
                return false;
            }

            userData = '';
            userArr = request.data;
            for (var i = 0; i < userArr.length; i++ ) {
                // console.log(userArr[i]);
                userData += 'Id: ' + userArr[i].user_id + '<br/>';
                userData += 'Email: ' + userArr[i].email + '<br/><hr/>';
            }

            result = document.createElement('P');
            result.innerHTML = userData;

            // createDisplay(app.auth.guiDisplay, result);

            navElem = document.createElement('button');
            navElem.className = 'btn1';
            navElem.addEventListener('click', app.auth.guiDisplay);
            navElem.textContent = 'OK';

            if (resultDiv) {
                // Remove previous result and reset
                while (resultDiv.firstChild) {
                    resultDiv.removeChild(resultDiv.firstChild);
                }
                resultDiv.appendChild(result);
                resultDiv.appendChild(navElem);
            }
        }

        url = "https://auth.emilfolino.se/users?api_key="+apiKey;
        method = "GET";
        res = app.ajax.fetchCall(null, url, method, callback, null, true);
    };


    /*
    *
    * Offline mode
    * Informs user that the data cannot be fetched
    *
    */
    var offlineMode = function() {
        console.log('Offline Mode, no data to display');

        var infoDiv; // the info div
        var infoData; // the info data

        // Remove data from GUI display
        while (resultDiv.firstChild) {
            resultDiv.removeChild(resultDiv.firstChild);
        }

        // Append data with info
        infoDiv = document.createElement("DIV");
        infoDiv.className = 'smallContent';

        infoData = document.createElement("P");
        infoData.innerHTML = "Not fetching any data.";

        infoDiv.appendChild(infoData);
        resultDiv.appendChild(infoDiv);
    };


    /*
    *
    * GUI display
    *
    */
    var guiDisplay = function() {
        console.log('The GUI auth display');
        var form; // The form
        var theEmail; // The email
        var thePassw; // The password
        var loginBtn; // The login btn
        var regBtn; // The register btn
        var showLogin; // The login btn
        var loggedOn; // Logged on div
        var loggedOnP; // Logged on P elem
        var user; // Logged on user
        var userBtn; // btn for showing the users
        // var userId; // The user id
        var userDataBtn;// The btn for showing user
        var offlineBtn;// Btn for offlinemode
        var waitWheelOn; // The wait wheel

        waitWheelOn = true; // If to display the wait wheel

        /*
        *
        * Functions
        *
        */

        // Sun wait wheel
        function waitWheel(){
            var waitImg;
            var waitDiv;

            if (waitWheelOn == false) {
                return;
            }

            // Remove data
            while (resultDiv.firstChild) {
                resultDiv.removeChild(resultDiv.firstChild);
            }

            // Append data
            waitDiv = document.createElement("DIV");
            waitDiv.className = 'miniContent';
            waitImg = document.createElement("IMG");
            waitImg.src="img/animations/777.gif";
            waitImg.alt="SunWheel";

            waitDiv.appendChild(waitImg);
            resultDiv.appendChild(waitDiv);
        }

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

        // Add a form for login
        form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "");
        form.className += 'form1';

        // Create an input element for name
        theEmail = document.createElement("input");
        theEmail.setAttribute("type", "text");
        theEmail.setAttribute("email", "email");
        theEmail.setAttribute("placeholder", "email");

        // Create an input element for password
        thePassw = document.createElement("input");
        thePassw.setAttribute("type", "password");
        thePassw.setAttribute("name", "password");
        thePassw.setAttribute("placeholder", "password");

        // Create a login button
        loginBtn = document.createElement("input");
        loginBtn.setAttribute("type", "button");
        loginBtn.setAttribute("value", "Login");
        loginBtn.id += 'login';
        loginBtn.className = 'btn1';

        // Interactivated login button
        // Login the user
        loginBtn.addEventListener("click", function() {
            console.log('Log in the user');
            var userEmail = theEmail.value;
            var userPass = thePassw.value;
            waitWheel();
            app.auth.login(userEmail, userPass);
        });

        // Create a registerbutton
        regBtn = document.createElement("input");
        regBtn.setAttribute("type", "button");
        regBtn.setAttribute("value", "Register");
        regBtn.id += 'reg';
        regBtn.className = 'btn1';

        // Interactivated register button
        // Register the user
        regBtn.addEventListener("click", function() {
            console.log('Register the user');
            var userEmail = theEmail.value;
            var userPass = thePassw.value;
            waitWheel();

            app.auth.register(userEmail, userPass);
        });

        // Create an offline mode button
        offlineBtn = document.createElement("input");
        offlineBtn.setAttribute("type", "button");
        offlineBtn.setAttribute("value", "Off API");
        offlineBtn.id += 'reg';
        offlineBtn.className = 'btn1';

        // Interactivated register button
        // Register the user
        offlineBtn.addEventListener("click", function() {
            console.log('Offline mode');
            // console.log(app.auth.offlineBtn);
            if (app.auth.offlineBtn == false) {
                console.log('Activate offline mode');
                waitWheelOn = false;
                app.auth.offlineBtn = true;
                offlineBtn.classList.add('offlineMode');
                app.ajax.setCacheTime(0);
                // console.log(app.ajax.maxCacheTime);
            }

            else {
                console.log('Activate online mode');
                waitWheelOn = true;
                app.auth.offlineBtn = false;
                offlineBtn.classList.remove('offlineMode');
                app.ajax.setCacheTime(5000);
                // console.log(app.ajax.maxCacheTime);
            }
        });

        // If offline btn is on
        // Set style & turn off the wait wheel
        // console.log(app.auth.offlineBtn);
        if (app.auth.offlineBtn == true) {
            offlineBtn.classList.add('offlineMode');
            waitWheelOn = false;
        }

        // Create a show users btn
        userBtn = document.createElement("input");
        userBtn.setAttribute("type", "button");
        userBtn.setAttribute("value", "Users");
        userBtn.id += 'reg';
        userBtn.className = 'btn1';

        // Interactivated register button
        // Register the user
        userBtn.addEventListener("click", function() {
            console.log('See users');
            waitWheel();

            app.auth.userData();
        });

        // The userId button
        userDataBtn = document.createElement("input");
        userDataBtn.setAttribute("type", "button");
        userDataBtn.setAttribute("value", "Show artefact");
        userDataBtn.id += 'userId';
        userDataBtn.className = 'btn1';

        // Interactivated userId btn
        userDataBtn.addEventListener("click", function() {
            console.log('See user data. ');
            waitWheel();

            app.auth.showData();
        });

        // Show logged on user
        function showUser() {
            loggedOn = document.createElement('DIV');
            loggedOn.className = 'smallContent';
            loggedOnP = document.createElement('P');
            loggedOnP.id = 'theUser';

            user = '-';
            loggedOnP.innerHTML = "";
            if (app.auth.userEmail) {
                user = app.auth.userEmail;
                loggedOnP.innerHTML = "Logged on user: "+user;
            }
            loggedOnP.innerHTML += "<hr>";
            loggedOn.appendChild(loggedOnP);
        }
        showUser();

        // Add to form
        form.appendChild(theEmail);
        form.appendChild(thePassw);
        form.appendChild(loginBtn);
        form.appendChild(regBtn);
        form.appendChild(userBtn);
        // form.appendChild(userId);
        form.appendChild(userDataBtn);
        form.appendChild(offlineBtn);

        // Display the result
        resultDiv = document.createElement('DIV');
        resultDiv.className = 'smallContent';
        resultP = document.createElement('P');
        resultDiv.appendChild(resultP);

        // Add to display
        contentDiv.appendChild(form);
        contentDiv.appendChild(loggedOn);
        contentDiv.appendChild(resultDiv);

        // Append to document
        app.winDisp.content.appendChild(contentDiv);

        // Render menu
        app.menu.showMenu('Auth');
    };

    return {
        register: register,
        login: login,
        userData: userData,
        guiDisplay: guiDisplay,
        token: token,
        userEmail: userEmail,
        showData: showData,
        offlineBtn: offlineBtn,
        offlineMode: offlineMode
      };
  }(auth));

export {auth};
