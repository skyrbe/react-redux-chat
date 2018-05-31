'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _actions = require('../actions/actions');

var _reactRedux = require('react-redux');

var _reactBootstrap = require('react-bootstrap');

var _FBSignIn = require('./FBSignIn');

var _FBSignIn2 = _interopRequireDefault(_FBSignIn);

var _SignIn = require('./SignIn');

var _SignIn2 = _interopRequireDefault(_SignIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WelcomePage = function (_Component) {
  _inherits(WelcomePage, _Component);

  function WelcomePage(props, context) {
    _classCallCheck(this, WelcomePage);

    var _this = _possibleConstructorReturn(this, (WelcomePage.__proto__ || Object.getPrototypeOf(WelcomePage)).call(this, props, context));

    _this.state = {
      username: ''
    };
    return _this;
  }

  _createClass(WelcomePage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.usernameInput.getInputDOMNode().focus();
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      if (event.target.name === 'username') {
        this.setState({ username: event.target.value });
      }
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit() {
      var dispatch = this.props.dispatch;

      var username = this.state.username;
      dispatch((0, _actions.welcomePage)(username));
      this.setState({ username: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      var screenWidth = this.props.screenWidth;

      if (screenWidth < 500) {
        return _react2.default.createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'center', flexDirection: 'column' } },
          _react2.default.createElement(
            'header',
            { style: { textAlign: 'center' } },
            _react2.default.createElement(
              'p',
              null,
              'Welcome to React Redux Socket.io Chat'
            ),
            _react2.default.createElement(
              'p',
              null,
              'This is an open source chat program.'
            )
          ),
          _react2.default.createElement(
            'main',
            null,
            _react2.default.createElement(
              'form',
              null,
              _react2.default.createElement(_reactBootstrap.Input, {
                style: { height: '2.7em', fontSize: '1.3em', width: '100%' },
                ref: 'usernameInput',
                type: 'text',
                name: 'username',
                value: this.state.username,
                placeholder: 'Enter username',
                onChange: this.handleChange
              }),
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/signup' },
                _react2.default.createElement(
                  _reactBootstrap.Button,
                  {
                    bsStyle: 'success',
                    style: { width: '100%' },
                    type: 'submit',
                    onClick: this.handleSubmit },
                  _react2.default.createElement(
                    'p',
                    { style: { margin: '0', padding: '0', fontSize: '1.5em' } },
                    'Sign Up'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'p',
              { style: { margin: '1em', textAlign: 'center' } },
              'Or'
            ),
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/signin' },
              _react2.default.createElement(
                _reactBootstrap.Button,
                { style: { width: '100%' }, bsStyle: 'default' },
                'Sign in'
              )
            )
          )
        );
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'header',
          { style: { display: 'flex', justifyContent: 'center', flexGrow: '0', order: '0' } },
          _react2.default.createElement(
            'div',
            { style: { justifyContent: 'center' } },
            _react2.default.createElement(
              'p',
              { style: { fontSize: '1.5em', marginRight: '1em' } },
              'Welcome to React Redux Socket.io Chat'
            ),
            _react2.default.createElement(
              'p',
              null,
              'This is an open source chat program.'
            )
          )
        ),
        _react2.default.createElement(
          'main',
          { style: { display: 'flex', justifyContent: 'center' } },
          _react2.default.createElement(
            'form',
            { style: { height: '20rem', display: 'flex', justifyContent: 'center' } },
            _react2.default.createElement(
              'div',
              { style: { margin: 'auto', paddingRight: '0.2em', height: '3.5em' } },
              _react2.default.createElement(_reactBootstrap.Input, {
                style: { height: '2.7em', fontSize: '1.3em' },
                ref: 'usernameInput',
                type: 'text',
                name: 'username',
                value: this.state.username,
                placeholder: 'Enter username',
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              'section',
              { style: { margin: 'auto', width: '12em', height: '3.5em' } },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/signup' },
                _react2.default.createElement(
                  _reactBootstrap.Button,
                  {
                    bsStyle: 'success',
                    style: { margin: 'auto', width: '12em', height: '3.5em' },
                    type: 'submit',
                    onClick: this.handleSubmit },
                  _react2.default.createElement(
                    'p',
                    { style: { margin: '0', padding: '0', fontSize: '1.5em' } },
                    'Sign Up'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { height: '3.5em', width: '12em', alignSelf: 'center', display: 'flex', marginLeft: '1em' } },
            _react2.default.createElement(
              'p',
              { style: { marginRight: '1em', marginTop: '1em' } },
              ' Or '
            ),
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/signin' },
              _react2.default.createElement(
                _reactBootstrap.Button,
                { style: { margin: 'auto', height: '3.5em' }, bsStyle: 'default' },
                'Sign in'
              )
            )
          )
        )
      );
    }
  }]);

  return WelcomePage;
}(_react.Component);

WelcomePage.propTypes = {
  dispatch: _react.PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    screenWidth: state.environment.screenWidth
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(WelcomePage);