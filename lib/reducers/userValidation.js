'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = userValidation;

var _ActionTypes = require('../constants/ActionTypes');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
  loaded: false,
  data: []
};

function userValidation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes.LOAD_USERVALIDATION:
      return _extends({}, state, {
        loading: true
      });
    case _ActionTypes.LOAD_USERVALIDATION_SUCCESS:
      return _extends({}, state, {
        loading: false,
        loaded: true,
        data: action.json
      });
    case _ActionTypes.LOAD_USERVALIDATION_FAIL:
      return _extends({}, state, {
        loading: false,
        loaded: false,
        error: action.error,
        data: [].concat(_toConsumableArray(state.data))
      });
    default:
      return state;
  }
}