/*! ovenplayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (MIT) | Github : https://ovenplayer.com */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["OvenPlayer"] = factory();
	else
		root["OvenPlayer"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"ovenplayer.sdk": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac":"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac","ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf":"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf","ovenplayer.provider.DashProvider":"ovenplayer.provider.DashProvider","ovenplayer.provider.HlsProvider":"ovenplayer.provider.HlsProvider","ovenplayer.provider.Html5":"ovenplayer.provider.Html5","ovenplayer.provider.WebRTCProvider":"ovenplayer.provider.WebRTCProvider","ovenplayer.provider.RtmpProvider":"ovenplayer.provider.RtmpProvider","smiparser":"smiparser","vendors~downloader":"vendors~downloader","downloader":"downloader","vttparser":"vttparser"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonpOvenPlayer"] = window["webpackJsonpOvenPlayer"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/ovenplayer.sdk.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/js/api/Api.js":
/*!***************************!*\
  !*** ./src/js/api/Api.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Manager = __webpack_require__(/*! api/caption/Manager */ "./src/js/api/caption/Manager.js");

var _Manager2 = _interopRequireDefault(_Manager);

var _Configurator = __webpack_require__(/*! api/Configurator */ "./src/js/api/Configurator.js");

var _Configurator2 = _interopRequireDefault(_Configurator);

var _EventEmitter = __webpack_require__(/*! api/EventEmitter */ "./src/js/api/EventEmitter.js");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _LazyCommandExecutor = __webpack_require__(/*! api/LazyCommandExecutor */ "./src/js/api/LazyCommandExecutor.js");

var _LazyCommandExecutor2 = _interopRequireDefault(_LazyCommandExecutor);

var _Manager3 = __webpack_require__(/*! api/media/Manager */ "./src/js/api/media/Manager.js");

var _Manager4 = _interopRequireDefault(_Manager3);

var _Manager5 = __webpack_require__(/*! api/playlist/Manager */ "./src/js/api/playlist/Manager.js");

var _Manager6 = _interopRequireDefault(_Manager5);

var _Controller = __webpack_require__(/*! api/provider/Controller */ "./src/js/api/provider/Controller.js");

var _Controller2 = _interopRequireDefault(_Controller);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _version = __webpack_require__(/*! version */ "./src/js/version.js");

var _ApiExpansions = __webpack_require__(/*! api/ApiExpansions */ "./src/js/api/ApiExpansions.js");

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */

var Api = function Api(container) {
    var that = {};
    (0, _EventEmitter2["default"])(that);

    console.log("[[OvenPlayer]] v." + _version.version);
    OvenPlayerConsole.log("API loaded.");

    var playlistManager = (0, _Manager6["default"])(that);
    var providerController = (0, _Controller2["default"])();
    var userAgentObject = (0, _browser.analUserAgent)();
    var mediaManager = (0, _Manager4["default"])(container, userAgentObject);
    var currentProvider = "";
    var playerConfig = "";
    var lazyQueue = "";
    var captionManager = "";

    var webrtcRetry = false;
    var WEBRTC_RETRY_COUNT = 3;
    var webrtcRetryCount = WEBRTC_RETRY_COUNT;
    var webrtcRetryInterval = 1000;
    var webrtcRetryTimer = null;

    var runNextPlaylist = function runNextPlaylist(index) {
        OvenPlayerConsole.log("runNextPlaylist");
        var nextPlaylistIndex = index; // || playlistManager.getCurrentPlaylistIndex() + 1;
        var playlist = playlistManager.getPlaylist();
        var hasNextPlaylist = playlist[nextPlaylistIndex] ? true : false;
        //init source index
        playerConfig.setSourceIndex(0);

        //set Golbal Volume info
        playerConfig.setVolume(currentProvider.getVolume());

        if (hasNextPlaylist) {
            //that.pause();
            lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['play', 'seek', 'stop']);
            playlistManager.setCurrentPlaylist(nextPlaylistIndex);
            initProvider();

            if (!playerConfig.isAutoStart()) {
                //Anyway nextplaylist runs autoStart!.
                that.play();
            }
        } else {
            //All Playlist Ended.
            that.trigger(_constants.ALL_PLAYLIST_ENDED, null);
        }
    };
    var initProvider = function initProvider(lastPlayPosition) {
        var pickQualityFromSource = function pickQualityFromSource(sources) {
            var quality = 0;
            if (sources) {
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]["default"]) {
                        quality = i;
                    }
                    if (playerConfig.getSourceIndex() === i) {
                        return i;
                    }
                    /*if (playerConfig.getSourceLabel() && sources[i].label === playerConfig.getSourceLabel() ) {
                        return i;
                    }*/
                }
            }
            return quality;
        };

        return providerController.loadProviders(playlistManager.getCurrentPlayList()).then(function (Providers) {

            if (Providers.length < 1) {
                throw _constants.ERRORS.codes[_constants.INIT_UNSUPPORT_ERROR];
            }

            if (currentProvider) {
                currentProvider.destroy();
                currentProvider = null;
            }
            if (captionManager) {
                captionManager.destroy();
                captionManager = null;
            }
            captionManager = (0, _Manager2["default"])(that, playlistManager.getCurrentPlaylistIndex());
            OvenPlayerConsole.log("API : init() captions");

            var currentSourceIndex = pickQualityFromSource(playlistManager.getCurrentSources());
            var providerName = Providers[currentSourceIndex]["name"];
            OvenPlayerConsole.log("API : init() provider", providerName);
            //Init Provider.
            currentProvider = Providers[currentSourceIndex].provider(mediaManager.createMedia(providerName, playerConfig), playerConfig, playlistManager.getCurrentAdTag());

            if (providerName === _constants.PROVIDER_RTMP) {
                //If provider type is RTMP, we accepts RtmpExpansion.
                _extends(that, (0, _ApiExpansions.ApiRtmpExpansion)(currentProvider));
            }

            //This passes the event created by the Provider to API.
            currentProvider.on("all", function (name, data) {

                if (name === _constants.ERROR) {

                    // Chrome >=80 on Android misses h246 in SDP when first time after web page loaded.
                    // So wait until browser get h264 capabilities and create answer SDP.
                    if (userAgentObject.os === 'Android' && userAgentObject.browser === 'Chrome') {

                        if (data && data.code && data.code === _constants.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR) {

                            setTimeout(function () {

                                that.setCurrentSource(that.getCurrentSource());
                            }, webrtcRetryInterval);

                            return;
                        }
                    }
                }

                that.trigger(name, data);

                if (name === "complete") {
                    runNextPlaylist(playlistManager.getCurrentPlaylistIndex() + 1);
                }

                if (name === _constants.PLAYER_PLAY) {
                    clearInterval(webrtcRetryTimer);
                    webrtcRetry = false;
                    webrtcRetryCount = WEBRTC_RETRY_COUNT;
                }

                //Auto switching next source when player load failed by amiss source.
                //data.code === PLAYER_FILE_ERROR
                if (name === _constants.ERROR || name === _constants.NETWORK_UNSTABLED) {

                    if (data.code === _constants.PLAYER_WEBRTC_UNEXPECTED_DISCONNECT || !playerConfig.getConfig().autoFallback && data.code === _constants.PLAYER_WEBRTC_NETWORK_SLOW) {

                        if (!webrtcRetry) {

                            webrtcRetry = true;
                            webrtcRetryCount = WEBRTC_RETRY_COUNT;
                        }
                    }

                    if (webrtcRetry && webrtcRetryCount > 0) {

                        webrtcRetryTimer = setTimeout(function () {

                            that.setCurrentSource(playerConfig.getSourceIndex());
                            webrtcRetryCount--;
                        }, webrtcRetryInterval);

                        return;
                    }

                    if (webrtcRetry && webrtcRetryCount <= 0) {

                        clearInterval(webrtcRetryTimer);
                        webrtcRetry = false;
                        webrtcRetryCount = WEBRTC_RETRY_COUNT;
                    }

                    if (playerConfig.getConfig().autoFallback && playerConfig.getSourceIndex() + 1 < that.getSources().length) {
                        //this sequential has available source.
                        that.pause();
                        that.setCurrentSource(playerConfig.getSourceIndex() + 1);
                    }
                }
            });
        }).then(function () {

            //provider's preload() have to made Promise. Cuz it overcomes 'flash loading timing problem'.
            currentProvider.preload(playlistManager.getCurrentSources(), lastPlayPosition).then(function () {

                that.trigger(_constants.READY);

                lazyQueue.flush();
                //This is no reason to exist anymore.
                lazyQueue.destroy();
            })["catch"](function (error) {
                lazyQueue.off();
                if (error && error.code && _constants.ERRORS.codes[error.code]) {
                    that.trigger(_constants.ERROR, _constants.ERRORS.codes[error.code]);
                } else {
                    var tempError = _constants.ERRORS.codes[_constants.INIT_UNKNWON_ERROR];
                    tempError.error = error;
                    that.trigger(_constants.ERROR, tempError);
                }
            });
        })["catch"](function (error) {
            //INIT ERROR
            if (error && error.code && _constants.ERRORS.codes[error.code]) {
                that.trigger(_constants.ERROR, _constants.ERRORS.codes[error.code]);
            } else {
                var tempError = _constants.ERRORS.codes[_constants.INIT_UNKNWON_ERROR];
                tempError.error = error;
                that.trigger(_constants.ERROR, tempError);
            }

            //xxx : If you init empty sources. (I think this is strange case.)
            //This works for this case.
            //player = OvenPlayer.create("elId", {});
            //player.load(soruces);
            lazyQueue.off();
            //lazyQueue.removeAndExcuteOnce("load");
        });
    };

    /**
     * API 초기화 함수
     * init
     * @param      {object} options player initial option value.
     * @returns
     **/
    that.init = function (options) {
        //It collects the commands and executes them at the time when they are executable.
        lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['load', 'play', 'pause', 'seek', 'stop', 'getDuration', 'getPosition', 'getVolume', 'getMute', 'getBuffer', 'getState', 'getQualityLevels']);
        options.mediaContainer = container;
        options.browser = userAgentObject;
        playerConfig = (0, _Configurator2["default"])(options, that);
        OvenPlayerConsole.log("API : init()");
        OvenPlayerConsole.log("API : init() config : ", playerConfig);

        if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.loadingRetryCount !== undefined) {
            WEBRTC_RETRY_COUNT = playerConfig.getConfig().loadingRetryCount;
        }

        //Not working : SyntaxError: "ERRORS.codes" is read-only
        _constants.ERRORS.codes = playerConfig.getSystemText().api.error;
        //Cool
        //ERRORS.codes.push(playerConfig.getSystemText());

        playlistManager.initPlaylist(playerConfig.getPlaylist(), playerConfig);
        OvenPlayerConsole.log("API : init() sources : ", playlistManager.getCurrentSources());

        initProvider();
    };
    that.getProviderName = function () {
        if (currentProvider) {
            return currentProvider.getName();
        } else {
            return null;
        }
    };
    that.getConfig = function () {
        OvenPlayerConsole.log("API : getConfig()", playerConfig.getConfig());
        return playerConfig.getConfig();
    };
    that.getBrowser = function () {

        return playerConfig.getBrowser();
    };
    that.setTimecodeMode = function (isShow) {
        OvenPlayerConsole.log("API : setTimecodeMode()", isShow);
        playerConfig.setTimecodeMode(isShow);
    };
    that.isTimecodeMode = function () {
        OvenPlayerConsole.log("API : isTimecodeMode()");
        return playerConfig.isTimecodeMode();
    };
    that.getFramerate = function () {
        OvenPlayerConsole.log("API : getFramerate()");

        if (currentProvider) {
            return currentProvider.getFramerate();
        }
    };
    that.seekFrame = function (frameCount) {
        if (!currentProvider) {
            return null;
        }
        OvenPlayerConsole.log("API : seekFrame()", frameCount);
        return currentProvider.seekFrame(frameCount);
    };

    that.getDuration = function () {
        if (!currentProvider) {
            return null;
        }
        OvenPlayerConsole.log("API : getDuration()", currentProvider.getDuration());
        return currentProvider.getDuration();
    };
    that.getPosition = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getPosition()", currentProvider.getPosition());
        return currentProvider.getPosition();
    };
    that.getVolume = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getVolume()", currentProvider.getVolume());
        return currentProvider.getVolume();
    };
    that.setVolume = function (volume) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setVolume() " + volume);
        currentProvider.setVolume(volume);
    };
    that.setMute = function (state) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setMute() " + state);
        return currentProvider.setMute(state);
    };
    that.getMute = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getMute() " + currentProvider.getMute());
        return currentProvider.getMute();
    };
    that.load = function (playlist) {
        OvenPlayerConsole.log("API : load() ", playlist);
        lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['play', 'seek', 'stop']);

        if (playlist) {
            if (currentProvider) {
                currentProvider.setCurrentQuality(0);
            }
            playlistManager.initPlaylist(playlist, playerConfig);
        }
        return initProvider();
    };
    that.play = function () {
        if (!currentProvider) {
            return null;
        }
        OvenPlayerConsole.log("API : play() ");
        currentProvider.play();
    };
    that.pause = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : pause() ");
        currentProvider.pause();
    };
    that.seek = function (position) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : seek() " + position);
        currentProvider.seek(position);
    };
    that.setPlaybackRate = function (playbackRate) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setPlaybackRate() ", playbackRate);
        return currentProvider.setPlaybackRate(playerConfig.setPlaybackRate(playbackRate));
    };
    that.getPlaybackRate = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getPlaybackRate() ", currentProvider.getPlaybackRate());
        return currentProvider.getPlaybackRate();
    };

    that.getPlaylist = function () {
        OvenPlayerConsole.log("API : getPlaylist() ", playlistManager.getPlaylist());
        return playlistManager.getPlaylist();
    };
    that.getCurrentPlaylist = function () {
        OvenPlayerConsole.log("API : getCurrentPlaylist() ", playlistManager.getCurrentPlaylistIndex());
        return playlistManager.getCurrentPlaylistIndex();
    };
    that.setCurrentPlaylist = function (index) {
        OvenPlayerConsole.log("API : setCurrentPlaylist() ", index);
        runNextPlaylist(index);
    };

    that.getSources = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getSources() ", currentProvider.getSources());
        return currentProvider.getSources();
    };
    that.getCurrentSource = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getCurrentSource() ", currentProvider.getCurrentSource());
        return currentProvider.getCurrentSource();
    };
    that.setCurrentSource = function (index) {

        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setCurrentSource() ", index);

        var sources = currentProvider.getSources();
        var currentSource = sources[currentProvider.getCurrentSource()];
        var newSource = sources[index];
        var lastPlayPosition = currentProvider.getPosition();
        var isSameProvider = providerController.isSameProvider(currentSource, newSource);
        // provider.serCurrentQuality -> playerConfig setting -> load
        var resultSourceIndex = currentProvider.setCurrentSource(index, isSameProvider);

        if (!newSource) {
            return null;
        }

        OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider", isSameProvider);

        //switching between streams on HLS. wth? https://video-dev.github.io/hls.js/latest/docs/API.html#final-step-destroying-switching-between-streams
        if (!isSameProvider || currentProvider.getName() === _constants.PROVIDER_HLS || currentProvider.getName() === _constants.PROVIDER_DASH || currentProvider.getName() === _constants.PROVIDER_HTML5) {
            lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['play', 'seek']);
            initProvider(lastPlayPosition);
        }

        return resultSourceIndex;
    };

    that.getQualityLevels = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getQualityLevels() ", currentProvider.getQualityLevels());
        return currentProvider.getQualityLevels();
    };
    that.getCurrentQuality = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getCurrentQuality() ", currentProvider.getCurrentQuality());
        return currentProvider.getCurrentQuality();
    };
    that.setCurrentQuality = function (qualityIndex) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setCurrentQuality() ", qualityIndex);

        return currentProvider.setCurrentQuality(qualityIndex);
    };
    that.isAutoQuality = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : isAutoQuality()");
        return currentProvider.isAutoQuality();
    };
    that.setAutoQuality = function (isAuto) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setAutoQuality() ", isAuto);
        return currentProvider.setAutoQuality(isAuto);
    };

    that.getCaptionList = function () {
        if (!captionManager) {
            return null;
        }
        OvenPlayerConsole.log("API : getCaptionList() ", captionManager.getCaptionList());
        return captionManager.getCaptionList();
    };
    that.getCurrentCaption = function () {
        if (!captionManager) {
            return null;
        }
        OvenPlayerConsole.log("API : getCurrentCaption() ", captionManager.getCurrentCaption());
        return captionManager.getCurrentCaption();
    };
    that.setCurrentCaption = function (index) {
        if (!captionManager) {
            return null;
        }
        OvenPlayerConsole.log("API : setCurrentCaption() ", index);
        captionManager.setCurrentCaption(index);
    };
    that.addCaption = function (track) {
        if (!captionManager) {
            return null;
        }
        OvenPlayerConsole.log("API : addCaption() ");
        return captionManager.addCaption(track);
    };
    that.removeCaption = function (index) {
        if (!captionManager) {
            return null;
        }
        OvenPlayerConsole.log("API : removeCaption() ", index);
        return captionManager.removeCaption(index);
    };

    that.getBuffer = function () {
        if (!currentProvider) {
            return null;
        }
        OvenPlayerConsole.log("API : getBuffer() ", currentProvider.getBuffer());
        currentProvider.getBuffer();
    };
    that.getState = function () {
        if (!currentProvider) {
            return null;
        }
        OvenPlayerConsole.log("API : getState() ", currentProvider.getState());
        return currentProvider.getState();
    };
    that.stop = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : stop() ");
        currentProvider.stop();
    };
    that.remove = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : remove() ");
        lazyQueue.destroy();
        if (captionManager) {
            captionManager.destroy();
            captionManager = null;
        }

        if (currentProvider) {
            currentProvider.destroy();
            currentProvider = null;
        }

        if (mediaManager) {
            mediaManager.destroy();
            mediaManager = null;
        }

        that.trigger(_constants.DESTROY);
        that.off();

        providerController = null;
        playlistManager = null;
        playerConfig = null;
        lazyQueue = null;

        OvenPlayerConsole.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. ");
        OvenPlayerSDK.removePlayer(that.getContainerId());
        if (OvenPlayerSDK.getPlayerList().length === 0) {
            OvenPlayerConsole.log("OvenPlayerSDK.playerList", OvenPlayerSDK.getPlayerList());
        }
    };

    that.getVersion = function () {
        return "v." + _version.version;
    };

    return that;
};

exports["default"] = Api;

/***/ }),

/***/ "./src/js/api/ApiExpansions.js":
/*!*************************************!*\
  !*** ./src/js/api/ApiExpansions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 8. 24..
 */

var ApiRtmpExpansion = exports.ApiRtmpExpansion = function ApiRtmpExpansion(currentProvider) {
    return {
        externalCallbackCreep: function externalCallbackCreep(result) {
            if (result.name && result.data) {
                return currentProvider.triggerEventFromExternal(result.name, result.data);
            } else {
                return null;
            }
        }
    };
};

/***/ }),

/***/ "./src/js/api/Configurator.js":
/*!************************************!*\
  !*** ./src/js/api/Configurator.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This initializes the input options.
 * @param   options
 *
 * */
var Configurator = function Configurator(options, provider) {

    var composeSourceOptions = function composeSourceOptions(options) {
        var Defaults = {
            mediaContainer: "",
            playbackRates: [2, 1.5, 1, 0.5, 0.25],
            playbackRate: 1,
            mute: false,
            volume: 100,
            loop: false,
            controls: true,
            autoStart: false,
            autoFallback: true,
            timecode: true,
            sourceIndex: 0,
            browser: "",
            hidePlaylistIcon: false,
            rtmpBufferTime: 1,
            rtmpBufferTimeMax: 3,
            adClient: "googleima",
            currentProtocolOnly: false,
            systemText: null,
            lang: "en",
            loadingRetryCount: 0,
            expandFullScreenUI: false,
            fullscreenOption: null,
            showBigPlayButton: true
        };
        var serialize = function serialize(val) {
            if (val === undefined) {
                return null;
            }
            if (typeof val === 'string' && val.length < 6) {
                var lowercaseVal = val.toLowerCase();
                if (lowercaseVal === 'true') {
                    return true;
                }
                if (lowercaseVal === 'false') {
                    return false;
                }
                if (!isNaN(Number(val)) && !isNaN(parseFloat(val))) {
                    return Number(val);
                }
            }
            return val;
        };
        var deserialize = function deserialize(options) {
            Object.keys(options).forEach(function (key) {
                if (key === 'id') {
                    return;
                }
                options[key] = serialize(options[key]);
            });
        };

        deserialize(options);
        var config = _extends({}, Defaults, options);
        var userCustumSystemText = [];
        if (config.systemText) {
            userCustumSystemText = _underscore2["default"].isArray(config.systemText) ? config.systemText : [config.systemText];
        }

        for (var i = 0; i < userCustumSystemText.length; i++) {
            if (userCustumSystemText[i].lang) {
                var currentSystemText = _underscore2["default"].findWhere(_constants.SYSTEM_TEXT, { "lang": userCustumSystemText[i].lang });
                if (currentSystemText) {
                    //validate & update
                    _extends(currentSystemText, userCustumSystemText[i]);
                } else {
                    //create
                    currentSystemText = _underscore2["default"].findWhere(_constants.SYSTEM_TEXT, { "lang": "en" });
                    currentSystemText.lang = userCustumSystemText[i].lang;
                    _constants.SYSTEM_TEXT.push(_extends(userCustumSystemText[i], currentSystemText));
                }
            }
        }
        config.systemText = _underscore2["default"].findWhere(_constants.SYSTEM_TEXT, { "lang": config.lang });

        var playbackRates = config.playbackRates;

        playbackRates = playbackRates.filter(function (rate) {
            return _underscore2["default"].isNumber(rate) && rate >= 0.25 && rate <= 4;
        }).map(function (rate) {
            return Math.round(rate * 4) / 4;
        });

        if (playbackRates.indexOf(1) < 0) {
            playbackRates.push(1);
        }
        playbackRates.sort();

        config.playbackRates = playbackRates;

        config.rtmpBufferTime = config.rtmpBufferTime > 10 ? 10 : config.rtmpBufferTime;
        config.rtmpBufferTimeMax = config.rtmpBufferTimeMax > 50 ? 50 : config.rtmpBufferTimeMax;

        if (config.playbackRates.indexOf(config.playbackRate) < 0) {
            config.playbackRate = 1;
        }

        var configPlaylist = config.playlist;
        if (!configPlaylist) {
            var obj = _underscore2["default"].pick(config, ['title', 'description', 'type', 'image', 'file', 'sources', 'tracks', 'host', 'application', 'stream', 'adTagUrl']);

            config.playlist = [obj];
        } else if (_underscore2["default"].isArray(configPlaylist.playlist)) {
            config.feedData = configPlaylist;
            config.playlist = configPlaylist.playlist;
        }

        delete config.duration;
        return config;
    };
    OvenPlayerConsole.log("Configurator loaded.", options);
    var spec = composeSourceOptions(options);

    //spec.isFullscreen = false; //IE 11 can't check current fullscreen state.

    var that = {};
    that.getConfig = function () {
        return spec;
    };
    that.getAdClient = function () {
        return spec.adClient;
    };
    that.setConfig = function (config, value) {
        spec[config] = value;
    };

    that.getContainer = function () {
        return spec.mediaContainer;
    };
    /*that.isFullscreen = () => {
        return spec.isFullscreen;
    }
    that.setFullscreen = (isFullscreen) => {
        return spec.isFullscreen = isFullscreen;
    }*/

    that.getPlaybackRate = function () {
        return spec.playbackRate;
    };
    that.setPlaybackRate = function (playbackRate) {
        spec.playbackRate = playbackRate;
        return playbackRate;
    };

    that.getQualityLabel = function () {
        return spec.qualityLabel;
    };
    that.setQualityLabel = function (newLabel) {
        spec.qualityLabel = newLabel;
    };

    that.isCurrentProtocolOnly = function () {
        return spec.currentProtocolOnly;
    };
    /*that.getSourceLabel = () => {
        return spec.sourceLabel;
    };
    that.setSourceLabel = (newLabel) => {
        spec.sourceLabel = newLabel;
    };*/

    that.getSourceIndex = function () {
        return spec.sourceIndex;
    };
    that.setSourceIndex = function (index) {
        spec.sourceIndex = index;
    };
    that.setTimecodeMode = function (timecode) {
        if (spec.timecode !== timecode) {
            spec.timecode = timecode;
            provider.trigger(_constants.CONTENT_TIME_MODE_CHANGED, timecode);
        }
    };
    that.isTimecodeMode = function () {
        return spec.timecode;
    };
    that.getRtmpBufferTime = function () {
        return spec.rtmpBufferTime;
    };
    that.getRtmpBufferTimeMax = function () {
        return spec.rtmpBufferTimeMax;
    };

    that.isMute = function () {
        return spec.mute;
    };
    that.getVolume = function () {
        return spec.volume;
    };
    that.setVolume = function (volume) {
        spec.volume = volume;
    };
    that.isLoop = function () {
        return spec.loop;
    };
    that.isAutoStart = function () {
        return spec.autoStart;
    };
    that.isControls = function () {
        return spec.controls;
    };

    that.getPlaybackRates = function () {
        return spec.playbackRates;
    };
    that.getBrowser = function () {
        return spec.browser;
    };
    that.getSystemText = function () {
        return spec.systemText;
    };
    that.getLanguage = function () {
        return spec.lang;
    };

    that.getPlaylist = function () {
        return spec.playlist;
    };
    that.setPlaylist = function (playlist) {
        if (_underscore2["default"].isArray(playlist)) {
            spec.playlist = playlist;
        } else {
            spec.playlist = [playlist];
        }
        return spec.playlist;
    };

    return that;
};

exports["default"] = Configurator;

/***/ }),

/***/ "./src/js/api/EventEmitter.js":
/*!************************************!*\
  !*** ./src/js/api/EventEmitter.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 7. 3..
 */

/**
 * @brief   This module provide custom events.
 * @param   object    An object that requires custom events.
 *
 * */

var EventEmitter = function EventEmitter(object) {
    var that = object;
    var _events = [];

    var triggerEvents = function triggerEvents(events, args, context) {
        var i = 0;
        var length = events.length;
        for (i = 0; i < length; i++) {
            var event = events[i];
            event.listener.apply(event.context || context, args);
        }
    };

    that.on = function (name, listener, context) {
        (_events[name] || (_events[name] = [])).push({ listener: listener, context: context });
        return that;
    };
    that.trigger = function (name) {
        if (!_events) {
            return false;
        }
        var args = [].slice.call(arguments, 1);
        var events = _events[name];
        var allEvents = _events.all;

        if (events) {
            triggerEvents(events, args, that);
        }
        if (allEvents) {
            triggerEvents(allEvents, arguments, that);
        }
    };
    that.off = function (name, listener, context) {
        if (!_events) {
            return false;
        }

        if (!name && !listener && !context) {
            _events = [];
            return that;
        }

        var names = name ? [name] : Object.keys(_events);

        for (var i = 0, l = names.length; i < l; i++) {
            name = names[i];
            var events = _events[name];
            if (events) {
                var retain = _events[name] = [];
                if (listener || context) {
                    for (var j = 0, k = events.length; j < k; j++) {
                        var event = events[j];
                        if (listener && listener !== event.listener && listener !== event.listener.listener && listener !== event.listener._listener || context && context !== event.context) {
                            retain.push(event);
                        }
                    }
                }
                if (!retain.length) {
                    delete _events[name];
                }
            }
        }
        return that;
    };
    that.once = function (name, listener, context) {
        var count = 0;
        var onceCallback = function onceCallback() {
            if (count++) {
                return;
            }
            that.off(name, onceCallback);
            listener.apply(that, arguments);
        };
        onceCallback._listener = listener;
        return that.on(name, onceCallback, context);
    };

    return that;
};

exports["default"] = EventEmitter;

/***/ }),

/***/ "./src/js/api/LazyCommandExecutor.js":
/*!*******************************************!*\
  !*** ./src/js/api/LazyCommandExecutor.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This executes the input commands at a specific point in time.
 * @param   instance
 * @param   queuedCommands
 * */
var LazyCommandExecutor = function LazyCommandExecutor(instance, queuedCommands) {
    var commandQueue = [];
    var undecoratedMethods = {};
    var executeMode = false;
    var that = {};
    OvenPlayerConsole.log("LazyCommandExecutor loaded.");
    queuedCommands.forEach(function (command) {
        var method = instance[command];
        undecoratedMethods[command] = method || function () {};

        instance[command] = function () {
            var args = Array.prototype.slice.call(arguments, 0);
            if (!executeMode) {
                //commandQueue.push({ command, args });
                that.addQueue(command, args);
            } else {
                executeQueuedCommands();
                if (method) {
                    method.apply(that, args);
                }
            }
        };
    });
    var executeQueuedCommands = function executeQueuedCommands() {
        while (commandQueue.length > 0) {
            var _commandQueue$shift = commandQueue.shift(),
                command = _commandQueue$shift.command,
                args = _commandQueue$shift.args;

            (undecoratedMethods[command] || instance[command]).apply(instance, args);
        }
    };

    that.setExecuteMode = function (mode) {
        executeMode = mode;
        OvenPlayerConsole.log("LazyCommandExecutor : setExecuteMode()", mode);
    };
    that.getUndecoratedMethods = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : getUndecoratedMethods()", undecoratedMethods);
        return undecoratedMethods;
    };
    that.getQueue = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : getQueue()", getQueue);
        return commandQueue;
    };
    that.addQueue = function (command, args) {
        OvenPlayerConsole.log("LazyCommandExecutor : addQueue()", command, args);
        commandQueue.push({ command: command, args: args });
    };

    that.flush = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : flush()");
        executeQueuedCommands();
    };
    that.empty = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : empty()");
        commandQueue.length = 0;
    };
    that.off = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : off()");
        queuedCommands.forEach(function (command) {
            var method = undecoratedMethods[command];
            if (method) {
                instance[command] = method;
                delete undecoratedMethods[command];
            }
        });
    };

    //Run once at the end
    that.removeAndExcuteOnce = function (command_) {
        var commandQueueItem = _underscore2["default"].findWhere(commandQueue, { command: command_ });
        OvenPlayerConsole.log("LazyCommandExecutor : removeAndExcuteOnce()", command_);
        commandQueue.splice(_underscore2["default"].findIndex(commandQueue, { command: command_ }), 1);

        var method = undecoratedMethods[command_];
        if (method) {
            OvenPlayerConsole.log("removeCommand()");
            if (commandQueueItem) {
                (method || instance[command_]).apply(instance, commandQueueItem.args);
            }
            instance[command_] = method;
            delete undecoratedMethods[command_];
        }
    };

    that.destroy = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : destroy()");
        that.off();
        that.empty();
    };
    return that;
};

exports["default"] = LazyCommandExecutor;

/***/ }),

/***/ "./src/js/api/SupportChecker.js":
/*!**************************************!*\
  !*** ./src/js/api/SupportChecker.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

/**
 * @brief   This finds the provider that matches the input source.
 * @param
 * */

var SupportChecker = function SupportChecker() {
    var that = {};
    OvenPlayerConsole.log("SupportChecker loaded.");
    var userAgentObject = (0, _browser.analUserAgent)();

    var supportList = [{
        name: 'html5',
        checkSupport: function checkSupport(source) {
            var MimeTypes = {
                aac: 'audio/mp4',
                mp4: 'video/mp4',
                f4v: 'video/mp4',
                m4v: 'video/mp4',
                mov: 'video/mp4',
                mp3: 'audio/mpeg',
                mpeg: 'audio/mpeg',
                ogv: 'video/ogg',
                ogg: 'video/ogg',
                oga: 'video/ogg',
                vorbis: 'video/ogg',
                webm: 'video/webm',
                f4a: 'video/aac',
                m3u8: 'application/vnd.apple.mpegurl',
                m3u: 'application/vnd.apple.mpegurl',
                hls: 'application/vnd.apple.mpegurl'
            };

            var video = function () {
                return document.createElement('video');
            }();
            if (!video.canPlayType) {
                return false;
            }

            var file = source.file;
            var type = source.type;

            if (!type) {
                return false;
            }
            var mimeType = source.mimeType || MimeTypes[type];

            if ((0, _validator.isHls)(file, type) && userAgentObject.browser === "Microsoft Edge") {
                //Edge supports hls native but that's sucks.
                return false;
            }

            if ((0, _validator.isRtmp)(file, type)) {
                return false;
            }

            if ((0, _validator.isWebRTC)(file, type)) {
                return false;
            }

            if (!mimeType) {
                return false;
            }

            return !!video.canPlayType(mimeType);
        }
    }, {
        name: 'webrtc',
        checkSupport: function checkSupport(source) {
            var video = function () {
                return document.createElement('video');
            }();
            if (!video.canPlayType) {
                return false;
            }
            if ((0, _validator.isRtmp)(file, type)) {
                return false;
            }

            var file = source.file;
            var type = source.type;

            if ((0, _validator.isWebRTC)(file, type)) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        name: 'dash',
        checkSupport: function checkSupport(source) {
            var file = source.file;

            var type = source.type;
            if ((0, _validator.isRtmp)(file, type)) {
                return false;
            }

            if (typeof (window.MediaSource || window.WebKitMediaSource) === "function" && (0, _validator.isDash)(file, type)) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        name: 'hls',
        checkSupport: function checkSupport(source) {
            var video = function () {
                return document.createElement('video');
            }();
            var file = source.file;
            var type = source.type;
            if ((0, _validator.isRtmp)(file, type)) {
                return false;
            }

            //this method from hls.js
            var isHlsSupport = function isHlsSupport() {
                function getMediaSource() {
                    if (typeof window !== 'undefined') {
                        return window.MediaSource || window.WebKitMediaSource;
                    }
                }
                var mediaSource = getMediaSource();
                var sourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer;
                var isTypeSupported = mediaSource && typeof mediaSource.isTypeSupported === 'function' && mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

                // if SourceBuffer is exposed ensure its API is valid
                // safari and old version of Chrome doe not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible
                var sourceBufferValidAPI = !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function';
                return !!isTypeSupported && !!sourceBufferValidAPI;
            };
            //Remove this '!!video.canPlayType('application/vnd.apple.mpegurl')' if you want to use hlsjs.
            //Yes I need hlsjs. 2019-06-12 && !!video.canPlayType('application/vnd.apple.mpegurl');
            return isHlsSupport();
        }
    }, {
        name: 'rtmp',
        checkSupport: function checkSupport(source) {
            var file = source.file;
            var type = source.type;
            function testFlash() {

                var support = false;

                //IE only
                if ("ActiveXObject" in window) {

                    try {
                        support = !!new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    } catch (e) {
                        support = false;
                    }

                    //W3C, better support in legacy browser
                } else {

                    support = !!navigator.mimeTypes['application/x-shockwave-flash'];
                }

                return support;
            }
            function checkSupport() {
                if (userAgentObject.browser === "Microsoft Edge" || userAgentObject.os === "Android" || userAgentObject.os === "iOS" || userAgentObject.browser === "Safari") {
                    return false;
                } else {
                    return true;
                }
            }
            if ((0, _validator.isRtmp)(file, type) && testFlash() && checkSupport()) {
                return true;
            } else {
                return false;
            }
        }
    }];

    that.findProviderNameBySource = function (soruce_) {
        OvenPlayerConsole.log("SupportChecker : findProviderNameBySource()", soruce_);
        var source = soruce_ === Object(soruce_) ? soruce_ : {};
        for (var i = 0; i < supportList.length; i++) {
            if (supportList[i].checkSupport(source)) {
                return supportList[i].name;
            }
        }
    };
    that.findProviderNamesByPlaylist = function (playlistItem) {
        OvenPlayerConsole.log("SupportChecker : findProviderNamesByPlaylist()", playlistItem);
        var supportNames = [];
        /*for (let i = playlist_.length; i--;) {
            }*/
        var item = playlistItem;

        if (item && item.sources) {
            for (var j = 0; j < item.sources.length; j++) {
                var source = item.sources[j];
                if (source) {
                    var supported = that.findProviderNameBySource(source);
                    if (supported) {
                        supportNames.push(supported);
                    }
                }
            }

            return supportNames;
        }
        return null;
    };
    return that;
};

exports["default"] = SupportChecker;

/***/ }),

/***/ "./src/js/api/caption/Loader.js":
/*!**************************************!*\
  !*** ./src/js/api/caption/Loader.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SrtParser = __webpack_require__(/*! api/caption/parser/SrtParser */ "./src/js/api/caption/parser/SrtParser.js");

var _SrtParser2 = _interopRequireDefault(_SrtParser);

var _vttCue = __webpack_require__(/*! utils/captions/vttCue */ "./src/js/utils/captions/vttCue.js");

var _vttCue2 = _interopRequireDefault(_vttCue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import Request from "utils/downloader";

/**
 * Created by hoho on 2018. 7. 4..
 */
var Loader = function Loader() {
    var that = {};

    var convertToVTTCues = function convertToVTTCues(cues) {
        return cues.map(function (cue) {
            return new _vttCue2["default"](cue.start, cue.end, cue.text);
        });
    };
    //language : for SMI format.
    that.load = function (track, language, successCallback, errorCallback) {

        var requestOptions = {
            method: "GET",
            url: track.file,
            encoding: null
        };

        loadRequestDownloder().then(function (Request) {
            Request(requestOptions, function (error, response, body) {
                if (error) {
                    errorCallback(error);
                } else {
                    var cues = [];
                    var vttCues = [];

                    if (body.indexOf('WEBVTT') >= 0) {
                        OvenPlayerConsole.log("WEBVTT LOADED");
                        loadVttParser().then(function (WebVTT) {
                            var parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
                            vttCues = [];
                            parser.oncue = function (cue) {
                                vttCues.push(cue);
                            };
                            parser.onflush = function () {
                                //delete track.xhr;
                                successCallback(vttCues);
                            };
                            // Parse calls onflush internally
                            parser.parse(body);
                        })["catch"](function (error) {
                            //delete track.xhr;
                            errorCallback(error);
                        });
                    } else if (body.indexOf('SAMI') >= 0) {
                        OvenPlayerConsole.log("SAMI LOADED");
                        loadSmiParser().then(function (SmiParser) {
                            var parsedData = SmiParser(body, { fixedLang: language });
                            vttCues = convertToVTTCues(parsedData.result);
                            successCallback(vttCues);
                        })["catch"](function (error) {
                            //delete track.xhr;
                            errorCallback(error);
                        });
                    } else {
                        OvenPlayerConsole.log("SRT LOADED");
                        cues = (0, _SrtParser2["default"])(body);
                        vttCues = convertToVTTCues(cues);
                        successCallback(vttCues);
                    }
                }
            });
        })["catch"](function (error) {
            //delete track.xhr;
            errorCallback(error);
        });
    };

    return that;
};
function loadRequestDownloder() {
    return Promise.all(/*! require.ensure | downloader */[__webpack_require__.e("vendors~downloader"), __webpack_require__.e("downloader")]).then((function (require) {
        return __webpack_require__(/*! utils/downloader */ "./src/js/utils/downloader.js")["default"];
    }).bind(null, __webpack_require__)).catch(function (err) {
        console.log(err);
    });
};
function loadVttParser() {
    return __webpack_require__.e(/*! require.ensure | vttparser */ "vttparser").then((function (require) {
        return __webpack_require__(/*! api/caption/parser/VttParser */ "./src/js/api/caption/parser/VttParser.js")["default"];
    }).bind(null, __webpack_require__)).catch(function (err) {
        console.log(err);
    });
}
function loadSmiParser() {
    return __webpack_require__.e(/*! require.ensure | smiparser */ "smiparser").then((function (require) {
        return __webpack_require__(/*! api/caption/parser/SmiParser */ "./src/js/api/caption/parser/SmiParser.js")["default"];
    }).bind(null, __webpack_require__)).catch(function (err) {
        console.log(err);
    });
}
exports["default"] = Loader;

/***/ }),

/***/ "./src/js/api/caption/Manager.js":
/*!***************************************!*\
  !*** ./src/js/api/caption/Manager.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Loader = __webpack_require__(/*! api/caption/Loader */ "./src/js/api/caption/Loader.js");

var _Loader2 = _interopRequireDefault(_Loader);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isSupport = function isSupport(kind) {
    return kind === 'subtitles' || kind === 'captions';
}; /**
    * Created by hoho on 2018. 5. 17..
    */


var Manager = function Manager(api, playlistIndex) {

    var that = {};
    var captionList = [];
    var currentCaptionIndex = -1;

    var captionLoader = (0, _Loader2["default"])();
    var isFisrtLoad = true;
    var isShowing = false;

    OvenPlayerConsole.log("Caption Manager >> ", playlistIndex);

    var bindTrack = function bindTrack(track, vttCues) {
        track.data = vttCues || [];
        track.name = track.label || track.name || track.language;
        track.id = function (track, tracksCount) {
            var trackId;
            var prefix = track.kind || 'cc';
            if (track["default"] || track.defaulttrack) {
                trackId = 'default';
            } else {
                trackId = track.id || prefix + tracksCount;
            }
            if (isFisrtLoad) {
                //This execute only on. and then use flushCaptionList(lastCaptionIndex);
                changeCurrentCaption(captionList.length || 0);
                isFisrtLoad = false;
            }
            return trackId;
        }(track, captionList.length);

        captionList.push(track);
        return track.id;
    };
    var changeCurrentCaption = function changeCurrentCaption(index) {
        currentCaptionIndex = index;
        api.trigger(_constants.CONTENT_CAPTION_CHANGED, currentCaptionIndex);
    };
    if (api.getConfig().playlist && api.getConfig().playlist.length > 0) {
        var playlist = api.getConfig().playlist[playlistIndex];

        if (playlist && playlist.tracks && playlist.tracks.length > 0) {
            var _loop = function _loop(i) {
                var track = playlist.tracks[i];

                if (isSupport(track.kind) && !_underscore2["default"].findWhere(track, { file: track.file })) {
                    //that.flushCaptionList(currentCaptionIndex);
                    captionLoader.load(track, track.lang, function (vttCues) {
                        if (vttCues && vttCues.length > 0) {
                            var captionId = bindTrack(track, vttCues);
                        }
                    }, function (error) {
                        var tempError = _constants.ERRORS.codes[_constants.PLAYER_CAPTION_ERROR];
                        tempError.error = error;
                        api.trigger(_constants.ERROR, tempError);
                    });
                }
            };

            for (var i = 0; i < playlist.tracks.length; i++) {
                _loop(i);
            }
        }
    }

    api.on(_constants.CONTENT_TIME, function (meta) {
        var position = meta.position;
        if (currentCaptionIndex > -1 && captionList[currentCaptionIndex]) {
            var currentCues = _underscore2["default"].filter(captionList[currentCaptionIndex].data, function (cue) {
                return position >= cue.startTime && (!cue.endTime || position) <= cue.endTime;
            });
            if (currentCues && currentCues.length > 0) {
                api.trigger(_constants.CONTENT_CAPTION_CUE_CHANGED, currentCues[0]);
            }
        }
    });
    that.flushCaptionList = function (lastCaptionIndex) {
        captionList = [];
        changeCurrentCaption(lastCaptionIndex);
        //currentCaptionIndex = lastCaptionIndex;
    };
    that.getCaptionList = function () {
        return captionList || [];
    };
    that.getCurrentCaption = function () {
        return currentCaptionIndex;
    };
    that.setCurrentCaption = function (_index) {
        if (_index > -2 && _index < captionList.length) {
            changeCurrentCaption(_index);
        } else {
            return null;
        }
    };
    that.addCaption = function (track) {
        if (isSupport(track.kind) && !_underscore2["default"].findWhere(captionLoader, { file: track.file })) {
            captionLoader.load(track, function (vttCues) {
                if (vttCues && vttCues.length > 0) {
                    bindTrack(track, vttCues);
                }
            }, function (error) {
                var tempError = errors[_constants.PLAYER_CAPTION_ERROR];
                tempError.error = error;
                api.trigger(_constants.ERROR, tempError);
            });
        }
    };
    that.removeCaption = function (index) {
        if (index > -1 && index < captionList.length) {
            captionList.splice(index, 1);
            return captionList;
        } else {
            return null;
        }
    };
    that.destroy = function () {
        captionList = [];
        captionLoader = null;
        api.off(_constants.CONTENT_TIME, null, that);
    };

    return that;
};

exports["default"] = Manager;

/***/ }),

/***/ "./src/js/api/caption/parser/SrtParser.js":
/*!************************************************!*\
  !*** ./src/js/api/caption/parser/SrtParser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _strings = __webpack_require__(/*! utils/strings */ "./src/js/utils/strings.js");

function _entry(data) {
    var entry = {};
    var array = data.split('\r\n');
    if (array.length === 1) {
        array = data.split('\n');
    }
    var idx = 1;
    if (array[0].indexOf(' --> ') > 0) {
        idx = 0;
    }
    if (array.length > idx + 1 && array[idx + 1]) {
        // This line contains the start and end.
        var line = array[idx];
        var index = line.indexOf(' --> ');
        if (index > 0) {
            entry.start = (0, _strings.hmsToSecond)(line.substr(0, index));
            entry.end = (0, _strings.hmsToSecond)(line.substr(index + 5));
            entry.text = array.slice(idx + 1).join('\r\n');
        }
    }
    return entry;
} /**
   * Created by hoho on 2018. 5. 29..
   */


var SrtParser = function SrtParser(data) {
    var captions = [];

    data = (0, _strings.trim)(data);

    var list = data.split('\r\n\r\n');
    if (list.length === 1) {
        list = data.split('\n\n');
    }

    for (var i = 0; i < list.length; i++) {
        if (list[i] === 'WEBVTT') {
            continue;
        }
        var entry = _entry(list[i]);
        if (entry.text) {
            captions.push(entry);
        }
    }

    return captions;
};

exports['default'] = SrtParser;

/***/ }),

/***/ "./src/js/api/constants.js":
/*!*********************************!*\
  !*** ./src/js/api/constants.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// STATE
var STATE_BUFFERING = exports.STATE_BUFFERING = "buffering";
var STATE_IDLE = exports.STATE_IDLE = "idle";
var STATE_COMPLETE = exports.STATE_COMPLETE = "complete";
var STATE_PAUSED = exports.STATE_PAUSED = "paused";
var STATE_PLAYING = exports.STATE_PLAYING = "playing";
var STATE_ERROR = exports.STATE_ERROR = "error";
var STATE_LOADING = exports.STATE_LOADING = "loading";
var STATE_STALLED = exports.STATE_STALLED = "stalled";

var STATE_AD_LOADING = exports.STATE_AD_LOADING = "adLoading";
var STATE_AD_LOADED = exports.STATE_AD_LOADED = "adLoaded";
var STATE_AD_PLAYING = exports.STATE_AD_PLAYING = "adPlaying";
var STATE_AD_PAUSED = exports.STATE_AD_PAUSED = "adPaused";
var STATE_AD_COMPLETE = exports.STATE_AD_COMPLETE = "adComplete";
var STATE_AD_ERROR = exports.STATE_AD_ERROR = "adError";
var PLAYER_AD_CLICK = exports.PLAYER_AD_CLICK = "adclick";

// PROVIDER
var PROVIDER_HTML5 = exports.PROVIDER_HTML5 = "html5";
var PROVIDER_WEBRTC = exports.PROVIDER_WEBRTC = "webrtc";
var PROVIDER_DASH = exports.PROVIDER_DASH = "dash";
var PROVIDER_HLS = exports.PROVIDER_HLS = "hls";
var PROVIDER_RTMP = exports.PROVIDER_RTMP = "rtmp";

// EVENTS
var CONTENT_COMPLETE = exports.CONTENT_COMPLETE = STATE_COMPLETE;
var READY = exports.READY = "ready";
var DESTROY = exports.DESTROY = "destroy";
var CONTENT_SEEK = exports.CONTENT_SEEK = "seek";
var CONTENT_BUFFER_FULL = exports.CONTENT_BUFFER_FULL = "bufferFull";
var DISPLAY_CLICK = exports.DISPLAY_CLICK = "displayClick";
var CONTENT_LOADED = exports.CONTENT_LOADED = "loaded";
var PLAYLIST_CHANGED = exports.PLAYLIST_CHANGED = "playlistChanged";
var CONTENT_SEEKED = exports.CONTENT_SEEKED = "seeked";
var ALL_PLAYLIST_ENDED = exports.ALL_PLAYLIST_ENDED = "allPlaylistEnded";
var NETWORK_UNSTABLED = exports.NETWORK_UNSTABLED = "unstableNetwork";

var ERROR = exports.ERROR = "error";

// STATE OF PLAYER
var PLAYER_STATE = exports.PLAYER_STATE = "stateChanged";
var PLAYER_COMPLETE = exports.PLAYER_COMPLETE = STATE_COMPLETE;
var PLAYER_PAUSE = exports.PLAYER_PAUSE = "pause";
var PLAYER_PLAY = exports.PLAYER_PLAY = "play";

var PLAYER_CLICKED = exports.PLAYER_CLICKED = "clicked";
var PLAYER_RESIZED = exports.PLAYER_RESIZED = "resized";
var PLAYER_LOADING = exports.PLAYER_LOADING = "loading";
var PLAYER_FULLSCREEN_REQUEST = exports.PLAYER_FULLSCREEN_REQUEST = "fullscreenRequested";
var PLAYER_FULLSCREEN_CHANGED = exports.PLAYER_FULLSCREEN_CHANGED = "fullscreenChanged";
var PLAYER_WARNING = exports.PLAYER_WARNING = "warning";

var AD_CHANGED = exports.AD_CHANGED = "adChanged";
var AD_TIME = exports.AD_TIME = "adTime";
var CONTENT_BUFFER = exports.CONTENT_BUFFER = "bufferChanged";
var CONTENT_TIME = exports.CONTENT_TIME = "time";
var CONTENT_RATE_CHANGE = exports.CONTENT_RATE_CHANGE = "ratechange";
var CONTENT_VOLUME = exports.CONTENT_VOLUME = "volumeChanged";
var CONTENT_MUTE = exports.CONTENT_MUTE = "mute";
var CONTENT_META = exports.CONTENT_META = "metaChanged";
var CONTENT_SOURCE_CHANGED = exports.CONTENT_SOURCE_CHANGED = "sourceChanged";
var CONTENT_LEVEL_CHANGED = exports.CONTENT_LEVEL_CHANGED = "qualityLevelChanged";
var PLAYBACK_RATE_CHANGED = exports.PLAYBACK_RATE_CHANGED = "playbackRateChanged";
var CONTENT_CAPTION_CUE_CHANGED = exports.CONTENT_CAPTION_CUE_CHANGED = "cueChanged";
var CONTENT_CAPTION_CHANGED = exports.CONTENT_CAPTION_CHANGED = "captionChanged";
var CONTENT_TIME_MODE_CHANGED = exports.CONTENT_TIME_MODE_CHANGED = "timeDisplayModeChanged";
var OME_P2P_MODE = exports.OME_P2P_MODE = "p2pMode";

var AD_CLIENT_GOOGLEIMA = exports.AD_CLIENT_GOOGLEIMA = "googleima";
var AD_CLIENT_VAST = exports.AD_CLIENT_VAST = "vast";

var INIT_UNKNWON_ERROR = exports.INIT_UNKNWON_ERROR = 100;
var INIT_UNSUPPORT_ERROR = exports.INIT_UNSUPPORT_ERROR = 101;
var INIT_RTMP_SETUP_ERROR = exports.INIT_RTMP_SETUP_ERROR = 102;
var INIT_DASH_UNSUPPORT = exports.INIT_DASH_UNSUPPORT = 103;
var INIT_ADS_ERROR = exports.INIT_ADS_ERROR = 104;
var INIT_DASH_NOTFOUND = exports.INIT_DASH_NOTFOUND = 105;
var INIT_HLSJS_NOTFOUND = exports.INIT_HLSJS_NOTFOUND = 106;
var PLAYER_UNKNWON_ERROR = exports.PLAYER_UNKNWON_ERROR = 300;
var PLAYER_UNKNWON_OPERATION_ERROR = exports.PLAYER_UNKNWON_OPERATION_ERROR = 301;
var PLAYER_UNKNWON_NETWORK_ERROR = exports.PLAYER_UNKNWON_NETWORK_ERROR = 302;
var PLAYER_UNKNWON_DECODE_ERROR = exports.PLAYER_UNKNWON_DECODE_ERROR = 303;
var PLAYER_FILE_ERROR = exports.PLAYER_FILE_ERROR = 304;
var PLAYER_CAPTION_ERROR = exports.PLAYER_CAPTION_ERROR = 305;
var PLAYER_BAD_REQUEST_ERROR = exports.PLAYER_BAD_REQUEST_ERROR = 306;
var PLAYER_AUTH_FAILED_ERROR = exports.PLAYER_AUTH_FAILED_ERROR = 307;
var PLAYER_NOT_ACCEPTABLE_ERROR = exports.PLAYER_NOT_ACCEPTABLE_ERROR = 308;
var PLAYER_WEBRTC_WS_ERROR = exports.PLAYER_WEBRTC_WS_ERROR = 501;
var PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR = exports.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR = 502;
var PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR = exports.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR = 503;
var PLAYER_WEBRTC_CREATE_ANSWER_ERROR = exports.PLAYER_WEBRTC_CREATE_ANSWER_ERROR = 504;
var PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR = exports.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR = 505;
var PLAYER_WEBRTC_NETWORK_SLOW = exports.PLAYER_WEBRTC_NETWORK_SLOW = 510;
var PLAYER_WEBRTC_UNEXPECTED_DISCONNECT = exports.PLAYER_WEBRTC_UNEXPECTED_DISCONNECT = 511;

var WARN_MSG_MUTEDPLAY = exports.WARN_MSG_MUTEDPLAY = "Please touch here to turn on the sound.";

var UI_ICONS = exports.UI_ICONS = {
    volume_mute: "volume-mute",
    op_warning: "op-warning"
};

var ERRORS = exports.ERRORS = { codes: "" };

var SYSTEM_TEXT = exports.SYSTEM_TEXT = [{
    "lang": "en",
    "ui": {
        "context": "About OvenPlayer",
        "controls": {
            "live": "live",
            "low_latency_live": "Sub-Second Latency Streaming",
            "low_latency_p2p": "Sub-Second Latency P2P"
        },
        "playlist": "Playlist",
        "setting": {
            "title": "Settings",
            "speed": "Speed",
            "speedUnit": "x",
            "source": "Source",
            "quality": "Quality",
            "caption": "Caption",
            "display": "Display"
        }
    },
    "api": {
        "message": {
            "muted_play": "Please touch here to turn on the sound."
        },
        "error": {
            100: {
                "code": 100,
                "message": "Can not load due to unknown reasons.",
                "reason": "Can not load due to unknown reasons."
            },
            101: {
                "code": 101,
                "message": "Can not load due to playable media not found.",
                "reason": "Can not load due to playable media not found."
            },
            102: {
                "code": 102,
                "message": "Flash fetching process aborted. </br><a href='http://www.adobe.com/go/getflashplayer' target='_self'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player'></a>",
                "reason": "It looks like not found swf or your environment is localhost."
            },
            103: {
                "code": 103,
                "message": "Can not load due to dashjs. Please check the lastest version.",
                "reason": "dash.js version is old. Please check the lastest."
            },
            104: {
                "code": 104,
                "message": "Can not load due to google ima for Ads. ",
                "reason": "Please check the google ima library."
            },
            105: {
                "code": 105,
                "message": "Can not find the dashjs. Please check the dashjs.",
                "reason": "Not found dashjs."
            },
            106: {
                "code": 106,
                "message": "Can not find the hlsjs. Please check the hlsjs.",
                "reason": "Not found hlsjs."
            },
            300: {
                "code": 300,
                "message": "Can not play due to unknown reasons.",
                "reason": "Can not play due to unknown reasons."
            },
            301: {
                "code": 301,
                "message": "Fetching process aborted by user.",
                "reason": "Fetching process aborted by user."
            },
            302: {
                "code": 302,
                "message": "Some of the media could not be downloaded due to a network error.",
                "reason": "Error occurred when downloading."
            },
            303: {
                "code": 303,
                "message": "Unable to load media. This may be due to a server or network error, or due to an unsupported format.",
                "reason": "Error occurred when decoding."
            },
            304: {
                "code": 304,
                "message": "Media playback has been canceled. It looks like your media is corrupted or your browser does not support the features your media uses.",
                "reason": "Media playback not supported."
            },
            305: {
                "code": 305,
                "message": "Can not load captions due to unknown reasons.",
                "reason": "Can not load captions due to unknown reasons."
            },
            306: {
                "code": 306,
                "message": "Unable to load media. This may be due to a server or network error, or due to an unsupported format.",
                "reason": "The server cannot or will not process the request."
            },
            307: {
                "code": 307,
                "message": "Unable to load media. This may be due to a server or network error, or due to an unsupported format.",
                "reason": "The server refused the request."
            },
            308: {
                "code": 308,
                "message": "Unable to load media. This may be due to a server or network error, or due to an unsupported format.",
                "reason": "The server do not accept the request."
            },
            501: {
                "code": 501,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebSocket connection failed."
            },
            502: {
                "code": 502,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebRTC addIceCandidate failed."
            },
            503: {
                "code": 503,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebRTC setRemoteDescription failed."
            },
            504: {
                "code": 504,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebRTC peer createOffer failed."
            },
            505: {
                "code": 505,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebRTC setLocalDescription failed."
            },
            510: {
                "code": 510,
                "message": "Network connection is unstable. Check the network connection.",
                "reason": "Network is slow."
            },
            511: {
                "code": 511,
                "message": "Connection with low-latency(OME) terminated unexpectedly.",
                "reason": "Unexpected end of connection."
            }
        }
    }
}, {
    "lang": "ko",
    "ui": {
        "context": "오븐플레이어에 관하여",
        "controls": {
            "live": "라이브",
            "low_latency_live": "초저지연 라이브",
            "low_latency_p2p": "초저지연 P2P"
        },
        "playlist": "플레이리스트",
        "setting": {
            "title": "설정",
            "speed": "재생 속도",
            "speedUnit": "x",
            "source": "소스",
            "quality": "품질",
            "caption": "자막",
            "display": "표시"
        }
    },
    "api": {
        "message": {
            "muted_play": "눌러서 소리 켜기"
        },
        "error": {
            100: {
                "code": 100,
                "message": "알 수 없는 이유로 로드 할 수 없습니다.",
                "reason": "알 수 없는 이유로 로드 할 수 없습니다."
            },
            101: {
                "code": 101,
                "message": "지원되는 미디어를 찾지 못해 로드 할 수 없습니다.",
                "reason": "Can not load due to playable media not found."
            },
            102: {
                "code": 102,
                "message": "플레시 로드가 중단 되었습니다. </br><a href='http://www.adobe.com/go/getflashplayer' target='_self'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player'></a>",
                "reason": "It looks like not found swf or your environment is localhost."
            },
            103: {
                "code": 103,
                "message": "DashJS로 인해 로드 할 수 없습니다. dashjs 버전을 확인해주세요.",
                "reason": "dash.js version is old. Please check the lastest."
            },
            104: {
                "code": 104,
                "message": "Google IMA 라이브러리가 없어 로드 할 수 없습니다.",
                "reason": "Please check the google ima library."
            },
            105: {
                "code": 105,
                "message": "DashJS 라이브러리가 없어 로드 할 수 없습니다.",
                "reason": "Not found dashjs."
            },
            106: {
                "code": 106,
                "message": "HLSJS 라이브러리가 없어 로드 할 수 없습니다.",
                "reason": "Not found hlsjs."
            },
            300: {
                "code": 300,
                "message": "알 수 없는 이유로 재생할 수 없습니다.",
                "reason": "Can not play due to unknown reasons."
            },
            301: {
                "code": 301,
                "message": "사용자에 의한 프로세스 중단.",
                "reason": "Fetching process aborted by user."
            },
            302: {
                "code": 302,
                "message": "네트워크 오류로 인해 일부 미디어를 다운로드 할 수 없습니다.",
                "reason": "Error occurred when downloading."
            },
            303: {
                "code": 303,
                "message": "미디어를 로드 할 수 없습니다. 서버 또는 네트워크 오류 또는 지원되지 않는 형식으로 인해 발생할 수 있습니다.",
                "reason": "Error occurred when decoding."
            },
            304: {
                "code": 304,
                "message": "미디어 재생이 취소되었습니다. 미디어가 손상되었거나 브라우저가 미디어에서 사용하는 기능을 지원하지 않는 것 같습니다.",
                "reason": "Media playback not supported."
            },
            305: {
                "code": 305,
                "message": "알 수 없는 이유로 자막을 로드 할 수 없습니다.",
                "reason": "Can not load captions due to unknown reasons."
            },
            306: {
                "code": 306,
                "message": "미디어를 로드 할 수 없습니다. 서버 또는 네트워크 오류 또는 지원되지 않는 형식으로 인해 발생할 수 있습니다.",
                "reason": "The server cannot or will not process the request."
            },
            307: {
                "code": 307,
                "message": "미디어를 로드 할 수 없습니다. 서버 또는 네트워크 오류 또는 지원되지 않는 형식으로 인해 발생할 수 있습니다.",
                "reason": "The server refused the request."
            },
            308: {
                "code": 308,
                "message": "미디어를 로드 할 수 없습니다. 서버 또는 네트워크 오류 또는 지원되지 않는 형식으로 인해 발생할 수 있습니다.",
                "reason": "The server do not accept the request."
            },
            501: {
                "code": 501,
                "message": "웹소켓 연결 실패",
                "reason": "WebSocket connection failed."
            },
            502: {
                "code": 502,
                "message": "저지연(OME) 서버와 연결에 실패했습니다.",
                "reason": "WebRTC addIceCandidate failed."
            },
            503: {
                "code": 503,
                "message": "저지연(OME) 서버와 연결에 실패했습니다.",
                "reason": "WebRTC setRemoteDescription failed."
            },
            504: {
                "code": 504,
                "message": "저지연(OME) 서버와 연결에 실패했습니다.",
                "reason": "WebRTC peer createOffer failed."
            },
            505: {
                "code": 505,
                "message": "저지연(OME) 서버와 연결에 실패했습니다.",
                "reason": "WebRTC setLocalDescription failed."
            },
            510: {
                "code": 510,
                "message": "네트워크 연결이 불안정합니다. 네트워크 연결을 확인하십시오.",
                "reason": "Network is slow."
            }
        }
    }
}];

/***/ }),

/***/ "./src/js/api/media/Manager.js":
/*!*************************************!*\
  !*** ./src/js/api/media/Manager.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _likeA$ = __webpack_require__(/*! utils/likeA$.js */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _webpack = __webpack_require__(/*! utils/webpack */ "./src/js/utils/webpack.js");

var _version = __webpack_require__(/*! version */ "./src/js/version.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//ToDo : Restructuring

var Manager = function Manager(container, browserInfo) {
    var that = {};
    var SWFPath = (0, _webpack.getScriptPath)('ovenplayer.js') + "OvenPlayerFlash.swf?v=" + _version.version;
    var rootId = container.getAttribute("data-parent-id");
    var $container = (0, _likeA$2["default"])(container);
    var videoElement = "";

    OvenPlayerConsole.log("MediaManager loaded. browser : ", browserInfo);

    var createHtmlVideo = function createHtmlVideo(isLoop, isAutoStart) {

        videoElement = document.createElement('video');
        videoElement.setAttribute('disableremoteplayback', '');
        videoElement.setAttribute('webkit-playsinline', 'true');
        videoElement.setAttribute('playsinline', 'true');
        if (isLoop) {
            videoElement.setAttribute('loop', '');
        }
        if (isAutoStart) {
            videoElement.setAttribute('autoplay', '');
        }
        $container.append(videoElement);

        return videoElement;
    };
    var createFlashVideo = function createFlashVideo(isLoop, bufferTime, bufferTimeMax) {
        var movie = void 0,
            flashvars = void 0,
            allowscriptaccess = void 0,
            allowfullscreen = void 0,
            quality = void 0,
            name = void 0,
            menu = void 0,
            qual = void 0,
            bgcolor = void 0,
            loop = void 0,
            wmode = void 0;
        OvenPlayerConsole.log("MediaManager Flash buffer setting : ", bufferTime, bufferTimeMax);
        movie = document.createElement('param');
        movie.setAttribute('name', 'movie');
        movie.setAttribute('value', SWFPath);

        flashvars = document.createElement('param');
        flashvars.setAttribute('name', 'flashvars');
        //playerId is to use SWF for ExternalInterface.call().
        flashvars.setAttribute('value', "playerId=" + rootId + "&bufferTime=" + bufferTime + "&bufferMaxTime=" + bufferTimeMax);

        allowscriptaccess = document.createElement('param');
        allowscriptaccess.setAttribute('name', 'allowscriptaccess');
        allowscriptaccess.setAttribute('value', 'always');

        allowfullscreen = document.createElement('param');
        allowfullscreen.setAttribute('name', 'allowfullscreen');
        allowfullscreen.setAttribute('value', 'true');

        quality = document.createElement('param');
        quality.setAttribute('name', 'quality');
        quality.setAttribute('value', 'height');

        name = document.createElement('param');
        name.setAttribute('name', 'name');
        name.setAttribute('value', rootId + "-flash");

        menu = document.createElement('param');
        menu.setAttribute('name', 'menu');
        menu.setAttribute('value', 'false');

        qual = document.createElement('param');
        qual.setAttribute('name', 'quality');
        qual.setAttribute('value', 'high');

        bgcolor = document.createElement('param');
        bgcolor.setAttribute('name', 'bgcolor');
        bgcolor.setAttribute('value', '#000000');

        wmode = document.createElement('param');
        wmode.setAttribute('name', 'wmode');
        wmode.setAttribute('value', 'opaque');

        /*let allowButton = `<a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player"></a>`;
        message = document.createElement("div");
        message.innerHTML = allowButton;*/

        if (isLoop) {
            loop = document.createElement('param');
            loop.setAttribute('name', 'loop');
            loop.setAttribute('value', 'true');
        }

        videoElement = document.createElement('object');
        videoElement.setAttribute('id', rootId + "-flash");
        videoElement.setAttribute('name', rootId + "-flash");
        videoElement.setAttribute('width', '100%');
        videoElement.setAttribute('height', '100%');
        videoElement.setAttribute('scale', 'default');
        videoElement.setAttribute('wmode', 'opaque');

        if (browserInfo.browser === "Microsoft Internet Explorer" && browserInfo.browserMajorVersion <= 9) {
            videoElement.setAttribute('classid', 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000');
            videoElement.appendChild(movie);
        } else {
            videoElement.setAttribute('data', SWFPath);
            videoElement.setAttribute('type', 'application/x-shockwave-flash');
        }
        if (isLoop) {
            videoElement.appendChild(loop);
        }

        videoElement.appendChild(wmode);
        videoElement.appendChild(bgcolor);
        videoElement.appendChild(qual);
        videoElement.appendChild(allowfullscreen);
        videoElement.appendChild(allowscriptaccess);
        videoElement.appendChild(flashvars);
        //videoElement.appendChild(message);

        $container.append(videoElement);

        return videoElement;
    };

    that.createMedia = function (providerName, playerConfig) {
        if (providerName === _constants.PROVIDER_RTMP) {
            if (videoElement) {
                that.empty();
            }
            return createFlashVideo(playerConfig.isLoop(), playerConfig.getRtmpBufferTime(), playerConfig.getRtmpBufferTimeMax());
        } else {
            // if(videoElement){
            //     // that.empty();
            //     //reuse video element.
            //     //because playlist is auto next playing.
            //     //Only same video element does not require User Interaction Error.
            //     return videoElement;
            // }else{
            //     return createHtmlVideo(playerConfig.isLoop(), playerConfig.isAutoStart());
            // }
            that.empty();
            return createHtmlVideo(playerConfig.isLoop(), playerConfig.isAutoStart());
        }
    };

    that.createAdContainer = function () {
        var adContainer = document.createElement('div');
        adContainer.setAttribute('class', 'op-ads');
        $container.append(adContainer);

        return adContainer;
    };

    that.empty = function () {
        OvenPlayerConsole.log("MediaManager removeElement()");
        $container.removeChild(videoElement);
        videoElement = null;
    };

    that.destroy = function () {
        $container.removeChild();
        $container = null;
        videoElement = null;
        rootId = null;
    };

    return that;
}; /**
    * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
    * @param   {element}   container   dom element
    *
    * */
exports["default"] = Manager;

/***/ }),

/***/ "./src/js/api/playlist/Manager.js":
/*!****************************************!*\
  !*** ./src/js/api/playlist/Manager.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _strings = __webpack_require__(/*! ../../utils/strings */ "./src/js/utils/strings.js");

var _SupportChecker = __webpack_require__(/*! ../SupportChecker */ "./src/js/api/SupportChecker.js");

var _SupportChecker2 = _interopRequireDefault(_SupportChecker);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This manages Playlist or Sources.
 * @param
 *
 * */
var Manager = function Manager(provider) {
    var that = {};
    var currentPlaylistItem = [];
    var spec = {
        playlist: [],
        currentIndex: 0
    };
    var supportChecker = (0, _SupportChecker2["default"])();

    OvenPlayerConsole.log("PlaylistManager loaded.");

    var makePrettySource = function makePrettySource(source_) {
        if (!source_ || !source_.file && !(source_.host || source_.application || source_.stream)) {
            return;
        }

        var source = _extends({}, { 'default': false }, source_);
        source.file = (0, _strings.trim)('' + source.file);

        if (source.host && source.application && source.stream) {
            source.file = source.host + "/" + source.application + "/stream/" + source.stream;
            delete source.host;
            delete source.application;
            delete source.stream;
        }

        var mimetypeRegEx = /^[^/]+\/(?:x-)?([^/]+)$/;

        if (mimetypeRegEx.test(source.type)) {
            // if type is given as a mimetype
            source.mimeType = source.type;
            source.type = source.type.replace(mimetypeRegEx, '$1');
        }

        if ((0, _validator.isRtmp)(source.file)) {
            source.type = 'rtmp';
        } else if ((0, _validator.isWebRTC)(source.file)) {
            source.type = 'webrtc';
        } else if ((0, _validator.isDash)(source.file, source.type)) {
            source.type = 'dash';
        } else if (!source.type) {
            source.type = (0, _strings.extractExtension)(source.file);
        }

        if (source.lowLatency) {
            source.lowLatency = source.lowLatency;
        }

        if (!source.type) {
            return;
        }

        // normalize types
        switch (source.type) {
            case 'm3u8':
            case 'vnd.apple.mpegurl':
                source.type = 'hls';
                break;
            case 'm4a':
                source.type = 'aac';
                break;
            case 'smil':
                source.type = 'rtmp';
                break;
            default:
                break;
        }

        Object.keys(source).forEach(function (key) {
            if (source[key] === '') {
                delete source[key];
            }
        });

        return source;
    };

    that.initPlaylist = function (playlist, playerConfig) {

        OvenPlayerConsole.log("PlaylistManager setPlaylist() ", playlist);
        var prettiedPlaylist = (_underscore2["default"].isArray(playlist) ? playlist : [playlist]).map(function (item) {
            if (!_underscore2["default"].isArray(item.tracks)) {
                delete item.tracks;
            }
            var playlistItem = _extends({}, {
                sources: [],
                tracks: [],
                title: ""
            }, item);

            if (playlistItem.sources === Object(playlistItem.sources) && !_underscore2["default"].isArray(playlistItem.sources)) {
                playlistItem.sources = [makePrettySource(playlistItem.sources)];
            }

            if (!_underscore2["default"].isArray(playlistItem.sources) || playlistItem.sources.length === 0) {
                playlistItem.sources = [makePrettySource(playlistItem)];
            }

            if (!_underscore2["default"].isArray(playlistItem.sources) || playlistItem.sources.length === 0) {
                if (item.levels) {
                    playlistItem.sources = item.levels;
                } else {
                    playlistItem.sources = [makePrettySource(item)];
                }
            }

            for (var i = 0; i < playlistItem.sources.length; i++) {
                var source = playlistItem.sources[i];
                var prettySource = "";
                if (!source) {
                    continue;
                }

                var defaultSource = source["default"];
                if (defaultSource) {
                    source["default"] = defaultSource.toString() === 'true';
                } else {
                    source["default"] = false;
                }

                // If the source doesn't have a label, number it
                if (!playlistItem.sources[i].label) {
                    playlistItem.sources[i].label = playlistItem.sources[i].type + "-" + i.toString();
                }

                prettySource = makePrettySource(playlistItem.sources[i]);
                if (supportChecker.findProviderNameBySource(prettySource)) {
                    playlistItem.sources[i] = prettySource;
                } else {
                    playlistItem.sources[i] = null;
                }
            }

            playlistItem.sources = playlistItem.sources.filter(function (source) {
                return !!source;
            });

            if (!playlistItem.title && playlistItem.sources[0] && playlistItem.sources[0].label) {
                playlistItem.title = playlistItem.sources[0].label;
            }

            // default 가 없을때 webrtc가 있다면 webrtc default : true로 자동 설정
            /*let haveDefault = _.find(playlistItem.sources, function(source){return source.default == true;});
            let webrtcSource = [];
            if(!haveDefault){
                webrtcSource = _.find(playlistItem.sources, function(source){return source.type == "webrtc";});
                if(webrtcSource){
                    webrtcSource.default = true;
                }
            }*/

            function extractOnlyOneProtocol(sources) {
                if (!!sources) {
                    var highPriorityType = playlistItem.sources[0].type;

                    return _underscore2["default"].filter(sources, { type: highPriorityType });
                }
            }

            if (playerConfig.isCurrentProtocolOnly()) {
                playlistItem.sources = extractOnlyOneProtocol(playlistItem.sources);
            }

            if (!_underscore2["default"].isArray(playlistItem.tracks)) {
                playlistItem.tracks = [];
            }
            if (_underscore2["default"].isArray(playlistItem.captions)) {
                playlistItem.tracks = playlistItem.tracks.concat(playlistItem.captions);
                delete playlistItem.captions;
            }

            playlistItem.tracks = playlistItem.tracks.map(function (track) {
                if (!track || !track.file) {
                    return false;
                }
                return _extends({}, {
                    'kind': 'captions',
                    'default': false
                }, track);
            }).filter(function (track) {
                return !!track;
            });
            return playlistItem;
        }).filter(function (item) {
            return item.sources && item.sources.length > 0;
        }) || [];
        spec.playlist = prettiedPlaylist;
        return prettiedPlaylist;
    };
    that.getPlaylist = function () {
        OvenPlayerConsole.log("PlaylistManager getPlaylist() ", spec.playlist);
        return spec.playlist;
    };
    that.getCurrentPlayList = function () {
        if (spec.playlist[spec.currentIndex]) {
            return spec.playlist[spec.currentIndex];
        } else {
            return [];
        }
    };
    that.getCurrentPlaylistIndex = function () {
        return spec.currentIndex;
    };
    that.setCurrentPlaylist = function (index) {
        if (spec.playlist[index]) {
            spec.currentIndex = index;
            provider.trigger(_constants.PLAYLIST_CHANGED, spec.currentIndex);
        }
        return spec.currentIndex;
    };
    that.getCurrentSources = function () {
        if (spec.playlist[spec.currentIndex]) {
            OvenPlayerConsole.log("PlaylistManager getCurrentSources() ", spec.playlist[spec.currentIndex].sources);
            return spec.playlist[spec.currentIndex].sources;
        } else {
            return null;
        }
    };
    that.getCurrentAdTag = function () {
        if (spec.playlist[spec.currentIndex]) {
            return spec.playlist[spec.currentIndex].adTagUrl || "";
        }
    };

    return that;
};

exports["default"] = Manager;

/***/ }),

/***/ "./src/js/api/provider/Controller.js":
/*!*******************************************!*\
  !*** ./src/js/api/provider/Controller.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SupportChecker = __webpack_require__(/*! api/SupportChecker */ "./src/js/api/SupportChecker.js");

var _SupportChecker2 = _interopRequireDefault(_SupportChecker);

var _ApiExpansions = __webpack_require__(/*! api/ApiExpansions */ "./src/js/api/ApiExpansions.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This manages provider.
 * @param
 * */
var Controller = function Controller() {
    var supportChacker = (0, _SupportChecker2["default"])();
    var Providers = {};

    var that = {};
    OvenPlayerConsole.log("ProviderController loaded.");

    var registerProvider = function registerProvider(name, provider) {
        if (Providers[name]) {
            return;
        }
        OvenPlayerConsole.log("ProviderController _registerProvider() ", name);
        Providers[name] = provider;
    };

    var ProviderLoader = {
        html5: function html5() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.Html5 */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac"), __webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.Html5")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/providers/Html5 */ "./src/js/api/provider/html5/providers/Html5.js")["default"];
                registerProvider(_constants.PROVIDER_HTML5, provider);
                return { name: _constants.PROVIDER_HTML5, provider: provider };
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        webrtc: function webrtc() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.WebRTCProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac"), __webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.WebRTCProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/providers/WebRTC */ "./src/js/api/provider/html5/providers/WebRTC.js")["default"];
                registerProvider(_constants.PROVIDER_WEBRTC, provider);
                return { name: _constants.PROVIDER_WEBRTC, provider: provider };
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        dash: function dash() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.DashProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac"), __webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.DashProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/providers/Dash */ "./src/js/api/provider/html5/providers/Dash.js")["default"];
                registerProvider(_constants.PROVIDER_DASH, provider);
                return { name: _constants.PROVIDER_DASH, provider: provider };
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        hls: function hls() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.HlsProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac"), __webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.HlsProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/providers/Hls */ "./src/js/api/provider/html5/providers/Hls.js")["default"];
                registerProvider(_constants.PROVIDER_HLS, provider);
                return { name: _constants.PROVIDER_HLS, provider: provider };
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        rtmp: function rtmp() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.RtmpProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac"), __webpack_require__.e("ovenplayer.provider.RtmpProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/flash/providers/Rtmp */ "./src/js/api/provider/flash/providers/Rtmp.js")["default"];
                registerProvider(_constants.PROVIDER_RTMP, provider);
                return { name: _constants.PROVIDER_RTMP, provider: provider };
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        }
    };

    that.loadProviders = function (playlistItem) {
        var supportedProviderNames = supportChacker.findProviderNamesByPlaylist(playlistItem);
        OvenPlayerConsole.log("ProviderController loadProviders() ", supportedProviderNames);
        if (!supportedProviderNames) {
            return Promise.reject(_constants.ERRORS.codes[_constants.INIT_UNSUPPORT_ERROR]);
        } else {
            return Promise.all(supportedProviderNames.filter(function (providerName) {
                return !!ProviderLoader[providerName];
            }).map(function (providerName) {
                return ProviderLoader[providerName]();
            }));
        }
    };

    that.findByName = function (name) {
        OvenPlayerConsole.log("ProviderController findByName() ", name);
        return Providers[name];
    };

    that.getProviderBySource = function (source) {
        var supportedProviderName = supportChacker.findProviderNameBySource(source);
        OvenPlayerConsole.log("ProviderController getProviderBySource() ", supportedProviderName);
        return that.findByName(supportedProviderName);
    };

    that.isSameProvider = function (currentSource, newSource) {
        OvenPlayerConsole.log("ProviderController isSameProvider() ", supportChacker.findProviderNameBySource(currentSource), supportChacker.findProviderNameBySource(newSource));
        return supportChacker.findProviderNameBySource(currentSource) === supportChacker.findProviderNameBySource(newSource);
    };

    return that;
};

exports["default"] = Controller;

/***/ }),

/***/ "./src/js/ovenplayer.sdk.js":
/*!**********************************!*\
  !*** ./src/js/ovenplayer.sdk.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkAndGetContainerElement = undefined;

var _Api = __webpack_require__(/*! api/Api */ "./src/js/api/Api.js");

var _Api2 = _interopRequireDefault(_Api);

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _webpack = __webpack_require__(/*! utils/webpack */ "./src/js/utils/webpack.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// __webpack_public_path__ = getScriptPath('ovenplayer.sdk.js');

/**
 * Main OvenPlayerSDK object
 */
var OvenPlayerSDK = {};

var playerList = OvenPlayerSDK.playerList = [];

var checkAndGetContainerElement = exports.checkAndGetContainerElement = function checkAndGetContainerElement(container) {
    if (!container) {

        return null;
    }

    var containerElement = null;

    if (typeof container === 'string') {

        containerElement = document.getElementById(container);
    } else if (container.nodeType) {

        containerElement = container;
    } else {

        return null;
    }

    return containerElement;
};

/**
 * Create player instance and return it.
 *
 * @param      {string | dom element} container  Id of container element or container element
 * @param      {object} options  The options
 */
OvenPlayerSDK.create = function (container, options) {

    var containerElement = checkAndGetContainerElement(container);

    var playerInstance = (0, _Api2['default'])(containerElement);
    playerInstance.init(options);

    playerList.push(playerInstance);

    return playerInstance;
};

/**
 * Gets the player instance list.
 *
 * @return     {array}  The player list.
 */
OvenPlayerSDK.getPlayerList = function () {

    return playerList;
};

/**
 * Gets the player instance by container id.
 *
 * @param      {string}  containerId  The container identifier
 * @return     {obeject | null}  The player instance.
 */
OvenPlayerSDK.getPlayerByContainerId = function (containerId) {

    for (var i = 0; i < playerList.length; i++) {

        if (playerList[i].getContainerId() === containerId) {

            return playerList[i];
        }
    }

    return null;
};

/**
 * Gets the player instance by index.
 *
 * @param      {number}  index   The index
 * @return     {object | null}  The player instance.
 */
OvenPlayerSDK.getPlayerByIndex = function (index) {

    var playerInstance = playerList[index];

    if (playerInstance) {

        return playerInstance;
    } else {

        return null;
    }
};

/**
 * Remove the player instance by playerId.
 *
 * @param      {playerId}  id
 * @return     {null}
 */
OvenPlayerSDK.removePlayer = function (playerId) {
    for (var i = 0; i < playerList.length; i++) {

        if (playerList[i].getContainerId() === playerId) {

            playerList.splice(i, 1);
        }
    }
};

/**
 * Generate webrtc source for player source type.
 *
 * @param      {Object | Array}  source   webrtc source
 * @return     {Array}  Player source Object.
 */
OvenPlayerSDK.generateWebrtcUrls = function (sources) {
    return (_underscore2['default'].isArray(sources) ? sources : [sources]).map(function (source, index) {
        if (source.host && (0, _validator.isWebRTC)(source.host) && source.application && source.stream) {
            return { file: source.host + "/" + source.application + "/" + source.stream, type: "webrtc", label: source.label ? source.label : "webrtc-" + (index + 1) };
        }
    });
};

/**
 * Whether show the player core log or not.
 *
 * @param      {boolean}  boolean   run debug mode or not.
 * @return     {boolean}  run debug mode or not.
 */
OvenPlayerSDK.debug = function (isDebugMode) {
    if (isDebugMode) {
        window.OvenPlayerConsole = { log: window['console']['log'] };
    } else {
        window.OvenPlayerConsole = { log: function log() {} };
    }
    return isDebugMode;
};

exports['default'] = OvenPlayerSDK;

/***/ }),

/***/ "./src/js/utils/browser.js":
/*!*********************************!*\
  !*** ./src/js/utils/browser.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 8. 24..
 */

var getBrowserLanguage = exports.getBrowserLanguage = function getBrowserLanguage() {
    var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i = void 0,
        language = void 0;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
                return language;
            }
        }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
            return language;
        }
    }

    return null;
};
var analUserAgent = exports.analUserAgent = function analUserAgent() {
    var unknown = '-';

    // screen
    var screenSize = '';
    if (screen.width) {
        var width = screen.width ? screen.width : '';
        var height = screen.height ? screen.height : '';
        screenSize += '' + width + " x " + height;
    }

    // browser
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var isWebview = false;
    var nameOffset = void 0,
        verOffset = void 0,
        ix = void 0;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
    }
    //삼성 브라우저
    else if ((verOffset = nAgt.indexOf('SamsungBrowser')) != -1) {
            browser = 'SamsungBrowser';
            version = nAgt.substring(verOffset + 15);
        }
        // Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
                browser = 'Microsoft Edge';
                version = nAgt.substring(verOffset + 5);
            }
            // MSIE
            else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                    browser = 'Microsoft Internet Explorer';
                    version = nAgt.substring(verOffset + 5);

                    //win7 IE11 userAgent is ugly....
                    if (nAgt.indexOf('Trident/') !== -1 && nAgt.indexOf('rv:') !== -1) {
                        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
                    }
                }
                // Chrome
                else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                        browser = 'Chrome';
                        version = nAgt.substring(verOffset + 7);
                    } else if ((verOffset = nAgt.indexOf('CriOS')) != -1) {
                        //iphone - chrome
                        browser = 'Chrome';
                        version = nAgt.substring(verOffset + 6);
                    }
                    // Firefox
                    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                            browser = 'Firefox';
                            version = nAgt.substring(verOffset + 8);
                        } else if ((verOffset = nAgt.indexOf('FxiOS')) != -1) {
                            browser = 'Firefox';
                            version = nAgt.substring(verOffset + 6);
                        }
                        // Safari
                        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                                browser = 'Safari';
                                version = nAgt.substring(verOffset + 7);
                                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                                    version = nAgt.substring(verOffset + 8);
                                }
                            }

                            // MSIE 11+
                            else if (nAgt.indexOf('Trident/') !== -1) {
                                    browser = 'Microsoft Internet Explorer';
                                    version = nAgt.substring(nAgt.indexOf('rv:') + 3);
                                }
                                // Other browsers
                                else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                                        browser = nAgt.substring(nameOffset, verOffset);
                                        version = nAgt.substring(verOffset + 1);
                                        if (browser.toLowerCase() == browser.toUpperCase()) {
                                            browser = navigator.appName;
                                        }
                                    }
    if (nAgt.indexOf(' wv') > 0) {
        isWebview = true;
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    // mobile version
    var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    // cookie
    var cookieEnabled = navigator.cookieEnabled ? true : false;

    if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
        document.cookie = 'testcookie';
        cookieEnabled = document.cookie.indexOf('testcookie') != -1 ? true : false;
    }

    // system
    var os = unknown;
    var clientStrings = [{ s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ }, { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ }, { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ }, { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ }, { s: 'Windows Vista', r: /Windows NT 6.0/ }, { s: 'Windows Server 2003', r: /Windows NT 5.2/ }, { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ }, { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ }, { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ }, { s: 'Windows 98', r: /(Windows 98|Win98)/ }, { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ }, { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ }, { s: 'Windows CE', r: /Windows CE/ }, { s: 'Windows 3.11', r: /Win16/ }, { s: 'Android', r: /Android/ }, { s: 'Open BSD', r: /OpenBSD/ }, { s: 'Sun OS', r: /SunOS/ }, { s: 'Linux', r: /(Linux|X11)/ }, { s: 'iOS', r: /(iPhone|iPad|iPod)/ }, { s: 'Mac OS XI', r: /Mac OS X 11/ }, { s: 'Mac OS X', r: /Mac OS X 10/ }, { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ }, { s: 'QNX', r: /QNX/ }, { s: 'UNIX', r: /UNIX/ }, { s: 'BeOS', r: /BeOS/ }, { s: 'OS/2', r: /OS\/2/ }, { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }

    var osVersion = unknown;

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    switch (os) {
        case 'Mac OS XI':
            osVersion = /Mac OS X (11[\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
    }

    return {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        ua: nAgt,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled
    };
};

/***/ }),

/***/ "./src/js/utils/captions/vttCue.js":
/*!*****************************************!*\
  !*** ./src/js/utils/captions/vttCue.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var VTTCue = window.VTTCue;

var autoKeyword = "auto";
var directionSetting = {
    "": true,
    "lr": true,
    "rl": true
};
var alignSetting = {
    "start": true,
    "middle": true,
    "end": true,
    "left": true,
    "right": true
};

function findDirectionSetting(value) {
    if (typeof value !== "string") {
        return false;
    }
    var dir = directionSetting[value.toLowerCase()];
    return dir ? value.toLowerCase() : false;
}

function findAlignSetting(value) {
    if (typeof value !== "string") {
        return false;
    }
    var align = alignSetting[value.toLowerCase()];
    return align ? value.toLowerCase() : false;
}

function extend(obj) {
    var i = 1;
    for (; i < arguments.length; i++) {
        var cobj = arguments[i];
        for (var p in cobj) {
            obj[p] = cobj[p];
        }
    }

    return obj;
}
if (!VTTCue) {
    VTTCue = function VTTCue(startTime, endTime, text) {
        var cue = this;
        var isIE8 = /MSIE\s8\.0/.test(navigator.userAgent);
        var baseObj = {};

        if (isIE8) {
            cue = document.createElement('custom');
        } else {
            baseObj.enumerable = true;
        }

        /**
         * Shim implementation specific properties. These properties are not in
         * the spec.
         */

        // Lets us know when the VTTCue's data has changed in such a way that we need
        // to recompute its display state. This lets us compute its display state
        // lazily.
        cue.hasBeenReset = false;

        /**
         * VTTCue and TextTrackCue properties
         * http://dev.w3.org/html5/webvtt/#vttcue-interface
         */

        var _id = "";
        var _pauseOnExit = false;
        var _startTime = startTime;
        var _endTime = endTime;
        var _text = text;
        var _region = null;
        var _vertical = "";
        var _snapToLines = true;
        var _line = "auto";
        var _lineAlign = "start";
        var _position = 50;
        var _positionAlign = "middle";
        var _size = 50;
        var _align = "middle";

        Object.defineProperty(cue, "id", extend({}, baseObj, {
            get: function get() {
                return _id;
            },
            set: function set(value) {
                _id = "" + value;
            }
        }));

        Object.defineProperty(cue, "pauseOnExit", extend({}, baseObj, {
            get: function get() {
                return _pauseOnExit;
            },
            set: function set(value) {
                _pauseOnExit = !!value;
            }
        }));

        Object.defineProperty(cue, "startTime", extend({}, baseObj, {
            get: function get() {
                return _startTime;
            },
            set: function set(value) {
                if (typeof value !== "number") {
                    throw new TypeError("Start time must be set to a number.");
                }
                _startTime = value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "endTime", extend({}, baseObj, {
            get: function get() {
                return _endTime;
            },
            set: function set(value) {
                if (typeof value !== "number") {
                    throw new TypeError("End time must be set to a number.");
                }
                _endTime = value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "text", extend({}, baseObj, {
            get: function get() {
                return _text;
            },
            set: function set(value) {
                _text = "" + value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "region", extend({}, baseObj, {
            get: function get() {
                return _region;
            },
            set: function set(value) {
                _region = value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "vertical", extend({}, baseObj, {
            get: function get() {
                return _vertical;
            },
            set: function set(value) {
                var setting = findDirectionSetting(value);
                // Have to check for false because the setting an be an empty string.
                if (setting === false) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _vertical = setting;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "snapToLines", extend({}, baseObj, {
            get: function get() {
                return _snapToLines;
            },
            set: function set(value) {
                _snapToLines = !!value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "line", extend({}, baseObj, {
            get: function get() {
                return _line;
            },
            set: function set(value) {
                if (typeof value !== "number" && value !== autoKeyword) {
                    throw new SyntaxError("An invalid number or illegal string was specified.");
                }
                _line = value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "lineAlign", extend({}, baseObj, {
            get: function get() {
                return _lineAlign;
            },
            set: function set(value) {
                var setting = findAlignSetting(value);
                if (!setting) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _lineAlign = setting;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "position", extend({}, baseObj, {
            get: function get() {
                return _position;
            },
            set: function set(value) {
                if (value < 0 || value > 100) {
                    throw new Error("Position must be between 0 and 100.");
                }
                _position = value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "positionAlign", extend({}, baseObj, {
            get: function get() {
                return _positionAlign;
            },
            set: function set(value) {
                var setting = findAlignSetting(value);
                if (!setting) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _positionAlign = setting;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "size", extend({}, baseObj, {
            get: function get() {
                return _size;
            },
            set: function set(value) {
                if (value < 0 || value > 100) {
                    throw new Error("Size must be between 0 and 100.");
                }
                _size = value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "align", extend({}, baseObj, {
            get: function get() {
                return _align;
            },
            set: function set(value) {
                var setting = findAlignSetting(value);
                if (!setting) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _align = setting;
                this.hasBeenReset = true;
            }
        }));

        /**
         * Other <track> spec defined properties
         */

        // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#text-track-cue-display-state
        cue.displayState = undefined;

        if (isIE8) {
            return cue;
        }
    };

    /**
     * VTTCue methods
     */

    VTTCue.prototype.getCueAsHTML = function () {
        // Assume WebVTT.convertCueToDOMTree is on the global.
        return WebVTT.convertCueToDOMTree(window, this.text);
    };
};

exports["default"] = VTTCue;

/***/ }),

/***/ "./src/js/utils/likeA$.js":
/*!********************************!*\
  !*** ./src/js/utils/likeA$.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   It was replace jquery's selector. It Often used by OvenTemplate. (/view/engine/OvenTemplate.js)
 * @param   selectorOrElement  string or element
 *
 * */

var La$ = function La$(selectorOrElement) {
    var that = {};
    var returnNode = function returnNode($element, selector) {
        var nodeList = $element.querySelectorAll(selector);
        if (nodeList.length > 1) {
            return nodeList;
        } else {
            return nodeList[0];
        }
    };

    var $element = "";

    if (_underscore2["default"].isElement(selectorOrElement) || _underscore2["default"].every(selectorOrElement, function (item) {
        return _underscore2["default"].isElement(item);
    })) {
        $element = selectorOrElement;
    } else if (selectorOrElement === "document") {
        $element = document;
    } else if (selectorOrElement === "window") {
        $element = window;
    } else {
        $element = returnNode(document, selectorOrElement);
    }

    if (!$element) {
        return null;
    }

    /*EFFECTS*/

    that.show = function () {
        $element.style.display = 'block';
    };

    that.hide = function () {
        $element.style.display = 'none';
    };

    /*ELEMENTS*/

    that.addClass = function (name) {
        if ($element.classList) {
            $element.classList.add(name);
        } else {
            var classNames = $element.className.split(" ");
            if (classNames.indexOf(name) === -1) {
                $element.className += " " + name;
            }
        }
    };

    that.after = function (htmlString) {
        $element.insertAdjacentHTML('afterend', htmlString);
    };

    that.append = function (htmlString) {
        $element.appendChild(htmlString);
    };

    that.before = function (htmlString) {
        $element.insertAdjacentHTML('beforebegin', htmlString);
    };

    that.children = function () {
        return $element.children || [];
    };

    //The contains() method returns a Boolean value indicating whether a node is a descendant of a specified node.
    //A descendant can be a child, grandchild, great-grandchild, and so on.
    that.contains = function (elChild) {
        return $element !== elChild && $element.contains(elChild);
    };

    that.empty = function () {
        $element.innerHTML = "";
    };

    that.find = function (selector) {
        return La$(returnNode($element, selector));
    };

    that.css = function (name, value) {
        if (value) {
            if ($element.length > 0) {
                $element.forEach(function (element) {
                    element.style[name] = value;
                });
            } else {
                $element.style[name] = value;
            }
        } else {
            return $element.style[name];
        }
    };

    that.removeClass = function (name) {
        if ($element.classList) {
            $element.classList.remove(name);
        } else {
            $element.className = $element.className.replace(new RegExp('(^|\\b)' + name.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    that.removeAttribute = function (attrName) {
        $element.removeAttribute(attrName);
    };

    /*that.append = (htmlCode) =>{
        $element.innerHTML += htmlCode;
    };*/

    that.text = function (text) {
        //IE8+
        if (text === undefined) {
            return $element.textContent;
        } else {
            $element.textContent = text;
        }
    };
    that.html = function (htmlString) {
        $element.innerHTML = htmlString;
    };
    that.hasClass = function (name) {
        //IE8+
        if ($element.classList) {
            return $element.classList.contains(name);
        } else {
            return new RegExp('(^| )' + name + '( |$)', 'gi').test($element.name);
        }
    };

    that.is = function ($targetElement) {
        /*var matches = function(el, selector) {
            return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
        };
          matches(el, '.my-class');*/
        return $element === $targetElement;
    };

    that.offset = function () {
        //IE8+
        var rect = $element.getBoundingClientRect();

        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    };

    that.width = function () {
        //IE8+
        return $element.clientWidth;
    };

    that.height = function () {
        //IE8+
        return $element.clientHeight;
    };

    that.attr = function (attr) {
        return $element.getAttribute(attr);
    };

    that.replace = function (html) {
        $element.replaceWith(html);
    };

    that.remove = function () {
        if ($element.length > 1) {
            $element.parentElement.removeChild($element);
        } else {
            $element.remove();
        }
    };

    that.removeChild = function (element) {
        if (element) {
            $element.removeChild(element);
        } else {
            while ($element.hasChildNodes()) {
                $element.removeChild($element.firstChild);
            }
        }
    };

    that.get = function () {
        return $element;
    };

    that.closest = function (selectorString) {
        var closestElement = $element.closest(selectorString);
        if (closestElement) {
            return La$(closestElement);
        } else {
            return null;
        }
    };

    return that;
}; /**
    * Created by hoho on 2018. 7. 23..
    */
exports["default"] = La$;

/***/ }),

/***/ "./src/js/utils/strings.js":
/*!*********************************!*\
  !*** ./src/js/utils/strings.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extractExtension = undefined;
exports.trim = trim;
exports.naturalHms = naturalHms;
exports.hmsToSecond = hmsToSecond;

var _underscore = __webpack_require__(/*! ./underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function trim(string) {
    return string ? string.replace(/^\s+|\s+$/g, '') : "";
}

/**
 * extractExtension
 *
 * @param      {string} path for url
 * @return     {string}  Extension
 */
var extractExtension = exports.extractExtension = function extractExtension(path) {
    if (!path || path.substr(0, 4) == 'rtmp') {
        return "";
    }
    function getAzureFileFormat(path) {
        var extension = "";
        if (/[(,]format=mpd-/i.test(path)) {
            extension = 'mpd';
        } else if (/[(,]format=m3u8-/i.test(path)) {
            extension = 'm3u8';
        }
        return extension;
    }

    var azuredFormat = getAzureFileFormat(path);
    if (azuredFormat) {
        return azuredFormat;
    }
    path = path.split('?')[0].split('#')[0];
    if (path.lastIndexOf('.') > -1) {
        return path.substr(path.lastIndexOf('.') + 1, path.length).toLowerCase();
    } else {
        return "";
    }
};

/**
 * naturalHms
 *
 * @param      {number | string}  second  The second
 * @return     {string}  formatted String
 */
function naturalHms(second) {
    var secNum = parseInt(second, 10);
    if (!second) {
        return "00:00";
    }
    var hours = Math.floor(secNum / 3600);
    var minutes = Math.floor((secNum - hours * 3600) / 60);
    var seconds = secNum - hours * 3600 - minutes * 60;

    //if (hours > 0) {minutes = "0"+minutes;}
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (hours > 0) {
        return hours + ':' + minutes + ':' + seconds;
    } else {
        return minutes + ':' + seconds;
    }
}

function hmsToSecond(str, frameRate) {
    if (!str) {
        return 0;
    }
    if (_underscore2['default'].isNumber(str) && !_underscore2['default'].isNaN(str)) {
        return str;
    }
    str = str.replace(',', '.');
    var arr = str.split(':');
    var arrLength = arr.length;
    var sec = 0;
    if (str.slice(-1) === 's') {
        sec = parseFloat(str);
    } else if (str.slice(-1) === 'm') {
        sec = parseFloat(str) * 60;
    } else if (str.slice(-1) === 'h') {
        sec = parseFloat(str) * 3600;
    } else if (arrLength > 1) {
        var secIndex = arrLength - 1;
        if (arrLength === 4) {
            if (frameRate) {
                sec = parseFloat(arr[secIndex]) / frameRate;
            }
            secIndex -= 1;
        }
        sec += parseFloat(arr[secIndex]);
        sec += parseFloat(arr[secIndex - 1]) * 60;
        if (arrLength >= 3) {
            sec += parseFloat(arr[secIndex - 2]) * 3600;
        }
    } else {
        sec = parseFloat(str);
    }
    if (_underscore2['default'].isNaN(sec)) {
        return 0;
    }
    return sec;
}

/***/ }),

/***/ "./src/js/utils/underscore.js":
/*!************************************!*\
  !*** ./src/js/utils/underscore.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//     Underscore.js 1.9.1
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
!function () {
  var n = "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self.self === self && self || "object" == (typeof global === "undefined" ? "undefined" : _typeof(global)) && global.global === global && global || this || {},
      r = n._,
      e = Array.prototype,
      o = Object.prototype,
      s = "undefined" != typeof Symbol ? Symbol.prototype : null,
      u = e.push,
      c = e.slice,
      p = o.toString,
      i = o.hasOwnProperty,
      t = Array.isArray,
      a = Object.keys,
      l = Object.create,
      f = function f() {},
      h = function h(n) {
    return n instanceof h ? n : this instanceof h ? void (this._wrapped = n) : new h(n);
  }; false || exports.nodeType ? n._ = h : ( true && !module.nodeType && module.exports && (exports = module.exports = h), exports._ = h), h.VERSION = "1.9.1";var v,
      y = function y(u, i, n) {
    if (void 0 === i) return u;switch (null == n ? 3 : n) {case 1:
        return function (n) {
          return u.call(i, n);
        };case 3:
        return function (n, r, t) {
          return u.call(i, n, r, t);
        };case 4:
        return function (n, r, t, e) {
          return u.call(i, n, r, t, e);
        };}return function () {
      return u.apply(i, arguments);
    };
  },
      d = function d(n, r, t) {
    return h.iteratee !== v ? h.iteratee(n, r) : null == n ? h.identity : h.isFunction(n) ? y(n, r, t) : h.isObject(n) && !h.isArray(n) ? h.matcher(n) : h.property(n);
  };h.iteratee = v = function v(n, r) {
    return d(n, r, 1 / 0);
  };var g = function g(u, i) {
    return i = null == i ? u.length - 1 : +i, function () {
      for (var n = Math.max(arguments.length - i, 0), r = Array(n), t = 0; t < n; t++) {
        r[t] = arguments[t + i];
      }switch (i) {case 0:
          return u.call(this, r);case 1:
          return u.call(this, arguments[0], r);case 2:
          return u.call(this, arguments[0], arguments[1], r);}var e = Array(i + 1);for (t = 0; t < i; t++) {
        e[t] = arguments[t];
      }return e[i] = r, u.apply(this, e);
    };
  },
      m = function m(n) {
    if (!h.isObject(n)) return {};if (l) return l(n);f.prototype = n;var r = new f();return f.prototype = null, r;
  },
      b = function b(r) {
    return function (n) {
      return null == n ? void 0 : n[r];
    };
  },
      j = function j(n, r) {
    return null != n && i.call(n, r);
  },
      x = function x(n, r) {
    for (var t = r.length, e = 0; e < t; e++) {
      if (null == n) return;n = n[r[e]];
    }return t ? n : void 0;
  },
      _ = Math.pow(2, 53) - 1,
      A = b("length"),
      w = function w(n) {
    var r = A(n);return "number" == typeof r && 0 <= r && r <= _;
  };h.each = h.forEach = function (n, r, t) {
    var e, u;if (r = y(r, t), w(n)) for (e = 0, u = n.length; e < u; e++) {
      r(n[e], e, n);
    } else {
      var i = h.keys(n);for (e = 0, u = i.length; e < u; e++) {
        r(n[i[e]], i[e], n);
      }
    }return n;
  }, h.map = h.collect = function (n, r, t) {
    r = d(r, t);for (var e = !w(n) && h.keys(n), u = (e || n).length, i = Array(u), o = 0; o < u; o++) {
      var a = e ? e[o] : o;i[o] = r(n[a], a, n);
    }return i;
  };var O = function O(c) {
    return function (n, r, t, e) {
      var u = 3 <= arguments.length;return function (n, r, t, e) {
        var u = !w(n) && h.keys(n),
            i = (u || n).length,
            o = 0 < c ? 0 : i - 1;for (e || (t = n[u ? u[o] : o], o += c); 0 <= o && o < i; o += c) {
          var a = u ? u[o] : o;t = r(t, n[a], a, n);
        }return t;
      }(n, y(r, e, 4), t, u);
    };
  };h.reduce = h.foldl = h.inject = O(1), h.reduceRight = h.foldr = O(-1), h.find = h.detect = function (n, r, t) {
    var e = (w(n) ? h.findIndex : h.findKey)(n, r, t);if (void 0 !== e && -1 !== e) return n[e];
  }, h.filter = h.select = function (n, e, r) {
    var u = [];return e = d(e, r), h.each(n, function (n, r, t) {
      e(n, r, t) && u.push(n);
    }), u;
  }, h.reject = function (n, r, t) {
    return h.filter(n, h.negate(d(r)), t);
  }, h.every = h.all = function (n, r, t) {
    r = d(r, t);for (var e = !w(n) && h.keys(n), u = (e || n).length, i = 0; i < u; i++) {
      var o = e ? e[i] : i;if (!r(n[o], o, n)) return !1;
    }return !0;
  }, h.some = h.any = function (n, r, t) {
    r = d(r, t);for (var e = !w(n) && h.keys(n), u = (e || n).length, i = 0; i < u; i++) {
      var o = e ? e[i] : i;if (r(n[o], o, n)) return !0;
    }return !1;
  }, h.contains = h.includes = h.include = function (n, r, t, e) {
    return w(n) || (n = h.values(n)), ("number" != typeof t || e) && (t = 0), 0 <= h.indexOf(n, r, t);
  }, h.invoke = g(function (n, t, e) {
    var u, i;return h.isFunction(t) ? i = t : h.isArray(t) && (u = t.slice(0, -1), t = t[t.length - 1]), h.map(n, function (n) {
      var r = i;if (!r) {
        if (u && u.length && (n = x(n, u)), null == n) return;r = n[t];
      }return null == r ? r : r.apply(n, e);
    });
  }), h.pluck = function (n, r) {
    return h.map(n, h.property(r));
  }, h.where = function (n, r) {
    return h.filter(n, h.matcher(r));
  }, h.findWhere = function (n, r) {
    return h.find(n, h.matcher(r));
  }, h.max = function (n, e, r) {
    var t,
        u,
        i = -1 / 0,
        o = -1 / 0;if (null == e || "number" == typeof e && "object" != _typeof(n[0]) && null != n) for (var a = 0, c = (n = w(n) ? n : h.values(n)).length; a < c; a++) {
      null != (t = n[a]) && i < t && (i = t);
    } else e = d(e, r), h.each(n, function (n, r, t) {
      u = e(n, r, t), (o < u || u === -1 / 0 && i === -1 / 0) && (i = n, o = u);
    });return i;
  }, h.min = function (n, e, r) {
    var t,
        u,
        i = 1 / 0,
        o = 1 / 0;if (null == e || "number" == typeof e && "object" != _typeof(n[0]) && null != n) for (var a = 0, c = (n = w(n) ? n : h.values(n)).length; a < c; a++) {
      null != (t = n[a]) && t < i && (i = t);
    } else e = d(e, r), h.each(n, function (n, r, t) {
      ((u = e(n, r, t)) < o || u === 1 / 0 && i === 1 / 0) && (i = n, o = u);
    });return i;
  }, h.shuffle = function (n) {
    return h.sample(n, 1 / 0);
  }, h.sample = function (n, r, t) {
    if (null == r || t) return w(n) || (n = h.values(n)), n[h.random(n.length - 1)];var e = w(n) ? h.clone(n) : h.values(n),
        u = A(e);r = Math.max(Math.min(r, u), 0);for (var i = u - 1, o = 0; o < r; o++) {
      var a = h.random(o, i),
          c = e[o];e[o] = e[a], e[a] = c;
    }return e.slice(0, r);
  }, h.sortBy = function (n, e, r) {
    var u = 0;return e = d(e, r), h.pluck(h.map(n, function (n, r, t) {
      return { value: n, index: u++, criteria: e(n, r, t) };
    }).sort(function (n, r) {
      var t = n.criteria,
          e = r.criteria;if (t !== e) {
        if (e < t || void 0 === t) return 1;if (t < e || void 0 === e) return -1;
      }return n.index - r.index;
    }), "value");
  };var k = function k(o, r) {
    return function (e, u, n) {
      var i = r ? [[], []] : {};return u = d(u, n), h.each(e, function (n, r) {
        var t = u(n, r, e);o(i, n, t);
      }), i;
    };
  };h.groupBy = k(function (n, r, t) {
    j(n, t) ? n[t].push(r) : n[t] = [r];
  }), h.indexBy = k(function (n, r, t) {
    n[t] = r;
  }), h.countBy = k(function (n, r, t) {
    j(n, t) ? n[t]++ : n[t] = 1;
  });var S = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;h.toArray = function (n) {
    return n ? h.isArray(n) ? c.call(n) : h.isString(n) ? n.match(S) : w(n) ? h.map(n, h.identity) : h.values(n) : [];
  }, h.size = function (n) {
    return null == n ? 0 : w(n) ? n.length : h.keys(n).length;
  }, h.partition = k(function (n, r, t) {
    n[t ? 0 : 1].push(r);
  }, !0), h.first = h.head = h.take = function (n, r, t) {
    return null == n || n.length < 1 ? null == r ? void 0 : [] : null == r || t ? n[0] : h.initial(n, n.length - r);
  }, h.initial = function (n, r, t) {
    return c.call(n, 0, Math.max(0, n.length - (null == r || t ? 1 : r)));
  }, h.last = function (n, r, t) {
    return null == n || n.length < 1 ? null == r ? void 0 : [] : null == r || t ? n[n.length - 1] : h.rest(n, Math.max(0, n.length - r));
  }, h.rest = h.tail = h.drop = function (n, r, t) {
    return c.call(n, null == r || t ? 1 : r);
  }, h.compact = function (n) {
    return h.filter(n, Boolean);
  };var M = function M(n, r, t, e) {
    for (var u = (e = e || []).length, i = 0, o = A(n); i < o; i++) {
      var a = n[i];if (w(a) && (h.isArray(a) || h.isArguments(a))) {
        if (r) for (var c = 0, l = a.length; c < l;) {
          e[u++] = a[c++];
        } else M(a, r, t, e), u = e.length;
      } else t || (e[u++] = a);
    }return e;
  };h.flatten = function (n, r) {
    return M(n, r, !1);
  }, h.without = g(function (n, r) {
    return h.difference(n, r);
  }), h.uniq = h.unique = function (n, r, t, e) {
    h.isBoolean(r) || (e = t, t = r, r = !1), null != t && (t = d(t, e));for (var u = [], i = [], o = 0, a = A(n); o < a; o++) {
      var c = n[o],
          l = t ? t(c, o, n) : c;r && !t ? (o && i === l || u.push(c), i = l) : t ? h.contains(i, l) || (i.push(l), u.push(c)) : h.contains(u, c) || u.push(c);
    }return u;
  }, h.union = g(function (n) {
    return h.uniq(M(n, !0, !0));
  }), h.intersection = function (n) {
    for (var r = [], t = arguments.length, e = 0, u = A(n); e < u; e++) {
      var i = n[e];if (!h.contains(r, i)) {
        var o;for (o = 1; o < t && h.contains(arguments[o], i); o++) {}o === t && r.push(i);
      }
    }return r;
  }, h.difference = g(function (n, r) {
    return r = M(r, !0, !0), h.filter(n, function (n) {
      return !h.contains(r, n);
    });
  }), h.unzip = function (n) {
    for (var r = n && h.max(n, A).length || 0, t = Array(r), e = 0; e < r; e++) {
      t[e] = h.pluck(n, e);
    }return t;
  }, h.zip = g(h.unzip), h.object = function (n, r) {
    for (var t = {}, e = 0, u = A(n); e < u; e++) {
      r ? t[n[e]] = r[e] : t[n[e][0]] = n[e][1];
    }return t;
  };var F = function F(i) {
    return function (n, r, t) {
      r = d(r, t);for (var e = A(n), u = 0 < i ? 0 : e - 1; 0 <= u && u < e; u += i) {
        if (r(n[u], u, n)) return u;
      }return -1;
    };
  };h.findIndex = F(1), h.findLastIndex = F(-1), h.sortedIndex = function (n, r, t, e) {
    for (var u = (t = d(t, e, 1))(r), i = 0, o = A(n); i < o;) {
      var a = Math.floor((i + o) / 2);t(n[a]) < u ? i = a + 1 : o = a;
    }return i;
  };var E = function E(i, o, a) {
    return function (n, r, t) {
      var e = 0,
          u = A(n);if ("number" == typeof t) 0 < i ? e = 0 <= t ? t : Math.max(t + u, e) : u = 0 <= t ? Math.min(t + 1, u) : t + u + 1;else if (a && t && u) return n[t = a(n, r)] === r ? t : -1;if (r != r) return 0 <= (t = o(c.call(n, e, u), h.isNaN)) ? t + e : -1;for (t = 0 < i ? e : u - 1; 0 <= t && t < u; t += i) {
        if (n[t] === r) return t;
      }return -1;
    };
  };h.indexOf = E(1, h.findIndex, h.sortedIndex), h.lastIndexOf = E(-1, h.findLastIndex), h.range = function (n, r, t) {
    null == r && (r = n || 0, n = 0), t || (t = r < n ? -1 : 1);for (var e = Math.max(Math.ceil((r - n) / t), 0), u = Array(e), i = 0; i < e; i++, n += t) {
      u[i] = n;
    }return u;
  }, h.chunk = function (n, r) {
    if (null == r || r < 1) return [];for (var t = [], e = 0, u = n.length; e < u;) {
      t.push(c.call(n, e, e += r));
    }return t;
  };var N = function N(n, r, t, e, u) {
    if (!(e instanceof r)) return n.apply(t, u);var i = m(n.prototype),
        o = n.apply(i, u);return h.isObject(o) ? o : i;
  };h.bind = g(function (r, t, e) {
    if (!h.isFunction(r)) throw new TypeError("Bind must be called on a function");var u = g(function (n) {
      return N(r, u, t, this, e.concat(n));
    });return u;
  }), h.partial = g(function (u, i) {
    var o = h.partial.placeholder,
        a = function a() {
      for (var n = 0, r = i.length, t = Array(r), e = 0; e < r; e++) {
        t[e] = i[e] === o ? arguments[n++] : i[e];
      }for (; n < arguments.length;) {
        t.push(arguments[n++]);
      }return N(u, a, this, this, t);
    };return a;
  }), (h.partial.placeholder = h).bindAll = g(function (n, r) {
    var t = (r = M(r, !1, !1)).length;if (t < 1) throw new Error("bindAll must be passed function names");for (; t--;) {
      var e = r[t];n[e] = h.bind(n[e], n);
    }
  }), h.memoize = function (e, u) {
    var i = function i(n) {
      var r = i.cache,
          t = "" + (u ? u.apply(this, arguments) : n);return j(r, t) || (r[t] = e.apply(this, arguments)), r[t];
    };return i.cache = {}, i;
  }, h.delay = g(function (n, r, t) {
    return setTimeout(function () {
      return n.apply(null, t);
    }, r);
  }), h.defer = h.partial(h.delay, h, 1), h.throttle = function (t, e, u) {
    var i,
        o,
        a,
        c,
        l = 0;u || (u = {});var f = function f() {
      l = !1 === u.leading ? 0 : h.now(), i = null, c = t.apply(o, a), i || (o = a = null);
    },
        n = function n() {
      var n = h.now();l || !1 !== u.leading || (l = n);var r = e - (n - l);return o = this, a = arguments, r <= 0 || e < r ? (i && (clearTimeout(i), i = null), l = n, c = t.apply(o, a), i || (o = a = null)) : i || !1 === u.trailing || (i = setTimeout(f, r)), c;
    };return n.cancel = function () {
      clearTimeout(i), l = 0, i = o = a = null;
    }, n;
  }, h.debounce = function (t, e, u) {
    var i,
        o,
        a = function a(n, r) {
      i = null, r && (o = t.apply(n, r));
    },
        n = g(function (n) {
      if (i && clearTimeout(i), u) {
        var r = !i;i = setTimeout(a, e), r && (o = t.apply(this, n));
      } else i = h.delay(a, e, this, n);return o;
    });return n.cancel = function () {
      clearTimeout(i), i = null;
    }, n;
  }, h.wrap = function (n, r) {
    return h.partial(r, n);
  }, h.negate = function (n) {
    return function () {
      return !n.apply(this, arguments);
    };
  }, h.compose = function () {
    var t = arguments,
        e = t.length - 1;return function () {
      for (var n = e, r = t[e].apply(this, arguments); n--;) {
        r = t[n].call(this, r);
      }return r;
    };
  }, h.after = function (n, r) {
    return function () {
      if (--n < 1) return r.apply(this, arguments);
    };
  }, h.before = function (n, r) {
    var t;return function () {
      return 0 < --n && (t = r.apply(this, arguments)), n <= 1 && (r = null), t;
    };
  }, h.once = h.partial(h.before, 2), h.restArguments = g;var I = !{ toString: null }.propertyIsEnumerable("toString"),
      T = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
      B = function B(n, r) {
    var t = T.length,
        e = n.constructor,
        u = h.isFunction(e) && e.prototype || o,
        i = "constructor";for (j(n, i) && !h.contains(r, i) && r.push(i); t--;) {
      (i = T[t]) in n && n[i] !== u[i] && !h.contains(r, i) && r.push(i);
    }
  };h.keys = function (n) {
    if (!h.isObject(n)) return [];if (a) return a(n);var r = [];for (var t in n) {
      j(n, t) && r.push(t);
    }return I && B(n, r), r;
  }, h.allKeys = function (n) {
    if (!h.isObject(n)) return [];var r = [];for (var t in n) {
      r.push(t);
    }return I && B(n, r), r;
  }, h.values = function (n) {
    for (var r = h.keys(n), t = r.length, e = Array(t), u = 0; u < t; u++) {
      e[u] = n[r[u]];
    }return e;
  }, h.mapObject = function (n, r, t) {
    r = d(r, t);for (var e = h.keys(n), u = e.length, i = {}, o = 0; o < u; o++) {
      var a = e[o];i[a] = r(n[a], a, n);
    }return i;
  }, h.pairs = function (n) {
    for (var r = h.keys(n), t = r.length, e = Array(t), u = 0; u < t; u++) {
      e[u] = [r[u], n[r[u]]];
    }return e;
  }, h.invert = function (n) {
    for (var r = {}, t = h.keys(n), e = 0, u = t.length; e < u; e++) {
      r[n[t[e]]] = t[e];
    }return r;
  }, h.functions = h.methods = function (n) {
    var r = [];for (var t in n) {
      h.isFunction(n[t]) && r.push(t);
    }return r.sort();
  };var R = function R(c, l) {
    return function (n) {
      var r = arguments.length;if (l && (n = Object(n)), r < 2 || null == n) return n;for (var t = 1; t < r; t++) {
        for (var e = arguments[t], u = c(e), i = u.length, o = 0; o < i; o++) {
          var a = u[o];l && void 0 !== n[a] || (n[a] = e[a]);
        }
      }return n;
    };
  };h.extend = R(h.allKeys), h.extendOwn = h.assign = R(h.keys), h.findKey = function (n, r, t) {
    r = d(r, t);for (var e, u = h.keys(n), i = 0, o = u.length; i < o; i++) {
      if (r(n[e = u[i]], e, n)) return e;
    }
  };var q,
      K,
      z = function z(n, r, t) {
    return r in t;
  };h.pick = g(function (n, r) {
    var t = {},
        e = r[0];if (null == n) return t;h.isFunction(e) ? (1 < r.length && (e = y(e, r[1])), r = h.allKeys(n)) : (e = z, r = M(r, !1, !1), n = Object(n));for (var u = 0, i = r.length; u < i; u++) {
      var o = r[u],
          a = n[o];e(a, o, n) && (t[o] = a);
    }return t;
  }), h.omit = g(function (n, t) {
    var r,
        e = t[0];return h.isFunction(e) ? (e = h.negate(e), 1 < t.length && (r = t[1])) : (t = h.map(M(t, !1, !1), String), e = function e(n, r) {
      return !h.contains(t, r);
    }), h.pick(n, e, r);
  }), h.defaults = R(h.allKeys, !0), h.create = function (n, r) {
    var t = m(n);return r && h.extendOwn(t, r), t;
  }, h.clone = function (n) {
    return h.isObject(n) ? h.isArray(n) ? n.slice() : h.extend({}, n) : n;
  }, h.tap = function (n, r) {
    return r(n), n;
  }, h.isMatch = function (n, r) {
    var t = h.keys(r),
        e = t.length;if (null == n) return !e;for (var u = Object(n), i = 0; i < e; i++) {
      var o = t[i];if (r[o] !== u[o] || !(o in u)) return !1;
    }return !0;
  }, q = function q(n, r, t, e) {
    if (n === r) return 0 !== n || 1 / n == 1 / r;if (null == n || null == r) return !1;if (n != n) return r != r;var u = typeof n === "undefined" ? "undefined" : _typeof(n);return ("function" === u || "object" === u || "object" == (typeof r === "undefined" ? "undefined" : _typeof(r))) && K(n, r, t, e);
  }, K = function K(n, r, t, e) {
    n instanceof h && (n = n._wrapped), r instanceof h && (r = r._wrapped);var u = p.call(n);if (u !== p.call(r)) return !1;switch (u) {case "[object RegExp]":case "[object String]":
        return "" + n == "" + r;case "[object Number]":
        return +n != +n ? +r != +r : 0 == +n ? 1 / +n == 1 / r : +n == +r;case "[object Date]":case "[object Boolean]":
        return +n == +r;case "[object Symbol]":
        return s.valueOf.call(n) === s.valueOf.call(r);}var i = "[object Array]" === u;if (!i) {
      if ("object" != (typeof n === "undefined" ? "undefined" : _typeof(n)) || "object" != (typeof r === "undefined" ? "undefined" : _typeof(r))) return !1;var o = n.constructor,
          a = r.constructor;if (o !== a && !(h.isFunction(o) && o instanceof o && h.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in r) return !1;
    }e = e || [];for (var c = (t = t || []).length; c--;) {
      if (t[c] === n) return e[c] === r;
    }if (t.push(n), e.push(r), i) {
      if ((c = n.length) !== r.length) return !1;for (; c--;) {
        if (!q(n[c], r[c], t, e)) return !1;
      }
    } else {
      var l,
          f = h.keys(n);if (c = f.length, h.keys(r).length !== c) return !1;for (; c--;) {
        if (l = f[c], !j(r, l) || !q(n[l], r[l], t, e)) return !1;
      }
    }return t.pop(), e.pop(), !0;
  }, h.isEqual = function (n, r) {
    return q(n, r);
  }, h.isEmpty = function (n) {
    return null == n || (w(n) && (h.isArray(n) || h.isString(n) || h.isArguments(n)) ? 0 === n.length : 0 === h.keys(n).length);
  }, h.isElement = function (n) {
    return !(!n || 1 !== n.nodeType);
  }, h.isArray = t || function (n) {
    return "[object Array]" === p.call(n);
  }, h.isObject = function (n) {
    var r = typeof n === "undefined" ? "undefined" : _typeof(n);return "function" === r || "object" === r && !!n;
  }, h.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error", "Symbol", "Map", "WeakMap", "Set", "WeakSet"], function (r) {
    h["is" + r] = function (n) {
      return p.call(n) === "[object " + r + "]";
    };
  }), h.isArguments(arguments) || (h.isArguments = function (n) {
    return j(n, "callee");
  });var D = n.document && n.document.childNodes; true && "object" != (typeof Int8Array === "undefined" ? "undefined" : _typeof(Int8Array)) && "function" != typeof D && (h.isFunction = function (n) {
    return "function" == typeof n || !1;
  }), h.isFinite = function (n) {
    return !h.isSymbol(n) && isFinite(n) && !isNaN(parseFloat(n));
  }, h.isNaN = function (n) {
    return h.isNumber(n) && isNaN(n);
  }, h.isBoolean = function (n) {
    return !0 === n || !1 === n || "[object Boolean]" === p.call(n);
  }, h.isNull = function (n) {
    return null === n;
  }, h.isUndefined = function (n) {
    return void 0 === n;
  }, h.has = function (n, r) {
    if (!h.isArray(r)) return j(n, r);for (var t = r.length, e = 0; e < t; e++) {
      var u = r[e];if (null == n || !i.call(n, u)) return !1;n = n[u];
    }return !!t;
  }, h.noConflict = function () {
    return n._ = r, this;
  }, h.identity = function (n) {
    return n;
  }, h.constant = function (n) {
    return function () {
      return n;
    };
  }, h.noop = function () {}, h.property = function (r) {
    return h.isArray(r) ? function (n) {
      return x(n, r);
    } : b(r);
  }, h.propertyOf = function (r) {
    return null == r ? function () {} : function (n) {
      return h.isArray(n) ? x(r, n) : r[n];
    };
  }, h.matcher = h.matches = function (r) {
    return r = h.extendOwn({}, r), function (n) {
      return h.isMatch(n, r);
    };
  }, h.times = function (n, r, t) {
    var e = Array(Math.max(0, n));r = y(r, t, 1);for (var u = 0; u < n; u++) {
      e[u] = r(u);
    }return e;
  }, h.random = function (n, r) {
    return null == r && (r = n, n = 0), n + Math.floor(Math.random() * (r - n + 1));
  }, h.now = Date.now || function () {
    return new Date().getTime();
  };var L = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" },
      P = h.invert(L),
      W = function W(r) {
    var t = function t(n) {
      return r[n];
    },
        n = "(?:" + h.keys(r).join("|") + ")",
        e = RegExp(n),
        u = RegExp(n, "g");return function (n) {
      return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n;
    };
  };h.escape = W(L), h.unescape = W(P), h.result = function (n, r, t) {
    h.isArray(r) || (r = [r]);var e = r.length;if (!e) return h.isFunction(t) ? t.call(n) : t;for (var u = 0; u < e; u++) {
      var i = null == n ? void 0 : n[r[u]];void 0 === i && (i = t, u = e), n = h.isFunction(i) ? i.call(n) : i;
    }return n;
  };var C = 0;h.uniqueId = function (n) {
    var r = ++C + "";return n ? n + r : r;
  }, h.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g };var J = /(.)^/,
      U = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" },
      V = /\\|'|\r|\n|\u2028|\u2029/g,
      $ = function $(n) {
    return "\\" + U[n];
  };h.template = function (i, n, r) {
    !n && r && (n = r), n = h.defaults({}, n, h.templateSettings);var t,
        e = RegExp([(n.escape || J).source, (n.interpolate || J).source, (n.evaluate || J).source].join("|") + "|$", "g"),
        o = 0,
        a = "__p+='";i.replace(e, function (n, r, t, e, u) {
      return a += i.slice(o, u).replace(V, $), o = u + n.length, r ? a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : t ? a += "'+\n((__t=(" + t + "))==null?'':__t)+\n'" : e && (a += "';\n" + e + "\n__p+='"), n;
    }), a += "';\n", n.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";try {
      t = new Function(n.variable || "obj", "_", a);
    } catch (n) {
      throw n.source = a, n;
    }var u = function u(n) {
      return t.call(this, n, h);
    },
        c = n.variable || "obj";return u.source = "function(" + c + "){\n" + a + "}", u;
  }, h.chain = function (n) {
    var r = h(n);return r._chain = !0, r;
  };var G = function G(n, r) {
    return n._chain ? h(r).chain() : r;
  };h.mixin = function (t) {
    return h.each(h.functions(t), function (n) {
      var r = h[n] = t[n];h.prototype[n] = function () {
        var n = [this._wrapped];return u.apply(n, arguments), G(this, r.apply(h, n));
      };
    }), h;
  }, h.mixin(h), h.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (r) {
    var t = e[r];h.prototype[r] = function () {
      var n = this._wrapped;return t.apply(n, arguments), "shift" !== r && "splice" !== r || 0 !== n.length || delete n[0], G(this, n);
    };
  }), h.each(["concat", "join", "slice"], function (n) {
    var r = e[n];h.prototype[n] = function () {
      return G(this, r.apply(this._wrapped, arguments));
    };
  }), h.prototype.value = function () {
    return this._wrapped;
  }, h.prototype.valueOf = h.prototype.toJSON = h.prototype.value, h.prototype.toString = function () {
    return String(this._wrapped);
  },  true && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return h;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/utils/validator.js":
/*!***********************************!*\
  !*** ./src/js/utils/validator.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isDash = exports.isHls = exports.isWebRTC = exports.isRtmp = undefined;

var _strings = __webpack_require__(/*! utils/strings */ "./src/js/utils/strings.js");

var isRtmp = exports.isRtmp = function isRtmp(file, type) {
    if (file) {
        return file.indexOf('rtmp:') == 0 || type == 'rtmp';
    }
};
var isWebRTC = exports.isWebRTC = function isWebRTC(file, type) {
    if (file) {
        return file.indexOf('ws:') === 0 || file.indexOf('wss:') === 0 || type === 'webrtc';
    }
    return false;
};
var isHls = exports.isHls = function isHls(file, type) {
    if (file) {
        return type === 'hls' || type === 'm3u8' || type === 'application/vnd.apple.mpegurl' || (0, _strings.extractExtension)(file) == 'm3u8';
    }
};
var isDash = exports.isDash = function isDash(file, type) {
    if (file) {
        return type === 'mpd' || type === 'dash' || type === 'application/dash+xml' || (0, _strings.extractExtension)(file) == 'mpd';
    }
};

/***/ }),

/***/ "./src/js/utils/webpack.js":
/*!*********************************!*\
  !*** ./src/js/utils/webpack.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * utils for webpack
 */

var getScriptPath = exports.getScriptPath = function getScriptPath(scriptName) {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].src;
        if (src) {
            var index = src.lastIndexOf('/' + scriptName);
            if (index >= 0) {
                return src.substr(0, index + 1);
            }
        }
    }
    return '';
};

/***/ }),

/***/ "./src/js/version.js":
/*!***************************!*\
  !*** ./src/js/version.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hoho on 2018. 6. 29..
 */
var version = exports.version = '0.9.5-2021012615-localbuild';

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PdmVuUGxheWVyL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9PdmVuUGxheWVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL092ZW5QbGF5ZXIvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9zcmMvanMvYXBpL0FwaS5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9BcGlFeHBhbnNpb25zLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vT3ZlblBsYXllci8uL3NyYy9qcy9hcGkvTGF6eUNvbW1hbmRFeGVjdXRvci5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9jYXB0aW9uL0xvYWRlci5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9jYXB0aW9uL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vT3ZlblBsYXllci8uL3NyYy9qcy9hcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9zcmMvanMvYXBpL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9tZWRpYS9NYW5hZ2VyLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vT3ZlblBsYXllci8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL3V0aWxzL2NhcHRpb25zL3Z0dEN1ZS5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL3V0aWxzL2xpa2VBJC5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vT3ZlblBsYXllci8uL3NyYy9qcy91dGlscy91bmRlcnNjb3JlLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9zcmMvanMvdXRpbHMvdmFsaWRhdG9yLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL3ZlcnNpb24uanMiXSwibmFtZXMiOlsiQXBpIiwiY29udGFpbmVyIiwidGhhdCIsImNvbnNvbGUiLCJsb2ciLCJ2ZXJzaW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJwbGF5bGlzdE1hbmFnZXIiLCJwcm92aWRlckNvbnRyb2xsZXIiLCJ1c2VyQWdlbnRPYmplY3QiLCJtZWRpYU1hbmFnZXIiLCJjdXJyZW50UHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJsYXp5UXVldWUiLCJjYXB0aW9uTWFuYWdlciIsIndlYnJ0Y1JldHJ5IiwiV0VCUlRDX1JFVFJZX0NPVU5UIiwid2VicnRjUmV0cnlDb3VudCIsIndlYnJ0Y1JldHJ5SW50ZXJ2YWwiLCJ3ZWJydGNSZXRyeVRpbWVyIiwicnVuTmV4dFBsYXlsaXN0IiwiaW5kZXgiLCJuZXh0UGxheWxpc3RJbmRleCIsInBsYXlsaXN0IiwiZ2V0UGxheWxpc3QiLCJoYXNOZXh0UGxheWxpc3QiLCJzZXRTb3VyY2VJbmRleCIsInNldFZvbHVtZSIsImdldFZvbHVtZSIsInNldEN1cnJlbnRQbGF5bGlzdCIsImluaXRQcm92aWRlciIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXIiLCJBTExfUExBWUxJU1RfRU5ERUQiLCJsYXN0UGxheVBvc2l0aW9uIiwicGlja1F1YWxpdHlGcm9tU291cmNlIiwic291cmNlcyIsInF1YWxpdHkiLCJpIiwibGVuZ3RoIiwiZ2V0U291cmNlSW5kZXgiLCJsb2FkUHJvdmlkZXJzIiwiZ2V0Q3VycmVudFBsYXlMaXN0IiwidGhlbiIsIlByb3ZpZGVycyIsIkVSUk9SUyIsImNvZGVzIiwiSU5JVF9VTlNVUFBPUlRfRVJST1IiLCJkZXN0cm95IiwiZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgiLCJjdXJyZW50U291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlcyIsInByb3ZpZGVyTmFtZSIsInByb3ZpZGVyIiwiY3JlYXRlTWVkaWEiLCJnZXRDdXJyZW50QWRUYWciLCJQUk9WSURFUl9SVE1QIiwib24iLCJuYW1lIiwiZGF0YSIsIkVSUk9SIiwib3MiLCJicm93c2VyIiwiY29kZSIsIlBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IiLCJzZXRUaW1lb3V0Iiwic2V0Q3VycmVudFNvdXJjZSIsImdldEN1cnJlbnRTb3VyY2UiLCJQTEFZRVJfUExBWSIsImNsZWFySW50ZXJ2YWwiLCJORVRXT1JLX1VOU1RBQkxFRCIsIlBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUIiwiZ2V0Q29uZmlnIiwiYXV0b0ZhbGxiYWNrIiwiUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1ciLCJnZXRTb3VyY2VzIiwicGF1c2UiLCJwcmVsb2FkIiwiUkVBRFkiLCJmbHVzaCIsImVycm9yIiwib2ZmIiwidGVtcEVycm9yIiwiSU5JVF9VTktOV09OX0VSUk9SIiwiaW5pdCIsIm9wdGlvbnMiLCJtZWRpYUNvbnRhaW5lciIsIndlYnJ0Y0NvbmZpZyIsImxvYWRpbmdSZXRyeUNvdW50IiwidW5kZWZpbmVkIiwiZ2V0U3lzdGVtVGV4dCIsImFwaSIsImluaXRQbGF5bGlzdCIsImdldFByb3ZpZGVyTmFtZSIsImdldE5hbWUiLCJnZXRCcm93c2VyIiwic2V0VGltZWNvZGVNb2RlIiwiaXNTaG93IiwiaXNUaW1lY29kZU1vZGUiLCJnZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsInZvbHVtZSIsInNldE11dGUiLCJzdGF0ZSIsImdldE11dGUiLCJsb2FkIiwic2V0Q3VycmVudFF1YWxpdHkiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRDdXJyZW50UGxheWxpc3QiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiaXNTYW1lUHJvdmlkZXIiLCJyZXN1bHRTb3VyY2VJbmRleCIsIlBST1ZJREVSX0hMUyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9IVE1MNSIsImdldFF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldENhcHRpb25MaXN0IiwiZ2V0Q3VycmVudENhcHRpb24iLCJzZXRDdXJyZW50Q2FwdGlvbiIsImFkZENhcHRpb24iLCJ0cmFjayIsInJlbW92ZUNhcHRpb24iLCJnZXRCdWZmZXIiLCJnZXRTdGF0ZSIsInN0b3AiLCJyZW1vdmUiLCJERVNUUk9ZIiwiT3ZlblBsYXllclNESyIsInJlbW92ZVBsYXllciIsImdldENvbnRhaW5lcklkIiwiZ2V0UGxheWVyTGlzdCIsImdldFZlcnNpb24iLCJBcGlSdG1wRXhwYW5zaW9uIiwiZXh0ZXJuYWxDYWxsYmFja0NyZWVwIiwicmVzdWx0IiwidHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsIiwiQ29uZmlndXJhdG9yIiwiY29tcG9zZVNvdXJjZU9wdGlvbnMiLCJEZWZhdWx0cyIsInBsYXliYWNrUmF0ZXMiLCJtdXRlIiwibG9vcCIsImNvbnRyb2xzIiwiYXV0b1N0YXJ0IiwidGltZWNvZGUiLCJzb3VyY2VJbmRleCIsImhpZGVQbGF5bGlzdEljb24iLCJydG1wQnVmZmVyVGltZSIsInJ0bXBCdWZmZXJUaW1lTWF4IiwiYWRDbGllbnQiLCJjdXJyZW50UHJvdG9jb2xPbmx5Iiwic3lzdGVtVGV4dCIsImxhbmciLCJleHBhbmRGdWxsU2NyZWVuVUkiLCJmdWxsc2NyZWVuT3B0aW9uIiwic2hvd0JpZ1BsYXlCdXR0b24iLCJzZXJpYWxpemUiLCJ2YWwiLCJsb3dlcmNhc2VWYWwiLCJ0b0xvd2VyQ2FzZSIsImlzTmFOIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsImRlc2VyaWFsaXplIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjb25maWciLCJ1c2VyQ3VzdHVtU3lzdGVtVGV4dCIsIl8iLCJpc0FycmF5IiwiY3VycmVudFN5c3RlbVRleHQiLCJmaW5kV2hlcmUiLCJTWVNURU1fVEVYVCIsInB1c2giLCJmaWx0ZXIiLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJpbmRleE9mIiwic29ydCIsImNvbmZpZ1BsYXlsaXN0Iiwib2JqIiwicGljayIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJzcGVjIiwiZ2V0QWRDbGllbnQiLCJzZXRDb25maWciLCJ2YWx1ZSIsImdldENvbnRhaW5lciIsImdldFF1YWxpdHlMYWJlbCIsInF1YWxpdHlMYWJlbCIsInNldFF1YWxpdHlMYWJlbCIsIm5ld0xhYmVsIiwiaXNDdXJyZW50UHJvdG9jb2xPbmx5IiwiQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCIsImdldFJ0bXBCdWZmZXJUaW1lIiwiZ2V0UnRtcEJ1ZmZlclRpbWVNYXgiLCJpc011dGUiLCJpc0xvb3AiLCJpc0NvbnRyb2xzIiwiZ2V0UGxheWJhY2tSYXRlcyIsImdldExhbmd1YWdlIiwic2V0UGxheWxpc3QiLCJFdmVudEVtaXR0ZXIiLCJvYmplY3QiLCJfZXZlbnRzIiwidHJpZ2dlckV2ZW50cyIsImV2ZW50cyIsImFyZ3MiLCJjb250ZXh0IiwiZXZlbnQiLCJsaXN0ZW5lciIsImFwcGx5Iiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwiYWxsRXZlbnRzIiwiYWxsIiwibmFtZXMiLCJsIiwicmV0YWluIiwiaiIsImsiLCJfbGlzdGVuZXIiLCJvbmNlIiwiY291bnQiLCJvbmNlQ2FsbGJhY2siLCJMYXp5Q29tbWFuZEV4ZWN1dG9yIiwiaW5zdGFuY2UiLCJxdWV1ZWRDb21tYW5kcyIsImNvbW1hbmRRdWV1ZSIsInVuZGVjb3JhdGVkTWV0aG9kcyIsImV4ZWN1dGVNb2RlIiwiY29tbWFuZCIsIm1ldGhvZCIsIkFycmF5IiwicHJvdG90eXBlIiwiYWRkUXVldWUiLCJleGVjdXRlUXVldWVkQ29tbWFuZHMiLCJzaGlmdCIsInNldEV4ZWN1dGVNb2RlIiwibW9kZSIsImdldFVuZGVjb3JhdGVkTWV0aG9kcyIsImdldFF1ZXVlIiwiZW1wdHkiLCJyZW1vdmVBbmRFeGN1dGVPbmNlIiwiY29tbWFuZF8iLCJjb21tYW5kUXVldWVJdGVtIiwic3BsaWNlIiwiZmluZEluZGV4IiwiU3VwcG9ydENoZWNrZXIiLCJzdXBwb3J0TGlzdCIsImNoZWNrU3VwcG9ydCIsInNvdXJjZSIsIk1pbWVUeXBlcyIsImFhYyIsIm1wNCIsImY0diIsIm00diIsIm1vdiIsIm1wMyIsIm1wZWciLCJvZ3YiLCJvZ2ciLCJvZ2EiLCJ2b3JiaXMiLCJ3ZWJtIiwiZjRhIiwibTN1OCIsIm0zdSIsImhscyIsInZpZGVvIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2FuUGxheVR5cGUiLCJmaWxlIiwidHlwZSIsIm1pbWVUeXBlIiwid2luZG93IiwiTWVkaWFTb3VyY2UiLCJXZWJLaXRNZWRpYVNvdXJjZSIsImlzSGxzU3VwcG9ydCIsImdldE1lZGlhU291cmNlIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXIiLCJTb3VyY2VCdWZmZXIiLCJXZWJLaXRTb3VyY2VCdWZmZXIiLCJpc1R5cGVTdXBwb3J0ZWQiLCJzb3VyY2VCdWZmZXJWYWxpZEFQSSIsImFwcGVuZEJ1ZmZlciIsInRlc3RGbGFzaCIsInN1cHBvcnQiLCJBY3RpdmVYT2JqZWN0IiwiZSIsIm5hdmlnYXRvciIsIm1pbWVUeXBlcyIsImZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSIsInNvcnVjZV8iLCJmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QiLCJwbGF5bGlzdEl0ZW0iLCJzdXBwb3J0TmFtZXMiLCJpdGVtIiwic3VwcG9ydGVkIiwiTG9hZGVyIiwiY29udmVydFRvVlRUQ3VlcyIsImN1ZXMiLCJWVFRDdWUiLCJjdWUiLCJzdGFydCIsImVuZCIsInRleHQiLCJsYW5ndWFnZSIsInN1Y2Nlc3NDYWxsYmFjayIsImVycm9yQ2FsbGJhY2siLCJyZXF1ZXN0T3B0aW9ucyIsInVybCIsImVuY29kaW5nIiwibG9hZFJlcXVlc3REb3dubG9kZXIiLCJSZXF1ZXN0IiwicmVzcG9uc2UiLCJib2R5IiwidnR0Q3VlcyIsImxvYWRWdHRQYXJzZXIiLCJwYXJzZXIiLCJXZWJWVFQiLCJQYXJzZXIiLCJTdHJpbmdEZWNvZGVyIiwib25jdWUiLCJvbmZsdXNoIiwicGFyc2UiLCJsb2FkU21pUGFyc2VyIiwicGFyc2VkRGF0YSIsIlNtaVBhcnNlciIsImZpeGVkTGFuZyIsInJlcXVpcmUiLCJlcnIiLCJpc1N1cHBvcnQiLCJraW5kIiwiTWFuYWdlciIsInBsYXlsaXN0SW5kZXgiLCJjYXB0aW9uTGlzdCIsImN1cnJlbnRDYXB0aW9uSW5kZXgiLCJjYXB0aW9uTG9hZGVyIiwiaXNGaXNydExvYWQiLCJpc1Nob3dpbmciLCJiaW5kVHJhY2siLCJsYWJlbCIsImlkIiwidHJhY2tzQ291bnQiLCJ0cmFja0lkIiwicHJlZml4IiwiZGVmYXVsdHRyYWNrIiwiY2hhbmdlQ3VycmVudENhcHRpb24iLCJDT05URU5UX0NBUFRJT05fQ0hBTkdFRCIsInRyYWNrcyIsImNhcHRpb25JZCIsIlBMQVlFUl9DQVBUSU9OX0VSUk9SIiwiQ09OVEVOVF9USU1FIiwibWV0YSIsImN1cnJlbnRDdWVzIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsIkNPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCIsImZsdXNoQ2FwdGlvbkxpc3QiLCJsYXN0Q2FwdGlvbkluZGV4IiwiX2luZGV4IiwiZXJyb3JzIiwiX2VudHJ5IiwiZW50cnkiLCJhcnJheSIsInNwbGl0IiwiaWR4IiwibGluZSIsInN1YnN0ciIsImpvaW4iLCJTcnRQYXJzZXIiLCJjYXB0aW9ucyIsImxpc3QiLCJTVEFURV9CVUZGRVJJTkciLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJTVEFURV9QQVVTRUQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfRVJST1IiLCJTVEFURV9MT0FESU5HIiwiU1RBVEVfU1RBTExFRCIsIlNUQVRFX0FEX0xPQURJTkciLCJTVEFURV9BRF9MT0FERUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiU1RBVEVfQURfUEFVU0VEIiwiU1RBVEVfQURfQ09NUExFVEUiLCJTVEFURV9BRF9FUlJPUiIsIlBMQVlFUl9BRF9DTElDSyIsIlBST1ZJREVSX1dFQlJUQyIsIkNPTlRFTlRfQ09NUExFVEUiLCJDT05URU5UX1NFRUsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiRElTUExBWV9DTElDSyIsIkNPTlRFTlRfTE9BREVEIiwiUExBWUxJU1RfQ0hBTkdFRCIsIkNPTlRFTlRfU0VFS0VEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX0NMSUNLRUQiLCJQTEFZRVJfUkVTSVpFRCIsIlBMQVlFUl9MT0FESU5HIiwiUExBWUVSX0ZVTExTQ1JFRU5fUkVRVUVTVCIsIlBMQVlFUl9GVUxMU0NSRUVOX0NIQU5HRUQiLCJQTEFZRVJfV0FSTklORyIsIkFEX0NIQU5HRUQiLCJBRF9USU1FIiwiQ09OVEVOVF9CVUZGRVIiLCJDT05URU5UX1JBVEVfQ0hBTkdFIiwiQ09OVEVOVF9WT0xVTUUiLCJDT05URU5UX01VVEUiLCJDT05URU5UX01FVEEiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwiT01FX1AyUF9NT0RFIiwiQURfQ0xJRU5UX0dPT0dMRUlNQSIsIkFEX0NMSUVOVF9WQVNUIiwiSU5JVF9SVE1QX1NFVFVQX0VSUk9SIiwiSU5JVF9EQVNIX1VOU1VQUE9SVCIsIklOSVRfQURTX0VSUk9SIiwiSU5JVF9EQVNIX05PVEZPVU5EIiwiSU5JVF9ITFNKU19OT1RGT1VORCIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SIiwiUExBWUVSX0FVVEhfRkFJTEVEX0VSUk9SIiwiUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiV0FSTl9NU0dfTVVURURQTEFZIiwiVUlfSUNPTlMiLCJ2b2x1bWVfbXV0ZSIsIm9wX3dhcm5pbmciLCJicm93c2VySW5mbyIsIlNXRlBhdGgiLCJyb290SWQiLCJnZXRBdHRyaWJ1dGUiLCIkY29udGFpbmVyIiwidmlkZW9FbGVtZW50IiwiY3JlYXRlSHRtbFZpZGVvIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kIiwiY3JlYXRlRmxhc2hWaWRlbyIsImJ1ZmZlclRpbWUiLCJidWZmZXJUaW1lTWF4IiwibW92aWUiLCJmbGFzaHZhcnMiLCJhbGxvd3NjcmlwdGFjY2VzcyIsImFsbG93ZnVsbHNjcmVlbiIsIm1lbnUiLCJxdWFsIiwiYmdjb2xvciIsIndtb2RlIiwiYnJvd3Nlck1ham9yVmVyc2lvbiIsImFwcGVuZENoaWxkIiwiY3JlYXRlQWRDb250YWluZXIiLCJhZENvbnRhaW5lciIsInJlbW92ZUNoaWxkIiwiY3VycmVudFBsYXlsaXN0SXRlbSIsImN1cnJlbnRJbmRleCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwidGVzdCIsInJlcGxhY2UiLCJsb3dMYXRlbmN5IiwicHJldHRpZWRQbGF5bGlzdCIsInRpdGxlIiwibGV2ZWxzIiwicHJldHR5U291cmNlIiwiZGVmYXVsdFNvdXJjZSIsInRvU3RyaW5nIiwiZXh0cmFjdE9ubHlPbmVQcm90b2NvbCIsImhpZ2hQcmlvcml0eVR5cGUiLCJjb25jYXQiLCJhZFRhZ1VybCIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVyUHJvdmlkZXIiLCJQcm92aWRlckxvYWRlciIsImh0bWw1IiwiRXJyb3IiLCJ3ZWJydGMiLCJkYXNoIiwicnRtcCIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZXMiLCJQcm9taXNlIiwicmVqZWN0IiwiZmluZEJ5TmFtZSIsImdldFByb3ZpZGVyQnlTb3VyY2UiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWUiLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiY29udGFpbmVyRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZVR5cGUiLCJjcmVhdGUiLCJwbGF5ZXJJbnN0YW5jZSIsImdldFBsYXllckJ5Q29udGFpbmVySWQiLCJjb250YWluZXJJZCIsImdldFBsYXllckJ5SW5kZXgiLCJwbGF5ZXJJZCIsImdlbmVyYXRlV2VicnRjVXJscyIsImRlYnVnIiwiaXNEZWJ1Z01vZGUiLCJnZXRCcm93c2VyTGFuZ3VhZ2UiLCJuYXYiLCJicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMiLCJsYW5ndWFnZXMiLCJhbmFsVXNlckFnZW50IiwidW5rbm93biIsInNjcmVlblNpemUiLCJzY3JlZW4iLCJ3aWR0aCIsImhlaWdodCIsIm5WZXIiLCJhcHBWZXJzaW9uIiwibkFndCIsInVzZXJBZ2VudCIsImFwcE5hbWUiLCJtYWpvclZlcnNpb24iLCJwYXJzZUludCIsImlzV2VidmlldyIsIm5hbWVPZmZzZXQiLCJ2ZXJPZmZzZXQiLCJpeCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwidG9VcHBlckNhc2UiLCJtb2JpbGUiLCJjb29raWVFbmFibGVkIiwiY29va2llIiwiY2xpZW50U3RyaW5ncyIsInMiLCJyIiwiY3MiLCJvc1ZlcnNpb24iLCJleGVjIiwiYnJvd3NlclZlcnNpb24iLCJ1YSIsImNvb2tpZXMiLCJhdXRvS2V5d29yZCIsImRpcmVjdGlvblNldHRpbmciLCJhbGlnblNldHRpbmciLCJmaW5kRGlyZWN0aW9uU2V0dGluZyIsImRpciIsImZpbmRBbGlnblNldHRpbmciLCJhbGlnbiIsImV4dGVuZCIsImNvYmoiLCJwIiwiaXNJRTgiLCJiYXNlT2JqIiwiZW51bWVyYWJsZSIsImhhc0JlZW5SZXNldCIsIl9pZCIsIl9wYXVzZU9uRXhpdCIsIl9zdGFydFRpbWUiLCJfZW5kVGltZSIsIl90ZXh0IiwiX3JlZ2lvbiIsIl92ZXJ0aWNhbCIsIl9zbmFwVG9MaW5lcyIsIl9saW5lIiwiX2xpbmVBbGlnbiIsIl9wb3NpdGlvbiIsIl9wb3NpdGlvbkFsaWduIiwiX3NpemUiLCJfYWxpZ24iLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsInNldCIsIlR5cGVFcnJvciIsInNldHRpbmciLCJTeW50YXhFcnJvciIsImRpc3BsYXlTdGF0ZSIsImdldEN1ZUFzSFRNTCIsImNvbnZlcnRDdWVUb0RPTVRyZWUiLCJMYSQiLCJzZWxlY3Rvck9yRWxlbWVudCIsInJldHVybk5vZGUiLCIkZWxlbWVudCIsInNlbGVjdG9yIiwibm9kZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaXNFbGVtZW50IiwiZXZlcnkiLCJzaG93Iiwic3R5bGUiLCJkaXNwbGF5IiwiaGlkZSIsImFkZENsYXNzIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xhc3NOYW1lcyIsImNsYXNzTmFtZSIsImFmdGVyIiwiaHRtbFN0cmluZyIsImluc2VydEFkamFjZW50SFRNTCIsImJlZm9yZSIsImNoaWxkcmVuIiwiY29udGFpbnMiLCJlbENoaWxkIiwiaW5uZXJIVE1MIiwiZmluZCIsImNzcyIsImVsZW1lbnQiLCJyZW1vdmVDbGFzcyIsIlJlZ0V4cCIsInJlbW92ZUF0dHJpYnV0ZSIsImF0dHJOYW1lIiwidGV4dENvbnRlbnQiLCJodG1sIiwiaGFzQ2xhc3MiLCJpcyIsIiR0YXJnZXRFbGVtZW50Iiwib2Zmc2V0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsInNjcm9sbFRvcCIsImxlZnQiLCJzY3JvbGxMZWZ0IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJhdHRyIiwicmVwbGFjZVdpdGgiLCJwYXJlbnRFbGVtZW50IiwiaGFzQ2hpbGROb2RlcyIsImZpcnN0Q2hpbGQiLCJjbG9zZXN0Iiwic2VsZWN0b3JTdHJpbmciLCJjbG9zZXN0RWxlbWVudCIsInRyaW0iLCJuYXR1cmFsSG1zIiwiaG1zVG9TZWNvbmQiLCJzdHJpbmciLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsInNlY29uZCIsInNlY051bSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsInN0ciIsImZyYW1lUmF0ZSIsImFyciIsImFyckxlbmd0aCIsInNlYyIsInNlY0luZGV4IiwibiIsInNlbGYiLCJnbG9iYWwiLCJvIiwiU3ltYm9sIiwidSIsImMiLCJoYXNPd25Qcm9wZXJ0eSIsInQiLCJhIiwiZiIsImgiLCJfd3JhcHBlZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJWRVJTSU9OIiwidiIsInkiLCJkIiwiaXRlcmF0ZWUiLCJpZGVudGl0eSIsImlzRnVuY3Rpb24iLCJpc09iamVjdCIsIm1hdGNoZXIiLCJwcm9wZXJ0eSIsImciLCJtYXgiLCJtIiwiYiIsIngiLCJwb3ciLCJBIiwidyIsImVhY2giLCJjb2xsZWN0IiwiTyIsInJlZHVjZSIsImZvbGRsIiwiaW5qZWN0IiwicmVkdWNlUmlnaHQiLCJmb2xkciIsImRldGVjdCIsImZpbmRLZXkiLCJzZWxlY3QiLCJuZWdhdGUiLCJzb21lIiwiYW55IiwiaW5jbHVkZXMiLCJpbmNsdWRlIiwidmFsdWVzIiwiaW52b2tlIiwicGx1Y2siLCJ3aGVyZSIsIm1pbiIsInNodWZmbGUiLCJzYW1wbGUiLCJyYW5kb20iLCJjbG9uZSIsInNvcnRCeSIsImNyaXRlcmlhIiwiZ3JvdXBCeSIsImluZGV4QnkiLCJjb3VudEJ5IiwiUyIsInRvQXJyYXkiLCJpc1N0cmluZyIsIm1hdGNoIiwic2l6ZSIsInBhcnRpdGlvbiIsImZpcnN0IiwiaGVhZCIsInRha2UiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiTSIsImlzQXJndW1lbnRzIiwiZmxhdHRlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzQm9vbGVhbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwidW56aXAiLCJ6aXAiLCJGIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwiRSIsInJhbmdlIiwiY2VpbCIsImNodW5rIiwiTiIsImJpbmQiLCJwYXJ0aWFsIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImNhY2hlIiwiZGVsYXkiLCJkZWZlciIsInRocm90dGxlIiwibGVhZGluZyIsIm5vdyIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwiY2FuY2VsIiwiZGVib3VuY2UiLCJ3cmFwIiwiY29tcG9zZSIsInJlc3RBcmd1bWVudHMiLCJJIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJUIiwiQiIsImNvbnN0cnVjdG9yIiwiYWxsS2V5cyIsIm1hcE9iamVjdCIsInBhaXJzIiwiaW52ZXJ0IiwiZnVuY3Rpb25zIiwibWV0aG9kcyIsIlIiLCJleHRlbmRPd24iLCJhc3NpZ24iLCJxIiwiSyIsInoiLCJvbWl0IiwiU3RyaW5nIiwiZGVmYXVsdHMiLCJ0YXAiLCJpc01hdGNoIiwidmFsdWVPZiIsInBvcCIsImlzRXF1YWwiLCJpc0VtcHR5IiwiRCIsImNoaWxkTm9kZXMiLCJJbnQ4QXJyYXkiLCJpc0Zpbml0ZSIsImlzU3ltYm9sIiwiaXNOdWxsIiwiaXNVbmRlZmluZWQiLCJoYXMiLCJub0NvbmZsaWN0IiwiY29uc3RhbnQiLCJub29wIiwicHJvcGVydHlPZiIsIm1hdGNoZXMiLCJ0aW1lcyIsIkRhdGUiLCJnZXRUaW1lIiwiTCIsIlAiLCJXIiwiZXNjYXBlIiwidW5lc2NhcGUiLCJDIiwidW5pcXVlSWQiLCJ0ZW1wbGF0ZVNldHRpbmdzIiwiZXZhbHVhdGUiLCJpbnRlcnBvbGF0ZSIsIkoiLCJVIiwiViIsIiQiLCJ0ZW1wbGF0ZSIsInZhcmlhYmxlIiwiRnVuY3Rpb24iLCJjaGFpbiIsIl9jaGFpbiIsIkciLCJtaXhpbiIsInRvSlNPTiIsImRlZmluZSIsImlzUnRtcCIsImlzV2ViUlRDIiwiaXNIbHMiLCJpc0Rhc2giLCJnZXRTY3JpcHRQYXRoIiwic2NyaXB0TmFtZSIsInNjcmlwdHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNyYyIsIl9fVkVSU0lPTl9fIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7Ozs7UUFJQTtRQUNBO1FBQ0Es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SUFBa0YsK0JBQWlCRCxJQUFqQixLQUEwQixNQUFySDtBQUVIO0FBQ0osQ0FMTTtBQU1BLElBQU1ta0IsMEJBQVMsU0FBVEEsTUFBUyxDQUFVbmtCLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ3hDLFFBQUdELElBQUgsRUFBUTtBQUNKLGVBQVNDLFNBQVMsS0FBVCxJQUFtQkEsU0FBUyxNQUE1QixJQUFzQ0EsU0FBUyxzQkFBL0MsSUFBeUUsK0JBQWlCRCxJQUFqQixLQUEwQixLQUE1RztBQUVIO0FBQ0osQ0FMTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25CUDs7OztBQUlPLElBQU1va0Isd0NBQWdCLFNBQWhCQSxhQUFnQixDQUFTQyxVQUFULEVBQXFCO0FBQzlDLFFBQU1DLFVBQVV6a0IsU0FBUzBrQixvQkFBVCxDQUE4QixRQUE5QixDQUFoQjtBQUNBLFNBQUssSUFBSXQwQixJQUFJLENBQWIsRUFBZ0JBLElBQUlxMEIsUUFBUXAwQixNQUE1QixFQUFvQ0QsR0FBcEMsRUFBeUM7QUFDckMsWUFBTXUwQixNQUFNRixRQUFRcjBCLENBQVIsRUFBV3UwQixHQUF2QjtBQUNBLFlBQUlBLEdBQUosRUFBUztBQUNMLGdCQUFNejFCLFFBQVF5MUIsSUFBSTdULFdBQUosQ0FBZ0IsTUFBTTBULFVBQXRCLENBQWQ7QUFDQSxnQkFBSXQxQixTQUFTLENBQWIsRUFBZ0I7QUFDWix1QkFBT3kxQixJQUFJdGUsTUFBSixDQUFXLENBQVgsRUFBY25YLFFBQVEsQ0FBdEIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU8sRUFBUDtBQUNILENBWk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKUDs7O0FBR08sSUFBTWhCLDRCQUFVMDJCLDZCQUFoQixDIiwiZmlsZSI6Im92ZW5wbGF5ZXIuc2RrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiT3ZlblBsYXllclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJPdmVuUGxheWVyXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXIuc2RrXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiLFwic21pcGFyc2VyXCI6XCJzbWlwYXJzZXJcIixcInZlbmRvcnN+ZG93bmxvYWRlclwiOlwidmVuZG9yc35kb3dubG9hZGVyXCIsXCJkb3dubG9hZGVyXCI6XCJkb3dubG9hZGVyXCIsXCJ2dHRwYXJzZXJcIjpcInZ0dHBhcnNlclwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wT3ZlblBsYXllclwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucE92ZW5QbGF5ZXJcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLnNkay5qc1wiKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsImltcG9ydCBDYXB0aW9uTWFuYWdlciBmcm9tIFwiYXBpL2NhcHRpb24vTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29uZmlndXJhdG9yIGZyb20gXCJhcGkvQ29uZmlndXJhdG9yXCI7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IExhenlDb21tYW5kRXhlY3V0b3IgZnJvbSBcImFwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yXCI7XHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQbGF5bGlzdE1hbmFnZXIgZnJvbSBcImFwaS9wbGF5bGlzdC9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlckNvbnRyb2xsZXIgZnJvbSBcImFwaS9wcm92aWRlci9Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7UkVBRFksIEVSUk9SUywgRVJST1IsIENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIElOSVRfVU5LTldPTl9FUlJPUiwgSU5JVF9VTlNVUFBPUlRfRVJST1IsIERFU1RST1ksIFBMQVlFUl9QTEFZLCBORVRXT1JLX1VOU1RBQkxFRCwgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1csIFBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNULCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SLFxyXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfUlRNUCwgQUxMX1BMQVlMSVNUX0VOREVEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuaW1wb3J0IHthbmFsVXNlckFnZW50fSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xyXG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBvYmplY3QgY29ubmVjdHMgVUkgdG8gdGhlIHByb3ZpZGVyLlxyXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcblxyXG5jb25zdCBBcGkgPSBmdW5jdGlvbihjb250YWluZXIpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xyXG5cclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIltbT3ZlblBsYXllcl1dIHYuXCIrIHZlcnNpb24pO1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XHJcblxyXG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcih0aGF0KTtcclxuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcclxuICAgIGxldCB1c2VyQWdlbnRPYmplY3QgPSBhbmFsVXNlckFnZW50KCk7XHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgdXNlckFnZW50T2JqZWN0KTtcclxuICAgIGxldCBjdXJyZW50UHJvdmlkZXIgPSBcIlwiO1xyXG4gICAgbGV0IHBsYXllckNvbmZpZyA9IFwiXCI7XHJcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcclxuICAgIGxldCBjYXB0aW9uTWFuYWdlciA9IFwiXCI7XHJcblxyXG4gICAgbGV0IHdlYnJ0Y1JldHJ5ID0gZmFsc2U7XHJcbiAgICBsZXQgV0VCUlRDX1JFVFJZX0NPVU5UID0gMztcclxuICAgIGxldCB3ZWJydGNSZXRyeUNvdW50ID0gV0VCUlRDX1JFVFJZX0NPVU5UO1xyXG4gICAgbGV0IHdlYnJ0Y1JldHJ5SW50ZXJ2YWwgPSAxMDAwO1xyXG4gICAgbGV0IHdlYnJ0Y1JldHJ5VGltZXIgPSBudWxsO1xyXG5cclxuXHJcbiAgICBjb25zdCBydW5OZXh0UGxheWxpc3QgPSBmdW5jdGlvbihpbmRleCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicnVuTmV4dFBsYXlsaXN0XCIpO1xyXG4gICAgICAgIGxldCBuZXh0UGxheWxpc3RJbmRleCA9IGluZGV4OyAvLyB8fCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSArIDE7XHJcbiAgICAgICAgbGV0IHBsYXlsaXN0ID0gcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCk7XHJcbiAgICAgICAgbGV0IGhhc05leHRQbGF5bGlzdCA9IHBsYXlsaXN0W25leHRQbGF5bGlzdEluZGV4XT8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIC8vaW5pdCBzb3VyY2UgaW5kZXhcclxuICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlSW5kZXgoMCk7XHJcblxyXG4gICAgICAgIC8vc2V0IEdvbGJhbCBWb2x1bWUgaW5mb1xyXG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRWb2x1bWUoY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcclxuXHJcbiAgICAgICAgaWYoaGFzTmV4dFBsYXlsaXN0KXtcclxuICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XHJcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRDdXJyZW50UGxheWxpc3QobmV4dFBsYXlsaXN0SW5kZXgpO1xyXG4gICAgICAgICAgICBpbml0UHJvdmlkZXIoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG4gICAgICAgICAgICAgICAgLy9Bbnl3YXkgbmV4dHBsYXlsaXN0IHJ1bnMgYXV0b1N0YXJ0IS5cclxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vQWxsIFBsYXlsaXN0IEVuZGVkLlxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQUxMX1BMQVlMSVNUX0VOREVELCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3QgaW5pdFByb3ZpZGVyID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XHJcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xyXG4gICAgICAgICAgICB2YXIgcXVhbGl0eSA9IDA7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkgPT09IGkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvKmlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheUxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYoUHJvdmlkZXJzLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRVJST1JTLmNvZGVzW0lOSVRfVU5TVVBQT1JUX0VSUk9SXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNhcHRpb25NYW5hZ2VyKXtcclxuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IENhcHRpb25NYW5hZ2VyKHRoYXQsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpKTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNhcHRpb25zXCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tRdWFsaXR5RnJvbVNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XHJcbiAgICAgICAgICAgIGxldCBwcm92aWRlck5hbWUgPSBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XVtcIm5hbWVcIl07XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBwcm92aWRlclwiLCBwcm92aWRlck5hbWUpO1xyXG4gICAgICAgICAgICAvL0luaXQgUHJvdmlkZXIuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9ICBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XS5wcm92aWRlcihcclxuICAgICAgICAgICAgICAgIG1lZGlhTWFuYWdlci5jcmVhdGVNZWRpYShwcm92aWRlck5hbWUsIHBsYXllckNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcsXHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudEFkVGFnKClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHByb3ZpZGVyTmFtZSA9PT0gUFJPVklERVJfUlRNUCl7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHByb3ZpZGVyIHR5cGUgaXMgUlRNUCwgd2UgYWNjZXB0cyBSdG1wRXhwYW5zaW9uLlxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGF0LCBBcGlSdG1wRXhwYW5zaW9uKGN1cnJlbnRQcm92aWRlcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1RoaXMgcGFzc2VzIHRoZSBldmVudCBjcmVhdGVkIGJ5IHRoZSBQcm92aWRlciB0byBBUEkuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5vbihcImFsbFwiLCBmdW5jdGlvbihuYW1lLCBkYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiggbmFtZSA9PT0gRVJST1IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hyb21lID49ODAgb24gQW5kcm9pZCBtaXNzZXMgaDI0NiBpbiBTRFAgd2hlbiBmaXJzdCB0aW1lIGFmdGVyIHdlYiBwYWdlIGxvYWRlZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTbyB3YWl0IHVudGlsIGJyb3dzZXIgZ2V0IGgyNjQgY2FwYWJpbGl0aWVzIGFuZCBjcmVhdGUgYW5zd2VyIFNEUC5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlckFnZW50T2JqZWN0Lm9zID09PSAnQW5kcm9pZCcgJiYgdXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09ICdDaHJvbWUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmNvZGUgJiYgZGF0YS5jb2RlID09PSBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSh0aGF0LmdldEN1cnJlbnRTb3VyY2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB3ZWJydGNSZXRyeUludGVydmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKG5hbWUgPT09IFwiY29tcGxldGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuTmV4dFBsYXlsaXN0KHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobmFtZSA9PT0gUExBWUVSX1BMQVkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdlYnJ0Y1JldHJ5VGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VicnRjUmV0cnlDb3VudCA9IFdFQlJUQ19SRVRSWV9DT1VOVDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0F1dG8gc3dpdGNoaW5nIG5leHQgc291cmNlIHdoZW4gcGxheWVyIGxvYWQgZmFpbGVkIGJ5IGFtaXNzIHNvdXJjZS5cclxuICAgICAgICAgICAgICAgIC8vZGF0YS5jb2RlID09PSBQTEFZRVJfRklMRV9FUlJPUlxyXG4gICAgICAgICAgICAgICAgaWYoIG5hbWUgPT09IEVSUk9SIHx8IG5hbWUgPT09IE5FVFdPUktfVU5TVEFCTEVEICl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT09IFBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICghcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9GYWxsYmFjayAmJiBkYXRhLmNvZGUgPT09IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF3ZWJydGNSZXRyeSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5Q291bnQgPSBXRUJSVENfUkVUUllfQ09VTlQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAod2VicnRjUmV0cnkgJiYgd2VicnRjUmV0cnlDb3VudCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VicnRjUmV0cnlDb3VudCAtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgd2VicnRjUmV0cnlJbnRlcnZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAod2VicnRjUmV0cnkgJiYgd2VicnRjUmV0cnlDb3VudCA8PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdlYnJ0Y1JldHJ5VGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJydGNSZXRyeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJydGNSZXRyeUNvdW50ID0gV0VCUlRDX1JFVFJZX0NPVU5UO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9GYWxsYmFjayAmJiBwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSsxIDwgdGhhdC5nZXRTb3VyY2VzKCkubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIHNlcXVlbnRpYWwgaGFzIGF2YWlsYWJsZSBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50U291cmNlKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpKzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pLnRoZW4oKCk9PntcclxuXHJcbiAgICAgICAgICAgIC8vcHJvdmlkZXIncyBwcmVsb2FkKCkgaGF2ZSB0byBtYWRlIFByb21pc2UuIEN1eiBpdCBvdmVyY29tZXMgJ2ZsYXNoIGxvYWRpbmcgdGltaW5nIHByb2JsZW0nLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIucHJlbG9hZChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSwgbGFzdFBsYXlQb3NpdGlvbikudGhlbihmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihSRUFEWSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICAgICAvL1RoaXMgaXMgbm8gcmVhc29uIHRvIGV4aXN0IGFueW1vcmUuXHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG5cclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUub2ZmKCk7XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvciAmJiBlcnJvci5jb2RlICYmIEVSUk9SUy5jb2Rlc1tlcnJvci5jb2RlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9VTktOV09OX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAvL0lOSVQgRVJST1JcclxuICAgICAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pe1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW0lOSVRfVU5LTldPTl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy94eHggOiBJZiB5b3UgaW5pdCBlbXB0eSBzb3VyY2VzLiAoSSB0aGluayB0aGlzIGlzIHN0cmFuZ2UgY2FzZS4pXHJcbiAgICAgICAgICAgIC8vVGhpcyB3b3JrcyBmb3IgdGhpcyBjYXNlLlxyXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XHJcbiAgICAgICAgICAgIC8vcGxheWVyLmxvYWQoc29ydWNlcyk7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZS5vZmYoKTtcclxuICAgICAgICAgICAgLy9sYXp5UXVldWUucmVtb3ZlQW5kRXhjdXRlT25jZShcImxvYWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSDstIjquLDtmZQg7ZWo7IiYXHJcbiAgICAgKiBpbml0XHJcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiovXHJcbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XHJcbiAgICAgICAgLy9JdCBjb2xsZWN0cyB0aGUgY29tbWFuZHMgYW5kIGV4ZWN1dGVzIHRoZW0gYXQgdGhlIHRpbWUgd2hlbiB0aGV5IGFyZSBleGVjdXRhYmxlLlxyXG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgW1xyXG4gICAgICAgICAgICAnbG9hZCcsJ3BsYXknLCdwYXVzZScsJ3NlZWsnLCdzdG9wJywgJ2dldER1cmF0aW9uJywgJ2dldFBvc2l0aW9uJywgJ2dldFZvbHVtZSdcclxuICAgICAgICAgICAgLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnICwgJ2dldFF1YWxpdHlMZXZlbHMnXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgb3B0aW9ucy5tZWRpYUNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICBvcHRpb25zLmJyb3dzZXIgPSB1c2VyQWdlbnRPYmplY3Q7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gQ29uZmlndXJhdG9yKG9wdGlvbnMsIHRoYXQpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKVwiKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnICYmIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcubG9hZGluZ1JldHJ5Q291bnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBXRUJSVENfUkVUUllfQ09VTlQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG9hZGluZ1JldHJ5Q291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL05vdCB3b3JraW5nIDogU3ludGF4RXJyb3I6IFwiRVJST1JTLmNvZGVzXCIgaXMgcmVhZC1vbmx5XHJcbiAgICAgICAgRVJST1JTLmNvZGVzID0gcGxheWVyQ29uZmlnLmdldFN5c3RlbVRleHQoKS5hcGkuZXJyb3I7XHJcbiAgICAgICAgLy9Db29sXHJcbiAgICAgICAgLy9FUlJPUlMuY29kZXMucHVzaChwbGF5ZXJDb25maWcuZ2V0U3lzdGVtVGV4dCgpKTtcclxuXHJcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmluaXRQbGF5bGlzdChwbGF5ZXJDb25maWcuZ2V0UGxheWxpc3QoKSwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgc291cmNlcyA6IFwiICwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xyXG5cclxuICAgICAgICBpbml0UHJvdmlkZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFByb3ZpZGVyTmFtZSA9ICgpID0+IHtcclxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENvbmZpZygpXCIsIHBsYXllckNvbmZpZy5nZXRDb25maWcoKSk7XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRDb25maWcoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEJyb3dzZXIgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0VGltZWNvZGVNb2RlID0gKGlzU2hvdykgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0VGltZWNvZGVNb2RlKClcIiwgaXNTaG93KTtcclxuICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKGlzU2hvdyk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc1RpbWVjb2RlTW9kZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc1RpbWVjb2RlTW9kZSgpXCIpO1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuaXNUaW1lY29kZU1vZGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRGcmFtZXJhdGUoKVwiKTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRQcm92aWRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEZyYW1lcmF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrRnJhbWUoKVwiLCBmcmFtZUNvdW50KTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNlZWtGcmFtZShmcmFtZUNvdW50KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RHVyYXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQb3NpdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRWb2x1bWUoKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRWb2x1bWUoKSBcIiArIHZvbHVtZSk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldFZvbHVtZSh2b2x1bWUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0TXV0ZSgpIFwiICsgc3RhdGUpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0TXV0ZShzdGF0ZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0TXV0ZSgpIFwiICsgY3VycmVudFByb3ZpZGVyLmdldE11dGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5sb2FkID0gKHBsYXlsaXN0KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogbG9hZCgpIFwiLCBwbGF5bGlzdCk7XHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcclxuXHJcbiAgICAgICAgaWYocGxheWxpc3Qpe1xyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5pbml0UGxheWxpc3QocGxheWxpc3QsIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwbGF5KCkgXCIpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wbGF5KCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGF1c2UoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrKCkgXCIrIHBvc2l0aW9uKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2Vlayhwb3NpdGlvbik7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFBsYXliYWNrUmF0ZSgpIFwiLCBwbGF5YmFja1JhdGUpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0UGxheWJhY2tSYXRlKHBsYXllckNvbmZpZy5zZXRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXliYWNrUmF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCkpO1xyXG4gICAgICAgIHJldHVybiBwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5bGlzdCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UGxheWxpc3QoKSBcIiwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRQbGF5bGlzdCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBpbmRleCk7XHJcbiAgICAgICAgcnVuTmV4dFBsYXlsaXN0KGluZGV4KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U291cmNlcygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRTb3VyY2UoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKGluZGV4KSA9PntcclxuXHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50U291cmNlKCkgXCIsIGluZGV4KTtcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xyXG4gICAgICAgIGxldCBjdXJyZW50U291cmNlID0gc291cmNlc1tjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpXTtcclxuICAgICAgICBsZXQgbmV3U291cmNlID0gc291cmNlc1tpbmRleF07XHJcbiAgICAgICAgbGV0IGxhc3RQbGF5UG9zaXRpb24gPSBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgaXNTYW1lUHJvdmlkZXIgPSBwcm92aWRlckNvbnRyb2xsZXIuaXNTYW1lUHJvdmlkZXIoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKTtcclxuICAgICAgICAvLyBwcm92aWRlci5zZXJDdXJyZW50UXVhbGl0eSAtPiBwbGF5ZXJDb25maWcgc2V0dGluZyAtPiBsb2FkXHJcbiAgICAgICAgbGV0IHJlc3VsdFNvdXJjZUluZGV4ID0gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRTb3VyY2UoaW5kZXgsIGlzU2FtZVByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgaWYoIW5ld1NvdXJjZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBpc1NhbWVQcm92aWRlclwiLCBpc1NhbWVQcm92aWRlcik7XHJcblxyXG4gICAgICAgIC8vc3dpdGNoaW5nIGJldHdlZW4gc3RyZWFtcyBvbiBITFMuIHd0aD8gaHR0cHM6Ly92aWRlby1kZXYuZ2l0aHViLmlvL2hscy5qcy9sYXRlc3QvZG9jcy9BUEkuaHRtbCNmaW5hbC1zdGVwLWRlc3Ryb3lpbmctc3dpdGNoaW5nLWJldHdlZW4tc3RyZWFtc1xyXG4gICAgICAgIGlmKCFpc1NhbWVQcm92aWRlciB8fCBjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpID09PSBQUk9WSURFUl9ITFMgfHwgY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKSA9PT0gUFJPVklERVJfREFTSCB8fCBjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpID09PSBQUk9WSURFUl9IVE1MNSl7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlayddKTtcclxuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFNvdXJjZUluZGV4O1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UXVhbGl0eUxldmVscygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgXCIsIHF1YWxpdHlJbmRleCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkocXVhbGl0eUluZGV4KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc0F1dG9RdWFsaXR5KClcIik7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5pc0F1dG9RdWFsaXR5KCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEF1dG9RdWFsaXR5KCkgXCIsIGlzQXV0byk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRBdXRvUXVhbGl0eShpc0F1dG8pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q2FwdGlvbkxpc3QoKSBcIiwgY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKSk7XHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRDYXB0aW9uKCkgXCIsIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpO1xyXG4gICAgfVxyXG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRDYXB0aW9uKCkgXCIsIGluZGV4KTtcclxuICAgICAgICBjYXB0aW9uTWFuYWdlci5zZXRDdXJyZW50Q2FwdGlvbihpbmRleCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+IHtcclxuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBhZGRDYXB0aW9uKCkgXCIpXHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmFkZENhcHRpb24odHJhY2spO1xyXG4gICAgfVxyXG4gICAgdGhhdC5yZW1vdmVDYXB0aW9uID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlQ2FwdGlvbigpIFwiLCBpbmRleClcclxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIucmVtb3ZlQ2FwdGlvbihpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEJ1ZmZlcigpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCkpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTdGF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc3RvcCA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHN0b3AoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnN0b3AoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIFwiKTtcclxuICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG4gICAgICAgIGlmKGNhcHRpb25NYW5hZ2VyKXtcclxuICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobWVkaWFNYW5hZ2VyKXtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoYXQudHJpZ2dlcihERVNUUk9ZKTtcclxuICAgICAgICB0aGF0Lm9mZigpO1xyXG5cclxuICAgICAgICBwcm92aWRlckNvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgICAgIHBsYXlsaXN0TWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcclxuICAgICAgICBsYXp5UXVldWUgPSBudWxsO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSAtIGxhenlRdWV1ZSwgY3VycmVudFByb3ZpZGVyLCBwcm92aWRlckNvbnRyb2xsZXIsIHBsYXlsaXN0TWFuYWdlciwgcGxheWVyQ29uZmlnLCBhcGkgZXZlbnQgZGVzdHJvZWQuIFwiKTtcclxuICAgICAgICBPdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllcih0aGF0LmdldENvbnRhaW5lcklkKCkpO1xyXG4gICAgICAgIGlmKE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpLmxlbmd0aCAgPT09IDApe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJPdmVuUGxheWVyU0RLLnBsYXllckxpc3RcIiwgIE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0VmVyc2lvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gXCJ2LlwiK3ZlcnNpb247XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcGk7XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwaVJ0bXBFeHBhbnNpb24gPSBmdW5jdGlvbihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBleHRlcm5hbENhbGxiYWNrQ3JlZXAgOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5uYW1lICYmIHJlc3VsdC5kYXRhKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsKHJlc3VsdC5uYW1lLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIFNZU1RFTV9URVhUXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGluaXRpYWxpemVzIHRoZSBpbnB1dCBvcHRpb25zLlxyXG4gKiBAcGFyYW0gICBvcHRpb25zXHJcbiAqXHJcbiAqICovXHJcbmNvbnN0IENvbmZpZ3VyYXRvciA9IGZ1bmN0aW9uKG9wdGlvbnMsIHByb3ZpZGVyKXtcclxuXHJcbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBtZWRpYUNvbnRhaW5lciA6IFwiXCIsXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFsyLCAxLjUsIDEsIDAuNSwgMC4yNV0sXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZTogMSxcclxuICAgICAgICAgICAgbXV0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZvbHVtZTogMTAwLFxyXG4gICAgICAgICAgICBsb29wIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnRyb2xzIDogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b1N0YXJ0IDogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9GYWxsYmFjazogdHJ1ZSxcclxuICAgICAgICAgICAgdGltZWNvZGUgOiB0cnVlLFxyXG4gICAgICAgICAgICBzb3VyY2VJbmRleCA6IDAsXHJcbiAgICAgICAgICAgIGJyb3dzZXIgOiBcIlwiLFxyXG4gICAgICAgICAgICBoaWRlUGxheWxpc3RJY29uIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJ0bXBCdWZmZXJUaW1lIDogMSxcclxuICAgICAgICAgICAgcnRtcEJ1ZmZlclRpbWVNYXggOiAzLFxyXG4gICAgICAgICAgICBhZENsaWVudCA6IFwiZ29vZ2xlaW1hXCIsXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm90b2NvbE9ubHkgOiBmYWxzZSxcclxuICAgICAgICAgICAgc3lzdGVtVGV4dCA6IG51bGwsXHJcbiAgICAgICAgICAgIGxhbmcgOiBcImVuXCIsXHJcbiAgICAgICAgICAgIGxvYWRpbmdSZXRyeUNvdW50OiAwLFxyXG4gICAgICAgICAgICBleHBhbmRGdWxsU2NyZWVuVUk6IGZhbHNlLFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuT3B0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICBzaG93QmlnUGxheUJ1dHRvbjogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlVmFsID0gdmFsLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIodmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2lkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHNlcmlhbGl6ZShvcHRpb25zW2tleV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlc2VyaWFsaXplKG9wdGlvbnMpO1xyXG4gICAgICAgIGxldCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgICAgICAgbGV0IHVzZXJDdXN0dW1TeXN0ZW1UZXh0ID0gW107XHJcbiAgICAgICAgaWYoY29uZmlnLnN5c3RlbVRleHQpe1xyXG4gICAgICAgICAgICB1c2VyQ3VzdHVtU3lzdGVtVGV4dCA9IF8uaXNBcnJheShjb25maWcuc3lzdGVtVGV4dCkgPyBjb25maWcuc3lzdGVtVGV4dCA6IFtjb25maWcuc3lzdGVtVGV4dF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdXNlckN1c3R1bVN5c3RlbVRleHQubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgaWYodXNlckN1c3R1bVN5c3RlbVRleHRbaV0ubGFuZyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFN5c3RlbVRleHQgPSBfLmZpbmRXaGVyZShTWVNURU1fVEVYVCAsIHtcImxhbmdcIjogdXNlckN1c3R1bVN5c3RlbVRleHRbaV0ubGFuZ30pO1xyXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudFN5c3RlbVRleHQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFsaWRhdGUgJiB1cGRhdGVcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRTeXN0ZW1UZXh0LCB1c2VyQ3VzdHVtU3lzdGVtVGV4dFtpXSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL2NyZWF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTeXN0ZW1UZXh0ID0gXy5maW5kV2hlcmUoU1lTVEVNX1RFWFQgLCB7XCJsYW5nXCI6IFwiZW5cIn0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTeXN0ZW1UZXh0LmxhbmcgPSB1c2VyQ3VzdHVtU3lzdGVtVGV4dFtpXS5sYW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIFNZU1RFTV9URVhULnB1c2goT2JqZWN0LmFzc2lnbih1c2VyQ3VzdHVtU3lzdGVtVGV4dFtpXSwgY3VycmVudFN5c3RlbVRleHQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25maWcuc3lzdGVtVGV4dCA9IF8uZmluZFdoZXJlKFNZU1RFTV9URVhUICwge1wibGFuZ1wiOiBjb25maWcubGFuZ30pO1xyXG5cclxuICAgICAgICBsZXQgcGxheWJhY2tSYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzO1xyXG5cclxuICAgICAgICBwbGF5YmFja1JhdGVzID0gcGxheWJhY2tSYXRlcy5maWx0ZXIocmF0ZSA9PiBfLmlzTnVtYmVyKHJhdGUpICYmIHJhdGUgPj0gMC4yNSAmJiByYXRlIDw9IDQpLm1hcChyYXRlID0+IE1hdGgucm91bmQocmF0ZSAqIDQpIC8gNCk7XHJcblxyXG4gICAgICAgIGlmIChwbGF5YmFja1JhdGVzLmluZGV4T2YoMSkgPCAwKSB7XHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXMucHVzaCgxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGxheWJhY2tSYXRlcy5zb3J0KCk7XHJcblxyXG4gICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGVzID0gcGxheWJhY2tSYXRlcztcclxuXHJcbiAgICAgICAgY29uZmlnLnJ0bXBCdWZmZXJUaW1lID0gY29uZmlnLnJ0bXBCdWZmZXJUaW1lID4gMTAgPyAxMCA6IGNvbmZpZy5ydG1wQnVmZmVyVGltZTtcclxuICAgICAgICBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXggPSBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXggPiA1MCA/IDUwIDogY29uZmlnLnJ0bXBCdWZmZXJUaW1lTWF4O1xyXG5cclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5wbGF5YmFja1JhdGVzLmluZGV4T2YoY29uZmlnLnBsYXliYWNrUmF0ZSkgPCAwKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGUgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29uZmlnUGxheWxpc3QgPSBjb25maWcucGxheWxpc3Q7XHJcbiAgICAgICAgaWYgKCFjb25maWdQbGF5bGlzdCkge1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSBfLnBpY2soY29uZmlnLCBbXHJcbiAgICAgICAgICAgICAgICAndGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyxcclxuICAgICAgICAgICAgICAgICdpbWFnZScsXHJcbiAgICAgICAgICAgICAgICAnZmlsZScsXHJcbiAgICAgICAgICAgICAgICAnc291cmNlcycsXHJcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcclxuICAgICAgICAgICAgICAgICdob3N0JyxcclxuICAgICAgICAgICAgICAgICdhcHBsaWNhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnc3RyZWFtJyxcclxuICAgICAgICAgICAgICAgICdhZFRhZ1VybCdcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBbIG9iaiBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0KSkge1xyXG4gICAgICAgICAgICBjb25maWcuZmVlZERhdGEgPSBjb25maWdQbGF5bGlzdDtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gY29uZmlnUGxheWxpc3QucGxheWxpc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxldGUgY29uZmlnLmR1cmF0aW9uO1xyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ29uZmlndXJhdG9yIGxvYWRlZC5cIiwgb3B0aW9ucyk7XHJcbiAgICBsZXQgc3BlYyA9IGNvbXBvc2VTb3VyY2VPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIC8vc3BlYy5pc0Z1bGxzY3JlZW4gPSBmYWxzZTsgLy9JRSAxMSBjYW4ndCBjaGVjayBjdXJyZW50IGZ1bGxzY3JlZW4gc3RhdGUuXHJcblxyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWM7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRBZENsaWVudCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5hZENsaWVudDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldENvbmZpZyA9IChjb25maWcsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgc3BlY1tjb25maWddID0gdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0Q29udGFpbmVyID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLm1lZGlhQ29udGFpbmVyO1xyXG4gICAgfTtcclxuICAgIC8qdGhhdC5pc0Z1bGxzY3JlZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNGdWxsc2NyZWVuO1xyXG4gICAgfVxyXG4gICAgdGhhdC5zZXRGdWxsc2NyZWVuID0gKGlzRnVsbHNjcmVlbikgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmlzRnVsbHNjcmVlbiA9IGlzRnVsbHNjcmVlbjtcclxuICAgIH0qL1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0oKT0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnBsYXliYWNrUmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9KHBsYXliYWNrUmF0ZSk9PntcclxuICAgICAgICBzcGVjLnBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTtcclxuICAgICAgICByZXR1cm4gcGxheWJhY2tSYXRlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMYWJlbCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGFiZWw7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRRdWFsaXR5TGFiZWwgPSAobmV3TGFiZWwpID0+IHtcclxuICAgICAgICBzcGVjLnF1YWxpdHlMYWJlbCA9IG5ld0xhYmVsO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzQ3VycmVudFByb3RvY29sT25seSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UHJvdG9jb2xPbmx5O1xyXG4gICAgfTtcclxuICAgIC8qdGhhdC5nZXRTb3VyY2VMYWJlbCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VMYWJlbDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFNvdXJjZUxhYmVsID0gKG5ld0xhYmVsKSA9PiB7XHJcbiAgICAgICAgc3BlYy5zb3VyY2VMYWJlbCA9IG5ld0xhYmVsO1xyXG4gICAgfTsqL1xyXG5cclxuICAgIHRoYXQuZ2V0U291cmNlSW5kZXggPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlSW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRTb3VyY2VJbmRleCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIHNwZWMuc291cmNlSW5kZXggPSBpbmRleDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9ICh0aW1lY29kZSkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMudGltZWNvZGUgIT09IHRpbWVjb2RlKXtcclxuICAgICAgICAgICAgc3BlYy50aW1lY29kZSA9IHRpbWVjb2RlO1xyXG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIHRpbWVjb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc1RpbWVjb2RlTW9kZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy50aW1lY29kZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFJ0bXBCdWZmZXJUaW1lID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnJ0bXBCdWZmZXJUaW1lO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UnRtcEJ1ZmZlclRpbWVNYXggPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucnRtcEJ1ZmZlclRpbWVNYXg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNNdXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMubXV0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnZvbHVtZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xyXG4gICAgICAgIHNwZWMudm9sdW1lID0gdm9sdW1lO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNMb29wID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMubG9vcDtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzQXV0b1N0YXJ0ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuYXV0b1N0YXJ0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNDb250cm9scyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLmNvbnRyb2xzO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZXMgPSgpPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWJhY2tSYXRlcztcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEJyb3dzZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuYnJvd3NlcjtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN5c3RlbVRleHQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc3lzdGVtVGV4dDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldExhbmd1YWdlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmxhbmc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSgpPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0KT0+e1xyXG4gICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdCkpe1xyXG4gICAgICAgICAgICBzcGVjLnBsYXlsaXN0ID0gcGxheWxpc3Q7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNwZWMucGxheWxpc3QgPSBbcGxheWxpc3RdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWd1cmF0b3I7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMy4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cclxuICogQHBhcmFtICAgb2JqZWN0ICAgIEFuIG9iamVjdCB0aGF0IHJlcXVpcmVzIGN1c3RvbSBldmVudHMuXHJcbiAqXHJcbiAqICovXHJcblxyXG5jb25zdCBFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbihvYmplY3Qpe1xyXG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XHJcbiAgICBsZXQgX2V2ZW50cyA9W107XHJcblxyXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBldmVudHMubGVuZ3RoO1xyXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGxldCBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgZXZlbnQubGlzdGVuZXIuYXBwbHkoICggZXZlbnQuY29udGV4dCB8fCBjb250ZXh0ICksIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcclxuICAgICAgICAoX2V2ZW50c1tuYW1lXSB8fCAoX2V2ZW50c1tuYW1lXT1bXSkgKS5wdXNoKHsgbGlzdGVuZXI6IGxpc3RlbmVyICAsIGNvbnRleHQgOiBjb250ZXh0fSk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgaWYoIV9ldmVudHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcclxuICAgICAgICBjb25zdCBhbGxFdmVudHMgPSBfZXZlbnRzLmFsbDtcclxuXHJcbiAgICAgICAgaWYoZXZlbnRzKXtcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MsIHRoYXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhbGxFdmVudHMpe1xyXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzLCB0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XHJcbiAgICAgICAgaWYoIV9ldmVudHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xyXG4gICAgICAgICAgICBfZXZlbnRzID0gW107XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXMoX2V2ZW50cyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmV0YWluID0gX2V2ZW50c1tuYW1lXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyICB8fCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIubGlzdGVuZXIgICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5fbGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2ZW50LmNvbnRleHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9ldmVudHNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5vbmNlID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgY29uc3Qgb25jZUNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5vZmYobmFtZSwgb25jZUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9uY2VDYWxsYmFjay5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICByZXR1cm4gdGhhdC5vbihuYW1lLCBvbmNlQ2FsbGJhY2ssIGNvbnRleHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnRFbWl0dGVyO1xyXG4iLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXHJcbiAqIEBwYXJhbSAgIGluc3RhbmNlXHJcbiAqIEBwYXJhbSAgIHF1ZXVlZENvbW1hbmRzXHJcbiAqICovXHJcbmNvbnN0IExhenlDb21tYW5kRXhlY3V0b3IgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIHF1ZXVlZENvbW1hbmRzKSB7XHJcbiAgICBsZXQgY29tbWFuZFF1ZXVlID0gW107XHJcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XHJcbiAgICBsZXQgZXhlY3V0ZU1vZGUgPSBmYWxzZTtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XHJcbiAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gaW5zdGFuY2VbY29tbWFuZF07XHJcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcclxuXHJcbiAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XHJcbiAgICAgICAgICAgICAgaWYgKCFleGVjdXRlTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgLy9jb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2QuYXBwbHkodGhhdCwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdoaWxlIChjb21tYW5kUXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGNvbW1hbmQsIGFyZ3MgfSA9IGNvbW1hbmRRdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuc2V0RXhlY3V0ZU1vZGUgPSAobW9kZSkgPT4ge1xyXG4gICAgICAgIGV4ZWN1dGVNb2RlID0gbW9kZTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFVuZGVjb3JhdGVkTWV0aG9kcyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVjb3JhdGVkTWV0aG9kcztcclxuICAgIH1cclxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRRdWV1ZSgpXCIsIGdldFF1ZXVlKTtcclxuICAgICAgICByZXR1cm4gY29tbWFuZFF1ZXVlO1xyXG4gICAgfVxyXG4gICAgdGhhdC5hZGRRdWV1ZSA9IGZ1bmN0aW9uKGNvbW1hbmQsIGFyZ3Mpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBhZGRRdWV1ZSgpXCIsIGNvbW1hbmQsIGFyZ3MpO1xyXG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZmx1c2goKVwiKTtcclxuICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmVtcHR5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGVtcHR5KClcIik7XHJcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XHJcbiAgICAgICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XHJcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRdID0gbWV0aG9kO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy9SdW4gb25jZSBhdCB0aGUgZW5kXHJcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XHJcbiAgICAgICAgbGV0IGNvbW1hbmRRdWV1ZUl0ZW0gPSBfLmZpbmRXaGVyZShjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogcmVtb3ZlQW5kRXhjdXRlT25jZSgpXCIsIGNvbW1hbmRfKTtcclxuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcclxuICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInJlbW92ZUNvbW1hbmQoKVwiKTtcclxuICAgICAgICAgICAgaWYoY29tbWFuZFF1ZXVlSXRlbSl7XHJcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kX10gPSBtZXRob2Q7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGRlc3Ryb3koKVwiKTtcclxuICAgICAgICB0aGF0Lm9mZigpO1xyXG4gICAgICAgIHRoYXQuZW1wdHkoKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCwgaXNIbHN9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHthbmFsVXNlckFnZW50fSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBmaW5kcyB0aGUgcHJvdmlkZXIgdGhhdCBtYXRjaGVzIHRoZSBpbnB1dCBzb3VyY2UuXHJcbiAqIEBwYXJhbVxyXG4gKiAqL1xyXG5cclxuY29uc3QgU3VwcG9ydENoZWNrZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgbG9hZGVkLlwiKTtcclxuICAgIGxldCB1c2VyQWdlbnRPYmplY3QgPSBhbmFsVXNlckFnZW50KCk7XHJcblxyXG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnaHRtbDUnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IE1pbWVUeXBlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhYWM6ICdhdWRpby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZjR2OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtNHY6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbXAzOiAnYXVkaW8vbXBlZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbXBlZzogJ2F1ZGlvL21wZWcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2dnOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ2E6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgd2VibTogJ3ZpZGVvL3dlYm0nLFxyXG4gICAgICAgICAgICAgICAgICAgIGY0YTogJ3ZpZGVvL2FhYycsXHJcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcclxuICAgICAgICAgICAgICAgICAgICBtM3U6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGxzOiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCF0eXBlKXtyZXR1cm4gZmFsc2U7fVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWltZVR5cGUgPSBzb3VyY2UubWltZVR5cGUgfHwgTWltZVR5cGVzW3R5cGVdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzSGxzKGZpbGUsIHR5cGUpICYmIHVzZXJBZ2VudE9iamVjdC5icm93c2VyID09PSBcIk1pY3Jvc29mdCBFZGdlXCIgKXtcclxuICAgICAgICAgICAgICAgICAgICAvL0VkZ2Ugc3VwcG9ydHMgaGxzIG5hdGl2ZSBidXQgdGhhdCdzIHN1Y2tzLlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFtaW1lVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISF2aWRlby5jYW5QbGF5VHlwZShtaW1lVHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3dlYnJ0YycsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdkYXNoJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mICggd2luZG93Lk1lZGlhU291cmNlIHx8IHdpbmRvdy5XZWJLaXRNZWRpYVNvdXJjZSApID09PSBcImZ1bmN0aW9uXCIgJiYgaXNEYXNoKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2hscycsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vdGhpcyBtZXRob2QgZnJvbSBobHMuanNcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzSGxzU3VwcG9ydCA9ICgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRNZWRpYVNvdXJjZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Lk1lZGlhU291cmNlIHx8IHdpbmRvdy5XZWJLaXRNZWRpYVNvdXJjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVkaWFTb3VyY2UgPSBnZXRNZWRpYVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXIgPSB3aW5kb3cuU291cmNlQnVmZmVyIHx8IHdpbmRvdy5XZWJLaXRTb3VyY2VCdWZmZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzVHlwZVN1cHBvcnRlZCA9IG1lZGlhU291cmNlICYmIHR5cGVvZiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQgPT09ICdmdW5jdGlvbicgJiYgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFLG1wNGEuNDAuMlwiJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIFNvdXJjZUJ1ZmZlciBpcyBleHBvc2VkIGVuc3VyZSBpdHMgQVBJIGlzIHZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2FmYXJpIGFuZCBvbGQgdmVyc2lvbiBvZiBDaHJvbWUgZG9lIG5vdCBleHBvc2UgU291cmNlQnVmZmVyIGdsb2JhbGx5IHNvIGNoZWNraW5nIFNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgaXMgaW1wb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXJWYWxpZEFQSSA9ICFzb3VyY2VCdWZmZXIgfHwgc291cmNlQnVmZmVyLnByb3RvdHlwZSAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5hcHBlbmRCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUucmVtb3ZlID09PSAnZnVuY3Rpb24nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWlzVHlwZVN1cHBvcnRlZCAmJiAhIXNvdXJjZUJ1ZmZlclZhbGlkQVBJO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIHRoaXMgJyEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyknIGlmIHlvdSB3YW50IHRvIHVzZSBobHNqcy5cclxuICAgICAgICAgICAgICAgIC8vWWVzIEkgbmVlZCBobHNqcy4gMjAxOS0wNi0xMiAmJiAhIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSGxzU3VwcG9ydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdydG1wJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0ZXN0Rmxhc2goKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdXBwb3J0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vSUUgb25seVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKFwiQWN0aXZlWE9iamVjdFwiIGluIHdpbmRvdykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9ICEhKG5ldyBBY3RpdmVYT2JqZWN0KFwiU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2hcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVzNDLCBiZXR0ZXIgc3VwcG9ydCBpbiBsZWdhY3kgYnJvd3NlclxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ID0gISFuYXZpZ2F0b3IubWltZVR5cGVzWydhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCddO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0O1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrU3VwcG9ydCgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHVzZXJBZ2VudE9iamVjdC5icm93c2VyID09PSBcIk1pY3Jvc29mdCBFZGdlXCIgfHwgdXNlckFnZW50T2JqZWN0Lm9zID09PSBcIkFuZHJvaWRcIiB8fCB1c2VyQWdlbnRPYmplY3Qub3MgPT09IFwiaU9TXCIgIHx8IHVzZXJBZ2VudE9iamVjdC5icm93c2VyID09PSBcIlNhZmFyaVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpICYmIHRlc3RGbGFzaCgpICYmIGNoZWNrU3VwcG9ydCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBdO1xyXG5cclxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlID0gKHNvcnVjZV8pID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSgpXCIsIHNvcnVjZV8pO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IChzb3J1Y2VfID09PSBPYmplY3Qoc29ydWNlXykpID8gc29ydWNlXyA6IHt9O1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdXBwb3J0TGlzdC5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBpZihzdXBwb3J0TGlzdFtpXS5jaGVja1N1cHBvcnQoc291cmNlKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydExpc3RbaV0ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCA9IChwbGF5bGlzdEl0ZW0pID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCgpXCIsIHBsYXlsaXN0SXRlbSk7XHJcbiAgICAgICAgbGV0IHN1cHBvcnROYW1lcyA9IFtdO1xyXG4gICAgICAgIC8qZm9yIChsZXQgaSA9IHBsYXlsaXN0Xy5sZW5ndGg7IGktLTspIHtcclxuXHJcblxyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwbGF5bGlzdEl0ZW07XHJcblxyXG4gICAgICAgIGlmKGl0ZW0gJiYgaXRlbS5zb3VyY2VzKXtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGl0ZW0uc291cmNlcy5sZW5ndGg7IGogKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IGl0ZW0uc291cmNlc1tqXTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TmFtZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN1cHBvcnRDaGVja2VyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDQuLlxyXG4gKi9cclxuaW1wb3J0IFNydFBhcnNlciBmcm9tIFwiYXBpL2NhcHRpb24vcGFyc2VyL1NydFBhcnNlclwiO1xyXG5pbXBvcnQgVlRUQ3VlIGZyb20gXCJ1dGlscy9jYXB0aW9ucy92dHRDdWVcIjtcclxuLy9pbXBvcnQgUmVxdWVzdCBmcm9tIFwidXRpbHMvZG93bmxvYWRlclwiO1xyXG5cclxuY29uc3QgTG9hZGVyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuXHJcbiAgICBjb25zdCBjb252ZXJ0VG9WVFRDdWVzID0gZnVuY3Rpb24gKGN1ZXMpIHtcclxuICAgICAgICByZXR1cm4gY3Vlcy5tYXAoY3VlID0+IG5ldyBWVFRDdWUoY3VlLnN0YXJ0LCBjdWUuZW5kLCBjdWUudGV4dCkpO1xyXG4gICAgfVxyXG4gICAgLy9sYW5ndWFnZSA6IGZvciBTTUkgZm9ybWF0LlxyXG4gICAgdGhhdC5sb2FkID0gKHRyYWNrLCBsYW5ndWFnZSwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSA9PiB7XHJcblxyXG4gICAgICAgIHZhciByZXF1ZXN0T3B0aW9ucyAgPSB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsIDogdHJhY2suZmlsZSxcclxuICAgICAgICAgICAgZW5jb2Rpbmc6IG51bGxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsb2FkUmVxdWVzdERvd25sb2RlcigpLnRoZW4oUmVxdWVzdCA9PiB7XHJcbiAgICAgICAgICAgIFJlcXVlc3QocmVxdWVzdE9wdGlvbnMsIGZ1bmN0aW9uKGVycm9yLCByZXNwb25zZSwgYm9keSkge1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdnR0Q3VlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9keS5pbmRleE9mKCdXRUJWVFQnKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlZUVCBMT0FERURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRWdHRQYXJzZXIoKS50aGVuKFdlYlZUVCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VyID0gbmV3IFdlYlZUVC5QYXJzZXIod2luZG93LCBXZWJWVFQuU3RyaW5nRGVjb2RlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5vbmN1ZSA9IGZ1bmN0aW9uKGN1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMucHVzaChjdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5vbmZsdXNoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZSBjYWxscyBvbmZsdXNoIGludGVybmFsbHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5wYXJzZShib2R5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGJvZHkuaW5kZXhPZignU0FNSScpID49IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTQU1JIExPQURFRFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFNtaVBhcnNlcigpLnRoZW4oU21pUGFyc2VyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZWREYXRhID0gU21pUGFyc2VyKGJvZHksIHtmaXhlZExhbmcgOiBsYW5ndWFnZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IGNvbnZlcnRUb1ZUVEN1ZXMocGFyc2VkRGF0YS5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKHZ0dEN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU1JUIExPQURFRFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VlcyA9IFNydFBhcnNlcihib2R5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IGNvbnZlcnRUb1ZUVEN1ZXMoY3Vlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcclxuICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5mdW5jdGlvbiBsb2FkUmVxdWVzdERvd25sb2Rlcigpe1xyXG4gICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsndXRpbHMvZG93bmxvYWRlciddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgIHJldHVybiByZXF1aXJlKCd1dGlscy9kb3dubG9hZGVyJykuZGVmYXVsdDtcclxuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAnZG93bmxvYWRlcicpO1xyXG59O1xyXG5mdW5jdGlvbiBsb2FkVnR0UGFyc2VyKCkge1xyXG4gICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlciddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgIHJldHVybiByZXF1aXJlKCdhcGkvY2FwdGlvbi9wYXJzZXIvVnR0UGFyc2VyJykuZGVmYXVsdDtcclxuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAndnR0cGFyc2VyJyk7XHJcbn1cclxuZnVuY3Rpb24gbG9hZFNtaVBhcnNlcigpIHtcclxuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9jYXB0aW9uL3BhcnNlci9TbWlQYXJzZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZSgnYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlcicpLmRlZmF1bHQ7XHJcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ3NtaXBhcnNlcicpO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IExvYWRlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAxNy4uXHJcbiAqL1xyXG5pbXBvcnQgQ2FwdGlvbkxvYWRlciBmcm9tICdhcGkvY2FwdGlvbi9Mb2FkZXInO1xyXG5pbXBvcnQge1JFQURZLCBFUlJPUlMsIEVSUk9SLCBQTEFZRVJfQ0FQVElPTl9FUlJPUiwgQ09OVEVOVF9NRVRBLCBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUR9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG5jb25zdCBpc1N1cHBvcnQgPSBmdW5jdGlvbihraW5kKXtcclxuICAgIHJldHVybiBraW5kID09PSAnc3VidGl0bGVzJyB8fCBraW5kID09PSAnY2FwdGlvbnMnO1xyXG59O1xyXG5cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGFwaSwgcGxheWxpc3RJbmRleCl7XHJcblxyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGNhcHRpb25MaXN0ID0gW107XHJcbiAgICBsZXQgY3VycmVudENhcHRpb25JbmRleCA9IC0xO1xyXG5cclxuICAgIGxldCBjYXB0aW9uTG9hZGVyID0gQ2FwdGlvbkxvYWRlcigpO1xyXG4gICAgbGV0IGlzRmlzcnRMb2FkID0gdHJ1ZTtcclxuICAgIGxldCBpc1Nob3dpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDYXB0aW9uIE1hbmFnZXIgPj4gXCIsIHBsYXlsaXN0SW5kZXgpO1xyXG5cclxuXHJcbiAgICBsZXQgYmluZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHZ0dEN1ZXMpe1xyXG4gICAgICAgIHRyYWNrLmRhdGEgPSB2dHRDdWVzIHx8IFtdO1xyXG4gICAgICAgIHRyYWNrLm5hbWUgPSB0cmFjay5sYWJlbCB8fCB0cmFjay5uYW1lIHx8IHRyYWNrLmxhbmd1YWdlO1xyXG4gICAgICAgIHRyYWNrLmlkID0gKGZ1bmN0aW9uKHRyYWNrLCB0cmFja3NDb3VudCkge1xyXG4gICAgICAgICAgICB2YXIgdHJhY2tJZDtcclxuICAgICAgICAgICAgdmFyIHByZWZpeCA9IHRyYWNrLmtpbmQgfHwgJ2NjJztcclxuICAgICAgICAgICAgaWYgKHRyYWNrLmRlZmF1bHQgfHwgdHJhY2suZGVmYXVsdHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFja0lkID0gJ2RlZmF1bHQnO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrSWQgPSB0cmFjay5pZCB8fCAocHJlZml4ICsgdHJhY2tzQ291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGlzRmlzcnRMb2FkKXtcclxuICAgICAgICAgICAgICAgIC8vVGhpcyBleGVjdXRlIG9ubHkgb24uIGFuZCB0aGVuIHVzZSBmbHVzaENhcHRpb25MaXN0KGxhc3RDYXB0aW9uSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24oY2FwdGlvbkxpc3QubGVuZ3RofHwwKTtcclxuICAgICAgICAgICAgICAgIGlzRmlzcnRMb2FkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFja0lkO1xyXG4gICAgICAgIH0pKHRyYWNrLCBjYXB0aW9uTGlzdC5sZW5ndGgpO1xyXG5cclxuICAgICAgICBjYXB0aW9uTGlzdC5wdXNoKHRyYWNrKTtcclxuICAgICAgICByZXR1cm4gdHJhY2suaWQ7XHJcbiAgICB9O1xyXG4gICAgbGV0IGNoYW5nZUN1cnJlbnRDYXB0aW9uID0gZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIGN1cnJlbnRDYXB0aW9uSW5kZXggPSBpbmRleDtcclxuICAgICAgICBhcGkudHJpZ2dlcihDT05URU5UX0NBUFRJT05fQ0hBTkdFRCwgY3VycmVudENhcHRpb25JbmRleCk7XHJcbiAgICB9O1xyXG4gICAgaWYoYXBpLmdldENvbmZpZygpLnBsYXlsaXN0ICYmIGFwaS5nZXRDb25maWcoKS5wbGF5bGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICBsZXQgcGxheWxpc3QgPSBhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3RbcGxheWxpc3RJbmRleF07XHJcblxyXG4gICAgICAgIGlmKHBsYXlsaXN0ICYmIHBsYXlsaXN0LnRyYWNrcyAmJiBwbGF5bGlzdC50cmFja3MubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5bGlzdC50cmFja3MubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrID0gcGxheWxpc3QudHJhY2tzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzU3VwcG9ydCh0cmFjay5raW5kKSAmJiAhIF8uZmluZFdoZXJlKHRyYWNrLCB7ZmlsZSA6IHRyYWNrLmZpbGV9KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmZsdXNoQ2FwdGlvbkxpc3QoY3VycmVudENhcHRpb25JbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbkxvYWRlci5sb2FkKHRyYWNrLCB0cmFjay5sYW5nLCBmdW5jdGlvbih2dHRDdWVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodnR0Q3VlcyAmJiB2dHRDdWVzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhcHRpb25JZCA9IGJpbmRUcmFjayh0cmFjaywgdnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX0NBUFRJT05fRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwaS5vbihDT05URU5UX1RJTUUsIGZ1bmN0aW9uKG1ldGEpe1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IG1ldGEucG9zaXRpb247XHJcbiAgICAgICAgaWYoY3VycmVudENhcHRpb25JbmRleCA+IC0xICYmIGNhcHRpb25MaXN0W2N1cnJlbnRDYXB0aW9uSW5kZXhdKXtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRDdWVzID0gXy5maWx0ZXIoY2FwdGlvbkxpc3RbY3VycmVudENhcHRpb25JbmRleF0uZGF0YSwgZnVuY3Rpb24gKGN1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uID49IChjdWUuc3RhcnRUaW1lKSAmJiAoICghY3VlLmVuZFRpbWUgfHwgcG9zaXRpb24pIDw9IGN1ZS5lbmRUaW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRDdWVzICYmIGN1cnJlbnRDdWVzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBjdXJyZW50Q3Vlc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbiAgICB0aGF0LmZsdXNoQ2FwdGlvbkxpc3QgPSAobGFzdENhcHRpb25JbmRleCkgPT57XHJcbiAgICAgICAgY2FwdGlvbkxpc3QgPSBbXTtcclxuICAgICAgICBjaGFuZ2VDdXJyZW50Q2FwdGlvbihsYXN0Q2FwdGlvbkluZGV4KTtcclxuICAgICAgICAvL2N1cnJlbnRDYXB0aW9uSW5kZXggPSBsYXN0Q2FwdGlvbkluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gY2FwdGlvbkxpc3R8fFtdO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudENhcHRpb24gPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gY3VycmVudENhcHRpb25JbmRleDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRDYXB0aW9uID0gKF9pbmRleCkgPT57XHJcbiAgICAgICAgaWYoX2luZGV4ID4gLTIgJiYgX2luZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24oX2luZGV4KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT57XHJcbiAgICAgICAgaWYoaXNTdXBwb3J0KHRyYWNrLmtpbmQpICYmICEgXy5maW5kV2hlcmUoY2FwdGlvbkxvYWRlciwge2ZpbGUgOiB0cmFjay5maWxlfSkpe1xyXG4gICAgICAgICAgICBjYXB0aW9uTG9hZGVyLmxvYWQodHJhY2ssIGZ1bmN0aW9uKHZ0dEN1ZXMpe1xyXG4gICAgICAgICAgICAgICAgaWYodnR0Q3VlcyAmJiB2dHRDdWVzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmRUcmFjayh0cmFjaywgdnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBlcnJvcnNbUExBWUVSX0NBUFRJT05fRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICBhcGkudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQucmVtb3ZlQ2FwdGlvbiA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKGluZGV4ID4gLTEgJiYgaW5kZXggPCBjYXB0aW9uTGlzdC5sZW5ndGgpe1xyXG4gICAgICAgICAgICBjYXB0aW9uTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FwdGlvbkxpc3Q7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICAgICAgY2FwdGlvbkxpc3QgPSBbXTtcclxuICAgICAgICBjYXB0aW9uTG9hZGVyID0gbnVsbDtcclxuICAgICAgICBhcGkub2ZmKENPTlRFTlRfVElNRSwgbnVsbCwgdGhhdCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAyOS4uXHJcbiAqL1xyXG5pbXBvcnQgeyBobXNUb1NlY29uZCwgdHJpbSB9IGZyb20gXCJ1dGlscy9zdHJpbmdzXCJcclxuXHJcbmZ1bmN0aW9uIF9lbnRyeShkYXRhKSB7XHJcbiAgICB2YXIgZW50cnkgPSB7fTtcclxuICAgIHZhciBhcnJheSA9IGRhdGEuc3BsaXQoJ1xcclxcbicpO1xyXG4gICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIGFycmF5ID0gZGF0YS5zcGxpdCgnXFxuJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgaWR4ID0gMTtcclxuICAgIGlmIChhcnJheVswXS5pbmRleE9mKCcgLS0+ICcpID4gMCkge1xyXG4gICAgICAgIGlkeCA9IDA7XHJcbiAgICB9XHJcbiAgICBpZiAoYXJyYXkubGVuZ3RoID4gaWR4ICsgMSAmJiBhcnJheVtpZHggKyAxXSkge1xyXG4gICAgICAgIC8vIFRoaXMgbGluZSBjb250YWlucyB0aGUgc3RhcnQgYW5kIGVuZC5cclxuICAgICAgICB2YXIgbGluZSA9IGFycmF5W2lkeF07XHJcbiAgICAgICAgdmFyIGluZGV4ID0gbGluZS5pbmRleE9mKCcgLS0+ICcpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcclxuICAgICAgICAgICAgZW50cnkuc3RhcnQgPSBobXNUb1NlY29uZChsaW5lLnN1YnN0cigwLCBpbmRleCkpO1xyXG4gICAgICAgICAgICBlbnRyeS5lbmQgPSBobXNUb1NlY29uZChsaW5lLnN1YnN0cihpbmRleCArIDUpKTtcclxuICAgICAgICAgICAgZW50cnkudGV4dCA9IGFycmF5LnNsaWNlKGlkeCArIDEpLmpvaW4oJ1xcclxcbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBlbnRyeTtcclxuXHJcbn1cclxuXHJcbmNvbnN0IFNydFBhcnNlciA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIHZhciBjYXB0aW9ucyA9IFtdO1xyXG5cclxuICAgIGRhdGEgPSB0cmltKGRhdGEpO1xyXG5cclxuICAgIHZhciBsaXN0ID0gZGF0YS5zcGxpdCgnXFxyXFxuXFxyXFxuJyk7XHJcbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBsaXN0ID0gZGF0YS5zcGxpdCgnXFxuXFxuJyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAobGlzdFtpXSA9PT0gJ1dFQlZUVCcpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBlbnRyeSA9IF9lbnRyeShsaXN0W2ldKTtcclxuICAgICAgICBpZiAoZW50cnkudGV4dCkge1xyXG4gICAgICAgICAgICBjYXB0aW9ucy5wdXNoKGVudHJ5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNhcHRpb25zO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNydFBhcnNlcjsiLCIvLyBTVEFURVxyXG5leHBvcnQgY29uc3QgU1RBVEVfQlVGRkVSSU5HID0gXCJidWZmZXJpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0lETEUgPSBcImlkbGVcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0NPTVBMRVRFID0gXCJjb21wbGV0ZVwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfUEFVU0VEID0gXCJwYXVzZWRcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1BMQVlJTkcgPSBcInBsYXlpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0VSUk9SID0gXCJlcnJvclwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfTE9BRElORyA9IFwibG9hZGluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfU1RBTExFRCA9IFwic3RhbGxlZFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0xPQURJTkcgPSBcImFkTG9hZGluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQURfTE9BREVEID0gXCJhZExvYWRlZFwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQURfUExBWUlORyA9IFwiYWRQbGF5aW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9QQVVTRUQgPSBcImFkUGF1c2VkXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9DT01QTEVURSA9IFwiYWRDb21wbGV0ZVwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQURfRVJST1IgPSBcImFkRXJyb3JcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9BRF9DTElDSyA9IFwiYWRjbGlja1wiO1xyXG5cclxuLy8gUFJPVklERVJcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hUTUw1ID0gXCJodG1sNVwiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfV0VCUlRDID0gXCJ3ZWJydGNcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0RBU0ggPSBcImRhc2hcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hMUyA9IFwiaGxzXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9SVE1QID0gXCJydG1wXCI7XHJcblxyXG4vLyBFVkVOVFNcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcclxuZXhwb3J0IGNvbnN0IFJFQURZID0gXCJyZWFkeVwiO1xyXG5leHBvcnQgY29uc3QgREVTVFJPWSA9IFwiZGVzdHJveVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLID0gXCJzZWVrXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gXCJidWZmZXJGdWxsXCI7XHJcbmV4cG9ydCBjb25zdCBESVNQTEFZX0NMSUNLID0gXCJkaXNwbGF5Q2xpY2tcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTE9BREVEID0gXCJsb2FkZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlMSVNUX0NIQU5HRUQgPSBcInBsYXlsaXN0Q2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLRUQgPSBcInNlZWtlZFwiO1xyXG5leHBvcnQgY29uc3QgQUxMX1BMQVlMSVNUX0VOREVEID0gXCJhbGxQbGF5bGlzdEVuZGVkXCI7XHJcbmV4cG9ydCBjb25zdCBORVRXT1JLX1VOU1RBQkxFRCA9IFwidW5zdGFibGVOZXR3b3JrXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBFUlJPUiA9IFwiZXJyb3JcIjtcclxuXHJcbi8vIFNUQVRFIE9GIFBMQVlFUlxyXG5leHBvcnQgY29uc3QgUExBWUVSX1NUQVRFID0gXCJzdGF0ZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1BBVVNFID0gXCJwYXVzZVwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1BMQVkgPSBcInBsYXlcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ0xJQ0tFRCA9IFwiY2xpY2tlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1JFU0laRUQgPSBcInJlc2l6ZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9MT0FESU5HID0gXCJsb2FkaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfRlVMTFNDUkVFTl9SRVFVRVNUID0gXCJmdWxsc2NyZWVuUmVxdWVzdGVkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfRlVMTFNDUkVFTl9DSEFOR0VEID0gXCJmdWxsc2NyZWVuQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dBUk5JTkcgPSBcIndhcm5pbmdcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBBRF9DSEFOR0VEID0gXCJhZENoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IEFEX1RJTUUgPSBcImFkVGltZVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVIgPSBcImJ1ZmZlckNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRSA9IFwidGltZVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9SQVRFX0NIQU5HRSA9IFwicmF0ZWNoYW5nZVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9WT0xVTUUgPSBcInZvbHVtZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTVVURSA9IFwibXV0ZVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9NRVRBID0gXCJtZXRhQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCA9IFwic291cmNlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9MRVZFTF9DSEFOR0VEID0gXCJxdWFsaXR5TGV2ZWxDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZQkFDS19SQVRFX0NIQU5HRUQgPSBcInBsYXliYWNrUmF0ZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCA9IFwiY3VlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQgPSBcImNhcHRpb25DaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VEID0gXCJ0aW1lRGlzcGxheU1vZGVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBPTUVfUDJQX01PREUgPSBcInAycE1vZGVcIjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgQURfQ0xJRU5UX0dPT0dMRUlNQSA9IFwiZ29vZ2xlaW1hXCI7XHJcbmV4cG9ydCBjb25zdCBBRF9DTElFTlRfVkFTVCA9IFwidmFzdFwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBJTklUX1VOS05XT05fRVJST1IgPSAxMDA7XHJcbmV4cG9ydCBjb25zdCBJTklUX1VOU1VQUE9SVF9FUlJPUiA9IDEwMTtcclxuZXhwb3J0IGNvbnN0IElOSVRfUlRNUF9TRVRVUF9FUlJPUiA9IDEwMjtcclxuZXhwb3J0IGNvbnN0IElOSVRfREFTSF9VTlNVUFBPUlQgPSAxMDM7XHJcbmV4cG9ydCBjb25zdCBJTklUX0FEU19FUlJPUiA9IDEwNDtcclxuZXhwb3J0IGNvbnN0IElOSVRfREFTSF9OT1RGT1VORCA9IDEwNTtcclxuZXhwb3J0IGNvbnN0IElOSVRfSExTSlNfTk9URk9VTkQgPSAxMDY7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9FUlJPUiA9IDMwMDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiA9IDMwMTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IgPSAzMDI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IgPSAzMDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfRklMRV9FUlJPUiA9IDMwNDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DQVBUSU9OX0VSUk9SID0gMzA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SID0gMzA2O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0FVVEhfRkFJTEVEX0VSUk9SID0gMzA3O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SID0gMzA4O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19XU19FUlJPUiA9IDUwMTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiA9IDUwMjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SID0gNTAzO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SID0gNTA0O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiA9IDUwNTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XID0gNTEwO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QgPSA1MTE7XHJcblxyXG5leHBvcnQgY29uc3QgV0FSTl9NU0dfTVVURURQTEFZID0gXCJQbGVhc2UgdG91Y2ggaGVyZSB0byB0dXJuIG9uIHRoZSBzb3VuZC5cIjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgVUlfSUNPTlMgPSB7XHJcbiAgICB2b2x1bWVfbXV0ZSA6IFwidm9sdW1lLW11dGVcIixcclxuICAgIG9wX3dhcm5pbmcgOiBcIm9wLXdhcm5pbmdcIlxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBFUlJPUlMgPSB7Y29kZXMgOiBcIlwifTtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgU1lTVEVNX1RFWFQgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgXCJsYW5nXCIgOiBcImVuXCIsXHJcbiAgICAgICAgXCJ1aVwiIDoge1xyXG4gICAgICAgICAgICBcImNvbnRleHRcIiA6IFwiQWJvdXQgT3ZlblBsYXllclwiLFxyXG4gICAgICAgICAgICBcImNvbnRyb2xzXCIgOiB7XHJcbiAgICAgICAgICAgICAgICBcImxpdmVcIiA6IFwibGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb3dfbGF0ZW5jeV9saXZlXCIgOiBcIlN1Yi1TZWNvbmQgTGF0ZW5jeSBTdHJlYW1pbmdcIixcclxuICAgICAgICAgICAgICAgIFwibG93X2xhdGVuY3lfcDJwXCIgOiBcIlN1Yi1TZWNvbmQgTGF0ZW5jeSBQMlBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwbGF5bGlzdFwiIDogXCJQbGF5bGlzdFwiLFxyXG4gICAgICAgICAgICBcInNldHRpbmdcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwidGl0bGVcIiA6IFwiU2V0dGluZ3NcIixcclxuICAgICAgICAgICAgICAgIFwic3BlZWRcIiA6IFwiU3BlZWRcIixcclxuICAgICAgICAgICAgICAgIFwic3BlZWRVbml0XCIgOiBcInhcIixcclxuICAgICAgICAgICAgICAgIFwic291cmNlXCIgOiBcIlNvdXJjZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFsaXR5XCIgOiBcIlF1YWxpdHlcIixcclxuICAgICAgICAgICAgICAgIFwiY2FwdGlvblwiIDogXCJDYXB0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc3BsYXlcIiA6IFwiRGlzcGxheVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYXBpXCIgOiB7XHJcbiAgICAgICAgICAgIFwibWVzc2FnZVwiIDoge1xyXG4gICAgICAgICAgICAgICAgXCJtdXRlZF9wbGF5XCIgOiBcIlBsZWFzZSB0b3VjaCBoZXJlIHRvIHR1cm4gb24gdGhlIHNvdW5kLlwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZXJyb3JcIjoge1xyXG4gICAgICAgICAgICAgICAgMTAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHBsYXlhYmxlIG1lZGlhIG5vdCBmb3VuZC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gcGxheWFibGUgbWVkaWEgbm90IGZvdW5kLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJGbGFzaCBmZXRjaGluZyBwcm9jZXNzIGFib3J0ZWQuIDwvYnI+PGEgaHJlZj0naHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXInIHRhcmdldD0nX3NlbGYnPjxpbWcgc3JjPSdodHRwOi8vd3d3LmFkb2JlLmNvbS9pbWFnZXMvc2hhcmVkL2Rvd25sb2FkX2J1dHRvbnMvZ2V0X2ZsYXNoX3BsYXllci5naWYnIGFsdD0nR2V0IEFkb2JlIEZsYXNoIHBsYXllcic+PC9hPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiSXQgbG9va3MgbGlrZSBub3QgZm91bmQgc3dmIG9yIHlvdXIgZW52aXJvbm1lbnQgaXMgbG9jYWxob3N0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIGRhc2hqcy4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0IHZlcnNpb24uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJkYXNoLmpzIHZlcnNpb24gaXMgb2xkLiBQbGVhc2UgY2hlY2sgdGhlIGxhc3Rlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gZ29vZ2xlIGltYSBmb3IgQWRzLiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlBsZWFzZSBjaGVjayB0aGUgZ29vZ2xlIGltYSBsaWJyYXJ5LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTA1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGZpbmQgdGhlIGRhc2hqcy4gUGxlYXNlIGNoZWNrIHRoZSBkYXNoanMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOb3QgZm91bmQgZGFzaGpzLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTA2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGZpbmQgdGhlIGhsc2pzLiBQbGVhc2UgY2hlY2sgdGhlIGhsc2pzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTm90IGZvdW5kIGhsc2pzLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IHBsYXkgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJGZXRjaGluZyBwcm9jZXNzIGFib3J0ZWQgYnkgdXNlci5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZCBieSB1c2VyLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJTb21lIG9mIHRoZSBtZWRpYSBjb3VsZCBub3QgYmUgZG93bmxvYWRlZCBkdWUgdG8gYSBuZXR3b3JrIGVycm9yLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkb3dubG9hZGluZy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkZWNvZGluZy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiTWVkaWEgcGxheWJhY2sgaGFzIGJlZW4gY2FuY2VsZWQuIEl0IGxvb2tzIGxpa2UgeW91ciBtZWRpYSBpcyBjb3JydXB0ZWQgb3IgeW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIGZlYXR1cmVzIHlvdXIgbWVkaWEgdXNlcy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk1lZGlhIHBsYXliYWNrIG5vdCBzdXBwb3J0ZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBsb2FkIGNhcHRpb25zIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDY6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA2LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlVuYWJsZSB0byBsb2FkIG1lZGlhLiBUaGlzIG1heSBiZSBkdWUgdG8gYSBzZXJ2ZXIgb3IgbmV0d29yayBlcnJvciwgb3IgZHVlIHRvIGFuIHVuc3VwcG9ydGVkIGZvcm1hdC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgY2Fubm90IG9yIHdpbGwgbm90IHByb2Nlc3MgdGhlIHJlcXVlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDc6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA3LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlVuYWJsZSB0byBsb2FkIG1lZGlhLiBUaGlzIG1heSBiZSBkdWUgdG8gYSBzZXJ2ZXIgb3IgbmV0d29yayBlcnJvciwgb3IgZHVlIHRvIGFuIHVuc3VwcG9ydGVkIGZvcm1hdC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgcmVmdXNlZCB0aGUgcmVxdWVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwODoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDgsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciBkbyBub3QgYWNjZXB0IHRoZSByZXF1ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViU29ja2V0IGNvbm5lY3Rpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwMixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIGFkZEljZUNhbmRpZGF0ZSBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgc2V0UmVtb3RlRGVzY3JpcHRpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHBlZXIgY3JlYXRlT2ZmZXIgZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTA1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwNSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHNldExvY2FsRGVzY3JpcHRpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTEwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUxMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJOZXR3b3JrIGNvbm5lY3Rpb24gaXMgdW5zdGFibGUuIENoZWNrIHRoZSBuZXR3b3JrIGNvbm5lY3Rpb24uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOZXR3b3JrIGlzIHNsb3cuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MTE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTExLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHRlcm1pbmF0ZWQgdW5leHBlY3RlZGx5LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVW5leHBlY3RlZCBlbmQgb2YgY29ubmVjdGlvbi5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImxhbmdcIiA6IFwia29cIixcclxuICAgICAgICBcInVpXCIgOiB7XHJcbiAgICAgICAgICAgIFwiY29udGV4dFwiIDogXCLsmKTruJDtlIzroIjsnbTslrTsl5Ag6rSA7ZWY7JesXCIsXHJcbiAgICAgICAgICAgIFwiY29udHJvbHNcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwibGl2ZVwiIDogXCLrnbzsnbTruIxcIixcclxuICAgICAgICAgICAgICAgIFwibG93X2xhdGVuY3lfbGl2ZVwiIDogXCLstIjsoIDsp4Dsl7Ag65287J2067iMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvd19sYXRlbmN5X3AycFwiIDogXCLstIjsoIDsp4Dsl7AgUDJQXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGxheWxpc3RcIiA6IFwi7ZSM66CI7J2066as7Iqk7Yq4XCIsXHJcbiAgICAgICAgICAgIFwic2V0dGluZ1wiIDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiIDogXCLshKTsoJVcIixcclxuICAgICAgICAgICAgICAgIFwic3BlZWRcIiA6IFwi7J6s7IOdIOyGjeuPhFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcGVlZFVuaXRcIiA6IFwieFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzb3VyY2VcIiA6IFwi7IaM7IqkXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YWxpdHlcIiA6IFwi7ZKI7KeIXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhcHRpb25cIiA6IFwi7J6Q66eJXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc3BsYXlcIiA6IFwi7ZGc7IucXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJhcGlcIiA6IHtcclxuICAgICAgICAgICAgXCJtZXNzYWdlXCIgOiB7XHJcbiAgICAgICAgICAgICAgICBcIm11dGVkX3BsYXlcIiA6IFwi64iM65+s7IScIOyGjOumrCDsvJzquLBcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImVycm9yXCI6IHtcclxuICAgICAgICAgICAgICAgIDEwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7JWMIOyImCDsl4bripQg7J207Jyg66GcIOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIuyVjCDsiJgg7JeG64qUIOydtOycoOuhnCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyngOybkOuQmOuKlCDrr7jrlJTslrTrpbwg7LC+7KeAIOuqu+2VtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHBsYXlhYmxlIG1lZGlhIG5vdCBmb3VuZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwMjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7ZSM66CI7IucIOuhnOuTnOqwgCDspJHri6gg65CY7JeI7Iq164uI64ukLiA8L2JyPjxhIGhyZWY9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2dldGZsYXNocGxheWVyJyB0YXJnZXQ9J19zZWxmJz48aW1nIHNyYz0naHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmJyBhbHQ9J0dldCBBZG9iZSBGbGFzaCBwbGF5ZXInPjwvYT5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkl0IGxvb2tzIGxpa2Ugbm90IGZvdW5kIHN3ZiBvciB5b3VyIGVudmlyb25tZW50IGlzIGxvY2FsaG9zdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiRGFzaEpT66GcIOyduO2VtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuIGRhc2hqcyDrsoTsoITsnYQg7ZmV7J247ZW07KO87IS47JqULlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiZGFzaC5qcyB2ZXJzaW9uIGlzIG9sZC4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJHb29nbGUgSU1BIOudvOydtOu4jOufrOumrOqwgCDsl4bslrQg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiUGxlYXNlIGNoZWNrIHRoZSBnb29nbGUgaW1hIGxpYnJhcnkuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkRhc2hKUyDrnbzsnbTruIzrn6zrpqzqsIAg7JeG7Ja0IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5vdCBmb3VuZCBkYXNoanMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDY6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA2LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkhMU0pTIOudvOydtOu4jOufrOumrOqwgCDsl4bslrQg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTm90IGZvdW5kIGhsc2pzLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLslYwg7IiYIOyXhuuKlCDsnbTsnKDroZwg7J6s7IOd7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IHBsYXkgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7IKs7Jqp7J6Q7JeQIOydmO2VnCDtlITroZzshLjsiqQg7KSR64uoLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuuEpO2KuOybjO2BrCDsmKTrpZjroZwg7J247ZW0IOydvOu2gCDrr7jrlJTslrTrpbwg64uk7Jq066Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkb3dubG9hZGluZy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja066W8IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4g7ISc67KEIOuYkOuKlCDrhKTtirjsm4ztgawg7Jik66WYIOuYkOuKlCDsp4Dsm5DrkJjsp4Ag7JWK64qUIO2YleyLneycvOuhnCDsnbjtlbQg67Cc7IOd7ZWgIOyImCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJFcnJvciBvY2N1cnJlZCB3aGVuIGRlY29kaW5nLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrQg7J6s7IOd7J20IOy3qOyGjOuQmOyXiOyKteuLiOuLpC4g66+465SU7Ja06rCAIOyGkOyDgeuQmOyXiOqxsOuCmCDruIzrnbzsmrDsoIDqsIAg66+465SU7Ja07JeQ7IScIOyCrOyaqe2VmOuKlCDquLDriqXsnYQg7KeA7JuQ7ZWY7KeAIOyViuuKlCDqsoMg6rCZ7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTWVkaWEgcGxheWJhY2sgbm90IHN1cHBvcnRlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7JWMIOyImCDsl4bripQg7J207Jyg66GcIOyekOunieydhCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IGxvYWQgY2FwdGlvbnMgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDYsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja066W8IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4g7ISc67KEIOuYkOuKlCDrhKTtirjsm4ztgawg7Jik66WYIOuYkOuKlCDsp4Dsm5DrkJjsp4Ag7JWK64qUIO2YleyLneycvOuhnCDsnbjtlbQg67Cc7IOd7ZWgIOyImCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJUaGUgc2VydmVyIGNhbm5vdCBvciB3aWxsIG5vdCBwcm9jZXNzIHRoZSByZXF1ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrTrpbwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLiDshJzrsoQg65iQ64qUIOuEpO2KuOybjO2BrCDsmKTrpZgg65iQ64qUIOyngOybkOuQmOyngCDslYrripQg7ZiV7Iud7Jy866GcIOyduO2VtCDrsJzsg53tlaAg7IiYIOyeiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgcmVmdXNlZCB0aGUgcmVxdWVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwODoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDgsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja066W8IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4g7ISc67KEIOuYkOuKlCDrhKTtirjsm4ztgawg7Jik66WYIOuYkOuKlCDsp4Dsm5DrkJjsp4Ag7JWK64qUIO2YleyLneycvOuhnCDsnbjtlbQg67Cc7IOd7ZWgIOyImCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJUaGUgc2VydmVyIGRvIG5vdCBhY2NlcHQgdGhlIHJlcXVlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuybueyGjOy8kyDsl7DqsrAg7Iuk7YyoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJTb2NrZXQgY29ubmVjdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyggOyngOyXsChPTUUpIOyEnOuyhOyZgCDsl7DqsrDsl5Ag7Iuk7Yyo7ZaI7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIGFkZEljZUNhbmRpZGF0ZSBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyggOyngOyXsChPTUUpIOyEnOuyhOyZgCDsl7DqsrDsl5Ag7Iuk7Yyo7ZaI7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHNldFJlbW90ZURlc2NyaXB0aW9uIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwNDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7KCA7KeA7JewKE9NRSkg7ISc67KE7JmAIOyXsOqysOyXkCDsi6TtjKjtlojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgcGVlciBjcmVhdGVPZmZlciBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyggOyngOyXsChPTUUpIOyEnOuyhOyZgCDsl7DqsrDsl5Ag7Iuk7Yyo7ZaI7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHNldExvY2FsRGVzY3JpcHRpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTEwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUxMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrhKTtirjsm4ztgawg7Jew6rKw7J20IOu2iOyViOygle2VqeuLiOuLpC4g64Sk7Yq47JuM7YGsIOyXsOqysOydhCDtmZXsnbjtlZjsi63si5zsmKQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOZXR3b3JrIGlzIHNsb3cuXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXTsiLCIvKipcclxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxyXG4gKiBAcGFyYW0gICB7ZWxlbWVudH0gICBjb250YWluZXIgICBkb20gZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5pbXBvcnQge2dldEJyb3dzZXJ9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XHJcbmltcG9ydCB7UFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcclxuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcclxuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcclxuLy9Ub0RvIDogUmVzdHJ1Y3R1cmluZ1xyXG5cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYnJvd3NlckluZm8pe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgY29uc3QgU1dGUGF0aCA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuanMnKStcIk92ZW5QbGF5ZXJGbGFzaC5zd2Y/dj1cIit2ZXJzaW9uO1xyXG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcclxuICAgIGxldCAkY29udGFpbmVyID0gTEEkKGNvbnRhaW5lcik7XHJcbiAgICBsZXQgdmlkZW9FbGVtZW50ID0gXCJcIjtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgbG9hZGVkLiBicm93c2VyIDogXCIsIGJyb3dzZXJJbmZvICk7XHJcblxyXG4gICAgY29uc3QgY3JlYXRlSHRtbFZpZGVvID0gZnVuY3Rpb24oaXNMb29wLCBpc0F1dG9TdGFydCl7XHJcblxyXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJycpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICd0cnVlJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpO1xyXG4gICAgICAgIGlmKGlzTG9vcCl7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2xvb3AnLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzQXV0b1N0YXJ0KSB7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh2aWRlb0VsZW1lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGNyZWF0ZUZsYXNoVmlkZW8gPSBmdW5jdGlvbihpc0xvb3AsIGJ1ZmZlclRpbWUsIGJ1ZmZlclRpbWVNYXgpe1xyXG4gICAgICAgIGxldCBtb3ZpZSwgZmxhc2h2YXJzLCBhbGxvd3NjcmlwdGFjY2VzcywgYWxsb3dmdWxsc2NyZWVuLCBxdWFsaXR5LCBuYW1lLCBtZW51LCBxdWFsLCBiZ2NvbG9yLCBsb29wLCB3bW9kZSA7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIEZsYXNoIGJ1ZmZlciBzZXR0aW5nIDogXCIsIGJ1ZmZlclRpbWUsIGJ1ZmZlclRpbWVNYXgpO1xyXG4gICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbW92aWUnKTtcclxuICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgU1dGUGF0aCk7XHJcblxyXG4gICAgICAgIGZsYXNodmFycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdmbGFzaHZhcnMnKTtcclxuICAgICAgICAvL3BsYXllcklkIGlzIHRvIHVzZSBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cclxuICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGBwbGF5ZXJJZD0ke3Jvb3RJZH0mYnVmZmVyVGltZT0ke2J1ZmZlclRpbWV9JmJ1ZmZlck1heFRpbWU9JHtidWZmZXJUaW1lTWF4fWApO1xyXG5cclxuICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93c2NyaXB0YWNjZXNzJyk7XHJcbiAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCd2YWx1ZScsICdhbHdheXMnKTtcclxuXHJcbiAgICAgICAgYWxsb3dmdWxsc2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBhbGxvd2Z1bGxzY3JlZW4uc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93ZnVsbHNjcmVlbicpO1xyXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgICAgcXVhbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xyXG4gICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoZWlnaHQnKTtcclxuXHJcbiAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbmFtZScpO1xyXG4gICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuXHJcbiAgICAgICAgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbWVudScpO1xyXG4gICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdmYWxzZScpO1xyXG5cclxuICAgICAgICBxdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XHJcbiAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hpZ2gnKTtcclxuXHJcbiAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYmdjb2xvcicpO1xyXG4gICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCd2YWx1ZScsICcjMDAwMDAwJyk7XHJcblxyXG4gICAgICAgIHdtb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICB3bW9kZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnd21vZGUnKTtcclxuICAgICAgICB3bW9kZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ29wYXF1ZScpO1xyXG5cclxuICAgICAgICAvKmxldCBhbGxvd0J1dHRvbiA9IGA8YSBocmVmPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXJcIj48aW1nIHNyYz1cImh0dHA6Ly93d3cuYWRvYmUuY29tL2ltYWdlcy9zaGFyZWQvZG93bmxvYWRfYnV0dG9ucy9nZXRfZmxhc2hfcGxheWVyLmdpZlwiIGFsdD1cIkdldCBBZG9iZSBGbGFzaCBwbGF5ZXJcIj48L2E+YDtcclxuICAgICAgICBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBtZXNzYWdlLmlubmVySFRNTCA9IGFsbG93QnV0dG9uOyovXHJcblxyXG4gICAgICAgIGlmKGlzTG9vcCl7XHJcbiAgICAgICAgICAgIGxvb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBsb29wLnNldEF0dHJpYnV0ZSgnbmFtZScsICdsb29wJyk7XHJcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NjYWxlJywgJ2RlZmF1bHQnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3bW9kZScsICdvcGFxdWUnKTtcclxuXHJcbiAgICAgICAgaWYoYnJvd3NlckluZm8uYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXJcIiAmJiBicm93c2VySW5mby5icm93c2VyTWFqb3JWZXJzaW9uIDw9IDkgKXtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKG1vdmllKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YScsIFNXRlBhdGgpO1xyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzTG9vcCl7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChsb29wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZCh3bW9kZSk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGJnY29sb3IpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChxdWFsKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dmdWxsc2NyZWVuKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dzY3JpcHRhY2Nlc3MpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xyXG4gICAgICAgIC8vdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh2aWRlb0VsZW1lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNyZWF0ZU1lZGlhID0gKHByb3ZpZGVyTmFtZSAsIHBsYXllckNvbmZpZykgID0+IHtcclxuICAgICAgICBpZiggcHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9SVE1QICl7XHJcbiAgICAgICAgICAgIGlmKHZpZGVvRWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVtcHR5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUZsYXNoVmlkZW8ocGxheWVyQ29uZmlnLmlzTG9vcCgpLCBwbGF5ZXJDb25maWcuZ2V0UnRtcEJ1ZmZlclRpbWUoKSwgcGxheWVyQ29uZmlnLmdldFJ0bXBCdWZmZXJUaW1lTWF4KCkpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyBpZih2aWRlb0VsZW1lbnQpe1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gdGhhdC5lbXB0eSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgLy9yZXVzZSB2aWRlbyBlbGVtZW50LlxyXG4gICAgICAgICAgICAvLyAgICAgLy9iZWNhdXNlIHBsYXlsaXN0IGlzIGF1dG8gbmV4dCBwbGF5aW5nLlxyXG4gICAgICAgICAgICAvLyAgICAgLy9Pbmx5IHNhbWUgdmlkZW8gZWxlbWVudCBkb2VzIG5vdCByZXF1aXJlIFVzZXIgSW50ZXJhY3Rpb24gRXJyb3IuXHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiBjcmVhdGVIdG1sVmlkZW8ocGxheWVyQ29uZmlnLmlzTG9vcCgpLCBwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhhdC5lbXB0eSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSHRtbFZpZGVvKHBsYXllckNvbmZpZy5pc0xvb3AoKSwgcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmNyZWF0ZUFkQ29udGFpbmVyID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3AtYWRzJyk7XHJcbiAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoYWRDb250YWluZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gYWRDb250YWluZXI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmVtcHR5ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIHJlbW92ZUVsZW1lbnQoKVwiKTtcclxuICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNoaWxkKHZpZGVvRWxlbWVudCk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVDaGlsZCgpO1xyXG4gICAgICAgICRjb250YWluZXIgPSBudWxsO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgcm9vdElkID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5pbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCB9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9uICx0cmltfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3RyaW5nc1wiO1xyXG5pbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcIi4uL1N1cHBvcnRDaGVja2VyXCI7XHJcbmltcG9ydCB7UExBWUxJU1RfQ0hBTkdFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgUGxheWxpc3Qgb3IgU291cmNlcy5cclxuICogQHBhcmFtXHJcbiAqXHJcbiAqICovXHJcbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihwcm92aWRlcil7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBsZXQgY3VycmVudFBsYXlsaXN0SXRlbSA9IFtdO1xyXG4gICAgbGV0IHNwZWMgPSB7XHJcbiAgICAgICAgcGxheWxpc3QgOiBbXSxcclxuICAgICAgICBjdXJyZW50SW5kZXggOiAwXHJcbiAgICB9O1xyXG4gICAgbGV0IHN1cHBvcnRDaGVja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCBtYWtlUHJldHR5U291cmNlID0gZnVuY3Rpb24oc291cmNlXyl7XHJcbiAgICAgICAgaWYgKCFzb3VyY2VfIHx8ICFzb3VyY2VfLmZpbGUgJiYgIShzb3VyY2VfLmhvc3QgfHwgc291cmNlXy5hcHBsaWNhdGlvbiB8fCBzb3VyY2VfLnN0cmVhbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcclxuICAgICAgICBzb3VyY2UuZmlsZSA9IHRyaW0oJycgKyBzb3VyY2UuZmlsZSk7XHJcblxyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcclxuICAgICAgICAgICAgc291cmNlLmZpbGUgPSBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvc3RyZWFtL1wiICsgc291cmNlLnN0cmVhbTtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5ob3N0O1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLnN0cmVhbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1pbWV0eXBlUmVnRXggPSAvXlteL10rXFwvKD86eC0pPyhbXi9dKykkLztcclxuXHJcbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcclxuICAgICAgICAgICAgLy8gaWYgdHlwZSBpcyBnaXZlbiBhcyBhIG1pbWV0eXBlXHJcbiAgICAgICAgICAgIHNvdXJjZS5taW1lVHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcclxuICAgICAgICB9ZWxzZSBpZihpc0Rhc2goc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2Rhc2gnO1xyXG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBleHRyYWN0RXh0ZW5zaW9uKHNvdXJjZS5maWxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzb3VyY2UubG93TGF0ZW5jeSkge1xyXG4gICAgICAgICAgICBzb3VyY2UubG93TGF0ZW5jeSA9IHNvdXJjZS5sb3dMYXRlbmN5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBub3JtYWxpemUgdHlwZXNcclxuICAgICAgICBzd2l0Y2ggKHNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ20zdTgnOlxyXG4gICAgICAgICAgICBjYXNlICd2bmQuYXBwbGUubXBlZ3VybCc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdobHMnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdhYWMnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NtaWwnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlW2tleV0gPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgc291cmNlW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5pbml0UGxheWxpc3QgPShwbGF5bGlzdCwgcGxheWVyQ29uZmlnKSA9PntcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBjb25zdCBwcmV0dGllZFBsYXlsaXN0ID0gKF8uaXNBcnJheShwbGF5bGlzdCkgPyBwbGF5bGlzdCA6IFtwbGF5bGlzdF0pLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShpdGVtLnRyYWNrcykpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RJdGVtID0gT2JqZWN0LmFzc2lnbih7fSx7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRyYWNrczogW10sXHJcbiAgICAgICAgICAgICAgICB0aXRsZSA6IFwiXCJcclxuICAgICAgICAgICAgfSwgaXRlbSApO1xyXG5cclxuICAgICAgICAgICAgaWYoKHBsYXlsaXN0SXRlbS5zb3VyY2VzID09PSBPYmplY3QocGxheWxpc3RJdGVtLnNvdXJjZXMpKSAmJiAhXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlcyldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykgfHwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbSldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gaXRlbS5sZXZlbHM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5U291cmNlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSAoZGVmYXVsdFNvdXJjZS50b1N0cmluZygpID09PSAndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzb3VyY2UgZG9lc24ndCBoYXZlIGEgbGFiZWwsIG51bWJlciBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKCFwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0Q2hlY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UocHJldHR5U291cmNlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBwcmV0dHlTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gcGxheWxpc3RJdGVtLnNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhIXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICBpZighcGxheWxpc3RJdGVtLnRpdGxlICYmICBwbGF5bGlzdEl0ZW0uc291cmNlc1swXSAmJiBwbGF5bGlzdEl0ZW0uc291cmNlc1swXS5sYWJlbCl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udGl0bGUgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1swXS5sYWJlbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZGVmYXVsdCDqsIAg7JeG7J2E65WMIHdlYnJ0Y+qwgCDsnojri6TrqbQgd2VicnRjIGRlZmF1bHQgOiB0cnVl66GcIOyekOuPmSDshKTsoJVcclxuICAgICAgICAgICAgLypsZXQgaGF2ZURlZmF1bHQgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS5kZWZhdWx0ID09IHRydWU7fSk7XHJcbiAgICAgICAgICAgIGxldCB3ZWJydGNTb3VyY2UgPSBbXTtcclxuICAgICAgICAgICAgaWYoIWhhdmVEZWZhdWx0KXtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZSA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLnR5cGUgPT0gXCJ3ZWJydGNcIjt9KTtcclxuICAgICAgICAgICAgICAgIGlmKHdlYnJ0Y1NvdXJjZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VicnRjU291cmNlLmRlZmF1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9Ki9cclxuXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBleHRyYWN0T25seU9uZVByb3RvY29sKHNvdXJjZXMpe1xyXG4gICAgICAgICAgICAgICAgaWYoISFzb3VyY2VzKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGlnaFByaW9yaXR5VHlwZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihzb3VyY2VzLCB7dHlwZSA6IGhpZ2hQcmlvcml0eVR5cGV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQ3VycmVudFByb3RvY29sT25seSgpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gZXh0cmFjdE9ubHlPbmVQcm90b2NvbChwbGF5bGlzdEl0ZW0uc291cmNlcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnRyYWNrcykpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLmNvbmNhdChwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHBsYXlsaXN0SXRlbS5jYXB0aW9ucztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MubWFwKGZ1bmN0aW9uKHRyYWNrKXtcclxuICAgICAgICAgICAgICAgIGlmKCF0cmFjayB8fCAhdHJhY2suZmlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHtcclxuICAgICAgICAgICAgICAgICAgICAna2luZCc6ICdjYXB0aW9ucycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgdHJhY2spO1xyXG4gICAgICAgICAgICB9KS5maWx0ZXIodHJhY2sgPT4gISF0cmFjayk7XHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5bGlzdEl0ZW07XHJcbiAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBpdGVtLnNvdXJjZXMgJiYgaXRlbS5zb3VyY2VzLmxlbmd0aCA+IDA7fSl8fFtdO1xyXG4gICAgICAgIHNwZWMucGxheWxpc3QgPSBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgICAgIHJldHVybiBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldFBsYXlsaXN0KCkgXCIsIHNwZWMucGxheWxpc3QpO1xyXG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlMaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXggPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudEluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFBsYXlsaXN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtpbmRleF0pe1xyXG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKFBMQVlMSVNUX0NIQU5HRUQsIHNwZWMuY3VycmVudEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudEluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0pe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0Q3VycmVudFNvdXJjZXMoKSBcIiwgc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0uc291cmNlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5zb3VyY2VzO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudEFkVGFnID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdLmFkVGFnVXJsIHx8IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcImFwaS9TdXBwb3J0Q2hlY2tlclwiO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuaW1wb3J0IHtcclxuICAgIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfUlRNUCwgRVJST1JTLCBJTklUX1VOU1VQUE9SVF9FUlJPUlxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIHByb3ZpZGVyLlxyXG4gKiBAcGFyYW1cclxuICogKi9cclxuY29uc3QgQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBzdXBwb3J0Q2hhY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcbiAgICBjb25zdCBQcm92aWRlcnMgPSB7fTtcclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCByZWdpc3RlclByb3ZpZGVyID0gKG5hbWUsIHByb3ZpZGVyKSA9PiB7XHJcbiAgICAgICAgaWYgKFByb3ZpZGVyc1tuYW1lXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcclxuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPSB7XHJcbiAgICAgICAgaHRtbDU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNSddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNScpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJQcm92aWRlcihQUk9WSURFUl9IVE1MNSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZTogUFJPVklERVJfSFRNTDUsIHByb3ZpZGVyOiBwcm92aWRlcn07XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAnb3ZlbnBsYXllci5wcm92aWRlci5IdG1sNSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdlYnJ0YzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQyddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyUHJvdmlkZXIoUFJPVklERVJfV0VCUlRDLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9XRUJSVEMsIHByb3ZpZGVyOiBwcm92aWRlcn07XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAnb3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhc2g6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0Rhc2gnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyUHJvdmlkZXIoUFJPVklERVJfREFTSCwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZTogUFJPVklERVJfREFTSCwgcHJvdmlkZXI6IHByb3ZpZGVyfTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sICdvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhsczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0hscyddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyUHJvdmlkZXIoUFJPVklERVJfSExTLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9ITFMsIHByb3ZpZGVyOiBwcm92aWRlcn07XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAnb3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ0bXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvZmxhc2gvcHJvdmlkZXJzL1J0bXAnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyUHJvdmlkZXIoUFJPVklERVJfUlRNUCwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZTogUFJPVklERVJfUlRNUCwgcHJvdmlkZXI6IHByb3ZpZGVyfTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sICdvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmxvYWRQcm92aWRlcnMgPSAocGxheWxpc3RJdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdChwbGF5bGlzdEl0ZW0pO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkUHJvdmlkZXJzKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpO1xyXG4gICAgICAgIGlmICghc3VwcG9ydGVkUHJvdmlkZXJOYW1lcykge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRVJST1JTLmNvZGVzW0lOSVRfVU5TVVBQT1JUX0VSUk9SXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxyXG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcy5maWx0ZXIoZnVuY3Rpb24gKHByb3ZpZGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIVByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV07XHJcbiAgICAgICAgICAgICAgICB9KS5tYXAoZnVuY3Rpb24gKHByb3ZpZGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZmluZEJ5TmFtZSA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGZpbmRCeU5hbWUoKSBcIiwgbmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZSA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBnZXRQcm92aWRlckJ5U291cmNlKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBpc1NhbWVQcm92aWRlcigpIFwiLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSksIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpKTtcclxuICAgICAgICByZXR1cm4gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpID09PSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xyXG4iLCJpbXBvcnQgQVBJIGZyb20gJ2FwaS9BcGknO1xyXG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tICd1dGlscy92YWxpZGF0b3InO1xyXG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcclxuaW1wb3J0IExhJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xyXG5cclxuXHJcbi8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5zZGsuanMnKTtcclxuXHJcbi8qKlxyXG4gKiBNYWluIE92ZW5QbGF5ZXJTREsgb2JqZWN0XHJcbiAqL1xyXG5jb25zdCBPdmVuUGxheWVyU0RLID0ge307XHJcblxyXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXIpO1xyXG4gICAgfSBlbHNlIGlmIChjb250YWluZXIubm9kZVR5cGUpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lcjtcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb250YWluZXJFbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHBsYXllciBpbnN0YW5jZSBhbmQgcmV0dXJuIGl0LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nIHwgZG9tIGVsZW1lbnR9IGNvbnRhaW5lciAgSWQgb2YgY29udGFpbmVyIGVsZW1lbnQgb3IgY29udGFpbmVyIGVsZW1lbnRcclxuICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyAgVGhlIG9wdGlvbnNcclxuICovXHJcbk92ZW5QbGF5ZXJTREsuY3JlYXRlID0gZnVuY3Rpb24oY29udGFpbmVyLCBvcHRpb25zKSB7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IEFQSShjb250YWluZXJFbGVtZW50KTtcclxuICAgIHBsYXllckluc3RhbmNlLmluaXQob3B0aW9ucyk7XHJcblxyXG4gICAgcGxheWVyTGlzdC5wdXNoKHBsYXllckluc3RhbmNlKTtcclxuXHJcbiAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGxpc3QuXHJcbiAqXHJcbiAqIEByZXR1cm4gICAgIHthcnJheX0gIFRoZSBwbGF5ZXIgbGlzdC5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXJMaXN0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBjb250YWluZXIgaWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9ICBjb250YWluZXJJZCAgVGhlIGNvbnRhaW5lciBpZGVudGlmaWVyXHJcbiAqIEByZXR1cm4gICAgIHtvYmVqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5Q29udGFpbmVySWQgPSBmdW5jdGlvbihjb250YWluZXJJZCkge1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcclxuXHJcbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uZ2V0Q29udGFpbmVySWQoKSA9PT0gY29udGFpbmVySWQpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJMaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgaW5kZXguXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtudW1iZXJ9ICBpbmRleCAgIFRoZSBpbmRleFxyXG4gKiBAcmV0dXJuICAgICB7b2JqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5SW5kZXggPSBmdW5jdGlvbihpbmRleCkge1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gcGxheWVyTGlzdFtpbmRleF07XHJcblxyXG4gICAgaWYgKHBsYXllckluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IHBsYXllcklkLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7cGxheWVySWR9ICBpZFxyXG4gKiBAcmV0dXJuICAgICB7bnVsbH1cclxuICovXHJcbk92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyID0gZnVuY3Rpb24ocGxheWVySWQpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcclxuXHJcbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uZ2V0Q29udGFpbmVySWQoKSA9PT0gcGxheWVySWQpIHtcclxuXHJcbiAgICAgICAgICAgIHBsYXllckxpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgd2VicnRjIHNvdXJjZSBmb3IgcGxheWVyIHNvdXJjZSB0eXBlLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7T2JqZWN0IHwgQXJyYXl9ICBzb3VyY2UgICB3ZWJydGMgc291cmNlXHJcbiAqIEByZXR1cm4gICAgIHtBcnJheX0gIFBsYXllciBzb3VyY2UgT2JqZWN0LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZW5lcmF0ZVdlYnJ0Y1VybHMgPSBmdW5jdGlvbihzb3VyY2VzKSB7XHJcbiAgICByZXR1cm4gKF8uaXNBcnJheShzb3VyY2VzKSA/IHNvdXJjZXMgOiBbc291cmNlc10pLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KXtcclxuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBpc1dlYlJUQyhzb3VyY2UuaG9zdCkgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xyXG4gICAgICAgICAgICByZXR1cm4ge2ZpbGUgOiBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvXCIgKyBzb3VyY2Uuc3RyZWFtLCB0eXBlIDogXCJ3ZWJydGNcIiwgbGFiZWwgOiBzb3VyY2UubGFiZWwgPyBzb3VyY2UubGFiZWwgOiBcIndlYnJ0Yy1cIisoaW5kZXgrMSkgfTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXaGV0aGVyIHNob3cgdGhlIHBsYXllciBjb3JlIGxvZyBvciBub3QuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtib29sZWFufSAgYm9vbGVhbiAgIHJ1biBkZWJ1ZyBtb2RlIG9yIG5vdC5cclxuICogQHJldHVybiAgICAge2Jvb2xlYW59ICBydW4gZGVidWcgbW9kZSBvciBub3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmRlYnVnID0gZnVuY3Rpb24oaXNEZWJ1Z01vZGUpIHtcclxuICAgIGlmKGlzRGVidWdNb2RlKXtcclxuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogd2luZG93Wydjb25zb2xlJ11bJ2xvZyddfTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiAgZnVuY3Rpb24oKXt9fTtcclxuICAgIH1cclxuICAgIHJldHVybiBpc0RlYnVnTW9kZTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE92ZW5QbGF5ZXJTREs7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyTGFuZ3VhZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IG5hdiA9IHdpbmRvdy5uYXZpZ2F0b3IsXHJcbiAgICAgICAgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzID0gWydsYW5ndWFnZScsICdicm93c2VyTGFuZ3VhZ2UnLCAnc3lzdGVtTGFuZ3VhZ2UnLCAndXNlckxhbmd1YWdlJ10sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBsYW5ndWFnZTtcclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBIVE1MIDUuMSBcIm5hdmlnYXRvci5sYW5ndWFnZXNcIlxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmF2Lmxhbmd1YWdlcykpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmF2Lmxhbmd1YWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsYW5ndWFnZSA9IG5hdi5sYW5ndWFnZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBvdGhlciB3ZWxsIGtub3duIHByb3BlcnRpZXMgaW4gYnJvd3NlcnNcclxuICAgIGZvciAoaSA9IDA7IGkgPCBicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsYW5ndWFnZSA9IG5hdlticm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXNbaV1dO1xyXG4gICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFuYWxVc2VyQWdlbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHVua25vd24gPSAnLSc7XHJcblxyXG4gICAgLy8gc2NyZWVuXHJcbiAgICBsZXQgc2NyZWVuU2l6ZSA9ICcnO1xyXG4gICAgaWYgKHNjcmVlbi53aWR0aCkge1xyXG4gICAgICAgIGxldCB3aWR0aCA9IChzY3JlZW4ud2lkdGgpID8gc2NyZWVuLndpZHRoIDogJyc7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IChzY3JlZW4uaGVpZ2h0KSA/IHNjcmVlbi5oZWlnaHQgOiAnJztcclxuICAgICAgICBzY3JlZW5TaXplICs9ICcnICsgd2lkdGggKyBcIiB4IFwiICsgaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGJyb3dzZXJcclxuICAgIGxldCBuVmVyID0gbmF2aWdhdG9yLmFwcFZlcnNpb247XHJcbiAgICBsZXQgbkFndCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XHJcbiAgICBsZXQgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xyXG4gICAgbGV0IHZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pO1xyXG4gICAgbGV0IG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLCAxMCk7XHJcbiAgICBsZXQgaXNXZWJ2aWV3ID0gZmFsc2U7XHJcbiAgICBsZXQgbmFtZU9mZnNldCwgdmVyT2Zmc2V0LCBpeDtcclxuXHJcbiAgICAvLyBPcGVyYVxyXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ09wZXJhJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdPcGVyYSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xyXG4gICAgICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdWZXJzaW9uJykpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBPcGVyYSBOZXh0XHJcbiAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignT1BSJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdPcGVyYSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDQpO1xyXG4gICAgfVxyXG4gICAgLy/sgrzshLEg67iM65287Jqw7KCAXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdTYW1zdW5nQnJvd3NlcicpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnU2Ftc3VuZ0Jyb3dzZXInO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxNSk7XHJcbiAgICB9XHJcbiAgICAvLyBFZGdlXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdFZGdlJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgRWRnZSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDUpO1xyXG4gICAgfVxyXG4gICAgLy8gTVNJRVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignTVNJRScpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSk7XHJcblxyXG5cclxuICAgICAgICAvL3dpbjcgSUUxMSB1c2VyQWdlbnQgaXMgdWdseS4uLi5cclxuICAgICAgICBpZiggKG5BZ3QuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpICYmIChuQWd0LmluZGV4T2YoJ3J2OicpICE9PSAtMSkgICl7XHJcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyhuQWd0LmluZGV4T2YoJ3J2OicpICsgMyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQ2hyb21lXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdDaHJvbWUnKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ0Nocm9tZSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignQ3JpT1MnKSkgIT0gLTEpIHsgICAvL2lwaG9uZSAtIGNocm9tZVxyXG4gICAgICAgIGJyb3dzZXIgPSAnQ2hyb21lJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XHJcbiAgICB9XHJcbiAgICAvLyBGaXJlZm94XHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdGaXJlZm94JykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdGaXJlZm94JztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdGeGlPUycpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnRmlyZWZveCc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xyXG4gICAgfVxyXG4gICAgLy8gU2FmYXJpXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdTYWZhcmknKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ1NhZmFyaSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xyXG4gICAgICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdWZXJzaW9uJykpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIE1TSUUgMTErXHJcbiAgICBlbHNlIGlmIChuQWd0LmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyhuQWd0LmluZGV4T2YoJ3J2OicpICsgMyk7XHJcbiAgICB9XHJcbiAgICAvLyBPdGhlciBicm93c2Vyc1xyXG4gICAgZWxzZSBpZiAoKG5hbWVPZmZzZXQgPSBuQWd0Lmxhc3RJbmRleE9mKCcgJykgKyAxKSA8ICh2ZXJPZmZzZXQgPSBuQWd0Lmxhc3RJbmRleE9mKCcvJykpKSB7XHJcbiAgICAgICAgYnJvd3NlciA9IG5BZ3Quc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldCk7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDEpO1xyXG4gICAgICAgIGlmIChicm93c2VyLnRvTG93ZXJDYXNlKCkgPT0gYnJvd3Nlci50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgIGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZihuQWd0LmluZGV4T2YoJyB3dicpID4gMCl7XHJcbiAgICAgICAgaXNXZWJ2aWV3ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIHRyaW0gdGhlIHZlcnNpb24gc3RyaW5nXHJcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCc7JykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xyXG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignICcpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcclxuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJyknKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XHJcblxyXG4gICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoJycgKyB2ZXJzaW9uLCAxMCk7XHJcbiAgICBpZiAoaXNOYU4obWFqb3JWZXJzaW9uKSkge1xyXG4gICAgICAgIHZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pO1xyXG4gICAgICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW9iaWxlIHZlcnNpb25cclxuICAgIHZhciBtb2JpbGUgPSAvTW9iaWxlfG1pbml8RmVubmVjfEFuZHJvaWR8aVAoYWR8b2R8aG9uZSkvLnRlc3QoblZlcik7XHJcblxyXG4gICAgLy8gY29va2llXHJcbiAgICB2YXIgY29va2llRW5hYmxlZCA9IChuYXZpZ2F0b3IuY29va2llRW5hYmxlZCkgPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IuY29va2llRW5hYmxlZCA9PSAndW5kZWZpbmVkJyAmJiAhY29va2llRW5hYmxlZCkge1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICd0ZXN0Y29va2llJztcclxuICAgICAgICBjb29raWVFbmFibGVkID0gKGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCd0ZXN0Y29va2llJykgIT0gLTEpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN5c3RlbVxyXG4gICAgdmFyIG9zID0gdW5rbm93bjtcclxuICAgIHZhciBjbGllbnRTdHJpbmdzID0gW1xyXG4gICAgICAgIHtzOidXaW5kb3dzIDEwJywgcjovKFdpbmRvd3MgMTAuMHxXaW5kb3dzIE5UIDEwLjApL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgOC4xJywgcjovKFdpbmRvd3MgOC4xfFdpbmRvd3MgTlQgNi4zKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDgnLCByOi8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDcnLCByOi8oV2luZG93cyA3fFdpbmRvd3MgTlQgNi4xKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIFZpc3RhJywgcjovV2luZG93cyBOVCA2LjAvfSxcclxuICAgICAgICB7czonV2luZG93cyBTZXJ2ZXIgMjAwMycsIHI6L1dpbmRvd3MgTlQgNS4yL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgWFAnLCByOi8oV2luZG93cyBOVCA1LjF8V2luZG93cyBYUCkvfSxcclxuICAgICAgICB7czonV2luZG93cyAyMDAwJywgcjovKFdpbmRvd3MgTlQgNS4wfFdpbmRvd3MgMjAwMCkvfSxcclxuICAgICAgICB7czonV2luZG93cyBNRScsIHI6LyhXaW4gOXggNC45MHxXaW5kb3dzIE1FKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDk4JywgcjovKFdpbmRvd3MgOTh8V2luOTgpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgOTUnLCByOi8oV2luZG93cyA5NXxXaW45NXxXaW5kb3dzXzk1KS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIE5UIDQuMCcsIHI6LyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIENFJywgcjovV2luZG93cyBDRS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDMuMTEnLCByOi9XaW4xNi99LFxyXG4gICAgICAgIHtzOidBbmRyb2lkJywgcjovQW5kcm9pZC99LFxyXG4gICAgICAgIHtzOidPcGVuIEJTRCcsIHI6L09wZW5CU0QvfSxcclxuICAgICAgICB7czonU3VuIE9TJywgcjovU3VuT1MvfSxcclxuICAgICAgICB7czonTGludXgnLCByOi8oTGludXh8WDExKS99LFxyXG4gICAgICAgIHtzOidpT1MnLCByOi8oaVBob25lfGlQYWR8aVBvZCkvfSxcclxuICAgICAgICB7czonTWFjIE9TIFhJJywgcjovTWFjIE9TIFggMTEvfSxcclxuICAgICAgICB7czonTWFjIE9TIFgnLCByOi9NYWMgT1MgWCAxMC99LFxyXG4gICAgICAgIHtzOidNYWMgT1MnLCByOi8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvfSxcclxuICAgICAgICB7czonUU5YJywgcjovUU5YL30sXHJcbiAgICAgICAge3M6J1VOSVgnLCByOi9VTklYL30sXHJcbiAgICAgICAge3M6J0JlT1MnLCByOi9CZU9TL30sXHJcbiAgICAgICAge3M6J09TLzInLCByOi9PU1xcLzIvfSxcclxuICAgICAgICB7czonU2VhcmNoIEJvdCcsIHI6LyhudWhrfEdvb2dsZWJvdHxZYW1teWJvdHxPcGVuYm90fFNsdXJwfE1TTkJvdHxBc2sgSmVldmVzXFwvVGVvbWF8aWFfYXJjaGl2ZXIpL31cclxuICAgIF07XHJcbiAgICBmb3IgKHZhciBpZCBpbiBjbGllbnRTdHJpbmdzKSB7XHJcbiAgICAgICAgdmFyIGNzID0gY2xpZW50U3RyaW5nc1tpZF07XHJcbiAgICAgICAgaWYgKGNzLnIudGVzdChuQWd0KSkge1xyXG4gICAgICAgICAgICBvcyA9IGNzLnM7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgb3NWZXJzaW9uID0gdW5rbm93bjtcclxuXHJcbiAgICBpZiAoL1dpbmRvd3MvLnRlc3Qob3MpKSB7XHJcbiAgICAgICAgb3NWZXJzaW9uID0gL1dpbmRvd3MgKC4qKS8uZXhlYyhvcylbMV07XHJcbiAgICAgICAgb3MgPSAnV2luZG93cyc7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChvcykge1xyXG4gICAgICAgIGNhc2UgJ01hYyBPUyBYSSc6XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9NYWMgT1MgWCAoMTFbXFwuXFxfXFxkXSspLy5leGVjKG5BZ3QpWzFdO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnTWFjIE9TIFgnOlxyXG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvTWFjIE9TIFggKDEwW1xcLlxcX1xcZF0rKS8uZXhlYyhuQWd0KVsxXTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ0FuZHJvaWQnOlxyXG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoW1xcLlxcX1xcZF0rKS8uZXhlYyhuQWd0KVsxXTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ2lPUyc6XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9PUyAoXFxkKylfKFxcZCspXz8oXFxkKyk/Ly5leGVjKG5WZXIpO1xyXG4gICAgICAgICAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb25bMV0gKyAnLicgKyBvc1ZlcnNpb25bMl0gKyAnLicgKyAob3NWZXJzaW9uWzNdIHwgMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2NyZWVuOiBzY3JlZW5TaXplLFxyXG4gICAgICAgIGJyb3dzZXI6IGJyb3dzZXIsXHJcbiAgICAgICAgYnJvd3NlclZlcnNpb246IHZlcnNpb24sXHJcbiAgICAgICAgYnJvd3Nlck1ham9yVmVyc2lvbjogbWFqb3JWZXJzaW9uLFxyXG4gICAgICAgIG1vYmlsZTogbW9iaWxlLFxyXG4gICAgICAgIHVhIDogbkFndCxcclxuICAgICAgICBvczogb3MsXHJcbiAgICAgICAgb3NWZXJzaW9uOiBvc1ZlcnNpb24sXHJcbiAgICAgICAgY29va2llczogY29va2llRW5hYmxlZFxyXG4gICAgfTtcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAyMDEzIHZ0dC5qcyBDb250cmlidXRvcnNcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxubGV0IFZUVEN1ZSA9IHdpbmRvdy5WVFRDdWU7XHJcblxyXG52YXIgYXV0b0tleXdvcmQgPSBcImF1dG9cIjtcclxudmFyIGRpcmVjdGlvblNldHRpbmcgPSB7XHJcbiAgICBcIlwiOiB0cnVlLFxyXG4gICAgXCJsclwiOiB0cnVlLFxyXG4gICAgXCJybFwiOiB0cnVlXHJcbn07XHJcbnZhciBhbGlnblNldHRpbmcgPSB7XHJcbiAgICBcInN0YXJ0XCI6IHRydWUsXHJcbiAgICBcIm1pZGRsZVwiOiB0cnVlLFxyXG4gICAgXCJlbmRcIjogdHJ1ZSxcclxuICAgIFwibGVmdFwiOiB0cnVlLFxyXG4gICAgXCJyaWdodFwiOiB0cnVlXHJcbn07XHJcblxyXG5mdW5jdGlvbiBmaW5kRGlyZWN0aW9uU2V0dGluZyh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciBkaXIgPSBkaXJlY3Rpb25TZXR0aW5nW3ZhbHVlLnRvTG93ZXJDYXNlKCldO1xyXG4gICAgcmV0dXJuIGRpciA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZEFsaWduU2V0dGluZyh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciBhbGlnbiA9IGFsaWduU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcclxuICAgIHJldHVybiBhbGlnbiA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZXh0ZW5kKG9iaikge1xyXG4gICAgdmFyIGkgPSAxO1xyXG4gICAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgY29iaiA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvYmopIHtcclxuICAgICAgICAgICAgb2JqW3BdID0gY29ialtwXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9iajtcclxufVxyXG5pZighVlRUQ3VlKXtcclxuICAgIFZUVEN1ZSA9IGZ1bmN0aW9uIChzdGFydFRpbWUsIGVuZFRpbWUsIHRleHQpIHtcclxuICAgICAgICB2YXIgY3VlID0gdGhpcztcclxuICAgICAgICB2YXIgaXNJRTggPSAoL01TSUVcXHM4XFwuMC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICAgICAgdmFyIGJhc2VPYmogPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGlzSUU4KSB7XHJcbiAgICAgICAgICAgIGN1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2N1c3RvbScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJhc2VPYmouZW51bWVyYWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTaGltIGltcGxlbWVudGF0aW9uIHNwZWNpZmljIHByb3BlcnRpZXMuIFRoZXNlIHByb3BlcnRpZXMgYXJlIG5vdCBpblxyXG4gICAgICAgICAqIHRoZSBzcGVjLlxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAgICAgLy8gTGV0cyB1cyBrbm93IHdoZW4gdGhlIFZUVEN1ZSdzIGRhdGEgaGFzIGNoYW5nZWQgaW4gc3VjaCBhIHdheSB0aGF0IHdlIG5lZWRcclxuICAgICAgICAgICAgLy8gdG8gcmVjb21wdXRlIGl0cyBkaXNwbGF5IHN0YXRlLiBUaGlzIGxldHMgdXMgY29tcHV0ZSBpdHMgZGlzcGxheSBzdGF0ZVxyXG4gICAgICAgICAgICAvLyBsYXppbHkuXHJcbiAgICAgICAgY3VlLmhhc0JlZW5SZXNldCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWVFRDdWUgYW5kIFRleHRUcmFja0N1ZSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICogaHR0cDovL2Rldi53My5vcmcvaHRtbDUvd2VidnR0LyN2dHRjdWUtaW50ZXJmYWNlXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIHZhciBfaWQgPSBcIlwiO1xyXG4gICAgICAgIHZhciBfcGF1c2VPbkV4aXQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgX3N0YXJ0VGltZSA9IHN0YXJ0VGltZTtcclxuICAgICAgICB2YXIgX2VuZFRpbWUgPSBlbmRUaW1lO1xyXG4gICAgICAgIHZhciBfdGV4dCA9IHRleHQ7XHJcbiAgICAgICAgdmFyIF9yZWdpb24gPSBudWxsO1xyXG4gICAgICAgIHZhciBfdmVydGljYWwgPSBcIlwiO1xyXG4gICAgICAgIHZhciBfc25hcFRvTGluZXMgPSB0cnVlO1xyXG4gICAgICAgIHZhciBfbGluZSA9IFwiYXV0b1wiO1xyXG4gICAgICAgIHZhciBfbGluZUFsaWduID0gXCJzdGFydFwiO1xyXG4gICAgICAgIHZhciBfcG9zaXRpb24gPSA1MDtcclxuICAgICAgICB2YXIgX3Bvc2l0aW9uQWxpZ24gPSBcIm1pZGRsZVwiO1xyXG4gICAgICAgIHZhciBfc2l6ZSA9IDUwO1xyXG4gICAgICAgIHZhciBfYWxpZ24gPSBcIm1pZGRsZVwiO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcImlkXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2lkO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfaWQgPSBcIlwiICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJwYXVzZU9uRXhpdFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wYXVzZU9uRXhpdDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BhdXNlT25FeGl0ID0gISF2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInN0YXJ0VGltZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdGFydFRpbWU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN0YXJ0IHRpbWUgbXVzdCBiZSBzZXQgdG8gYSBudW1iZXIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfc3RhcnRUaW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwiZW5kVGltZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9lbmRUaW1lO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFbmQgdGltZSBtdXN0IGJlIHNldCB0byBhIG51bWJlci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9lbmRUaW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwidGV4dFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90ZXh0O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGV4dCA9IFwiXCIgKyB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJyZWdpb25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnaW9uO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfcmVnaW9uID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwidmVydGljYWxcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdmVydGljYWw7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZERpcmVjdGlvblNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhhdmUgdG8gY2hlY2sgZm9yIGZhbHNlIGJlY2F1c2UgdGhlIHNldHRpbmcgYW4gYmUgYW4gZW1wdHkgc3RyaW5nLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfdmVydGljYWwgPSBzZXR0aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInNuYXBUb0xpbmVzXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NuYXBUb0xpbmVzO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc25hcFRvTGluZXMgPSAhIXZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcImxpbmVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfbGluZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB2YWx1ZSAhPT0gYXV0b0tleXdvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBudW1iZXIgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9saW5lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwibGluZUFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmVBbGlnbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2xpbmVBbGlnbiA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUG9zaXRpb24gbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9wb3NpdGlvbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uQWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcG9zaXRpb25BbGlnbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3Bvc2l0aW9uQWxpZ24gPSBzZXR0aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInNpemVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc2l6ZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaXplIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfc2l6ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcImFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2FsaWduO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfYWxpZ24gPSBzZXR0aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdGhlciA8dHJhY2s+IHNwZWMgZGVmaW5lZCBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgICAgICAvLyBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS90aGUtdmlkZW8tZWxlbWVudC5odG1sI3RleHQtdHJhY2stY3VlLWRpc3BsYXktc3RhdGVcclxuICAgICAgICBjdWUuZGlzcGxheVN0YXRlID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBpZiAoaXNJRTgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGN1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWVFRDdWUgbWV0aG9kc1xyXG4gICAgICovXHJcblxyXG4gICAgVlRUQ3VlLnByb3RvdHlwZS5nZXRDdWVBc0hUTUwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBBc3N1bWUgV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUgaXMgb24gdGhlIGdsb2JhbC5cclxuICAgICAgICByZXR1cm4gV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUod2luZG93LCB0aGlzLnRleHQpO1xyXG4gICAgfTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWVFRDdWU7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXHJcbiAqIEBwYXJhbSAgIHNlbGVjdG9yT3JFbGVtZW50ICBzdHJpbmcgb3IgZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExhJCA9IGZ1bmN0aW9uKHNlbGVjdG9yT3JFbGVtZW50KXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSAgJGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYobm9kZUxpc3QubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCAkZWxlbWVudCA9IFwiXCI7XHJcblxyXG4gICAgaWYoIF8uaXNFbGVtZW50KHNlbGVjdG9yT3JFbGVtZW50KSB8fCBfLmV2ZXJ5KHNlbGVjdG9yT3JFbGVtZW50LCBmdW5jdGlvbihpdGVtKXtyZXR1cm4gXy5pc0VsZW1lbnQoaXRlbSl9KSl7XHJcbiAgICAgICAgJGVsZW1lbnQgPSBzZWxlY3Rvck9yRWxlbWVudDtcclxuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcImRvY3VtZW50XCIpe1xyXG4gICAgICAgICRlbGVtZW50ID0gZG9jdW1lbnQ7XHJcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJ3aW5kb3dcIil7XHJcbiAgICAgICAgJGVsZW1lbnQgPSB3aW5kb3c7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICAkZWxlbWVudCA9IHJldHVybk5vZGUoZG9jdW1lbnQsIHNlbGVjdG9yT3JFbGVtZW50KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYoISRlbGVtZW50KXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKkVGRkVDVFMqL1xyXG5cclxuICAgIHRoYXQuc2hvdyA9ICgpID0+e1xyXG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmhpZGUgPSAoKSA9PntcclxuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKkVMRU1FTlRTKi9cclxuXHJcbiAgICB0aGF0LmFkZENsYXNzID0gKG5hbWUpID0+e1xyXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWVzID0gJGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgaWYoY2xhc3NOYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBuYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFmdGVyID0gKGh0bWxTdHJpbmcpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgaHRtbFN0cmluZyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWxTdHJpbmcpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5hcHBlbmRDaGlsZChodG1sU3RyaW5nKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5iZWZvcmUgPSAoaHRtbFN0cmluZykgPT4ge1xyXG4gICAgICAgICRlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBodG1sU3RyaW5nKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jaGlsZHJlbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2hpbGRyZW4gfHwgW107XHJcbiAgICB9O1xyXG5cclxuICAgIC8vVGhlIGNvbnRhaW5zKCkgbWV0aG9kIHJldHVybnMgYSBCb29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciBhIG5vZGUgaXMgYSBkZXNjZW5kYW50IG9mIGEgc3BlY2lmaWVkIG5vZGUuXHJcbiAgICAvL0EgZGVzY2VuZGFudCBjYW4gYmUgYSBjaGlsZCwgZ3JhbmRjaGlsZCwgZ3JlYXQtZ3JhbmRjaGlsZCwgYW5kIHNvIG9uLlxyXG4gICAgdGhhdC5jb250YWlucyA9IChlbENoaWxkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50ICE9PSBlbENoaWxkICYmICRlbGVtZW50LmNvbnRhaW5zKGVsQ2hpbGQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmVtcHR5ID0gKCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmZpbmQgPSAoc2VsZWN0b3IpID0+e1xyXG4gICAgICAgIHJldHVybiBMYSQocmV0dXJuTm9kZSgkZWxlbWVudCwgc2VsZWN0b3IpKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jc3MgPSAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICBpZih2YWx1ZSl7XHJcbiAgICAgICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnN0eWxlW25hbWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgdGhhdC5yZW1vdmVDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZiAoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lID0gJGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIG5hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVBdHRyaWJ1dGUgPSAoYXR0ck5hbWUpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIC8qdGhhdC5hcHBlbmQgPSAoaHRtbENvZGUpID0+e1xyXG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCArPSBodG1sQ29kZTtcclxuICAgIH07Ki9cclxuXHJcbiAgICB0aGF0LnRleHQgPSAodGV4dCkgPT4geyAvL0lFOCtcclxuICAgICAgICBpZih0ZXh0ID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5odG1sID0gKGh0bWxTdHJpbmcpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgPSBodG1sU3RyaW5nO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaGFzQ2xhc3MgPSAobmFtZSkgPT4geyAvL0lFOCtcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgbmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoJGVsZW1lbnQubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzID0gKCR0YXJnZXRFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgLyp2YXIgbWF0Y2hlcyA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gKGVsLm1hdGNoZXMgfHwgZWwubWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fCBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWwub01hdGNoZXNTZWxlY3RvcikuY2FsbChlbCwgc2VsZWN0b3IpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG1hdGNoZXMoZWwsICcubXktY2xhc3MnKTsqL1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudCA9PT0gJHRhcmdldEVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQub2Zmc2V0ID0gKCkgPT57ICAgIC8vSUU4K1xyXG4gICAgICAgIHZhciByZWN0ID0gJGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcclxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LndpZHRoID0gKCkgPT4geyAgICAvL0lFOCtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGVpZ2h0ID0gKCkgPT4geyAgIC8vSUU4K1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXR0ciA9IChhdHRyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZXBsYWNlID0gKGh0bWwpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZXBsYWNlV2l0aChodG1sKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKCRlbGVtZW50KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVDaGlsZCA9IChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYoZWxlbWVudCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB3aGlsZSAoJGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jbG9zZXN0ID0gKHNlbGVjdG9yU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgbGV0IGNsb3Nlc3RFbGVtZW50ID0gJGVsZW1lbnQuY2xvc2VzdChzZWxlY3RvclN0cmluZyk7XHJcbiAgICAgICAgaWYoY2xvc2VzdEVsZW1lbnQpe1xyXG4gICAgICAgICAgICByZXR1cm4gTGEkKGNsb3Nlc3RFbGVtZW50KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhJDtcclxuIiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmltKHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0cmluZyA/IHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykgOiBcIlwiO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0cmFjdEV4dGVuc2lvblxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSBwYXRoIGZvciB1cmxcclxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHRlbnNpb24gPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XHJcbiAgICAgICAgbGV0IGV4dGVuc2lvbiA9IFwiXCI7XHJcbiAgICAgICAgaWYgKCgvWygsXWZvcm1hdD1tcGQtL2kpLnRlc3QocGF0aCkpIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XHJcbiAgICAgICAgfWVsc2UgaWYgKCgvWygsXWZvcm1hdD1tM3U4LS9pKS50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtM3U4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYXp1cmVkRm9ybWF0ID0gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpO1xyXG4gICAgaWYoYXp1cmVkRm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcclxuICAgIH1cclxuICAgIHBhdGggPSBwYXRoLnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXTtcclxuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy4nKSArIDEsIHBhdGgubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIG5hdHVyYWxIbXNcclxuICpcclxuICogQHBhcmFtICAgICAge251bWJlciB8IHN0cmluZ30gIHNlY29uZCAgVGhlIHNlY29uZFxyXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgZm9ybWF0dGVkIFN0cmluZ1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5hdHVyYWxIbXMoc2Vjb25kKSB7XHJcbiAgICBsZXQgc2VjTnVtID0gcGFyc2VJbnQoc2Vjb25kLCAxMCk7XHJcbiAgICBpZighc2Vjb25kKXtcclxuICAgICAgICByZXR1cm4gXCIwMDowMFwiO1xyXG4gICAgfVxyXG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xyXG4gICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XHJcbiAgICBsZXQgc2Vjb25kcyA9IHNlY051bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XHJcblxyXG4gICAgLy9pZiAoaG91cnMgPiAwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxyXG4gICAgaWYgKG1pbnV0ZXMgPCAxMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cclxuICAgIGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XHJcblxyXG4gICAgaWYgKGhvdXJzID4gMCkge1xyXG4gICAgICAgIHJldHVybiBob3VycysnOicrbWludXRlcysnOicrc2Vjb25kcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG1pbnV0ZXMrJzonK3NlY29uZHM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaG1zVG9TZWNvbmQoc3RyLCBmcmFtZVJhdGUpIHtcclxuICAgIGlmKCFzdHIpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGlmKF8uaXNOdW1iZXIoc3RyKSAmJiAhXy5pc05hTihzdHIpKXtcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoJywnLCAnLicpO1xyXG4gICAgbGV0IGFyciA9IHN0ci5zcGxpdCgnOicpO1xyXG4gICAgbGV0IGFyckxlbmd0aCA9IGFyci5sZW5ndGg7XHJcbiAgICBsZXQgc2VjID0gMDtcclxuICAgIGlmIChzdHIuc2xpY2UoLTEpID09PSAncycpe1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcclxuICAgIH1lbHNlIGlmIChzdHIuc2xpY2UoLTEpID09PSAnbScpe1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKSAqIDYwO1xyXG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdoJyl7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogMzYwMDtcclxuICAgIH1lbHNlIGlmIChhcnJMZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdmFyIHNlY0luZGV4ID0gYXJyTGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAoYXJyTGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgICAgIGlmIChmcmFtZVJhdGUpIHtcclxuICAgICAgICAgICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSkgLyBmcmFtZVJhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VjSW5kZXggLT0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSk7XHJcbiAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4IC0gMV0pICogNjA7XHJcbiAgICAgICAgaWYgKGFyckxlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleCAtIDJdKSAqIDM2MDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cik7XHJcbiAgICB9XHJcbiAgICBpZiAoXy5pc05hTihzZWMpKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VjO1xyXG59IiwiLy8gICAgIFVuZGVyc2NvcmUuanMgMS45LjFcclxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXHJcbi8vICAgICAoYykgMjAwOS0yMDE4IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXHJcbi8vICAgICBVbmRlcnNjb3JlIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4hZnVuY3Rpb24oKXt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZiYmc2VsZnx8XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbCYmZ2xvYmFsfHx0aGlzfHx7fSxyPW4uXyxlPUFycmF5LnByb3RvdHlwZSxvPU9iamVjdC5wcm90b3R5cGUscz1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sP1N5bWJvbC5wcm90b3R5cGU6bnVsbCx1PWUucHVzaCxjPWUuc2xpY2UscD1vLnRvU3RyaW5nLGk9by5oYXNPd25Qcm9wZXJ0eSx0PUFycmF5LmlzQXJyYXksYT1PYmplY3Qua2V5cyxsPU9iamVjdC5jcmVhdGUsZj1mdW5jdGlvbigpe30saD1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIGg/bjp0aGlzIGluc3RhbmNlb2YgaD92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IGgobil9O1widW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzfHxleHBvcnRzLm5vZGVUeXBlP24uXz1oOihcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9aCksZXhwb3J0cy5fPWgpLGguVkVSU0lPTj1cIjEuOS4xXCI7dmFyIHYseT1mdW5jdGlvbih1LGksbil7aWYodm9pZCAwPT09aSlyZXR1cm4gdTtzd2l0Y2gobnVsbD09bj8zOm4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHUuY2FsbChpLG4pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gdS5jYWxsKGksbixyLHQpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB1LmNhbGwoaSxuLHIsdCxlKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHUuYXBwbHkoaSxhcmd1bWVudHMpfX0sZD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguaXRlcmF0ZWUhPT12P2guaXRlcmF0ZWUobixyKTpudWxsPT1uP2guaWRlbnRpdHk6aC5pc0Z1bmN0aW9uKG4pP3kobixyLHQpOmguaXNPYmplY3QobikmJiFoLmlzQXJyYXkobik/aC5tYXRjaGVyKG4pOmgucHJvcGVydHkobil9O2guaXRlcmF0ZWU9dj1mdW5jdGlvbihuLHIpe3JldHVybiBkKG4sciwxLzApfTt2YXIgZz1mdW5jdGlvbih1LGkpe3JldHVybiBpPW51bGw9PWk/dS5sZW5ndGgtMToraSxmdW5jdGlvbigpe2Zvcih2YXIgbj1NYXRoLm1heChhcmd1bWVudHMubGVuZ3RoLWksMCkscj1BcnJheShuKSx0PTA7dDxuO3QrKylyW3RdPWFyZ3VtZW50c1t0K2ldO3N3aXRjaChpKXtjYXNlIDA6cmV0dXJuIHUuY2FsbCh0aGlzLHIpO2Nhc2UgMTpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLHIpO2Nhc2UgMjpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSxyKX12YXIgZT1BcnJheShpKzEpO2Zvcih0PTA7dDxpO3QrKyllW3RdPWFyZ3VtZW50c1t0XTtyZXR1cm4gZVtpXT1yLHUuYXBwbHkodGhpcyxlKX19LG09ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJue307aWYobClyZXR1cm4gbChuKTtmLnByb3RvdHlwZT1uO3ZhciByPW5ldyBmO3JldHVybiBmLnByb3RvdHlwZT1udWxsLHJ9LGI9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP3ZvaWQgMDpuW3JdfX0saj1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsIT1uJiZpLmNhbGwobixyKX0seD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7aWYobnVsbD09bilyZXR1cm47bj1uW3JbZV1dfXJldHVybiB0P246dm9pZCAwfSxfPU1hdGgucG93KDIsNTMpLTEsQT1iKFwibGVuZ3RoXCIpLHc9ZnVuY3Rpb24obil7dmFyIHI9QShuKTtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgciYmMDw9ciYmcjw9X307aC5lYWNoPWguZm9yRWFjaD1mdW5jdGlvbihuLHIsdCl7dmFyIGUsdTtpZihyPXkocix0KSx3KG4pKWZvcihlPTAsdT1uLmxlbmd0aDtlPHU7ZSsrKXIobltlXSxlLG4pO2Vsc2V7dmFyIGk9aC5rZXlzKG4pO2ZvcihlPTAsdT1pLmxlbmd0aDtlPHU7ZSsrKXIobltpW2VdXSxpW2VdLG4pfXJldHVybiBufSxoLm1hcD1oLmNvbGxlY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPUFycmF5KHUpLG89MDtvPHU7bysrKXt2YXIgYT1lP2Vbb106bztpW29dPXIoblthXSxhLG4pfXJldHVybiBpfTt2YXIgTz1mdW5jdGlvbihjKXtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9Mzw9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9IXcobikmJmgua2V5cyhuKSxpPSh1fHxuKS5sZW5ndGgsbz0wPGM/MDppLTE7Zm9yKGV8fCh0PW5bdT91W29dOm9dLG8rPWMpOzA8PW8mJm88aTtvKz1jKXt2YXIgYT11P3Vbb106bzt0PXIodCxuW2FdLGEsbil9cmV0dXJuIHR9KG4seShyLGUsNCksdCx1KX19O2gucmVkdWNlPWguZm9sZGw9aC5pbmplY3Q9TygxKSxoLnJlZHVjZVJpZ2h0PWguZm9sZHI9TygtMSksaC5maW5kPWguZGV0ZWN0PWZ1bmN0aW9uKG4scix0KXt2YXIgZT0odyhuKT9oLmZpbmRJbmRleDpoLmZpbmRLZXkpKG4scix0KTtpZih2b2lkIDAhPT1lJiYtMSE9PWUpcmV0dXJuIG5bZV19LGguZmlsdGVyPWguc2VsZWN0PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT1bXTtyZXR1cm4gZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe2UobixyLHQpJiZ1LnB1c2gobil9KSx1fSxoLnJlamVjdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguZmlsdGVyKG4saC5uZWdhdGUoZChyKSksdCl9LGguZXZlcnk9aC5hbGw9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYoIXIobltvXSxvLG4pKXJldHVybiExfXJldHVybiEwfSxoLnNvbWU9aC5hbnk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYocihuW29dLG8sbikpcmV0dXJuITB9cmV0dXJuITF9LGguY29udGFpbnM9aC5pbmNsdWRlcz1oLmluY2x1ZGU9ZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSwoXCJudW1iZXJcIiE9dHlwZW9mIHR8fGUpJiYodD0wKSwwPD1oLmluZGV4T2YobixyLHQpfSxoLmludm9rZT1nKGZ1bmN0aW9uKG4sdCxlKXt2YXIgdSxpO3JldHVybiBoLmlzRnVuY3Rpb24odCk/aT10OmguaXNBcnJheSh0KSYmKHU9dC5zbGljZSgwLC0xKSx0PXRbdC5sZW5ndGgtMV0pLGgubWFwKG4sZnVuY3Rpb24obil7dmFyIHI9aTtpZighcil7aWYodSYmdS5sZW5ndGgmJihuPXgobix1KSksbnVsbD09bilyZXR1cm47cj1uW3RdfXJldHVybiBudWxsPT1yP3I6ci5hcHBseShuLGUpfSl9KSxoLnBsdWNrPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgubWFwKG4saC5wcm9wZXJ0eShyKSl9LGgud2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maWx0ZXIobixoLm1hdGNoZXIocikpfSxoLmZpbmRXaGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbmQobixoLm1hdGNoZXIocikpfSxoLm1heD1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJmk8dCYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7dT1lKG4scix0KSwobzx1fHx1PT09LTEvMCYmaT09PS0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5taW49ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0xLzAsbz0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmdDxpJiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXsoKHU9ZShuLHIsdCkpPG98fHU9PT0xLzAmJmk9PT0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5zaHVmZmxlPWZ1bmN0aW9uKG4pe3JldHVybiBoLnNhbXBsZShuLDEvMCl9LGguc2FtcGxlPWZ1bmN0aW9uKG4scix0KXtpZihudWxsPT1yfHx0KXJldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksbltoLnJhbmRvbShuLmxlbmd0aC0xKV07dmFyIGU9dyhuKT9oLmNsb25lKG4pOmgudmFsdWVzKG4pLHU9QShlKTtyPU1hdGgubWF4KE1hdGgubWluKHIsdSksMCk7Zm9yKHZhciBpPXUtMSxvPTA7bzxyO28rKyl7dmFyIGE9aC5yYW5kb20obyxpKSxjPWVbb107ZVtvXT1lW2FdLGVbYV09Y31yZXR1cm4gZS5zbGljZSgwLHIpfSxoLnNvcnRCeT1mdW5jdGlvbihuLGUscil7dmFyIHU9MDtyZXR1cm4gZT1kKGUsciksaC5wbHVjayhoLm1hcChuLGZ1bmN0aW9uKG4scix0KXtyZXR1cm57dmFsdWU6bixpbmRleDp1KyssY3JpdGVyaWE6ZShuLHIsdCl9fSkuc29ydChmdW5jdGlvbihuLHIpe3ZhciB0PW4uY3JpdGVyaWEsZT1yLmNyaXRlcmlhO2lmKHQhPT1lKXtpZihlPHR8fHZvaWQgMD09PXQpcmV0dXJuIDE7aWYodDxlfHx2b2lkIDA9PT1lKXJldHVybi0xfXJldHVybiBuLmluZGV4LXIuaW5kZXh9KSxcInZhbHVlXCIpfTt2YXIgaz1mdW5jdGlvbihvLHIpe3JldHVybiBmdW5jdGlvbihlLHUsbil7dmFyIGk9cj9bW10sW11dOnt9O3JldHVybiB1PWQodSxuKSxoLmVhY2goZSxmdW5jdGlvbihuLHIpe3ZhciB0PXUobixyLGUpO28oaSxuLHQpfSksaX19O2guZ3JvdXBCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSksaC5pbmRleEJ5PWsoZnVuY3Rpb24obixyLHQpe25bdF09cn0pLGguY291bnRCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XSsrOm5bdF09MX0pO3ZhciBTPS9bXlxcdWQ4MDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkZmZmXS9nO2gudG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9oLmlzQXJyYXkobik/Yy5jYWxsKG4pOmguaXNTdHJpbmcobik/bi5tYXRjaChTKTp3KG4pP2gubWFwKG4saC5pZGVudGl0eSk6aC52YWx1ZXMobik6W119LGguc2l6ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj8wOncobik/bi5sZW5ndGg6aC5rZXlzKG4pLmxlbmd0aH0saC5wYXJ0aXRpb249ayhmdW5jdGlvbihuLHIsdCl7blt0PzA6MV0ucHVzaChyKX0sITApLGguZmlyc3Q9aC5oZWFkPWgudGFrZT1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uWzBdOmguaW5pdGlhbChuLG4ubGVuZ3RoLXIpfSxoLmluaXRpYWw9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXJ8fHQ/MTpyKSkpfSxoLmxhc3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/bltuLmxlbmd0aC0xXTpoLnJlc3QobixNYXRoLm1heCgwLG4ubGVuZ3RoLXIpKX0saC5yZXN0PWgudGFpbD1oLmRyb3A9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobixudWxsPT1yfHx0PzE6cil9LGguY29tcGFjdD1mdW5jdGlvbihuKXtyZXR1cm4gaC5maWx0ZXIobixCb29sZWFuKX07dmFyIE09ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PShlPWV8fFtdKS5sZW5ndGgsaT0wLG89QShuKTtpPG87aSsrKXt2YXIgYT1uW2ldO2lmKHcoYSkmJihoLmlzQXJyYXkoYSl8fGguaXNBcmd1bWVudHMoYSkpKWlmKHIpZm9yKHZhciBjPTAsbD1hLmxlbmd0aDtjPGw7KWVbdSsrXT1hW2MrK107ZWxzZSBNKGEscix0LGUpLHU9ZS5sZW5ndGg7ZWxzZSB0fHwoZVt1KytdPWEpfXJldHVybiBlfTtoLmZsYXR0ZW49ZnVuY3Rpb24obixyKXtyZXR1cm4gTShuLHIsITEpfSxoLndpdGhvdXQ9ZyhmdW5jdGlvbihuLHIpe3JldHVybiBoLmRpZmZlcmVuY2UobixyKX0pLGgudW5pcT1oLnVuaXF1ZT1mdW5jdGlvbihuLHIsdCxlKXtoLmlzQm9vbGVhbihyKXx8KGU9dCx0PXIscj0hMSksbnVsbCE9dCYmKHQ9ZCh0LGUpKTtmb3IodmFyIHU9W10saT1bXSxvPTAsYT1BKG4pO288YTtvKyspe3ZhciBjPW5bb10sbD10P3QoYyxvLG4pOmM7ciYmIXQ/KG8mJmk9PT1sfHx1LnB1c2goYyksaT1sKTp0P2guY29udGFpbnMoaSxsKXx8KGkucHVzaChsKSx1LnB1c2goYykpOmguY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxoLnVuaW9uPWcoZnVuY3Rpb24obil7cmV0dXJuIGgudW5pcShNKG4sITAsITApKX0pLGguaW50ZXJzZWN0aW9uPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1bXSx0PWFyZ3VtZW50cy5sZW5ndGgsZT0wLHU9QShuKTtlPHU7ZSsrKXt2YXIgaT1uW2VdO2lmKCFoLmNvbnRhaW5zKHIsaSkpe3ZhciBvO2ZvcihvPTE7bzx0JiZoLmNvbnRhaW5zKGFyZ3VtZW50c1tvXSxpKTtvKyspO289PT10JiZyLnB1c2goaSl9fXJldHVybiByfSxoLmRpZmZlcmVuY2U9ZyhmdW5jdGlvbihuLHIpe3JldHVybiByPU0ociwhMCwhMCksaC5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4haC5jb250YWlucyhyLG4pfSl9KSxoLnVuemlwPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1uJiZoLm1heChuLEEpLmxlbmd0aHx8MCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aC5wbHVjayhuLGUpO3JldHVybiB0fSxoLnppcD1nKGgudW56aXApLGgub2JqZWN0PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXt9LGU9MCx1PUEobik7ZTx1O2UrKylyP3RbbltlXV09cltlXTp0W25bZV1bMF1dPW5bZV1bMV07cmV0dXJuIHR9O3ZhciBGPWZ1bmN0aW9uKGkpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPUEobiksdT0wPGk/MDplLTE7MDw9dSYmdTxlO3UrPWkpaWYocihuW3VdLHUsbikpcmV0dXJuIHU7cmV0dXJuLTF9fTtoLmZpbmRJbmRleD1GKDEpLGguZmluZExhc3RJbmRleD1GKC0xKSxoLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0odD1kKHQsZSwxKSkociksaT0wLG89QShuKTtpPG87KXt2YXIgYT1NYXRoLmZsb29yKChpK28pLzIpO3QoblthXSk8dT9pPWErMTpvPWF9cmV0dXJuIGl9O3ZhciBFPWZ1bmN0aW9uKGksbyxhKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3ZhciBlPTAsdT1BKG4pO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KTA8aT9lPTA8PXQ/dDpNYXRoLm1heCh0K3UsZSk6dT0wPD10P01hdGgubWluKHQrMSx1KTp0K3UrMTtlbHNlIGlmKGEmJnQmJnUpcmV0dXJuIG5bdD1hKG4scildPT09cj90Oi0xO2lmKHIhPXIpcmV0dXJuIDA8PSh0PW8oYy5jYWxsKG4sZSx1KSxoLmlzTmFOKSk/dCtlOi0xO2Zvcih0PTA8aT9lOnUtMTswPD10JiZ0PHU7dCs9aSlpZihuW3RdPT09cilyZXR1cm4gdDtyZXR1cm4tMX19O2guaW5kZXhPZj1FKDEsaC5maW5kSW5kZXgsaC5zb3J0ZWRJbmRleCksaC5sYXN0SW5kZXhPZj1FKC0xLGguZmluZExhc3RJbmRleCksaC5yYW5nZT1mdW5jdGlvbihuLHIsdCl7bnVsbD09ciYmKHI9bnx8MCxuPTApLHR8fCh0PXI8bj8tMToxKTtmb3IodmFyIGU9TWF0aC5tYXgoTWF0aC5jZWlsKChyLW4pL3QpLDApLHU9QXJyYXkoZSksaT0wO2k8ZTtpKyssbis9dCl1W2ldPW47cmV0dXJuIHV9LGguY2h1bms9ZnVuY3Rpb24obixyKXtpZihudWxsPT1yfHxyPDEpcmV0dXJuW107Zm9yKHZhciB0PVtdLGU9MCx1PW4ubGVuZ3RoO2U8dTspdC5wdXNoKGMuY2FsbChuLGUsZSs9cikpO3JldHVybiB0fTt2YXIgTj1mdW5jdGlvbihuLHIsdCxlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHIpKXJldHVybiBuLmFwcGx5KHQsdSk7dmFyIGk9bShuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIGguaXNPYmplY3Qobyk/bzppfTtoLmJpbmQ9ZyhmdW5jdGlvbihyLHQsZSl7aWYoIWguaXNGdW5jdGlvbihyKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciB1PWcoZnVuY3Rpb24obil7cmV0dXJuIE4ocix1LHQsdGhpcyxlLmNvbmNhdChuKSl9KTtyZXR1cm4gdX0pLGgucGFydGlhbD1nKGZ1bmN0aW9uKHUsaSl7dmFyIG89aC5wYXJ0aWFsLnBsYWNlaG9sZGVyLGE9ZnVuY3Rpb24oKXtmb3IodmFyIG49MCxyPWkubGVuZ3RoLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1pW2VdPT09bz9hcmd1bWVudHNbbisrXTppW2VdO2Zvcig7bjxhcmd1bWVudHMubGVuZ3RoOyl0LnB1c2goYXJndW1lbnRzW24rK10pO3JldHVybiBOKHUsYSx0aGlzLHRoaXMsdCl9O3JldHVybiBhfSksKGgucGFydGlhbC5wbGFjZWhvbGRlcj1oKS5iaW5kQWxsPWcoZnVuY3Rpb24obixyKXt2YXIgdD0ocj1NKHIsITEsITEpKS5sZW5ndGg7aWYodDwxKXRocm93IG5ldyBFcnJvcihcImJpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXNcIik7Zm9yKDt0LS07KXt2YXIgZT1yW3RdO25bZV09aC5iaW5kKG5bZV0sbil9fSksaC5tZW1vaXplPWZ1bmN0aW9uKGUsdSl7dmFyIGk9ZnVuY3Rpb24obil7dmFyIHI9aS5jYWNoZSx0PVwiXCIrKHU/dS5hcHBseSh0aGlzLGFyZ3VtZW50cyk6bik7cmV0dXJuIGoocix0KXx8KHJbdF09ZS5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHJbdF19O3JldHVybiBpLmNhY2hlPXt9LGl9LGguZGVsYXk9ZyhmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gbi5hcHBseShudWxsLHQpfSxyKX0pLGguZGVmZXI9aC5wYXJ0aWFsKGguZGVsYXksaCwxKSxoLnRocm90dGxlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGEsYyxsPTA7dXx8KHU9e30pO3ZhciBmPWZ1bmN0aW9uKCl7bD0hMT09PXUubGVhZGluZz8wOmgubm93KCksaT1udWxsLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCl9LG49ZnVuY3Rpb24oKXt2YXIgbj1oLm5vdygpO2x8fCExIT09dS5sZWFkaW5nfHwobD1uKTt2YXIgcj1lLShuLWwpO3JldHVybiBvPXRoaXMsYT1hcmd1bWVudHMscjw9MHx8ZTxyPyhpJiYoY2xlYXJUaW1lb3V0KGkpLGk9bnVsbCksbD1uLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCkpOml8fCExPT09dS50cmFpbGluZ3x8KGk9c2V0VGltZW91dChmLHIpKSxjfTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksbD0wLGk9bz1hPW51bGx9LG59LGguZGVib3VuY2U9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYT1mdW5jdGlvbihuLHIpe2k9bnVsbCxyJiYobz10LmFwcGx5KG4scikpfSxuPWcoZnVuY3Rpb24obil7aWYoaSYmY2xlYXJUaW1lb3V0KGkpLHUpe3ZhciByPSFpO2k9c2V0VGltZW91dChhLGUpLHImJihvPXQuYXBwbHkodGhpcyxuKSl9ZWxzZSBpPWguZGVsYXkoYSxlLHRoaXMsbik7cmV0dXJuIG99KTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksaT1udWxsfSxufSxoLndyYXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5wYXJ0aWFsKHIsbil9LGgubmVnYXRlPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguY29tcG9zZT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPXQubGVuZ3RoLTE7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWUscj10W2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtuLS07KXI9dFtuXS5jYWxsKHRoaXMscik7cmV0dXJuIHJ9fSxoLmFmdGVyPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKCl7aWYoLS1uPDEpcmV0dXJuIHIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5iZWZvcmU9ZnVuY3Rpb24obixyKXt2YXIgdDtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJih0PXIuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxuPD0xJiYocj1udWxsKSx0fX0saC5vbmNlPWgucGFydGlhbChoLmJlZm9yZSwyKSxoLnJlc3RBcmd1bWVudHM9Zzt2YXIgST0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksVD1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXSxCPWZ1bmN0aW9uKG4scil7dmFyIHQ9VC5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9aC5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8byxpPVwiY29uc3RydWN0b3JcIjtmb3IoaihuLGkpJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSk7dC0tOykoaT1UW3RdKWluIG4mJm5baV0hPT11W2ldJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSl9O2gua2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTtpZihhKXJldHVybiBhKG4pO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWoobix0KSYmci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC5hbGxLZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKXIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGgudmFsdWVzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09bltyW3VdXTtyZXR1cm4gZX0saC5tYXBPYmplY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1oLmtleXMobiksdT1lLmxlbmd0aCxpPXt9LG89MDtvPHU7bysrKXt2YXIgYT1lW29dO2lbYV09cihuW2FdLGEsbil9cmV0dXJuIGl9LGgucGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1bclt1XSxuW3JbdV1dXTtyZXR1cm4gZX0saC5pbnZlcnQ9ZnVuY3Rpb24obil7Zm9yKHZhciByPXt9LHQ9aC5rZXlzKG4pLGU9MCx1PXQubGVuZ3RoO2U8dTtlKyspcltuW3RbZV1dXT10W2VdO3JldHVybiByfSxoLmZ1bmN0aW9ucz1oLm1ldGhvZHM9ZnVuY3Rpb24obil7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paC5pc0Z1bmN0aW9uKG5bdF0pJiZyLnB1c2godCk7cmV0dXJuIHIuc29ydCgpfTt2YXIgUj1mdW5jdGlvbihjLGwpe3JldHVybiBmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO2lmKGwmJihuPU9iamVjdChuKSkscjwyfHxudWxsPT1uKXJldHVybiBuO2Zvcih2YXIgdD0xO3Q8cjt0KyspZm9yKHZhciBlPWFyZ3VtZW50c1t0XSx1PWMoZSksaT11Lmxlbmd0aCxvPTA7bzxpO28rKyl7dmFyIGE9dVtvXTtsJiZ2b2lkIDAhPT1uW2FdfHwoblthXT1lW2FdKX1yZXR1cm4gbn19O2guZXh0ZW5kPVIoaC5hbGxLZXlzKSxoLmV4dGVuZE93bj1oLmFzc2lnbj1SKGgua2V5cyksaC5maW5kS2V5PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGUsdT1oLmtleXMobiksaT0wLG89dS5sZW5ndGg7aTxvO2krKylpZihyKG5bZT11W2ldXSxlLG4pKXJldHVybiBlfTt2YXIgcSxLLHo9ZnVuY3Rpb24obixyLHQpe3JldHVybiByIGluIHR9O2gucGljaz1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9e30sZT1yWzBdO2lmKG51bGw9PW4pcmV0dXJuIHQ7aC5pc0Z1bmN0aW9uKGUpPygxPHIubGVuZ3RoJiYoZT15KGUsclsxXSkpLHI9aC5hbGxLZXlzKG4pKTooZT16LHI9TShyLCExLCExKSxuPU9iamVjdChuKSk7Zm9yKHZhciB1PTAsaT1yLmxlbmd0aDt1PGk7dSsrKXt2YXIgbz1yW3VdLGE9bltvXTtlKGEsbyxuKSYmKHRbb109YSl9cmV0dXJuIHR9KSxoLm9taXQ9ZyhmdW5jdGlvbihuLHQpe3ZhciByLGU9dFswXTtyZXR1cm4gaC5pc0Z1bmN0aW9uKGUpPyhlPWgubmVnYXRlKGUpLDE8dC5sZW5ndGgmJihyPXRbMV0pKToodD1oLm1hcChNKHQsITEsITEpLFN0cmluZyksZT1mdW5jdGlvbihuLHIpe3JldHVybiFoLmNvbnRhaW5zKHQscil9KSxoLnBpY2sobixlLHIpfSksaC5kZWZhdWx0cz1SKGguYWxsS2V5cywhMCksaC5jcmVhdGU9ZnVuY3Rpb24obixyKXt2YXIgdD1tKG4pO3JldHVybiByJiZoLmV4dGVuZE93bih0LHIpLHR9LGguY2xvbmU9ZnVuY3Rpb24obil7cmV0dXJuIGguaXNPYmplY3Qobik/aC5pc0FycmF5KG4pP24uc2xpY2UoKTpoLmV4dGVuZCh7fSxuKTpufSxoLnRhcD1mdW5jdGlvbihuLHIpe3JldHVybiByKG4pLG59LGguaXNNYXRjaD1mdW5jdGlvbihuLHIpe3ZhciB0PWgua2V5cyhyKSxlPXQubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKHZhciB1PU9iamVjdChuKSxpPTA7aTxlO2krKyl7dmFyIG89dFtpXTtpZihyW29dIT09dVtvXXx8IShvIGluIHUpKXJldHVybiExfXJldHVybiEwfSxxPWZ1bmN0aW9uKG4scix0LGUpe2lmKG49PT1yKXJldHVybiAwIT09bnx8MS9uPT0xL3I7aWYobnVsbD09bnx8bnVsbD09cilyZXR1cm4hMTtpZihuIT1uKXJldHVybiByIT1yO3ZhciB1PXR5cGVvZiBuO3JldHVybihcImZ1bmN0aW9uXCI9PT11fHxcIm9iamVjdFwiPT09dXx8XCJvYmplY3RcIj09dHlwZW9mIHIpJiZLKG4scix0LGUpfSxLPWZ1bmN0aW9uKG4scix0LGUpe24gaW5zdGFuY2VvZiBoJiYobj1uLl93cmFwcGVkKSxyIGluc3RhbmNlb2YgaCYmKHI9ci5fd3JhcHBlZCk7dmFyIHU9cC5jYWxsKG4pO2lmKHUhPT1wLmNhbGwocikpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIityO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT0rbj8rciE9K3I6MD09K24/MS8rbj09MS9yOituPT0rcjtjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOnJldHVybituPT0rcjtjYXNlXCJbb2JqZWN0IFN5bWJvbF1cIjpyZXR1cm4gcy52YWx1ZU9mLmNhbGwobik9PT1zLnZhbHVlT2YuY2FsbChyKX12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHIpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXIuY29uc3RydWN0b3I7aWYobyE9PWEmJiEoaC5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmaC5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHIpcmV0dXJuITF9ZT1lfHxbXTtmb3IodmFyIGM9KHQ9dHx8W10pLmxlbmd0aDtjLS07KWlmKHRbY109PT1uKXJldHVybiBlW2NdPT09cjtpZih0LnB1c2gobiksZS5wdXNoKHIpLGkpe2lmKChjPW4ubGVuZ3RoKSE9PXIubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighcShuW2NdLHJbY10sdCxlKSlyZXR1cm4hMX1lbHNle3ZhciBsLGY9aC5rZXlzKG4pO2lmKGM9Zi5sZW5ndGgsaC5rZXlzKHIpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGw9ZltjXSwhaihyLGwpfHwhcShuW2xdLHJbbF0sdCxlKSlyZXR1cm4hMX1yZXR1cm4gdC5wb3AoKSxlLnBvcCgpLCEwfSxoLmlzRXF1YWw9ZnVuY3Rpb24obixyKXtyZXR1cm4gcShuLHIpfSxoLmlzRW1wdHk9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW58fCh3KG4pJiYoaC5pc0FycmF5KG4pfHxoLmlzU3RyaW5nKG4pfHxoLmlzQXJndW1lbnRzKG4pKT8wPT09bi5sZW5ndGg6MD09PWgua2V5cyhuKS5sZW5ndGgpfSxoLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4hKCFufHwxIT09bi5ub2RlVHlwZSl9LGguaXNBcnJheT10fHxmdW5jdGlvbihuKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1wLmNhbGwobil9LGguaXNPYmplY3Q9ZnVuY3Rpb24obil7dmFyIHI9dHlwZW9mIG47cmV0dXJuXCJmdW5jdGlvblwiPT09cnx8XCJvYmplY3RcIj09PXImJiEhbn0saC5lYWNoKFtcIkFyZ3VtZW50c1wiLFwiRnVuY3Rpb25cIixcIlN0cmluZ1wiLFwiTnVtYmVyXCIsXCJEYXRlXCIsXCJSZWdFeHBcIixcIkVycm9yXCIsXCJTeW1ib2xcIixcIk1hcFwiLFwiV2Vha01hcFwiLFwiU2V0XCIsXCJXZWFrU2V0XCJdLGZ1bmN0aW9uKHIpe2hbXCJpc1wiK3JdPWZ1bmN0aW9uKG4pe3JldHVybiBwLmNhbGwobik9PT1cIltvYmplY3QgXCIrcitcIl1cIn19KSxoLmlzQXJndW1lbnRzKGFyZ3VtZW50cyl8fChoLmlzQXJndW1lbnRzPWZ1bmN0aW9uKG4pe3JldHVybiBqKG4sXCJjYWxsZWVcIil9KTt2YXIgRD1uLmRvY3VtZW50JiZuLmRvY3VtZW50LmNoaWxkTm9kZXM7XCJmdW5jdGlvblwiIT10eXBlb2YvLi8mJlwib2JqZWN0XCIhPXR5cGVvZiBJbnQ4QXJyYXkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIEQmJihoLmlzRnVuY3Rpb249ZnVuY3Rpb24obil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8ITF9KSxoLmlzRmluaXRlPWZ1bmN0aW9uKG4pe3JldHVybiFoLmlzU3ltYm9sKG4pJiZpc0Zpbml0ZShuKSYmIWlzTmFOKHBhcnNlRmxvYXQobikpfSxoLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTnVtYmVyKG4pJiZpc05hTihuKX0saC5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuITA9PT1ufHwhMT09PW58fFwiW29iamVjdCBCb29sZWFuXVwiPT09cC5jYWxsKG4pfSxoLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LGguaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIHZvaWQgMD09PW59LGguaGFzPWZ1bmN0aW9uKG4scil7aWYoIWguaXNBcnJheShyKSlyZXR1cm4gaihuLHIpO2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7dmFyIHU9cltlXTtpZihudWxsPT1ufHwhaS5jYWxsKG4sdSkpcmV0dXJuITE7bj1uW3VdfXJldHVybiEhdH0saC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4uXz1yLHRoaXN9LGguaWRlbnRpdHk9ZnVuY3Rpb24obil7cmV0dXJuIG59LGguY29uc3RhbnQ9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG59fSxoLm5vb3A9ZnVuY3Rpb24oKXt9LGgucHJvcGVydHk9ZnVuY3Rpb24ocil7cmV0dXJuIGguaXNBcnJheShyKT9mdW5jdGlvbihuKXtyZXR1cm4geChuLHIpfTpiKHIpfSxoLnByb3BlcnR5T2Y9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGw9PXI/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKG4pe3JldHVybiBoLmlzQXJyYXkobik/eChyLG4pOnJbbl19fSxoLm1hdGNoZXI9aC5tYXRjaGVzPWZ1bmN0aW9uKHIpe3JldHVybiByPWguZXh0ZW5kT3duKHt9LHIpLGZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTWF0Y2gobixyKX19LGgudGltZXM9ZnVuY3Rpb24obixyLHQpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3I9eShyLHQsMSk7Zm9yKHZhciB1PTA7dTxuO3UrKyllW3VdPXIodSk7cmV0dXJuIGV9LGgucmFuZG9tPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGw9PXImJihyPW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooci1uKzEpKX0saC5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBMPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sUD1oLmludmVydChMKSxXPWZ1bmN0aW9uKHIpe3ZhciB0PWZ1bmN0aW9uKG4pe3JldHVybiByW25dfSxuPVwiKD86XCIraC5rZXlzKHIpLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKG4pLHU9UmVnRXhwKG4sXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07aC5lc2NhcGU9VyhMKSxoLnVuZXNjYXBlPVcoUCksaC5yZXN1bHQ9ZnVuY3Rpb24obixyLHQpe2guaXNBcnJheShyKXx8KHI9W3JdKTt2YXIgZT1yLmxlbmd0aDtpZighZSlyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP3QuY2FsbChuKTp0O2Zvcih2YXIgdT0wO3U8ZTt1Kyspe3ZhciBpPW51bGw9PW4/dm9pZCAwOm5bclt1XV07dm9pZCAwPT09aSYmKGk9dCx1PWUpLG49aC5pc0Z1bmN0aW9uKGkpP2kuY2FsbChuKTppfXJldHVybiBufTt2YXIgQz0wO2gudW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHI9KytDK1wiXCI7cmV0dXJuIG4/bityOnJ9LGgudGVtcGxhdGVTZXR0aW5ncz17ZXZhbHVhdGU6LzwlKFtcXHNcXFNdKz8pJT4vZyxpbnRlcnBvbGF0ZTovPCU9KFtcXHNcXFNdKz8pJT4vZyxlc2NhcGU6LzwlLShbXFxzXFxTXSs/KSU+L2d9O3ZhciBKPS8oLileLyxVPXtcIidcIjpcIidcIixcIlxcXFxcIjpcIlxcXFxcIixcIlxcclwiOlwiclwiLFwiXFxuXCI6XCJuXCIsXCJcXHUyMDI4XCI6XCJ1MjAyOFwiLFwiXFx1MjAyOVwiOlwidTIwMjlcIn0sVj0vXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2csJD1mdW5jdGlvbihuKXtyZXR1cm5cIlxcXFxcIitVW25dfTtoLnRlbXBsYXRlPWZ1bmN0aW9uKGksbixyKXshbiYmciYmKG49ciksbj1oLmRlZmF1bHRzKHt9LG4saC50ZW1wbGF0ZVNldHRpbmdzKTt2YXIgdCxlPVJlZ0V4cChbKG4uZXNjYXBlfHxKKS5zb3VyY2UsKG4uaW50ZXJwb2xhdGV8fEopLnNvdXJjZSwobi5ldmFsdWF0ZXx8Sikuc291cmNlXS5qb2luKFwifFwiKStcInwkXCIsXCJnXCIpLG89MCxhPVwiX19wKz0nXCI7aS5yZXBsYWNlKGUsZnVuY3Rpb24obixyLHQsZSx1KXtyZXR1cm4gYSs9aS5zbGljZShvLHUpLnJlcGxhY2UoViwkKSxvPXUrbi5sZW5ndGgscj9hKz1cIicrXFxuKChfX3Q9KFwiK3IrXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI6dD9hKz1cIicrXFxuKChfX3Q9KFwiK3QrXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjplJiYoYSs9XCInO1xcblwiK2UrXCJcXG5fX3ArPSdcIiksbn0pLGErPVwiJztcXG5cIixuLnZhcmlhYmxlfHwoYT1cIndpdGgob2JqfHx7fSl7XFxuXCIrYStcIn1cXG5cIiksYT1cInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIitcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIrYStcInJldHVybiBfX3A7XFxuXCI7dHJ5e3Q9bmV3IEZ1bmN0aW9uKG4udmFyaWFibGV8fFwib2JqXCIsXCJfXCIsYSl9Y2F0Y2gobil7dGhyb3cgbi5zb3VyY2U9YSxufXZhciB1PWZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwodGhpcyxuLGgpfSxjPW4udmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIHUuc291cmNlPVwiZnVuY3Rpb24oXCIrYytcIil7XFxuXCIrYStcIn1cIix1fSxoLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciByPWgobik7cmV0dXJuIHIuX2NoYWluPSEwLHJ9O3ZhciBHPWZ1bmN0aW9uKG4scil7cmV0dXJuIG4uX2NoYWluP2gocikuY2hhaW4oKTpyfTtoLm1peGluPWZ1bmN0aW9uKHQpe3JldHVybiBoLmVhY2goaC5mdW5jdGlvbnModCksZnVuY3Rpb24obil7dmFyIHI9aFtuXT10W25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49W3RoaXMuX3dyYXBwZWRdO3JldHVybiB1LmFwcGx5KG4sYXJndW1lbnRzKSxHKHRoaXMsci5hcHBseShoLG4pKX19KSxofSxoLm1peGluKGgpLGguZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24ocil7dmFyIHQ9ZVtyXTtoLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpLFwic2hpZnRcIiE9PXImJlwic3BsaWNlXCIhPT1yfHwwIT09bi5sZW5ndGh8fGRlbGV0ZSBuWzBdLEcodGhpcyxuKX19KSxoLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgcj1lW25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIEcodGhpcyxyLmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksaC5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0saC5wcm90b3R5cGUudmFsdWVPZj1oLnByb3RvdHlwZS50b0pTT049aC5wcm90b3R5cGUudmFsdWUsaC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gU3RyaW5nKHRoaXMuX3dyYXBwZWQpfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcInVuZGVyc2NvcmVcIixbXSxmdW5jdGlvbigpe3JldHVybiBofSl9KCk7XHJcbiIsImltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbn0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1J0bXAgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgaWYoZmlsZSl7XHJcbiAgICAgICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3J0bXA6JykgPT0gMCB8fCB0eXBlID09ICdydG1wJyk7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc1dlYlJUQyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICBpZihmaWxlKXtcclxuICAgICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZignd3M6JykgPT09IDAgfHwgZmlsZS5pbmRleE9mKCd3c3M6JykgPT09IDAgfHwgdHlwZSA9PT0gJ3dlYnJ0YycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgaXNIbHMgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgaWYoZmlsZSl7XHJcbiAgICAgICAgcmV0dXJuICggdHlwZSA9PT0gJ2hscycgfHwgIHR5cGUgPT09ICdtM3U4JyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ20zdTgnKTtcclxuXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc0Rhc2ggPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgaWYoZmlsZSl7XHJcbiAgICAgICAgcmV0dXJuICggdHlwZSA9PT0gJ21wZCcgfHwgIHR5cGUgPT09ICdkYXNoJyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vZGFzaCt4bWwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ21wZCcpO1xyXG5cclxuICAgIH1cclxufTtcclxuIiwiLyoqXHJcbiAqIHV0aWxzIGZvciB3ZWJwYWNrXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFNjcmlwdFBhdGggPSBmdW5jdGlvbihzY3JpcHROYW1lKSB7XHJcbiAgICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3Qgc3JjID0gc2NyaXB0c1tpXS5zcmM7XHJcbiAgICAgICAgaWYgKHNyYykge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNyYy5sYXN0SW5kZXhPZignLycgKyBzY3JpcHROYW1lKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzcmMuc3Vic3RyKDAsIGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjkuLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSBfX1ZFUlNJT05fXztcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==