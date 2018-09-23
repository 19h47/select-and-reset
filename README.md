# Select and reset

> Mais c’est comme Select et Reset, ça sert à rien rien rien rien

![Select and reset](select-and-reset.png)

**Select and reset** is a small module, shipped with three submodules allowing to make _fake selects_ with a toolbar result. It also allows to toogle result between select and result bar.

An another module is shipped, **Checkbox**, and it allows to create _fake checkboxes_.

## Installation

```
npm install select-reset
```

## Usage

```javascript

import { Checkbox, Result, Select } from 'select-and-reset';

```

### Result

```javascript

const result = document.querySelector('.js-result');
const options = {};
const ResultInstance = new Result(result, options);
ResultInstance.init();

```

#### Options

##### template

A function containing le template. The function needs a `name`argument.

```

const template = name => `<span style="pointer-events: none;">${name}</span>`;

```

#### buttonClass

The class og the button result. Default is `empty`.

### Select

```javascript

const selects = document.querySelectorAll('.js-select-and-reset');

for (let i = 0; i < selects.length; i += 1) {
	const SelectInstance = new Select(selects[i]);
	SelectInstance.init();
}

```

### Checkbox

```javascript

const checkboxes = document.querySelectorAll('.js-checkbox-and-reset');

for (let i = 0; i < checkboxes.length; i += 1) {
	const CheckboxInstance = new Checkbox(checkboxes[i]);
	CheckboxInstance.init();
}

```

### Example

An example is located right [here](example/index.html), see sources.
