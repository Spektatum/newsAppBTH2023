
// JavaScript Document

//Object literal, the control panel of the system

var Main = {

	init : function(){

        var topPart;
        var data;
        var pic;

        topPart = document.getElementById('topPart');

        data = document.createElement('DIV');
        data.className = 'theCover';
        data.textContent = 'This browser version is not supported. ';

        pic = document.createElement('img');
        pic.src = "img/logo/v3.png";
        pic.alt = "Spektatum Logo";

        topPart.appendChild(data);
        topPart.appendChild(pic);
	}

};

 window.addEventListener("load",Main.init);
