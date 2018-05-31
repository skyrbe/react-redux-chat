'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageListItem = function (_React$Component) {
  _inherits(MessageListItem, _React$Component);

  function MessageListItem() {
    _classCallCheck(this, MessageListItem);

    return _possibleConstructorReturn(this, (MessageListItem.__proto__ || Object.getPrototypeOf(MessageListItem)).apply(this, arguments));
  }

  _createClass(MessageListItem, [{
    key: 'handleClick',
    value: function handleClick(user) {
      this.props.handleClickOnUser(user);
    }
  }, {
    key: 'render',
    value: function render() {
      var message = this.props.message;

      return _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            'b',
            { style: { color: '#66c' } },
            _react2.default.createElement(
              'button',
              { style: { background: 'Transparent', backgroundRepeat: 'noRepeat', border: 'none', cursor: 'pointer', overflow: 'hidden', outline: 'none' }, onClick: this.handleClick.bind(this, message.user) },
              message.user.username
            )
          ),
          _react2.default.createElement(
            'i',
            { style: { color: '#aad', opacity: '0.8' } },
            message.time
          )
        ),
        _react2.default.createElement(
          'div',
          { style: { clear: 'both', paddingTop: '0.1em', marginTop: '-1px', paddingBottom: '0.3em' } },
          message.text
        )
      );
    }
  }]);

  return MessageListItem;
}(_react2.default.Component);

MessageListItem.propTypes = {
  message: _propTypes2.default.object.isRequired
};
exports.default = MessageListItem;