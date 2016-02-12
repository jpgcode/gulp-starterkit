// Simple router/controller that is designed to automatically fire the init()
// methods for pages and components. The script queries the DOM for all elements
// that contain the 'data-action' attribute on the parent element.

// For example, let's say we have a component with the following HTML:
//  <div class="global-header" data-action="globalHeader">

// The controller will parse the data-action attribute value and invoke the
// method APP.globalHeader.init() within the JavaScript file associated with
// the component

// If you want to manually invoke the init method for a component,
// remove the data-action attribute from the HTML

// test mario

'use strict';

var APP = window.APP = window.APP || {};

APP.core = {};

APP.core.controller = (function () {

    var _route = '';

    var setRoute = function (strVal) {
        _route = strVal;
    };

    var getRoute = function () {
        return _route;
    };


    var locateRoutableElementsInDOM = function (attribute) {
        var matchingElements = [],
            allElements = document.getElementsByTagName('*'),
            i, n;
        for (i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute(attribute) !== null) {
                // Element exists with attribute. Add to array.
                matchingElements.push(allElements[i]);
            }
        }
        return matchingElements;

    };

    var executeRouteForElement = function (element) {
        var namespace = APP;
        var route = getRoute();
        var action = 'init';
        if (route !== '' && namespace[route] && typeof namespace[route][action] === 'function') {
            namespace[route][action](element);
        }
    };

    var init = function() {

        var routes = locateRoutableElementsInDOM('data-action'),
            i, element, routeName;

        for (i = 0; i < routes.length; i++) {
            element = routes[i];
            routeName = element.getAttribute('data-action');
            setRoute(routeName);
            console.log('APP.controller.init | APP.' + routeName + '.init() invoked');
            executeRouteForElement(element);
        }
    };

    /**
    * interfaces to public functions
    */
    return {
        init: init
    };

}());
