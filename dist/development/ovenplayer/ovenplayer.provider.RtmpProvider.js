/*! ovenplayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (MIT) | Github : https://ovenplayer.com */
(window["webpackJsonpOvenPlayer"] = window["webpackJsonpOvenPlayer"] || []).push([["ovenplayer.provider.RtmpProvider"],{

/***/ "./src/js/api/provider/flash/Listener.js":
/*!***********************************************!*\
  !*** ./src/js/api/provider/flash/Listener.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var Listener = function Listener(elFlash, provider, videoEndedCallback) {
    var that = {};

    that.isJSReady = function () {
        return true;
    };
    that.timeupdate = function (data) {

        elFlash.currentTime = data.position;
        provider.trigger(_constants.CONTENT_TIME, data);
        //provider.trigger(CONTENT_BUFFER, data);
        //data.duration-1 : this is trick. because sometimes rtmp's position < duration when video ended.
        //2019-06-07 : Do not use duration-1 trick anymore. I improved SWF player.
        /*if(data.position >= (data.duration-1)){
            if(provider.getState() !== STATE_IDLE && provider.getState() !== STATE_COMPLETE){
                if(videoEndedCallback){
                    videoEndedCallback(function(){
                        provider.setState(STATE_COMPLETE);
                    });
                }else{
                    provider.setState(STATE_COMPLETE);
                }
              }
        }*/
    };
    that.volumeChanged = function (data) {
        provider.trigger(_constants.CONTENT_VOLUME, data);
    };
    that.stateChanged = function (data) {
        provider.setState(data.newstate);
    };
    that.metaChanged = function (data) {
        provider.trigger(_constants.CONTENT_META, data);
    };
    that.error = function (error) {
        provider.setState(_constants.STATE_ERROR);
        provider.pause();

        //PRIVATE_STATE_ERROR
        provider.trigger(_constants.ERROR, error);
    };
    return that;
}; /**
    * Created by hoho on 2018. 8. 27..
    */
exports["default"] = Listener;

/***/ }),

/***/ "./src/js/api/provider/flash/Provider.js":
/*!***********************************************!*\
  !*** ./src/js/api/provider/flash/Provider.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Ad = __webpack_require__(/*! api/ads/ima/Ad */ "./src/js/api/ads/ima/Ad.js");

var _Ad2 = _interopRequireDefault(_Ad);

var _Ad3 = __webpack_require__(/*! api/ads/vast/Ad */ "./src/js/api/ads/vast/Ad.js");

var _Ad4 = _interopRequireDefault(_Ad3);

var _EventEmitter = __webpack_require__(/*! api/EventEmitter */ "./src/js/api/EventEmitter.js");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _Listener = __webpack_require__(/*! api/provider/flash/Listener */ "./src/js/api/provider/flash/Listener.js");

var _Listener2 = _interopRequireDefault(_Listener);

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   Core For Flash Video.
 * @param   spec member value
 * @param   playerConfig  player config
 * */

/**
 * Created by hoho on 2018. 8. 23..
 */
var Provider = function Provider(spec, playerConfig) {
    OvenPlayerConsole.log("CORE loaded. ");

    var that = {};
    (0, _EventEmitter2["default"])(that);

    var elFlash = spec.element;
    var ads = null,
        listener = null,
        videoEndedCallback = null;

    //It means to support ad for flash. Set the same specifications like a Video Tag.
    Object.defineProperty(elFlash, 'currentTime', { value: 0, writable: true });

    if (spec.adTagUrl) {
        OvenPlayerConsole.log("[Provider] Ad Client - ", playerConfig.getAdClient());
        if (playerConfig.getAdClient() === _constants.AD_CLIENT_VAST) {
            ads = (0, _Ad4["default"])(elFlash, that, playerConfig, spec.adTagUrl);
        } else {
            ads = (0, _Ad2["default"])(elFlash, that, playerConfig, spec.adTagUrl);
        }

        if (!ads) {
            console.log("Can not load due to google ima for Ads.");
        }
    }
    listener = (0, _Listener2["default"])(elFlash, that, ads ? ads.videoEndedCallback : null);

    var _load = function _load(lastPlayPosition) {

        var source = spec.sources[spec.currentSource];
        OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : " + lastPlayPosition);
        var previousSource = elFlash.getCurrentSource();

        var sourceChanged = source.file !== previousSource;
        if (sourceChanged) {
            elFlash.load(source.file);
        } else if (lastPlayPosition === 0 && that.getPosition() > 0) {
            that.seek(lastPlayPosition);
        }
    };
    //Flash has two init states. FlashLoaded and FileLoaded.
    //_load calls after FlashLoaded. _afterLoad calls after FileLoaded.
    var _afterLoad = function _afterLoad(lastPlayPosition) {
        spec.isLoaded = true;
        if (lastPlayPosition > 0) {
            if (!playerConfig.isAutoStart()) {
                that.play();
            }
            that.seek(lastPlayPosition);
        }
        if (playerConfig.isAutoStart()) {

            that.play();
        }
    };

    //This is why. Flash does not self trig to ads,lmalm,
    that.triggerEventFromExternal = function (funcName, funcData) {
        if (listener[funcName]) {
            return listener[funcName](funcData);
        } else {
            return null;
        }
    };
    that.getName = function () {
        return spec.name;
    };

    that.canSeek = function () {
        return spec.canSeek;
    };
    that.setCanSeek = function (canSeek) {
        spec.canSeek = canSeek;
    };
    that.isSeeking = function () {
        return spec.seeking;
    };
    that.setSeeking = function (seeking) {
        spec.seeking = seeking;
    };
    that.setMetaLoaded = function () {
        spec.isLoaded = true;
    };
    that.metaLoaded = function () {
        return spec.isLoaded;
    };
    that.setState = function (newState) {
        if (spec.state !== newState) {
            var prevState = spec.state;
            //ToDo : This is temporary code. avoid background content error.
            if (prevState === _constants.STATE_AD_PLAYING && (newState === _constants.STATE_ERROR || newState === _constants.STATE_IDLE)) {
                return false;
            }
            /*
             * 2019-06-13
             * No more necessary this codes.
             * Checking the autoPlay support was using main video element. elVideo.play() -> yes or no??
             * And then that causes triggering play and pause event.
             * And that checking waits for elVideo loaded. Dash load completion time is unknown.
             * Then I changed check method. I make temporary video tag and insert empty video.
             * */
            //if ((prevState === STATE_AD_PLAYING || prevState === STATE_AD_PAUSED ) && (newState === STATE_PAUSED || newState === STATE_PLAYING)) {
            //    return false;
            //Ads checks checkAutoplaySupport(). It calls real play() and pause() to video element.
            //And then that triggers "playing" and "pause".
            //I prevent these process.
            //}
            switch (newState) {
                case _constants.STATE_COMPLETE:
                    that.trigger(_constants.PLAYER_COMPLETE);
                    break;
                case _constants.STATE_PAUSED:
                    that.trigger(_constants.PLAYER_PAUSE, {
                        prevState: spec.state,
                        newstate: _constants.STATE_PAUSED
                    });
                    break;
                case _constants.STATE_AD_PAUSED:
                    that.trigger(_constants.PLAYER_PAUSE, {
                        prevState: spec.state,
                        newstate: _constants.STATE_AD_PAUSED
                    });
                    break;
                case _constants.STATE_PLAYING:
                    that.trigger(_constants.PLAYER_PLAY, {
                        prevState: spec.state,
                        newstate: _constants.STATE_PLAYING
                    });
                case _constants.STATE_AD_PLAYING:
                    that.trigger(_constants.PLAYER_PLAY, {
                        prevState: spec.state,
                        newstate: _constants.STATE_AD_PLAYING
                    });
                    break;
            }
            spec.state = newState;
            that.trigger(_constants.PLAYER_STATE, {
                prevstate: prevState,
                newstate: spec.state
            });
        }
    };
    that.getState = function () {
        return spec.state;
    };
    that.setBuffer = function (newBuffer) {};
    that.getBuffer = function () {
        if (!elFlash) {
            return;
        }
        return elFlash.getBuffer ? elFlash.getBuffer() : null;
    };
    that.getDuration = function () {
        if (!elFlash) {
            return;
        }
        return elFlash.getDuration ? elFlash.getDuration() : 0;
    };
    that.getPosition = function () {
        if (!elFlash) {
            return;
        }
        return elFlash.getPosition ? elFlash.getPosition() : 0;
    };
    that.setVolume = function (volume) {
        if (!elFlash) {
            return;
        }
        return elFlash.setVolume ? elFlash.setVolume(volume) : 0;
    };
    that.getVolume = function () {
        if (!elFlash) {
            return;
        }
        return elFlash.setVolume ? elFlash.getVolume() : 0;
    };
    that.setMute = function () {
        if (!elFlash) {
            return;
        }
        elFlash.setMute();
    };
    that.getMute = function () {
        if (!elFlash) {
            return;
        }
        return elFlash.getMute ? elFlash.getMute() : false;
    };

    that.preload = function (sources, lastPlayPosition) {
        OvenPlayerConsole.log("CORE : preload() ", sources, lastPlayPosition);
        var retryCount = 0;

        spec.sources = sources;
        spec.currentSource = (0, _utils.pickCurrentSource)(sources, spec.currentSource, playerConfig);

        return new Promise(function (resolve, reject) {
            //First : checkSwfIsReady -> It checks swf loading complete by polling.
            //Second : checkFileLoaded -> It checks src loading complete by polling too.
            //Why complex is it? -> It againsts flash timing issue.
            (function checkSwfIsReady() {
                retryCount++;
                if (elFlash.isFlashReady && elFlash.isFlashReady()) {
                    Object.defineProperty(elFlash, 'duration', { value: elFlash.getDuration() });
                    _load(lastPlayPosition || 0);
                    retryCount = 0;

                    return function checkFileLoaded() {
                        retryCount++;
                        if (elFlash.isFileLoaded && elFlash.isFileLoaded()) {
                            _afterLoad(lastPlayPosition);
                            if (playerConfig.isMute()) {
                                that.setMute(true);
                            }
                            if (playerConfig.getVolume() && playerConfig.getVolume() < 100) {
                                that.setVolume(playerConfig.getVolume());
                            }

                            return resolve();
                        } else {

                            if (retryCount < 300) {
                                setTimeout(checkFileLoaded, 100);
                            } else {
                                return reject(_constants.ERRORS.codes[_constants.INIT_RTMP_SETUP_ERROR]);
                            }
                        }
                    }();
                } else {
                    if (retryCount < 100) {
                        setTimeout(checkSwfIsReady, 100);
                    } else {
                        return reject(_constants.ERRORS.codes[_constants.INIT_RTMP_SETUP_ERROR]);
                    }
                }
            })();
        });
    };
    that.load = function (sources) {
        spec.sources = sources;
        spec.currentSource = (0, _utils.pickCurrentSource)(sources, spec.currentSource, playerConfig);
        _load(0); //spec.sources_.starttime ||
        _afterLoad(0);
    };

    that.play = function () {
        if (!elFlash) {
            return false;
        }
        if (that.getState() !== _constants.STATE_PLAYING) {
            if (ads && ads.isActive() || ads && !ads.started()) {
                ads.play();
            } else {
                elFlash.play();
            }
        }
    };
    that.pause = function () {
        if (!elFlash) {
            return false;
        }
        if (that.getState() === _constants.STATE_PLAYING) {
            elFlash.pause();
        } else if (that.getState() === _constants.STATE_AD_PLAYING) {
            ads.pause();
        }
    };
    that.seek = function (position) {
        elFlash.seek(position);
    };
    that.setPlaybackRate = function (playbackRate) {
        return 0;
    };
    that.getPlaybackRate = function () {
        return 0;
    };
    that.getSources = function () {
        if (!elFlash) {
            return [];
        }

        return spec.sources.map(function (source, index) {
            return {
                file: source.file,
                type: source.type,
                label: source.label,
                index: index
            };
        });
    };
    that.getCurrentSource = function () {
        return spec.currentSource;
    };
    that.setCurrentSource = function (sourceIndex, needProviderChange) {
        if (spec.currentQuality === sourceIndex) {
            return false;
        }

        if (sourceIndex > -1) {
            if (spec.sources && spec.sources.length > sourceIndex) {
                that.pause();
                that.setState(_constants.STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + sourceIndex);
                spec.currentSource = sourceIndex;

                that.trigger(_constants.CONTENT_SOURCE_CHANGED, {
                    currentSource: sourceIndex
                });

                playerConfig.setSourceIndex(sourceIndex);
                //playerConfig.setSourceLabel(spec.sources[sourceIndex].label);

                if (needProviderChange) {
                    var lastPlayPosition = elFlash.getCurrentTime() || 0;
                    var retryCount = 0;
                    _load(lastPlayPosition);

                    (function checkFileLoaded() {
                        retryCount++;
                        if (elFlash.isFileLoaded && elFlash.isFileLoaded()) {
                            _afterLoad(lastPlayPosition);
                        } else {

                            if (retryCount < 300) {
                                setTimeout(checkFileLoaded, 100);
                            } else {
                                console.log("FileLoad failed");
                            }
                        }
                    })();
                }
                return spec.currentSource;
            }
        }
    };

    that.getQualityLevels = function () {
        if (!elFlash) {
            return [];
        }
        return spec.qualityLevels;
    };
    that.getCurrentQuality = function () {
        if (!elFlash) {
            return null;
        }
        return spec.currentQuality;
    };
    that.setCurrentQuality = function (qualityIndex) {
        //Do nothing
    };
    that.isAutoQuality = function () {
        //Do nothing
    };
    that.setAutoQuality = function (isAuto) {
        //Do nothing
    };
    that.getFramerate = function () {
        return spec.framerate;
    };
    that.setFramerate = function (framerate) {
        return spec.framerate = framerate;
    };
    that.seekFrame = function (frameCount) {
        var fps = spec.framerate;
        var currentFrames = elFlash.getCurrentTime() * fps;
        var newPosition = (currentFrames + frameCount) / fps;
        newPosition = newPosition + 0.00001; // FIXES A SAFARI SEEK ISSUE. myVdieo.currentTime = 0.04 would give SMPTE 00:00:00:00 wheras it should give 00:00:00:01

        that.pause();
        that.seek(newPosition);
    };

    that.stop = function () {
        OvenPlayerConsole.log("CORE : stop() ");
        elFlash.stop();
    };

    that.destroy = function () {
        OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied");
        that.stop();

        /*try{
            elFlash.remove();
        }catch(error){
            console.log(error);
        }*/

        if (ads) {
            ads.destroy();
        }
        that.off();
    };

    //XXX : I hope using es6 classes. but I think to occur problem from Old IE. Then I choice function inherit. Finally using super function is so difficult.
    // use : let super_destroy  = that.super('destroy'); ... super_destroy();
    that["super"] = function (name) {
        var method = that[name];
        return function () {
            return method.apply(that, arguments);
        };
    };
    return that;
};

exports["default"] = Provider;

/***/ }),

/***/ "./src/js/api/provider/flash/providers/Rtmp.js":
/*!*****************************************************!*\
  !*** ./src/js/api/provider/flash/providers/Rtmp.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _Provider = __webpack_require__(/*! api/provider/flash/Provider */ "./src/js/api/provider/flash/Provider.js");

var _Provider2 = _interopRequireDefault(_Provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   rtmp provider
 * @param   element video element.
 * @param   playerConfig    config.
 * */

/**
 * Created by hoho on 2018. 8. 23..
 */
var Rtmp = function Rtmp(element, playerConfig, adTagUrl) {
    var that = {};
    var superDestroy_func = null;

    var spec = {
        name: _constants.PROVIDER_RTMP,
        element: element,
        mse: null,
        listener: null,
        isLoaded: false,
        canSeek: false,
        isLive: false,
        seeking: false,
        state: _constants.STATE_IDLE,
        buffer: 0,
        framerate: 0,
        currentQuality: -1,
        currentSource: -1,
        qualityLevels: [],
        sources: [],
        adTagUrl: adTagUrl
    };

    that = (0, _Provider2["default"])(spec, playerConfig, null);
    superDestroy_func = that["super"]('destroy');

    OvenPlayerConsole.log("RTMP PROVIDER LOADED.");

    that.destroy = function () {
        OvenPlayerConsole.log("RTMP : PROVIDER DESTROYED.");
        superDestroy_func();
    };

    return that;
};

exports["default"] = Rtmp;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9MaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcC5qcyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsInRoYXQiLCJpc0pTUmVhZHkiLCJ0aW1ldXBkYXRlIiwiZGF0YSIsImN1cnJlbnRUaW1lIiwicG9zaXRpb24iLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwidm9sdW1lQ2hhbmdlZCIsIkNPTlRFTlRfVk9MVU1FIiwic3RhdGVDaGFuZ2VkIiwic2V0U3RhdGUiLCJuZXdzdGF0ZSIsIm1ldGFDaGFuZ2VkIiwiQ09OVEVOVF9NRVRBIiwiZXJyb3IiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwiRVJST1IiLCJQcm92aWRlciIsInNwZWMiLCJwbGF5ZXJDb25maWciLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImVsZW1lbnQiLCJhZHMiLCJsaXN0ZW5lciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImFkVGFnVXJsIiwiZ2V0QWRDbGllbnQiLCJBRF9DTElFTlRfVkFTVCIsImNvbnNvbGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJzb3VyY2VzIiwiY3VycmVudFNvdXJjZSIsInByZXZpb3VzU291cmNlIiwiZ2V0Q3VycmVudFNvdXJjZSIsInNvdXJjZUNoYW5nZWQiLCJmaWxlIiwibG9hZCIsImdldFBvc2l0aW9uIiwic2VlayIsIl9hZnRlckxvYWQiLCJpc0xvYWRlZCIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsImZ1bmNOYW1lIiwiZnVuY0RhdGEiLCJnZXROYW1lIiwibmFtZSIsImNhblNlZWsiLCJzZXRDYW5TZWVrIiwiaXNTZWVraW5nIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJzZXRNZXRhTG9hZGVkIiwibWV0YUxvYWRlZCIsIm5ld1N0YXRlIiwic3RhdGUiLCJwcmV2U3RhdGUiLCJTVEFURV9BRF9QTEFZSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiUExBWUVSX1BBVVNFIiwiU1RBVEVfQURfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwiZ2V0U3RhdGUiLCJzZXRCdWZmZXIiLCJuZXdCdWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsInNldFZvbHVtZSIsInZvbHVtZSIsImdldFZvbHVtZSIsInNldE11dGUiLCJnZXRNdXRlIiwicHJlbG9hZCIsInJldHJ5Q291bnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNoZWNrU3dmSXNSZWFkeSIsImlzRmxhc2hSZWFkeSIsImNoZWNrRmlsZUxvYWRlZCIsImlzRmlsZUxvYWRlZCIsImlzTXV0ZSIsInNldFRpbWVvdXQiLCJFUlJPUlMiLCJjb2RlcyIsIklOSVRfUlRNUF9TRVRVUF9FUlJPUiIsImlzQWN0aXZlIiwic3RhcnRlZCIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsImdldFNvdXJjZXMiLCJtYXAiLCJpbmRleCIsInR5cGUiLCJsYWJlbCIsInNldEN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIm5lZWRQcm92aWRlckNoYW5nZSIsImN1cnJlbnRRdWFsaXR5IiwibGVuZ3RoIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsInNldFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFRpbWUiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRGcmFtZXJhdGUiLCJmcmFtZXJhdGUiLCJzZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZnBzIiwiY3VycmVudEZyYW1lcyIsIm5ld1Bvc2l0aW9uIiwic3RvcCIsImRlc3Ryb3kiLCJvZmYiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsIlJ0bXAiLCJzdXBlckRlc3Ryb3lfZnVuYyIsIlBST1ZJREVSX1JUTVAiLCJtc2UiLCJpc0xpdmUiLCJidWZmZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7O0FBNkJBLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QkMsa0JBQTVCLEVBQStDO0FBQzVELFFBQUlDLE9BQU8sRUFBWDs7QUFFQUEsU0FBS0MsU0FBTCxHQUFpQixZQUFLO0FBQ2xCLGVBQU8sSUFBUDtBQUNILEtBRkQ7QUFHQUQsU0FBS0UsVUFBTCxHQUFrQixVQUFDQyxJQUFELEVBQVM7O0FBRXZCTixnQkFBUU8sV0FBUixHQUFzQkQsS0FBS0UsUUFBM0I7QUFDQVAsaUJBQVNRLE9BQVQsQ0FBaUJDLHVCQUFqQixFQUErQkosSUFBL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFZSCxLQW5CRDtBQW9CQUgsU0FBS1EsYUFBTCxHQUFxQixVQUFDTCxJQUFELEVBQVM7QUFDMUJMLGlCQUFTUSxPQUFULENBQWlCRyx5QkFBakIsRUFBaUNOLElBQWpDO0FBQ0gsS0FGRDtBQUdBSCxTQUFLVSxZQUFMLEdBQW9CLFVBQUNQLElBQUQsRUFBUztBQUN6QkwsaUJBQVNhLFFBQVQsQ0FBa0JSLEtBQUtTLFFBQXZCO0FBQ0gsS0FGRDtBQUdBWixTQUFLYSxXQUFMLEdBQW1CLFVB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NEJBQXRCO0FBQ0F1SDtBQUNILEtBSEQ7O0FBS0EsV0FBTzlJLElBQVA7QUFDSCxDQWxDRDs7cUJBcUNlNkksSSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjcuLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICAgIEVSUk9SLFxyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfUEFVU0VELFxyXG4gICAgU1RBVEVfRVJST1IsXHJcbiAgICBDT05URU5UX0NPTVBMRVRFLFxyXG4gICAgQ09OVEVOVF9TRUVLLFxyXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcclxuICAgIENPTlRFTlRfU0VFS0VELFxyXG4gICAgQ09OVEVOVF9CVUZGRVIsXHJcbiAgICBDT05URU5UX1RJTUUsXHJcbiAgICBDT05URU5UX1ZPTFVNRSxcclxuICAgIENPTlRFTlRfTUVUQSxcclxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcclxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxyXG4gICAgUExBWUVSX1NUQVRFLFxyXG4gICAgUFJPVklERVJfSFRNTDUsXHJcbiAgICBQUk9WSURFUl9XRUJSVEMsXHJcbiAgICBQUk9WSURFUl9EQVNILFxyXG4gICAgUFJPVklERVJfSExTXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxGbGFzaCwgcHJvdmlkZXIsIHZpZGVvRW5kZWRDYWxsYmFjayl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG5cclxuICAgIHRoYXQuaXNKU1JlYWR5ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC50aW1ldXBkYXRlID0gKGRhdGEpID0+e1xyXG5cclxuICAgICAgICBlbEZsYXNoLmN1cnJlbnRUaW1lID0gZGF0YS5wb3NpdGlvbjtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwgZGF0YSk7XHJcbiAgICAgICAgLy9wcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCBkYXRhKTtcclxuICAgICAgICAvL2RhdGEuZHVyYXRpb24tMSA6IHRoaXMgaXMgdHJpY2suIGJlY2F1c2Ugc29tZXRpbWVzIHJ0bXAncyBwb3NpdGlvbiA8IGR1cmF0aW9uIHdoZW4gdmlkZW8gZW5kZWQuXHJcbiAgICAgICAgLy8yMDE5LTA2LTA3IDogRG8gbm90IHVzZSBkdXJhdGlvbi0xIHRyaWNrIGFueW1vcmUuIEkgaW1wcm92ZWQgU1dGIHBsYXllci5cclxuICAgICAgICAvKmlmKGRhdGEucG9zaXRpb24gPj0gKGRhdGEuZHVyYXRpb24tMSkpe1xyXG4gICAgICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9JRExFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0NPTVBMRVRFKXtcclxuICAgICAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Ki9cclxuICAgIH07XHJcbiAgICB0aGF0LnZvbHVtZUNoYW5nZWQgPSAoZGF0YSkgPT57XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zdGF0ZUNoYW5nZWQgPSAoZGF0YSkgPT57XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoZGF0YS5uZXdzdGF0ZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5tZXRhQ2hhbmdlZCA9IChkYXRhKSA9PntcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5lcnJvciA9IChlcnJvcikgPT57XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xyXG4gICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XHJcblxyXG4gICAgICAgIC8vUFJJVkFURV9TVEFURV9FUlJPUlxyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yKTtcclxuXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgSW1hIGZyb20gXCJhcGkvYWRzL2ltYS9BZFwiO1xyXG5pbXBvcnQgVmFzdCBmcm9tIFwiYXBpL2Fkcy92YXN0L0FkXCI7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXJcIjtcclxuaW1wb3J0IHtwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgRVJST1JTLCBJTklUX1JUTVBfU0VUVVBfRVJST1IsXHJcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLCBTVEFURV9FUlJPUixcclxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLCBTVEFURV9BRF9QTEFZSU5HLCBTVEFURV9BRF9QQVVTRUQsXHJcbiAgICBDT05URU5UX1NPVVJDRV9DSEFOR0VELCBBRF9DTElFTlRfVkFTVFxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgQ29yZSBGb3IgRmxhc2ggVmlkZW8uXHJcbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24oc3BlYywgcGxheWVyQ29uZmlnKXtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XHJcblxyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcclxuXHJcbiAgICBsZXQgZWxGbGFzaCA9IHNwZWMuZWxlbWVudDtcclxuICAgIGxldCBhZHMgPSBudWxsLCBsaXN0ZW5lciA9IG51bGwsIHZpZGVvRW5kZWRDYWxsYmFjayA9IG51bGw7XHJcblxyXG4gICAgLy9JdCBtZWFucyB0byBzdXBwb3J0IGFkIGZvciBmbGFzaC4gU2V0IHRoZSBzYW1lIHNwZWNpZmljYXRpb25zIGxpa2UgYSBWaWRlbyBUYWcuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxGbGFzaCwgJ2N1cnJlbnRUaW1lJyxcclxuICAgICAgICB7dmFsdWUgOjAsIHdyaXRhYmxlIDogdHJ1ZX1cclxuICAgICk7XHJcblxyXG4gICAgaWYoc3BlYy5hZFRhZ1VybCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW1Byb3ZpZGVyXSBBZCBDbGllbnQgLSBcIiwgcGxheWVyQ29uZmlnLmdldEFkQ2xpZW50KCkpO1xyXG4gICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRBZENsaWVudCgpID09PSBBRF9DTElFTlRfVkFTVCl7XHJcbiAgICAgICAgICAgIGFkcyA9IFZhc3QoZWxGbGFzaCwgdGhhdCwgcGxheWVyQ29uZmlnLCBzcGVjLmFkVGFnVXJsKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYWRzID0gSW1hKGVsRmxhc2gsIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighYWRzKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW4gbm90IGxvYWQgZHVlIHRvIGdvb2dsZSBpbWEgZm9yIEFkcy5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihlbEZsYXNoLCB0aGF0LCBhZHMgPyBhZHMudmlkZW9FbmRlZENhbGxiYWNrIDogbnVsbCk7XHJcblxyXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gZWxGbGFzaC5nZXRDdXJyZW50U291cmNlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZUNoYW5nZWQgPSAoc291cmNlLmZpbGUgIT09IHByZXZpb3VzU291cmNlKTtcclxuICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICBlbEZsYXNoLmxvYWQoc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgdGhhdC5nZXRQb3NpdGlvbigpID4gMCl7XHJcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIC8vRmxhc2ggaGFzIHR3byBpbml0IHN0YXRlcy4gRmxhc2hMb2FkZWQgYW5kIEZpbGVMb2FkZWQuXHJcbiAgICAvL19sb2FkIGNhbGxzIGFmdGVyIEZsYXNoTG9hZGVkLiBfYWZ0ZXJMb2FkIGNhbGxzIGFmdGVyIEZpbGVMb2FkZWQuXHJcbiAgICBjb25zdCBfYWZ0ZXJMb2FkID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XHJcbiAgICAgICAgc3BlYy5pc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vVGhpcyBpcyB3aHkuIEZsYXNoIGRvZXMgbm90IHNlbGYgdHJpZyB0byBhZHMsbG1hbG0sXHJcbiAgICB0aGF0LnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCA9IChmdW5jTmFtZSwgZnVuY0RhdGEpID0+IHtcclxuICAgICAgICBpZihsaXN0ZW5lcltmdW5jTmFtZV0pe1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuZXJbZnVuY05hbWVdKGZ1bmNEYXRhKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5uYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2VlaykgPT4ge1xyXG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmcpPT57XHJcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldE1ldGFMb2FkZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgc3BlYy5pc0xvYWRlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGF0Lm1ldGFMb2FkZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNMb2FkZWQ7XHJcbiAgICB9XHJcbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xyXG4gICAgICAgICAgICBsZXQgcHJldlN0YXRlID0gc3BlYy5zdGF0ZTtcclxuICAgICAgICAgICAgLy9Ub0RvIDogVGhpcyBpcyB0ZW1wb3JhcnkgY29kZS4gYXZvaWQgYmFja2dyb3VuZCBjb250ZW50IGVycm9yLlxyXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BMQVlJTkcgJiYgKG5ld1N0YXRlID09PSBTVEFURV9FUlJPUiB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfSURMRSkgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgKiAyMDE5LTA2LTEzXHJcbiAgICAgICAgICAgICAqIE5vIG1vcmUgbmVjZXNzYXJ5IHRoaXMgY29kZXMuXHJcbiAgICAgICAgICAgICAqIENoZWNraW5nIHRoZSBhdXRvUGxheSBzdXBwb3J0IHdhcyB1c2luZyBtYWluIHZpZGVvIGVsZW1lbnQuIGVsVmlkZW8ucGxheSgpIC0+IHllcyBvciBubz8/XHJcbiAgICAgICAgICAgICAqIEFuZCB0aGVuIHRoYXQgY2F1c2VzIHRyaWdnZXJpbmcgcGxheSBhbmQgcGF1c2UgZXZlbnQuXHJcbiAgICAgICAgICAgICAqIEFuZCB0aGF0IGNoZWNraW5nIHdhaXRzIGZvciBlbFZpZGVvIGxvYWRlZC4gRGFzaCBsb2FkIGNvbXBsZXRpb24gdGltZSBpcyB1bmtub3duLlxyXG4gICAgICAgICAgICAgKiBUaGVuIEkgY2hhbmdlZCBjaGVjayBtZXRob2QuIEkgbWFrZSB0ZW1wb3JhcnkgdmlkZW8gdGFnIGFuZCBpbnNlcnQgZW1wdHkgdmlkZW8uXHJcbiAgICAgICAgICAgICAqICovXHJcbiAgICAgICAgICAgIC8vaWYgKChwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BMQVlJTkcgfHwgcHJldlN0YXRlID09PSBTVEFURV9BRF9QQVVTRUQgKSAmJiAobmV3U3RhdGUgPT09IFNUQVRFX1BBVVNFRCB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfUExBWUlORykpIHtcclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvL0FkcyBjaGVja3MgY2hlY2tBdXRvcGxheVN1cHBvcnQoKS4gSXQgY2FsbHMgcmVhbCBwbGF5KCkgYW5kIHBhdXNlKCkgdG8gdmlkZW8gZWxlbWVudC5cclxuICAgICAgICAgICAgLy9BbmQgdGhlbiB0aGF0IHRyaWdnZXJzIFwicGxheWluZ1wiIGFuZCBcInBhdXNlXCIuXHJcbiAgICAgICAgICAgIC8vSSBwcmV2ZW50IHRoZXNlIHByb2Nlc3MuXHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBzd2l0Y2gobmV3U3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QQVVTRURcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUEFVU0VEIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BBVVNFRFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfUExBWUlOR1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QTEFZSU5HIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUExBWUlOR1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xyXG4gICAgICAgICAgICAgICAgcHJldnN0YXRlIDogcHJldlN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRCdWZmZXIgPyBlbEZsYXNoLmdldEJ1ZmZlcigpIDogbnVsbDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbEZsYXNoKXtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0RHVyYXRpb24gPyBlbEZsYXNoLmdldER1cmF0aW9uKCkgOiAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRQb3NpdGlvbiA/IGVsRmxhc2guZ2V0UG9zaXRpb24oKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5zZXRWb2x1bWUgPyBlbEZsYXNoLnNldFZvbHVtZSh2b2x1bWUpIDogMDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxGbGFzaCl7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbEZsYXNoLnNldFZvbHVtZSA/IGVsRmxhc2guZ2V0Vm9sdW1lKCkgOiAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbEZsYXNoKXtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxGbGFzaC5zZXRNdXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRNdXRlID8gZWxGbGFzaC5nZXRNdXRlKCkgOiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wcmVsb2FkID0gKHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBwcmVsb2FkKCkgXCIsIHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcclxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIC8vRmlyc3QgOiBjaGVja1N3ZklzUmVhZHkgLT4gSXQgY2hlY2tzIHN3ZiBsb2FkaW5nIGNvbXBsZXRlIGJ5IHBvbGxpbmcuXHJcbiAgICAgICAgICAgIC8vU2Vjb25kIDogY2hlY2tGaWxlTG9hZGVkIC0+IEl0IGNoZWNrcyBzcmMgbG9hZGluZyBjb21wbGV0ZSBieSBwb2xsaW5nIHRvby5cclxuICAgICAgICAgICAgLy9XaHkgY29tcGxleCBpcyBpdD8gLT4gSXQgYWdhaW5zdHMgZmxhc2ggdGltaW5nIGlzc3VlLlxyXG4gICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tTd2ZJc1JlYWR5KCl7XHJcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xyXG4gICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZsYXNoUmVhZHkgJiYgZWxGbGFzaC5pc0ZsYXNoUmVhZHkoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsRmxhc2gsICdkdXJhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZSA6ZWxGbGFzaC5nZXREdXJhdGlvbigpfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiBjaGVja0ZpbGVMb2FkZWQoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZpbGVMb2FkZWQgJiYgZWxGbGFzaC5pc0ZpbGVMb2FkZWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWZ0ZXJMb2FkKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzTXV0ZSgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkgJiYgcGxheWVyQ29uZmlnLmdldFZvbHVtZSgpIDwgMTAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAzMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tGaWxlTG9hZGVkLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlMuY29kZXNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrU3dmSXNSZWFkeSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlMuY29kZXNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XHJcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcclxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgX2xvYWQoMCk7ICAgLy9zcGVjLnNvdXJjZXNfLnN0YXJ0dGltZSB8fFxyXG4gICAgICAgIF9hZnRlckxvYWQoMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGxheSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbEZsYXNoKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBpZiAoIChhZHMgJiYgYWRzLmlzQWN0aXZlKCkpIHx8IChhZHMgJiYgIWFkcy5zdGFydGVkKCkpICkge1xyXG4gICAgICAgICAgICAgICAgYWRzLnBsYXkoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBlbEZsYXNoLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcclxuICAgICAgICAgICAgZWxGbGFzaC5wYXVzZSgpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyl7XHJcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcclxuICAgICAgICBlbEZsYXNoLnNlZWsocG9zaXRpb24pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcclxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChzb3VyY2VJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5jdXJyZW50UXVhbGl0eSA9PT0gc291cmNlSW5kZXgpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzb3VyY2VJbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgaWYoc3BlYy5zb3VyY2VzICYmIHNwZWMuc291cmNlcy5sZW5ndGggPiBzb3VyY2VJbmRleCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHNvdXJjZUluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc291cmNlSW5kZXhcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VJbmRleChzb3VyY2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAvL3BsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihuZWVkUHJvdmlkZXJDaGFuZ2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gZWxGbGFzaC5nZXRDdXJyZW50VGltZSgpfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja0ZpbGVMb2FkZWQoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZpbGVMb2FkZWQgJiYgZWxGbGFzaC5pc0ZpbGVMb2FkZWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWZ0ZXJMb2FkKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMzAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRmlsZUxvYWRlZCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZUxvYWQgZmFpbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxGbGFzaCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEZyYW1lcmF0ZSA9IChmcmFtZXJhdGUpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGUgPSBmcmFtZXJhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT57XHJcbiAgICAgICAgbGV0IGZwcyA9IHNwZWMuZnJhbWVyYXRlO1xyXG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVzID0gZWxGbGFzaC5nZXRDdXJyZW50VGltZSgpICogZnBzO1xyXG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XHJcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXHJcblxyXG4gICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBlbEZsYXNoLnN0b3AoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGRlc3Ryb3koKSBwbGF5ZXIgc3RvcCwgbGlzdGVuZXIsIGV2ZW50IGRlc3Ryb2llZFwiKTtcclxuICAgICAgICB0aGF0LnN0b3AoKTtcclxuXHJcbiAgICAgICAgLyp0cnl7XHJcbiAgICAgICAgICAgIGVsRmxhc2gucmVtb3ZlKCk7XHJcbiAgICAgICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0qL1xyXG5cclxuXHJcbiAgICAgICAgaWYoYWRzKXtcclxuICAgICAgICAgICAgYWRzLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9YWFggOiBJIGhvcGUgdXNpbmcgZXM2IGNsYXNzZXMuIGJ1dCBJIHRoaW5rIHRvIG9jY3VyIHByb2JsZW0gZnJvbSBPbGQgSUUuIFRoZW4gSSBjaG9pY2UgZnVuY3Rpb24gaW5oZXJpdC4gRmluYWxseSB1c2luZyBzdXBlciBmdW5jdGlvbiBpcyBzbyBkaWZmaWN1bHQuXHJcbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XHJcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcclxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGF0W25hbWVdO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm92aWRlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQge1NUQVRFX0lETEUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2ZsYXNoL1Byb3ZpZGVyXCI7XHJcbi8qKlxyXG4gKiBAYnJpZWYgICBydG1wIHByb3ZpZGVyXHJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cclxuICogKi9cclxuXHJcblxyXG5jb25zdCBSdG1wID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcclxuXHJcbiAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICBuYW1lIDogUFJPVklERVJfUlRNUCxcclxuICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcclxuICAgICAgICBtc2UgOiBudWxsLFxyXG4gICAgICAgIGxpc3RlbmVyIDogbnVsbCxcclxuICAgICAgICBpc0xvYWRlZCA6IGZhbHNlLFxyXG4gICAgICAgIGNhblNlZWsgOiBmYWxzZSxcclxuICAgICAgICBpc0xpdmUgOiBmYWxzZSxcclxuICAgICAgICBzZWVraW5nIDogZmFsc2UsXHJcbiAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxyXG4gICAgICAgIGJ1ZmZlciA6IDAsXHJcbiAgICAgICAgZnJhbWVyYXRlIDogMCxcclxuICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcclxuICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXHJcbiAgICAgICAgc291cmNlcyA6IFtdLFxyXG4gICAgICAgIGFkVGFnVXJsIDogYWRUYWdVcmxcclxuICAgIH07XHJcblxyXG4gICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgbnVsbCk7XHJcbiAgICBzdXBlckRlc3Ryb3lfZnVuYyAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUlRNUCBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlJUTVAgOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJ0bXA7Il0sInNvdXJjZVJvb3QiOiIifQ==