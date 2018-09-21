/**
 * @file Select.js
 *
 * @param	element		DOM element
 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */
class Select {
	constructor(element) {
		this.$cont = element;
	}
	init() {
		// No need to go further if this.$cont doesn't exist
		if (this.$cont === null || this.$cont === undefined) return false;

		// DOM elements
		this.$select = this.$cont.querySelector('.js-select');
		this.$label = this.$cont.querySelector('.js-label');
		this.$counter = this.$cont.querySelector('.js-counter');
		// @todo Make it an option
		this.$resultFilters = document.querySelector('.js-result');

		this.param = this.$cont.getAttribute('data-param');

		// FakeSelect
		this.$fakeSelect = this.$cont.querySelector('.js-fake-select');
		this.$options = this.$fakeSelect.querySelectorAll('.js-fake-option');

		// Instanciate an empty array that will welcome future values
		this.selectedOptions = [];

		this.count = this.$options.length;

		// Attach method to the container
		this.$cont.addItem = this.addItem.bind(this);
		this.$cont.removeItem = this.removeItem.bind(this);

		this.initEvents();
	}


	/**
	 * SelectBlocks.initEvents
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
	}


	/**
	 * SelectBlock.onClick
	 *
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	onClick() {
		if (this.$cont.classList.contains('is-active')) {
			return this.$cont.classList.remove('is-active');
		}
		return this.$cont.classList.add('is-active');
	}


	/**
	 * SelectBlock.onSelect
	 *
	 * @param	obj		element		DOM object
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	onSelect(element) {
		const label = element.getAttribute('data-fake-label');

		// If element is already selected
		if (element.classList.contains('is-selected')) {
			// console.dir(label);

			// @see Result.js
			this.$resultFilters.removeItem(label);

			return this.removeItem(element);
		}

		this.addItem(element, label);

		return element.classList.add('is-selected');
	}


	/**
	 * SelectBlock.removeItem
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

		this.setCounter();

		element.classList.remove('is-selected');
	}


	/**
	 * SelectBlock.addItem
	 *
	 * @param	obj		element		DOM object
	 * @param	str		label
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	addItem(element, label) {
		const value = element.getAttribute('data-fake-value');
		const $checkbox = this.$select.querySelector(`[data-value="${value}"]`);

		// Add from options selected array
		this.selectedOptions.push(value);

		$checkbox.checked = true;
		$checkbox.setAttribute('checked', true);

		// @see Common/ResultFilters.js
		this.$resultFilters.addItem(label, this.param);

		this.setCounter();
	}


	/**
	 * SelectBlock.onPageReady
	 *
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	onPageReady() {
		// Set select option
		for (let i = 0; i < this.count; i += 1) {
			if (this.$select.children[i].checked) {
				const value = this.$select.children[i].getAttribute('data-value');
				const label = this.$select.children[i].getAttribute('data-label');

				this.selectedOptions.push(value);

				this.$options[i].classList.add('is-selected');
				this.$resultFilters.addItem(label, this.param);

				this.setCounter();
			}
		}
	}

	/**
	 * SelectBlock.setCounter
	 *
	 * Update result counter
	 *
	 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
	 */
	setCounter() {
		if (this.selectedOptions.length > 0) {
			this.$counter.classList.add('is-active');
			this.$counter.innerHTML = this.selectedOptions.length;

			return true;
		}

		this.$counter.classList.remove('is-active');
		this.$counter.innerHTML = 0;

		return true;
	}
}
