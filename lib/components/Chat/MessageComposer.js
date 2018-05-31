'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactBootstrap = require('react-bootstrap');

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageComposer = function (_Component) {
  _inherits(MessageComposer, _Component);

  function MessageComposer(props, context) {
    _classCallCheck(this, MessageComposer);

    var _this = _possibleConstructorReturn(this, (MessageComposer.__proto__ || Object.getPrototypeOf(MessageComposer)).call(this, props, context));

    _this.state = {
      text: '',
      typing: false
    };
    return _this;
  }

  _createClass(MessageComposer, [{
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var _props = this.props,
          user = _props.user,
          socket = _props.socket,
          activeChannel = _props.activeChannel;

      var text = event.target.value.trim();
      if (event.which === 13) {
        event.preventDefault();
        var newMessage = {
          id: '' + Date.now() + _nodeUuid2.default.v4(),
          channelID: this.props.activeChannel,
          text: text,
          user: user,
          time: _moment2.default.utc().format('lll')
        };
        socket.emit('new message', newMessage);
        socket.emit('stop typing', { user: user.username, channel: activeChannel });
        this.props.onSave(newMessage);
        this.setState({ text: '', typing: false });
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      var _props2 = this.props,
          socket = _props2.socket,
          user = _props2.user,
          activeChannel = _props2.activeChannel;

      this.setState({ text: event.target.value });
      if (event.target.value.length > 0 && !this.state.typing) {
        socket.emit('typing', { user: user.username, channel: activeChannel });
        this.setState({ typing: true });
      }
      if (event.target.value.length === 0 && this.state.typing) {
        socket.emit('stop typing', { user: user.username, channel: activeChannel });
        this.setState({ typing: false });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { style: {
          zIndex: '52',
          left: '21.1rem',
          right: '1rem',
          width: '100%',
          flexShrink: '0',
          order: '2',
          marginTop: '0.5em'
        } });
    }
  }]);

  return MessageComposer;
}(_react.Component);

MessageComposer.propTypes = {
  activeChannel: _propTypes2.default.string.isRequired,
  onSave: _propTypes2.default.func.isRequired,
  user: _propTypes2.default.object.isRequired,
  socket: _propTypes2.default.object.isRequired
};
exports.default = MessageComposer;