'use strict';

class Index {

    constructor() {
        this.eventHandlers();
    }

    eventHandlers() {
        //Define all the events here...
        let a = () => {
            console.log('Mario123');
        };
        a();
    }

}

export default Index;