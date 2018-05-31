'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = welcomePage;

var _ActionTypes = require('../constants/ActionTypes');

var types = _interopRequireWildcard(_ActionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = '';
function welcomePage() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {

    case types.SAVE_USERNAME:
      return action.username;
    case types.AUTH_SIGNOUT_SUCCESS:
      return '';
    default:
      return state;
  }
}