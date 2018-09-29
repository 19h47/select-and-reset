# Select and reset

> Mais c’est comme Select et Reset, ça sert à rien rien rien rien

![Select and reset](select-and-reset.png)

**Select and reset** is a small module, shipped with three submodules allowing to make _fake selects_ with a toolbar result. It also allows to toogle result between select and result bar.

An another module is shipped, **Checkbox**, and it allows to create _fake checkboxes_.

## Installation

```
npm install select-and-reset
```

## Usage

```javascript

import { Checkbox, Result, Select } from 'select-and-reset';

```

### Result

The `Result.js` class takes an `DOM element` argument and an optional `object` containing options.

```javascript

const result = document.querySelector('.js-result');
const options = {};
const ResultInstance = new Result(result, options);
ResultInstance.init();

```

#### Options

##### template

A function containing template. The function needs a `name` argument.

```javascript

const template = name => `<span style="pointer-events: none;">${name}</span>`;

```

#### buttonClass

The class of the button result. Default is `empty`.

### Select

The `Select.js` class takes an `DOM element` argument.

```javascript

const selects = document.querySelectorAll('.js-select-and-reset');

for (let i = 0; i < selects.length; i += 1) {
	const SelectInstance = new Select(selects[i]);
	SelectInstance.init();
}

```

### Checkbox

The `Checkbox.js` class takes an `DOM element` argument.

```javascript

const checkboxes = document.querySelectorAll('.js-checkbox-and-reset');

for (let i = 0; i < checkboxes.length; i += 1) {
	const CheckboxInstance = new Checkbox(checkboxes[i]);
	CheckboxInstance.init();
}

```

### Example

An example is located right [here](https://19h47.github.io/select-and-reset/), see [sources](/example/index.html).
