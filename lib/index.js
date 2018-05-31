'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = undefined;

var _Chat = require('./containers/Chat');

Object.defineProperty(exports, 'Chat', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Chat).default;
  }
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _Chat2 = _interopRequireDefault(_Chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var target = document.querySelector('#root');
registerServiceWorker();

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _store2.default },
  _react2.default.createElement(_Chat2.default, null)
), target);