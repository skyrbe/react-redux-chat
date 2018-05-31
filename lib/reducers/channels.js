'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = channels;

var _ActionTypes = require('../constants/ActionTypes');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
  loaded: false,
  data: []
};

function channels() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes.ADD_CHANNEL:
      if (state.data.filter(function (channel) {
        return channel.name === action.channel.name;
      }).length !== 0) {
        return state;
      }
      return _extends({}, state, {
        data: [].concat(_toConsumableArray(state.data), [action.channel])
      });
    case _ActionTypes.RECEIVE_CHANNEL:
      if (state.data.filter(function (channel) {
        return channel.name === action.channel.name;
      }).length !== 0) {
        return state;
      }
      return _extends({}, state, {
        data: [].concat(_toConsumableArray(state.data), [action.channel])
      });
    case _ActionTypes.LOAD_CHANNELS:
      return _extends({}, state, {
        loading: true
      });
    case _ActionTypes.LOAD_CHANNELS_SUCCESS:
      return _extends({}, state, {
        loading: false,
        loaded: true,
        data: [].concat(_toConsumableArray(state.data), _toConsumableArray(action.json))
      });
    case _ActionTypes.LOAD_CHANNELS_FAIL:
      return _extends({}, state, {
        loading: false,
        loaded: false,
        error: action.error,
        data: [].concat(_toConsumableArray(state.data))
      });
    case _ActionTypes.AUTH_SIGNOUT_SUCCESS:
      return {
        loaded: false,
        data: []
      };
    default:
      return state;
  }
}