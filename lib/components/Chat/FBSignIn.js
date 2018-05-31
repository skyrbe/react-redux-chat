'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FBSignIn = function FBSignIn(props) {
  return _react2.default.createElement(
    'section',
    { style: { justifyContent: 'center', display: 'flex' } },
    _react2.default.createElement(
      'a',
      { style: { margin: 'auto', width: '20em', height: '3.5em' }, href: '/api/auth/facebook' },
      _react2.default.createElement(
        _reactBootstrap.Button,
        {
          bsStyle: 'primary',
          style: { margin: 'auto', width: '20em', height: '3.5em' }
        },
        _react2.default.createElement(
          'p',
          { style: { margin: '0', padding: '0', fontSize: '1.5em' } },
          _react2.default.createElement('i', { className: 'fa fa-facebook', style: { marginRight: '1em' } }),
          'Sign In With Facebook'
        )
      )
    )
  );
};

exports.default = FBSignIn;