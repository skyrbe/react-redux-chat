'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = messages;

var _ActionTypes = require('../constants/ActionTypes');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
  loaded: false,
  data: [],
  fetchHistory: []
};
function messages() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes.ADD_MESSAGE:
      return _extends({}, state, {
        data: [].concat(_toConsumableArray(state.data), [action.message])
      });
    case _ActionTypes.RECEIVE_MESSAGE:
      return _extends({}, state, {
        data: [].concat(_toConsumableArray(state.data), [action.message])
      });
    case _ActionTypes.LOAD_MESSAGES:
      return _extends({}, state, {
        loading: true
      });
    case _ActionTypes.LOAD_MESSAGES_SUCCESS:
      return _extends({}, state, {
        loading: false,
        loaded: true,
        fetchHistory: [].concat(_toConsumableArray(state.fetchHistory), [{ lastFetch: action.date, channelName: action.channel }]),
        data: [].concat(_toConsumableArray(state.data.filter(function (message) {
          return message.channelID !== action.channel;
        })), _toConsumableArray(action.json))
      });
    case _ActionTypes.LOAD_MESSAGES_FAIL:
      return _extends({}, state, {
        loading: false,
        loaded: false,
        error: action.error,
        data: [].concat(_toConsumableArray(state.data))
      });
    case _ActionTypes.AUTH_SIGNOUT_SUCCESS:
      return {
        loaded: false,
        data: [],
        fetchHistory: []
      };
    default:
      return state;
  }
}