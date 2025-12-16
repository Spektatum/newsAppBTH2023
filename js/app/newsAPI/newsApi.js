/*
* Closure pattern
* Yso 2020
*
* Creating a news application from an API
* Usng the AJAX module construct
*
*/

/*jshint esversion: 6 */

import {app} from './../app.js';

var newsApi = (function() {

    console.log('Loading newsApi');
    var selectedGenre; // Selected news genre
    var showNav; // Show nav list, set to true / false
    var newsMenu; // The news menu
    var dropDownBtn; // Btn for the dropdown menu
    var newsElem; // The news element


    /*
    *  Create menu btn
    *
    */
    var menuBtn = function() {
        // Clear menu
        console.log('Menu btn');
        app.menu.showMenu('NewsApi');

        app.newsApi.dropDownBtn = app.menu.menuBtn(app.newsApi.dropDownBtn);
        app.newsApi.dropDownBtn = document.createElement('button');
        app.newsApi.dropDownBtn.className = 'dropDownBtn2';
        app.newsApi.dropDownBtn.innerHTML = 'News';

        app.winDisp.nav.appendChild(app.newsApi.dropDownBtn);
    };

    /*
    *  Close navigaion menu
    *
    */
    var closeNav = function() {
        console.log('Close the navigation');
        // app.newsApi.newsMenu.style.height = 0;
        app.newsApi.newsMenu.classList.add('closedNewsMenu');
        app.newsApi.newsMenu.classList.remove('openNewsMenu');
        app.newsApi.showNav = false;
        app.newsApi.dropDownBtn.style.color = 'black';
    };

    /*
    *  Special news menu
    *
    */
    var specialMenu = function() {
        // News elem elements
        // var newsElem;
        var newsP;
        var newsSection;
        var navElements;
        var navElement;

        var dropDownBtn; // Btn for the dropdown menu

        console.log('Create the news menu');
        app.newsApi.showNav = false; //Start as invisible

        newsP = document.createElement('P');
        app.newsApi.newsMenu = document.createElement('div');
        app.newsApi.newsMenu.className = 'navDropDown';
        // app.newsApi.newsMenu.className += 'newsMenu';
        app.newsApi.newsMenu.classList.add('newsMenu');
        app.newsApi.menuBtn();

        navElements = [
            {name: 'general', class: 'burst_mode', nav: function() {
              app.newsApi.showData('general');
              closeNav();
            }},
            {name: 'business', class: 'change_histor', nav: function() {
              app.newsApi.showData('business');
              closeNav();
            }},
            {name: 'tech', class: 'burst_mode', nav: function() {
              app.newsApi.showData('tech');
              closeNav();
            }},
            {name: 'science', class: 'burst_mode', nav: function() {
              app.newsApi.showData('science');
              closeNav();
            }},
            {name: 'politics', class: 'burst_mode', nav: function() {
              app.newsApi.showData('politics');
              closeNav();
            }},
            {name: 'sports', class: 'burst_mode', nav: function() {
              app.newsApi.showData('sports');
              closeNav();
            }},
            {name: 'entertainment', class: 'burst_mode', nav: function() {
              app.newsApi.showData('entertainment');
              closeNav();
            }},
            {name: 'food', class: 'burst_mode', nav: function() {
              app.newsApi.showData('food');
              closeNav();
            }}
        ];

        navElements.forEach(function(element) {
            // Create the link elements
            navElement = document.createElement('button');

            // Add an event listener to the element
            // Calling the naviation link stored in each nav element
            navElement.addEventListener('click', element.nav);
            navElement.textContent = element.name;
            navElement.className = 'navElem2';
            navElement.classList.add('navNews');

            // Add a class to selected links
            if (selectedGenre === element.name) {
              navElement.className = 'active2';
            }

            // Adding the navigation to page
            app.newsApi.newsMenu.appendChild(navElement);
        });

        /*
        *
        * The navigation list, toggle visibility
        *
        */
        function showNav() {
            console.log('Displaying the news navigation');
            console.log(app.newsApi.showNav);
            if (app.newsApi.showNav === true) {
                // navDropDown.style.display = "none";
                // app.newsApi.newsMenu.style.height = 0;
                // app.newsApi.showNav = false;
                app.newsApi.closeNav();
            } else {
                // navDropDown.style.display = "block";
                // app.newsApi.newsMenu.style.height = "325px";
                app.newsApi.showNav = true;
                app.newsApi.dropDownBtn.style.color = 'white';
                app.newsApi.newsMenu.classList.remove('closedNewsMenu');
                app.newsApi.newsMenu.classList.add('openNewsMenu');

                // Close main menu
                // app.menu.navDropDown.style.height = 0;
                app.menu.navDropDown.classList.add('closedNav');
                app.menu.navDropDown.classList.remove('openNav');
                app.menu.showNav = false;
            }
        }

        // The interactivity
        app.newsApi.dropDownBtn.addEventListener('click', function() {showNav();});

        // Append to document
        app.newsApi.dropDownBtn.appendChild(app.newsApi.newsMenu);
    };

    /*
    *  Print syntax
    *  Specific for the API of choice
    *  The callback to the ajax, on success
    *
    */
    var printSyntax = function(theData) {
        console.log('Printing the newsApi');
        console.log(theData);

        // Data variables
        var title;
        var content;
        var imgUrl;
        var url;
        var description;
        var snippet;
        var source;
        var timePublished;
        var newsId;

        // News elem elements
        var newsP;
        var newsSection;

        newsP = document.createElement('P');

        newsSection = '<div class = "fullP">';
        newsSection += '<h1> News </h1> <hr>';
        newsSection += '<h3> Category: '+selectedGenre+'</h3>';
        newsSection += '<p><i>Choose category (pink menu top right)</i></p><br/>';
        newsSection += '<a href="https://www.thenewsapi.com/" target="_blank" alt="theNewsApi"> News from: theNewsApi </a>';
        newsSection += '<p><b> SPEKTATUM IS NOT RESPONSIBLE FOR THE NEWS CONTENT <b></p>';
        newsSection += '</div>';

        // Security
        // https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
        function htmlEntities(str) {
          // return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
          return String(str).replace(/</g, ' ').replace(/>/g, ' ');
        }

        // Process the incoming JSON object
        // Controlling the data
        if (theData) {
            theData.forEach((element, index) => {
                if (element instanceof Object) {
                    console.log('Security datatype control: Object' + element );

                    if (typeof element.title === "string") {
                      title = htmlEntities(element.title);
                    }

                    if (typeof element.description === "string") {
                      description = htmlEntities(element.description);
                      // description = htmlEntities(' &&& >>> test');
                    }
                    //
                    // if (typeof element.content === "string") {
                    //   content = htmlEntities(element.content);
                    // }

                    if (typeof element.image_url === "string") {
                      imgUrl = htmlEntities(element.image_url);
                    }

                    if (typeof element.url === "string") {
                      url = htmlEntities(element.url);
                    }

                    if (typeof element.source === "string") {
                      source = htmlEntities(element.source);
                    }

                    if (typeof element.uuid === "string") {
                      newsId = htmlEntities(element.uuid);
                    }

                    if (typeof element.published_at === "string") {
                      timePublished = htmlEntities(element.published_at);

                    }

                    // url = element.url;
                    // source = element.source;
                    // timePublished = element.published_at;
                    // snippet = element.snippet;
                }

                newsSection += "<div class = 'fullP'>";
                newsSection += "<hr><br/><h2>"+title+"</h2>";

                newsSection += "<div class='imgBox1'>";
                newsSection += "<img src='"+imgUrl+"' alt='newsImg'>";
                // newsSection += "<p>"+snippet+"</p>";
                newsSection += "<p> Source: "+source+"</p>";
                // newsSection += "<p> Time: "+timePublished+"</p>";
                // newsSection += "<p> News id: "+newsId+"</p>";
                newsSection += "</div>";
                newsSection += '<p>"'+description+'"</p>';
                // newsSection += "<p>"+timePublished+"</p>";
                newsSection += "<a href='"+url+"' target='_blank'> Visit site </a>";
                newsSection += "<hr><br/>";
                newsSection += "</div>";
            });
        }

        if (!theData) {
            newsSection += "<div class='fullP'>";
            newsSection += "No data to display. <br/><br/>Control the internet connection.<br/>";
            newsSection += "<br/>The max amount of news per day might have been reached (demo version).<br/>";
            newsSection += "<br/>Contact Spektatum if the problem persists.<br/>";
            newsSection += "</div>";
        }

        // Add new news section, and remove the previous
        newsP.innerHTML = newsSection;
        while (app.newsApi.newsElem.firstChild) {
            app.newsApi.newsElem.removeChild(app.newsApi.newsElem.firstChild);
        }
        app.newsApi.newsElem.appendChild(newsP);

        // Add data to the content page
        // Remove any previous data
        while (app.ajaxView.contentDiv.firstChild) {
            app.ajaxView.contentDiv.removeChild(app.ajaxView.contentDiv.firstChild);
        }

        app.ajaxView.contentDiv.appendChild(app.newsApi.newsElem);

        // The option of returning a string that will be pasted directly to
        // the content
        return null;
    };

    var waitWheel = function() {
          var waitImg;
          var waitDiv;

          // Append data
          waitDiv = document.createElement("DIV");
          waitDiv.className = 'waitWheel';

          // Remove data
          while (waitDiv.firstChild) {
              waitDiv.removeChild(waitDiv.firstChild);
          }

          // Add img
          waitImg = document.createElement("IMG");
          waitImg.src="img/animations/777.gif";
          waitImg.alt="SunWheel";
          waitImg.className = 'waitWheel';

          waitDiv.appendChild(waitImg);

          app.ajaxView.contentDiv.appendChild(waitDiv);
    };

    var showData = function(genre = 'tech') {
      console.log('Loading NewsAPI');
      var ajaxValues;
      var menuName;
      var url;
      var method;
      var token;
      var useCache;
      ajaxValues = [url, method, token, useCache];

      // Set the menu name
      menuName = 'News';

      // Create the news element
      app.newsApi.newsElem = document.createElement('div');

      // Create ajax call
      selectedGenre = genre;
      console.log('Genre: '+genre);
      // url = "https://inshortsapi.vercel.app/news?category="+genre;
      token = "flNYe3k09RL4z7nWxUPhSseoqUycwmlm7JMXtRVl";
      url = "https://api.thenewsapi.com/v1/news/all?api_token="+token+"&categories="+genre+"&language=en&limit=5";
      method = "GET";
      token = null;
      useCache = true;
      ajaxValues = [url, method, token, useCache];

      // Load the api Data
      app.ajaxView.display(menuName, app.newsApi.printSyntax, ajaxValues);

      // Set waitwheel
      waitWheel();

      // Create the menu
      specialMenu();

    }; // End show data

    // API: returning specific functionality
    return {
        showData: showData,
        printSyntax: printSyntax,
        showNav: showNav,
        newsMenu: newsMenu,
        menuBtn: menuBtn,
        dropDownBtn: dropDownBtn,
        newsElem: newsElem,
        closeNav: closeNav
      };
  }(newsApi));

export {newsApi};
