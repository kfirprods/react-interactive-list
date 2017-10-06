import React from 'react';


export default class InteractiveList extends React.Component {
    constructor(props) {
        super(props);

        this._lastItemId = 0;
        this._values = {};
        this.state = {
            fields: [this._lastItemId++]
        };

        this.addField = this.addField.bind(this);
        this.removeField = this.removeField.bind(this);
        this.handleItemValueChanged = this.handleItemValueChanged.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.renderRemoveButton = this.renderRemoveButton.bind(this);
    }

    get minItems() {
        return this.props.minItems || 1;
    }

    get maxItems() {
        return this.props.maxItems || -1;
    }

    get addButtonText() {
        return this.props.addButtonText || 'Add';
    }

    addField(e) {
        e.preventDefault();

        let newItemId = ++this._lastItemId;

        this.setState({
            fields: this.state.fields.concat([newItemId])
        });
        this._values[newItemId] = null;
    }

    removeField(itemId) {
        if (this.props.onRemoveItem) {
            this.props.onRemoveItem(itemId, this._values[itemId]);
        }

        this.setState({
            fields: this.state.fields.filter((id) => id !== itemId)
        });

        delete this._values[itemId];
    }

    handleItemValueChanged(itemId, newValue) {
        this._values[itemId] = newValue;
    }

    renderRemoveButton(fieldId) {
        return (
            <a href="#"
               className="table-cell delete"
               onClick={(e)=> {
                   e.preventDefault();
                   this.removeField(fieldId);
               }}>
                &#10006;
            </a>
        );
    }

    renderItems() {
        return this.state.fields.map((fieldId, index) => {
            let removable = this.minItems < this.state.fields.length;
            let removeButton = removable ? this.renderRemoveButton(fieldId) : null;

            return (
                <div className="table" key={fieldId}>
                    <div className="table-cell interactive-item">
                        {this.props.renderItem(
                            this.props,
                            removable,
                            fieldId,
                            index,
                            (newValue) => this.handleItemValueChanged(fieldId, newValue)
                        )}
                    </div>

                    {removeButton}
                </div>
            );
        });
    }

    render() {
        let fields = this.renderItems();

        let mayAddItems = this.state.fields.length < this.maxItems || this.maxItems == -1;
        let addButtonClassNames = 'button-add';
        if (!mayAddItems) {
            addButtonClassNames += ' button-add--disabled';
        }

        return (
            <div className="react-interactive-list">
                <div className="field-list field-input">
                    {fields}
                </div>

                <button className={addButtonClassNames}
                        disabled={!mayAddItems}
                        onClick={this.addField}>
                    {this.addButtonText}
                </button>
            </div>
        );
    }
}
