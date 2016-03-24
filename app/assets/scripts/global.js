'use strict';

var APP = window.APP = window.APP || {};

APP.global = (function(){

    var initGlobalComponents = function() {

    };

    var initPageComponents = function() {
        APP.core.controller.init();
    };

    var init = function() {

        /**
        * initialize global components
        */
        initGlobalComponents();

        /**
        * initialize components for the current page
        */
        initPageComponents();
    };

    /**
    * interfaces to public functions
    */
    return {
        init: init
    };

}());

$( document ).ready( APP.global.init );