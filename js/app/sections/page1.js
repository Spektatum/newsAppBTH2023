/*
* Closure pattern
* View for app: about
* Ylvali 2019
*
*
*/

/*jshint esversion: 6 */

import {app} from './../app.js';

var page1 = (function() {

    console.log('Loading page1');
    /*
    * Closure pattern
    * - Show the about topic in app display -
    *
    */

    var showPage = function() {
      console.log('Displaying the page1');

      // Variables
      var displayArr; // The info to be sent to the display
      var data; // The info displayed on the page
      var text; // The text to be displayed
      var textFile; // The content txt file
      var imgFile; // picture to include
      var h2Data; // The header data
      var brLine;
      var video; // Video
      var source; // Source for the video
      var videoBtn; // Video button
      var topSet; // The variable for setting screen focus
      var theVersion; // The version nr

      var navElem; // navigation element
      var navElem2;
      var navElem3;
      var titleP; // title element
      var title2; // title element
      var p1; // Paragraph element
      var p2;
      var p3;
      var p4;
      var header1; // Header txt element
      var header2;

      /*
      *
      * Content
      *
      */
      // Load new section : scroll to top & empty main
      app.winDisp.loadNewSection();

      // Load the content from file
      theVersion = '1.9';
      data = document.createElement('DIV');
      data.className = 'contentTxt';


      // text = document.createElement('DIV');
      // textFile = '';
      // if (theVersion) {
      //     textFile = "js/app/sections/contentFiles/page1.php?v="+theVersion;
      // }
      // app.setTxt.addData(text, textFile);

      // text.innerHTML ="<h2> News reports </h2>";
      // text.innerHTML ="<p> News reports </h2>";

      // Text paragraph wrapper
      text = document.createElement('DIV');
      text.className = 'paragraphWrap';

      // Text div1
      p3 = document.createElement('DIV');
      p3.className = 'fullP';
      titleP = document.createElement('H1');
      titleP.innerHTML = 'World news';
      p3.appendChild(titleP);

      // Text div2
      p1 = document.createElement('DIV');
      p1.className = 'p1';
      header1 = document.createElement('DIV');
      header1.innerHTML = '<h2>News reports</h2>';
      header1.innerHTML += '<p> The headlines of world news. </p>';
      header1.innerHTML += '<p> Links to the sources. </p>';
      header1.innerHTML += '<p> "Over 40 000 sources, in 50+ countries" </p>';
      // header1.innerHTML += '<p> Provided by: ';
      header1.innerHTML += '<p> Loading news from theNewsApi </p>';
      header1.innerHTML += '<a href="https://www.thenewsapi.com/" target="_blank" alt="theNewsApi">theNewsApi website</a><br/><br/>';

      // Create the link elements
      navElem = document.createElement('button');
      navElem.addEventListener('click', function() {
          app.newsApi.showData('tech'); }
      );
      navElem.textContent = 'See news';
      navElem.className = 'btn1';

      // Append the elements to paragraph1
      p1.appendChild(header1);
      p1.appendChild(navElem);

      /// Text div3
      p2 = document.createElement('DIV');
      p2.className = 'p1';
      header2 = document.createElement('DIV');
      header2.innerHTML = '<h2> Web technology </h2>';
      header2.innerHTML += '<p> Web technology by Spektatum.</p>';
      header2.innerHTML += '<p> SPA - single page application.</p>';
      header2.innerHTML += '<p> Loading news via API. </p>';
      // Create the link elements
      // navElem2 = document.createElement('button');
      // navElem2.addEventListener('click', app.theWeather.display);
      // navElem2.textContent = 'Weather';
      // navElem2.className = 'btn1';
      navElem3 = document.createElement('a');
      navElem3.href = 'https://www.spektatum.com';
      navElem3.target = '_blank';
      navElem3.innerHTML = 'Spektatum website';

      p2.appendChild(header2);
      p2.appendChild(navElem3);

      // Append all to the text document
      p4 = document.createElement('DIV');
      p4.className = 'fullP';
      title2 = document.createElement('P');
      title2.innerHTML = '<h2>Spektatum is NOT responsible for the news content.</h2>';
      // Create the link elements
      // navElem3 = document.createElement('a');
      // navElem3.href = 'https://www.spektatum.com';
      // navElem3.target = '_blank';
      // navElem3.innerHTML = 'Spektatum website';
      // navElem3.className = 'btn1';

      p4.appendChild(title2);
      // p4.appendChild(navElem3);


      // Append all to the text document
      text.appendChild(p3);
      text.appendChild(p1);
      text.appendChild(p2);
      text.appendChild(p4);



      // Append the data to the view
      data.appendChild(text);

      app.winDisp.content.appendChild(data);

      // Render menu
      app.menu.showMenu('Page1');

      // Set screen focus
      // topSet = window.rootElement.offsetTop - 55;
      // window.scrollTo(0, topSet);

    }; // End show offers

    // API: returning specific functionality
    return {
        showPage: showPage
      };
  }(page1));

export {page1};
