/*jshint esversion: 6 */

import {app} from './app.js';

/*
* MAIN DISPLAY
*
* Displaying the main elements
*
*/
var winDisp = (function() {

    var nav; // The navigation
    var navPanel; // The panel navigation, bottom
    var nav2; // The navigation, bottom
    var content; // The content
    var footer; // The footer
    var cover; // The cover
    var header; // The header

    // Get the elements from the window page
    // To create a dynamic structure
    nav = document.getElementById('nav');
    nav2 = document.getElementById('navBottom');
    header = document.getElementById('header');
    content = document.getElementById('content');
    footer = document.getElementById('theFooter');
    cover = document.getElementById('cover');

    /*
    *
    * Navigation panel
    *
    */
    navPanel = document.createElement('div');
    navPanel.className = 'navPanel';
    footer.appendChild(navPanel);
    console.log('Nav panel');

    /*
    *
    * Header
    *
    */
    header.className = 'header';
    // nav.appendChild(header);
    console.log('Header');

    /*
    *
    * Empty the display
    *
    */
    var emptyDisplay = function() {
        // Remove content
        while (app.winDisp.content.firstChild) {
            app.winDisp.content.removeChild(app.winDisp.content.firstChild);
        }
    };


    /*
    *
    * Load new section
    * Scroll to top and empty the main container
    *
    */
    var loadNewSection = function() {
        // Scroll to top
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

        // Empty the content
        app.winDisp.emptyDisplay();
    };


    /*
    *
    * SET DISPLAY
    *
    */
    var setDisplay = function() {
        var title; // Title of the page
        var subTitle; // The sub title of page
        var headerImage; // The header image
        var footerData; // The var for footer data
        var footerTxt; // The footer text
        var headingDiv; // the heading
        var headingDivTxt; // the heading txt
        var introPic; // The intro picture
        // var headerImage; // the heading

        console.log('Setting up the display');

        // Add menu
        app.menu.showMenu();

        // Empty display
        app.winDisp.emptyDisplay();

        // The footer
        // app.winDisp.footer.innerHTML = '';
        footerData = document.createElement('h2');
        footerData.className = 'title';
        footerData.textContent = 'Creating experiences';

        footerTxt = document.createElement('p');
        footerTxt.className = 'footerTxt';
        footerTxt.textContent = 'Copyright Ylva Sjölin 2020 - 2022';

        // Append data to the document
        // window.topPart.appendChild(headingDiv);
        // window.topPart.appendChild(title);
        // window.topPart.appendChild(subTitle);

        // Append footer data
        // app.winDisp.footer.appendChild(footerData);
        app.winDisp.footer.appendChild(footerTxt);

       };

    return {
        setDisplay: setDisplay,
        emptyDisplay: emptyDisplay,
        loadNewSection: loadNewSection,
        navPanel: navPanel,
        nav: nav,
        nav2: nav2,
        content: content,
        footer: footer
      };
  }(winDisp));

export {winDisp};
