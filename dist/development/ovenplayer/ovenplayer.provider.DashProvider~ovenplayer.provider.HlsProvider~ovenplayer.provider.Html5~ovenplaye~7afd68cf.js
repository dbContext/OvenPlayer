/*! ovenplayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (MIT) | Github : https://ovenplayer.com */
(window["webpackJsonpOvenPlayer"] = window["webpackJsonpOvenPlayer"] || []).push([["ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"],{

/***/ "./src/js/api/provider/html5/Listener.js":
/*!***********************************************!*\
  !*** ./src/js/api/provider/html5/Listener.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

/**
 * @brief   Trigger on various video events.
 * @param   extendedElement extended media object by mse.
 * @param   Provider provider  html5Provider
 * */

var Listener = function Listener(element, provider, videoEndedCallback, playerConfig) {
    var lowLevelEvents = {};

    OvenPlayerConsole.log("EventListener loaded.", element, provider);
    var that = {};

    var stalled = -1;
    var elVideo = element;
    var between = function between(num, min, max) {
        return Math.max(Math.min(num, max), min);
    };
    var compareStalledTime = function compareStalledTime(stalled, position) {
        //Original Code is stalled !== position
        //Because Dashjs is very meticulous. Then always diffrence stalled and position.
        //That is why when I use toFixed(2).
        return stalled.toFixed(2) === position.toFixed(2);
    };

    lowLevelEvents.canplay = function () {
        //Fires when the browser can start playing the audio/video
        provider.setCanSeek(true);
        provider.trigger(_constants.CONTENT_BUFFER_FULL);
        OvenPlayerConsole.log("EventListener : on canplay");
    };

    lowLevelEvents.durationchange = function () {
        //Fires when the duration of the audio/video is changed
        lowLevelEvents.progress();
        OvenPlayerConsole.log("EventListener : on durationchange");
    };

    lowLevelEvents.ended = function () {
        //Fires when the current playlist is ended
        OvenPlayerConsole.log("EventListener : on ended");

        if (provider.getState() !== _constants.STATE_IDLE && provider.getState() !== _constants.STATE_COMPLETE && provider.getState() !== _constants.STATE_ERROR) {
            if (videoEndedCallback) {
                videoEndedCallback(function () {
                    provider.setState(_constants.STATE_COMPLETE);
                });
            } else {
                provider.setState(_constants.STATE_COMPLETE);
            }
        }
    };

    lowLevelEvents.loadeddata = function () {
        //Fires when the browser has loaded the current frame of the audio/video
        //Do nothing Because this causes chaos by loadedmetadata.
        /*
        var metadata = {
            duration: elVideo.duration,
            height: elVideo.videoHeight,
            width: elVideo.videoWidth
        };
        provider.trigger(CONTENT_META, metadata);*/
    };

    lowLevelEvents.loadedmetadata = function () {
        //Fires when the browser has loaded meta data for the audio/video

        var sources = provider.getSources();
        var sourceIndex = provider.getCurrentSource();
        var type = sourceIndex > -1 ? sources[sourceIndex].type : "";
        var metadata = {
            duration: provider.isLive() ? Infinity : elVideo.duration,
            type: type
        };

        provider.setMetaLoaded();

        OvenPlayerConsole.log("EventListener : on loadedmetadata", metadata);
        provider.trigger(_constants.CONTENT_META, metadata);
    };

    lowLevelEvents.pause = function () {
        //Fires when the audio/video has been paused
        if (provider.getState() === _constants.STATE_COMPLETE || provider.getState() === _constants.STATE_ERROR) {
            return false;
        }
        if (elVideo.ended) {
            return false;
        }
        if (elVideo.error) {
            return false;
        }
        if (elVideo.currentTime === elVideo.duration) {
            return false;
        }
        OvenPlayerConsole.log("EventListener : on pause");

        provider.setState(_constants.STATE_PAUSED);
    };

    lowLevelEvents.loadstart = function () {

        if (playerConfig) {
            if (!playerConfig.getConfig().showBigPlayButton && playerConfig.getConfig().autoStart) {
                provider.setState(_constants.STATE_LOADING);
            }
        }
    };

    lowLevelEvents.play = function () {

        //Fires when the audio/video has been started or is no longer paused
        stalled = -1;
        if (!elVideo.paused && provider.getState() !== _constants.STATE_PLAYING) {
            provider.setState(_constants.STATE_LOADING);
        }
    };

    lowLevelEvents.playing = function () {
        //Fires when the audio/video is playing after having been paused or stopped for buffering
        OvenPlayerConsole.log("EventListener : on playing");
        if (stalled < 0) {
            provider.setState(_constants.STATE_PLAYING);
        }
    };

    lowLevelEvents.progress = function () {
        //Fires when the browser is downloading the audio/video
        var timeRanges = elVideo.buffered;
        if (!timeRanges) {
            return false;
        }

        var duration = elVideo.duration,
            position = elVideo.currentTime;
        var buffered = between((timeRanges.length > 0 ? timeRanges.end(timeRanges.length - 1) : 0) / duration, 0, 1);

        provider.setBuffer(buffered * 100);
        provider.trigger(_constants.CONTENT_BUFFER, {
            bufferPercent: buffered * 100,
            position: position,
            duration: duration
        });
        OvenPlayerConsole.log("EventListener : on progress", buffered * 100);
    };

    lowLevelEvents.timeupdate = function () {
        //Fires when the current playback position has changed
        var position = elVideo.currentTime;
        var duration = elVideo.duration;
        if (isNaN(duration)) {
            return;
        }

        var sectionStart = provider.getSources()[provider.getCurrentSource()].sectionStart;

        if (sectionStart && position < sectionStart && provider.getState() === _constants.STATE_PLAYING) {

            provider.seek(sectionStart);
        }

        var sectionEnd = provider.getSources()[provider.getCurrentSource()].sectionEnd;

        if (sectionEnd && position > sectionEnd && provider.getState() === _constants.STATE_PLAYING) {

            provider.stop();
            provider.setState(_constants.STATE_COMPLETE);
            return;
        }

        //Sometimes dash live gave to me crazy duration. (9007199254740991...) why???
        if (duration > 9000000000000000) {
            //9007199254740991
            duration = Infinity;
        }

        if (!provider.isSeeking() && !elVideo.paused && (provider.getState() === _constants.STATE_STALLED || provider.getState() === _constants.STATE_LOADING || provider.getState() === _constants.STATE_AD_PLAYING) && !compareStalledTime(stalled, position)) {
            stalled = -1;
            provider.setState(_constants.STATE_PLAYING);
        }

        if (sectionStart && sectionStart > 0) {

            position = position - sectionStart;

            if (position < 0) {
                position = 0;
            }
        }

        if (sectionEnd) {
            duration = sectionEnd;
        }

        if (sectionStart) {
            duration = duration - sectionStart;
        }

        if (provider.getState() === _constants.STATE_PLAYING || provider.isSeeking()) {
            provider.trigger(_constants.CONTENT_TIME, {
                position: position,
                duration: duration
            });
        }
    };

    lowLevelEvents.seeking = function () {
        provider.setSeeking(true);
        OvenPlayerConsole.log("EventListener : on seeking", elVideo.currentTime);
        provider.trigger(_constants.CONTENT_SEEK, {
            position: elVideo.currentTime
        });
    };
    lowLevelEvents.seeked = function () {
        if (!provider.isSeeking()) {
            return;
        }
        OvenPlayerConsole.log("EventListener : on seeked");
        provider.setSeeking(false);
        provider.trigger(_constants.CONTENT_SEEKED);
    };

    lowLevelEvents.stalled = function () {
        OvenPlayerConsole.log("EventListener : on stalled");
        //This callback does not work on chrome. This calls on Firefox intermittent. Then do not work here. using waiting event.
    };

    lowLevelEvents.waiting = function () {
        //Fires when the video stops because it needs to buffer the next frame
        OvenPlayerConsole.log("EventListener : on waiting", provider.getState());
        if (provider.isSeeking()) {
            provider.setState(_constants.STATE_LOADING);
        } else if (provider.getState() === _constants.STATE_PLAYING) {
            stalled = elVideo.currentTime;
            provider.setState(_constants.STATE_STALLED);
        }
    };

    lowLevelEvents.volumechange = function () {
        OvenPlayerConsole.log("EventListener : on volumechange", Math.round(elVideo.volume * 100));
        provider.trigger(_constants.CONTENT_VOLUME, {
            volume: Math.round(elVideo.volume * 100),
            mute: elVideo.muted
        });
    };

    lowLevelEvents.error = function () {
        var code = elVideo.error && elVideo.error.code || 0;
        var convertedErroCode = {
            0: _constants.PLAYER_UNKNWON_ERROR,
            1: _constants.PLAYER_UNKNWON_OPERATION_ERROR,
            2: _constants.PLAYER_UNKNWON_NETWORK_ERROR,
            3: _constants.PLAYER_UNKNWON_DECODE_ERROR,
            4: _constants.PLAYER_FILE_ERROR
        }[code] || 0;

        OvenPlayerConsole.log("EventListener : on error", convertedErroCode);
        (0, _utils.errorTrigger)(_constants.ERRORS.codes[convertedErroCode], provider);
    };

    Object.keys(lowLevelEvents).forEach(function (eventName) {
        elVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        elVideo.addEventListener(eventName, lowLevelEvents[eventName]);
    });

    that.destroy = function () {
        OvenPlayerConsole.log("EventListener : destroy()");

        Object.keys(lowLevelEvents).forEach(function (eventName) {
            elVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        });
    };
    return that;
};

exports["default"] = Listener;

/***/ }),

/***/ "./src/js/api/provider/html5/Provider.js":
/*!***********************************************!*\
  !*** ./src/js/api/provider/html5/Provider.js ***!
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

var _Listener = __webpack_require__(/*! api/provider/html5/Listener */ "./src/js/api/provider/html5/Listener.js");

var _Listener2 = _interopRequireDefault(_Listener);

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   Core For Html5 Video.
 * @param   spec member value
 * @param   playerConfig  player config
 * @param   onExtendedLoad on load handler
 * */
/**
 * Created by hoho on 2018. 6. 27..
 */
var Provider = function Provider(spec, playerConfig, onExtendedLoad) {
    OvenPlayerConsole.log("[Provider] loaded. ");

    var that = {};
    (0, _EventEmitter2["default"])(that);

    var dashAttachedView = false;

    var elVideo = spec.element;
    var ads = null,
        listener = null,
        videoEndedCallback = null;

    var isPlayingProcessing = false;

    if (spec.adTagUrl) {
        OvenPlayerConsole.log("[Provider] Ad Client - ", playerConfig.getAdClient());
        if (playerConfig.getAdClient() === _constants.AD_CLIENT_VAST) {
            ads = (0, _Ad4["default"])(elVideo, that, playerConfig, spec.adTagUrl);
        } else {
            ads = (0, _Ad2["default"])(elVideo, that, playerConfig, spec.adTagUrl);
        }

        if (!ads) {
            console.log("Can not load due to google ima for Ads.");
        }
    }

    listener = (0, _Listener2["default"])(elVideo, that, ads ? ads.videoEndedCallback : null, playerConfig);
    elVideo.playbackRate = elVideo.defaultPlaybackRate = playerConfig.getPlaybackRate();

    var _load = function _load(lastPlayPosition) {

        var source = spec.sources[spec.currentSource];
        spec.framerate = source.framerate;

        that.setVolume(playerConfig.getVolume());

        if (!spec.framerate) {
            //init timecode mode
            playerConfig.setTimecodeMode(true);
        }
        if (onExtendedLoad) {
            onExtendedLoad(source, lastPlayPosition);
        } else {

            OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : " + lastPlayPosition);

            var previousSource = elVideo.src;

            // const sourceElement = document.createElement('source');
            // sourceElement.src = source.file;

            var sourceChanged = source.file !== previousSource;
            if (sourceChanged) {

                elVideo.src = source.file;

                //Don't use this. https://stackoverflow.com/questions/30637784/detect-an-error-on-html5-video
                //elVideo.append(sourceElement);

                // Do not call load if src was not set. load() will cancel any active play promise.
                if (previousSource || previousSource === '') {

                    elVideo.load();
                }

                if (lastPlayPosition && lastPlayPosition > 0) {
                    that.seek(lastPlayPosition);
                }
            }

            if (lastPlayPosition > 0) {
                that.seek(lastPlayPosition);
                if (!playerConfig.isAutoStart()) {
                    // that.play();
                }
            }

            if (playerConfig.isAutoStart()) {}

            // that.play();

            /*that.trigger(CONTENT_SOURCE_CHANGED, {
                currentSource: spec.currentSource
            });*/
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

            OvenPlayerConsole.log("Provider : setState()", newState);

            //ToDo : This is temporary code. If main video occur error, player avoid error message on ad playing.
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

            OvenPlayerConsole.log("Provider : triggerSatatus", newState);

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
    that.setBuffer = function (newBuffer) {
        spec.buffer = newBuffer;
    };
    that.getBuffer = function () {
        return spec.buffer;
    };
    that.isLive = function () {
        return spec.isLive ? true : elVideo.duration === Infinity;
    };
    that.getDuration = function () {
        return that.isLive() ? Infinity : elVideo.duration;
    };
    that.getPosition = function () {
        if (!elVideo) {
            return 0;
        }
        return elVideo.currentTime;
    };
    that.setVolume = function (volume) {
        if (!elVideo) {
            return false;
        }
        elVideo.volume = volume / 100;
    };
    that.getVolume = function () {
        if (!elVideo) {
            return 0;
        }
        return elVideo.volume * 100;
    };
    that.setMute = function (state) {
        if (!elVideo) {
            return false;
        }
        if (typeof state === 'undefined') {

            elVideo.muted = !elVideo.muted;

            that.trigger(_constants.CONTENT_MUTE, {
                mute: elVideo.muted
            });
        } else {

            elVideo.muted = state;

            that.trigger(_constants.CONTENT_MUTE, {
                mute: elVideo.muted
            });
        }
        return elVideo.muted;
    };
    that.getMute = function () {
        if (!elVideo) {
            return false;
        }
        return elVideo.muted;
    };

    that.preload = function (sources, lastPlayPosition) {

        spec.sources = sources;

        spec.currentSource = (0, _utils.pickCurrentSource)(sources, spec.currentSource, playerConfig);
        _load(lastPlayPosition || 0);

        return new Promise(function (resolve, reject) {

            if (playerConfig.isMute()) {
                that.setMute(true);
            }
            if (playerConfig.getVolume()) {
                that.setVolume(playerConfig.getVolume());
            }

            resolve();
        });
    };
    that.load = function (sources) {

        spec.sources = sources;
        spec.currentSource = (0, _utils.pickCurrentSource)(sources, spec.currentSource, playerConfig);
        _load(spec.sources.starttime || 0);
    };

    that.play = function () {

        OvenPlayerConsole.log("Provider : play()");
        if (!elVideo) {
            return false;
        }

        //Test it thoroughly and remove isPlayingProcessing. Most of the hazards have been removed. a lot of nonblocking play() way -> blocking play()
        // if(isPlayingProcessing){
        //     return false;
        // }

        isPlayingProcessing = true;
        if (that.getState() !== _constants.STATE_PLAYING) {
            if (ads && ads.isActive() || ads && !ads.started()) {
                ads.play().then(function (_) {
                    //ads play success
                    isPlayingProcessing = false;
                    OvenPlayerConsole.log("Provider : ads play success");
                })["catch"](function (error) {
                    //ads play fail maybe cause user interactive less
                    isPlayingProcessing = false;
                    OvenPlayerConsole.log("Provider : ads play fail", error);
                });
            } else {
                var promise = elVideo.play();
                if (promise !== undefined) {
                    promise.then(function () {
                        isPlayingProcessing = false;
                        OvenPlayerConsole.log("Provider : video play success");
                        /*
                        if(mutedPlay){
                            that.trigger(PLAYER_WARNING, {
                                message : WARN_MSG_MUTEDPLAY,
                                timer : 10 * 1000,
                                iconClass : UI_ICONS.volume_mute,
                                onClickCallback : function(){
                                    that.setMute(false);
                                }
                            });
                        }*/
                    })["catch"](function (error) {
                        OvenPlayerConsole.log("Provider : video play error", error.message);

                        isPlayingProcessing = false;
                        /*
                        if(!mutedPlay){
                            that.setMute(true);
                            that.play(true);
                        }
                        */
                    });
                } else {
                    //IE promise is undefinded.
                    OvenPlayerConsole.log("Provider : video play success (ie)");
                    isPlayingProcessing = false;
                }
            }
        }
    };
    that.pause = function () {

        OvenPlayerConsole.log("Provider : pause()");
        if (!elVideo) {
            return false;
        }

        if (that.getState() === _constants.STATE_PLAYING) {
            elVideo.pause();
        } else if (that.getState() === _constants.STATE_AD_PLAYING) {
            ads.pause();
        }
    };
    that.seek = function (position) {
        if (!elVideo) {
            return false;
        }
        elVideo.currentTime = position;
    };
    that.setPlaybackRate = function (playbackRate) {
        if (!elVideo) {
            return false;
        }
        that.trigger(_constants.PLAYBACK_RATE_CHANGED, { playbackRate: playbackRate });
        return elVideo.playbackRate = elVideo.defaultPlaybackRate = playbackRate;
    };
    that.getPlaybackRate = function () {
        if (!elVideo) {
            return 0;
        }
        return elVideo.playbackRate;
    };

    that.getSources = function () {
        if (!elVideo) {
            return [];
        }

        return spec.sources.map(function (source, index) {

            var obj = {
                file: source.file,
                type: source.type,
                label: source.label,
                index: index,
                sectionStart: source.sectionStart,
                sectionEnd: source.sectionEnd,
                gridThumbnail: source.gridThumbnail
            };

            if (source.lowLatency) {
                obj.lowLatency = source.lowLatency;
            }

            return obj;
        });
    };
    that.getCurrentSource = function () {
        return spec.currentSource;
    };
    that.setCurrentSource = function (sourceIndex, needProviderChange) {

        if (sourceIndex > -1) {
            if (spec.sources && spec.sources.length > sourceIndex) {
                //that.pause();
                //that.setState(STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + sourceIndex);
                spec.currentSource = sourceIndex;

                that.trigger(_constants.CONTENT_SOURCE_CHANGED, {
                    currentSource: sourceIndex
                });
                playerConfig.setSourceIndex(sourceIndex);
                //playerConfig.setSourceLabel(spec.sources[sourceIndex].label);
                //spec.currentQuality = sourceIndex;
                //that.pause();
                that.setState(_constants.STATE_IDLE);
                if (needProviderChange) {
                    _load(elVideo.currentTime || 0);
                }
                //
                return spec.currentSource;
            }
        }
    };

    that.getQualityLevels = function () {
        if (!elVideo) {
            return [];
        }
        return spec.qualityLevels;
    };
    that.getCurrentQuality = function () {
        if (!elVideo) {
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
        var currentFrames = elVideo.currentTime * fps;
        var newPosition = (currentFrames + frameCount) / fps;
        newPosition = newPosition + 0.00001; // FIXES A SAFARI SEEK ISSUE. myVdieo.currentTime = 0.04 would give SMPTE 00:00:00:00 wheras it should give 00:00:00:01

        that.pause();
        that.seek(newPosition);
    };

    that.stop = function () {
        if (!elVideo) {
            return false;
        }
        OvenPlayerConsole.log("CORE : stop() ");

        elVideo.removeAttribute('preload');
        elVideo.removeAttribute('src');
        while (elVideo.firstChild) {
            elVideo.removeChild(elVideo.firstChild);
        }

        that.pause();
        that.setState(_constants.STATE_IDLE);
        isPlayingProcessing = false;
    };

    that.destroy = function () {
        if (!elVideo) {
            return false;
        }
        that.stop();
        listener.destroy();
        //elVideo.remove();

        if (ads) {
            ads.destroy();
            ads = null;
        }
        that.off();
        OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied");
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9MaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlci5qcyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImVsZW1lbnQiLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsInBsYXllckNvbmZpZyIsImxvd0xldmVsRXZlbnRzIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ0aGF0Iiwic3RhbGxlZCIsImVsVmlkZW8iLCJiZXR3ZWVuIiwibnVtIiwibWluIiwibWF4IiwiTWF0aCIsImNvbXBhcmVTdGFsbGVkVGltZSIsInBvc2l0aW9uIiwidG9GaXhlZCIsImNhbnBsYXkiLCJzZXRDYW5TZWVrIiwidHJpZ2dlciIsIkNPTlRFTlRfQlVGRkVSX0ZVTEwiLCJkdXJhdGlvbmNoYW5nZSIsInByb2dyZXNzIiwiZW5kZWQiLCJnZXRTdGF0ZSIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsIlNUQVRFX0VSUk9SIiwic2V0U3RhdGUiLCJsb2FkZWRkYXRhIiwibG9hZGVkbWV0YWRhdGEiLCJzb3VyY2VzIiwiZ2V0U291cmNlcyIsInNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZSIsInR5cGUiLCJtZXRhZGF0YSIsImR1cmF0aW9uIiwiaXNMaXZlIiwiSW5maW5pdHkiLCJzZXRNZXRhTG9hZGVkIiwiQ09OVEVOVF9NRVRBIiwicGF1c2UiLCJlcnJvciIsImN1cnJlbnRUaW1lIiwiU1RBVEVfUEFVU0VEIiwibG9hZHN0YXJ0IiwiZ2V0Q29uZmlnIiwic2hvd0JpZ1BsYXlCdXR0b24iLCJhdXRvU3RhcnQiLCJTVEFURV9MT0FESU5HIiwicGxheSIsInBhdXNlZCIsIlNUQVRFX1BMQVlJTkciLCJwbGF5aW5nIiwidGltZVJhbmdlcyIsImJ1ZmZlcmVkIiwibGVuZ3RoIiwiZW5kIiwic2V0QnVmZmVyIiwiQ09OVEVOVF9CVUZGRVIiLCJidWZmZXJQZXJjZW50IiwidGltZXVwZGF0ZSIsImlzTmFOIiwic2VjdGlvblN0YXJ0Iiwic2VlayIsInNlY3Rpb25FbmQiLCJzdG9wIiwiaXNTZWVraW5nIiwiU1RBVEVfU1RBTExFRCIsIlNUQVRFX0FEX1BMQVlJTkciLCJDT05URU5UX1RJTUUiLCJzZWVraW5nIiwic2V0U2Vla2luZyIsIkNPTlRFTlRfU0VFSyIsInNlZWtlZCIsIkNPTlRFTlRfU0VFS0VEIiwid2FpdGluZyIsInZvbHVtZWNoYW5nZSIsInJvdW5kIiwidm9sdW1lIiwiQ09OVEVOVF9WT0xVTUUiLCJtdXRlIiwibXV0ZWQiLCJjb2RlIiwiY29udmVydGVkRXJyb0NvZGUiLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfRklMRV9FUlJPUiIsIkVSUk9SUyIsImNvZGVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnROYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRlc3Ryb3kiLCJQcm92aWRlciIsInNwZWMiLCJvbkV4dGVuZGVkTG9hZCIsImRhc2hBdHRhY2hlZFZpZXciLCJhZHMiLCJsaXN0ZW5lciIsImlzUGxheWluZ1Byb2Nlc3NpbmciLCJhZFRhZ1VybCIsImdldEFkQ2xpZW50IiwiQURfQ0xJRU5UX1ZBU1QiLCJjb25zb2xlIiwicGxheWJhY2tSYXRlIiwiZGVmYXVsdFBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsImN1cnJlbnRTb3VyY2UiLCJmcmFtZXJhdGUiLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRUaW1lY29kZU1vZGUiLCJwcmV2aW91c1NvdXJjZSIsInNyYyIsInNvdXJjZUNoYW5nZWQiLCJmaWxlIiwibG9hZCIsImlzQXV0b1N0YXJ0IiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwiaXNMb2FkZWQiLCJtZXRhTG9hZGVkIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIm5ld3N0YXRlIiwiU1RBVEVfQURfUEFVU0VEIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJuZXdCdWZmZXIiLCJidWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsImdldFBvc2l0aW9uIiwic2V0TXV0ZSIsIkNPTlRFTlRfTVVURSIsImdldE11dGUiLCJwcmVsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpc011dGUiLCJzdGFydHRpbWUiLCJpc0FjdGl2ZSIsInN0YXJ0ZWQiLCJ0aGVuIiwicHJvbWlzZSIsInVuZGVmaW5lZCIsIm1lc3NhZ2UiLCJzZXRQbGF5YmFja1JhdGUiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJtYXAiLCJpbmRleCIsIm9iaiIsImxhYmVsIiwiZ3JpZFRodW1ibmFpbCIsImxvd0xhdGVuY3kiLCJzZXRDdXJyZW50U291cmNlIiwibmVlZFByb3ZpZGVyQ2hhbmdlIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsInNldFNvdXJjZUluZGV4IiwiZ2V0UXVhbGl0eUxldmVscyIsInF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsImN1cnJlbnRRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRGcmFtZXJhdGUiLCJzZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZnBzIiwiY3VycmVudEZyYW1lcyIsIm5ld1Bvc2l0aW9uIiwicmVtb3ZlQXR0cmlidXRlIiwiZmlyc3RDaGlsZCIs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QUFzQixnQkFBdEI7O0FBRUFHLGdCQUFRdUwsZUFBUixDQUF3QixTQUF4QjtBQUNBdkwsZ0JBQVF1TCxlQUFSLENBQXdCLEtBQXhCO0FBQ0EsZUFBT3ZMLFFBQVF3TCxVQUFmLEVBQTJCO0FBQ3ZCeEwsb0JBQVF5TCxXQUFSLENBQW9CekwsUUFBUXdMLFVBQTVCO0FBQ0g7O0FBRUQxTCxhQUFLb0MsS0FBTDtBQUNBcEMsYUFBS3NCLFFBQUwsQ0FBY0gscUJBQWQ7QUFDQWlGLDhCQUFzQixLQUF0QjtBQUNILEtBZkQ7O0FBaUJBcEcsU0FBSzZGLE9BQUwsR0FBZSxZQUFLO0FBQ2hCLFlBQUcsQ0FBQzNGLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNERixhQUFLNkQsSUFBTDtBQUNBc0MsaUJBQVNOLE9BQVQ7QUFDQTs7QUFFQSxZQUFHSyxHQUFILEVBQU87QUFDSEEsZ0JBQUlMLE9BQUo7QUFDQUssa0JBQU0sSUFBTjtBQUNIO0FBQ0RsRyxhQUFLNEwsR0FBTDtBQUNBOUwsMEJBQWtCQyxHQUFsQixDQUFzQix5REFBdEI7QUFDSCxLQWREOztBQWdCQTtBQUNBO0FBQ0FDLG9CQUFhLFVBQUMySCxJQUFELEVBQVU7QUFDbkIsWUFBTWtFLFNBQVM3TCxLQUFLMkgsSUFBTCxDQUFmO0FBQ0EsZUFBTyxZQUFVO0FBQ2IsbUJBQU9rRSxPQUFPQyxLQUFQLENBQWE5TCxJQUFiLEVBQW1CK0wsU0FBbkIsQ0FBUDtBQUNILFNBRkQ7QUFHSCxLQUxEO0FBTUEsV0FBTy9MLElBQVA7QUFFSCxDQXRmRDs7cUJBd2ZlOEYsUSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIEVSUk9SUyxcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXHJcbiAgICBTVEFURV9QQVVTRUQsXHJcbiAgICBTVEFURV9FUlJPUixcclxuICAgIENPTlRFTlRfU0VFSyxcclxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXHJcbiAgICBDT05URU5UX1NFRUtFRCxcclxuICAgIENPTlRFTlRfQlVGRkVSLFxyXG4gICAgQ09OVEVOVF9USU1FLFxyXG4gICAgQ09OVEVOVF9WT0xVTUUsXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXHJcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRyaWdnZXIgb24gdmFyaW91cyB2aWRlbyBldmVudHMuXHJcbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLlxyXG4gKiBAcGFyYW0gICBQcm92aWRlciBwcm92aWRlciAgaHRtbDVQcm92aWRlclxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxlbWVudCwgcHJvdmlkZXIsIHZpZGVvRW5kZWRDYWxsYmFjaywgcGxheWVyQ29uZmlnKXtcclxuICAgIGNvbnN0IGxvd0xldmVsRXZlbnRzID0ge307XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciBsb2FkZWQuXCIsZWxlbWVudCAscHJvdmlkZXIgKTtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuXHJcbiAgICBsZXQgc3RhbGxlZCA9IC0xO1xyXG4gICAgbGV0IGVsVmlkZW8gPSAgZWxlbWVudDtcclxuICAgIGNvbnN0IGJldHdlZW4gPSBmdW5jdGlvbiAobnVtLCBtaW4sIG1heCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihudW0sIG1heCksIG1pbik7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgY29tcGFyZVN0YWxsZWRUaW1lID0gZnVuY3Rpb24oc3RhbGxlZCwgcG9zaXRpb24pe1xyXG4gICAgICAgIC8vT3JpZ2luYWwgQ29kZSBpcyBzdGFsbGVkICE9PSBwb3NpdGlvblxyXG4gICAgICAgIC8vQmVjYXVzZSBEYXNoanMgaXMgdmVyeSBtZXRpY3Vsb3VzLiBUaGVuIGFsd2F5cyBkaWZmcmVuY2Ugc3RhbGxlZCBhbmQgcG9zaXRpb24uXHJcbiAgICAgICAgLy9UaGF0IGlzIHdoeSB3aGVuIEkgdXNlIHRvRml4ZWQoMikuXHJcbiAgICAgICAgcmV0dXJuIHN0YWxsZWQudG9GaXhlZCgyKSA9PT0gcG9zaXRpb24udG9GaXhlZCgyKTtcclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIGF1ZGlvL3ZpZGVvXHJcbiAgICAgICAgcHJvdmlkZXIuc2V0Q2FuU2Vlayh0cnVlKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSX0ZVTEwpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBjYW5wbGF5XCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5kdXJhdGlvbmNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGR1cmF0aW9uIG9mIHRoZSBhdWRpby92aWRlbyBpcyBjaGFuZ2VkXHJcbiAgICAgICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MoKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZHVyYXRpb25jaGFuZ2VcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgY3VycmVudCBwbGF5bGlzdCBpcyBlbmRlZFxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlbmRlZFwiKTtcclxuXHJcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9DT01QTEVURSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9FUlJPUikge1xyXG4gICAgICAgICAgICBpZih2aWRlb0VuZGVkQ2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIHRoZSBjdXJyZW50IGZyYW1lIG9mIHRoZSBhdWRpby92aWRlb1xyXG4gICAgICAgIC8vRG8gbm90aGluZyBCZWNhdXNlIHRoaXMgY2F1c2VzIGNoYW9zIGJ5IGxvYWRlZG1ldGFkYXRhLlxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogZWxWaWRlby5kdXJhdGlvbixcclxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogZWxWaWRlby52aWRlb1dpZHRoXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIG1ldGEgZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvXHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VzID0gcHJvdmlkZXIuZ2V0U291cmNlcygpO1xyXG4gICAgICAgIGxldCBzb3VyY2VJbmRleCA9IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcclxuICAgICAgICBsZXQgdHlwZSA9IHNvdXJjZUluZGV4ID4gLTEgPyBzb3VyY2VzW3NvdXJjZUluZGV4XS50eXBlIDogXCJcIjtcclxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBwcm92aWRlci5pc0xpdmUoKSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb24sXHJcbiAgICAgICAgICAgIHR5cGUgOnR5cGVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcm92aWRlci5zZXRNZXRhTG9hZGVkKCk7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRtZXRhZGF0YVwiLCBtZXRhZGF0YSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMucGF1c2UgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBwYXVzZWRcclxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9DT01QTEVURSB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9FUlJPUil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxWaWRlby5lbmRlZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxWaWRlby5lcnJvcil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxWaWRlby5jdXJyZW50VGltZSA9PT0gZWxWaWRlby5kdXJhdGlvbil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBhdXNlXCIpO1xyXG5cclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5sb2Fkc3RhcnQgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKCFwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuc2hvd0JpZ1BsYXlCdXR0b24gJiYgcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9TdGFydCkge1xyXG4gICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXkgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gc3RhcnRlZCBvciBpcyBubyBsb25nZXIgcGF1c2VkXHJcbiAgICAgICAgc3RhbGxlZCA9IC0xO1xyXG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXlpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcclxuICAgICAgICBpZihzdGFsbGVkIDwgMCl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGlzIGRvd25sb2FkaW5nIHRoZSBhdWRpby92aWRlb1xyXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcclxuICAgICAgICBpZighdGltZVJhbmdlcyApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uLCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcclxuXHJcbiAgICAgICAgcHJvdmlkZXIuc2V0QnVmZmVyKGJ1ZmZlcmVkKjEwMCk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xyXG4gICAgICAgICAgICBidWZmZXJQZXJjZW50OiBidWZmZXJlZCoxMDAsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAgcG9zaXRpb24sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwcm9ncmVzc1wiLCBidWZmZXJlZCoxMDApO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb247XHJcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VjdGlvblN0YXJ0ID0gcHJvdmlkZXIuZ2V0U291cmNlcygpW3Byb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKV0uc2VjdGlvblN0YXJ0O1xyXG5cclxuICAgICAgICBpZiAoc2VjdGlvblN0YXJ0ICYmIHBvc2l0aW9uIDwgc2VjdGlvblN0YXJ0ICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcclxuXHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNlZWsoc2VjdGlvblN0YXJ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZWN0aW9uRW5kID0gcHJvdmlkZXIuZ2V0U291cmNlcygpW3Byb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKV0uc2VjdGlvbkVuZDtcclxuXHJcbiAgICAgICAgaWYgKHNlY3Rpb25FbmQgJiYgcG9zaXRpb24gPiBzZWN0aW9uRW5kICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcclxuXHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnN0b3AoKTtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1NvbWV0aW1lcyBkYXNoIGxpdmUgZ2F2ZSB0byBtZSBjcmF6eSBkdXJhdGlvbi4gKDkwMDcxOTkyNTQ3NDA5OTEuLi4pIHdoeT8/P1xyXG4gICAgICAgIGlmKGR1cmF0aW9uID4gOTAwMDAwMDAwMDAwMDAwMCl7ICAgIC8vOTAwNzE5OTI1NDc0MDk5MVxyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IEluZmluaXR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpICYmICFlbFZpZGVvLnBhdXNlZCAmJiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfU1RBTExFRCB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9MT0FESU5HIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcpICYmXHJcbiAgICAgICAgICAgICFjb21wYXJlU3RhbGxlZFRpbWUoc3RhbGxlZCwgcG9zaXRpb24pICl7XHJcbiAgICAgICAgICAgIHN0YWxsZWQgPSAtMTtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VjdGlvblN0YXJ0ICYmIHNlY3Rpb25TdGFydCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24gLSBzZWN0aW9uU3RhcnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWN0aW9uRW5kKSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0gc2VjdGlvbkVuZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWN0aW9uU3RhcnQpIHtcclxuICAgICAgICAgICAgZHVyYXRpb24gPSBkdXJhdGlvbiAtIHNlY3Rpb25TdGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HIHx8IHByb3ZpZGVyLmlzU2Vla2luZygpKSB7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FLCB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2luZyA9ICgpID0+IHtcclxuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKHRydWUpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVraW5nXCIsIGVsVmlkZW8uY3VycmVudFRpbWUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLLHtcclxuICAgICAgICAgICAgcG9zaXRpb24gOiBlbFZpZGVvLmN1cnJlbnRUaW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2VkID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtlZFwiKTtcclxuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKGZhbHNlKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFS0VEKTtcclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMuc3RhbGxlZCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc3RhbGxlZFwiKTtcclxuICAgICAgICAvL1RoaXMgY2FsbGJhY2sgZG9lcyBub3Qgd29yayBvbiBjaHJvbWUuIFRoaXMgY2FsbHMgb24gRmlyZWZveCBpbnRlcm1pdHRlbnQuIFRoZW4gZG8gbm90IHdvcmsgaGVyZS4gdXNpbmcgd2FpdGluZyBldmVudC5cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMud2FpdGluZyA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIHZpZGVvIHN0b3BzIGJlY2F1c2UgaXQgbmVlZHMgdG8gYnVmZmVyIHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgaWYocHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgc3RhbGxlZCA9IGVsVmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1NUQUxMRUQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMudm9sdW1lY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB2b2x1bWVjaGFuZ2VcIiwgTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCkpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIHtcclxuICAgICAgICAgICAgdm9sdW1lOiBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSxcclxuICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5lcnJvciA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjb2RlID0gKGVsVmlkZW8uZXJyb3IgJiYgZWxWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xyXG4gICAgICAgIGxldCBjb252ZXJ0ZWRFcnJvQ29kZSA9ICh7XHJcbiAgICAgICAgICAgIDA6IFBMQVlFUl9VTktOV09OX0VSUk9SLFxyXG4gICAgICAgICAgICAxOiBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXHJcbiAgICAgICAgICAgIDI6IFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IsXHJcbiAgICAgICAgICAgIDM6IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcclxuICAgICAgICAgICAgNDogUExBWUVSX0ZJTEVfRVJST1JcclxuICAgICAgICB9W2NvZGVdfHwwKTtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVycm9yXCIsIGNvbnZlcnRlZEVycm9Db2RlKTtcclxuICAgICAgICBlcnJvclRyaWdnZXIoRVJST1JTLmNvZGVzW2NvbnZlcnRlZEVycm9Db2RlXSwgcHJvdmlkZXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xyXG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgICAgIGVsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI3Li5cclxuICovXHJcbmltcG9ydCBJbWEgZnJvbSBcImFwaS9hZHMvaW1hL0FkXCI7XHJcbmltcG9ydCBWYXN0IGZyb20gXCJhcGkvYWRzL3Zhc3QvQWRcIjtcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9MaXN0ZW5lclwiO1xyXG5pbXBvcnQge3BpY2tDdXJyZW50U291cmNlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBXQVJOX01TR19NVVRFRFBMQVksXHJcbiAgICBVSV9JQ09OUywgUExBWUVSX1dBUk5JTkcsXHJcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLCBTVEFURV9FUlJPUixcclxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLCBTVEFURV9BRF9QTEFZSU5HLCBTVEFURV9BRF9QQVVTRUQsXHJcbiAgICBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCxcclxuICAgIEFEX0NMSUVOVF9HT09HTEVJTUEsIEFEX0NMSUVOVF9WQVNULFxyXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgQ29yZSBGb3IgSHRtbDUgVmlkZW8uXHJcbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xyXG4gKiBAcGFyYW0gICBvbkV4dGVuZGVkTG9hZCBvbiBsb2FkIGhhbmRsZXJcclxuICogKi9cclxuY29uc3QgUHJvdmlkZXIgPSBmdW5jdGlvbiAoc3BlYywgcGxheWVyQ29uZmlnLCBvbkV4dGVuZGVkTG9hZCl7XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbUHJvdmlkZXJdIGxvYWRlZC4gXCIpO1xyXG5cclxuICAgIGxldCB0aGF0ID17fTtcclxuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcclxuXHJcbiAgICBsZXQgZGFzaEF0dGFjaGVkVmlldyA9IGZhbHNlO1xyXG5cclxuICAgIGxldCBlbFZpZGVvID0gc3BlYy5lbGVtZW50O1xyXG4gICAgbGV0IGFkcyA9IG51bGwsIGxpc3RlbmVyID0gbnVsbCwgdmlkZW9FbmRlZENhbGxiYWNrID0gbnVsbDtcclxuXHJcbiAgICBsZXQgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG5cclxuICAgIGlmKHNwZWMuYWRUYWdVcmwpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltQcm92aWRlcl0gQWQgQ2xpZW50IC0gXCIsIHBsYXllckNvbmZpZy5nZXRBZENsaWVudCgpKTtcclxuICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0QWRDbGllbnQoKSA9PT0gQURfQ0xJRU5UX1ZBU1Qpe1xyXG4gICAgICAgICAgICBhZHMgPSBWYXN0KGVsVmlkZW8sIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFkcyA9IEltYShlbFZpZGVvLCB0aGF0LCBwbGF5ZXJDb25maWcsIHNwZWMuYWRUYWdVcmwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIWFkcyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKGVsVmlkZW8sIHRoYXQsIGFkcyA/IGFkcy52aWRlb0VuZGVkQ2FsbGJhY2sgOiBudWxsLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5ZXJDb25maWcuZ2V0UGxheWJhY2tSYXRlKCk7XHJcblxyXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcclxuICAgICAgICBzcGVjLmZyYW1lcmF0ZSA9IHNvdXJjZS5mcmFtZXJhdGU7XHJcblxyXG4gICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XHJcblxyXG4gICAgICAgIGlmKCFzcGVjLmZyYW1lcmF0ZSl7XHJcbiAgICAgICAgICAgIC8vaW5pdCB0aW1lY29kZSBtb2RlXHJcbiAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRUaW1lY29kZU1vZGUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9uRXh0ZW5kZWRMb2FkKXtcclxuICAgICAgICAgICAgb25FeHRlbmRlZExvYWQoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHByZXZpb3VzU291cmNlID0gZWxWaWRlby5zcmM7XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zdCBzb3VyY2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XHJcbiAgICAgICAgICAgIC8vIHNvdXJjZUVsZW1lbnQuc3JjID0gc291cmNlLmZpbGU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VDaGFuZ2VkID0gKHNvdXJjZS5maWxlICE9PSBwcmV2aW91c1NvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VDaGFuZ2VkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZWxWaWRlby5zcmMgPSBzb3VyY2UuZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0Rvbid0IHVzZSB0aGlzLiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDYzNzc4NC9kZXRlY3QtYW4tZXJyb3Itb24taHRtbDUtdmlkZW9cclxuICAgICAgICAgICAgICAgIC8vZWxWaWRlby5hcHBlbmQoc291cmNlRWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGNhbGwgbG9hZCBpZiBzcmMgd2FzIG5vdCBzZXQuIGxvYWQoKSB3aWxsIGNhbmNlbCBhbnkgYWN0aXZlIHBsYXkgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NvdXJjZSB8fCBwcmV2aW91c1NvdXJjZSA9PT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gJiYgbGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyp0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc3BlYy5jdXJyZW50U291cmNlXHJcbiAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5jYW5TZWVrID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmNhblNlZWs7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDYW5TZWVrID0gKGNhblNlZWspID0+IHtcclxuICAgICAgICBzcGVjLmNhblNlZWsgPSBjYW5TZWVrO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNTZWVraW5nID0gKCk9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zZWVraW5nO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0U2Vla2luZyA9IChzZWVraW5nKT0+e1xyXG4gICAgICAgIHNwZWMuc2Vla2luZyA9IHNlZWtpbmc7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNZXRhTG9hZGVkID0gKCkgPT4ge1xyXG4gICAgICAgIHNwZWMuaXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIHRoYXQubWV0YUxvYWRlZCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5pc0xvYWRlZDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMuc3RhdGUgIT09IG5ld1N0YXRlKXtcclxuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHNldFN0YXRlKClcIiwgbmV3U3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgLy9Ub0RvIDogVGhpcyBpcyB0ZW1wb3JhcnkgY29kZS4gSWYgbWFpbiB2aWRlbyBvY2N1ciBlcnJvciwgcGxheWVyIGF2b2lkIGVycm9yIG1lc3NhZ2Ugb24gYWQgcGxheWluZy5cclxuICAgICAgICAgICAgaWYocHJldlN0YXRlID09PSBTVEFURV9BRF9QTEFZSU5HICYmIChuZXdTdGF0ZSA9PT0gU1RBVEVfRVJST1IgfHwgbmV3U3RhdGUgPT09IFNUQVRFX0lETEUpICl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIDIwMTktMDYtMTNcclxuICAgICAgICAgICAgICogTm8gbW9yZSBuZWNlc3NhcnkgdGhpcyBjb2Rlcy5cclxuICAgICAgICAgICAgICogQ2hlY2tpbmcgdGhlIGF1dG9QbGF5IHN1cHBvcnQgd2FzIHVzaW5nIG1haW4gdmlkZW8gZWxlbWVudC4gZWxWaWRlby5wbGF5KCkgLT4geWVzIG9yIG5vPz9cclxuICAgICAgICAgICAgICogQW5kIHRoZW4gdGhhdCBjYXVzZXMgdHJpZ2dlcmluZyBwbGF5IGFuZCBwYXVzZSBldmVudC5cclxuICAgICAgICAgICAgICogQW5kIHRoYXQgY2hlY2tpbmcgd2FpdHMgZm9yIGVsVmlkZW8gbG9hZGVkLiBEYXNoIGxvYWQgY29tcGxldGlvbiB0aW1lIGlzIHVua25vd24uXHJcbiAgICAgICAgICAgICAqIFRoZW4gSSBjaGFuZ2VkIGNoZWNrIG1ldGhvZC4gSSBtYWtlIHRlbXBvcmFyeSB2aWRlbyB0YWcgYW5kIGluc2VydCBlbXB0eSB2aWRlby5cclxuICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgLy9pZiAoKHByZXZTdGF0ZSA9PT0gU1RBVEVfQURfUExBWUlORyB8fCBwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BBVVNFRCApICYmIChuZXdTdGF0ZSA9PT0gU1RBVEVfUEFVU0VEIHx8IG5ld1N0YXRlID09PSBTVEFURV9QTEFZSU5HKSkge1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vQWRzIGNoZWNrcyBjaGVja0F1dG9wbGF5U3VwcG9ydCgpLiBJdCBjYWxscyByZWFsIHBsYXkoKSBhbmQgcGF1c2UoKSB0byB2aWRlbyBlbGVtZW50LlxyXG4gICAgICAgICAgICAvL0FuZCB0aGVuIHRoYXQgdHJpZ2dlcnMgXCJwbGF5aW5nXCIgYW5kIFwicGF1c2VcIi5cclxuICAgICAgICAgICAgLy9JIHByZXZlbnQgdGhlc2UgcHJvY2Vzcy5cclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHRyaWdnZXJTYXRhdHVzXCIsIG5ld1N0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAobmV3U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfUEFVU0VEXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0FEX1BBVVNFRCA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9BRF9QQVVTRURcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BMQVlJTkdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUExBWUlORyA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BMQVlJTkdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcGVjLnN0YXRlID0gbmV3U3RhdGU7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcclxuICAgICAgICAgICAgICAgIHByZXZzdGF0ZTogcHJldlN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcclxuICAgICAgICBzcGVjLmJ1ZmZlciA9IG5ld0J1ZmZlcjtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5idWZmZXI7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0xpdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNMaXZlID8gdHJ1ZSA6IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhhdC5pc0xpdmUoKSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb247XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5jdXJyZW50VGltZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbFZpZGVvLnZvbHVtZSA9IHZvbHVtZS8xMDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby52b2x1bWUqMTAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XHJcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHN0YXRlO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xyXG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XHJcblxyXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XHJcblxyXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzTXV0ZSgpKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRWb2x1bWUocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XHJcblxyXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XHJcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgICAgIF9sb2FkKHNwZWMuc291cmNlcy5zdGFydHRpbWUgfHwgMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGxheSA9ICgpID0+e1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHBsYXkoKVwiKTtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vVGVzdCBpdCB0aG9yb3VnaGx5IGFuZCByZW1vdmUgaXNQbGF5aW5nUHJvY2Vzc2luZy4gTW9zdCBvZiB0aGUgaGF6YXJkcyBoYXZlIGJlZW4gcmVtb3ZlZC4gYSBsb3Qgb2Ygbm9uYmxvY2tpbmcgcGxheSgpIHdheSAtPiBibG9ja2luZyBwbGF5KClcclxuICAgICAgICAvLyBpZihpc1BsYXlpbmdQcm9jZXNzaW5nKXtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IHRydWU7XHJcbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgaWYgKCAgKGFkcyAmJiBhZHMuaXNBY3RpdmUoKSkgfHwgKGFkcyAmJiAhYWRzLnN0YXJ0ZWQoKSkgKSB7XHJcbiAgICAgICAgICAgICAgICBhZHMucGxheSgpLnRoZW4oXyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZHMgcGxheSBzdWNjZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogYWRzIHBsYXkgc3VjY2Vzc1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZHMgcGxheSBmYWlsIG1heWJlIGNhdXNlIHVzZXIgaW50ZXJhY3RpdmUgbGVzc1xyXG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IGFkcyBwbGF5IGZhaWxcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG11dGVkUGxheSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1dBUk5JTkcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlIDogV0FSTl9NU0dfTVVURURQTEFZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyIDogMTAgKiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25DbGFzcyA6IFVJX0lDT05TLnZvbHVtZV9tdXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2tDYWxsYmFjayA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IGVycm9yXCIsIGVycm9yLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighbXV0ZWRQbGF5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9JRSBwcm9taXNlIGlzIHVuZGVmaW5kZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IHN1Y2Nlc3MgKGllKVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHBhdXNlKClcIik7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICB9ZWxzZSBpZih0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBhZHMucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcclxuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcclxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uU3RhcnQ6IHNvdXJjZS5zZWN0aW9uU3RhcnQsXHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uRW5kOiBzb3VyY2Uuc2VjdGlvbkVuZCxcclxuICAgICAgICAgICAgICAgIGdyaWRUaHVtYm5haWw6IHNvdXJjZS5ncmlkVGh1bWJuYWlsLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHNvdXJjZS5sb3dMYXRlbmN5KSB7XHJcbiAgICAgICAgICAgICAgICBvYmoubG93TGF0ZW5jeSA9IHNvdXJjZS5sb3dMYXRlbmN5O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcclxuXHJcbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XHJcbiAgICAgICAgICAgIGlmKHNwZWMuc291cmNlcyAmJiBzcGVjLnNvdXJjZXMubGVuZ3RoID4gc291cmNlSW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgY2hhbmdlZCA6IFwiICsgc291cmNlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gc291cmNlSW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzb3VyY2VJbmRleFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlSW5kZXgoc291cmNlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgLy9wbGF5ZXJDb25maWcuc2V0U291cmNlTGFiZWwoc3BlYy5zb3VyY2VzW3NvdXJjZUluZGV4XS5sYWJlbCk7XHJcbiAgICAgICAgICAgICAgICAvL3NwZWMuY3VycmVudFF1YWxpdHkgPSBzb3VyY2VJbmRleDtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQoZWxWaWRlby5jdXJyZW50VGltZSB8fCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGV2ZWxzO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nXHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0RnJhbWVyYXRlID0gKGZyYW1lcmF0ZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZSA9IGZyYW1lcmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PntcclxuICAgICAgICBsZXQgZnBzID0gc3BlYy5mcmFtZXJhdGU7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZXMgPSBlbFZpZGVvLmN1cnJlbnRUaW1lICogZnBzO1xyXG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XHJcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXHJcblxyXG4gICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XHJcblxyXG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdwcmVsb2FkJyk7XHJcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xyXG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVDaGlsZChlbFZpZGVvLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XHJcbiAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5zdG9wKCk7XHJcbiAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIC8vZWxWaWRlby5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgaWYoYWRzKXtcclxuICAgICAgICAgICAgYWRzLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgYWRzID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZGVzdHJveSgpIHBsYXllciBzdG9wLCBsaXN0ZW5lciwgZXZlbnQgZGVzdHJvaWVkXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cclxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcclxuICAgIHRoYXQuc3VwZXIgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9