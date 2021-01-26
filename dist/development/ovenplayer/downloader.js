/*! ovenplayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (MIT) | Github : https://ovenplayer.com */
(window["webpackJsonpOvenPlayer"] = window["webpackJsonpOvenPlayer"] || []).push([["downloader"],{

/***/ "./src/js/utils/downloader.js":
/*!************************************!*\
  !*** ./src/js/utils/downloader.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _iconvLite = __webpack_require__(/*! iconv-lite */ "./node_modules/iconv-lite/lib/index.js");

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _chardet = __webpack_require__(/*! chardet */ "./node_modules/chardet/index.js");

var _chardet2 = _interopRequireDefault(_chardet);

var _http = __webpack_require__(/*! http */ "./node_modules/stream-http/index.js");

var _http2 = _interopRequireDefault(_http);

var _url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

var _url2 = _interopRequireDefault(_url);

var _path = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");

var _path2 = _interopRequireDefault(_path);

var _querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

var _querystring2 = _interopRequireDefault(_querystring);

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @description
 * http request
 * @param {object|string} [options]
 * @param {function} [callback]
 * @example
 * request('url', function(err, res, body) { });
 * request({url: '', headers: {}, method: 'POST'}, function(err, res, body) { });
 */
function request(options, callback) {
    var opts = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
        encoding: 'utf8',
        // If the callback body is buffer, it can hanlder document pipe simply
        isBuffer: false,
        json: false
    };

    if (_underscore2["default"].isString(options)) {
        opts.url = options;
    } else {
        _underscore2["default"].extend(opts, options);
    }

    // Append request data
    if (opts.data) {
        if (opts.method === 'GET') {
            opts.url += '?' + _querystring2["default"].stringify(opts.data);
        } else {
            opts.data = JSON.stringify(opts.data);
            opts.headers['Content-Length'] = new Buffer(opts.data).length;
        }
    }

    // Extend request url object
    //2018-12-14 underdog@airensoft.com Added 'protocol' params. cus This is don't loading https file.
    _underscore2["default"].extend(opts, _underscore2["default"].pick(_url2["default"].parse(opts.url), 'protocol', 'hostname', 'port', 'path', 'auth'));
    delete opts.url;

    var req = _http2["default"].request(opts, function (res) {
        var body = [];
        var size = 0;

        res.on('data', function (chunk) {
            body.push(chunk);
            size += chunk.length;
        });

        res.on('end', function () {
            var result = '';

            // Buffer
            if (opts.isBuffer) {
                result = Buffer.concat(body, size);
            } else {
                var buffer = new Buffer(size);
                for (var i = 0, pos = 0, l = body.length; i < l; i++) {
                    var chunk = body[i];
                    chunk.copy(buffer, pos);
                    pos += chunk.length;
                }
                result = _iconvLite2["default"].decode(buffer, _chardet2["default"].detect(buffer)).toString(); //buffer.toString(opts.encoding);

                if (opts.json) {
                    result = JSON.parse(result);
                }
            }

            callback(null, res, result);
        });
    });

    req.on('error', callback);

    if (opts.method !== 'GET' && opts.data) {
        req.write(opts.data);
    }

    req.end();
} /**
   * https://github.com/Tickaroo/request-ajax
   *
   * @fileoverview Http request in node.js
   * @author douzi <liaowei08@gmail.com>
   */

//2018-12-14 underdog@airensoft.com pre decoding
exports["default"] = request;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** ./streams (ignored) ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/*!*******************************!*\
  !*** ./extend-node (ignored) ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL3V0aWxzL2Rvd25sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vT3ZlblBsYXllci8uL3N0cmVhbXMgKGlnbm9yZWQpIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9leHRlbmQtbm9kZSAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vT3ZlblBsYXllci91dGlsIChpZ25vcmVkKSIsIndlYnBhY2s6Ly9PdmVuUGxheWVyL3V0aWwgKGlnbm9yZWQpPzQyMjciXSwibmFtZXMiOlsicmVxdWVzdCIsIm9wdGlvbnMiLCJjYWxsYmFjayIsIm9wdHMiLCJoZWFkZXJzIiwibWV0aG9kIiwiZW5jb2RpbmciLCJpc0J1ZmZlciIsImpzb24iLCJfIiwiaXNTdHJpbmciLCJ1cmwiLCJleHRlbmQiLCJkYXRhIiwicXVlcnlzdHJpbmciLCJzdHJpbmdpZnkiLCJKU09OIiwiQnVmZmVyIiwibGVuZ3RoIiwicGljayIsInBhcnNlIiwicmVxIiwiaHR0cCIsInJlcyIsImJvZHkiLCJzaXplIiwib24iLCJjaHVuayIsInB1c2giLCJyZXN1bHQiLCJjb25jYXQiLCJidWZmZXIiLCJpIiwicG9zIiwibCIsImNvcHkiLCJJY29udiIsImRlY29kZSIsIkNoYXJkZXQiLCJkZXRlY3QiLCJ0b1N0cmluZyIsIndyaXRlIiwiZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQVFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7Ozs7Ozs7O0FBU0EsU0FBU0EsT0FBVCxDQUFpQkMsT0FBakIsRUFBMEJDLFFBQTFCLEVBQW9DO0FBQ2hDLFFBQUlDLE9BQU87QUFDUEMsaUJBQVM7QUFDTCw0QkFBZ0I7QUFEWCxTQURGO0FBSVBDLGdCQUFRLEtBSkQ7QUFLUEMsa0JBQVUsTUFMSDtBQU1QO0FBQ0FDLGtCQUFVLEtBUEg7QUFRUEMsY0FBTTtBQVJDLEtBQVg7O0FBV0EsUUFBSUMsd0JB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c291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9UaWNrYXJvby9yZXF1ZXN0LWFqYXhcclxuICpcclxuICogQGZpbGVvdmVydmlldyBIdHRwIHJlcXVlc3QgaW4gbm9kZS5qc1xyXG4gKiBAYXV0aG9yIGRvdXppIDxsaWFvd2VpMDhAZ21haWwuY29tPlxyXG4gKi9cclxuXHJcbi8vMjAxOC0xMi0xNCB1bmRlcmRvZ0BhaXJlbnNvZnQuY29tIHByZSBkZWNvZGluZ1xyXG5pbXBvcnQgSWNvbnYgZnJvbSBcImljb252LWxpdGVcIjtcclxuaW1wb3J0IENoYXJkZXQgZnJvbSBcImNoYXJkZXRcIjtcclxuaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcclxuaW1wb3J0IHVybCBmcm9tIFwidXJsXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBxdWVyeXN0cmluZyBmcm9tIFwicXVlcnlzdHJpbmdcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogaHR0cCByZXF1ZXN0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fHN0cmluZ30gW29wdGlvbnNdXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjYWxsYmFja11cclxuICogQGV4YW1wbGVcclxuICogcmVxdWVzdCgndXJsJywgZnVuY3Rpb24oZXJyLCByZXMsIGJvZHkpIHsgfSk7XHJcbiAqIHJlcXVlc3Qoe3VybDogJycsIGhlYWRlcnM6IHt9LCBtZXRob2Q6ICdQT1NUJ30sIGZ1bmN0aW9uKGVyciwgcmVzLCBib2R5KSB7IH0pO1xyXG4gKi9cclxuZnVuY3Rpb24gcmVxdWVzdChvcHRpb25zLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIG9wdHMgPSB7XHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGVuY29kaW5nOiAndXRmOCcsXHJcbiAgICAgICAgLy8gSWYgdGhlIGNhbGxiYWNrIGJvZHkgaXMgYnVmZmVyLCBpdCBjYW4gaGFubGRlciBkb2N1bWVudCBwaXBlIHNpbXBseVxyXG4gICAgICAgIGlzQnVmZmVyOiBmYWxzZSxcclxuICAgICAgICBqc29uOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoXy5pc1N0cmluZyhvcHRpb25zKSkge1xyXG4gICAgICAgIG9wdHMudXJsID0gb3B0aW9ucztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgXy5leHRlbmQob3B0cywgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXBwZW5kIHJlcXVlc3QgZGF0YVxyXG4gICAgaWYgKG9wdHMuZGF0YSkge1xyXG4gICAgICAgIGlmIChvcHRzLm1ldGhvZCA9PT0gJ0dFVCcpIHtcclxuICAgICAgICAgICAgb3B0cy51cmwgKz0gJz8nICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KG9wdHMuZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3B0cy5kYXRhID0gSlNPTi5zdHJpbmdpZnkob3B0cy5kYXRhKTtcclxuICAgICAgICAgICAgb3B0cy5oZWFkZXJzWydDb250ZW50LUxlbmd0aCddID0gbmV3IEJ1ZmZlcihvcHRzLmRhdGEpLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXh0ZW5kIHJlcXVlc3QgdXJsIG9iamVjdFxyXG4gICAgLy8yMDE4LTEyLTE0IHVuZGVyZG9nQGFpcmVuc29mdC5jb20gQWRkZWQgJ3Byb3RvY29sJyBwYXJhbXMuIGN1cyBUaGlzIGlzIGRvbid0IGxvYWRpbmcgaHR0cHMgZmlsZS5cclxuICAgIF8uZXh0ZW5kKG9wdHMsIF8ucGljayh1cmwucGFyc2Uob3B0cy51cmwpLCAncHJvdG9jb2wnLCAnaG9zdG5hbWUnLCAncG9ydCcsICdwYXRoJywgJ2F1dGgnKSk7XHJcbiAgICBkZWxldGUgb3B0cy51cmw7XHJcblxyXG4gICAgdmFyIHJlcSA9IGh0dHAucmVxdWVzdChvcHRzLCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICB2YXIgYm9keSA9IFtdO1xyXG4gICAgICAgIHZhciBzaXplID0gMDtcclxuXHJcbiAgICAgICAgcmVzLm9uKCdkYXRhJywgZnVuY3Rpb24oY2h1bmspIHtcclxuICAgICAgICAgICAgYm9keS5wdXNoKGNodW5rKTtcclxuICAgICAgICAgICAgc2l6ZSArPSBjaHVuay5sZW5ndGg7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlcy5vbignZW5kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIC8vIEJ1ZmZlclxyXG4gICAgICAgICAgICBpZiAob3B0cy5pc0J1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gIEJ1ZmZlci5jb25jYXQoYm9keSwgc2l6ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gbmV3IEJ1ZmZlcihzaXplKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBwb3MgPSAwLCBsID0gYm9keS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2h1bmsgPSBib2R5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNodW5rLmNvcHkoYnVmZmVyLCBwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcyArPSBjaHVuay5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBJY29udi5kZWNvZGUoYnVmZmVyLCBDaGFyZGV0LmRldGVjdChidWZmZXIpKS50b1N0cmluZygpOyAvL2J1ZmZlci50b1N0cmluZyhvcHRzLmVuY29kaW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5qc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXMsIHJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXEub24oJ2Vycm9yJywgY2FsbGJhY2spO1xyXG5cclxuICAgIGlmIChvcHRzLm1ldGhvZCAhPT0gJ0dFVCcgJiYgb3B0cy5kYXRhKSB7XHJcbiAgICAgICAgcmVxLndyaXRlKG9wdHMuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVxLmVuZCgpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZXF1ZXN0OyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=