'use strict';

var APP = window.APP = window.APP || {};

APP.home = (function(){

    var init = function() {
        console.log('APP.home.init');
    };
    
    /*-
     Public functions
    -*/
    return {
        init: init
    };

}());