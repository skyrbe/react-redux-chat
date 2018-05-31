'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.receiveRawMessage = receiveRawMessage;
exports.receiveRawChannel = receiveRawChannel;
exports.typing = typing;
exports.stopTyping = stopTyping;
exports.changeChannel = changeChannel;
exports.welcomePage = welcomePage;
exports.fetchChannels = fetchChannels;
exports.fetchMessages = fetchMessages;
exports.usernameValidationList = usernameValidationList;
exports.createMessage = createMessage;
exports.createChannel = createChannel;
exports.initEnvironment = initEnvironment;

var _ActionTypes = require('../constants/ActionTypes');

var types = _interopRequireWildcard(_ActionTypes);

var _reactRouter = require('react-router');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// NOTE:Chat actions

function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message: message
  };
}

function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message: message
  };
}

function receiveRawChannel(channel) {
  return {
    type: types.RECEIVE_CHANNEL,
    channel: channel
  };
}

function addChannel(channel) {
  return {
    type: types.ADD_CHANNEL,
    channel: channel
  };
}

function typing(username) {
  return {
    type: types.TYPING,
    username: username
  };
}

function stopTyping(username) {
  return {
    type: types.STOP_TYPING,
    username: username
  };
}

function changeChannel(channel) {
  return {
    type: types.CHANGE_CHANNEL,
    channel: channel
  };
}

// NOTE:Data Fetching actions

function welcomePage(username) {
  return {
    type: types.SAVE_USERNAME,
    username: username
  };
}

function fetchChannels(user) {
  return function (dispatch) {
    dispatch(requestChannels());
    return (0, _isomorphicFetch2.default)('/api/channels/' + user).then(function (response) {
      return response.json();
    }).then(function (json) {
      return dispatch(receiveChannels(json));
    }).catch(function (error) {
      throw error;
    });
  };
}

function requestChannels() {
  return {
    type: types.LOAD_CHANNELS
  };
}

function receiveChannels(json) {
  return {
    type: types.LOAD_CHANNELS_SUCCESS,
    json: json
  };
}

function requestMessages() {
  return {
    type: types.LOAD_MESSAGES
  };
}

function fetchMessages(channel) {
  return function (dispatch) {
    dispatch(requestMessages());
    return (0, _isomorphicFetch2.default)('/api/messages/' + channel).then(function (response) {
      return response.json();
    }).then(function (json) {
      return dispatch(receiveMessages(json, channel));
    }).catch(function (error) {
      throw error;
    });
  };
}

function receiveMessages(json, channel) {
  var date = (0, _moment2.default)().format('lll');
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    json: json,
    channel: channel,
    date: date
  };
}

function loadingValidationList() {
  return {
    type: types.LOAD_USERVALIDATION
  };
}

function receiveValidationList(json) {
  return {
    type: types.LOAD_USERVALIDATION_SUCCESS,
    json: json
  };
}

function usernameValidationList() {
  return function (dispatch) {
    dispatch(loadingValidationList());
    return (0, _isomorphicFetch2.default)('/api/all_usernames').then(function (response) {
      return response.json();
    }).then(function (json) {
      return dispatch(receiveValidationList(json.map(function (item) {
        return item.local.username;
      })));
    }).catch(function (error) {
      throw error;
    });
  };
}

function createMessage(message) {
  return function (dispatch) {
    dispatch(addMessage(message));
    return (0, _isomorphicFetch2.default)('/api/newmessage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message) }).catch(function (error) {
      throw error;
    });
  };
}

function createChannel(channel) {
  return function (dispatch) {
    return (0, _isomorphicFetch2.default)('/api/channels/new_channel', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(channel) }).catch(function (error) {
      throw error;
    }).then(function (val) {}, function () {
      dispatch(addChannel(channel));
    });
  };
}

//the environment code is borrowed from Andrew Ngu, https://github.com/andrewngu/sound-redux

function changeIsMobile(isMobile) {
  return {
    type: types.CHANGE_IS_MOBILE,
    isMobile: isMobile
  };
}

function changeWidthAndHeight(screenHeight, screenWidth) {
  return {
    type: types.CHANGE_WIDTH_AND_HEIGHT,
    screenHeight: screenHeight,
    screenWidth: screenWidth
  };
}

function initEnvironment() {
  return function (dispatch) {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    dispatch(changeIsMobile(isMobile));
    dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));

    window.onresize = function () {
      dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));
    };
  };
}