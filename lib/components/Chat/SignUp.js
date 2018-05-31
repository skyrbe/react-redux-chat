'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('../actions/actions');

var actions = _interopRequireWildcard(_actions);

var _reactBootstrap = require('react-bootstrap');

var _authActions = require('../actions/authActions');

var authActions = _interopRequireWildcard(_authActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignUp = function (_Component) {
  _inherits(SignUp, _Component);

  function SignUp(props, context) {
    _classCallCheck(this, SignUp);

    var _this = _possibleConstructorReturn(this, (SignUp.__proto__ || Object.getPrototypeOf(SignUp)).call(this, props, context));

    _this.state = {
      username: _this.props.welcomePage || '',
      password: '',
      confirmPassword: ''
    };
    return _this;
  }

  _createClass(SignUp, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          dispatch = _props.dispatch,
          userValidation = _props.userValidation;

      if (userValidation.length === 0) {
        dispatch(actions.usernameValidationList());
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.username.length) {
        this.refs.passwordInput.getInputDOMNode().focus();
      } else {
        this.refs.usernameInput.getInputDOMNode().focus();
      }
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      var dispatch = this.props.dispatch;

      if (!this.state.username.length) {
        this.refs.usernameInput.getInputDOMNode().focus();
      }
      if (this.state.username.length && !this.state.password.length) {
        this.refs.passwordInput.getInputDOMNode().focus();
      }
      if (this.state.username.length && this.state.password.length && !this.state.confirmPassword.length) {
        this.refs.confirmPasswordInput.getInputDOMNode().focus();
      }
      if (this.state.username.length && this.state.password.length && this.state.confirmPassword.length) {
        var userObj = {
          username: this.state.username,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        };
        dispatch(authActions.signUp(userObj));
        var initLobby = {
          name: "Lobby",
          id: 0,
          private: false
        };
        dispatch(actions.createChannel(initLobby));
        this.setState({ username: '', password: '', confirmPassword: '' });
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
      if (event.target.name === 'confirm-password') {
        this.setState({ confirmPassword: event.target.value });
      }
    }
  }, {
    key: 'validateUsername',
    value: function validateUsername() {
      var _this2 = this;

      var userValidation = this.props.userValidation;

      if (userValidation.filter(function (user) {
        return user === _this2.state.username.trim();
      }).length > 0) {
        return 'error';
      }
      return 'success';
    }
  }, {
    key: 'validateConfirmPassword',
    value: function validateConfirmPassword() {
      if (this.state.confirmPassword.length > 0 && this.state.password.length > 0) {
        if (this.state.password === this.state.confirmPassword) {
          return 'success';
        }
        return 'error';
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
          'Sign Up'
        ),
        _react2.default.createElement(
          'main',
          { style: { display: 'flex', justifyContent: 'center' } },
          _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            _react2.default.createElement(
              'section',
              { style: { height: '6em' } },
              _react2.default.createElement(_reactBootstrap.Input, {
                label: 'Username',
                ref: 'usernameInput',
                type: 'text',
                help: this.validateUsername() === 'error' && 'A user with that name already exists!',
                bsStyle: this.validateUsername(),
                hasFeedback: true,
                name: 'username',
                autoFocus: 'true',
                placeholder: 'Enter username',
                value: this.state.username,
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              'section',
              { style: { height: '6em' } },
              _react2.default.createElement(_reactBootstrap.Input, {
                label: 'Password',
                ref: 'passwordInput',
                type: 'password',
                name: 'password',
                value: this.state.password,
                placeholder: 'Enter password',
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              'section',
              { style: { height: '6em' } },
              _react2.default.createElement(_reactBootstrap.Input, {
                label: 'Confirm Password',
                ref: 'confirmPasswordInput',
                help: this.validateConfirmPassword() === 'error' && 'Your password doesn\'t match',
                type: 'password',
                name: 'confirm-password',
                placeholder: 'Enter password again', value: this.state.confirmPassword,
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              {
                disabled: this.validateUsername() === 'error' || this.validateConfirmPassword() === 'error' && true,
                bsStyle: 'success',
                style: { width: '100%', height: '4rem', marginTop: '2rem' },
                onClick: this.handleSubmit,
                type: 'submit' },
              _react2.default.createElement(
                'p',
                { style: { color: 'white', margin: '0', padding: '0', fontSize: '1.5em' } },
                'Sign Up'
              )
            )
          )
        )
      );
    }
  }]);

  return SignUp;
}(_react.Component);

SignUp.propTypes = {
  welcomePage: _react.PropTypes.string.isRequired,
  userValidation: _react.PropTypes.array.isrequired,
  dispatch: _react.PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    welcomePage: state.welcomePage,
    userValidation: state.userValidation.data
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SignUp);