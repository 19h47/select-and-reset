/**
 * @file Result.js
 *
 * @param	obj		element		DOM element
 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */
export default class Result {
	constructor(element, options) {
		this.$cont = element;

		// Default template
		const template = name => `<span style="pointer-events: none;">${name}</span>`;

		// Set default options
		this.options = Object.assign({
			template: options.template || template,
			buttonClass: options.buttonClass,
		}, options);
	}

	init() {
		// If DOM element doesn't exist, no need to go further
		if (this.$cont === null || this.$cont === undefined) return false;

		this.$input = this.$cont.querySelector('.js-input');
		// @todo Make it an option
		this.$counter = this.$cont.querySelector('.js-counter') || false;

		// Bind properties to the container object
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
		// @todo Refactor this attributes
		if (this.options.buttonClass) {
			item.className += `${this.options.buttonClass}`;
		}
		item.setAttribute('data-children-name', name);
		item.setAttribute('data-parent-name', param);
		item.type = 'button';

		// Attach click event
		item.addEventListener('click', (event) => {
			this.removeItem(event);
		});

		// Append template to wrapper
		item.innerHTML = this.setTemplate(name);

		// Then append to container
		this.$input.appendChild(item);

		// Update counter
		if (!this.$counter === false) {
			this.updateCounter();
		}
	}


	/**
	 * Update counter
	 *
	 * @return	void
	 */
	updateCounter() {
		this.$counter.innerHTML = this.$input.children.length;
	}


	/**
	 * Result.removeItem
	 *
	 * @param	obj | str	event
	 * @access	static
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	removeItem(event) {
		let element = null;

		// @todo reorder this code
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

		// @see Select.js
		parent.removeItem(children);

		// Then remove item itself
		element.remove();

		// Finaly, update counter
		if (!this.$counter === false) {
			this.updateCounter();
		}
	}


	/**
	 * Result.setTemplate
	 *
	 * @param	str	name	options template
	 * @retrun
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	// eslint-disable-next-line
	setTemplate(name) {
		return this.options.template(name);
	}
}
