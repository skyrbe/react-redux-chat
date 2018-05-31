'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.history = undefined;

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _ApiClient = require('./helpers/ApiClient');

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _clientMiddleware = require('./reducers/middleware/clientMiddleware');

var _clientMiddleware2 = _interopRequireDefault(_clientMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = exports.history = (0, _createBrowserHistory2.default)();

var client = new _ApiClient2.default();
var initialState = {};
var enhancers = [];
var middleware = [(0, _clientMiddleware2.default)(client), _reduxThunk2.default, (0, _reactRouterRedux.routerMiddleware)(history)];

if (process.env.NODE_ENV === 'development') {
  var devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

var composedEnhancers = _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, middleware)].concat(enhancers));

var store = (0, _redux.createStore)(_reducers2.default, initialState, composedEnhancers);

exports.default = store;