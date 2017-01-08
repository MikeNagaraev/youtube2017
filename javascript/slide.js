export default class Slide {
	constructor(items, id, state) {
		this.items = Array.isArray(items) ? items : [items];
		this.id = id || 0;
		this.state = state;
	}

	addItem(item) {
		this.items.push(item);
	}

	setState(state) {
		this.state = state;
	}

	isActive() {
		return this.state === 'active' ? true : false
	}

	//
	// set items(items) {
	// 	this.items = items;
	// }
	//
	// get items() {
	// 	return this.items;
	// }
}
