'use strict';

class IndexSections {

	constructor() {
		console.log('IndexSections module initialized');
		this.eventHandlers();
	}

	eventHandlers(){
		//Add here all the events
		const $body = $('body');
		$body.addClass('test5');
	}

}

export default IndexSections;