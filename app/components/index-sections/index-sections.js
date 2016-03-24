'use strict';

var APP = window.APP = window.APP || {};

APP.indexSections = (function(){

    var bindEventsToUI = function() {
        // ...
    };

    var init = function() {
        console.log('APP.indexSections');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());