/*jshint esversion: 6 */

import {app} from './app.js';

/*
* The cover
*
* Fading out a cover
*
*/
var cover = (function() {
    var theCover;

    // Get the cover from the window page
    window.cover = document.getElementById('cover');

    /*
    *
    * Set cover
    *
    */
    var setCover = function() {
        theCover = document.createElement('div');
        theCover.className = 'theCover';
        window.cover.appendChild(theCover);
        console.log('Setting the cover & fading');

        // window.cover.classList.add('noCover');

        function fadeOutEffect() {
            var fadeTarget = theCover;
            var fadeEffect = setInterval(function () {
                if (!fadeTarget.style.opacity) {
                    fadeTarget.style.opacity = 1;
                }
                if (fadeTarget.style.opacity > 0) {
                    fadeTarget.style.opacity -= 0.05;
                } else {
                    clearInterval(fadeEffect);
                    theCover.remove();
                    // coverImg.remove();
                }
            }, 300);
        }

        var removeCover = setInterval(function () {
          fadeOutEffect();
        }, 2000);

    };

    return {
        setCover: setCover,
      };
  }(cover));

export {cover};
