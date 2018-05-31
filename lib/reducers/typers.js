'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typers;

var _ActionTypes = require('../constants/ActionTypes');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = [];
function typers() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {

    case _ActionTypes.TYPING:
      if (state.indexOf(action.username) === -1) {
        return [].concat(_toConsumableArray(state), [action.username]);
      }
      return state;
    case _ActionTypes.STOP_TYPING:
      return state.filter(function (user) {
        return user !== action.username;
      });
    default:
      return state;
  }
}