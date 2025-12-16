/*jshint esversion: 6 */

import {app} from './app.js';

var menu = (function() {
    console.log('Loading menu');
    var showNav; // Show navigation menu
    var navDropDown; // Navigation drop down menu

    /*
    *
    * ANIMATED BTN
    *
    */
    var menuBtn = function(dropDownBtn) {
        var bar1; // Bars for dropdown icon
        var bar2;
        var bar3;

        // Create the btn with bars
        dropDownBtn = document.createElement('button');
        dropDownBtn.className = 'dropDownBtn';

        bar1 = document.createElement('div');
        bar1.className += 'bar1';
        bar2 = document.createElement('div');
        bar2.className += 'bar2';
        bar3 = document.createElement('div');
        bar3.className += 'bar3';

        dropDownBtn.appendChild(bar1);
        dropDownBtn.appendChild(bar2);
        dropDownBtn.appendChild(bar3);
        dropDownBtn.setAttribute('aria-label', 'main navigation');

        dropDownBtn.addEventListener('click', function() {toggleNav(this);});

        // The drop-down menu functionality
        // & the X btn that shows the drop-down menu
        function toggleNav(x) {
            // console.log(x);
            x.classList.toggle("change");
        }

        return dropDownBtn;
    };


    /*
    *
    * Close menu
    * Accessible from other modules
    *
    */
    var closeMenu = function() {
        // console.log("Close the main menu");
        // app.menu.navDropDown.style.height = 0;
        app.menu.navDropDown.classList.add('closedNav');
        app.menu.navDropDown.classList.remove('openNav');
        app.menu.showNav = false;
    };

    /*
    *
    * The navigation list, toggle visibility
    *
    */
    function toggleNav() {
        // console.log('Navigation control');
        // console.log('Show nav: '+app.menu.showNav);

        // If it is showing, close it
        if (app.menu.showNav === true) {
            app.menu.closeMenu();
        } else {
            // app.menu.navDropDown.style.display = "block";
            // app.menu.navDropDown.style.height = "325px";
            app.menu.showNav = true;
            app.menu.navDropDown.classList.remove('closedNav');
            app.menu.navDropDown.classList.add('openNav');

            // Close the other open menus
            app.newsApi.showNav = false;
            if (app.newsApi.newsMenu) {
                  // app.newsApi.newsMenu.style.height = 0;
                  app.newsApi.newsMenu.classList.add('closedNewsMenu');
                  app.newsApi.newsMenu.classList.remove('openNewsMenu');

            }
        }
    }

    /*
    *
    * SHOW MENU vertical / horizontal
    *
    */
    var showMenu = function(selected) {

      console.log("Show menu: " + selected);

        // Empty the menu
        window.nav.innerHTML = '';
        while (app.winDisp.nav.firstChild) {
            console.log('Clearing navigation');
            app.winDisp.nav.removeChild(app.menu.navDropDown.lastChild);
        }

        // Setup
        var topNav; // Top navigation, appends to the index structure
        var bottomNav; // Bottom navigation
        var bottomNavBtn; // Bottom navigation btn, to append
        var navElements; // Storage of navigation objects
        var navElement; // Var for the navigation elements
        var navTitle; // nav title
        var text; // Variable for storing navigation text
        var webLink; // Link to visual design
        var linkTxt; // Link to text
        var dropDownBtn; // The dropdown btn
        var navElement2; // The navigation element
        var navMenuBtn; // menu btn
        var navMenuList; // nav menu
        var closeMenu; // Close the main menu


        /*
        *
        * The navigation menu, in object form
        *
        */
        navElements = [
            // {name: 'Intro', class: 'change_histor', nav: app.introP.displayApp},
            // {name: 'About', class: 'burst_mode', nav: app.about.showAbout},
            {name: 'Page1', class: 'burst_mode', nav: app.page1.showPage},
            // {name: 'AjaxTest', class: 'burst_mode', nav: app.ajaxTest.display},
            // {name: 'AjaxTest2', class: 'burst_mode', nav: app.ajaxTest2.display},
            // {name: 'AjaxSample', class: 'burst_mode', nav: app.ajaxSample.showData},
            // {name: 'MapTest', class: 'burst_mode', nav: app.mapTest.display},
            // {name: 'Auth', class: 'burst_mode', nav: app.auth.guiDisplay},
            {name: 'News', class: 'burst_mode', nav: function() {
                app.newsApi.showData('tech');
            }},
            // {name: 'Weather', class: 'burst_mode', nav: app.theWeather.display},
        ];


        /*
        *
        * Animated menu button
        *
        */
        dropDownBtn = app.menu.menuBtn(dropDownBtn);
        app.winDisp.nav.appendChild(dropDownBtn);


        /*
        *
        * The navigation list, vertical
        *
        */
        app.menu.navDropDown = document.createElement('div');
        app.menu.navDropDown.className = 'navDropDown';

        dropDownBtn.appendChild(app.menu.navDropDown);
        navElements.forEach(function(element) {
            // Create the link elements
            navElement2 = document.createElement('button');

            // Add an event listener to the element
            // Calling the naviation link stored in each nav element
            navElement2.addEventListener('click', element.nav);
            navElement2.textContent = element.name;
            navElement2.className = 'navElem2';

            // Add a class to selected links
            if (selected === element.name) {
              navElement2.className = 'active2';
            }
            // Adding the navigation to the page
            app.menu.navDropDown.appendChild(navElement2);
        });

        // Set interactivity
        dropDownBtn.addEventListener('click', app.menu.toggleNav);


        // /*
        // *
        // * The bottom navigation list, vertical
        // *
        // */
        // bottomNavBtn = app.menu.menuBtn(bottomNavBtn);
        //
        // while (app.winDisp.navPanel.firstChild) {
        //     app.winDisp.navPanel.removeChild(app.winDisp.navPanel.firstChild);
        // }
        // app.winDisp.navPanel.appendChild(bottomNavBtn);
        //
        // bottomNav = document.createElement('div');
        // bottomNav.className = 'bottomNav';
        // while (app.winDisp.nav2.firstChild) {
        //     app.winDisp.nav2.removeChild(navBottom.firstChild);
        // }
        // // Create the list
        // navElements.forEach(function(element) {
        //     // Create the link elements
        //     navElement2 = document.createElement('button');
        //
        //     // Add an event listener to the element
        //     // Calling the naviation link stored in each nav element
        //     navElement2.addEventListener('click', element.nav);
        //     navElement2.textContent = element.name;
        //     navElement2.className = 'navElem2';
        //
        //     // Add a class to selected links
        //     if (selected === element.name) {
        //       navElement2.className = 'active2';
        //     }
        //
        //     // Adding the navigation to page
        //     bottomNav.appendChild(navElement2);
        // });
        // app.winDisp.nav2.appendChild(bottomNav);
        //
        // bottomNavBtn.addEventListener('click', function() {toggleNav2(bottomNav);});
        //
        // // The drop-down menu functionality
        // // & the X btn that shows the drop-down menu
        // function toggleNav2(x) {
        //     // console.log(x);
        //     x.classList.toggle("change2");
        // }

        /*
        *
        * The navigation list, horizontal
        *
        */
        // navElements.forEach(function(element) {
        //
        //     // Create the link elements
        //     navElement = document.createElement('button');
        //
        //     // Add an event listener to the element
        //     // Calling the naviation link stored in each nav element
        //     navElement.addEventListener('click', element.nav);
        //     navElement.textContent = element.name;
        //     navElement.className = 'navElem';
        //
        //     // Add a class to selected links
        //     // If selected or not is decided by the specific app-js script
        //     if (selected === element.name) {
        //       navElement.className = 'active';
        //     }
        //
        //     /**
        //     *
        //     // Adding the icons from the css sheet materializecss
        //     // Using classname set in the array of nav elems :
        //     //  w correcsponding pic
        //     // https://materializecss.com/icons.html
        //     icon = document.createElement("i");
        //     icon.className = "material-icons";
        //     icon.textContent = element.class;
        //     navElement.appendChild(icon);
        //
        //     // Adding the text
        //     text = document.createElement("span");
        //     text.className = "icon-text";
        //     text.textContent = element.name;
        //     navElement.appendChild(text);
        //     */
        //
        //     // Adding the navigation to page
        //     window.nav.appendChild(navElement);
        //
        //   });

          // Create a nav pic in the corner
          // navTitle = document.createElement('div');
          // navTitle.className = 'cornerPict';
          // navTitle.textContent = '';
          // window.nav.appendChild(navTitle);

          // window.nav.appendChild(dropDownBtn);

          // console.log(window.document);

      }; // End showMenu

    return {
        showMenu: showMenu,
        menuBtn: menuBtn,
        showNav: showNav,
        navDropDown: navDropDown,
        closeMenu: closeMenu,
        toggleNav: toggleNav
      };
  }(menu));

export {menu};
