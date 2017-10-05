# react-interactive-list
An interactive, dynamic list of components with add / remove buttons.
You define how items are rendered (e.g text input).

### Install
```bash
npm install -s react-interactive-list
```

### Usage

```javascript
import InteractiveList from 'react-interactive-list'

function renderItem(props, index, onChangeCallback) {
    return (
       <div>
           <span>{index+1}</span>
           <input type="text" 
                  onChange={(e) => onChangeCallback(e.target.value)} />;
       </div>
    );
}

<InteractiveList renderItem={renderItem} />
```

### Properties
`renderItem (required)` - Function that returns JSX. It must call onChangeCallback when the value of the rendered element changes.

`onChange` - Callback for when anything in the list changes. It is called with the entire list of values each time.

`minItems` - Minimum amount of items. Defaults to 1. 

`maxItems` - Maximum amount of items. Defaults to -1, meaning there is no limit.

Any other properties will be passed to the `renderItem` function (e.g placeholder)
