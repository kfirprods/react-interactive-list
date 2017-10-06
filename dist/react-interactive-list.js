/*!
 * react-interactive-list 0.4.0 (dev build at Fri, 06 Oct 2017 10:48:46 GMT) - 
 * MIT Licensed
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InteractiveList = function (_React$Component) {
    _inherits(InteractiveList, _React$Component);

    function InteractiveList(props) {
        _classCallCheck(this, InteractiveList);

        var _this = _possibleConstructorReturn(this, (InteractiveList.__proto__ || Object.getPrototypeOf(InteractiveList)).call(this, props));

        _this._lastItemId = 0;
        _this._values = {};
        _this.state = {
            fields: [_this._lastItemId++]
        };

        _this.addField = _this.addField.bind(_this);
        _this.removeField = _this.removeField.bind(_this);
        _this.handleItemValueChanged = _this.handleItemValueChanged.bind(_this);
        _this.renderItems = _this.renderItems.bind(_this);
        _this.renderRemoveButton = _this.renderRemoveButton.bind(_this);
        return _this;
    }

    _createClass(InteractiveList, [{
        key: "addField",
        value: function addField() {
            var newItemId = ++this._lastItemId;

            this.setState({
                fields: this.state.fields.concat([newItemId])
            });
            this._values[newItemId] = null;
        }
    }, {
        key: "removeField",
        value: function removeField(itemId) {
            this.setState({
                fields: this.state.fields.filter(function (id) {
                    return id !== itemId;
                })
            });

            delete this._values[itemId];
        }
    }, {
        key: "handleItemValueChanged",
        value: function handleItemValueChanged(itemId, newValue) {
            this._values[itemId] = newValue;
        }
    }, {
        key: "renderRemoveButton",
        value: function renderRemoveButton(fieldId) {
            var _this2 = this;

            return _react2.default.createElement(
                "a",
                { href: "#",
                    className: "table-cell delete",
                    onClick: function onClick(e) {
                        e.preventDefault();
                        _this2.removeField(fieldId);
                    } },
                "\u2716"
            );
        }
    }, {
        key: "renderItems",
        value: function renderItems() {
            var _this3 = this;

            return this.state.fields.map(function (fieldId, index) {
                var removable = _this3.minItems < _this3.state.fields.length;
                var removeButton = removable ? _this3.renderRemoveButton(fieldId) : null;

                return _react2.default.createElement(
                    "div",
                    { className: "table", key: fieldId },
                    _react2.default.createElement(
                        "div",
                        { className: "table-cell interactive-item" },
                        _this3.props.renderItem(_this3.props, removable, index, function (newValue) {
                            return _this3.handleItemValueChanged(fieldId, newValue);
                        })
                    ),
                    removeButton
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            var fields = this.renderItems();

            var mayAddItems = this.state.fields.length < this.maxItems || this.maxItems == -1;
            var addButtonClassNames = 'button-add';
            if (!mayAddItems) {
                addButtonClassNames += ' button-add--disabled';
            }

            return _react2.default.createElement(
                "div",
                { className: "react-interactive-list" },
                _react2.default.createElement(
                    "div",
                    { className: "field-list field-input" },
                    fields
                ),
                _react2.default.createElement(
                    "button",
                    { className: addButtonClassNames,
                        disabled: !mayAddItems,
                        onClick: this.addField },
                    "Add"
                )
            );
        }
    }, {
        key: "minItems",
        get: function get() {
            return this.props.minItems || 1;
        }
    }, {
        key: "maxItems",
        get: function get() {
            return this.props.maxItems || -1;
        }
    }]);

    return InteractiveList;
}(_react2.default.Component);

exports.default = InteractiveList;
},{}]},{},[1]);
