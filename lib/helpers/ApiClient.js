'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var methods = ['get', 'post', 'put', 'patch', 'del'];
var HOSTNAME = _constants.APIConfig.hostname;
var ENDPOINTS = _constants.APIConfig.endpoints;

function formatUrl(path) {
  var mappedEndpoint = ENDPOINTS[path];
  if (path.indexOf('/') !== -1) {
    mappedEndpoint = "";
    var splitPathArray = path.split('/');
    mappedEndpoint += ENDPOINTS[splitPathArray[0]] + '/';
    splitPathArray.shift();
    mappedEndpoint += splitPathArray.join('/');
  }
  var adjustedPath = mappedEndpoint[0] !== '/' ? HOSTNAME + '/' + mappedEndpoint : HOSTNAME + mappedEndpoint;
  return adjustedPath;
}

var ApiClient = function () {
  function ApiClient(req) {
    var _this = this;

    _classCallCheck(this, ApiClient);

    methods.forEach(function (method) {
      _this[method] = function (path) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            params = _ref.params,
            data = _ref.data,
            headers = _ref.headers,
            files = _ref.files,
            fields = _ref.fields;

        return new Promise(function (resolve, reject) {
          var request = _superagent2.default[method](formatUrl(path));
          console.log("request is ", request);
          if (path.indexOf('fakeapi') !== -1) {
            var fakePath = path;
            var splitPathArray = fakePath.split('/');
            splitPathArray.shift();
            var constructedURL = splitPathArray.join('/');
            request = _superagent2.default[method]('http://localhost:3004/' + constructedURL);
          }
          if (params) {
            request.query(params);
          }

          if (headers) {
            request.set(headers);
          }

          if (_this.token) {
            request.set('Authorization', 'Bearer ' + _this.token);
          }

          if (files) {
            files.forEach(function (file) {
              return request.attach(file.key, file.value);
            });
          }

          if (fields) {
            fields.forEach(function (item) {
              return request.field(item.key, item.value);
            });
          }

          if (data) {
            request.send(data);
          }

          request.end(function (err) {
            var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                body = _ref2.body;

            return err ? reject(body || err) : resolve(body);
          });
        });
      };
    });
  }

  _createClass(ApiClient, [{
    key: 'empty',
    value: function empty() {}
  }]);

  return ApiClient;
}();

exports.default = ApiClient;