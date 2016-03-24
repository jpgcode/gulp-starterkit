'use strict';

//Import modules
import Index from './../../../pages/index/index';
import IndexSections from './../../../components/index-sections/index-sections';

class Controller {

    constructor() {
        this.componentIdAttribute = 'data-action';
        this.getDomComponents();
    }

    getDomComponents(){

        this.matchingComponents = [];

        const allElems = document.querySelectorAll('*[data-action]');
        
        for (let i = 0; i < allElems.length; ++i) {
            if (allElems[i].getAttribute(this.componentIdAttribute) !== null) {
                this.matchingComponents.push(allElems[i].getAttribute(this.componentIdAttribute));
            }
        }

        this.initComponents();

    }

    initComponents(){

        this.matchingComponents.forEach((component) => {

            let finalName = component.charAt(0).toUpperCase() + component.slice(1);

            //Instantiate the components as needed
            if(finalName === IndexSections.name) new IndexSections();
            if(finalName === Index.name) new Index();
            
        });

    }

}

export default Controller;