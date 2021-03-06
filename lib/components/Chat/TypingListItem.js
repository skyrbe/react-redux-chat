'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypingListItem = function TypingListItem(props) {
  var username = props.username;

  return _react2.default.createElement(
    'span',
    null,
    username
  );
};

TypingListItem.proptypes = {
  username: _propTypes2.default.string.isRequired
};

exports.default = TypingListItem;