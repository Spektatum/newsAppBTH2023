/*jshint esversion: 6 */
/*
*
* Displaying the first screen
*
* @return firstDisplay
*
*/
import {app} from './app.js';


var firstDisp = (function() {

    // Get the elements from the window page
    // Make them all-round accessible from the window object
    window.wrapper = document.getElementById('wrapper');
    window.nav = document.getElementById('nav');
    window.rootElement = document.getElementById('root');
    window.mainContainer = document.createElement('main');
    window.mainContainer.className = 'container';
    window.topPart = document.getElementById('topPart');
    window.footer = document.getElementById('theFooter');
    window.cover = document.getElementById('cover');

    /*
    *
    * setDisplay
    * Sets up displays with arguments from the calling object
    *
    * @argument array : value array
    *
    */
    var doDisplay = function() {
        var cover; // Intro cover
        var coverImg; // The cover image
        var navElement; // The enter btn
        var txtElement; // The txt element
        var txtElement2; // The txt element
        var cover2;
        var introPic;

        // var title; // Title of the page
        // var headerImage; // The header image
        // var footerData; // The var for footer data
        // var footerTxt; // The footer text

        console.log('First display');

        // Empty the navigational part
        // window.topPart.innerHTML = '';
        // window.mainContainer.innerHTML = '';
        // window.footer.innerHTML = '';

        // // Control the incoming params
        // if (!valueArr[0]) {
        //   valueArr[0] = '-';
        // }

        // The cover with appended image
        cover = document.createElement('div');
        cover.className = 'theCover';

        coverImg = document.createElement('div');
        coverImg.className = 'coverImg';

        // Add an image
        // Double the size for retina screens
        var pathFromRoot;
        pathFromRoot = 'img/logo/black/';

        introPic = document.createElement('PICTURE');
        var sc01 = document.createElement("SOURCE");
        sc01.srcset = pathFromRoot+'logo2021C250.webP';
        sc01.type="image/webp";
        sc01.media="(max-width: 350px)";
        var sc02 = document.createElement("SOURCE");
        sc02.srcset = pathFromRoot+'logo2021C250.jpeg';
        sc02.type="image/jpg";
        sc02.media="(max-width: 350px)";
        var sc1 = document.createElement("SOURCE");
        sc1.srcset = pathFromRoot+'logo2021C500.webP';
        sc1.type="image/webp";
        sc1.media="(max-width: 720px)";
        var sc2 = document.createElement("SOURCE");
        sc2.srcset = pathFromRoot+'logo2021C500.jpeg';
        sc2.type="image/jpg";
        sc2.media="(max-width: 720px)";
        var sc3 = document.createElement("SOURCE");
        sc3.srcset = pathFromRoot+'logo2021C500.webP';
        sc3.type="image/webp";
        sc3.media="(max-width: 1200px)";
        var sc4 = document.createElement("SOURCE");
        sc4.srcset = pathFromRoot+'logo2021C500.jpeg';
        sc4.type="image/jpg";
        sc4.media="(max-width: 1200px)";
        var sc5 = document.createElement("SOURCE");
        sc5.srcset = pathFromRoot+'logo2021C700.webP';
        sc5.type="image/webp";
        sc5.media="(min-width: 1201px)";
        var sc6 = document.createElement("SOURCE");
        sc6.srcset = pathFromRoot+'logo2021C700.jpeg';
        sc6.type="image/jpg";
        sc6.media="(min-width: 1201px)";
        // Max width 1900

         // data1.textContent = introPic;
         var img = document.createElement("IMG");
         img.src=pathFromRoot+"logo2021C700.jpeg";
         img.alt="SpektatumDesign";

         introPic.appendChild(sc01);
         introPic.appendChild(sc02);
         introPic.appendChild(sc1);
         introPic.appendChild(sc2);
         introPic.appendChild(sc3);
         introPic.appendChild(sc4);
         introPic.appendChild(sc5);
         introPic.appendChild(sc6);
         introPic.appendChild(img);

         coverImg.appendChild(introPic);

        // cover2 = document.createElement('div');
        // coverImg.className = 'cover2';

        function fadeOutEffect() {
        var fadeTarget = cover;
        var fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.05;
            } else {
                clearInterval(fadeEffect);
                cover.remove();
                coverImg.remove();
            }
        }, 100);
        }

        // document.getElementById("target").addEventListener('click', fadeOutEffect);

        navElement = document.createElement('button');
        navElement.addEventListener('click', function() {
            // window.wrapper.appendChild(cover2);
            setTimeout(function(){
                // window.wrapper.classList.remove('theCover');
                // window.wrapper.classList.remove('coverImg');
                fadeOutEffect();
                // cover.remove();
                // coverImg.remove();

                console.log('Show app');
            }, 1000);

            // cover.remove();
            // coverImg.remove();
            console.log('intro page');
            });
        navElement.addEventListener('click', app.introP.displayApp);
        navElement.textContent = ' enter ';
        navElement.className = 'navIntro';

        txtElement = document.createElement('h1');
        txtElement.textContent = 'Spektatum Web Software';

        txtElement2 = document.createElement('p');
        txtElement2.textContent = 'Design tailored for you';

        cover.appendChild(coverImg);
        cover.appendChild(txtElement);
        cover.appendChild(txtElement2);
        cover.appendChild(navElement);

        window.wrapper.appendChild(cover);

        console.log('The cover');


        // The header
        // title = document.createElement('h1');
        // title.className = 'title';
        // title.textContent = valueArr[0];
        //
        // headerImage = document.createElement('img');
        // headerImage.src = 'img/spektatum_banner9_800px_opt.jpg';
        // headerImage.className = 'imgHeader2';
        // headerImage.alt = 'Force';
        //
        // // The footer
        // footerData = document.createElement('h2');
        // footerData.className = 'title';
        // footerData.textContent = 'Creating experiences';
        //
        // footerTxt = document.createElement('p');
        // footerTxt.className = 'footerTxt';
        // footerTxt.textContent = 'Copyright Ylva Sjölin 2020';
        //
        // // Append data to the document
        // window.topPart.appendChild(headerImage);
        // window.topPart.appendChild(title);
        //
        // // Append footer data
        // window.footer.appendChild(footerData);
        // window.footer.appendChild(footerTxt);
    };

    return {
        doDisplay: doDisplay
      };
  }(firstDisp));

export {firstDisp};
