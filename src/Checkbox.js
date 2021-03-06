/**
 * @file Checkbox.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class Checkbox {
	constructor(element) {
		this.$cont = element;
	}

	init() {
		// If DOM element doesn't exist, no need to go further
		if (null === this.$cont || undefined === this.$cont) return false;

		// DOM elements
		[this.$checkbox] = this.$cont.querySelector('.js-checkbox').children;
		this.$button = this.$cont.querySelector('.js-button');

		this.isOpen = this.$cont.classList.contains('is-active');

		this.initEvents();

		return true;
	}

	initEvents() {
		this.$button.addEventListener('click', () => {
			this.toggle();
		});

		if (this.$checkbox.checked) {
			this.activate();
		}
	}

	/**
	 * Checkbox.toggle
	 */
	toggle() {
		if (this.isOpen) return this.deactivate();

		return this.activate();
	}

	/**
	 * Checkbox.activate
	 *
	 * @return	bool
	 */
	activate() {
		if (this.isOpen) return false;

		this.isOpen = true;
		this.$cont.classList.add('is-active');
		this.$button.classList.add('is-selected');

		this.$checkbox.value = 1;
		this.$checkbox.setAttribute('checked', true);

		return true;
	}

	/**
	 * Checkbox.deactivate
	 *
	 * @return	bool
	 */
	deactivate() {
		if (!this.isOpen) return false;

		this.isOpen = false;
		this.$cont.classList.remove('is-active');
		this.$button.classList.remove('is-selected');

		this.$checkbox.value = 0;
		this.$checkbox.removeAttribute('checked');

		return true;
	}
}
