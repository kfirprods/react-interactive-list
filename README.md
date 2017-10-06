# react-interactive-list
An interactive, dynamic list of components with add / remove buttons.
You define how items are rendered (e.g text input).

### Install
```bash
npm install -s react-interactive-list
```

### Example
#### Live Demos
##### List of text inputs
[![Edit React Interactive List example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/xo690voonw)

##### List of react-select components
[![Edit React Interactive List SELECT example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/r47xkvp9zn)


```javascript
import React from 'react';

import InteractiveList from 'react-interactive-list';
// IMPORTANT: This style is responsible for the basic formation
import 'react-interactive-list/lib/styles/react-interactive-list.css';
// Some extra styling for the input and the delete button
import 'react-interactive-list/lib/styles/react-input-list.css';


class App extends React.Component {
    constructor() {
        super();

        this.renderInput = this.renderInput.bind(this);
    }

    renderInput(props, removable, uniqueId, index, onChangeCallback) {
        let inputClasses = 'interactive-list-input';
        if (removable) {
            inputClasses += ' interactive-list-input--removable';
        }

        return (
            <div className="table">
                <span className="table-cell">{index+1}</span>

                <div className="table-cell">
                    <input type="text"
                           className={inputClasses}
                           onChange={(e) => onChangeCallback(e.target.value)}
                           placeholder={props.placeholder} />
                </div>
            </div>
        );
    }

    render() {
        return (
            <InteractiveList renderItem={this.renderInput}
                             placeholder="Some Text"
                             maxItems={3} />
        );
    }
}

export default App;
```

### Properties
| Property | Type | Description
:---|:---|:---
| `renderItem (required)` | function | Render each item. It must call its 4th parameter `onChangeCallback` when the value of the rendered element changes.
| `onChange` | function | Callback for when anything in the list changes. It is called with the entire list of values each time.
| `onRemoveItem` | function | Callback for when an item is removed. It is called with (uniqueId, value) |
| `minItems` | Number | Minimum amount of items that must be in the list. The X button does not appear when this is the amount of items in the list. Defaults to 1. |
| `maxItems` | Number | Maximum amount of items to be added to the list. The add button becomes disabled once this number of items is reached. Defaults to -1, meaning infinite. |


Note that all properties of InteractiveList are also passed to the `renderItem` function (its 1st parameter).
