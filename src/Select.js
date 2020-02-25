/**
 * @file Select.js
 *
 * @param	element		DOM element
 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */
export default class Select {
	constructor(element) {
		this.$cont = element;
	}

	init() {
		// No need to go further if this.$cont doesn't exist
		if (null === this.$cont || undefined === this.$cont) return false;

		// DOM elements
		this.$select = this.$cont.querySelector('.js-select');
		this.$label = this.$cont.querySelector('.js-label');
		this.$counter = this.$cont.querySelector('.js-counter') || false;
		this.$reset = this.$cont.querySelector('.js-reset') || false;

		// @TODO Make it an option
		this.$result = document.querySelector('.js-result');

		this.param = this.$cont.getAttribute('data-param');

		// FakeSelect
		this.$fakeSelect = this.$cont.querySelector('.js-fake-select');
		this.$options = this.$fakeSelect.querySelectorAll('.js-fake-option');

		// Instanciate an empty array that will welcome future values
		this.selectedOptions = [];

		this.count = this.$options.length;
		this.multiple = JSON.parse(this.$cont.getAttribute('data-multiple')) || true;

		// Bind properties to the container object
		this.$cont.addItem = this.addItem.bind(this);
		this.$cont.removeItem = this.removeItem.bind(this);

		this.initEvents();

		return true;
	}


	/**
	 * Selects.initEvents
	 *
	 * @return	void
	 */
	initEvents() {
		// Loop through each options to attach click event on it
		for (let i = 0; i < this.count; i += 1) {
			this.$options[i].addEventListener('click', () => {
				this.onSelect(this.$options[i]);
			});
		}

		this.$label.addEventListener('click', () => {
			this.onClick();
		});

		// CLick outside this.$cont
		// @see https://www.blustemy.io/detecting-a-click-outside-an-element-in-javascript/
		document.addEventListener('click', event => {
			let targetElement = event.target; // clicked element

			do {
				if (targetElement === this.$cont) {
					// This is a click inside. Do nothing, just return.
					return false;
				}
				// Go up the DOM
				targetElement = targetElement.parentNode;
			} while (targetElement);

			// This is a click outside.
			return this.$cont.classList.remove('is-active');
		});

		// DOM ready
		document.addEventListener('DOMContentLoaded', () => {
			this.onPageReady();
		});

		// Reset
		if (this.$reset) {
			this.$reset.addEventListener('click', () => {
				this.reset();
			});
		}
	}


	/**
	 * Select.onClick
	 *
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	onClick() {
		if (this.$cont.classList.contains('is-active')) {
			return this.deactivateCont();
		}
		return this.activateCont();
	}


	/**
	 * Select.activateCont
	 */
	activateCont() {
		return this.$cont.classList.add('is-active');
	}


	/**
	 * Select.deactivateCont
	 */
	deactivateCont() {
		return this.$cont.classList.remove('is-active');
	}


	/**
	 * Select.onSelect
	 *
	 * @param	obj		element		DOM object
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	onSelect(element) {
		const label = element.getAttribute('data-fake-label');
		const selected = element.classList.contains('is-selected');

		// If element is already selected
		if (selected) {
			// @see Result.js
			return this.$result.removeItem(label);
		}

		// If multiple is set to false
		if (false === this.multiple) {
			for (let i = 0; i < this.count; i += 1) {
				this.removeItem(this.$options[i]);
				this.$result.removeItem(this.$options[i].getAttribute('data-fake-label'));
			}
		}

		this.addItem(element, label);

		return element.classList.add('is-selected');
	}


	/**
	 * Select.removeItem
	 *
	 * @param	obj		element		DOM object
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	removeItem(element) {
		const value = element.getAttribute('data-fake-value');
		const $checkbox = this.$select.querySelector(`[data-value="${value}"]`);

		// Remove from options selected array
		this.selectedOptions.splice(
			// Get index of current value in `selectedOptions`
			this.selectedOptions.indexOf(value),
			1,
		);

		// eslint-disable-next-line
		$checkbox.checked = false;
		$checkbox.removeAttribute('checked');

		element.classList.remove('is-selected');

		// If counter element exist, update it
		if (this.$counter) this.setCounter();
	}


	/**
	 * Select.addItem
	 *
	 * @param	obj		element		DOM object
	 * @param	str		label
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	addItem(element, label) {
		// console.info('Select.addItem');

		const value = element.getAttribute('data-fake-value');
		const $select = this.$select.querySelector(`[data-value="${value}"]`);

		// Add from options selected array
		this.selectedOptions.push(value);

		$select.checked = true;
		$select.setAttribute('checked', true);

		// @see Result.js
		this.$result.addItem(label, this.param);

		// If $counter element exist, udpate it
		if (this.$counter) this.setCounter();
	}


	/**
	 * Select.onPageReady
	 *
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	onPageReady() {
		// Set selected options
		for (let i = 0; i < this.count; i += 1) {
			if (this.$select.children[i].checked) {
				const value = this.$select.children[i].getAttribute('data-value');
				const label = this.$select.children[i].getAttribute('data-label');

				this.selectedOptions.push(value);

				this.$options[i].classList.add('is-selected');
				this.$result.addItem(label, this.param);

				// If $counter element exist, udpate it
				if (this.$counter) this.setCounter();
			}
		}
	}

	reset() {
		for (let i = 0; i < this.count; i += 1) {
			this.removeItem(this.$options[i]);
			this.$result.removeItem(this.$options[i].getAttribute('data-fake-label'));
		}
	}


	/**
	 * Select.setCounter
	 *
	 * Update result counter
	 *
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	setCounter() {
		if (0 < this.selectedOptions.length) {
			this.$counter.classList.add('is-active');
			this.$counter.innerHTML = this.selectedOptions.length;

			return true;
		}

		this.$counter.classList.remove('is-active');
		this.$counter.innerHTML = 0;

		return true;
	}
}
