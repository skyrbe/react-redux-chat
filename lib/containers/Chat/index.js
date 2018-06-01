'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _actions = require('../../reducers/actions');

var actions = _interopRequireWildcard(_actions);

var _authActions = require('../../reducers/authActions');

var _Chat = require('../../components/Chat/Chat');

var _Chat2 = _interopRequireDefault(_Chat);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var socket = (0, _socket2.default)('', { path: 'http://localhost:9010/api/chat' });
var initialChannel = 'Lobby'; // NOTE: I hard coded this value for my example.  Change this as you see fit

var ChatContainer = function (_Component) {
  _inherits(ChatContainer, _Component);

  function ChatContainer() {
    _classCallCheck(this, ChatContainer);

    return _possibleConstructorReturn(this, (ChatContainer.__proto__ || Object.getPrototypeOf(ChatContainer)).apply(this, arguments));
  }

  _createClass(ChatContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          dispatch = _props.dispatch,
          user = _props.user;

      var deviceToken = window.localStorage.getItem('deviceToken');
      if (!_reactCookie2.default.load('username')) {
        var userObj = {
          username: "test",
          token: '' + Date.now() + _nodeUuid2.default.v4()
        };
        this.props.signUp(userObj).then(function (data) {
          console.log("response ", data);
        });
      } else {
        var _user = { token: _reactCookie2.default.load('token') };
        this.props.signIn(_user);
      }
      // if(!user.username) {
      //   dispatch(receiveAuth());
      // }
      // dispatch(actions.fetchMessages(initialChannel));
      // dispatch(actions.fetchChannels(user.username));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Chat2.default, _extends({}, this.props, { socket: socket }));
    }
  }]);

  return ChatContainer;
}(_react.Component);

ChatContainer.propTypes = {
  messages: _propTypes2.default.array.isRequired,
  user: _propTypes2.default.object.isRequired,
  dispatch: _propTypes2.default.func.isRequired,
  channels: _propTypes2.default.array.isRequired,
  activeChannel: _propTypes2.default.string.isRequired,
  typers: _propTypes2.default.array.isRequired
};

function mapStateToProps(state) {
  return {
    messages: state.messages.data,
    channels: state.channels.data,
    activeChannel: state.activeChannel.name,
    user: state.auth.user,
    typers: state.typers,
    screenWidth: state.environment.screenWidth
  };
}

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    signUp: _authActions.signUp,
    signIn: _authActions.signIn
  }, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ChatContainer);