/*jshint esversion: 6 */

/*
*  BASE MODULE
*
* All the app parts as modules w functional variables (JS object version)
* are saved to a specific app JS-object, to be imported in the app files
* to access the functionality of the app.
*
*/
// Base
import {winDisp} from './winDisp.js'; // window display
import {firstDisp} from './firstDisp.js'; // window display
import {cover} from './cover.js'; // cover
import {menu} from './menu.js'; // menu
import {setTxt} from './setTxt.js'; // set text
import {ajax} from './ajax.js'; // ajax
import {ajaxInterface} from './ajaxInterface.js'; // ajax
import {ajaxView} from './ajaxView.js'; // ajax
import {ajaxSample} from './sections/ajaxSample.js'; // ajax

// Extra functionality
// import {theMap} from './map/map.js'; // map
// import {mapTest} from './map/mapTest.js'; // mapTest
// import {auth} from './auth/auth.js'; // authentication test
import {newsApi} from './newsAPI/newsApi.js'; // mapTest
// import {theMapW} from './weather/map.js'; // map
// import {theWeather} from './weather/theWeather.js'; // mapTest

// GUI sections
// import {introP} from './sections/introP.js'; // intro section
// import {about} from './sections/about.js'; // about section
import {page1} from './sections/page1.js'; // section
// import {ajaxTest} from './sections/ajaxTest.js'; // ajax testing section
// import {ajaxTest2} from './sections/ajaxTest2.js'; // ajax testing section

/*
* THE APP OBJECT
*
* Returns all imported js modules
*
*/
var app = (function() {
    console.log('Building the app ');
    

    return {
        // customStyle: customStyle,
        cover: cover,
        winDisp: winDisp,
        firstDisp: firstDisp,
        // about: about,
        menu: menu,
        ajax: ajax,
        // theMap: theMap,
        // mapTest: mapTest,
        // introP: introP,
        setTxt: setTxt,
        page1: page1,
        // ajaxTest: ajaxTest,
        // ajaxTest2: ajaxTest2,
        ajaxInterface: ajaxInterface,
        ajaxView: ajaxView,
        ajaxSample: ajaxSample,
        // auth: auth,
        newsApi: newsApi,
        // theMapW: theMapW,
        // theWeather: theWeather,
      };
  }(app));


/*
* START THE APP
*
*/

// Set the cover
// app.cover.setCover();

// app.firstDisp.doDisplay();

// Set the display
app.winDisp.setDisplay();

// app.menu.showMenu('Intro');
app.page1.showPage();

// -- Export the app --
export {app};
