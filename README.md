# Select and reset

> Mais c’est comme Select et Reset, ça sert à rien rien rien rien

![Select and reset](select-and-reset.png)

## Installation

```
npm install select-reset
```

## Usage

```javascript

import SelectAndReset from 'select-and-reset';

```

`SelectAndReset` have three methods:

### Result

```javascript

const result = document.querySelector('.js-result');
const ResultInstance = new SelectAndReset.default.Result(result);
ResultInstance.init();

```

### Select

```javascript

const selects = document.querySelectorAll('.js-select-and-reset');

for (let i = 0; i < selects.length; i += 1) {
	const SelectInstance = new SelectAndReset.default.Select(selects[i]);
	SelectInstance.init();
}

```

### Checkbox

```

const checkboxes = document.querySelectorAll('.js-checkbox-and-reset');

for (let i = 0; i < checkboxes.length; i += 1) {
	const CheckboxInstance = new SelectAndReset.default.Checkbox(checkboxes[i]);
	CheckboxInstance.init();
}

```
