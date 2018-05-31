'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.receiveAuth = receiveAuth;
exports.checkAuth = checkAuth;
exports.signOut = signOut;
exports.signUp = signUp;
exports.signIn = signIn;
exports.receiveSocket = receiveSocket;

var _ActionTypes = require('../constants/ActionTypes');

var types = _interopRequireWildcard(_ActionTypes);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function receiveAuth() {
  var user = _reactCookie2.default.load('username');
  return {
    type: types.AUTH_LOAD_SUCCESS,
    user: user
  };
}

function checkAuth() {
  if (_reactCookie2.default.load('username')) {
    return true;
  }
  return false;
}

function requestSignUp() {
  return {
    type: types.AUTH_SIGNUP
  };
}

function receiveUser(username) {
  var newUser = {
    name: username,
    id: Symbol(username)
  };
  return {
    type: types.AUTH_SIGNUP_SUCCESS,
    newUser: newUser
  };
}

function requestSignOut() {
  return {
    type: types.AUTH_SIGNOUT
  };
}
function receiveSignOut() {
  return {
    type: types.AUTH_SIGNOUT_SUCCESS
  };
}

function signOut() {
  return function (dispatch) {
    dispatch(requestSignOut());
    return (0, _isomorphicFetch2.default)('/api/signout').then(function (response) {
      if (response.ok) {
        _reactCookie2.default.remove('username');
        dispatch(receiveSignOut());
        //browserHistory.push('/')
      }
    }).catch(function (error) {
      throw error;
    });
  };
}

function signUp(user) {
  return function (dispatch) {
    dispatch(requestSignUp());
    return (0, _isomorphicFetch2.default)('http://localhost:9010/api/sign_up', {
      method: 'post',
      headers: {},
      body: JSON.stringify(user)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log("response ", data.token);
      _reactCookie2.default.save('username', user.username);
      _reactCookie2.default.save('token', data.token);
      dispatch(receiveUser(user.username));
    }).catch(function (error) {
      throw error;
    });
  };
}

function requestSignIn() {
  return {
    type: types.AUTH_SIGNIN
  };
}

function receiveSignIn(token) {
  var user = {
    token: token,
    id: Symbol(token)
  };
  return {
    type: types.AUTH_SIGNIN_SUCCESS,
    user: user
  };
}

function signIn(user) {
  console.log("user ", user);
  return function (dispatch) {
    dispatch(requestSignIn());
    return (0, _isomorphicFetch2.default)('http://localhost:9010/api/sign_in', {
      method: 'post',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data) {
        _reactCookie2.default.save('token', user.token);
        dispatch(receiveSignIn(user.token));
        //browserHistory.push('/chat');
      }
    }).catch(function (error) {
      throw error;
    });
  };
}

function receiveSocket(socketID) {
  return {
    type: types.RECEIVE_SOCKET,
    socketID: socketID
  };
}