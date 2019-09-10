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

		// @TODO Make it an option
		this.$counter = this.$cont.querySelector('.js-counter') || false;
		this.$reset = this.$cont.querySelector('.js-reset') || false;

		// Bind properties to the container object
		this.$cont.addItem = this.addItem.bind(this);
		this.$cont.removeItem = this.removeItem.bind(this);

		this.initEvents();

		return true;
	}


	initEvents() {
		if (this.$reset) {
			this.$reset.addEventListener('click', () => {
				this.reset();
			});
		}
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
		const addItemEvent = new CustomEvent('Result.addItem'); // eslint-disable-line no-undef

		// Create wrapper
		// @TODO Refactor this attributes
		if (this.options.buttonClass) {
			item.className += `${this.options.buttonClass}`;
		}
		item.setAttribute('data-children-name', name);
		item.setAttribute('data-parent-name', param);
		item.type = 'button';

		// Attach click event
		item.addEventListener('click', (event) => {
			const removeItemEvent = new CustomEvent('Result.removeItem'); // eslint-disable-line no-undef
			this.removeItem(event);
			this.$cont.dispatchEvent(removeItemEvent);
		});

		// Append template to wrapper
		item.innerHTML = this.setTemplate(name);

		// Then append to container
		this.$input.appendChild(item);

		// Update counter
		if (!this.$counter === false) {
			this.updateCounter();
		}

		this.$cont.dispatchEvent(addItemEvent);
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

		// @TODO reorder this code
		if (typeof event === 'string') {
			element = document.querySelector(`[data-children-name="${event}"]`);
		} else {
			element = event.target;
		}

		//
		if (element === null) {
			return false;
		}

		// Select associate filter
		// @TODO rename datas attribute
		const param = element.getAttribute('data-parent-name');
		const name = element.getAttribute('data-children-name');

		// console.log({ element, param, name });
		const parent = document.querySelector(`[data-param="${param}"]`);
		const children = parent.querySelector(`[data-fake-label="${name}"]`);

		// @see Select.js
		parent.removeItem(children);

		// Then remove item itself
		element.remove();

		// Finally, update counter
		if (!this.$counter === false) {
			this.updateCounter();
		}

		return true;
	}

	reset() {
		const children = this.$input.querySelectorAll('button');
		const { length } = children;

		for (let i = 0; i < length; i += 1) {
			// Select associate filter
			// @TODO rename datas attribute
			const param = children[i].getAttribute('data-parent-name');
			const name = children[i].getAttribute('data-children-name');

			const parent = document.querySelector(`[data-param="${param}"]`);
			const child = parent.querySelector(`[data-fake-label="${name}"]`);

			// @see Select.js
			parent.removeItem(child);

			// Then remove item itself
			children[i].remove();

			if (!this.$counter === false) {
				this.updateCounter();
			}
		}
	}

	/**
	 * Result.setTemplate
	 *
	 * @param	str	name	options template
	 * @retrun
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	setTemplate(name) {
		return this.options.template(name);
	}
}
