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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelListModalItem = function ChannelListModalItem(props) {
  var selectedChannel = props.channel,
      _onClick = props.onClick,
      channel = props.channel;

  return _react2.default.createElement(
    'a',
    { className: (0, _classnames2.default)({ selected: channel === selectedChannel }),
      style: { cursor: 'hand', color: 'black' },
      onClick: function onClick() {
        return _onClick(channel);
      } },
    _react2.default.createElement(
      'li',
      { style: { cursor: 'pointer' } },
      _react2.default.createElement(
        'h5',
        null,
        channel.name
      )
    )
  );
};

ChannelListModalItem.propTypes = {
  channel: _propTypes2.default.object.isRequired,
  onClick: _propTypes2.default.func.isRequired
};

exports.default = ChannelListModalItem;