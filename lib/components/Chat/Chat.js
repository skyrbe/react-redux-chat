'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MessageComposer = require('./MessageComposer');

var _MessageComposer2 = _interopRequireDefault(_MessageComposer);

var _MessageListItem = require('./MessageListItem');

var _MessageListItem2 = _interopRequireDefault(_MessageListItem);

var _Channels = require('./Channels');

var _Channels2 = _interopRequireDefault(_Channels);

var _actions = require('../../reducers/actions');

var actions = _interopRequireWildcard(_actions);

var _authActions = require('../../reducers/authActions');

var authActions = _interopRequireWildcard(_authActions);

var _TypingListItem = require('./TypingListItem');

var _TypingListItem2 = _interopRequireDefault(_TypingListItem);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chat = function (_Component) {
  _inherits(Chat, _Component);

  function Chat(props, context) {
    _classCallCheck(this, Chat);

    var _this = _possibleConstructorReturn(this, (Chat.__proto__ || Object.getPrototypeOf(Chat)).call(this, props, context));

    _this.state = {
      privateChannelModal: false,
      targetedUser: ''
    };
    return _this;
  }

  _createClass(Chat, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          socket = _props.socket,
          user = _props.user,
          dispatch = _props.dispatch;

      socket.emit('chat mounted', user);
      socket.on('new bc message', function (msg) {
        return dispatch(actions.receiveRawMessage(msg));
      });
      socket.on('typing bc', function (user) {
        return dispatch(actions.typing(user));
      });
      socket.on('stop typing bc', function (user) {
        return dispatch(actions.stopTyping(user));
      });
      socket.on('new channel', function (channel) {
        return dispatch(actions.receiveRawChannel(channel));
      });
      socket.on('receive socket', function (socketID) {
        return dispatch(authActions.receiveSocket(socketID));
      });
      socket.on('receive private channel', function (channel) {
        return dispatch(actions.receiveRawChannel(channel));
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var messageList = this.refs.messageList;
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, {
    key: 'handleSave',
    value: function handleSave(newMessage) {
      var dispatch = this.props.dispatch;

      if (newMessage.text.length !== 0) {
        dispatch(actions.createMessage(newMessage));
      }
    }
  }, {
    key: 'handleSignOut',
    value: function handleSignOut() {
      var dispatch = this.props.dispatch;

      dispatch(authActions.signOut());
    }
  }, {
    key: 'changeActiveChannel',
    value: function changeActiveChannel(channel) {
      var _props2 = this.props,
          socket = _props2.socket,
          activeChannel = _props2.activeChannel,
          dispatch = _props2.dispatch;

      socket.emit('leave channel', activeChannel);
      socket.emit('join channel', channel);
      dispatch(actions.changeChannel(channel));
      dispatch(actions.fetchMessages(channel.name));
    }
  }, {
    key: 'handleClickOnUser',
    value: function handleClickOnUser(user) {
      this.setState({ privateChannelModal: true, targetedUser: user });
    }
  }, {
    key: 'closePrivateChannelModal',
    value: function closePrivateChannelModal(event) {
      event.preventDefault();
      this.setState({ privateChannelModal: false });
    }
  }, {
    key: 'handleSendDirectMessage',
    value: function handleSendDirectMessage() {
      var _this2 = this;

      var _props3 = this.props,
          dispatch = _props3.dispatch,
          socket = _props3.socket,
          channels = _props3.channels,
          user = _props3.user;

      var doesPrivateChannelExist = channels.filter(function (item) {
        return item.name === (_this2.state.targetedUser.username + '+' + user.username || user.username + '+' + _this2.state.targetedUser.username);
      });
      if (user.username !== this.state.targetedUser.username && doesPrivateChannelExist.length === 0) {
        var newChannel = {
          name: this.state.targetedUser.username + '+' + user.username,
          id: Date.now(),
          private: true,
          between: [this.state.targetedUser.username, user.username]
        };
        dispatch(actions.createChannel(newChannel));
        this.changeActiveChannel(newChannel);
        socket.emit('new private channel', this.state.targetedUser.socketID, newChannel);
      }
      if (doesPrivateChannelExist.length > 0) {
        this.changeActiveChannel(doesPrivateChannelExist[0]);
      }
      this.setState({ privateChannelModal: false, targetedUser: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props4 = this.props,
          messages = _props4.messages,
          socket = _props4.socket,
          channels = _props4.channels,
          activeChannel = _props4.activeChannel,
          typers = _props4.typers,
          dispatch = _props4.dispatch,
          user = _props4.user,
          screenWidth = _props4.screenWidth;

      var filteredMessages = messages.filter(function (message) {
        return message.channelID === activeChannel;
      });
      var username = this.props.user.username;
      var dropDownMenu = _react2.default.createElement(
        'div',
        { style: { 'width': '21rem', 'top': '0', alignSelf: 'baseline', padding: '0', margin: '0', order: '1' } },
        _react2.default.createElement(
          _reactBootstrap.DropdownButton,
          { key: 1, style: { 'width': '21rem' }, id: 'user-menu', bsSize: 'large', bsStyle: 'primary', title: username },
          _react2.default.createElement(
            _reactBootstrap.MenuItem,
            { style: { 'width': '21rem' }, eventKey: '4', onSelect: this.handleSignOut },
            'Sign out'
          )
        )
      );
      var PrivateMessageModal = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactBootstrap.Modal,
          { bsSize: 'small', key: 1, show: this.state.privateChannelModal, onHide: this.closePrivateChannelModal },
          _react2.default.createElement(
            _reactBootstrap.Modal.Header,
            null,
            this.state.targetedUser.username
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Body,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { onClick: this.handleSendDirectMessage.bind(this) },
              'Direct Message'
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Footer,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { onClick: this.closePrivateChannelModal.bind(this) },
              'Close'
            )
          )
        )
      );
      var mobileNav = _react2.default.createElement(
        _reactBootstrap.Navbar,
        { fixedTop: true, style: { background: '#337ab7', color: 'white' } },
        _react2.default.createElement(
          'span',
          { style: { fontSize: '2em' } },
          username
        ),
        _react2.default.createElement(_reactBootstrap.Navbar.Toggle, null),
        _react2.default.createElement(
          _reactBootstrap.Navbar.Collapse,
          { style: { maxHeight: '100%' } },
          _react2.default.createElement(
            _reactBootstrap.Button,
            { bsStyle: 'primary', onSelect: this.handleSignOut },
            ' Sign out'
          ),
          _react2.default.createElement(
            'section',
            { style: { order: '2', marginTop: '1.5em' } },
            _react2.default.createElement(_Channels2.default, { socket: socket, onClick: this.changeActiveChannel, channels: channels, messages: messages, dispatch: dispatch })
          )
        )
      );
      var bigNav = _react2.default.createElement(
        'div',
        { className: 'nav' },
        dropDownMenu,
        _react2.default.createElement(
          'section',
          { style: { order: '2', marginTop: '1.5em' } },
          _react2.default.createElement(_Channels2.default, { socket: socket, onClick: this.changeActiveChannel, channels: channels, messages: messages, dispatch: dispatch })
        )
      );
      return _react2.default.createElement(
        'div',
        { style: { margin: '0', padding: '0', height: '100%', width: '100%', display: '-webkit-box' } },
        _react2.default.createElement(
          'div',
          { className: 'main' },
          _react2.default.createElement(
            'header',
            { style: { background: '#FFFFFF', color: 'black', flexGrow: '0', order: '0', fontSize: '2.3em', paddingLeft: '0.2em' } },
            _react2.default.createElement(
              'div',
              null,
              activeChannel
            )
          ),
          PrivateMessageModal,
          _react2.default.createElement(
            'ul',
            { style: { wordWrap: 'break-word', margin: '0', overflowY: 'auto', padding: '0', paddingBottom: '1em', flexGrow: '1', order: '1' }, ref: 'messageList' },
            filteredMessages.map(function (message) {
              return _react2.default.createElement(_MessageListItem2.default, { handleClickOnUser: _this3.handleClickOnUser, message: message, key: message.id });
            })
          ),
          _react2.default.createElement(_MessageComposer2.default, { socket: socket, activeChannel: activeChannel, user: user, onSave: this.handleSave })
        ),
        _react2.default.createElement(
          'footer',
          { style: { fontSize: '1em', position: 'fixed', bottom: '0.2em', left: '21.5rem', color: '#000000', width: '100%', opacity: '0.5' } },
          typers.length === 1 && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_TypingListItem2.default, { username: typers[0], key: 1 }),
              _react2.default.createElement(
                'span',
                null,
                ' is typing'
              )
            )
          ),
          typers.length === 2 && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_TypingListItem2.default, { username: typers[0], key: 1 }),
              _react2.default.createElement(
                'span',
                null,
                ' and '
              ),
              _react2.default.createElement(_TypingListItem2.default, { username: typers[1], key: 2 }),
              _react2.default.createElement(
                'span',
                null,
                ' are typing'
              )
            )
          ),
          typers.length > 2 && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              null,
              'Several people are typing'
            )
          )
        )
      );
    }
  }]);

  return Chat;
}(_react.Component);

Chat.propTypes = {
  messages: _propTypes2.default.array.isRequired,
  user: _propTypes2.default.object.isRequired,
  dispatch: _propTypes2.default.func.isRequired,
  channels: _propTypes2.default.array.isRequired,
  activeChannel: _propTypes2.default.string.isRequired,
  typers: _propTypes2.default.array.isRequired,
  socket: _propTypes2.default.object.isRequired
};
exports.default = Chat;