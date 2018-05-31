'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = activeChannel;

var _ActionTypes = require('../constants/ActionTypes');

var initialState = {
  name: 'Lobby',
  id: 0
};

function activeChannel() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes.CHANGE_CHANNEL:
      return {
        name: action.channel.name,
        id: action.channel.id
      };

    default:
      return state;
  }
}