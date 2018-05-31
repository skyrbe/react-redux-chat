'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _channels = require('./channels');

var _channels2 = _interopRequireDefault(_channels);

var _activeChannel = require('./activeChannel');

var _activeChannel2 = _interopRequireDefault(_activeChannel);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _typers = require('./typers');

var _typers2 = _interopRequireDefault(_typers);

var _welcomePage = require('./welcomePage');

var _welcomePage2 = _interopRequireDefault(_welcomePage);

var _userValidation = require('./userValidation');

var _userValidation2 = _interopRequireDefault(_userValidation);

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appReducer = (0, _redux.combineReducers)({
  messages: _messages2.default,
  channels: _channels2.default,
  activeChannel: _activeChannel2.default,
  auth: _auth2.default,
  typers: _typers2.default,
  welcomePage: _welcomePage2.default,
  userValidation: _userValidation2.default,
  environment: _environment2.default
});
// Setup root reducer
var rootReducer = function rootReducer(state, action) {
  return appReducer(state, action);
};

exports.default = rootReducer;