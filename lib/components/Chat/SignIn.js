'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactBootstrap = require('react-bootstrap');

var _authActions = require('../actions/authActions');

var authActions = _interopRequireWildcard(_authActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignIn = function (_Component) {
  _inherits(SignIn, _Component);

  function SignIn(props, context) {
    _classCallCheck(this, SignIn);

    var _this = _possibleConstructorReturn(this, (SignIn.__proto__ || Object.getPrototypeOf(SignIn)).call(this, props, context));

    _this.state = {
      username: _this.props.welcomePage || '',
      password: ''
    };
    return _this;
  }

  _createClass(SignIn, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.username.length) {
        this.refs.passwordInput.getInputDOMNode().focus();
      } else {
        this.refs.usernameInput.getInputDOMNode().focus();
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      if (event.target.name === 'username') {
        this.setState({ username: event.target.value });
      }
      if (event.target.name === 'password') {
        this.setState({ password: event.target.value });
      }
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      var dispatch = this.props.dispatch;

      if (this.state.username.length < 1) {
        this.refs.usernameInput.getInputDOMNode().focus();
      }
      if (this.state.username.length > 0 && this.state.password.length < 1) {
        this.refs.passwordInput.getInputDOMNode().focus();
      }
      if (this.state.username.length > 0 && this.state.password.length > 0) {
        var userObj = {
          username: this.state.username,
          password: this.state.password
        };
        dispatch(authActions.signIn(userObj));
        this.setState({ username: '', password: '' });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'header',
          { style: { display: 'flex', justifyContent: 'center', background: '#000000', color: '#FFFFFF', flexGrow: '0', order: '0' } },
          'Sign In to Chat'
        ),
        _react2.default.createElement(
          'main',
          { style: { display: 'flex', justifyContent: 'center' } },
          _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            _react2.default.createElement(_reactBootstrap.Input, {
              label: 'Username',
              ref: 'usernameInput',
              type: 'text',
              name: 'username',
              placeholder: 'Enter username',
              value: this.state.username,
              onChange: this.handleChange
            }),
            _react2.default.createElement(_reactBootstrap.Input, {
              label: 'Password',
              ref: 'passwordInput',
              type: 'password',
              name: 'password',
              placeholder: 'Enter password',
              value: this.state.password,
              onChange: this.handleChange
            }),
            _react2.default.createElement(
              _reactBootstrap.Button,
              {
                bsStyle: 'success',
                style: { width: '100%', height: '4rem', marginTop: '2rem' }, name: 'submitButton',
                type: 'submit' },
              _react2.default.createElement(
                'p',
                { style: { color: 'white', margin: '0', padding: '0', fontSize: '1.5em' } },
                'Sign In'
              )
            )
          )
        )
      );
    }
  }]);

  return SignIn;
}(_react.Component);

SignIn.propTypes = {
  welcomePage: _react.PropTypes.string.isRequired,
  dispatch: _react.PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    welcomePage: state.welcomePage
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)(SignIn);