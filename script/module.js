const ModuleName = 'dateTab';
const ModuleDefaults =  {

};
const ModuleReturns = [];

class Module {
	constructor ( ele, options ) {
		this.ele = ele;
		this.$ele = $(ele);
		this.option = options;
	}



	init () {
		let self = this ;
		let $this = this.$ele;
		let options = this.option;
		let $calendar = $this.find('.calendar') ;


		$('.calendar').append('');

	}

};

export { ModuleName, ModuleDefaults, ModuleReturns, Module };