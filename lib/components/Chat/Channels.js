'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ChannelListItem = require('./ChannelListItem');

var _ChannelListItem2 = _interopRequireDefault(_ChannelListItem);

var _ChannelListModalItem = require('./ChannelListModalItem');

var _ChannelListModalItem2 = _interopRequireDefault(_ChannelListModalItem);

var _reactBootstrap = require('react-bootstrap');

var _actions = require('../../reducers/actions');

var actions = _interopRequireWildcard(_actions);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Channels = function (_Component) {
  _inherits(Channels, _Component);

  function Channels(props, context) {
    _classCallCheck(this, Channels);

    var _this = _possibleConstructorReturn(this, (Channels.__proto__ || Object.getPrototypeOf(Channels)).call(this, props, context));

    _this.state = {
      addChannelModal: false,
      channelName: '',
      moreChannelsModal: false
    };
    return _this;
  }

  _createClass(Channels, [{
    key: 'handleChangeChannel',
    value: function handleChangeChannel(channel) {
      if (this.state.moreChannelsModal) {
        this.closeMoreChannelsModal();
      }
      this.props.onClick(channel);
    }
  }, {
    key: 'openAddChannelModal',
    value: function openAddChannelModal(event) {
      event.preventDefault();
      this.setState({ addChannelModal: true });
    }
  }, {
    key: 'closeAddChannelModal',
    value: function closeAddChannelModal(event) {
      event.preventDefault();
      this.setState({ addChannelModal: false });
    }
  }, {
    key: 'handleModalChange',
    value: function handleModalChange(event) {
      this.setState({ channelName: event.target.value });
    }
  }, {
    key: 'handleModalSubmit',
    value: function handleModalSubmit(event) {
      var _this2 = this;

      var _props = this.props,
          channels = _props.channels,
          dispatch = _props.dispatch,
          socket = _props.socket;

      event.preventDefault();
      if (this.state.channelName.length < 1) {
        this.refs.channelName.getInputDOMNode().focus();
      }
      if (this.state.channelName.length > 0 && channels.filter(function (channel) {
        return channel.name === _this2.state.channelName.trim();
      }).length < 1) {
        var newChannel = {
          name: this.state.channelName.trim(),
          id: '' + Date.now() + _nodeUuid2.default.v4(),
          private: false
        };
        dispatch(actions.createChannel(newChannel));
        this.handleChangeChannel(newChannel);
        socket.emit('new channel', newChannel);
        this.setState({ channelName: '' });
        this.closeAddChannelModal();
      }
    }
  }, {
    key: 'validateChannelName',
    value: function validateChannelName() {
      var _this3 = this;

      var channels = this.props.channels;

      if (channels.filter(function (channel) {
        return channel.name === _this3.state.channelName.trim();
      }).length > 0) {
        return 'error';
      }
      return 'success';
    }
  }, {
    key: 'openMoreChannelsModal',
    value: function openMoreChannelsModal(event) {
      event.preventDefault();
      this.setState({ moreChannelsModal: true });
    }
  }, {
    key: 'closeMoreChannelsModal',
    value: function closeMoreChannelsModal(event) {
      event.preventDefault();
      this.setState({ moreChannelsModal: false });
    }
  }, {
    key: 'createChannelWithinModal',
    value: function createChannelWithinModal() {
      this.closeMoreChannelsModal();
      this.openAddChannelModal();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          channels = _props2.channels,
          messages = _props2.messages;

      var filteredChannels = channels.slice(0, 8);
      var moreChannelsBoolean = channels.length > 8;
      var restOfTheChannels = channels.slice(8);
      var newChannelModal = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactBootstrap.Modal,
          { key: 1, show: this.state.addChannelModal, onHide: this.closeAddChannelModal },
          _react2.default.createElement(
            _reactBootstrap.Modal.Header,
            { closeButton: true },
            _react2.default.createElement(
              _reactBootstrap.Modal.Title,
              null,
              'Add New Channel'
            )
          ),
          _react2.default.createElement(_reactBootstrap.Modal.Body, null),
          _react2.default.createElement(
            _reactBootstrap.Modal.Footer,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { onClick: this.closeAddChannelModal },
              'Cancel'
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { disabled: this.validateChannelName() === 'error' && 'true', onClick: this.handleModalSubmit, type: 'submit' },
              'Create Channel'
            )
          )
        )
      );
      var moreChannelsModal = _react2.default.createElement(
        'div',
        { style: { background: 'grey' } },
        _react2.default.createElement(
          _reactBootstrap.Modal,
          { key: 2, show: this.state.moreChannelsModal, onHide: this.closeMoreChannelsModal },
          _react2.default.createElement(
            _reactBootstrap.Modal.Header,
            { closeButton: true },
            _react2.default.createElement(
              _reactBootstrap.Modal.Title,
              null,
              'More Channels'
            ),
            _react2.default.createElement(
              'a',
              { onClick: this.createChannelWithinModal, style: { 'cursor': 'pointer', 'color': '#85BBE9' } },
              'Create a channel'
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Body,
            null,
            _react2.default.createElement(
              'ul',
              { style: { height: 'auto', margin: '0', overflowY: 'auto', padding: '0' } },
              restOfTheChannels.map(function (channel) {
                return _react2.default.createElement(_ChannelListModalItem2.default, { channel: channel, key: channel.id, onClick: _this4.handleChangeChannel });
              })
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Footer,
            null,
            _react2.default.createElement(
              'button',
              { onClick: this.closeMoreChannelsModal },
              'Cancel'
            )
          )
        )
      );
      return _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { style: { paddingLeft: '0.8em', fontSize: '1.5em' } },
            'Channels',
            _react2.default.createElement(
              'button',
              { onClick: this.openAddChannelModal, style: { fontSize: '0.8em', 'background': 'Transparent', marginLeft: '2.8em', 'backgroundRepeat': 'noRepeat', 'border': 'none', 'cursor': 'pointer', 'overflow': 'hidden', 'outline': 'none' } },
              _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'plus' })
            )
          )
        ),
        newChannelModal,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'ul',
            { style: { display: 'flex', flexDirection: 'column', listStyle: 'none', margin: '0', overflowY: 'auto', padding: '0' } },
            filteredChannels.map(function (channel) {
              return _react2.default.createElement(_ChannelListItem2.default, { style: { paddingLeft: '0.8em', background: '#2E6DA4', height: '0.7em' }, messageCount: messages.filter(function (msg) {
                  return msg.channelID === channel.name;
                }).length, channel: channel, key: channel.id, onClick: _this4.handleChangeChannel });
            })
          ),
          moreChannelsBoolean && _react2.default.createElement(
            'a',
            { onClick: this.openMoreChannelsModal, style: { 'cursor': 'pointer', 'color': '#85BBE9' } },
            ' + ',
            channels.length - 8,
            ' more...'
          ),
          moreChannelsModal
        )
      );
    }
  }]);

  return Channels;
}(_react.Component);

Channels.propTypes = {
  channels: _propTypes2.default.array.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  messages: _propTypes2.default.array.isRequired,
  dispatch: _propTypes2.default.func.isRequired
};
exports.default = Channels;