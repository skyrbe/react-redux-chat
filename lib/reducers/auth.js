'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = auth;

var _ActionTypes = require('../constants/ActionTypes');

var initialState = {
  loaded: false,
  user: {
    username: null,
    id: null,
    socketID: null
  }
};

function auth() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _ActionTypes.AUTH_LOAD:
      return _extends({}, state, {
        loading: true
      });
    case _ActionTypes.AUTH_LOAD_SUCCESS:
      return _extends({}, state, {
        loading: false,
        loaded: true,
        user: _extends({}, state.user, { username: action.user })
      });
    case _ActionTypes.AUTH_LOAD_FAIL:
      return _extends({}, state, {
        loading: false,
        loaded: false,
        error: action.error
      });
    case _ActionTypes.AUTH_SIGNIN:
      return _extends({}, state, {
        signingIn: true
      });
    case _ActionTypes.AUTH_SIGNIN_SUCCESS:
      return _extends({}, state, {
        signingIn: false,
        user: {
          username: action.user.name,
          id: action.user.id
        }
      });
    case _ActionTypes.AUTH_SIGNIN_FAIL:
      return _extends({}, state, {
        signingIn: false,
        user: {
          username: null,
          id: null
        },
        signInError: action.error
      });
    case _ActionTypes.AUTH_SIGNUP:
      return _extends({}, state, {
        signingUp: true
      });
    case _ActionTypes.AUTH_SIGNUP_SUCCESS:
      return _extends({}, state, {
        signingUp: false,
        user: {
          username: action.newUser.name,
          id: action.newUser.id,
          socketID: null
        }
      });
    case _ActionTypes.AUTH_SIGNUP_FAIL:
      return _extends({}, state, {
        user: {
          username: null,
          id: null
        }
      });
    case _ActionTypes.AUTH_SIGNOUT:
      return _extends({}, state, {
        signingOut: true
      });
    case _ActionTypes.AUTH_SIGNOUT_SUCCESS:
      return _extends({}, state, {
        signingOut: false,
        user: {
          username: null,
          id: null
        }
      });
    case _ActionTypes.AUTH_SIGNOUT_FAIL:
      return _extends({}, state, {
        signingOut: false,
        signOutError: action.error
      });

    case _ActionTypes.RECEIVE_SOCKET:
      return _extends({}, state, {
        user: _extends({}, state.user, {
          socketID: action.socketID
        })
      });
    default:
      return state;
  }
}