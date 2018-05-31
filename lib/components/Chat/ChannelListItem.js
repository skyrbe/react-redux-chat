'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelListItem = function ChannelListItem(props) {
  var selectedChannel = props.channel,
      _onClick = props.onClick,
      channel = props.channel;

  return _react2.default.createElement(
    _reactBootstrap.Button,
    { bsSize: 'xsmall', bsStyle: 'primary' },
    _react2.default.createElement(
      'a',
      { className: (0, _classnames2.default)({ selected: channel === selectedChannel }),
        style: { cursor: 'hand', color: 'white' },
        onClick: function onClick() {
          return _onClick(channel);
        } },
      _react2.default.createElement(
        'li',
        { style: { textAlign: 'left', cursor: 'pointer', marginLeft: '2em' } },
        _react2.default.createElement(
          'h5',
          null,
          channel.name
        )
      )
    )
  );
};

ChannelListItem.propTypes = {
  channel: _propTypes2.default.object.isRequired,
  onClick: _propTypes2.default.func.isRequired
};

exports.default = ChannelListItem;