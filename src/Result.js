// Default template
const template = name => `<span style="pointer-events: none;">${name}</span>`;

/**
 * @file Result.js
 *
 * @param	obj		element		DOM element
 * @author	Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class Result {
	constructor(element, options) {
		this.$cont = element;

		// Set default options
		this.options = Object.assign({
			template: options.template || template,
			buttonClass: options.buttonClass,
		}, options);
	}

	init() {
		// If DOM element doesn't exist, no need to go further
		if (null === this.$cont || undefined === this.$cont) return false;

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
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
	 */
	addItem(name, param) {
		const item = document.createElement('button');

		// Create wrapper
		// @TODO Refactor this attributes
		if (this.options.buttonClass) {
			item.className += `${this.options.buttonClass}`;
		}

		item.setAttribute('data-children-name', name);
		item.setAttribute('data-parent-name', param);
		item.type = 'button';

		// Attach click event
		item.addEventListener('click', event => {
			this.removeItem(event);
			this.$cont.dispatchEvent(
				new CustomEvent('Result.removeItem', {
					detail: {
						name,
					},
				}),
			);
		});

		// Append template to wrapper
		item.innerHTML = this.setTemplate(name);

		// Then append to container
		this.$input.appendChild(item);

		// Update counter
		if (false === !this.$counter) {
			this.updateCounter();
		}

		this.$cont.dispatchEvent(
			new CustomEvent(
				'Result.addItem',
				{
					detail: { name },
				},
			),
		);
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
	 * @param	{Object|string}	event
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
	 */
	removeItem(event) {
		let element = null;

		// @TODO reorder this code
		if ('string' === typeof event) {
			element = document.querySelector(`[data-children-name="${event}"]`);
		} else {
			element = event.target;
		}

		//
		if (null === element) {
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
		if (false === !this.$counter) {
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

			if (false === !this.$counter) {
				this.updateCounter();
			}
		}
	}

	/**
	 * Result.setTemplate
	 *
	 * @param	str	name	options template
	 * @retrun
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
	 */
	setTemplate(name) {
		return this.options.template(name);
	}
}
