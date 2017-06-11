'use strict';

//Import pages modules
import Index from './../../../pages/index/index';

//Import component modules
import Example from './../../../components/example/example';
import Intro from './../../../components/intro/intro';

class Controller {

    constructor() {
        this.componentIdAttribute = 'data-action';
        this.init();
    }

    init() {
        const matchingComponents = document.querySelectorAll('*[data-action]');
        this.initComponents(matchingComponents);
    }

    initComponents(matchingComponents) {
        [...matchingComponents].forEach((component) => {
            const componentAttr = component.getAttribute(this.componentIdAttribute);
            const finalName = componentAttr.charAt(0) + componentAttr.slice(1);

            // Call the components as needed
            if(finalName === Example.name.toLowerCase()) new Example();
            if(finalName === Intro.name.toLowerCase()) new Intro();
            if(finalName === Index.name.toLowerCase()) new Index();
        });
    }

}

export default Controller;
