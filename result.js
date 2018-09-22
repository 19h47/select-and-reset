/**
 * @file Result.js
 *
 * @param	obj		element		DOM element
 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */
class Result {
	constructor(element) {
		this.$cont = element;
	}

	init() {
		// If DOM element doesn't exist, no need to go further
		if (this.$cont === null || this.$cont === undefined) return false;

		this.$input = this.$cont.querySelector('.js-input');
		this.$counter = this.$cont.querySelector('.js-counter');

		// Attach method to the container
		this.$cont.addItem = this.addItem.bind(this);
		this.$cont.removeItem = this.removeItem.bind(this);

		return true;
	}


	/**
	 * Result
	 *
	 * @param	str		name
	 * @param	str		param
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	addItem(name, param) {
		const item = document.createElement('button');

		// Create wrapper
		item.setAttribute('data-children-name', name);
		item.setAttribute('data-parent-name', param);
		item.type = 'button';

		// Attach click event
		item.addEventListener('click', (event) => {
			this.removeItem(event);
		});

		// Append template to wrapper
		item.innerHTML = Result.setTemplate(name);

		// Then append to container
		this.$input.appendChild(item);

		// Update counter
		this.updateCounter();
	}

	updateCounter() {
		this.$counter.innerHTML = this.$input.children.length;
	}


	/**
	 * Result.removeItem
	 *
	 * @param	obj / str	event
	 * @access	static
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	removeItem(event) {
		let element = null;

		if (typeof event === 'string') {
			element = document.querySelector(`[data-children-name="${event}"]`);
		} else {
			element = event.target;
		}

		// Select associate filter
		// @todo rename datas attribute
		const param = element.getAttribute('data-parent-name');
		const name = element.getAttribute('data-children-name');

		// console.log({ element, param, name });
		const parent = document.querySelector(`[data-param="${param}"]`);
		const children = parent.querySelector(`[data-fake-label="${name}"]`);

		// @see Select
		parent.removeItem(children);

		// Then remove item itself
		element.remove();

		// Finaly, update counter
		this.updateCounter();
	}


	/**
	 * Result.setTemplate
	 *
	 * @param	str	name
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	static setTemplate(name) {
		return `<span style="pointer-events: none;">${name}</span>`;
	}
}
