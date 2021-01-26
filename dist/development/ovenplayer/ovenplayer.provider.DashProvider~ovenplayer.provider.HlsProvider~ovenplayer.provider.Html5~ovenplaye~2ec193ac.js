/*! ovenplayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (MIT) | Github : https://ovenplayer.com */
(window["webpackJsonpOvenPlayer"] = window["webpackJsonpOvenPlayer"] || []).push([["ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac"],{

/***/ "./src/js/api/ads/ima/Ad.js":
/*!**********************************!*\
  !*** ./src/js/api/ads/ima/Ad.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Listener = __webpack_require__(/*! api/ads/ima/Listener */ "./src/js/api/ads/ima/Listener.js");

var _Listener2 = _interopRequireDefault(_Listener);

var _utils = __webpack_require__(/*! api/ads/utils */ "./src/js/api/ads/utils.js");

var _likeA$ = __webpack_require__(/*! utils/likeA$.js */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 08/04/2019.
 */
var Ad = function Ad(elVideo, provider, playerConfig, adTagUrl, errorCallback) {
    //Todo : move createAdContainer to MediaManager
    var AUTOPLAY_NOT_ALLOWED = "autoplayNotAllowed";
    var ADMANGER_LOADING_ERROR = "admanagerLoadingTimeout";
    var ADS_MANAGER_LOADED = "";
    var AD_ERROR = "";

    var that = {};
    var adsManagerLoaded = false;
    var adsErrorOccurred = false;
    var spec = {
        started: false, //player started
        active: false, //on Ad
        isVideoEnded: false
    };
    var OnManagerLoaded = null;
    var OnAdError = null;

    var adDisplayContainer = null;
    var adsLoader = null;
    var adsManager = null;
    var listener = null;
    var adsRequest = null;
    var autoplayAllowed = false,
        autoplayRequiresMuted = false;
    var browser = playerConfig.getBrowser();
    var isMobile = browser.os === "Android" || browser.os === "iOS";

    var adDisplayContainerInitialized = false;

    // google.ima.settings.setAutoPlayAdBreaks(false);
    //google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);

    //google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
    //google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
    var sendWarningMessageForMutedPlay = function sendWarningMessageForMutedPlay() {
        provider.trigger(_constants.PLAYER_WARNING, {
            message: _constants.WARN_MSG_MUTEDPLAY,
            timer: 10 * 1000,
            iconClass: _constants.UI_ICONS.volume_mute,
            onClickCallback: function onClickCallback() {
                provider.setMute(false);
            }
        });
    };
    OvenPlayerConsole.log("IMA : started ", "isMobile : ", isMobile, adTagUrl);

    try {
        ADS_MANAGER_LOADED = google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED;
        AD_ERROR = google.ima.AdErrorEvent.Type.AD_ERROR;
        google.ima.settings.setLocale(playerConfig.getLanguage());
        google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);

        var createAdContainer = function createAdContainer() {
            var adContainer = document.createElement('div');
            adContainer.setAttribute('class', 'op-ads');
            adContainer.setAttribute('id', 'op-ads');
            playerConfig.getContainer().append(adContainer);

            return adContainer;
        };
        OnAdError = function OnAdError(adErrorEvent) {
            //note : adErrorEvent.getError().getInnerError().getErrorCode() === 1205 & adErrorEvent.getError().getVastErrorCode() === 400 is Browser User Interactive error.

            //Do not triggering ERROR. becuase It just AD!

            console.log(adErrorEvent.getError().getVastErrorCode(), adErrorEvent.getError().getMessage());
            adsErrorOccurred = true;
            var innerError = adErrorEvent.getError().getInnerError();
            if (innerError) {
                console.log(innerError.getErrorCode(), innerError.getMessage());
            }
            /*if (adsManager) {
                adsManager.destroy();
            }*/
            provider.trigger(_constants.STATE_AD_ERROR, { code: adErrorEvent.getError().getVastErrorCode(), message: adErrorEvent.getError().getMessage() });
            spec.active = false;
            spec.started = true;
            provider.play();

            /*if(innerError && innerError.getErrorCode() === 1205){
             }else{
               }*/
        };
        OnManagerLoaded = function OnManagerLoaded(adsManagerLoadedEvent) {

            OvenPlayerConsole.log("IMA : OnManagerLoaded ");
            var adsRenderingSettings = new google.ima.AdsRenderingSettings();
            adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
            //adsRenderingSettings.useStyledNonLinearAds = true;
            if (adsManager) {
                OvenPlayerConsole.log("IMA : destroy adsManager----");
                listener.destroy();
                listener = null;
                adsManager.destroy();
                adsManager = null;
            }
            adsManager = adsManagerLoadedEvent.getAdsManager(elVideo, adsRenderingSettings);

            listener = (0, _Listener2["default"])(adsManager, provider, spec, OnAdError);

            OvenPlayerConsole.log("IMA : created admanager and listner ");

            adsManagerLoaded = true;
        };
        var adConatinerElment = createAdContainer();
        adDisplayContainer = new google.ima.AdDisplayContainer(adConatinerElment, elVideo);
        adsLoader = new google.ima.AdsLoader(adDisplayContainer);

        adsLoader.addEventListener(ADS_MANAGER_LOADED, OnManagerLoaded, false);
        adsLoader.addEventListener(AD_ERROR, OnAdError, false);

        OvenPlayerConsole.log("IMA : adDisplayContainer initialized");
        provider.on(_constants.CONTENT_VOLUME, function (data) {
            if (adsManager) {
                if (data.mute) {
                    adsManager.setVolume(0);
                } else {
                    adsManager.setVolume(data.volume / 100);
                }
            }
        }, that);

        var setAutoPlayToAdsRequest = function setAutoPlayToAdsRequest() {
            if (adsRequest) {
                OvenPlayerConsole.log("IMA : setADWillAutoPlay ", "autoplayAllowed", autoplayAllowed, "autoplayRequiresMuted", autoplayRequiresMuted);

                adsRequest.setAdWillAutoPlay(autoplayAllowed);
                adsRequest.setAdWillPlayMuted(autoplayRequiresMuted);
                if (autoplayRequiresMuted) {
                    sendWarningMessageForMutedPlay();
                }
            }
        };

        var initRequest = function initRequest() {
            adsManagerLoaded = false;
            OvenPlayerConsole.log("IMA : initRequest() AutoPlay Support : ", "autoplayAllowed", autoplayAllowed, "autoplayRequiresMuted", autoplayRequiresMuted);
            /*if(adsRequest){
             return false;
             }*/
            adsRequest = new google.ima.AdsRequest();

            adsRequest.forceNonLinearFullSlot = false;
            /*if(playerConfig.getBrowser().browser === "Safari" && playerConfig.getBrowser().os === "iOS" ){
             autoplayAllowed = false;
             autoplayRequiresMuted = false;
             }*/

            setAutoPlayToAdsRequest();
            adsRequest.adTagUrl = adTagUrl;

            adsLoader.requestAds(adsRequest);
            OvenPlayerConsole.log("IMA : requestAds Complete");
            //two way what ad starts.
            //adsLoader.requestAds(adsRequest); or  adsManager.start();
            //what? why?? wth??
        };

        var checkAutoplaySupport = function checkAutoplaySupport() {
            OvenPlayerConsole.log("IMA : checkAutoplaySupport() ");

            var temporarySupportCheckVideo = document.createElement('video');
            temporarySupportCheckVideo.setAttribute('playsinline', 'true');
            temporarySupportCheckVideo.src = _utils.TEMP_VIDEO_URL;
            temporarySupportCheckVideo.load();

            //Dash has already loaded when triggered provider.play() always.
            if (isMobile && provider.getName() !== _constants.PROVIDER_DASH) {
                //Main video sets user gesture when temporarySupportCheckVideo triggered checking.
                elVideo.load();
            }
            /* Different browser-specific ways to delivery UI to other elements.  My Guess. 2019-06-19
            *   (temporarySupportCheckVideo's User Interaction delivery to elVideo.)
            *   Mobile Chrome WebView :
            *   You have to run elVideo.load() when temporarySupportCheckVideo issues within 5 seconds of user interaction.
            *
            *   Mobile ios safari :
            *   You have to run elVideo.load() before temporarySupportCheckVideo run play().
            * */

            var clearAndReport = function clearAndReport(_autoplayAllowed, _autoplayRequiresMuted) {
                autoplayAllowed = _autoplayAllowed;
                autoplayRequiresMuted = _autoplayRequiresMuted;
                temporarySupportCheckVideo.pause();
                temporarySupportCheckVideo.remove();

                setAutoPlayToAdsRequest();
            };

            return new Promise(function (resolve, reject) {
                if (!temporarySupportCheckVideo.play) {
                    //I can't remember this case...
                    OvenPlayerConsole.log("IMA : !temporarySupportCheckVideo.play");
                    clearAndReport(true, false);
                    resolve();
                } else {
                    var playPromise = temporarySupportCheckVideo.play();
                    if (playPromise !== undefined) {
                        playPromise.then(function () {
                            OvenPlayerConsole.log("IMA : auto play allowed.");
                            // If we make it here, unmuted autoplay works.
                            clearAndReport(true, false);
                            resolve();
                        })["catch"](function (error) {

                            OvenPlayerConsole.log("IMA : auto play failed", error.message);
                            clearAndReport(false, false);
                            resolve();

                            //Disable Muted Play
                            /*temporarySupportCheckVideo.muted = true;
                            temporarySupportCheckVideo.volume = 0;
                            playPromise = temporarySupportCheckVideo.play();
                              playPromise.then(function () {
                                // If we make it here, muted autoplay works but unmuted autoplay does not.
                                  OvenPlayerConsole.log("ADS : muted auto play success.");
                                provider.setMute(true);
                                clearAndReport(true, true);
                                resolve();
                              }).catch(function (error) {
                                OvenPlayerConsole.log("ADS : muted auto play failed", error.message);
                                clearAndReport(false, false);
                                resolve();
                            });*/
                        });
                    } else {
                        OvenPlayerConsole.log("IMA : promise not support");
                        //Maybe this is IE11....
                        clearAndReport(true, false);
                        resolve();
                    }
                }
            });
        };

        that.isActive = function () {
            return spec.active;
        };
        that.started = function () {
            return spec.started;
        };
        that.play = function () {
            if (spec.started) {
                return new Promise(function (resolve, reject) {
                    try {
                        adsManager.resume();
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                });
            } else {
                adDisplayContainer.initialize();

                return new Promise(function (resolve, reject) {
                    var retryCount = 0;
                    var checkAdsManagerIsReady = function checkAdsManagerIsReady() {
                        retryCount++;
                        if (adsManagerLoaded) {
                            OvenPlayerConsole.log("IMA : ad start!");
                            adsManager.init("100%", "100%", google.ima.ViewMode.NORMAL);
                            adsManager.start();
                            spec.started = true;

                            resolve();
                        } else {
                            if (adsErrorOccurred) {
                                reject(new Error(ADMANGER_LOADING_ERROR));
                            } else {
                                if (retryCount < 150) {
                                    setTimeout(checkAdsManagerIsReady, 100);
                                } else {
                                    reject(new Error(ADMANGER_LOADING_ERROR));
                                }
                            }
                        }
                    };
                    checkAutoplaySupport().then(function () {
                        if (playerConfig.isAutoStart() && !autoplayAllowed) {
                            OvenPlayerConsole.log("IMA : autoplayAllowed : false");
                            spec.started = false;
                            reject(new Error(AUTOPLAY_NOT_ALLOWED));
                        } else {
                            initRequest();
                            checkAdsManagerIsReady();
                        }
                    });
                });
            }
        };
        that.pause = function () {
            adsManager.pause();
        };
        that.videoEndedCallback = function (completeContentCallback) {
            //listener.isLinearAd : get current ad's status whether linear ad or not.
            if (listener && (listener.isAllAdComplete() || !listener.isLinearAd())) {
                completeContentCallback();
            } else if (adsErrorOccurred) {
                completeContentCallback();
            } else {
                //If you need play the post-roll, you have to call to adsLoader when contents was completed.
                spec.isVideoEnded = true;
                adsLoader.contentComplete();
            }
        };

        that.destroy = function () {

            if (adsLoader) {
                adsLoader.removeEventListener(ADS_MANAGER_LOADED, OnManagerLoaded);
                adsLoader.removeEventListener(AD_ERROR, OnAdError);
            }

            if (adsManager) {
                adsManager.destroy();
            }

            if (adDisplayContainer) {
                adDisplayContainer.destroy();
            }

            if (listener) {
                listener.destroy();
            }

            var $ads = (0, _likeA$2["default"])(playerConfig.getContainer()).find(".op-ads");
            if ($ads) {
                $ads.remove();
            }

            provider.off(_constants.CONTENT_VOLUME, null, that);
        };

        return that;
    } catch (error) {
        //let tempError = ERRORS[INIT_ADS_ERROR];
        //tempError.error = error;
        //errorCallback(tempError);
        return null;
    }
};

exports["default"] = Ad;

/***/ }),

/***/ "./src/js/api/ads/ima/Listener.js":
/*!****************************************!*\
  !*** ./src/js/api/ads/ima/Listener.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var Listener = function Listener(adsManager, provider, adsSpec, OnAdError) {
    var that = {};
    var lowLevelEvents = {};

    var intervalTimer = null;

    var AD_BUFFERING = google.ima.AdEvent.Type.AD_BUFFERING;
    var CONTENT_PAUSE_REQUESTED = google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED;
    var CONTENT_RESUME_REQUESTED = google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED;
    var AD_ERROR = google.ima.AdErrorEvent.Type.AD_ERROR;
    var ALL_ADS_COMPLETED = google.ima.AdEvent.Type.ALL_ADS_COMPLETED;
    var CLICK = google.ima.AdEvent.Type.CLICK;
    var SKIPPED = google.ima.AdEvent.Type.SKIPPED;
    var COMPLETE = google.ima.AdEvent.Type.COMPLETE;
    var FIRST_QUARTILE = google.ima.AdEvent.Type.FIRST_QUARTILE;
    var LOADED = google.ima.AdEvent.Type.LOADED;
    var MIDPOINT = google.ima.AdEvent.Type.MIDPOINT;
    var PAUSED = google.ima.AdEvent.Type.PAUSED;
    var RESUMED = google.ima.AdEvent.Type.RESUMED;
    var STARTED = google.ima.AdEvent.Type.STARTED;
    var USER_CLOSE = google.ima.AdEvent.Type.USER_CLOSE;
    var THIRD_QUARTILE = google.ima.AdEvent.Type.THIRD_QUARTILE;

    var isAllAdCompelete = false; //Post roll을 위해
    var adCompleteCallback = null;
    var currentAd = null;
    OvenPlayerConsole.log("IMA : Listener Created");
    lowLevelEvents[CONTENT_PAUSE_REQUESTED] = function (adEvent) {
        OvenPlayerConsole.log("IMA LISTENER : ", adEvent.type);

        //This callls when player is playing contents for ad.
        if (adsSpec.started) {
            adsSpec.active = true;
            provider.pause();
        }
    };

    lowLevelEvents[CONTENT_RESUME_REQUESTED] = function (adEvent) {
        OvenPlayerConsole.log("IMA LISTENER : ", adEvent.type);
        //This calls when one ad ended.
        //And this is signal what play the contents.
        adsSpec.active = false;

        if (adsSpec.started && (provider.getPosition() === 0 || !adsSpec.isVideoEnded)) {
            provider.play();
        }
    };
    lowLevelEvents[AD_ERROR] = function (adEvent) {
        isAllAdCompelete = true;
        OnAdError(adEvent);
    };

    lowLevelEvents[ALL_ADS_COMPLETED] = function (adEvent) {
        OvenPlayerConsole.log("IMA LISTENER : ", adEvent.type);

        isAllAdCompelete = true;
        if (adsSpec.isVideoEnded) {
            provider.setState(_constants.STATE_COMPLETE);
        }
    };
    lowLevelEvents[CLICK] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        provider.trigger(_constants.PLAYER_CLICKED, { type: _constants.PLAYER_AD_CLICK });
    };
    lowLevelEvents[FIRST_QUARTILE] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
    };
    //
    lowLevelEvents[AD_BUFFERING] = function (adEvent) {
        OvenPlayerConsole.log("AD_BUFFERING", adEvent.type);
    };
    lowLevelEvents[LOADED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        var remainingTime = adsManager.getRemainingTime();
        var ad = adEvent.getAd();
        provider.trigger(_constants.STATE_AD_LOADED, { remaining: remainingTime, isLinear: ad.isLinear() });
    };
    lowLevelEvents[MIDPOINT] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
    };
    lowLevelEvents[PAUSED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        provider.setState(_constants.STATE_AD_PAUSED);
    };
    lowLevelEvents[RESUMED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        provider.setState(_constants.STATE_AD_PLAYING);
    };

    lowLevelEvents[STARTED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        var ad = adEvent.getAd();
        currentAd = ad;

        var adObject = {
            isLinear: ad.isLinear(),
            duration: ad.getDuration(),
            skipTimeOffset: ad.getSkipTimeOffset() //The number of seconds of playback before the ad becomes skippable.
        };
        provider.trigger(_constants.AD_CHANGED, adObject);

        if (ad.isLinear()) {

            provider.setState(_constants.STATE_AD_PLAYING);
            adsSpec.started = true;
            // For a linear ad, a timer can be started to poll for
            // the remaining time.
            intervalTimer = setInterval(function () {
                var remainingTime = adsManager.getRemainingTime();
                var duration = ad.getDuration();

                provider.trigger(_constants.AD_TIME, {
                    duration: duration,
                    skipTimeOffset: ad.getSkipTimeOffset(),
                    remaining: remainingTime,
                    position: duration - remainingTime,
                    skippable: adsManager.getAdSkippableState()
                });
            }, 300); // every 300ms
        } else {
            provider.play();
        }
    };
    lowLevelEvents[COMPLETE] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        var ad = adEvent.getAd();
        if (ad.isLinear()) {
            clearInterval(intervalTimer);
        }
        provider.trigger(_constants.STATE_AD_COMPLETE);
    };
    //User skipped ad. same process on complete.
    lowLevelEvents[SKIPPED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);

        var ad = adEvent.getAd();
        if (ad.isLinear()) {
            clearInterval(intervalTimer);
        }
        provider.trigger(_constants.STATE_AD_COMPLETE);
    };
    lowLevelEvents[USER_CLOSE] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        var ad = adEvent.getAd();
        if (ad.isLinear()) {
            clearInterval(intervalTimer);
        }
        provider.trigger(_constants.STATE_AD_COMPLETE);
    };
    lowLevelEvents[THIRD_QUARTILE] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
    };

    Object.keys(lowLevelEvents).forEach(function (eventName) {
        adsManager.removeEventListener(eventName, lowLevelEvents[eventName]);
        adsManager.addEventListener(eventName, lowLevelEvents[eventName]);
    });
    that.setAdCompleteCallback = function (_adCompleteCallback) {
        adCompleteCallback = _adCompleteCallback;
    };
    that.isAllAdComplete = function () {
        return isAllAdCompelete;
    };
    that.isLinearAd = function () {
        return currentAd ? currentAd.isLinear() : true;
    };
    that.destroy = function () {
        OvenPlayerConsole.log("IMAEventListener : destroy()");
        //provider.trigger(STATE_AD_COMPLETE);
        Object.keys(lowLevelEvents).forEach(function (eventName) {
            adsManager.removeEventListener(eventName, lowLevelEvents[eventName]);
        });
    };
    return that;
}; /**
    * Created by hoho on 10/04/2019.
    */

exports["default"] = Listener;

/***/ }),

/***/ "./src/js/api/ads/utils.js":
/*!*********************************!*\
  !*** ./src/js/api/ads/utils.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hoho on 27/06/2019.
 */
var TEMP_VIDEO_URL = exports.TEMP_VIDEO_URL = "data:video/mp4;base64, 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";

/***/ }),

/***/ "./src/js/api/ads/vast/Ad.js":
/*!***********************************!*\
  !*** ./src/js/api/ads/vast/Ad.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vastClient = __webpack_require__(/*! utils/vast-client */ "./src/js/utils/vast-client.js");

var _Listener = __webpack_require__(/*! api/ads/vast/Listener */ "./src/js/api/ads/vast/Listener.js");

var _Listener2 = _interopRequireDefault(_Listener);

var _utils = __webpack_require__(/*! api/ads/utils */ "./src/js/api/ads/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 25/06/2019.
 */

var Ad = function Ad(elVideo, provider, playerConfig, adTagUrl) {
    var AUTOPLAY_NOT_ALLOWED = "autoplayNotAllowed";

    var that = {};
    var spec = {
        started: false, //player started
        active: false, //on Ad
        isVideoEnded: false,
        lang: playerConfig.getLanguage()
    };
    var adsErrorOccurred = false;
    var listener = null;

    var container = "";
    var elAdVideo = null;
    var textView = "";
    var adButton = "";

    var autoplayAllowed = false,
        autoplayRequiresMuted = false;
    var browser = playerConfig.getBrowser();
    var isMobile = browser.os === "Android" || browser.os === "iOS";

    var createAdContainer = function createAdContainer() {
        var adContainer = document.createElement('div');
        adContainer.setAttribute('class', 'op-ads');
        adContainer.setAttribute('id', 'op-ads');
        playerConfig.getContainer().append(adContainer);

        elAdVideo = document.createElement('video');
        elAdVideo.setAttribute('playsinline', 'true');
        elAdVideo.setAttribute('title', 'Advertisement');
        elAdVideo.setAttribute('class', 'op-ads-vast-video');

        adButton = document.createElement('div');
        adButton.setAttribute('class', 'op-ads-button');

        textView = document.createElement('div');
        textView.setAttribute('class', 'op-ads-textview');

        adButton.append(textView);
        adContainer.append(elAdVideo);
        adContainer.append(adButton);

        return adContainer;
    };

    container = createAdContainer();

    var vastClient = new _vastClient.VASTClient();
    var vastTracker = null;
    var ad = null;

    var OnAdError = function OnAdError(error) {
        console.log(error);
        adsErrorOccurred = true;
        elAdVideo.style.display = "none";
        provider.trigger(_constants.STATE_AD_ERROR, { code: error.code, message: error.message });
        spec.active = false;
        spec.started = true;
        provider.play();
    };

    var initRequest = function initRequest() {
        vastClient.get(adTagUrl).then(function (res) {
            // Do something with the parsed VAST response
            OvenPlayerConsole.log("VAST : initRequest()");
            ad = res.ads[0];
            if (!ad) {
                throw { code: 401, message: "File not found. Unable to find Linear/MediaFile from URI." };
            }
            vastTracker = new _vastClient.VASTTracker(vastClient, ad, ad.creatives[0]);

            OvenPlayerConsole.log("VAST : created ad tracker.");

            listener = (0, _Listener2["default"])(elAdVideo, vastTracker, provider, spec, adButton, textView, OnAdError);

            var videoURL = "";
            if (ad.creatives && ad.creatives.length > 0 && ad.creatives[0].mediaFiles && ad.creatives[0].mediaFiles.length > 0 && ad.creatives[0].mediaFiles[0].fileURL) {
                videoURL = ad.creatives[0].mediaFiles[0].fileURL;
                OvenPlayerConsole.log("VAST : media url : ", videoURL);
            }
            elAdVideo.src = videoURL;

            //keep volume even if playlist item changes.
            elAdVideo.volume = elVideo.volume;
            elAdVideo.muted = elVideo.muted;
        })["catch"](function (error) {
            OnAdError(error);
        });
    };

    var checkAutoplaySupport = function checkAutoplaySupport() {
        OvenPlayerConsole.log("VAST : checkAutoplaySupport() ");

        var temporarySupportCheckVideo = document.createElement('video');
        temporarySupportCheckVideo.setAttribute('playsinline', 'true');
        temporarySupportCheckVideo.src = _utils.TEMP_VIDEO_URL;
        temporarySupportCheckVideo.load();

        elAdVideo.load(); //for ios User Interaction problem
        //Dash has already loaded when triggered provider.play() always.
        if (isMobile && provider.getName() !== _constants.PROVIDER_DASH) {
            //Main video sets user gesture when temporarySupportCheckVideo triggered checking.
            elVideo.load();
        }
        var clearAndReport = function clearAndReport(_autoplayAllowed, _autoplayRequiresMuted) {
            autoplayAllowed = _autoplayAllowed;
            autoplayRequiresMuted = _autoplayRequiresMuted;
            temporarySupportCheckVideo.pause();
            temporarySupportCheckVideo.remove();
        };

        return new Promise(function (resolve, reject) {
            if (!temporarySupportCheckVideo.play) {
                //I can't remember this case...
                OvenPlayerConsole.log("VAST : !temporarySupportCheckVideo.play");
                clearAndReport(true, false);
                resolve();
            } else {
                var playPromise = temporarySupportCheckVideo.play();
                if (playPromise !== undefined) {
                    playPromise.then(function () {
                        OvenPlayerConsole.log("VAST : auto play allowed.");
                        // If we make it here, unmuted autoplay works.
                        clearAndReport(true, false);
                        resolve();
                    })["catch"](function (error) {
                        OvenPlayerConsole.log("VAST : auto play failed", error.message);
                        clearAndReport(false, false);
                        resolve();
                    });
                } else {
                    OvenPlayerConsole.log("VAST : promise not support");
                    //Maybe this is IE11....
                    clearAndReport(true, false);
                    resolve();
                }
            }
        });
    };
    that.isActive = function () {
        return spec.active;
    };
    that.started = function () {
        return spec.started;
    };
    that.play = function () {
        if (spec.started) {
            return elAdVideo.play();
        } else {
            return new Promise(function (resolve, reject) {

                var checkMainContentLoaded = function checkMainContentLoaded() {

                    //wait for main contents meta loaded.
                    //have to trigger CONTENT_META first. next trigger AD_CHANGED.
                    //initControlUI first ->  init ad UI
                    //Maybe google ima waits content loaded internal.
                    if (provider.metaLoaded()) {
                        OvenPlayerConsole.log("VAST : main contents meta loaded.");
                        checkAutoplaySupport().then(function () {
                            if (playerConfig.isAutoStart() && !autoplayAllowed) {
                                OvenPlayerConsole.log("VAST : autoplayAllowed : false");
                                spec.started = false;
                                reject(new Error(AUTOPLAY_NOT_ALLOWED));
                            } else {
                                initRequest();

                                resolve();
                            }
                        });
                    } else {
                        setTimeout(checkMainContentLoaded, 100);
                    }
                };
                checkMainContentLoaded();
            });
        }
    };
    that.pause = function () {
        elAdVideo.pause();
    };

    //End Of Main Contents.
    that.videoEndedCallback = function (completeContentCallback) {

        completeContentCallback();
        //check true when main contents ended.
        spec.isVideoEnded = true;
    };
    that.destroy = function () {
        if (listener) {
            listener.destroy();
            listener = null;
        }
        vastTracker = null;
        vastClient = null;

        container.remove();
    };
    return that;
};

exports["default"] = Ad;

/***/ }),

/***/ "./src/js/api/ads/vast/Listener.js":
/*!*****************************************!*\
  !*** ./src/js/api/ads/vast/Listener.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _likeA$ = __webpack_require__(/*! utils/likeA$.js */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 26/06/2019.
 */
var Listener = function Listener(elAdVideo, vastTracker, provider, adsSpec, adButton, textView, OnAdError) {
    var lowLevelEvents = {};
    var that = {};
    var MEDIAFILE_PLAYBACK_ERROR = '405';

    var $textView = (0, _likeA$2["default"])(textView);
    var $adButton = (0, _likeA$2["default"])(adButton);
    var $elAdVideo = (0, _likeA$2["default"])(elAdVideo);

    provider.on(_constants.CONTENT_VOLUME, function (data) {
        if (data.mute) {
            elAdVideo.muted = true;
        } else {
            elAdVideo.muted = false;
            elAdVideo.volume = data.volume / 100;
        }
    }, that);

    //Like a CONTENT_RESUME_REQUESTED
    var processEndOfAd = function processEndOfAd() {
        adsSpec.active = false;

        $adButton.hide();

        if (adsSpec.started && (provider.getPosition() === 0 || !adsSpec.isVideoEnded)) {
            $elAdVideo.hide();
            provider.play();
        }
        provider.trigger(_constants.STATE_AD_COMPLETE);
    };
    //Like a CONTENT_PAUSE_REQUESTED
    var processStartOfAd = function processStartOfAd() {

        $elAdVideo.show();
        $adButton.show();
    };
    var skipButtonClicked = function skipButtonClicked(event) {
        if ($textView.hasClass("videoAdUiAction")) {
            vastTracker.skip();
            elAdVideo.pause();
            processEndOfAd();
        }
    };

    textView.addEventListener("click", skipButtonClicked, false);

    lowLevelEvents.error = function () {
        OvenPlayerConsole.log("VAST : listener : error.", elAdVideo.error);
        console.log("VAST : listener : error.", elAdVideo.error);
        var error = {};
        var code = elAdVideo.error && elAdVideo.error.code || 0;

        if (code === 2) {
            error.code = 402;
            error.message = "Timeout of MediaFile URI.";
        } else if (code === 3) {
            error.code = 405;
            error.message = "Problem displaying MediaFile. Video player found a MediaFile with supported type but couldn’t display it. MediaFile may include: unsupported codecs, different MIME type than MediaFile@type, unsupported delivery method, etc.";
        } else if (code === 4) {
            error.code = 403;
            error.message = "Couldn’t find MediaFile that is supported by this video player, based on the attributes of the MediaFile element.";
        } else {
            error.code = 400;
            error.message = "General Linear error. Video player is unable to display the Linear Ad.";
        }
        vastTracker.errorWithCode(error.code);
        OnAdError(MEDIAFILE_PLAYBACK_ERROR);
    };

    lowLevelEvents.canplay = function () {};
    lowLevelEvents.ended = function () {
        vastTracker.complete();

        processEndOfAd();
    };
    lowLevelEvents.click = function (event) {
        vastTracker.click();
    };
    lowLevelEvents.play = function () {
        vastTracker.setPaused(false);
    };
    lowLevelEvents.pause = function () {
        vastTracker.setPaused(true);
    };
    lowLevelEvents.timeupdate = function (event) {
        vastTracker.setProgress(event.target.currentTime);
        provider.trigger(_constants.AD_TIME, {
            duration: elAdVideo.duration,
            position: elAdVideo.currentTime
        });
    };
    lowLevelEvents.volumechange = function (event) {
        OvenPlayerConsole.log("VAST : listener : Ad Video Volumechange.");
        vastTracker.setMuted(event.target.muted);
    };
    lowLevelEvents.loadedmetadata = function () {
        OvenPlayerConsole.log("VAST : listener : Ad CONTENT LOADED .");

        //Flash play is very fast...
        if (_constants.STATE_PLAYING === provider.getState()) {
            provider.pause();
        }

        vastTracker.trackImpression();

        provider.trigger(_constants.STATE_AD_LOADED, { remaining: elAdVideo.duration, isLinear: true });
        elAdVideo.play();
    };

    vastTracker.on('skip', function () {
        // skip tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : skipped");
    });

    vastTracker.on('mute', function () {
        // mute tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : muted");
    });

    vastTracker.on('unmute', function () {
        // unmute tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : unmuted");
    });

    vastTracker.on('resume', function () {
        // resume tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : vastTracker resumed.");

        //prevent to set STATE_AD_PLAYING when first play.
        if (adsSpec.started) {
            provider.setState(_constants.STATE_AD_PLAYING);
        }
    });
    vastTracker.on('pause', function () {
        // pause tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : vastTracker paused.");
        provider.setState(_constants.STATE_AD_PAUSED);
    });

    vastTracker.on('clickthrough', function (url) {
        // Open the resolved clickThrough url
        OvenPlayerConsole.log("VAST : listener : clickthrough :", url);
        //document.location.href = url;
        window.open(url, '_blank');
    });

    vastTracker.on('skip-countdown', function (data) {
        if (data === 0) {
            if (adsSpec.lang === "ko") {
                $textView.html("광고 건너뛰기<i class='op-con op-arrow-right btn-right'></i>");
            } else {
                $textView.html("Ad Skip<i class='op-con op-arrow-right btn-right'></i>");
            }
            $textView.addClass("videoAdUiAction");
        } else {
            if (adsSpec.lang === "ko") {
                $textView.html(parseInt(data) + 1 + "초 후에 이 광고를 건너뛸 수 있습니다.");
            } else {
                $textView.html("You can skip this ad in " + (parseInt(data) + 1));
            }
        }
    });
    vastTracker.on('rewind', function () {
        OvenPlayerConsole.log("VAST : listener : rewind");
    });

    vastTracker.on('start', function () {
        OvenPlayerConsole.log("VAST : listener : started");

        adsSpec.started = true;
        adsSpec.active = true;
        processStartOfAd();

        provider.trigger(_constants.AD_CHANGED, { isLinear: true });
        provider.setState(_constants.STATE_AD_PLAYING);
    });
    vastTracker.on('firstQuartile', function () {
        // firstQuartile tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : firstQuartile");
    });
    vastTracker.on('midpoint', function () {
        OvenPlayerConsole.log("VAST : listener : midpoint");
    });
    vastTracker.on('thirdQuartile', function () {
        OvenPlayerConsole.log("VAST : listener : thirdQuartile");
    });

    vastTracker.on('creativeView', function () {
        // impression tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : creativeView");
    });

    Object.keys(lowLevelEvents).forEach(function (eventName) {
        elAdVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        elAdVideo.addEventListener(eventName, lowLevelEvents[eventName]);
    });

    that.destroy = function () {
        OvenPlayerConsole.log("EventListener : destroy()");
        textView.removeEventListener("click", skipButtonClicked, false);
        Object.keys(lowLevelEvents).forEach(function (eventName) {
            elAdVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        });
    };
    return that;
};

exports["default"] = Listener;

/***/ }),

/***/ "./src/js/api/provider/utils.js":
/*!**************************************!*\
  !*** ./src/js/api/provider/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pickCurrentSource = exports.errorTrigger = exports.separateLive = exports.extractVideoElement = undefined;

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 2018. 11. 12..
 */
var extractVideoElement = exports.extractVideoElement = function extractVideoElement(elementOrMse) {
    if (_underscore2["default"].isElement(elementOrMse)) {
        return elementOrMse;
    }
    if (elementOrMse.getVideoElement) {
        return elementOrMse.getVideoElement();
    } else if (elementOrMse.media) {
        return elementOrMse.media;
    }
    return null;
};

var separateLive = exports.separateLive = function separateLive(mse) {
    //ToDo : You consider hlsjs. But not now because we don't support hlsjs.

    if (mse && mse.isDynamic) {
        return mse.isDynamic();
    } else {
        return false;
    }
};

var errorTrigger = exports.errorTrigger = function errorTrigger(error, provider) {
    if (provider) {
        provider.setState(_constants.STATE_ERROR);
        provider.pause();
        provider.trigger(_constants.ERROR, error);
    }
};

var pickCurrentSource = exports.pickCurrentSource = function pickCurrentSource(sources, currentSource, playerConfig) {
    var sourceIndex = Math.max(0, currentSource);
    var label = "";
    if (sources) {
        for (var i = 0; i < sources.length; i++) {
            if (sources[i]["default"]) {
                sourceIndex = i;
            }
            if (playerConfig.getSourceIndex() === i) {
                return i;
            }
            /*if (playerConfig.getSourceLabel() && sources[i].label === playerConfig.getSourceLabel() ) {
                return i;
            }*/
        }
    }
    return sourceIndex;
};

/***/ }),

/***/ "./src/js/utils/vast-client.js":
/*!*************************************!*\
  !*** ./src/js/utils/vast-client.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*Copyright (c) 2013 Olivier Poitrey <rs@dailymotion.com>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is furnished
 to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.*/
var Ad = function Ad() {
  _classCallCheck(this, Ad);

  this.id = null, this.sequence = null, this.system = null, this.title = null, this.description = null, this.advertiser = null, this.pricing = null, this.survey = null, this.errorURLTemplates = [], this.impressionURLTemplates = [], this.creatives = [], this.extensions = [];
};

var AdExtension = function AdExtension() {
  _classCallCheck(this, AdExtension);

  this.attributes = {}, this.children = [];
};

var AdExtensionChild = function AdExtensionChild() {
  _classCallCheck(this, AdExtensionChild);

  this.name = null, this.value = null, this.attributes = {};
};

var CompanionAd = function CompanionAd() {
  _classCallCheck(this, CompanionAd);

  this.id = null, this.width = 0, this.height = 0, this.type = null, this.staticResource = null, this.htmlResource = null, this.iframeResource = null, this.altText = null, this.companionClickThroughURLTemplate = null, this.companionClickTrackingURLTemplates = [], this.trackingEvents = {};
};

var Creative = function Creative() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Creative);

  this.id = e.id || null, this.adId = e.adId || null, this.sequence = e.sequence || null, this.apiFramework = e.apiFramework || null, this.trackingEvents = {};
};

var CreativeCompanion = function (_Creative) {
  _inherits(CreativeCompanion, _Creative);

  function CreativeCompanion() {
    var _this;

    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CreativeCompanion);

    (_this = _possibleConstructorReturn(this, (CreativeCompanion.__proto__ || Object.getPrototypeOf(CreativeCompanion)).call(this, e)), _this), _this.type = "companion", _this.variations = [];return _this;
  }

  return CreativeCompanion;
}(Creative);

function track(e, t) {
  resolveURLTemplates(e, t).forEach(function (e) {
    if ("undefined" != typeof window && null !== window) {
      new Image().src = e;
    }
  });
}function resolveURLTemplates(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var r = [];t.ASSETURI && (t.ASSETURI = encodeURIComponentRFC3986(t.ASSETURI)), t.CONTENTPLAYHEAD && (t.CONTENTPLAYHEAD = encodeURIComponentRFC3986(t.CONTENTPLAYHEAD)), t.ERRORCODE && !/^[0-9]{3}$/.test(t.ERRORCODE) && (t.ERRORCODE = 900), t.CACHEBUSTING = leftpad(Math.round(1e8 * Math.random()).toString()), t.TIMESTAMP = encodeURIComponentRFC3986(new Date().toISOString()), t.RANDOM = t.random = t.CACHEBUSTING;for (var i in e) {
    var s = e[i];if ("string" == typeof s) {
      for (var _e in t) {
        var _r = t[_e],
            _i = "[" + _e + "]",
            n = "%%" + _e + "%%";s = (s = s.replace(_i, _r)).replace(n, _r);
      }r.push(s);
    }
  }return r;
}function encodeURIComponentRFC3986(e) {
  return encodeURIComponent(e).replace(/[!'()*]/g, function (e) {
    return "%" + e.charCodeAt(0).toString(16);
  });
}function leftpad(e) {
  return e.length < 8 ? range(0, 8 - e.length, !1).map(function (e) {
    return "0";
  }).join("") + e : e;
}function range(e, t, r) {
  var i = [],
      s = e < t,
      n = r ? s ? t + 1 : t - 1 : t;for (var _t = e; s ? _t < n : _t > n; s ? _t++ : _t--) {
    i.push(_t);
  }return i;
}function isNumeric(e) {
  return !isNaN(parseFloat(e)) && isFinite(e);
}function flatten(e) {
  return e.reduce(function (e, t) {
    return e.concat(Array.isArray(t) ? flatten(t) : t);
  }, []);
}var util = { track: track, resolveURLTemplates: resolveURLTemplates, encodeURIComponentRFC3986: encodeURIComponentRFC3986, leftpad: leftpad, range: range, isNumeric: isNumeric, flatten: flatten };function childByName(e, t) {
  var r = e.childNodes;for (var _e2 in r) {
    var i = r[_e2];if (i.nodeName === t) return i;
  }
}function childrenByName(e, t) {
  var r = [],
      i = e.childNodes;for (var _e3 in i) {
    var s = i[_e3];s.nodeName === t && r.push(s);
  }return r;
}function resolveVastAdTagURI(e, t) {
  if (!t) return e;if (0 === e.indexOf("//")) {
    var _location = location,
        _t2 = _location.protocol;
    return "" + _t2 + e;
  }if (-1 === e.indexOf("://")) {
    return t.slice(0, t.lastIndexOf("/")) + "/" + e;
  }return e;
}function parseBoolean(e) {
  return -1 !== ["true", "TRUE", "1"].indexOf(e);
}function parseNodeText(e) {
  return e && (e.textContent || e.text || "").trim();
}function copyNodeAttribute(e, t, r) {
  var i = t.getAttribute(e);i && r.setAttribute(e, i);
}function parseDuration(e) {
  if (null == e) return -1;if (util.isNumeric(e)) return parseInt(e);var t = e.split(":");if (3 !== t.length) return -1;var r = t[2].split(".");var i = parseInt(r[0]);2 === r.length && (i += parseFloat("0." + r[1]));var s = parseInt(60 * t[1]),
      n = parseInt(60 * t[0] * 60);return isNaN(n) || isNaN(s) || isNaN(i) || s > 3600 || i > 60 ? -1 : n + s + i;
}function splitVAST(e) {
  var t = [];var r = null;return e.forEach(function (i, s) {
    if (i.sequence && (i.sequence = parseInt(i.sequence, 10)), i.sequence > 1) {
      var _t3 = e[s - 1];if (_t3 && _t3.sequence === i.sequence - 1) return void (r && r.push(i));delete i.sequence;
    }r = [i], t.push(r);
  }), t;
}function mergeWrapperAdData(e, t) {
  e.errorURLTemplates = t.errorURLTemplates.concat(e.errorURLTemplates), e.impressionURLTemplates = t.impressionURLTemplates.concat(e.impressionURLTemplates), e.extensions = t.extensions.concat(e.extensions), e.creatives.forEach(function (e) {
    if (t.trackingEvents && t.trackingEvents[e.type]) for (var r in t.trackingEvents[e.type]) {
      var i = t.trackingEvents[e.type][r];e.trackingEvents[r] || (e.trackingEvents[r] = []), e.trackingEvents[r] = e.trackingEvents[r].concat(i);
    }
  }), t.videoClickTrackingURLTemplates && t.videoClickTrackingURLTemplates.length && e.creatives.forEach(function (e) {
    "linear" === e.type && (e.videoClickTrackingURLTemplates = e.videoClickTrackingURLTemplates.concat(t.videoClickTrackingURLTemplates));
  }), t.videoCustomClickURLTemplates && t.videoCustomClickURLTemplates.length && e.creatives.forEach(function (e) {
    "linear" === e.type && (e.videoCustomClickURLTemplates = e.videoCustomClickURLTemplates.concat(t.videoCustomClickURLTemplates));
  }), t.videoClickThroughURLTemplate && e.creatives.forEach(function (e) {
    "linear" === e.type && null == e.videoClickThroughURLTemplate && (e.videoClickThroughURLTemplate = t.videoClickThroughURLTemplate);
  });
}var parserUtils = { childByName: childByName, childrenByName: childrenByName, resolveVastAdTagURI: resolveVastAdTagURI, parseBoolean: parseBoolean, parseNodeText: parseNodeText, copyNodeAttribute: copyNodeAttribute, parseDuration: parseDuration, splitVAST: splitVAST, mergeWrapperAdData: mergeWrapperAdData };function parseCreativeCompanion(e, t) {
  var r = new CreativeCompanion(t);return parserUtils.childrenByName(e, "Companion").forEach(function (e) {
    var t = new CompanionAd();t.id = e.getAttribute("id") || null, t.width = e.getAttribute("width"), t.height = e.getAttribute("height"), t.companionClickTrackingURLTemplates = [], parserUtils.childrenByName(e, "HTMLResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || "text/html", t.htmlResource = parserUtils.parseNodeText(e);
    }), parserUtils.childrenByName(e, "IFrameResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || 0, t.iframeResource = parserUtils.parseNodeText(e);
    }), parserUtils.childrenByName(e, "StaticResource").forEach(function (r) {
      t.type = r.getAttribute("creativeType") || 0, parserUtils.childrenByName(e, "AltText").forEach(function (e) {
        t.altText = parserUtils.parseNodeText(e);
      }), t.staticResource = parserUtils.parseNodeText(r);
    }), parserUtils.childrenByName(e, "TrackingEvents").forEach(function (e) {
      parserUtils.childrenByName(e, "Tracking").forEach(function (e) {
        var r = e.getAttribute("event"),
            i = parserUtils.parseNodeText(e);r && i && (null == t.trackingEvents[r] && (t.trackingEvents[r] = []), t.trackingEvents[r].push(i));
      });
    }), parserUtils.childrenByName(e, "CompanionClickTracking").forEach(function (e) {
      t.companionClickTrackingURLTemplates.push(parserUtils.parseNodeText(e));
    }), t.companionClickThroughURLTemplate = parserUtils.parseNodeText(parserUtils.childByName(e, "CompanionClickThrough")), t.companionClickTrackingURLTemplate = parserUtils.parseNodeText(parserUtils.childByName(e, "CompanionClickTracking")), r.variations.push(t);
  }), r;
}
var CreativeLinear = function (_Creative2) {
  _inherits(CreativeLinear, _Creative2);

  function CreativeLinear() {
    var _this2;

    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CreativeLinear);

    (_this2 = _possibleConstructorReturn(this, (CreativeLinear.__proto__ || Object.getPrototypeOf(CreativeLinear)).call(this, e)), _this2), _this2.type = "linear", _this2.duration = 0, _this2.skipDelay = null, _this2.mediaFiles = [], _this2.videoClickThroughURLTemplate = null, _this2.videoClickTrackingURLTemplates = [], _this2.videoCustomClickURLTemplates = [], _this2.adParameters = null, _this2.icons = [];return _this2;
  }

  return CreativeLinear;
}(Creative);

var Icon = function Icon() {
  _classCallCheck(this, Icon);

  this.program = null, this.height = 0, this.width = 0, this.xPosition = 0, this.yPosition = 0, this.apiFramework = null, this.offset = null, this.duration = 0, this.type = null, this.staticResource = null, this.htmlResource = null, this.iframeResource = null, this.iconClickThroughURLTemplate = null, this.iconClickTrackingURLTemplates = [], this.iconViewTrackingURLTemplate = null;
};

var MediaFile = function MediaFile() {
  _classCallCheck(this, MediaFile);

  this.id = null, this.fileURL = null, this.deliveryType = "progressive", this.mimeType = null, this.codec = null, this.bitrate = 0, this.minBitrate = 0, this.maxBitrate = 0, this.width = 0, this.height = 0, this.apiFramework = null, this.scalable = null, this.maintainAspectRatio = null;
};

function parseCreativeLinear(e, t) {
  var r = void 0;var i = new CreativeLinear(t);i.duration = parserUtils.parseDuration(parserUtils.parseNodeText(parserUtils.childByName(e, "Duration")));var s = e.getAttribute("skipoffset");if (null == s) i.skipDelay = null;else if ("%" === s.charAt(s.length - 1) && -1 !== i.duration) {
    var _e4 = parseInt(s, 10);i.skipDelay = i.duration * (_e4 / 100);
  } else i.skipDelay = parserUtils.parseDuration(s);var n = parserUtils.childByName(e, "VideoClicks");n && (i.videoClickThroughURLTemplate = parserUtils.parseNodeText(parserUtils.childByName(n, "ClickThrough")), parserUtils.childrenByName(n, "ClickTracking").forEach(function (e) {
    i.videoClickTrackingURLTemplates.push(parserUtils.parseNodeText(e));
  }), parserUtils.childrenByName(n, "CustomClick").forEach(function (e) {
    i.videoCustomClickURLTemplates.push(parserUtils.parseNodeText(e));
  }));var a = parserUtils.childByName(e, "AdParameters");a && (i.adParameters = parserUtils.parseNodeText(a)), parserUtils.childrenByName(e, "TrackingEvents").forEach(function (e) {
    parserUtils.childrenByName(e, "Tracking").forEach(function (e) {
      var t = e.getAttribute("event");var s = parserUtils.parseNodeText(e);if (t && s) {
        if ("progress" === t) {
          if (!(r = e.getAttribute("offset"))) return;t = "%" === r.charAt(r.length - 1) ? "progress-" + r : "progress-" + Math.round(parserUtils.parseDuration(r));
        }null == i.trackingEvents[t] && (i.trackingEvents[t] = []), i.trackingEvents[t].push(s);
      }
    });
  }), parserUtils.childrenByName(e, "MediaFiles").forEach(function (e) {
    parserUtils.childrenByName(e, "MediaFile").forEach(function (e) {
      var t = new MediaFile();t.id = e.getAttribute("id"), t.fileURL = parserUtils.parseNodeText(e), t.deliveryType = e.getAttribute("delivery"), t.codec = e.getAttribute("codec"), t.mimeType = e.getAttribute("type"), t.apiFramework = e.getAttribute("apiFramework"), t.bitrate = parseInt(e.getAttribute("bitrate") || 0), t.minBitrate = parseInt(e.getAttribute("minBitrate") || 0), t.maxBitrate = parseInt(e.getAttribute("maxBitrate") || 0), t.width = parseInt(e.getAttribute("width") || 0), t.height = parseInt(e.getAttribute("height") || 0);var r = e.getAttribute("scalable");r && "string" == typeof r && ("true" === (r = r.toLowerCase()) ? t.scalable = !0 : "false" === r && (t.scalable = !1));var s = e.getAttribute("maintainAspectRatio");s && "string" == typeof s && ("true" === (s = s.toLowerCase()) ? t.maintainAspectRatio = !0 : "false" === s && (t.maintainAspectRatio = !1)), i.mediaFiles.push(t);
    });
  });var o = parserUtils.childByName(e, "Icons");return o && parserUtils.childrenByName(o, "Icon").forEach(function (e) {
    var t = new Icon();t.program = e.getAttribute("program"), t.height = parseInt(e.getAttribute("height") || 0), t.width = parseInt(e.getAttribute("width") || 0), t.xPosition = parseXPosition(e.getAttribute("xPosition")), t.yPosition = parseYPosition(e.getAttribute("yPosition")), t.apiFramework = e.getAttribute("apiFramework"), t.offset = parserUtils.parseDuration(e.getAttribute("offset")), t.duration = parserUtils.parseDuration(e.getAttribute("duration")), parserUtils.childrenByName(e, "HTMLResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || "text/html", t.htmlResource = parserUtils.parseNodeText(e);
    }), parserUtils.childrenByName(e, "IFrameResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || 0, t.iframeResource = parserUtils.parseNodeText(e);
    }), parserUtils.childrenByName(e, "StaticResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || 0, t.staticResource = parserUtils.parseNodeText(e);
    });var r = parserUtils.childByName(e, "IconClicks");r && (t.iconClickThroughURLTemplate = parserUtils.parseNodeText(parserUtils.childByName(r, "IconClickThrough")), parserUtils.childrenByName(r, "IconClickTracking").forEach(function (e) {
      t.iconClickTrackingURLTemplates.push(parserUtils.parseNodeText(e));
    })), t.iconViewTrackingURLTemplate = parserUtils.parseNodeText(parserUtils.childByName(e, "IconViewTracking")), i.icons.push(t);
  }), i;
}function parseXPosition(e) {
  return -1 !== ["left", "right"].indexOf(e) ? e : parseInt(e || 0);
}function parseYPosition(e) {
  return -1 !== ["top", "bottom"].indexOf(e) ? e : parseInt(e || 0);
}
var CreativeNonLinear = function (_Creative3) {
  _inherits(CreativeNonLinear, _Creative3);

  function CreativeNonLinear() {
    var _this3;

    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CreativeNonLinear);

    (_this3 = _possibleConstructorReturn(this, (CreativeNonLinear.__proto__ || Object.getPrototypeOf(CreativeNonLinear)).call(this, e)), _this3), _this3.type = "nonlinear", _this3.variations = [];return _this3;
  }

  return CreativeNonLinear;
}(Creative);

var NonLinearAd = function NonLinearAd() {
  _classCallCheck(this, NonLinearAd);

  this.id = null, this.width = 0, this.height = 0, this.expandedWidth = 0, this.expandedHeight = 0, this.scalable = !0, this.maintainAspectRatio = !0, this.minSuggestedDuration = 0, this.apiFramework = "static", this.type = null, this.staticResource = null, this.htmlResource = null, this.iframeResource = null, this.nonlinearClickThroughURLTemplate = null, this.nonlinearClickTrackingURLTemplates = [], this.adParameters = null;
};

function parseCreativeNonLinear(e, t) {
  var r = new CreativeNonLinear(t);return parserUtils.childrenByName(e, "TrackingEvents").forEach(function (e) {
    var t = void 0,
        i = void 0;parserUtils.childrenByName(e, "Tracking").forEach(function (e) {
      t = e.getAttribute("event"), i = parserUtils.parseNodeText(e), t && i && (null == r.trackingEvents[t] && (r.trackingEvents[t] = []), r.trackingEvents[t].push(i));
    });
  }), parserUtils.childrenByName(e, "NonLinear").forEach(function (e) {
    var t = new NonLinearAd();t.id = e.getAttribute("id") || null, t.width = e.getAttribute("width"), t.height = e.getAttribute("height"), t.expandedWidth = e.getAttribute("expandedWidth"), t.expandedHeight = e.getAttribute("expandedHeight"), t.scalable = parserUtils.parseBoolean(e.getAttribute("scalable")), t.maintainAspectRatio = parserUtils.parseBoolean(e.getAttribute("maintainAspectRatio")), t.minSuggestedDuration = parserUtils.parseDuration(e.getAttribute("minSuggestedDuration")), t.apiFramework = e.getAttribute("apiFramework"), parserUtils.childrenByName(e, "HTMLResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || "text/html", t.htmlResource = parserUtils.parseNodeText(e);
    }), parserUtils.childrenByName(e, "IFrameResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || 0, t.iframeResource = parserUtils.parseNodeText(e);
    }), parserUtils.childrenByName(e, "StaticResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || 0, t.staticResource = parserUtils.parseNodeText(e);
    });var i = parserUtils.childByName(e, "AdParameters");i && (t.adParameters = parserUtils.parseNodeText(i)), t.nonlinearClickThroughURLTemplate = parserUtils.parseNodeText(parserUtils.childByName(e, "NonLinearClickThrough")), parserUtils.childrenByName(e, "NonLinearClickTracking").forEach(function (e) {
      t.nonlinearClickTrackingURLTemplates.push(parserUtils.parseNodeText(e));
    }), r.variations.push(t);
  }), r;
}function parseAd(e) {
  var t = e.childNodes;for (var r in t) {
    var i = t[r];if (-1 !== ["Wrapper", "InLine"].indexOf(i.nodeName)) {
      if (parserUtils.copyNodeAttribute("id", e, i), parserUtils.copyNodeAttribute("sequence", e, i), "Wrapper" === i.nodeName) return parseWrapper(i);if ("InLine" === i.nodeName) return parseInLine(i);
    }
  }
}function parseInLine(e) {
  var t = e.childNodes,
      r = new Ad();r.id = e.getAttribute("id") || null, r.sequence = e.getAttribute("sequence") || null;for (var _e5 in t) {
    var i = t[_e5];switch (i.nodeName) {case "Error":
        r.errorURLTemplates.push(parserUtils.parseNodeText(i));break;case "Impression":
        r.impressionURLTemplates.push(parserUtils.parseNodeText(i));break;case "Creatives":
        parserUtils.childrenByName(i, "Creative").forEach(function (e) {
          var t = { id: e.getAttribute("id") || null, adId: parseCreativeAdIdAttribute(e), sequence: e.getAttribute("sequence") || null, apiFramework: e.getAttribute("apiFramework") || null };for (var _i2 in e.childNodes) {
            var s = e.childNodes[_i2];switch (s.nodeName) {case "Linear":
                var _e6 = parseCreativeLinear(s, t);_e6 && r.creatives.push(_e6);break;case "NonLinearAds":
                var _i3 = parseCreativeNonLinear(s, t);_i3 && r.creatives.push(_i3);break;case "CompanionAds":
                var n = parseCreativeCompanion(s, t);n && r.creatives.push(n);}
          }
        });break;case "Extensions":
        parseExtensions(r.extensions, parserUtils.childrenByName(i, "Extension"));break;case "AdSystem":
        r.system = { value: parserUtils.parseNodeText(i), version: i.getAttribute("version") || null };break;case "AdTitle":
        r.title = parserUtils.parseNodeText(i);break;case "Description":
        r.description = parserUtils.parseNodeText(i);break;case "Advertiser":
        r.advertiser = parserUtils.parseNodeText(i);break;case "Pricing":
        r.pricing = { value: parserUtils.parseNodeText(i), model: i.getAttribute("model") || null, currency: i.getAttribute("currency") || null };break;case "Survey":
        r.survey = parserUtils.parseNodeText(i);}
  }return r;
}function parseWrapper(e) {
  var t = parseInLine(e);var r = parserUtils.childByName(e, "VASTAdTagURI");if (r ? t.nextWrapperURL = parserUtils.parseNodeText(r) : (r = parserUtils.childByName(e, "VASTAdTagURL")) && (t.nextWrapperURL = parserUtils.parseNodeText(parserUtils.childByName(r, "URL"))), t.creatives.forEach(function (e) {
    if (-1 !== ["linear", "nonlinear"].indexOf(e.type)) {
      if (e.trackingEvents) {
        t.trackingEvents || (t.trackingEvents = {}), t.trackingEvents[e.type] || (t.trackingEvents[e.type] = {});
        var _loop = function _loop(_r2) {
          var i = e.trackingEvents[_r2];t.trackingEvents[e.type][_r2] || (t.trackingEvents[e.type][_r2] = []), i.forEach(function (i) {
            t.trackingEvents[e.type][_r2].push(i);
          });
        };

        for (var _r2 in e.trackingEvents) {
          _loop(_r2);
        }
      }e.videoClickTrackingURLTemplates && (t.videoClickTrackingURLTemplates || (t.videoClickTrackingURLTemplates = []), e.videoClickTrackingURLTemplates.forEach(function (e) {
        t.videoClickTrackingURLTemplates.push(e);
      })), e.videoClickThroughURLTemplate && (t.videoClickThroughURLTemplate = e.videoClickThroughURLTemplate), e.videoCustomClickURLTemplates && (t.videoCustomClickURLTemplates || (t.videoCustomClickURLTemplates = []), e.videoCustomClickURLTemplates.forEach(function (e) {
        t.videoCustomClickURLTemplates.push(e);
      }));
    }
  }), t.nextWrapperURL) return t;
}function parseExtensions(e, t) {
  t.forEach(function (t) {
    var r = new AdExtension(),
        i = t.attributes,
        s = t.childNodes;if (t.attributes) for (var _e7 in i) {
      var _t4 = i[_e7];_t4.nodeName && _t4.nodeValue && (r.attributes[_t4.nodeName] = _t4.nodeValue);
    }for (var _e8 in s) {
      var _t5 = s[_e8],
          _i4 = parserUtils.parseNodeText(_t5);if ("#comment" !== _t5.nodeName && "" !== _i4) {
        var _e9 = new AdExtensionChild();if (_e9.name = _t5.nodeName, _e9.value = _i4, _t5.attributes) {
          var _r3 = _t5.attributes;for (var _t6 in _r3) {
            var _i5 = _r3[_t6];_e9.attributes[_i5.nodeName] = _i5.nodeValue;
          }
        }r.children.push(_e9);
      }
    }e.push(r);
  });
}function parseCreativeAdIdAttribute(e) {
  return e.getAttribute("AdID") || e.getAttribute("adID") || e.getAttribute("adId") || null;
}var domain;function EventHandlers() {}function EventEmitter() {
  EventEmitter.init.call(this);
}function $getMaxListeners(e) {
  return void 0 === e._maxListeners ? EventEmitter.defaultMaxListeners : e._maxListeners;
}function emitNone(e, t, r) {
  if (t) e.call(r);else for (var i = e.length, s = arrayClone(e, i), n = 0; n < i; ++n) {
    s[n].call(r);
  }
}function emitOne(e, t, r, i) {
  if (t) e.call(r, i);else for (var s = e.length, n = arrayClone(e, s), a = 0; a < s; ++a) {
    n[a].call(r, i);
  }
}function emitTwo(e, t, r, i, s) {
  if (t) e.call(r, i, s);else for (var n = e.length, a = arrayClone(e, n), o = 0; o < n; ++o) {
    a[o].call(r, i, s);
  }
}function emitThree(e, t, r, i, s, n) {
  if (t) e.call(r, i, s, n);else for (var a = e.length, o = arrayClone(e, a), l = 0; l < a; ++l) {
    o[l].call(r, i, s, n);
  }
}function emitMany(e, t, r, i) {
  if (t) e.apply(r, i);else for (var s = e.length, n = arrayClone(e, s), a = 0; a < s; ++a) {
    n[a].apply(r, i);
  }
}function _addListener(e, t, r, i) {
  var s, n, a;if ("function" != typeof r) throw new TypeError('"listener" argument must be a function');if ((n = e._events) ? (n.newListener && (e.emit("newListener", t, r.listener ? r.listener : r), n = e._events), a = n[t]) : (n = e._events = new EventHandlers(), e._eventsCount = 0), a) {
    if ("function" == typeof a ? a = n[t] = i ? [r, a] : [a, r] : i ? a.unshift(r) : a.push(r), !a.warned && (s = $getMaxListeners(e)) && s > 0 && a.length > s) {
      a.warned = !0;var o = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + t + " listeners added. Use emitter.setMaxListeners() to increase limit");o.name = "MaxListenersExceededWarning", o.emitter = e, o.type = t, o.count = a.length, emitWarning(o);
    }
  } else a = n[t] = r, ++e._eventsCount;return e;
}function emitWarning(e) {
  "function" == typeof console.warn ? console.warn(e) : console.log(e);
}function _onceWrap(e, t, r) {
  var i = !1;function s() {
    e.removeListener(t, s), i || (i = !0, r.apply(e, arguments));
  }return s.listener = r, s;
}function listenerCount(e) {
  var t = this._events;if (t) {
    var r = t[e];if ("function" == typeof r) return 1;if (r) return r.length;
  }return 0;
}function spliceOne(e, t) {
  for (var r = t, i = r + 1, s = e.length; i < s; r += 1, i += 1) {
    e[r] = e[i];
  }e.pop();
}function arrayClone(e, t) {
  for (var r = new Array(t); t--;) {
    r[t] = e[t];
  }return r;
}function unwrapListeners(e) {
  for (var t = new Array(e.length), r = 0; r < t.length; ++r) {
    t[r] = e[r].listener || e[r];
  }return t;
}function xdr() {
  var e = void 0;return window.XDomainRequest && (e = new XDomainRequest()), e;
}function supported() {
  return !!xdr();
}function get(e, t, r) {
  var i = "function" == typeof window.ActiveXObject ? new window.ActiveXObject("Microsoft.XMLDOM") : void 0;if (!i) return r(new Error("FlashURLHandler: Microsoft.XMLDOM format not supported"));i.async = !1, request.open("GET", e), request.timeout = t.timeout || 0, request.withCredentials = t.withCredentials || !1, request.send(), request.onprogress = function () {}, request.onload = function () {
    i.loadXML(request.responseText), r(null, i);
  };
}EventHandlers.prototype = Object.create(null), EventEmitter.EventEmitter = EventEmitter, EventEmitter.usingDomains = !1, EventEmitter.prototype.domain = void 0, EventEmitter.prototype._events = void 0, EventEmitter.prototype._maxListeners = void 0, EventEmitter.defaultMaxListeners = 10, EventEmitter.init = function () {
  this.domain = null, EventEmitter.usingDomains && (!domain.active || this instanceof domain.Domain || (this.domain = domain.active)), this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = new EventHandlers(), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
}, EventEmitter.prototype.setMaxListeners = function (e) {
  if ("number" != typeof e || e < 0 || isNaN(e)) throw new TypeError('"n" argument must be a positive number');return this._maxListeners = e, this;
}, EventEmitter.prototype.getMaxListeners = function () {
  return $getMaxListeners(this);
}, EventEmitter.prototype.emit = function (e) {
  var t,
      r,
      i,
      s,
      n,
      a,
      o,
      l = "error" === e;if (a = this._events) l = l && null == a.error;else if (!l) return !1;if (o = this.domain, l) {
    if (t = arguments[1], !o) {
      if (t instanceof Error) throw t;var c = new Error('Uncaught, unspecified "error" event. (' + t + ")");throw c.context = t, c;
    }return t || (t = new Error('Uncaught, unspecified "error" event')), t.domainEmitter = this, t.domain = o, t.domainThrown = !1, o.emit("error", t), !1;
  }if (!(r = a[e])) return !1;var p = "function" == typeof r;switch (i = arguments.length) {case 1:
      emitNone(r, p, this);break;case 2:
      emitOne(r, p, this, arguments[1]);break;case 3:
      emitTwo(r, p, this, arguments[1], arguments[2]);break;case 4:
      emitThree(r, p, this, arguments[1], arguments[2], arguments[3]);break;default:
      for (s = new Array(i - 1), n = 1; n < i; n++) {
        s[n - 1] = arguments[n];
      }emitMany(r, p, this, s);}return !0;
}, EventEmitter.prototype.addListener = function (e, t) {
  return _addListener(this, e, t, !1);
}, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.prependListener = function (e, t) {
  return _addListener(this, e, t, !0);
}, EventEmitter.prototype.once = function (e, t) {
  if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');return this.on(e, _onceWrap(this, e, t)), this;
}, EventEmitter.prototype.prependOnceListener = function (e, t) {
  if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');return this.prependListener(e, _onceWrap(this, e, t)), this;
}, EventEmitter.prototype.removeListener = function (e, t) {
  var r, i, s, n, a;if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');if (!(i = this._events)) return this;if (!(r = i[e])) return this;if (r === t || r.listener && r.listener === t) 0 == --this._eventsCount ? this._events = new EventHandlers() : (delete i[e], i.removeListener && this.emit("removeListener", e, r.listener || t));else if ("function" != typeof r) {
    for (s = -1, n = r.length; n-- > 0;) {
      if (r[n] === t || r[n].listener && r[n].listener === t) {
        a = r[n].listener, s = n;break;
      }
    }if (s < 0) return this;if (1 === r.length) {
      if (r[0] = void 0, 0 == --this._eventsCount) return this._events = new EventHandlers(), this;delete i[e];
    } else spliceOne(r, s);i.removeListener && this.emit("removeListener", e, a || t);
  }return this;
}, EventEmitter.prototype.removeAllListeners = function (e) {
  var t, r;if (!(r = this._events)) return this;if (!r.removeListener) return 0 === arguments.length ? (this._events = new EventHandlers(), this._eventsCount = 0) : r[e] && (0 == --this._eventsCount ? this._events = new EventHandlers() : delete r[e]), this;if (0 === arguments.length) {
    for (var i, s = Object.keys(r), n = 0; n < s.length; ++n) {
      "removeListener" !== (i = s[n]) && this.removeAllListeners(i);
    }return this.removeAllListeners("removeListener"), this._events = new EventHandlers(), this._eventsCount = 0, this;
  }if ("function" == typeof (t = r[e])) this.removeListener(e, t);else if (t) do {
    this.removeListener(e, t[t.length - 1]);
  } while (t[0]);return this;
}, EventEmitter.prototype.listeners = function (e) {
  var t,
      r = this._events;return r && (t = r[e]) ? "function" == typeof t ? [t.listener || t] : unwrapListeners(t) : [];
}, EventEmitter.listenerCount = function (e, t) {
  return "function" == typeof e.listenerCount ? e.listenerCount(t) : listenerCount.call(e, t);
}, EventEmitter.prototype.listenerCount = listenerCount, EventEmitter.prototype.eventNames = function () {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};var flashURLHandler = { get: get, supported: supported };function get$1(e, t, r) {
  r(new Error("Please bundle the library for node to use the node urlHandler"));
}var nodeURLHandler = { get: get$1 };function xhr() {
  try {
    var e = new window.XMLHttpRequest();return "withCredentials" in e ? e : null;
  } catch (e) {
    return console.log("Error in XHRURLHandler support check:", e), null;
  }
}function supported$1() {
  return !!xhr();
}function get$2(e, t, r) {
  if ("https:" === window.location.protocol && 0 === e.indexOf("http://")) return r(new Error("XHRURLHandler: Cannot go from HTTPS to HTTP."));try {
    var i = xhr();i.open("GET", e), i.timeout = t.timeout || 0, i.withCredentials = t.withCredentials || !1, i.overrideMimeType && i.overrideMimeType("text/xml"), i.onreadystatechange = function () {
      4 === i.readyState && (200 === i.status ? r(null, i.responseXML) : r(new Error("XHRURLHandler: " + i.statusText)));
    }, i.send();
  } catch (e) {
    r(new Error("XHRURLHandler: Unexpected error"));
  }
}var XHRURLHandler = { get: get$2, supported: supported$1 };function get$3(e, t, r) {
  return r || ("function" == typeof t && (r = t), t = {}), "undefined" == typeof window || null === window ? nodeURLHandler.get(e, t, r) : XHRURLHandler.supported() ? XHRURLHandler.get(e, t, r) : flashURLHandler.supported() ? flashURLHandler.get(e, t, r) : r(new Error("Current context is not supported by any of the default URLHandlers. Please provide a custom URLHandler"));
}var urlHandler = { get: get$3 };
var VASTResponse = function VASTResponse() {
  _classCallCheck(this, VASTResponse);

  this.ads = [], this.errorURLTemplates = [];
};

var DEFAULT_MAX_WRAPPER_DEPTH = 10,
    DEFAULT_EVENT_DATA = { ERRORCODE: 900, extensions: [] };
var VASTParser = function (_EventEmitter) {
  _inherits(VASTParser, _EventEmitter);

  function VASTParser() {
    var _this4;

    _classCallCheck(this, VASTParser);

    (_this4 = _possibleConstructorReturn(this, (VASTParser.__proto__ || Object.getPrototypeOf(VASTParser)).call(this)), _this4), _this4.remainingAds = [], _this4.parentURLs = [], _this4.errorURLTemplates = [], _this4.rootErrorURLTemplates = [], _this4.maxWrapperDepth = null, _this4.URLTemplateFilters = [], _this4.fetchingOptions = {};return _this4;
  }

  _createClass(VASTParser, [{
    key: "addURLTemplateFilter",
    value: function addURLTemplateFilter(e) {
      "function" == typeof e && this.URLTemplateFilters.push(e);
    }
  }, {
    key: "removeURLTemplateFilter",
    value: function removeURLTemplateFilter() {
      this.URLTemplateFilters.pop();
    }
  }, {
    key: "countURLTemplateFilters",
    value: function countURLTemplateFilters() {
      return this.URLTemplateFilters.length;
    }
  }, {
    key: "clearURLTemplateFilters",
    value: function clearURLTemplateFilters() {
      this.URLTemplateFilters = [];
    }
  }, {
    key: "trackVastError",
    value: function trackVastError(e, t) {
      for (var _len = arguments.length, r = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        r[_key - 2] = arguments[_key];
      }

      this.emit("VAST-error", _extends.apply(undefined, [DEFAULT_EVENT_DATA, t].concat(r))), util.track(e, t);
    }
  }, {
    key: "getErrorURLTemplates",
    value: function getErrorURLTemplates() {
      return this.rootErrorURLTemplates.concat(this.errorURLTemplates);
    }
  }, {
    key: "fetchVAST",
    value: function fetchVAST(e, t, r) {
      var _this5 = this;

      return new Promise(function (i, s) {
        _this5.URLTemplateFilters.forEach(function (t) {
          e = t(e);
        }), _this5.parentURLs.push(e), _this5.emit("VAST-resolving", { url: e, wrapperDepth: t, originalUrl: r }), _this5.urlHandler.get(e, _this5.fetchingOptions, function (t, r) {
          _this5.emit("VAST-resolved", { url: e, error: t }), t ? s(t) : i(r);
        });
      });
    }
  }, {
    key: "initParsingStatus",
    value: function initParsingStatus() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.rootURL = "", this.remainingAds = [], this.parentURLs = [], this.errorURLTemplates = [], this.rootErrorURLTemplates = [], this.maxWrapperDepth = e.wrapperLimit || DEFAULT_MAX_WRAPPER_DEPTH, this.fetchingOptions = { timeout: e.timeout, withCredentials: e.withCredentials }, this.urlHandler = e.urlhandler || urlHandler;
    }
  }, {
    key: "getRemainingAds",
    value: function getRemainingAds(e) {
      var _this6 = this;

      if (0 === this.remainingAds.length) return Promise.reject(new Error("No more ads are available for the given VAST"));var t = e ? util.flatten(this.remainingAds) : this.remainingAds.shift();return this.errorURLTemplates = [], this.parentURLs = [], this.resolveAds(t, { wrapperDepth: 0, originalUrl: this.rootURL }).then(function (e) {
        return _this6.buildVASTResponse(e);
      });
    }
  }, {
    key: "getAndParseVAST",
    value: function getAndParseVAST(e) {
      var _this7 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.initParsingStatus(t), this.rootURL = e, this.fetchVAST(e).then(function (r) {
        return t.originalUrl = e, t.isRootVAST = !0, _this7.parse(r, t).then(function (e) {
          return _this7.buildVASTResponse(e);
        });
      });
    }
  }, {
    key: "parseVAST",
    value: function parseVAST(e) {
      var _this8 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.initParsingStatus(t), t.isRootVAST = !0, this.parse(e, t).then(function (e) {
        return _this8.buildVASTResponse(e);
      });
    }
  }, {
    key: "buildVASTResponse",
    value: function buildVASTResponse(e) {
      var t = new VASTResponse();return t.ads = e, t.errorURLTemplates = this.getErrorURLTemplates(), this.completeWrapperResolving(t), t;
    }
  }, {
    key: "parse",
    value: function parse(e, _ref) {
      var _ref$resolveAll = _ref.resolveAll,
          t = _ref$resolveAll === undefined ? !0 : _ref$resolveAll,
          _ref$wrapperSequence = _ref.wrapperSequence,
          r = _ref$wrapperSequence === undefined ? null : _ref$wrapperSequence,
          _ref$originalUrl = _ref.originalUrl,
          i = _ref$originalUrl === undefined ? null : _ref$originalUrl,
          _ref$wrapperDepth = _ref.wrapperDepth,
          s = _ref$wrapperDepth === undefined ? 0 : _ref$wrapperDepth,
          _ref$isRootVAST = _ref.isRootVAST,
          n = _ref$isRootVAST === undefined ? !1 : _ref$isRootVAST;
      if (!e || !e.documentElement || "VAST" !== e.documentElement.nodeName) return Promise.reject(new Error("Invalid VAST XMLDocument"));var a = [];var o = e.documentElement.childNodes;for (var _e10 in o) {
        var _t7 = o[_e10];if ("Error" === _t7.nodeName) {
          var _e11 = parserUtils.parseNodeText(_t7);n ? this.rootErrorURLTemplates.push(_e11) : this.errorURLTemplates.push(_e11);
        }if ("Ad" === _t7.nodeName) {
          var _e12 = parseAd(_t7);_e12 ? a.push(_e12) : this.trackVastError(this.getErrorURLTemplates(), { ERRORCODE: 101 });
        }
      }var l = a.length,
          c = a[l - 1];return 1 === l && void 0 !== r && null !== r && c && !c.sequence && (c.sequence = r), !1 === t && (this.remainingAds = parserUtils.splitVAST(a), a = this.remainingAds.shift()), this.resolveAds(a, { wrapperDepth: s, originalUrl: i });
    }
  }, {
    key: "resolveAds",
    value: function resolveAds() {
      var _this9 = this;

      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _ref2 = arguments[1];
      var t = _ref2.wrapperDepth,
          r = _ref2.originalUrl;
      var i = [];return e.forEach(function (e) {
        var s = _this9.resolveWrappers(e, t, r);i.push(s);
      }), Promise.all(i).then(function (e) {
        var i = util.flatten(e);if (!i && _this9.remainingAds.length > 0) {
          var _e13 = _this9.remainingAds.shift();return _this9.resolveAds(_e13, { wrapperDepth: t, originalUrl: r });
        }return i;
      });
    }
  }, {
    key: "resolveWrappers",
    value: function resolveWrappers(e, t, r) {
      var _this10 = this;

      return new Promise(function (i, s) {
        if (t++, !e.nextWrapperURL) return delete e.nextWrapperURL, i(e);if (t >= _this10.maxWrapperDepth || -1 !== _this10.parentURLs.indexOf(e.nextWrapperURL)) return e.errorCode = 302, delete e.nextWrapperURL, i(e);e.nextWrapperURL = parserUtils.resolveVastAdTagURI(e.nextWrapperURL, r);var n = e.sequence;r = e.nextWrapperURL, _this10.fetchVAST(e.nextWrapperURL, t, r).then(function (s) {
          return _this10.parse(s, { originalUrl: r, wrapperSequence: n, wrapperDepth: t }).then(function (t) {
            if (delete e.nextWrapperURL, 0 === t.length) return e.creatives = [], i(e);t.forEach(function (t) {
              t && parserUtils.mergeWrapperAdData(t, e);
            }), i(t);
          });
        })["catch"](function (t) {
          e.errorCode = 301, e.errorMessage = t.message, i(e);
        });
      });
    }
  }, {
    key: "completeWrapperResolving",
    value: function completeWrapperResolving(e) {
      if (0 === e.ads.length) this.trackVastError(e.errorURLTemplates, { ERRORCODE: 303 });else for (var t = e.ads.length - 1; t >= 0; t--) {
        var _r4 = e.ads[t];(_r4.errorCode || 0 === _r4.creatives.length) && (this.trackVastError(_r4.errorURLTemplates.concat(e.errorURLTemplates), { ERRORCODE: _r4.errorCode || 303 }, { ERRORMESSAGE: _r4.errorMessage || "" }, { extensions: _r4.extensions }, { system: _r4.system }), e.ads.splice(t, 1));
      }
    }
  }]);

  return VASTParser;
}(EventEmitter);

var storage = null;var DEFAULT_STORAGE = { data: {}, length: 0, getItem: function getItem(e) {
    return this.data[e];
  },
  setItem: function setItem(e, t) {
    this.data[e] = t, this.length = Object.keys(this.data).length;
  },
  removeItem: function removeItem(e) {
    delete data[e], this.length = Object.keys(this.data).length;
  },
  clear: function clear() {
    this.data = {}, this.length = 0;
  }
};
var Storage = function () {
  function Storage() {
    _classCallCheck(this, Storage);

    this.storage = this.initStorage();
  }

  _createClass(Storage, [{
    key: "initStorage",
    value: function initStorage() {
      if (storage) return storage;try {
        storage = "undefined" != typeof window && null !== window ? window.localStorage || window.sessionStorage : null;
      } catch (e) {
        storage = null;
      }return storage && !this.isStorageDisabled(storage) || (storage = DEFAULT_STORAGE).clear(), storage;
    }
  }, {
    key: "isStorageDisabled",
    value: function isStorageDisabled(e) {
      var t = "__VASTStorage__";try {
        if (e.setItem(t, t), e.getItem(t) !== t) return e.removeItem(t), !0;
      } catch (e) {
        return !0;
      }return e.removeItem(t), !1;
    }
  }, {
    key: "getItem",
    value: function getItem(e) {
      return this.storage.getItem(e);
    }
  }, {
    key: "setItem",
    value: function setItem(e, t) {
      return this.storage.setItem(e, t);
    }
  }, {
    key: "removeItem",
    value: function removeItem(e) {
      return this.storage.removeItem(e);
    }
  }, {
    key: "clear",
    value: function clear() {
      return this.storage.clear();
    }
  }]);

  return Storage;
}();

var VASTClient = function () {
  function VASTClient(e, t, r) {
    _classCallCheck(this, VASTClient);

    this.cappingFreeLunch = e || 0, this.cappingMinimumTimeInterval = t || 0, this.defaultOptions = { withCredentials: !1, timeout: 0 }, this.vastParser = new VASTParser(), this.storage = r || new Storage(), void 0 === this.lastSuccessfulAd && (this.lastSuccessfulAd = 0), void 0 === this.totalCalls && (this.totalCalls = 0), void 0 === this.totalCallsTimeout && (this.totalCallsTimeout = 0);
  }

  _createClass(VASTClient, [{
    key: "getParser",
    value: function getParser() {
      return this.vastParser;
    }
  }, {
    key: "hasRemainingAds",
    value: function hasRemainingAds() {
      return this.vastParser.remainingAds.length > 0;
    }
  }, {
    key: "getNextAds",
    value: function getNextAds(e) {
      return this.vastParser.getRemainingAds(e);
    }
  }, {
    key: "get",
    value: function get(e) {
      var _this11 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var r = Date.now();return (t = _extends(this.defaultOptions, t)).hasOwnProperty("resolveAll") || (t.resolveAll = !1), this.totalCallsTimeout < r ? (this.totalCalls = 1, this.totalCallsTimeout = r + 36e5) : this.totalCalls++, new Promise(function (i, s) {
        if (_this11.cappingFreeLunch >= _this11.totalCalls) return s(new Error("VAST call canceled \u2013 FreeLunch capping not reached yet " + _this11.totalCalls + "/" + _this11.cappingFreeLunch));var n = r - _this11.lastSuccessfulAd;if (n < 0) _this11.lastSuccessfulAd = 0;else if (n < _this11.cappingMinimumTimeInterval) return s(new Error("VAST call canceled \u2013 (" + _this11.cappingMinimumTimeInterval + ")ms minimum interval reached"));_this11.vastParser.getAndParseVAST(e, t).then(function (e) {
          return i(e);
        })["catch"](function (e) {
          return s(e);
        });
      });
    }
  }, {
    key: "lastSuccessfulAd",
    get: function get() {
      return this.storage.getItem("vast-client-last-successful-ad");
    },
    set: function set(e) {
      this.storage.setItem("vast-client-last-successful-ad", e);
    }
  }, {
    key: "totalCalls",
    get: function get() {
      return this.storage.getItem("vast-client-total-calls");
    },
    set: function set(e) {
      this.storage.setItem("vast-client-total-calls", e);
    }
  }, {
    key: "totalCallsTimeout",
    get: function get() {
      return this.storage.getItem("vast-client-total-calls-timeout");
    },
    set: function set(e) {
      this.storage.setItem("vast-client-total-calls-timeout", e);
    }
  }]);

  return VASTClient;
}();

var DEFAULT_SKIP_DELAY = -1;
var VASTTracker = function (_EventEmitter2) {
  _inherits(VASTTracker, _EventEmitter2);

  function VASTTracker(e, t, r) {
    var _this12;

    var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, VASTTracker);

    (_this12 = _possibleConstructorReturn(this, (VASTTracker.__proto__ || Object.getPrototypeOf(VASTTracker)).call(this)), _this12), _this12.ad = t, _this12.creative = r, _this12.variation = i, _this12.muted = !1, _this12.impressed = !1, _this12.skippable = !1, _this12.trackingEvents = {}, _this12._alreadyTriggeredQuartiles = {}, _this12.emitAlwaysEvents = ["creativeView", "start", "firstQuartile", "midpoint", "thirdQuartile", "complete", "resume", "pause", "rewind", "skip", "closeLinear", "close"];for (var _e14 in _this12.creative.trackingEvents) {
      var _t8 = _this12.creative.trackingEvents[_e14];_this12.trackingEvents[_e14] = _t8.slice(0);
    }_this12.creative instanceof CreativeLinear ? _this12._initLinearTracking() : _this12._initVariationTracking(), e && _this12.on("start", function () {
      e.lastSuccessfulAd = Date.now();
    });return _this12;
  }

  _createClass(VASTTracker, [{
    key: "_initLinearTracking",
    value: function _initLinearTracking() {
      this.linear = !0, this.skipDelay = this.creative.skipDelay, this.setDuration(this.creative.duration), this.clickThroughURLTemplate = this.creative.videoClickThroughURLTemplate, this.clickTrackingURLTemplates = this.creative.videoClickTrackingURLTemplates;
    }
  }, {
    key: "_initVariationTracking",
    value: function _initVariationTracking() {
      if (this.linear = !1, this.skipDelay = DEFAULT_SKIP_DELAY, this.variation) {
        for (var e in this.variation.trackingEvents) {
          var t = this.variation.trackingEvents[e];this.trackingEvents[e] ? this.trackingEvents[e] = this.trackingEvents[e].concat(t.slice(0)) : this.trackingEvents[e] = t.slice(0);
        }this.variation instanceof NonLinearAd ? (this.clickThroughURLTemplate = this.variation.nonlinearClickThroughURLTemplate, this.clickTrackingURLTemplates = this.variation.nonlinearClickTrackingURLTemplates, this.setDuration(this.variation.minSuggestedDuration)) : this.variation instanceof CompanionAd && (this.clickThroughURLTemplate = this.variation.companionClickThroughURLTemplate, this.clickTrackingURLTemplates = this.variation.companionClickTrackingURLTemplates);
      }
    }
  }, {
    key: "setDuration",
    value: function setDuration(e) {
      this.assetDuration = e, this.quartiles = { firstQuartile: Math.round(25 * this.assetDuration) / 100, midpoint: Math.round(50 * this.assetDuration) / 100, thirdQuartile: Math.round(75 * this.assetDuration) / 100 };
    }
  }, {
    key: "setProgress",
    value: function setProgress(e) {
      var _this13 = this;

      var t = this.skipDelay || DEFAULT_SKIP_DELAY;if (-1 === t || this.skippable || (t > e ? this.emit("skip-countdown", t - e) : (this.skippable = !0, this.emit("skip-countdown", 0))), this.assetDuration > 0) {
        var _t9 = [];if (e > 0) {
          var r = Math.round(e / this.assetDuration * 100);_t9.push("start"), _t9.push("progress-" + r + "%"), _t9.push("progress-" + Math.round(e));for (var _r5 in this.quartiles) {
            this.isQuartileReached(_r5, this.quartiles[_r5], e) && (_t9.push(_r5), this._alreadyTriggeredQuartiles[_r5] = !0);
          }
        }_t9.forEach(function (e) {
          _this13.track(e, !0);
        }), e < this.progress && this.track("rewind");
      }this.progress = e;
    }
  }, {
    key: "isQuartileReached",
    value: function isQuartileReached(e, t, r) {
      var i = !1;return t <= r && !this._alreadyTriggeredQuartiles[e] && (i = !0), i;
    }
  }, {
    key: "setMuted",
    value: function setMuted(e) {
      this.muted !== e && this.track(e ? "mute" : "unmute"), this.muted = e;
    }
  }, {
    key: "setPaused",
    value: function setPaused(e) {
      this.paused !== e && this.track(e ? "pause" : "resume"), this.paused = e;
    }
  }, {
    key: "setFullscreen",
    value: function setFullscreen(e) {
      this.fullscreen !== e && this.track(e ? "fullscreen" : "exitFullscreen"), this.fullscreen = e;
    }
  }, {
    key: "setExpand",
    value: function setExpand(e) {
      this.expanded !== e && this.track(e ? "expand" : "collapse"), this.expanded = e;
    }
  }, {
    key: "setSkipDelay",
    value: function setSkipDelay(e) {
      "number" == typeof e && (this.skipDelay = e);
    }
  }, {
    key: "trackImpression",
    value: function trackImpression() {
      this.impressed || (this.impressed = !0, this.trackURLs(this.ad.impressionURLTemplates), this.track("creativeView"));
    }
  }, {
    key: "errorWithCode",
    value: function errorWithCode(e) {
      this.trackURLs(this.ad.errorURLTemplates, { ERRORCODE: e });
    }
  }, {
    key: "complete",
    value: function complete() {
      this.track("complete");
    }
  }, {
    key: "close",
    value: function close() {
      this.track(this.linear ? "closeLinear" : "close");
    }
  }, {
    key: "skip",
    value: function skip() {
      this.track("skip"), this.trackingEvents = [];
    }
  }, {
    key: "click",
    value: function click() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.clickTrackingURLTemplates && this.clickTrackingURLTemplates.length && this.trackURLs(this.clickTrackingURLTemplates);var t = this.clickThroughURLTemplate || e;if (t) {
        var _e15 = this.linear ? { CONTENTPLAYHEAD: this.progressFormatted() } : {},
            r = util.resolveURLTemplates([t], _e15)[0];this.emit("clickthrough", r);
      }
    }
  }, {
    key: "track",
    value: function track(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      "closeLinear" === e && !this.trackingEvents[e] && this.trackingEvents.close && (e = "close");var r = this.trackingEvents[e],
          i = this.emitAlwaysEvents.indexOf(e) > -1;r ? (this.emit(e, ""), this.trackURLs(r)) : i && this.emit(e, ""), t && (delete this.trackingEvents[e], i && this.emitAlwaysEvents.splice(this.emitAlwaysEvents.indexOf(e), 1));
    }
  }, {
    key: "trackURLs",
    value: function trackURLs(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.linear && (this.creative && this.creative.mediaFiles && this.creative.mediaFiles[0] && this.creative.mediaFiles[0].fileURL && (t.ASSETURI = this.creative.mediaFiles[0].fileURL), t.CONTENTPLAYHEAD = this.progressFormatted()), util.track(e, t);
    }
  }, {
    key: "progressFormatted",
    value: function progressFormatted() {
      var e = parseInt(this.progress);var t = e / 3600;t.length < 2 && (t = "0" + t);var r = e / 60 % 60;r.length < 2 && (r = "0" + r);var i = e % 60;return i.length < 2 && (i = "0" + r), t + ":" + r + ":" + i + "." + parseInt(100 * (this.progress - e));
    }
  }]);

  return VASTTracker;
}(EventEmitter);

exports.VASTClient = VASTClient;
exports.VASTParser = VASTParser;
exports.VASTTracker = VASTTracker;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9hZHMvaW1hL0FkLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9zcmMvanMvYXBpL2Fkcy9pbWEvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vT3ZlblBsYXllci8uL3NyYy9qcy9hcGkvYWRzL3V0aWxzLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9zcmMvanMvYXBpL2Fkcy92YXN0L0FkLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9zcmMvanMvYXBpL2Fkcy92YXN0L0xpc3RlbmVyLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9zcmMvanMvYXBpL3Byb3ZpZGVyL3V0aWxzLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9zcmMvanMvdXRpbHMvdmFzdC1jbGllbnQuanMiXSwibmFtZXMiOlsiQWQiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsImVycm9yQ2FsbGJhY2siLCJBVVRPUExBWV9OT1RfQUxMT1dFRCIsIkFETUFOR0VSX0xPQURJTkdfRVJST1IiLCJBRFNfTUFOQUdFUl9MT0FERUQiLCJBRF9FUlJPUiIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwiYWRzRXJyb3JPY2N1cnJlZCIsInNwZWMiLCJzdGFydGVkIiwiYWN0aXZlIiwiaXNWaWRlb0VuZGVkIiwiT25NYW5hZ2VyTG9hZGVkIiwiT25BZEVycm9yIiwiYWREaXNwbGF5Q29udGFpbmVyIiwiYWRzTG9hZGVyIiwiYWRzTWFuYWdlciIsImxpc3RlbmVyIiwiYWRzUmVxdWVzdCIsImF1dG9wbGF5QWxsb3dlZCIsImF1dG9wbGF5UmVxdWlyZXNNdXRlZCIsImJyb3dzZXIiLCJnZXRCcm93c2VyIiwiaXNNb2JpbGUiLCJvcyIsImFkRGlzcGxheUNvbnRhaW5lckluaXRpYWxpemVkIiwic2VuZFdhcm5pbmdNZXNzYWdlRm9yTXV0ZWRQbGF5IiwidHJpZ2dlciIsIlBMQVlFUl9XQVJOSU5HIiwibWVzc2FnZSIsIldBUk5fTVNHX01VVEVEUExBWSIsInRpbWVyIiwiaWNvbkNsYXNzIiwiVUlfSUNPTlMiLCJ2b2x1bWVfbXV0ZSIsIm9uQ2xpY2tDYWxsYmFjayIsInNldE11dGUiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImdvb2dsZSIsImltYSIsIkFkc01hbmFnZXJMb2FkZWRFdmVudCIsIlR5cGUiLCJBZEVycm9yRXZlbnQiLCJzZXR0aW5ncyIsInNldExvY2FsZSIsImdldExhbmd1YWdlIiwic2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzIiwiY3JlYXRlQWRDb250YWluZXIiLCJhZENvbnRhaW5lciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImdldENvbnRhaW5lciIsImFwcGVuZCIsImFkRXJyb3JFdmVudCIsImNvbnNvbGUiLCJnZXRFcnJvciIsImdldFZhc3RFcnJvckNvZGUiLCJnZXRNZXNzYWdlIiwiaW5uZXJFcnJvciIsImdldElubmVyRXJyb3IiLCJnZXRFcnJvckNvZGUiLCJTVEFURV9BRF9FUlJPUiIsImNvZGUiLCJwbGF5IiwiYWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiYWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJBZHNSZW5kZXJpbmdTZXR0aW5ncyIsInJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUiLCJkZXN0cm95IiwiZ2V0QWRzTWFuYWdlciIsImFkQ29uYXRpbmVyRWxtZW50IiwiQWREaXNwbGF5Q29udGFpbmVyIiwiQWRzTG9hZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uIiwiQ09OVEVOVF9WT0xVTUUiLCJkYXRhIiwibXV0ZSIsInNldFZvbHVtZSIsInZvbHVtZSIsInNldEF1dG9QbGF5VG9BZHNSZXF1ZXN0Iiwic2V0QWRXaWxsQXV0b1BsYXkiLCJzZXRBZFdpbGxQbGF5TXV0ZWQiLCJpbml0UmVxdWVzdCIsIkFkc1JlcXVlc3QiLCJmb3JjZU5vbkxpbmVhckZ1bGxTbG90IiwicmVxdWVzdEFkcyIsImNoZWNrQXV0b3BsYXlTdXBwb3J0IiwidGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8iLCJzcmMiLCJURU1QX1ZJREVPX1VSTCIsImxvYWQiLCJnZXROYW1lIiwiUFJPVklERVJfREFTSCIsImNsZWFyQW5kUmVwb3J0IiwiX2F1dG9wbGF5QWxsb3dlZCIsIl9hdXRvcGxheVJlcXVpcmVzTXV0ZWQiLCJwYXVzZSIsInJlbW92ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicGxheVByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwiZXJyb3IiLCJpc0FjdGl2ZSIsInJlc3VtZSIsImluaXRpYWxpemUiLCJyZXRyeUNvdW50IiwiY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSIsImluaXQiLCJWaWV3TW9kZSIsIk5PUk1BTCIsInN0YXJ0IiwiRXJyb3IiLCJzZXRUaW1lb3V0IiwiaXNBdXRvU3RhcnQiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJjb21wbGV0ZUNvbnRlbnRDYWxsYmFjayIsImlzQWxsQWRDb21wbGV0ZSIsImlzTGluZWFyQWQiLCJjb250ZW50Q29tcGxldGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiJGFkcyIsImZpbmQiLCJvZmYiLCJMaXN0ZW5lciIsImFkc1NwZWMiLCJsb3dMZXZlbEV2ZW50cyIsImludGVydmFsVGltZXIiLCJBRF9CVUZGRVJJTkciLCJBZEV2ZW50IiwiQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQiLCJDT05URU5UX1JFU1VNRV9SRVFVRVNURUQiLCJBTExfQURTX0NPTVBMRVRFRCIsIkNMSUNLIiwiU0tJUFBFRCIsIkNPTVBMRVRFIiwiRklSU1RfUVVBUlRJTEUiLCJMT0FERUQiLCJNSURQT0lOVCIsIlBBVVNFRCIsIlJFU1VNRUQiLCJTVEFSVEVEIiwiVVNFUl9DTE9TRSIsIlRISVJEX1FVQVJUSUxFIiwiaXNBbGxBZENvbXBlbGV0ZSIsImFkQ29tcGxldGVDYWxsYmFjayIsImN1cnJlbnRBZCIsImFkRXZlbnQiLCJ0eXBlIiwiZ2V0UG9zaXRpb24iLCJzZXRTdGF0ZSIsIlNUQVRFX0NPTVBMRVRFIiwiUExBWUVSX0NMSUNLRUQiLCJQTEFZRVJfQURfQ0xJQ0siLCJyZW1haW5pbmdUaW1lIiwiZ2V0UmVtYWluaW5nVGltZSIsImFkIiwiZ2V0QWQiLCJTVEFURV9BRF9MT0FERUQiLCJyZW1haW5pbmciLCJpc0xpbmVhciIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX1BMQVlJTkciLCJhZE9iamVjdCIsImR1cmF0aW9uIiwiZ2V0RHVyYXRpb24iLCJza2lwVGltZU9mZnNldCIsImdldFNraXBUaW1lT2Zmc2V0IiwiQURfQ0hBTkdFRCIsInNldEludGVydmFsIiwiQURfVElNRSIsInBvc2l0aW9uIiwic2tpcHBhYmxlIiwiZ2V0QWRTa2lwcGFibGVTdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJTVEFURV9BRF9DT01QTEVURSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwic2V0QWRDb21wbGV0ZUNhbGxiYWNrIiwiX2FkQ29tcGxldGVDYWxsYmFjayIsImxhbmciLCJjb250YWluZXIiLCJlbEFkVmlkZW8iLCJ0ZXh0VmlldyIsImFkQnV0dG9uIiwidmFzdENsaWVudCIsIlZBU1RDbGllbnQiLCJ2YXN0VHJhY2tlciIsInN0eWxlIiwiZGlzcGxheSIsImdldCIsInJlcyIsImFkcyIsIlZBU1RUcmFja2VyIiwiY3JlYXRpdmVzIiwidmlkZW9VUkwiLCJsZW5ndGgiLCJtZWRpYUZpbGVzIiwiZmlsZVVSTCIsIm11dGVkIiwiY2hlY2tNYWluQ29udGVudExvYWRlZCIsIm1ldGFMb2FkZWQiLCJNRURJQUZJTEVfUExBWUJBQ0tfRVJST1IiLCIkdGV4dFZpZXciLCIkYWRCdXR0b24iLCIkZWxBZFZpZGVvIiwicHJvY2Vzc0VuZE9mQWQiLCJoaWRlIiwicHJvY2Vzc1N0YXJ0T2ZBZCIsInNob3ciLCJza2lwQnV0dG9uQ2xpY2tlZCIsImV2ZW50IiwiaGFzQ2xhc3MiLCJza2lwIiwiZXJyb3JXaXRoQ29kZSIsImNhbnBsYXkiLCJlbmRlZCIsImNvbXBsZXRlIiwiY2xpY2siLCJzZXRQYXVzZWQiLCJ0aW1ldXBkYXRlIiwic2V0UHJvZ3Jlc3MiLCJ0YXJnZXQiLCJjdXJyZW50VGltZSIsInZvbHVtZWNoYW5nZSIsInNldE11dGVkIiwibG9hZGVkbWV0YWRhdGEiLCJTVEFURV9QTEFZSU5HIiwiZ2V0U3RhdGUiLCJ0cmFja0ltcHJlc3Npb24iLCJ1cmwiLCJ3aW5kb3ciLCJvcGVuIiwiaHRtbCIsImFkZENsYXNzIiwicGFyc2VJbnQiLCJleHRyYWN0VmlkZW9FbGVtZW50IiwiZWxlbWVudE9yTXNlIiwiXyIsImlzRWxlbWVudCIsImdldFZpZGVvRWxlbWVudCIsIm1lZGlhIiwic2VwYXJhdGVMaXZlIiwibXNlIiwiaXNEeW5hbWljIiwiZXJyb3JUcmlnZ2VyIiwiU1RBVEVfRVJST1IiLCJFUlJPUiIsInBpY2tDdXJyZW50U291cmNlIiwic291cmNlcyIsImN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIk1hdGgiLCJtYXgiLCJsYWJlbCIsImkiLCJnZXRTb3VyY2VJbmRleCIsImlkIiwic2VxdWVuY2UiLCJzeXN0ZW0iLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiYWR2ZXJ0aXNlciIsInByaWNpbmciLCJzdXJ2ZXkiLCJlcnJvclVSTFRlbXBsYXRlcyIsImltcHJlc3Npb25VUkxUZW1wbGF0ZXMiLCJleHRlbnNpb25zIiwiQWRFeHRlbnNpb24iLCJhdHRyaWJ1dGVzIiwiY2hpbGRyZW4iLCJBZEV4dGVuc2lvbkNoaWxkIiwibmFtZSIsInZhbHVlIiwiQ29tcGFuaW9uQWQiLCJ3aWR0aCIsImhlaWdodCIsInN0YXRpY1Jlc291cmNlIiwiaHRtbFJlc291cmNlIiwiaWZyYW1lUmVzb3VyY2UiLCJhbHRUZXh0IiwiY29tcGFuaW9uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUiLCJjb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzIiwidHJhY2tpbmdFdmVudHMiLCJDcmVhdGl2ZSIsImUiLCJhZElkIiwiYXBpRnJhbWV3b3JrIiwiQ3JlYXRpdmVDb21wYW5pb24iLCJ2YXJpYXRpb25zIiwidHJhY2siLCJ0IiwicmVzb2x2ZVVSTFRlbXBsYXRlcyIsIkltYWdlIiwiciIsIkFTU0VUVVJJIiwiZW5jb2RlVVJJQ29tcG9uZW50UkZDMzk4NiIsIkNPTlRFTlRQTEFZSEVBRCIsIkVSUk9SQ09ERSIsInRlc3QiLCJDQUNIRUJVU1RJTkciLCJsZWZ0cGFkIiwicm91bmQiLCJyYW5kb20iLCJ0b1N0cmluZyIsIlRJTUVTVEFNUCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsIlJBTkRPTSIsInMiLCJuIiwicmVwbGFjZSIsInB1c2giLCJlbmNvZGVVUklDb21wb25lbnQiLCJjaGFyQ29kZUF0IiwicmFuZ2UiLCJtYXAiLCJqb2luIiwiaXNOdW1lcmljIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwiaXNGaW5pdGUiLCJmbGF0dGVuIiwicmVkdWNlIiwiY29uY2F0IiwiQXJyYXkiLCJpc0FycmF5IiwidXRpbCIsImNoaWxkQnlOYW1lIiwiY2hpbGROb2RlcyIsIm5vZGVOYW1lIiwiY2hpbGRyZW5CeU5hbWUiLCJyZXNvbHZlVmFzdEFkVGFnVVJJIiwiaW5kZXhPZiIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJzbGljZSIsImxhc3RJbmRleE9mIiwicGFyc2VCb29sZWFuIiwicGFyc2VOb2RlVGV4dCIsInRleHRDb250ZW50IiwidGV4dCIsInRyaW0iLCJjb3B5Tm9kZUF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZSIsInBhcnNlRHVyYXRpb24iLCJzcGxpdCIsInNwbGl0VkFTVCIsIm1lcmdlV3JhcHBlckFkRGF0YSIsInZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyIsInZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMiLCJ2aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlIiwicGFyc2VyVXRpbHMiLCJwYXJzZUNyZWF0aXZlQ29tcGFuaW9uIiwiY29tcGFuaW9uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlIiwiQ3JlYXRpdmVMaW5lYXIiLCJza2lwRGVsYXkiLCJhZFBhcmFtZXRlcnMiLCJpY29ucyIsIkljb24iLCJwcm9ncmFtIiwieFBvc2l0aW9uIiwieVBvc2l0aW9uIiwib2Zmc2V0IiwiaWNvbkNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlIiwiaWNvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMiLCJpY29uVmlld1RyYWNraW5nVVJMVGVtcGxhdGUiLCJNZWRpYUZpbGUiLCJkZWxpdmVyeVR5cGUiLCJtaW1lVHlwZSIsImNvZGVjIiwiYml0cmF0ZSIsIm1pbkJpdHJhdGUiLCJtYXhCaXRyYXRlIiwic2NhbGFibGUiLCJtYWludGFpbkFzcGVjdFJhdGlvIiwicGFyc2VDcmVhdGl2ZUxpbmVhciIsImNoYXJBdCIsImEiLCJ0b0xvd2VyQ2FzZSIsIm8iLCJwYXJzZVhQb3NpdGlvbiIsInBhcnNlWVBvc2l0aW9uIiwiQ3JlYXRpdmVOb25MaW5lYXIiLCJOb25MaW5lYXJBZCIsImV4cGFuZGVkV2lkdGgiLCJleHBhbmRlZEhlaWdodCIsIm1pblN1Z2dlc3RlZER1cmF0aW9uIiwibm9ubGluZWFyQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUiLCJub25saW5lYXJDbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzIiwicGFyc2VDcmVhdGl2ZU5vbkxpbmVhciIsInBhcnNlQWQiLCJwYXJzZVdyYXBwZXIiLCJwYXJzZUluTGluZSIsInBhcnNlQ3JlYXRpdmVBZElkQXR0cmlidXRlIiwicGFyc2VFeHRlbnNpb25zIiwidmVyc2lvbiIsIm1vZGVsIiwiY3VycmVuY3kiLCJuZXh0V3JhcHBlclVSTCIsIm5vZGVWYWx1ZSIsImRvbWFpbiIsIkV2ZW50SGFuZGxlcnMiLCJFdmVudEVtaXR0ZXIiLCJjYWxsIiwiJGdldE1heExpc3RlbmVycyIsIl9tYXhMaXN0ZW5lcnMiLCJkZWZhdWx0TWF4TGlzdGVuZXJzIiwiZW1pdE5vbmUiLCJhcnJheUNsb25lIiwiZW1pdE9uZSIsImVtaXRUd28iLCJlbWl0VGhyZWUiLCJsIiwiZW1pdE1hbnkiLCJhcHBseSIsIl9hZGRMaXN0ZW5lciIsIlR5cGVFcnJvciIsIl9ldmVudHMiLCJuZXdMaXN0ZW5lciIsImVtaXQiLCJfZXZlbnRzQ291bnQiLCJ1bnNoaWZ0Iiwid2FybmVkIiwiZW1pdHRlciIsImNvdW50IiwiZW1pdFdhcm5pbmciLCJ3YXJuIiwiX29uY2VXcmFwIiwicmVtb3ZlTGlzdGVuZXIiLCJhcmd1bWVudHMiLCJsaXN0ZW5lckNvdW50Iiwic3BsaWNlT25lIiwicG9wIiwidW53cmFwTGlzdGVuZXJzIiwieGRyIiwiWERvbWFpblJlcXVlc3QiLCJzdXBwb3J0ZWQiLCJBY3RpdmVYT2JqZWN0IiwiYXN5bmMiLCJyZXF1ZXN0IiwidGltZW91dCIsIndpdGhDcmVkZW50aWFscyIsInNlbmQiLCJvbnByb2dyZXNzIiwib25sb2FkIiwibG9hZFhNTCIsInJlc3BvbnNlVGV4dCIsInByb3RvdHlwZSIsImNyZWF0ZSIsInVzaW5nRG9tYWlucyIsIkRvbWFpbiIsImdldFByb3RvdHlwZU9mIiwic2V0TWF4TGlzdGVuZXJzIiwiZ2V0TWF4TGlzdGVuZXJzIiwiYyIsImNvbnRleHQiLCJkb21haW5FbWl0dGVyIiwiZG9tYWluVGhyb3duIiwicCIsImFkZExpc3RlbmVyIiwicHJlcGVuZExpc3RlbmVyIiwib25jZSIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJsaXN0ZW5lcnMiLCJldmVudE5hbWVzIiwiUmVmbGVjdCIsIm93bktleXMiLCJmbGFzaFVSTEhhbmRsZXIiLCJnZXQkMSIsIm5vZGVVUkxIYW5kbGVyIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJzdXBwb3J0ZWQkMSIsImdldCQyIiwib3ZlcnJpZGVNaW1lVHlwZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVhNTCIsInN0YXR1c1RleHQiLCJYSFJVUkxIYW5kbGVyIiwiZ2V0JDMiLCJ1cmxIYW5kbGVyIiwiVkFTVFJlc3BvbnNlIiwiREVGQVVMVF9NQVhfV1JBUFBFUl9ERVBUSCIsIkRFRkFVTFRfRVZFTlRfREFUQSIsIlZBU1RQYXJzZXIiLCJyZW1haW5pbmdBZHMiLCJwYXJlbnRVUkxzIiwicm9vdEVycm9yVVJMVGVtcGxhdGVzIiwibWF4V3JhcHBlckRlcHRoIiwiVVJMVGVtcGxhdGVGaWx0ZXJzIiwiZmV0Y2hpbmdPcHRpb25zIiwid3JhcHBlckRlcHRoIiwib3JpZ2luYWxVcmwiLCJyb290VVJMIiwid3JhcHBlckxpbWl0IiwidXJsaGFuZGxlciIsInNoaWZ0IiwicmVzb2x2ZUFkcyIsImJ1aWxkVkFTVFJlc3BvbnNlIiwiaW5pdFBhcnNpbmdTdGF0dXMiLCJmZXRjaFZBU1QiLCJpc1Jvb3RWQVNUIiwicGFyc2UiLCJnZXRFcnJvclVSTFRlbXBsYXRlcyIsImNvbXBsZXRlV3JhcHBlclJlc29sdmluZyIsInJlc29sdmVBbGwiLCJ3cmFwcGVyU2VxdWVuY2UiLCJkb2N1bWVudEVsZW1lbnQiLCJ0cmFja1Zhc3RFcnJvciIsInJlc29sdmVXcmFwcGVycyIsImFsbCIsImVycm9yQ29kZSIsImVycm9yTWVzc2FnZSIsIkVSUk9STUVTU0FHRSIsInNwbGljZSIsInN0b3JhZ2UiLCJERUZBVUxUX1NUT1JBR0UiLCJnZXRJdGVtIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJjbGVhciIsIlN0b3JhZ2UiLCJpbml0U3RvcmFnZSIsImxvY2FsU3RvcmFnZSIsInNlc3Npb25TdG9yYWdlIiwiaXNTdG9yYWdlRGlzYWJsZWQiLCJjYXBwaW5nRnJlZUx1bmNoIiwiY2FwcGluZ01pbmltdW1UaW1lSW50ZXJ2YWwiLCJkZWZhdWx0T3B0aW9ucyIsInZhc3RQYXJzZXIiLCJsYXN0U3VjY2Vzc2Z1bEFkIiwidG90YWxDYWxscyIsInRvdGFsQ2FsbHNUaW1lb3V0IiwiZ2V0UmVtYWluaW5nQWRzIiwibm93IiwiaGFzT3duUHJvcGVydHkiLCJnZXRBbmRQYXJzZVZBU1QiLCJERUZBVUxUX1NLSVBfREVMQVkiLCJjcmVhdGl2ZSIsInZhcmlhdGlvbiIsImltcHJlc3NlZCIsIl9hbHJlYWR5VHJpZ2dlcmVkUXVhcnRpbGVzIiwiZW1pdEFsd2F5c0V2ZW50cyIsIl9pbml0TGluZWFyVHJhY2tpbmciLCJfaW5pdFZhcmlhdGlvblRyYWNraW5nIiwibGluZWFyIiwic2V0RHVyYXRpb24iLCJjbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSIsImNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMiLCJhc3NldER1cmF0aW9uIiwicXVhcnRpbGVzIiwiZmlyc3RRdWFydGlsZSIsIm1pZHBvaW50IiwidGhpcmRRdWFydGlsZSIsImlzUXVhcnRpbGVSZWFjaGVkIiwicHJvZ3Jlc3MiLCJwYXVzZWQiLCJmdWxsc2NyZWVuIiwiZXhwYW5kZWQiLCJ0cmFja1VSTHMiLCJwcm9ncmVzc0Zvcm1hdHRlZCIsImNsb3NlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQU5BOzs7QUFvQkEsSUFBTUEsS0FBSyxTQUFMQSxFQUFLLENBQVNDLE9BQVQsRUFBa0JDLFFBQWxCLEVBQTRCQyxZQUE1QixFQUEwQ0MsUUFBMUMsRUFBb0RDLGFBQXBELEVBQWtFO0FBQ3pFO0FBQ0EsUUFBTUMsdUJBQXVCLG9CQUE3QjtBQUNBLFFBQU1DLHlCQUF5Qix5QkFBL0I7QUFDQSxRQUFJQyxxQkFBcUIsRUFBekI7QUFDQSxRQUFJQyxXQUFXLEVBQWY7O0FBRUEsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsT0FBTztBQUNQQyxpQkFBUyxLQURGLEVBQ1M7QUFDaEJDLGdCQUFTLEtBRkYsRUFFUztBQUNoQkMsc0JBQWU7QUFIUixLQUFYO0FBS0EsUUFBSUMsa0JBQWtCLElBQXRCO0FBQ0EsUUFBSUMsWUFBWSxJQUFoQjs7QUFFQSxRQUFJQyxxQkFBcUIsSUFBekI7QUFDQSxRQUFJQyxZQUFZLElBQWhCO0FBQ0EsUUFBSUMsYUFBYSxJQUFqQjtBQUNBLFFBQUlDLFdBQVcsSUFBZjtB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QjtBQUFDLFVBQU1OLElBQUVsRCxTQUFTLEtBQUtvVSxRQUFkLENBQVIsQ0FBZ0MsSUFBSTVRLElBQUVOLElBQUUsSUFBUixDQUFhTSxFQUFFL0YsTUFBRixHQUFTLENBQVQsS0FBYStGLFVBQU1BLENBQW5CLEVBQXdCLElBQUlHLElBQUVULElBQUUsRUFBRixHQUFLLEVBQVgsQ0FBY1MsRUFBRWxHLE1BQUYsR0FBUyxDQUFULEtBQWFrRyxVQUFNQSxDQUFuQixFQUF3QixJQUFJdkMsSUFBRThCLElBQUUsRUFBUixDQUFXLE9BQU85QixFQUFFM0QsTUFBRixHQUFTLENBQVQsS0FBYTJELFVBQU11QyxDQUFuQixHQUEyQkgsQ0FBM0IsU0FBZ0NHLENBQWhDLFNBQXFDdkMsQ0FBckMsU0FBMENwQixTQUFTLE9BQUssS0FBS29VLFFBQUwsR0FBY2xSLENBQW5CLENBQVQsQ0FBakQ7QUFBbUY7Ozs7RUFBeHRJc0gsWTs7UUFBZ3VJek4sVSxHQUFBQSxVO1FBQVc4UyxVLEdBQUFBLFU7UUFBV3ZTLFcsR0FBQUEsVyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAwOC8wNC8yMDE5LlxyXG4gKi9cclxuaW1wb3J0IEFkc0V2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvYWRzL2ltYS9MaXN0ZW5lclwiO1xyXG5pbXBvcnQge1RFTVBfVklERU9fVVJMfSBmcm9tIFwiYXBpL2Fkcy91dGlsc1wiO1xyXG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcclxuaW1wb3J0IHtcclxuICAgIEVSUk9SLFxyXG4gICAgQ09OVEVOVF9WT0xVTUUsXHJcbiAgICBTVEFURV9MT0FESU5HLFxyXG4gICAgSU5JVF9BRFNfRVJST1IsXHJcbiAgICBTVEFURV9BRF9FUlJPUixcclxuICAgIFBMQVlFUl9XQVJOSU5HLFxyXG4gICAgQ09OVEVOVF9NRVRBLFxyXG4gICAgV0FSTl9NU0dfTVVURURQTEFZLFxyXG4gICAgU1RBVEVfQURfTE9BRElORyxcclxuICAgIFBST1ZJREVSX0RBU0gsXHJcbiAgICBVSV9JQ09OU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBBZCA9IGZ1bmN0aW9uKGVsVmlkZW8sIHByb3ZpZGVyLCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsLCBlcnJvckNhbGxiYWNrKXtcclxuICAgIC8vVG9kbyA6IG1vdmUgY3JlYXRlQWRDb250YWluZXIgdG8gTWVkaWFNYW5hZ2VyXHJcbiAgICBjb25zdCBBVVRPUExBWV9OT1RfQUxMT1dFRCA9IFwiYXV0b3BsYXlOb3RBbGxvd2VkXCI7XHJcbiAgICBjb25zdCBBRE1BTkdFUl9MT0FESU5HX0VSUk9SID0gXCJhZG1hbmFnZXJMb2FkaW5nVGltZW91dFwiO1xyXG4gICAgbGV0IEFEU19NQU5BR0VSX0xPQURFRCA9IFwiXCI7XHJcbiAgICBsZXQgQURfRVJST1IgPSBcIlwiO1xyXG5cclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgYWRzTWFuYWdlckxvYWRlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGFkc0Vycm9yT2NjdXJyZWQgPSBmYWxzZTtcclxuICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgIHN0YXJ0ZWQ6IGZhbHNlLCAvL3BsYXllciBzdGFydGVkXHJcbiAgICAgICAgYWN0aXZlIDogZmFsc2UsIC8vb24gQWRcclxuICAgICAgICBpc1ZpZGVvRW5kZWQgOiBmYWxzZVxyXG4gICAgfTtcclxuICAgIGxldCBPbk1hbmFnZXJMb2FkZWQgPSBudWxsO1xyXG4gICAgbGV0IE9uQWRFcnJvciA9IG51bGw7XHJcblxyXG4gICAgbGV0IGFkRGlzcGxheUNvbnRhaW5lciA9IG51bGw7XHJcbiAgICBsZXQgYWRzTG9hZGVyID0gbnVsbDtcclxuICAgIGxldCBhZHNNYW5hZ2VyID0gbnVsbDtcclxuICAgIGxldCBsaXN0ZW5lciA9IG51bGw7XHJcbiAgICBsZXQgYWRzUmVxdWVzdCA9IG51bGw7XHJcbiAgICBsZXQgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2UsIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGJyb3dzZXIgPSBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpO1xyXG4gICAgbGV0IGlzTW9iaWxlID0gYnJvd3Nlci5vcyA9PT0gXCJBbmRyb2lkXCIgfHwgYnJvd3Nlci5vcyA9PT0gXCJpT1NcIjtcclxuXHJcbiAgICBsZXQgYWREaXNwbGF5Q29udGFpbmVySW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBnb29nbGUuaW1hLnNldHRpbmdzLnNldEF1dG9QbGF5QWRCcmVha3MoZmFsc2UpO1xyXG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcclxuXHJcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xyXG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyh0cnVlKTtcclxuICAgIGNvbnN0IHNlbmRXYXJuaW5nTWVzc2FnZUZvck11dGVkUGxheSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZRVJfV0FSTklORywge1xyXG4gICAgICAgICAgICBtZXNzYWdlIDogV0FSTl9NU0dfTVVURURQTEFZLFxyXG4gICAgICAgICAgICB0aW1lciA6IDEwICogMTAwMCxcclxuICAgICAgICAgICAgaWNvbkNsYXNzIDogVUlfSUNPTlMudm9sdW1lX211dGUsXHJcbiAgICAgICAgICAgIG9uQ2xpY2tDYWxsYmFjayA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRNdXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IHN0YXJ0ZWQgXCIsIFwiaXNNb2JpbGUgOiBcIiwgaXNNb2JpbGUsIGFkVGFnVXJsKTtcclxuXHJcbiAgICB0cnl7XHJcbiAgICAgICAgQURTX01BTkFHRVJfTE9BREVEID0gZ29vZ2xlLmltYS5BZHNNYW5hZ2VyTG9hZGVkRXZlbnQuVHlwZS5BRFNfTUFOQUdFUl9MT0FERUQ7XHJcbiAgICAgICAgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SO1xyXG4gICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0TG9jYWxlKHBsYXllckNvbmZpZy5nZXRMYW5ndWFnZSgpKTtcclxuICAgICAgICBnb29nbGUuaW1hLnNldHRpbmdzLnNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyh0cnVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ29wLWFkcycpO1xyXG4gICAgICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ29wLWFkcycpO1xyXG4gICAgICAgICAgICBwbGF5ZXJDb25maWcuZ2V0Q29udGFpbmVyKCkuYXBwZW5kKGFkQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE9uQWRFcnJvciA9IGZ1bmN0aW9uKGFkRXJyb3JFdmVudCl7XHJcbiAgICAgICAgICAgIC8vbm90ZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldElubmVyRXJyb3IoKS5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSAmIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSA9PT0gNDAwIGlzIEJyb3dzZXIgVXNlciBJbnRlcmFjdGl2ZSBlcnJvci5cclxuXHJcbiAgICAgICAgICAgIC8vRG8gbm90IHRyaWdnZXJpbmcgRVJST1IuIGJlY3Vhc2UgSXQganVzdCBBRCFcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSwgYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0TWVzc2FnZSgpKTtcclxuICAgICAgICAgICAgYWRzRXJyb3JPY2N1cnJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBpbm5lckVycm9yID0gYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpO1xyXG4gICAgICAgICAgICBpZihpbm5lckVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlubmVyRXJyb3IuZ2V0RXJyb3JDb2RlKCksIGlubmVyRXJyb3IuZ2V0TWVzc2FnZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKmlmIChhZHNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfRVJST1IsIHtjb2RlIDogYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpICwgbWVzc2FnZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldE1lc3NhZ2UoKX0pO1xyXG4gICAgICAgICAgICBzcGVjLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XHJcblxyXG4gICAgICAgICAgICAvKmlmKGlubmVyRXJyb3IgJiYgaW5uZXJFcnJvci5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSl7XHJcbiAgICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICB9Ki9cclxuXHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgT25NYW5hZ2VyTG9hZGVkID0gZnVuY3Rpb24oYWRzTWFuYWdlckxvYWRlZEV2ZW50KXtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IE9uTWFuYWdlckxvYWRlZCBcIik7XHJcbiAgICAgICAgICAgIGxldCBhZHNSZW5kZXJpbmdTZXR0aW5ncyA9IG5ldyBnb29nbGUuaW1hLkFkc1JlbmRlcmluZ1NldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIGFkc1JlbmRlcmluZ1NldHRpbmdzLnJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvL2Fkc1JlbmRlcmluZ1NldHRpbmdzLnVzZVN0eWxlZE5vbkxpbmVhckFkcyA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmKGFkc01hbmFnZXIpe1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogZGVzdHJveSBhZHNNYW5hZ2VyLS0tLVwiKTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKGVsVmlkZW8sIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcclxuXHJcbiAgICAgICAgICAgIGxpc3RlbmVyID0gQWRzRXZlbnRzTGlzdGVuZXIoYWRzTWFuYWdlciwgcHJvdmlkZXIsIHNwZWMsIE9uQWRFcnJvcik7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBjcmVhdGVkIGFkbWFuYWdlciBhbmQgbGlzdG5lciBcIik7XHJcblxyXG4gICAgICAgICAgICBhZHNNYW5hZ2VyTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBhZENvbmF0aW5lckVsbWVudCA9IGNyZWF0ZUFkQ29udGFpbmVyKCk7XHJcbiAgICAgICAgYWREaXNwbGF5Q29udGFpbmVyID0gbmV3IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyKGFkQ29uYXRpbmVyRWxtZW50LCBlbFZpZGVvKTtcclxuICAgICAgICBhZHNMb2FkZXIgPSBuZXcgZ29vZ2xlLmltYS5BZHNMb2FkZXIoYWREaXNwbGF5Q29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURTX01BTkFHRVJfTE9BREVELCBPbk1hbmFnZXJMb2FkZWQsIGZhbHNlKTtcclxuICAgICAgICBhZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGFkRGlzcGxheUNvbnRhaW5lciBpbml0aWFsaXplZFwiKTtcclxuICAgICAgICBwcm92aWRlci5vbihDT05URU5UX1ZPTFVNRSwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZihhZHNNYW5hZ2VyKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubXV0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zZXRWb2x1bWUoMCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnNldFZvbHVtZShkYXRhLnZvbHVtZS8xMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhhdCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNldEF1dG9QbGF5VG9BZHNSZXF1ZXN0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIGlmKGFkc1JlcXVlc3Qpe1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogc2V0QURXaWxsQXV0b1BsYXkgXCIsIFwiYXV0b3BsYXlBbGxvd2VkXCIsYXV0b3BsYXlBbGxvd2VkLCBcImF1dG9wbGF5UmVxdWlyZXNNdXRlZFwiLGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxBdXRvUGxheShhdXRvcGxheUFsbG93ZWQpO1xyXG4gICAgICAgICAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxQbGF5TXV0ZWQoYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcclxuICAgICAgICAgICAgICAgIGlmKGF1dG9wbGF5UmVxdWlyZXNNdXRlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZFdhcm5pbmdNZXNzYWdlRm9yTXV0ZWRQbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBpbml0UmVxdWVzdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGFkc01hbmFnZXJMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogaW5pdFJlcXVlc3QoKSBBdXRvUGxheSBTdXBwb3J0IDogXCIsIFwiYXV0b3BsYXlBbGxvd2VkXCIsYXV0b3BsYXlBbGxvd2VkLCBcImF1dG9wbGF5UmVxdWlyZXNNdXRlZFwiLGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XHJcbiAgICAgICAgICAgIC8qaWYoYWRzUmVxdWVzdCl7XHJcbiAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgYWRzUmVxdWVzdCA9IG5ldyBnb29nbGUuaW1hLkFkc1JlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgICAgIGFkc1JlcXVlc3QuZm9yY2VOb25MaW5lYXJGdWxsU2xvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvKmlmKHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkuYnJvd3NlciA9PT0gXCJTYWZhcmlcIiAmJiBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zID09PSBcImlPU1wiICl7XHJcbiAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgICAgICBzZXRBdXRvUGxheVRvQWRzUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICBhZHNSZXF1ZXN0LmFkVGFnVXJsID0gYWRUYWdVcmw7XHJcblxyXG4gICAgICAgICAgICBhZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogcmVxdWVzdEFkcyBDb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgLy90d28gd2F5IHdoYXQgYWQgc3RhcnRzLlxyXG4gICAgICAgICAgICAvL2Fkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpOyBvciAgYWRzTWFuYWdlci5zdGFydCgpO1xyXG4gICAgICAgICAgICAvL3doYXQ/IHdoeT8/IHd0aD8/XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGNoZWNrQXV0b3BsYXlTdXBwb3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBjaGVja0F1dG9wbGF5U3VwcG9ydCgpIFwiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpO1xyXG4gICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5zcmMgPSBURU1QX1ZJREVPX1VSTDtcclxuICAgICAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ubG9hZCgpO1xyXG5cclxuICAgICAgICAgICAgLy9EYXNoIGhhcyBhbHJlYWR5IGxvYWRlZCB3aGVuIHRyaWdnZXJlZCBwcm92aWRlci5wbGF5KCkgYWx3YXlzLlxyXG4gICAgICAgICAgICBpZihpc01vYmlsZSAmJiBwcm92aWRlci5nZXROYW1lKCkgIT09IFBST1ZJREVSX0RBU0ggKXtcclxuICAgICAgICAgICAgICAgIC8vTWFpbiB2aWRlbyBzZXRzIHVzZXIgZ2VzdHVyZSB3aGVuIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvIHRyaWdnZXJlZCBjaGVja2luZy5cclxuICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qIERpZmZlcmVudCBicm93c2VyLXNwZWNpZmljIHdheXMgdG8gZGVsaXZlcnkgVUkgdG8gb3RoZXIgZWxlbWVudHMuICBNeSBHdWVzcy4gMjAxOS0wNi0xOVxyXG4gICAgICAgICAgICAqICAgKHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvJ3MgVXNlciBJbnRlcmFjdGlvbiBkZWxpdmVyeSB0byBlbFZpZGVvLilcclxuICAgICAgICAgICAgKiAgIE1vYmlsZSBDaHJvbWUgV2ViVmlldyA6XHJcbiAgICAgICAgICAgICogICBZb3UgaGF2ZSB0byBydW4gZWxWaWRlby5sb2FkKCkgd2hlbiB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlbyBpc3N1ZXMgd2l0aGluIDUgc2Vjb25kcyBvZiB1c2VyIGludGVyYWN0aW9uLlxyXG4gICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICogICBNb2JpbGUgaW9zIHNhZmFyaSA6XHJcbiAgICAgICAgICAgICogICBZb3UgaGF2ZSB0byBydW4gZWxWaWRlby5sb2FkKCkgYmVmb3JlIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvIHJ1biBwbGF5KCkuXHJcbiAgICAgICAgICAgICogKi9cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNsZWFyQW5kUmVwb3J0ID0gZnVuY3Rpb24oX2F1dG9wbGF5QWxsb3dlZCwgX2F1dG9wbGF5UmVxdWlyZXNNdXRlZCl7XHJcbiAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBfYXV0b3BsYXlBbGxvd2VkO1xyXG4gICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gX2F1dG9wbGF5UmVxdWlyZXNNdXRlZDtcclxuICAgICAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRBdXRvUGxheVRvQWRzUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XHJcbiAgICAgICAgICAgICAgICBpZighdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucGxheSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9JIGNhbid0IHJlbWVtYmVyIHRoaXMgY2FzZS4uLlxyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6ICF0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheVByb21pc2UgPSB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogYXV0byBwbGF5IGFsbG93ZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCB1bm11dGVkIGF1dG9wbGF5IHdvcmtzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGF1dG8gcGxheSBmYWlsZWRcIiwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydChmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0Rpc2FibGUgTXV0ZWQgUGxheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyp0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby52b2x1bWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UgPSB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCBtdXRlZCBhdXRvcGxheSB3b3JrcyBidXQgdW5tdXRlZCBhdXRvcGxheSBkb2VzIG5vdC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogbXV0ZWQgYXV0byBwbGF5IHN1Y2Nlc3MuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldE11dGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IG11dGVkIGF1dG8gcGxheSBmYWlsZWRcIiwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogcHJvbWlzZSBub3Qgc3VwcG9ydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9NYXliZSB0aGlzIGlzIElFMTEuLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGF0LmlzQWN0aXZlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc3BlYy5hY3RpdmU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LnN0YXJ0ZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnN0YXJ0ZWQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHNwZWMuc3RhcnRlZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5yZXN1bWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQWRzTWFuYWdlcklzUmVhZHkgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhZHNNYW5hZ2VyTG9hZGVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGFkIHN0YXJ0IVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuaW5pdChcIjEwMCVcIiwgXCIxMDAlXCIsIGdvb2dsZS5pbWEuVmlld01vZGUuTk9STUFMKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFkc0Vycm9yT2NjdXJyZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoQURNQU5HRVJfTE9BRElOR19FUlJPUikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDE1MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihBRE1BTkdFUl9MT0FESU5HX0VSUk9SKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCAocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkgJiYgIWF1dG9wbGF5QWxsb3dlZCkgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGF1dG9wbGF5QWxsb3dlZCA6IGZhbHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKEFVVE9QTEFZX05PVF9BTExPV0VEKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWRzTWFuYWdlcklzUmVhZHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgYWRzTWFuYWdlci5wYXVzZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhhdC52aWRlb0VuZGVkQ2FsbGJhY2sgPSAoY29tcGxldGVDb250ZW50Q2FsbGJhY2spID0+IHtcclxuICAgICAgICAgICAgLy9saXN0ZW5lci5pc0xpbmVhckFkIDogZ2V0IGN1cnJlbnQgYWQncyBzdGF0dXMgd2hldGhlciBsaW5lYXIgYWQgb3Igbm90LlxyXG4gICAgICAgICAgICBpZihsaXN0ZW5lciAmJiAobGlzdGVuZXIuaXNBbGxBZENvbXBsZXRlKCkgfHwgIWxpc3RlbmVyLmlzTGluZWFyQWQoKSkpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGVDb250ZW50Q2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoYWRzRXJyb3JPY2N1cnJlZCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vSWYgeW91IG5lZWQgcGxheSB0aGUgcG9zdC1yb2xsLCB5b3UgaGF2ZSB0byBjYWxsIHRvIGFkc0xvYWRlciB3aGVuIGNvbnRlbnRzIHdhcyBjb21wbGV0ZWQuXHJcbiAgICAgICAgICAgICAgICBzcGVjLmlzVmlkZW9FbmRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZihhZHNMb2FkZXIpe1xyXG4gICAgICAgICAgICAgICAgYWRzTG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQURTX01BTkFHRVJfTE9BREVELCBPbk1hbmFnZXJMb2FkZWQpO1xyXG4gICAgICAgICAgICAgICAgYWRzTG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQURfRVJST1IsIE9uQWRFcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGFkc01hbmFnZXIpe1xyXG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGFkRGlzcGxheUNvbnRhaW5lcil7XHJcbiAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihsaXN0ZW5lcil7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCAkYWRzID0gTEEkKHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKSkuZmluZChcIi5vcC1hZHNcIik7XHJcbiAgICAgICAgICAgIGlmKCRhZHMpe1xyXG4gICAgICAgICAgICAgICAgJGFkcy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJvdmlkZXIub2ZmKENPTlRFTlRfVk9MVU1FLCBudWxsLCB0aGF0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgIH1jYXRjaCAoZXJyb3Ipe1xyXG4gICAgICAgIC8vbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tJTklUX0FEU19FUlJPUl07XHJcbiAgICAgICAgLy90ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAvL2Vycm9yQ2FsbGJhY2sodGVtcEVycm9yKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFkO1xyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAxMC8wNC8yMDE5LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX0FEX0xPQURFRCxcclxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXHJcbiAgICBTVEFURV9BRF9QQVVTRUQsXHJcbiAgICBTVEFURV9BRF9DT01QTEVURSxcclxuICAgIEFEX0NIQU5HRUQsXHJcbiAgICBBRF9USU1FLFxyXG4gICAgUExBWUVSX0NMSUNLRUQsXHJcbiAgICBQTEFZRVJfQURfQ0xJQ0tcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihhZHNNYW5hZ2VyLCBwcm92aWRlciwgYWRzU3BlYywgT25BZEVycm9yKXtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgbG93TGV2ZWxFdmVudHMgPSB7fTtcclxuXHJcbiAgICBsZXQgaW50ZXJ2YWxUaW1lciA9IG51bGw7XHJcblxyXG4gICAgY29uc3QgQURfQlVGRkVSSU5HID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQURfQlVGRkVSSU5HO1xyXG4gICAgY29uc3QgQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRDtcclxuICAgIGNvbnN0IENPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRDtcclxuICAgIGNvbnN0IEFEX0VSUk9SID0gZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUjtcclxuICAgIGNvbnN0IEFMTF9BRFNfQ09NUExFVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQ7XHJcbiAgICBjb25zdCBDTElDSyA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNMSUNLO1xyXG4gICAgY29uc3QgU0tJUFBFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNLSVBQRUQ7XHJcbiAgICBjb25zdCBDT01QTEVURSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFO1xyXG4gICAgY29uc3QgRklSU1RfUVVBUlRJTEU9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkZJUlNUX1FVQVJUSUxFO1xyXG4gICAgY29uc3QgTE9BREVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEO1xyXG4gICAgY29uc3QgTUlEUE9JTlQ9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLk1JRFBPSU5UO1xyXG4gICAgY29uc3QgUEFVU0VEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUEFVU0VEO1xyXG4gICAgY29uc3QgUkVTVU1FRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlJFU1VNRUQ7XHJcbiAgICBjb25zdCBTVEFSVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU1RBUlRFRDtcclxuICAgIGNvbnN0IFVTRVJfQ0xPU0UgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5VU0VSX0NMT1NFO1xyXG4gICAgY29uc3QgVEhJUkRfUVVBUlRJTEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5USElSRF9RVUFSVElMRTtcclxuXHJcbiAgICBsZXQgaXNBbGxBZENvbXBlbGV0ZSA9IGZhbHNlOyAgIC8vUG9zdCByb2xs7J2EIOychO2VtFxyXG4gICAgbGV0IGFkQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XHJcbiAgICBsZXQgY3VycmVudEFkID0gbnVsbDtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IExpc3RlbmVyIENyZWF0ZWRcIik7XHJcbiAgICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9QQVVTRV9SRVFVRVNURURdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIExJU1RFTkVSIDogXCIsIGFkRXZlbnQudHlwZSk7XHJcblxyXG4gICAgICAgICAvL1RoaXMgY2FsbGxzIHdoZW4gcGxheWVyIGlzIHBsYXlpbmcgY29udGVudHMgZm9yIGFkLlxyXG4gICAgICAgICBpZihhZHNTcGVjLnN0YXJ0ZWQpe1xyXG4gICAgICAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIExJU1RFTkVSIDogXCIsIGFkRXZlbnQudHlwZSk7XHJcbiAgICAgICAgLy9UaGlzIGNhbGxzIHdoZW4gb25lIGFkIGVuZGVkLlxyXG4gICAgICAgIC8vQW5kIHRoaXMgaXMgc2lnbmFsIHdoYXQgcGxheSB0aGUgY29udGVudHMuXHJcbiAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkICYmIChwcm92aWRlci5nZXRQb3NpdGlvbigpID09PSAwIHx8ICFhZHNTcGVjLmlzVmlkZW9FbmRlZCkgICl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzW0FEX0VSUk9SXSA9IChhZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgaXNBbGxBZENvbXBlbGV0ZSA9IHRydWU7XHJcbiAgICAgICAgT25BZEVycm9yKGFkRXZlbnQpO1xyXG4gICAgfSA7XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHNbQUxMX0FEU19DT01QTEVURURdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgTElTVEVORVIgOiBcIiwgYWRFdmVudC50eXBlKTtcclxuXHJcbiAgICAgICAgaXNBbGxBZENvbXBlbGV0ZSA9IHRydWU7XHJcbiAgICAgICAgaWYoYWRzU3BlYy5pc1ZpZGVvRW5kZWQpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzW0NMSUNLXSA9IChhZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZRVJfQ0xJQ0tFRCwge3R5cGUgOiBQTEFZRVJfQURfQ0xJQ0t9KTtcclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50c1tGSVJTVF9RVUFSVElMRV0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgfTtcclxuICAgIC8vXHJcbiAgICBsb3dMZXZlbEV2ZW50c1tBRF9CVUZGRVJJTkddID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRF9CVUZGRVJJTkdcIixhZEV2ZW50LnR5cGUpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzW0xPQURFRF0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgICAgIGxldCByZW1haW5pbmdUaW1lID0gYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XHJcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfTE9BREVELCB7cmVtYWluaW5nIDogcmVtYWluaW5nVGltZSwgaXNMaW5lYXIgOiBhZC5pc0xpbmVhcigpIH0pO1xyXG5cclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50c1tNSURQT0lOVF0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzW1BBVVNFRF0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BBVVNFRCk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHNbUkVTVU1FRF0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHNbU1RBUlRFRF0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcclxuICAgICAgICBjdXJyZW50QWQgPSBhZDtcclxuXHJcbiAgICAgICAgbGV0IGFkT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgLFxyXG4gICAgICAgICAgICBkdXJhdGlvbiA6IGFkLmdldER1cmF0aW9uKCksXHJcbiAgICAgICAgICAgIHNraXBUaW1lT2Zmc2V0IDogYWQuZ2V0U2tpcFRpbWVPZmZzZXQoKSAgICAgLy9UaGUgbnVtYmVyIG9mIHNlY29uZHMgb2YgcGxheWJhY2sgYmVmb3JlIHRoZSBhZCBiZWNvbWVzIHNraXBwYWJsZS5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfQ0hBTkdFRCwgYWRPYmplY3QpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcclxuXHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xyXG4gICAgICAgICAgICBhZHNTcGVjLnN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBGb3IgYSBsaW5lYXIgYWQsIGEgdGltZXIgY2FuIGJlIHN0YXJ0ZWQgdG8gcG9sbCBmb3JcclxuICAgICAgICAgICAgLy8gdGhlIHJlbWFpbmluZyB0aW1lLlxyXG4gICAgICAgICAgICBpbnRlcnZhbFRpbWVyID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGFkLmdldER1cmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfVElNRSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA6IGR1cmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwVGltZU9mZnNldCA6IGFkLmdldFNraXBUaW1lT2Zmc2V0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZHVyYXRpb24gLSByZW1haW5pbmdUaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwcGFibGUgOiBhZHNNYW5hZ2VyLmdldEFkU2tpcHBhYmxlU3RhdGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMCk7IC8vIGV2ZXJ5IDMwMG1zXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHNbQ09NUExFVEVdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcclxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XHJcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XHJcbiAgICB9O1xyXG4gICAgLy9Vc2VyIHNraXBwZWQgYWQuIHNhbWUgcHJvY2VzcyBvbiBjb21wbGV0ZS5cclxuICAgIGxvd0xldmVsRXZlbnRzW1NLSVBQRURdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcclxuXHJcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xyXG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzW1VTRVJfQ0xPU0VdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcclxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XHJcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHNbVEhJUkRfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XHJcbiAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICAgICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICB9KTtcclxuICAgIHRoYXQuc2V0QWRDb21wbGV0ZUNhbGxiYWNrID0gKF9hZENvbXBsZXRlQ2FsbGJhY2spID0+IHtcclxuICAgICAgICBhZENvbXBsZXRlQ2FsbGJhY2sgPSBfYWRDb21wbGV0ZUNhbGxiYWNrO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBbGxBZENvbXBsZXRlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpc0FsbEFkQ29tcGVsZXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNMaW5lYXJBZCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gY3VycmVudEFkICA/IGN1cnJlbnRBZC5pc0xpbmVhcigpIDogdHJ1ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUFFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xyXG4gICAgICAgIC8vcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XHJcbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyNy8wNi8yMDE5LlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFRFTVBfVklERU9fVVJMID0gXCJkYXRhOnZpZGVvL21wNDtiYXNlNjQsIEFBQUFIR1owZVhCTk5GWWdBQUFDQUdsemIyMXBjMjh5WVhaak1RQUFBQWhtY21WbEFBQUdGMjFrWVhUZUJBQUFiR2xpWm1GaFl5QXhMakk0QUFCQ0FKTWdCRElBUndBQUFyRUdCZi8vcmR4RjZiM20yVWkzbGl6WUlOa2o3dTk0TWpZMElDMGdZMjl5WlNBeE5ESWdjaklnT1RVMll6aGtPQ0F0SUVndU1qWTBMMDFRUlVjdE5DQkJWa01nWTI5a1pXTWdMU0JEYjNCNWJHVm1kQ0F5TURBekxUSXdNVFFnTFNCb2RIUndPaTh2ZDNkM0xuWnBaR1Z2YkdGdUxtOXlaeTk0TWpZMExtaDBiV3dnTFNCdmNIUnBiMjV6T2lCallXSmhZejB3SUhKbFpqMHpJR1JsWW14dlkyczlNVG93T2pBZ1lXNWhiSGx6WlQwd2VERTZNSGd4TVRFZ2JXVTlhR1Y0SUhOMVltMWxQVGNnY0hONVBURWdjSE41WDNKa1BURXVNREE2TUM0d01DQnRhWGhsWkY5eVpXWTlNU0J0WlY5eVlXNW5aVDB4TmlCamFISnZiV0ZmYldVOU1TQjBjbVZzYkdselBURWdPSGc0WkdOMFBUQWdZM0Z0UFRBZ1pHVmhaSHB2Ym1VOU1qRXNNVEVnWm1GemRGOXdjMnRwY0QweElHTm9jbTl0WVY5eGNGOXZabVp6WlhROUxUSWdkR2h5WldGa2N6MDJJR3h2YjJ0aGFHVmhaRjkwYUhKbFlXUnpQVEVnYzJ4cFkyVmtYM1JvY21WaFpITTlNQ0J1Y2owd0lHUmxZMmx0WVhSbFBURWdhVzUwWlhKc1lXTmxaRDB3SUdKc2RYSmhlVjlqYjIxd1lYUTlNQ0JqYjI1emRISmhhVzVsWkY5cGJuUnlZVDB3SUdKbWNtRnRaWE05TUNCM1pXbG5hSFJ3UFRBZ2EyVjVhVzUwUFRJMU1DQnJaWGxwYm5SZmJXbHVQVEkxSUhOalpXNWxZM1YwUFRRd0lHbHVkSEpoWDNKbFpuSmxjMmc5TUNCeVkxOXNiMjlyWVdobFlXUTlOREFnY21NOVkzSm1JRzFpZEhKbFpUMHhJR055WmoweU15NHdJSEZqYjIxd1BUQXVOakFnY1hCdGFXNDlNQ0J4Y0cxaGVEMDJPU0J4Y0hOMFpYQTlOQ0IyWW5aZmJXRjRjbUYwWlQwM05qZ2dkbUoyWDJKMVpuTnBlbVU5TXpBd01DQmpjbVpmYldGNFBUQXVNQ0J1WVd4ZmFISmtQVzV2Ym1VZ1ptbHNiR1Z5UFRBZ2FYQmZjbUYwYVc4OU1TNDBNQ0JoY1QweE9qRXVNREFBZ0FBQUFGWmxpSVFMOG1LQUFLdk1uSnljbkp5Y25KeWNuWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWGlFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBZEJtamdYNEdTQUlRQkprQUlaQUNPQUFBQUFCMEdhVkFYNEdTQWhBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQUFHUVpwZ0w4REpJUUJKa0FJWkFDT0FJUUJKa0FJWkFDT0FBQUFBQmtHYWdDL0F5U0VBU1pBQ0dRQWpnQUFBQUFaQm1xQXZ3TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1FackFMOERKSVFCSmtBSVpBQ09BQUFBQUJrR2E0Qy9BeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtd0F2d01raEFFbVFBaGtBSTRBQUFBQUdRWnNnTDhESklRQkprQUlaQUNPQUlRQkprQUlaQUNPQUFBQUFCa0diUUMvQXlTRUFTWkFDR1FBamdDRUFTWkFDR1FBamdBQUFBQVpCbTJBdndNa2hBRW1RQWhrQUk0QUFBQUFHUVp1QUw4REpJUUJKa0FJWkFDT0FJUUJKa0FJWkFDT0FBQUFBQmtHYm9DL0F5U0VBU1pBQ0dRQWpnQUFBQUFaQm04QXZ3TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1FadmdMOERKSVFCSmtBSVpBQ09BQUFBQUJrR2FBQy9BeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtaUF2d01raEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBQUFBQUdRWnBBTDhESklRQkprQUlaQUNPQUFBQUFCa0dhWUMvQXlTRUFTWkFDR1FBamdDRUFTWkFDR1FBamdBQUFBQVpCbW9BdndNa2hBRW1RQWhrQUk0QUFBQUFHUVpxZ0w4REpJUUJKa0FJWkFDT0FJUUJKa0FJWkFDT0FBQUFBQmtHYXdDL0F5U0VBU1pBQ0dRQWpnQUFBQUFaQm11QXZ3TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1Fac0FMOERKSVFCSmtBSVpBQ09BQUFBQUJrR2JJQy9BeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtMEF2d01raEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBQUFBQUdRWnRnTDhESklRQkprQUlaQUNPQUFBQUFCa0diZ0N2QXlTRUFTWkFDR1FBamdDRUFTWkFDR1FBamdBQUFBQVpCbTZBbndNa2hBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQWh1Ylc5dmRnQUFBR3h0ZG1oa0FBQUFBQUFBQUFBQUFBQUFBQUFENkFBQUJEY0FBUUFBQVFBQUFBQUFBQUFBQUFBQUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUF3QUFBekIwY21GckFBQUFYSFJyYUdRQUFBQURBQUFBQUFBQUFBQUFBQUFCQUFBQUFBQUFBK2tBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFCQUFBQUFBTEFBQUFDUUFBQUFBQUFrWldSMGN3QUFBQnhsYkhOMEFBQUFBQUFBQUFFQUFBUHBBQUFBQUFBQkFBQUFBQUtvYldScFlRQUFBQ0J0Wkdoa0FBQUFBQUFBQUFBQUFBQUFBQUIxTUFBQWRVNVZ4QUFBQUFBQUxXaGtiSElBQUFBQUFBQUFBSFpwWkdVQUFBQUFBQUFBQUFBQUFBQldhV1JsYjBoaGJtUnNaWElBQUFBQ1UyMXBibVlBQUFBVWRtMW9aQUFBQUFFQUFBQUFBQUFBQUFBQUFDUmthVzVtQUFBQUhHUnlaV1lBQUFBQUFBQUFBUUFBQUF4MWNtd2dBQUFBQVFBQUFoTnpkR0pzQUFBQXIzTjBjMlFBQUFBQUFBQUFBUUFBQUo5aGRtTXhBQUFBQUFBQUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFMQUFrQUJJQUFBQVNBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBR1AvL0FBQUFMV0YyWTBNQlFzQU4vK0VBRldkQ3dBM1pBc1RzQkVBQUFQcEFBRHFZQThVS2tnRUFCV2pMZzhzZ0FBQUFISFYxYVdScmFFRHlYeVJQeGJvNXBSdlBBeVB6QUFBQUFBQUFBQmh6ZEhSekFBQUFBQUFBQUFFQUFBQWVBQUFENlFBQUFCUnpkSE56QUFBQUFBQUFBQUVBQUFBQkFBQUFISE4wYzJNQUFBQUFBQUFBQVFBQUFBRUFBQUFCQUFBQUFRQUFBSXh6ZEhONkFBQUFBQUFBQUFBQUFBQWVBQUFERHdBQUFBc0FBQUFMQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQWlITjBZMjhBQUFBQUFBQUFIZ0FBQUVZQUFBTm5BQUFEZXdBQUE1Z0FBQU8wQUFBRHh3QUFBK01BQUFQMkFBQUVFZ0FBQkNVQUFBUkJBQUFFWFFBQUJIQUFBQVNNQUFBRW53QUFCTHNBQUFUT0FBQUU2Z0FBQlFZQUFBVVpBQUFGTlFBQUJVZ0FBQVZrQUFBRmR3QUFCWk1BQUFXbUFBQUZ3Z0FBQmQ0QUFBWHhBQUFHRFFBQUJHaDBjbUZyQUFBQVhIUnJhR1FBQUFBREFBQUFBQUFBQUFBQUFBQUNBQUFBQUFBQUJEY0FBQUFBQUFBQUFBQUFBQUVCQUFBQUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQWtaV1IwY3dBQUFCeGxiSE4wQUFBQUFBQUFBQUVBQUFRa0FBQURjQUFCQUFBQUFBUGdiV1JwWVFBQUFDQnRaR2hrQUFBQUFBQUFBQUFBQUFBQUFBQzdnQUFBeWtCVnhBQUFBQUFBTFdoa2JISUFBQUFBQUFBQUFITnZkVzRBQUFBQUFBQUFBQUFBQUFCVGIzVnVaRWhoYm1Sc1pYSUFBQUFEaTIxcGJtWUFBQUFRYzIxb1pBQUFBQUFBQUFBQUFBQUFKR1JwYm1ZQUFBQWNaSEpsWmdBQUFBQUFBQUFCQUFBQURIVnliQ0FBQUFBQkFBQURUM04wWW13QUFBQm5jM1J6WkFBQUFBQUFBQUFCQUFBQVYyMXdOR0VBQUFBQUFBQUFBUUFBQUFBQUFBQUFBQUlBRUFBQUFBQzdnQUFBQUFBQU0yVnpaSE1BQUFBQUE0Q0FnQ0lBQWdBRWdJQ0FGRUFWQmJqWUFBdTRBQUFBRGNvRmdJQ0FBaEdRQm9DQWdBRUNBQUFBSUhOMGRITUFBQUFBQUFBQUFnQUFBRElBQUFRQUFBQUFBUUFBQWtBQUFBRlVjM1J6WXdBQUFBQUFBQUFiQUFBQUFRQUFBQUVBQUFBQkFBQUFBZ0FBQUFJQUFBQUJBQUFBQXdBQUFBRUFBQUFCQUFBQUJBQUFBQUlBQUFBQkFBQUFCZ0FBQUFFQUFBQUJBQUFBQndBQUFBSUFBQUFCQUFBQUNBQUFBQUVBQUFBQkFBQUFDUUFBQUFJQUFBQUJBQUFBQ2dBQUFBRUFBQUFCQUFBQUN3QUFBQUlBQUFBQkFBQUFEUUFBQUFFQUFBQUJBQUFBRGdBQUFBSUFBQUFCQUFBQUR3QUFBQUVBQUFBQkFBQUFFQUFBQUFJQUFBQUJBQUFBRVFBQUFBRUFBQUFCQUFBQUVnQUFBQUlBQUFBQkFBQUFGQUFBQUFFQUFBQUJBQUFBRlFBQUFBSUFBQUFCQUFBQUZnQUFBQUVBQUFBQkFBQUFGd0FBQUFJQUFBQUJBQUFBR0FBQUFBRUFBQUFCQUFBQUdRQUFBQUlBQUFBQkFBQUFHZ0FBQUFFQUFBQUJBQUFBR3dBQUFBSUFBQUFCQUFBQUhRQUFBQUVBQUFBQkFBQUFIZ0FBQUFJQUFBQUJBQUFBSHdBQUFBUUFBQUFCQUFBQTRITjBjM29BQUFBQUFBQUFBQUFBQURNQUFBQWFBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFDTWMzUmpid0FBQUFBQUFBQWZBQUFBTEFBQUExVUFBQU55QUFBRGhnQUFBNklBQUFPK0FBQUQwUUFBQSswQUFBUUFBQUFFSEFBQUJDOEFBQVJMQUFBRVp3QUFCSG9BQUFTV0FBQUVxUUFBQk1VQUFBVFlBQUFFOUFBQUJSQUFBQVVqQUFBRlB3QUFCVklBQUFWdUFBQUZnUUFBQlowQUFBV3dBQUFGekFBQUJlZ0FBQVg3QUFBR0Z3QUFBR0oxWkhSaEFBQUFXbTFsZEdFQUFBQUFBQUFBSVdoa2JISUFBQUFBQUFBQUFHMWthWEpoY0hCc0FBQUFBQUFBQUFBQUFBQUFMV2xzYzNRQUFBQWxxWFJ2YndBQUFCMWtZWFJoQUFBQUFRQUFBQUJNWVhabU5UVXVNek11TVRBd1wiO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDI1LzA2LzIwMTkuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgVkFTVENsaWVudCwgVkFTVFRyYWNrZXIgfSBmcm9tICd1dGlscy92YXN0LWNsaWVudCc7XHJcbmltcG9ydCBBZHNFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL2Fkcy92YXN0L0xpc3RlbmVyXCI7XHJcbmltcG9ydCB7VEVNUF9WSURFT19VUkx9IGZyb20gXCJhcGkvYWRzL3V0aWxzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBTVEFURV9BRF9FUlJPUixcclxuICAgIFBST1ZJREVSX0RBU0hcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgQWQgPSBmdW5jdGlvbihlbFZpZGVvLCBwcm92aWRlciwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XHJcbiAgICBjb25zdCBBVVRPUExBWV9OT1RfQUxMT1dFRCA9IFwiYXV0b3BsYXlOb3RBbGxvd2VkXCI7XHJcblxyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgIHN0YXJ0ZWQ6IGZhbHNlLCAvL3BsYXllciBzdGFydGVkXHJcbiAgICAgICAgYWN0aXZlIDogZmFsc2UsIC8vb24gQWRcclxuICAgICAgICBpc1ZpZGVvRW5kZWQgOiBmYWxzZSxcclxuICAgICAgICBsYW5nIDogcGxheWVyQ29uZmlnLmdldExhbmd1YWdlKClcclxuICAgIH07XHJcbiAgICBsZXQgYWRzRXJyb3JPY2N1cnJlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGxpc3RlbmVyID0gbnVsbDtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gXCJcIjtcclxuICAgIGxldCBlbEFkVmlkZW8gPSBudWxsO1xyXG4gICAgbGV0IHRleHRWaWV3ID0gXCJcIjtcclxuICAgIGxldCBhZEJ1dHRvbiA9IFwiXCI7XHJcblxyXG4gICAgbGV0IGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlLCBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcclxuICAgIGxldCBicm93c2VyID0gcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKTtcclxuICAgIGxldCBpc01vYmlsZSA9IGJyb3dzZXIub3MgPT09IFwiQW5kcm9pZFwiIHx8IGJyb3dzZXIub3MgPT09IFwiaU9TXCI7XHJcblxyXG4gICAgY29uc3QgY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdvcC1hZHMnKTtcclxuICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ29wLWFkcycpO1xyXG4gICAgICAgIHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKS5hcHBlbmQoYWRDb250YWluZXIpO1xyXG5cclxuICAgICAgICBlbEFkVmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xyXG4gICAgICAgIGVsQWRWaWRlby5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJ3RydWUnKTtcclxuICAgICAgICBlbEFkVmlkZW8uc2V0QXR0cmlidXRlKCd0aXRsZScsICdBZHZlcnRpc2VtZW50Jyk7XHJcbiAgICAgICAgZWxBZFZpZGVvLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3AtYWRzLXZhc3QtdmlkZW8nKTtcclxuXHJcbiAgICAgICAgYWRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBhZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ29wLWFkcy1idXR0b24nKTtcclxuXHJcbiAgICAgICAgdGV4dFZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0ZXh0Vmlldy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ29wLWFkcy10ZXh0dmlldycpO1xyXG5cclxuICAgICAgICBhZEJ1dHRvbi5hcHBlbmQodGV4dFZpZXcpO1xyXG4gICAgICAgIGFkQ29udGFpbmVyLmFwcGVuZChlbEFkVmlkZW8pO1xyXG4gICAgICAgIGFkQ29udGFpbmVyLmFwcGVuZChhZEJ1dHRvbik7XHJcblxyXG4gICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcclxuICAgIH07XHJcblxyXG4gICAgY29udGFpbmVyID0gY3JlYXRlQWRDb250YWluZXIoKTtcclxuXHJcbiAgICBsZXQgdmFzdENsaWVudCA9IG5ldyBWQVNUQ2xpZW50KCk7XHJcbiAgICBsZXQgdmFzdFRyYWNrZXIgPSBudWxsO1xyXG4gICAgbGV0IGFkID0gbnVsbDtcclxuXHJcblxyXG4gICAgY29uc3QgT25BZEVycm9yID0gZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICBhZHNFcnJvck9jY3VycmVkID0gdHJ1ZTtcclxuICAgICAgICBlbEFkVmlkZW8uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfRVJST1IsIHtjb2RlIDogZXJyb3IuY29kZSwgbWVzc2FnZSA6IGVycm9yLm1lc3NhZ2V9KTtcclxuICAgICAgICBzcGVjLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNwZWMuc3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgcHJvdmlkZXIucGxheSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBpbml0UmVxdWVzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXN0Q2xpZW50LmdldChhZFRhZ1VybCkgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggdGhlIHBhcnNlZCBWQVNUIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBpbml0UmVxdWVzdCgpXCIpO1xyXG4gICAgICAgICAgICBhZCA9IHJlcy5hZHNbMF07XHJcbiAgICAgICAgICAgIGlmKCFhZCl7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB7Y29kZSA6IDQwMSwgbWVzc2FnZSA6IFwiRmlsZSBub3QgZm91bmQuIFVuYWJsZSB0byBmaW5kIExpbmVhci9NZWRpYUZpbGUgZnJvbSBVUkkuXCJ9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhc3RUcmFja2VyID0gbmV3IFZBU1RUcmFja2VyKHZhc3RDbGllbnQsIGFkLCBhZC5jcmVhdGl2ZXNbMF0pO1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGNyZWF0ZWQgYWQgdHJhY2tlci5cIik7XHJcblxyXG4gICAgICAgICAgICBsaXN0ZW5lciA9IEFkc0V2ZW50c0xpc3RlbmVyKGVsQWRWaWRlbywgdmFzdFRyYWNrZXIsIHByb3ZpZGVyLCBzcGVjLCBhZEJ1dHRvbiwgdGV4dFZpZXcsIE9uQWRFcnJvcik7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmlkZW9VUkwgPSAgXCJcIjtcclxuICAgICAgICAgICAgaWYoYWQuY3JlYXRpdmVzICYmIGFkLmNyZWF0aXZlcy5sZW5ndGggPiAwICYmIGFkLmNyZWF0aXZlc1swXS5tZWRpYUZpbGVzICYmIGFkLmNyZWF0aXZlc1swXS5tZWRpYUZpbGVzLmxlbmd0aCA+IDAgJiYgYWQuY3JlYXRpdmVzWzBdLm1lZGlhRmlsZXNbMF0uZmlsZVVSTCl7XHJcbiAgICAgICAgICAgICAgICB2aWRlb1VSTCA9IGFkLmNyZWF0aXZlc1swXS5tZWRpYUZpbGVzWzBdLmZpbGVVUkw7XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbWVkaWEgdXJsIDogXCIsIHZpZGVvVVJMKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbEFkVmlkZW8uc3JjID0gdmlkZW9VUkw7XHJcblxyXG4gICAgICAgICAgICAvL2tlZXAgdm9sdW1lIGV2ZW4gaWYgcGxheWxpc3QgaXRlbSBjaGFuZ2VzLlxyXG4gICAgICAgICAgICBlbEFkVmlkZW8udm9sdW1lID0gZWxWaWRlby52b2x1bWU7XHJcbiAgICAgICAgICAgIGVsQWRWaWRlby5tdXRlZCA9IGVsVmlkZW8ubXV0ZWQ7XHJcblxyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgT25BZEVycm9yKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgY29uc3QgY2hlY2tBdXRvcGxheVN1cHBvcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkgXCIpO1xyXG5cclxuICAgICAgICBsZXQgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xyXG4gICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpO1xyXG4gICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnNyYyA9IFRFTVBfVklERU9fVVJMO1xyXG4gICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLmxvYWQoKTtcclxuXHJcblxyXG4gICAgICAgIGVsQWRWaWRlby5sb2FkKCk7ICAgLy9mb3IgaW9zIFVzZXIgSW50ZXJhY3Rpb24gcHJvYmxlbVxyXG4gICAgICAgIC8vRGFzaCBoYXMgYWxyZWFkeSBsb2FkZWQgd2hlbiB0cmlnZ2VyZWQgcHJvdmlkZXIucGxheSgpIGFsd2F5cy5cclxuICAgICAgICBpZihpc01vYmlsZSAmJiBwcm92aWRlci5nZXROYW1lKCkgIT09IFBST1ZJREVSX0RBU0ggKXtcclxuICAgICAgICAgICAgLy9NYWluIHZpZGVvIHNldHMgdXNlciBnZXN0dXJlIHdoZW4gdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8gdHJpZ2dlcmVkIGNoZWNraW5nLlxyXG4gICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2xlYXJBbmRSZXBvcnQgPSBmdW5jdGlvbihfYXV0b3BsYXlBbGxvd2VkLCBfYXV0b3BsYXlSZXF1aXJlc011dGVkKXtcclxuICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gX2F1dG9wbGF5QWxsb3dlZDtcclxuICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gX2F1dG9wbGF5UmVxdWlyZXNNdXRlZDtcclxuICAgICAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucmVtb3ZlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XHJcbiAgICAgICAgICAgIGlmKCF0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5KXtcclxuICAgICAgICAgICAgICAgIC8vSSBjYW4ndCByZW1lbWJlciB0aGlzIGNhc2UuLi5cclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiAhdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucGxheVwiKTtcclxuICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGxheVByb21pc2UgPSB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGF1dG8gcGxheSBhbGxvd2VkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCB1bm11dGVkIGF1dG9wbGF5IHdvcmtzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydCh0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBhdXRvIHBsYXkgZmFpbGVkXCIsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydChmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogcHJvbWlzZSBub3Qgc3VwcG9ydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvL01heWJlIHRoaXMgaXMgSUUxMS4uLi5cclxuICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydCh0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGF0LmlzQWN0aXZlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmFjdGl2ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnN0YXJ0ZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhcnRlZDtcclxuICAgIH07XHJcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5zdGFydGVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGVsQWRWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tNYWluQ29udGVudExvYWRlZCA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vd2FpdCBmb3IgbWFpbiBjb250ZW50cyBtZXRhIGxvYWRlZC5cclxuICAgICAgICAgICAgICAgICAgICAvL2hhdmUgdG8gdHJpZ2dlciBDT05URU5UX01FVEEgZmlyc3QuIG5leHQgdHJpZ2dlciBBRF9DSEFOR0VELlxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdENvbnRyb2xVSSBmaXJzdCAtPiAgaW5pdCBhZCBVSVxyXG4gICAgICAgICAgICAgICAgICAgIC8vTWF5YmUgZ29vZ2xlIGltYSB3YWl0cyBjb250ZW50IGxvYWRlZCBpbnRlcm5hbC5cclxuICAgICAgICAgICAgICAgICAgICBpZihwcm92aWRlci5tZXRhTG9hZGVkKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbWFpbiBjb250ZW50cyBtZXRhIGxvYWRlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSAmJiAhYXV0b3BsYXlBbGxvd2VkKSApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBhdXRvcGxheUFsbG93ZWQgOiBmYWxzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKEFVVE9QTEFZX05PVF9BTExPV0VEKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja01haW5Db250ZW50TG9hZGVkLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY2hlY2tNYWluQ29udGVudExvYWRlZCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XHJcbiAgICAgICAgZWxBZFZpZGVvLnBhdXNlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vRW5kIE9mIE1haW4gQ29udGVudHMuXHJcbiAgICB0aGF0LnZpZGVvRW5kZWRDYWxsYmFjayA9IChjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaykgPT4ge1xyXG5cclxuICAgICAgICBjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaygpO1xyXG4gICAgICAgIC8vY2hlY2sgdHJ1ZSB3aGVuIG1haW4gY29udGVudHMgZW5kZWQuXHJcbiAgICAgICAgc3BlYy5pc1ZpZGVvRW5kZWQgPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgICBpZihsaXN0ZW5lcil7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgbGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXN0VHJhY2tlciA9IG51bGw7XHJcbiAgICAgICAgdmFzdENsaWVudCA9IG51bGw7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmUoKTtcclxuXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBZDsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDI2LzA2LzIwMTkuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gICAgU1RBVEVfUExBWUlORyxcclxuICAgIFNUQVRFX0FEX0xPQURFRCxcclxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXHJcbiAgICBTVEFURV9BRF9QQVVTRUQsXHJcbiAgICBTVEFURV9BRF9DT01QTEVURSxcclxuICAgIEFEX0NIQU5HRUQsXHJcbiAgICBBRF9USU1FLFxyXG4gICAgQ09OVEVOVF9WT0xVTUVcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcclxuXHJcbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxBZFZpZGVvLCB2YXN0VHJhY2tlciwgcHJvdmlkZXIsIGFkc1NwZWMsIGFkQnV0dG9uLCB0ZXh0VmlldywgT25BZEVycm9yKXtcclxuICAgIGNvbnN0IGxvd0xldmVsRXZlbnRzID0ge307XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgY29uc3QgTUVESUFGSUxFX1BMQVlCQUNLX0VSUk9SID0gJzQwNSc7XHJcblxyXG4gICAgbGV0ICR0ZXh0VmlldyA9IExBJCh0ZXh0Vmlldyk7XHJcbiAgICBsZXQgJGFkQnV0dG9uID0gTEEkKGFkQnV0dG9uKTtcclxuICAgIGxldCAkZWxBZFZpZGVvID0gTEEkKGVsQWRWaWRlbyk7XHJcblxyXG4gICAgcHJvdmlkZXIub24oQ09OVEVOVF9WT0xVTUUsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZihkYXRhLm11dGUpe1xyXG4gICAgICAgICAgICBlbEFkVmlkZW8ubXV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBlbEFkVmlkZW8ubXV0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxBZFZpZGVvLnZvbHVtZSA9IGRhdGEudm9sdW1lLzEwMDtcclxuICAgICAgICB9XHJcbiAgICB9LCB0aGF0KTtcclxuXHJcbiAgICAvL0xpa2UgYSBDT05URU5UX1JFU1VNRV9SRVFVRVNURURcclxuICAgIGNvbnN0IHByb2Nlc3NFbmRPZkFkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBhZHNTcGVjLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAkYWRCdXR0b24uaGlkZSgpO1xyXG5cclxuICAgICAgICBpZihhZHNTcGVjLnN0YXJ0ZWQgJiYgKHByb3ZpZGVyLmdldFBvc2l0aW9uKCkgPT09IDAgfHwgIWFkc1NwZWMuaXNWaWRlb0VuZGVkKSAgKXtcclxuICAgICAgICAgICAgJGVsQWRWaWRlby5oaWRlKCk7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XHJcbiAgICB9O1xyXG4gICAgLy9MaWtlIGEgQ09OVEVOVF9QQVVTRV9SRVFVRVNURURcclxuICAgIGNvbnN0IHByb2Nlc3NTdGFydE9mQWQgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAkZWxBZFZpZGVvLnNob3coKTtcclxuICAgICAgICAkYWRCdXR0b24uc2hvdygpO1xyXG5cclxuICAgIH07XHJcbiAgICBjb25zdCBza2lwQnV0dG9uQ2xpY2tlZCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBpZigkdGV4dFZpZXcuaGFzQ2xhc3MoXCJ2aWRlb0FkVWlBY3Rpb25cIikpe1xyXG4gICAgICAgICAgICB2YXN0VHJhY2tlci5za2lwKCk7XHJcbiAgICAgICAgICAgIGVsQWRWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICBwcm9jZXNzRW5kT2ZBZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGV4dFZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNraXBCdXR0b25DbGlja2VkLCBmYWxzZSk7XHJcblxyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBlcnJvci5cIiwgZWxBZFZpZGVvLmVycm9yKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IGVycm9yLlwiLCBlbEFkVmlkZW8uZXJyb3IpO1xyXG4gICAgICAgIGxldCBlcnJvciA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxBZFZpZGVvLmVycm9yICYmIGVsQWRWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xyXG5cclxuICAgICAgICBpZihjb2RlID09PSAyKSB7XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPSA0MDI7XHJcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBcIlRpbWVvdXQgb2YgTWVkaWFGaWxlIFVSSS5cIjtcclxuICAgICAgICB9ZWxzZSBpZihjb2RlID09PSAzKXtcclxuICAgICAgICAgICAgZXJyb3IuY29kZSA9IDQwNTtcclxuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IFwiUHJvYmxlbSBkaXNwbGF5aW5nIE1lZGlhRmlsZS4gVmlkZW8gcGxheWVyIGZvdW5kIGEgTWVkaWFGaWxlIHdpdGggc3VwcG9ydGVkIHR5cGUgYnV0IGNvdWxkbuKAmXQgZGlzcGxheSBpdC4gTWVkaWFGaWxlIG1heSBpbmNsdWRlOiB1bnN1cHBvcnRlZCBjb2RlY3MsIGRpZmZlcmVudCBNSU1FIHR5cGUgdGhhbiBNZWRpYUZpbGVAdHlwZSwgdW5zdXBwb3J0ZWQgZGVsaXZlcnkgbWV0aG9kLCBldGMuXCI7XHJcbiAgICAgICAgfWVsc2UgaWYoY29kZSA9PT0gNCl7XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPSA0MDM7XHJcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBcIkNvdWxkbuKAmXQgZmluZCBNZWRpYUZpbGUgdGhhdCBpcyBzdXBwb3J0ZWQgYnkgdGhpcyB2aWRlbyBwbGF5ZXIsIGJhc2VkIG9uIHRoZSBhdHRyaWJ1dGVzIG9mIHRoZSBNZWRpYUZpbGUgZWxlbWVudC5cIjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZXJyb3IuY29kZSA9IDQwMDtcclxuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IFwiR2VuZXJhbCBMaW5lYXIgZXJyb3IuIFZpZGVvIHBsYXllciBpcyB1bmFibGUgdG8gZGlzcGxheSB0aGUgTGluZWFyIEFkLlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXN0VHJhY2tlci5lcnJvcldpdGhDb2RlKGVycm9yLmNvZGUpO1xyXG4gICAgICAgIE9uQWRFcnJvcihNRURJQUZJTEVfUExBWUJBQ0tfRVJST1IpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5jYW5wbGF5ID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMuZW5kZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhc3RUcmFja2VyLmNvbXBsZXRlKCk7XHJcblxyXG4gICAgICAgIHByb2Nlc3NFbmRPZkFkKCk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMuY2xpY2sgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgdmFzdFRyYWNrZXIuY2xpY2soKTtcclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXN0VHJhY2tlci5zZXRQYXVzZWQoZmFsc2UpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXN0VHJhY2tlci5zZXRQYXVzZWQodHJ1ZSk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXN0VHJhY2tlci5zZXRQcm9ncmVzcyhldmVudC50YXJnZXQuY3VycmVudFRpbWUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfVElNRSwge1xyXG4gICAgICAgICAgICBkdXJhdGlvbiA6IGVsQWRWaWRlby5kdXJhdGlvbixcclxuICAgICAgICAgICAgcG9zaXRpb24gOiBlbEFkVmlkZW8uY3VycmVudFRpbWVcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50cy52b2x1bWVjaGFuZ2UgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogQWQgVmlkZW8gVm9sdW1lY2hhbmdlLlwiKTtcclxuICAgICAgICB2YXN0VHJhY2tlci5zZXRNdXRlZChldmVudC50YXJnZXQubXV0ZWQpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBBZCBDT05URU5UIExPQURFRCAuXCIpO1xyXG5cclxuICAgICAgICAvL0ZsYXNoIHBsYXkgaXMgdmVyeSBmYXN0Li4uXHJcbiAgICAgICAgaWYoU1RBVEVfUExBWUlORyA9PT0gcHJvdmlkZXIuZ2V0U3RhdGUoKSl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXN0VHJhY2tlci50cmFja0ltcHJlc3Npb24oKTtcclxuXHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9MT0FERUQsIHtyZW1haW5pbmcgOiBlbEFkVmlkZW8uZHVyYXRpb24sIGlzTGluZWFyIDogdHJ1ZX0pO1xyXG4gICAgICAgIGVsQWRWaWRlby5wbGF5KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhc3RUcmFja2VyLm9uKCdza2lwJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIHNraXAgdHJhY2tpbmcgVVJMcyBoYXZlIGJlZW4gY2FsbGVkXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogc2tpcHBlZFwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhc3RUcmFja2VyLm9uKCdtdXRlJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIG11dGUgdHJhY2tpbmcgVVJMcyBoYXZlIGJlZW4gY2FsbGVkXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogbXV0ZWRcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXN0VHJhY2tlci5vbigndW5tdXRlJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIHVubXV0ZSB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiB1bm11dGVkXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFzdFRyYWNrZXIub24oJ3Jlc3VtZScsICgpID0+IHtcclxuICAgICAgICAvLyByZXN1bWUgdHJhY2tpbmcgVVJMcyBoYXZlIGJlZW4gY2FsbGVkXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogdmFzdFRyYWNrZXIgcmVzdW1lZC5cIik7XHJcblxyXG4gICAgICAgIC8vcHJldmVudCB0byBzZXQgU1RBVEVfQURfUExBWUlORyB3aGVuIGZpcnN0IHBsYXkuXHJcbiAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkKXtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG4gICAgdmFzdFRyYWNrZXIub24oJ3BhdXNlJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIHBhdXNlIHRyYWNraW5nIFVSTHMgaGF2ZSBiZWVuIGNhbGxlZFxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IHZhc3RUcmFja2VyIHBhdXNlZC5cIik7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUEFVU0VEKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhc3RUcmFja2VyLm9uKCdjbGlja3Rocm91Z2gnLCB1cmwgPT4ge1xyXG4gICAgICAgIC8vIE9wZW4gdGhlIHJlc29sdmVkIGNsaWNrVGhyb3VnaCB1cmxcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBjbGlja3Rocm91Z2ggOlwiLCB1cmwpO1xyXG4gICAgICAgIC8vZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcclxuICAgICAgICB3aW5kb3cub3Blbih1cmwsICdfYmxhbmsnKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXN0VHJhY2tlci5vbignc2tpcC1jb3VudGRvd24nLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGlmKGRhdGEgPT09IDApe1xyXG4gICAgICAgICAgICBpZihhZHNTcGVjLmxhbmcgPT09IFwia29cIil7XHJcbiAgICAgICAgICAgICAgICAkdGV4dFZpZXcuaHRtbChcIuq0keqzoCDqsbTrhIjrm7DquLA8aSBjbGFzcz0nb3AtY29uIG9wLWFycm93LXJpZ2h0IGJ0bi1yaWdodCc+PC9pPlwiKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkdGV4dFZpZXcuaHRtbChcIkFkIFNraXA8aSBjbGFzcz0nb3AtY29uIG9wLWFycm93LXJpZ2h0IGJ0bi1yaWdodCc+PC9pPlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkdGV4dFZpZXcuYWRkQ2xhc3MoXCJ2aWRlb0FkVWlBY3Rpb25cIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGFkc1NwZWMubGFuZyA9PT0gXCJrb1wiKXtcclxuICAgICAgICAgICAgICAgICR0ZXh0Vmlldy5odG1sKChwYXJzZUludChkYXRhKSsxKStcIuy0iCDtm4Tsl5Ag7J20IOq0keqzoOulvCDqsbTrhIjrm7gg7IiYIOyeiOyKteuLiOuLpC5cIik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJHRleHRWaWV3Lmh0bWwoXCJZb3UgY2FuIHNraXAgdGhpcyBhZCBpbiBcIisocGFyc2VJbnQoZGF0YSkrMSkpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdmFzdFRyYWNrZXIub24oJ3Jld2luZCcsICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiByZXdpbmRcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXN0VHJhY2tlci5vbignc3RhcnQnLCAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogc3RhcnRlZFwiKTtcclxuXHJcbiAgICAgICAgYWRzU3BlYy5zdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICBhZHNTcGVjLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgcHJvY2Vzc1N0YXJ0T2ZBZCgpO1xyXG5cclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEFEX0NIQU5HRUQsIHtpc0xpbmVhciA6IHRydWV9KTtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QTEFZSU5HKTtcclxuICAgIH0pO1xyXG4gICAgdmFzdFRyYWNrZXIub24oJ2ZpcnN0UXVhcnRpbGUnLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gZmlyc3RRdWFydGlsZSB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBmaXJzdFF1YXJ0aWxlXCIpO1xyXG4gICAgfSk7XHJcbiAgICB2YXN0VHJhY2tlci5vbignbWlkcG9pbnQnLCAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogbWlkcG9pbnRcIik7XHJcbiAgICB9KTtcclxuICAgIHZhc3RUcmFja2VyLm9uKCd0aGlyZFF1YXJ0aWxlJywgKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IHRoaXJkUXVhcnRpbGVcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXN0VHJhY2tlci5vbignY3JlYXRpdmVWaWV3JywgKCkgPT4ge1xyXG4gICAgICAgIC8vIGltcHJlc3Npb24gdHJhY2tpbmcgVVJMcyBoYXZlIGJlZW4gY2FsbGVkXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogY3JlYXRpdmVWaWV3XCIpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XHJcbiAgICAgICAgZWxBZFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgICAgICBlbEFkVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcclxuICAgICAgICB0ZXh0Vmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2tpcEJ1dHRvbkNsaWNrZWQsIGZhbHNlKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xyXG4gICAgICAgICAgICBlbEFkVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTIuLlxyXG4gKi9cclxuaW1wb3J0IHtFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnRPck1zZSkge1xyXG4gICAgaWYoXy5pc0VsZW1lbnQoZWxlbWVudE9yTXNlKSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZTtcclxuICAgIH1cclxuICAgIGlmKGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KCk7XHJcbiAgICB9ZWxzZSBpZihlbGVtZW50T3JNc2UubWVkaWEpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2UubWVkaWE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUxpdmUgPSBmdW5jdGlvbihtc2UpIHtcclxuICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxyXG5cclxuICAgIGlmKG1zZSAmJiBtc2UuaXNEeW5hbWljKXtcclxuICAgICAgICByZXR1cm4gbXNlLmlzRHluYW1pYygpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGVycm9yVHJpZ2dlciA9IGZ1bmN0aW9uKGVycm9yLCBwcm92aWRlcil7XHJcbiAgICBpZihwcm92aWRlcil7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xyXG4gICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IgKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcGlja0N1cnJlbnRTb3VyY2UgPSAoc291cmNlcywgY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKSA9PiB7XHJcbiAgICBsZXQgc291cmNlSW5kZXggPSBNYXRoLm1heCgwLCBjdXJyZW50U291cmNlKTtcclxuICAgIGNvbnN0IGxhYmVsID1cIlwiO1xyXG4gICAgaWYgKHNvdXJjZXMpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgc291cmNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSA9PT0gaSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzb3VyY2VJbmRleDtcclxufTsiLCIvKkNvcHlyaWdodCAoYykgMjAxMyBPbGl2aWVyIFBvaXRyZXkgPHJzQGRhaWx5bW90aW9uLmNvbT5cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkXHJcbiB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLiovXHJcbmNsYXNzIEFke2NvbnN0cnVjdG9yKCl7dGhpcy5pZD1udWxsLHRoaXMuc2VxdWVuY2U9bnVsbCx0aGlzLnN5c3RlbT1udWxsLHRoaXMudGl0bGU9bnVsbCx0aGlzLmRlc2NyaXB0aW9uPW51bGwsdGhpcy5hZHZlcnRpc2VyPW51bGwsdGhpcy5wcmljaW5nPW51bGwsdGhpcy5zdXJ2ZXk9bnVsbCx0aGlzLmVycm9yVVJMVGVtcGxhdGVzPVtdLHRoaXMuaW1wcmVzc2lvblVSTFRlbXBsYXRlcz1bXSx0aGlzLmNyZWF0aXZlcz1bXSx0aGlzLmV4dGVuc2lvbnM9W119fWNsYXNzIEFkRXh0ZW5zaW9ue2NvbnN0cnVjdG9yKCl7dGhpcy5hdHRyaWJ1dGVzPXt9LHRoaXMuY2hpbGRyZW49W119fWNsYXNzIEFkRXh0ZW5zaW9uQ2hpbGR7Y29uc3RydWN0b3IoKXt0aGlzLm5hbWU9bnVsbCx0aGlzLnZhbHVlPW51bGwsdGhpcy5hdHRyaWJ1dGVzPXt9fX1jbGFzcyBDb21wYW5pb25BZHtjb25zdHJ1Y3Rvcigpe3RoaXMuaWQ9bnVsbCx0aGlzLndpZHRoPTAsdGhpcy5oZWlnaHQ9MCx0aGlzLnR5cGU9bnVsbCx0aGlzLnN0YXRpY1Jlc291cmNlPW51bGwsdGhpcy5odG1sUmVzb3VyY2U9bnVsbCx0aGlzLmlmcmFtZVJlc291cmNlPW51bGwsdGhpcy5hbHRUZXh0PW51bGwsdGhpcy5jb21wYW5pb25DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1udWxsLHRoaXMuY29tcGFuaW9uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz1bXSx0aGlzLnRyYWNraW5nRXZlbnRzPXt9fX1jbGFzcyBDcmVhdGl2ZXtjb25zdHJ1Y3RvcihlPXt9KXt0aGlzLmlkPWUuaWR8fG51bGwsdGhpcy5hZElkPWUuYWRJZHx8bnVsbCx0aGlzLnNlcXVlbmNlPWUuc2VxdWVuY2V8fG51bGwsdGhpcy5hcGlGcmFtZXdvcms9ZS5hcGlGcmFtZXdvcmt8fG51bGwsdGhpcy50cmFja2luZ0V2ZW50cz17fX19Y2xhc3MgQ3JlYXRpdmVDb21wYW5pb24gZXh0ZW5kcyBDcmVhdGl2ZXtjb25zdHJ1Y3RvcihlPXt9KXtzdXBlcihlKSx0aGlzLnR5cGU9XCJjb21wYW5pb25cIix0aGlzLnZhcmlhdGlvbnM9W119fWZ1bmN0aW9uIHRyYWNrKGUsdCl7cmVzb2x2ZVVSTFRlbXBsYXRlcyhlLHQpLmZvckVhY2goZT0+e2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJm51bGwhPT13aW5kb3cpeyhuZXcgSW1hZ2UpLnNyYz1lfX0pfWZ1bmN0aW9uIHJlc29sdmVVUkxUZW1wbGF0ZXMoZSx0PXt9KXtjb25zdCByPVtdO3QuQVNTRVRVUkkmJih0LkFTU0VUVVJJPWVuY29kZVVSSUNvbXBvbmVudFJGQzM5ODYodC5BU1NFVFVSSSkpLHQuQ09OVEVOVFBMQVlIRUFEJiYodC5DT05URU5UUExBWUhFQUQ9ZW5jb2RlVVJJQ29tcG9uZW50UkZDMzk4Nih0LkNPTlRFTlRQTEFZSEVBRCkpLHQuRVJST1JDT0RFJiYhL15bMC05XXszfSQvLnRlc3QodC5FUlJPUkNPREUpJiYodC5FUlJPUkNPREU9OTAwKSx0LkNBQ0hFQlVTVElORz1sZWZ0cGFkKE1hdGgucm91bmQoMWU4Kk1hdGgucmFuZG9tKCkpLnRvU3RyaW5nKCkpLHQuVElNRVNUQU1QPWVuY29kZVVSSUNvbXBvbmVudFJGQzM5ODYoKG5ldyBEYXRlKS50b0lTT1N0cmluZygpKSx0LlJBTkRPTT10LnJhbmRvbT10LkNBQ0hFQlVTVElORztmb3IobGV0IGkgaW4gZSl7bGV0IHM9ZVtpXTtpZihcInN0cmluZ1wiPT10eXBlb2Ygcyl7Zm9yKGxldCBlIGluIHQpe2NvbnN0IHI9dFtlXSxpPWBbJHtlfV1gLG49YCUlJHtlfSUlYDtzPShzPXMucmVwbGFjZShpLHIpKS5yZXBsYWNlKG4scil9ci5wdXNoKHMpfX1yZXR1cm4gcn1mdW5jdGlvbiBlbmNvZGVVUklDb21wb25lbnRSRkMzOTg2KGUpe3JldHVybiBlbmNvZGVVUklDb21wb25lbnQoZSkucmVwbGFjZSgvWyEnKCkqXS9nLGU9PmAlJHtlLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpfWApfWZ1bmN0aW9uIGxlZnRwYWQoZSl7cmV0dXJuIGUubGVuZ3RoPDg/cmFuZ2UoMCw4LWUubGVuZ3RoLCExKS5tYXAoZT0+XCIwXCIpLmpvaW4oXCJcIikrZTplfWZ1bmN0aW9uIHJhbmdlKGUsdCxyKXtsZXQgaT1bXSxzPWU8dCxuPXI/cz90KzE6dC0xOnQ7Zm9yKGxldCB0PWU7cz90PG46dD5uO3M/dCsrOnQtLSlpLnB1c2godCk7cmV0dXJuIGl9ZnVuY3Rpb24gaXNOdW1lcmljKGUpe3JldHVybiFpc05hTihwYXJzZUZsb2F0KGUpKSYmaXNGaW5pdGUoZSl9ZnVuY3Rpb24gZmxhdHRlbihlKXtyZXR1cm4gZS5yZWR1Y2UoKGUsdCk9PmUuY29uY2F0KEFycmF5LmlzQXJyYXkodCk/ZmxhdHRlbih0KTp0KSxbXSl9Y29uc3QgdXRpbD17dHJhY2s6dHJhY2sscmVzb2x2ZVVSTFRlbXBsYXRlczpyZXNvbHZlVVJMVGVtcGxhdGVzLGVuY29kZVVSSUNvbXBvbmVudFJGQzM5ODY6ZW5jb2RlVVJJQ29tcG9uZW50UkZDMzk4NixsZWZ0cGFkOmxlZnRwYWQscmFuZ2U6cmFuZ2UsaXNOdW1lcmljOmlzTnVtZXJpYyxmbGF0dGVuOmZsYXR0ZW59O2Z1bmN0aW9uIGNoaWxkQnlOYW1lKGUsdCl7Y29uc3Qgcj1lLmNoaWxkTm9kZXM7Zm9yKGxldCBlIGluIHIpe2NvbnN0IGk9cltlXTtpZihpLm5vZGVOYW1lPT09dClyZXR1cm4gaX19ZnVuY3Rpb24gY2hpbGRyZW5CeU5hbWUoZSx0KXtjb25zdCByPVtdLGk9ZS5jaGlsZE5vZGVzO2ZvcihsZXQgZSBpbiBpKXtjb25zdCBzPWlbZV07cy5ub2RlTmFtZT09PXQmJnIucHVzaChzKX1yZXR1cm4gcn1mdW5jdGlvbiByZXNvbHZlVmFzdEFkVGFnVVJJKGUsdCl7aWYoIXQpcmV0dXJuIGU7aWYoMD09PWUuaW5kZXhPZihcIi8vXCIpKXtjb25zdHtwcm90b2NvbDp0fT1sb2NhdGlvbjtyZXR1cm5gJHt0fSR7ZX1gfWlmKC0xPT09ZS5pbmRleE9mKFwiOi8vXCIpKXtyZXR1cm5gJHt0LnNsaWNlKDAsdC5sYXN0SW5kZXhPZihcIi9cIikpfS8ke2V9YH1yZXR1cm4gZX1mdW5jdGlvbiBwYXJzZUJvb2xlYW4oZSl7cmV0dXJuLTEhPT1bXCJ0cnVlXCIsXCJUUlVFXCIsXCIxXCJdLmluZGV4T2YoZSl9ZnVuY3Rpb24gcGFyc2VOb2RlVGV4dChlKXtyZXR1cm4gZSYmKGUudGV4dENvbnRlbnR8fGUudGV4dHx8XCJcIikudHJpbSgpfWZ1bmN0aW9uIGNvcHlOb2RlQXR0cmlidXRlKGUsdCxyKXtjb25zdCBpPXQuZ2V0QXR0cmlidXRlKGUpO2kmJnIuc2V0QXR0cmlidXRlKGUsaSl9ZnVuY3Rpb24gcGFyc2VEdXJhdGlvbihlKXtpZihudWxsPT1lKXJldHVybi0xO2lmKHV0aWwuaXNOdW1lcmljKGUpKXJldHVybiBwYXJzZUludChlKTtjb25zdCB0PWUuc3BsaXQoXCI6XCIpO2lmKDMhPT10Lmxlbmd0aClyZXR1cm4tMTtjb25zdCByPXRbMl0uc3BsaXQoXCIuXCIpO2xldCBpPXBhcnNlSW50KHJbMF0pOzI9PT1yLmxlbmd0aCYmKGkrPXBhcnNlRmxvYXQoYDAuJHtyWzFdfWApKTtjb25zdCBzPXBhcnNlSW50KDYwKnRbMV0pLG49cGFyc2VJbnQoNjAqdFswXSo2MCk7cmV0dXJuIGlzTmFOKG4pfHxpc05hTihzKXx8aXNOYU4oaSl8fHM+MzYwMHx8aT42MD8tMTpuK3MraX1mdW5jdGlvbiBzcGxpdFZBU1QoZSl7Y29uc3QgdD1bXTtsZXQgcj1udWxsO3JldHVybiBlLmZvckVhY2goKGkscyk9PntpZihpLnNlcXVlbmNlJiYoaS5zZXF1ZW5jZT1wYXJzZUludChpLnNlcXVlbmNlLDEwKSksaS5zZXF1ZW5jZT4xKXtjb25zdCB0PWVbcy0xXTtpZih0JiZ0LnNlcXVlbmNlPT09aS5zZXF1ZW5jZS0xKXJldHVybiB2b2lkKHImJnIucHVzaChpKSk7ZGVsZXRlIGkuc2VxdWVuY2V9cj1baV0sdC5wdXNoKHIpfSksdH1mdW5jdGlvbiBtZXJnZVdyYXBwZXJBZERhdGEoZSx0KXtlLmVycm9yVVJMVGVtcGxhdGVzPXQuZXJyb3JVUkxUZW1wbGF0ZXMuY29uY2F0KGUuZXJyb3JVUkxUZW1wbGF0ZXMpLGUuaW1wcmVzc2lvblVSTFRlbXBsYXRlcz10LmltcHJlc3Npb25VUkxUZW1wbGF0ZXMuY29uY2F0KGUuaW1wcmVzc2lvblVSTFRlbXBsYXRlcyksZS5leHRlbnNpb25zPXQuZXh0ZW5zaW9ucy5jb25jYXQoZS5leHRlbnNpb25zKSxlLmNyZWF0aXZlcy5mb3JFYWNoKGU9PntpZih0LnRyYWNraW5nRXZlbnRzJiZ0LnRyYWNraW5nRXZlbnRzW2UudHlwZV0pZm9yKGxldCByIGluIHQudHJhY2tpbmdFdmVudHNbZS50eXBlXSl7Y29uc3QgaT10LnRyYWNraW5nRXZlbnRzW2UudHlwZV1bcl07ZS50cmFja2luZ0V2ZW50c1tyXXx8KGUudHJhY2tpbmdFdmVudHNbcl09W10pLGUudHJhY2tpbmdFdmVudHNbcl09ZS50cmFja2luZ0V2ZW50c1tyXS5jb25jYXQoaSl9fSksdC52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMmJnQudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLmxlbmd0aCYmZS5jcmVhdGl2ZXMuZm9yRWFjaChlPT57XCJsaW5lYXJcIj09PWUudHlwZSYmKGUudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPWUudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLmNvbmNhdCh0LnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcykpfSksdC52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzJiZ0LnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMubGVuZ3RoJiZlLmNyZWF0aXZlcy5mb3JFYWNoKGU9PntcImxpbmVhclwiPT09ZS50eXBlJiYoZS52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzPWUudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcy5jb25jYXQodC52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzKSl9KSx0LnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUmJmUuY3JlYXRpdmVzLmZvckVhY2goZT0+e1wibGluZWFyXCI9PT1lLnR5cGUmJm51bGw9PWUudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSYmKGUudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT10LnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUpfSl9Y29uc3QgcGFyc2VyVXRpbHM9e2NoaWxkQnlOYW1lOmNoaWxkQnlOYW1lLGNoaWxkcmVuQnlOYW1lOmNoaWxkcmVuQnlOYW1lLHJlc29sdmVWYXN0QWRUYWdVUkk6cmVzb2x2ZVZhc3RBZFRhZ1VSSSxwYXJzZUJvb2xlYW46cGFyc2VCb29sZWFuLHBhcnNlTm9kZVRleHQ6cGFyc2VOb2RlVGV4dCxjb3B5Tm9kZUF0dHJpYnV0ZTpjb3B5Tm9kZUF0dHJpYnV0ZSxwYXJzZUR1cmF0aW9uOnBhcnNlRHVyYXRpb24sc3BsaXRWQVNUOnNwbGl0VkFTVCxtZXJnZVdyYXBwZXJBZERhdGE6bWVyZ2VXcmFwcGVyQWREYXRhfTtmdW5jdGlvbiBwYXJzZUNyZWF0aXZlQ29tcGFuaW9uKGUsdCl7Y29uc3Qgcj1uZXcgQ3JlYXRpdmVDb21wYW5pb24odCk7cmV0dXJuIHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJDb21wYW5pb25cIikuZm9yRWFjaChlPT57Y29uc3QgdD1uZXcgQ29tcGFuaW9uQWQ7dC5pZD1lLmdldEF0dHJpYnV0ZShcImlkXCIpfHxudWxsLHQud2lkdGg9ZS5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKSx0LmhlaWdodD1lLmdldEF0dHJpYnV0ZShcImhlaWdodFwiKSx0LmNvbXBhbmlvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9W10scGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIkhUTUxSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fFwidGV4dC9odG1sXCIsdC5odG1sUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJJRnJhbWVSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fDAsdC5pZnJhbWVSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlN0YXRpY1Jlc291cmNlXCIpLmZvckVhY2gocj0+e3QudHlwZT1yLmdldEF0dHJpYnV0ZShcImNyZWF0aXZlVHlwZVwiKXx8MCxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiQWx0VGV4dFwiKS5mb3JFYWNoKGU9Pnt0LmFsdFRleHQ9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pLHQuc3RhdGljUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChyKX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJUcmFja2luZ0V2ZW50c1wiKS5mb3JFYWNoKGU9PntwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiVHJhY2tpbmdcIikuZm9yRWFjaChlPT57Y29uc3Qgcj1lLmdldEF0dHJpYnV0ZShcImV2ZW50XCIpLGk9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKTtyJiZpJiYobnVsbD09dC50cmFja2luZ0V2ZW50c1tyXSYmKHQudHJhY2tpbmdFdmVudHNbcl09W10pLHQudHJhY2tpbmdFdmVudHNbcl0ucHVzaChpKSl9KX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJDb21wYW5pb25DbGlja1RyYWNraW5nXCIpLmZvckVhY2goZT0+e3QuY29tcGFuaW9uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5wdXNoKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSkpfSksdC5jb21wYW5pb25DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJDb21wYW5pb25DbGlja1Rocm91Z2hcIikpLHQuY29tcGFuaW9uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIkNvbXBhbmlvbkNsaWNrVHJhY2tpbmdcIikpLHIudmFyaWF0aW9ucy5wdXNoKHQpfSkscn1jbGFzcyBDcmVhdGl2ZUxpbmVhciBleHRlbmRzIENyZWF0aXZle2NvbnN0cnVjdG9yKGU9e30pe3N1cGVyKGUpLHRoaXMudHlwZT1cImxpbmVhclwiLHRoaXMuZHVyYXRpb249MCx0aGlzLnNraXBEZWxheT1udWxsLHRoaXMubWVkaWFGaWxlcz1bXSx0aGlzLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9bnVsbCx0aGlzLnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz1bXSx0aGlzLnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXM9W10sdGhpcy5hZFBhcmFtZXRlcnM9bnVsbCx0aGlzLmljb25zPVtdfX1jbGFzcyBJY29ue2NvbnN0cnVjdG9yKCl7dGhpcy5wcm9ncmFtPW51bGwsdGhpcy5oZWlnaHQ9MCx0aGlzLndpZHRoPTAsdGhpcy54UG9zaXRpb249MCx0aGlzLnlQb3NpdGlvbj0wLHRoaXMuYXBpRnJhbWV3b3JrPW51bGwsdGhpcy5vZmZzZXQ9bnVsbCx0aGlzLmR1cmF0aW9uPTAsdGhpcy50eXBlPW51bGwsdGhpcy5zdGF0aWNSZXNvdXJjZT1udWxsLHRoaXMuaHRtbFJlc291cmNlPW51bGwsdGhpcy5pZnJhbWVSZXNvdXJjZT1udWxsLHRoaXMuaWNvbkNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPW51bGwsdGhpcy5pY29uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz1bXSx0aGlzLmljb25WaWV3VHJhY2tpbmdVUkxUZW1wbGF0ZT1udWxsfX1jbGFzcyBNZWRpYUZpbGV7Y29uc3RydWN0b3IoKXt0aGlzLmlkPW51bGwsdGhpcy5maWxlVVJMPW51bGwsdGhpcy5kZWxpdmVyeVR5cGU9XCJwcm9ncmVzc2l2ZVwiLHRoaXMubWltZVR5cGU9bnVsbCx0aGlzLmNvZGVjPW51bGwsdGhpcy5iaXRyYXRlPTAsdGhpcy5taW5CaXRyYXRlPTAsdGhpcy5tYXhCaXRyYXRlPTAsdGhpcy53aWR0aD0wLHRoaXMuaGVpZ2h0PTAsdGhpcy5hcGlGcmFtZXdvcms9bnVsbCx0aGlzLnNjYWxhYmxlPW51bGwsdGhpcy5tYWludGFpbkFzcGVjdFJhdGlvPW51bGx9fWZ1bmN0aW9uIHBhcnNlQ3JlYXRpdmVMaW5lYXIoZSx0KXtsZXQgcjtjb25zdCBpPW5ldyBDcmVhdGl2ZUxpbmVhcih0KTtpLmR1cmF0aW9uPXBhcnNlclV0aWxzLnBhcnNlRHVyYXRpb24ocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiRHVyYXRpb25cIikpKTtjb25zdCBzPWUuZ2V0QXR0cmlidXRlKFwic2tpcG9mZnNldFwiKTtpZihudWxsPT1zKWkuc2tpcERlbGF5PW51bGw7ZWxzZSBpZihcIiVcIj09PXMuY2hhckF0KHMubGVuZ3RoLTEpJiYtMSE9PWkuZHVyYXRpb24pe2NvbnN0IGU9cGFyc2VJbnQocywxMCk7aS5za2lwRGVsYXk9aS5kdXJhdGlvbiooZS8xMDApfWVsc2UgaS5za2lwRGVsYXk9cGFyc2VyVXRpbHMucGFyc2VEdXJhdGlvbihzKTtjb25zdCBuPXBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJWaWRlb0NsaWNrc1wiKTtuJiYoaS52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUobixcIkNsaWNrVGhyb3VnaFwiKSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUobixcIkNsaWNrVHJhY2tpbmdcIikuZm9yRWFjaChlPT57aS52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMucHVzaChwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpKX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKG4sXCJDdXN0b21DbGlja1wiKS5mb3JFYWNoKGU9PntpLnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMucHVzaChwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpKX0pKTtjb25zdCBhPXBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJBZFBhcmFtZXRlcnNcIik7YSYmKGkuYWRQYXJhbWV0ZXJzPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoYSkpLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJUcmFja2luZ0V2ZW50c1wiKS5mb3JFYWNoKGU9PntwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiVHJhY2tpbmdcIikuZm9yRWFjaChlPT57bGV0IHQ9ZS5nZXRBdHRyaWJ1dGUoXCJldmVudFwiKTtjb25zdCBzPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSk7aWYodCYmcyl7aWYoXCJwcm9ncmVzc1wiPT09dCl7aWYoIShyPWUuZ2V0QXR0cmlidXRlKFwib2Zmc2V0XCIpKSlyZXR1cm47dD1cIiVcIj09PXIuY2hhckF0KHIubGVuZ3RoLTEpP2Bwcm9ncmVzcy0ke3J9YDpgcHJvZ3Jlc3MtJHtNYXRoLnJvdW5kKHBhcnNlclV0aWxzLnBhcnNlRHVyYXRpb24ocikpfWB9bnVsbD09aS50cmFja2luZ0V2ZW50c1t0XSYmKGkudHJhY2tpbmdFdmVudHNbdF09W10pLGkudHJhY2tpbmdFdmVudHNbdF0ucHVzaChzKX19KX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJNZWRpYUZpbGVzXCIpLmZvckVhY2goZT0+e3BhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJNZWRpYUZpbGVcIikuZm9yRWFjaChlPT57Y29uc3QgdD1uZXcgTWVkaWFGaWxlO3QuaWQ9ZS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSx0LmZpbGVVUkw9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKSx0LmRlbGl2ZXJ5VHlwZT1lLmdldEF0dHJpYnV0ZShcImRlbGl2ZXJ5XCIpLHQuY29kZWM9ZS5nZXRBdHRyaWJ1dGUoXCJjb2RlY1wiKSx0Lm1pbWVUeXBlPWUuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSx0LmFwaUZyYW1ld29yaz1lLmdldEF0dHJpYnV0ZShcImFwaUZyYW1ld29ya1wiKSx0LmJpdHJhdGU9cGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJiaXRyYXRlXCIpfHwwKSx0Lm1pbkJpdHJhdGU9cGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJtaW5CaXRyYXRlXCIpfHwwKSx0Lm1heEJpdHJhdGU9cGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJtYXhCaXRyYXRlXCIpfHwwKSx0LndpZHRoPXBhcnNlSW50KGUuZ2V0QXR0cmlidXRlKFwid2lkdGhcIil8fDApLHQuaGVpZ2h0PXBhcnNlSW50KGUuZ2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIpfHwwKTtsZXQgcj1lLmdldEF0dHJpYnV0ZShcInNjYWxhYmxlXCIpO3ImJlwic3RyaW5nXCI9PXR5cGVvZiByJiYoXCJ0cnVlXCI9PT0ocj1yLnRvTG93ZXJDYXNlKCkpP3Quc2NhbGFibGU9ITA6XCJmYWxzZVwiPT09ciYmKHQuc2NhbGFibGU9ITEpKTtsZXQgcz1lLmdldEF0dHJpYnV0ZShcIm1haW50YWluQXNwZWN0UmF0aW9cIik7cyYmXCJzdHJpbmdcIj09dHlwZW9mIHMmJihcInRydWVcIj09PShzPXMudG9Mb3dlckNhc2UoKSk/dC5tYWludGFpbkFzcGVjdFJhdGlvPSEwOlwiZmFsc2VcIj09PXMmJih0Lm1haW50YWluQXNwZWN0UmF0aW89ITEpKSxpLm1lZGlhRmlsZXMucHVzaCh0KX0pfSk7Y29uc3Qgbz1wYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiSWNvbnNcIik7cmV0dXJuIG8mJnBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKG8sXCJJY29uXCIpLmZvckVhY2goZT0+e2NvbnN0IHQ9bmV3IEljb247dC5wcm9ncmFtPWUuZ2V0QXR0cmlidXRlKFwicHJvZ3JhbVwiKSx0LmhlaWdodD1wYXJzZUludChlLmdldEF0dHJpYnV0ZShcImhlaWdodFwiKXx8MCksdC53aWR0aD1wYXJzZUludChlLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpfHwwKSx0LnhQb3NpdGlvbj1wYXJzZVhQb3NpdGlvbihlLmdldEF0dHJpYnV0ZShcInhQb3NpdGlvblwiKSksdC55UG9zaXRpb249cGFyc2VZUG9zaXRpb24oZS5nZXRBdHRyaWJ1dGUoXCJ5UG9zaXRpb25cIikpLHQuYXBpRnJhbWV3b3JrPWUuZ2V0QXR0cmlidXRlKFwiYXBpRnJhbWV3b3JrXCIpLHQub2Zmc2V0PXBhcnNlclV0aWxzLnBhcnNlRHVyYXRpb24oZS5nZXRBdHRyaWJ1dGUoXCJvZmZzZXRcIikpLHQuZHVyYXRpb249cGFyc2VyVXRpbHMucGFyc2VEdXJhdGlvbihlLmdldEF0dHJpYnV0ZShcImR1cmF0aW9uXCIpKSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiSFRNTFJlc291cmNlXCIpLmZvckVhY2goZT0+e3QudHlwZT1lLmdldEF0dHJpYnV0ZShcImNyZWF0aXZlVHlwZVwiKXx8XCJ0ZXh0L2h0bWxcIix0Lmh0bWxSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIklGcmFtZVJlc291cmNlXCIpLmZvckVhY2goZT0+e3QudHlwZT1lLmdldEF0dHJpYnV0ZShcImNyZWF0aXZlVHlwZVwiKXx8MCx0LmlmcmFtZVJlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiU3RhdGljUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHwwLHQuc3RhdGljUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pO2NvbnN0IHI9cGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIkljb25DbGlja3NcIik7ciYmKHQuaWNvbkNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUocixcIkljb25DbGlja1Rocm91Z2hcIikpLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKHIsXCJJY29uQ2xpY2tUcmFja2luZ1wiKS5mb3JFYWNoKGU9Pnt0Lmljb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLnB1c2gocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKSl9KSksdC5pY29uVmlld1RyYWNraW5nVVJMVGVtcGxhdGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiSWNvblZpZXdUcmFja2luZ1wiKSksaS5pY29ucy5wdXNoKHQpfSksaX1mdW5jdGlvbiBwYXJzZVhQb3NpdGlvbihlKXtyZXR1cm4tMSE9PVtcImxlZnRcIixcInJpZ2h0XCJdLmluZGV4T2YoZSk/ZTpwYXJzZUludChlfHwwKX1mdW5jdGlvbiBwYXJzZVlQb3NpdGlvbihlKXtyZXR1cm4tMSE9PVtcInRvcFwiLFwiYm90dG9tXCJdLmluZGV4T2YoZSk/ZTpwYXJzZUludChlfHwwKX1jbGFzcyBDcmVhdGl2ZU5vbkxpbmVhciBleHRlbmRzIENyZWF0aXZle2NvbnN0cnVjdG9yKGU9e30pe3N1cGVyKGUpLHRoaXMudHlwZT1cIm5vbmxpbmVhclwiLHRoaXMudmFyaWF0aW9ucz1bXX19Y2xhc3MgTm9uTGluZWFyQWR7Y29uc3RydWN0b3IoKXt0aGlzLmlkPW51bGwsdGhpcy53aWR0aD0wLHRoaXMuaGVpZ2h0PTAsdGhpcy5leHBhbmRlZFdpZHRoPTAsdGhpcy5leHBhbmRlZEhlaWdodD0wLHRoaXMuc2NhbGFibGU9ITAsdGhpcy5tYWludGFpbkFzcGVjdFJhdGlvPSEwLHRoaXMubWluU3VnZ2VzdGVkRHVyYXRpb249MCx0aGlzLmFwaUZyYW1ld29yaz1cInN0YXRpY1wiLHRoaXMudHlwZT1udWxsLHRoaXMuc3RhdGljUmVzb3VyY2U9bnVsbCx0aGlzLmh0bWxSZXNvdXJjZT1udWxsLHRoaXMuaWZyYW1lUmVzb3VyY2U9bnVsbCx0aGlzLm5vbmxpbmVhckNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPW51bGwsdGhpcy5ub25saW5lYXJDbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPVtdLHRoaXMuYWRQYXJhbWV0ZXJzPW51bGx9fWZ1bmN0aW9uIHBhcnNlQ3JlYXRpdmVOb25MaW5lYXIoZSx0KXtjb25zdCByPW5ldyBDcmVhdGl2ZU5vbkxpbmVhcih0KTtyZXR1cm4gcGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlRyYWNraW5nRXZlbnRzXCIpLmZvckVhY2goZT0+e2xldCB0LGk7cGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlRyYWNraW5nXCIpLmZvckVhY2goZT0+e3Q9ZS5nZXRBdHRyaWJ1dGUoXCJldmVudFwiKSxpPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSksdCYmaSYmKG51bGw9PXIudHJhY2tpbmdFdmVudHNbdF0mJihyLnRyYWNraW5nRXZlbnRzW3RdPVtdKSxyLnRyYWNraW5nRXZlbnRzW3RdLnB1c2goaSkpfSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiTm9uTGluZWFyXCIpLmZvckVhY2goZT0+e2NvbnN0IHQ9bmV3IE5vbkxpbmVhckFkO3QuaWQ9ZS5nZXRBdHRyaWJ1dGUoXCJpZFwiKXx8bnVsbCx0LndpZHRoPWUuZ2V0QXR0cmlidXRlKFwid2lkdGhcIiksdC5oZWlnaHQ9ZS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiksdC5leHBhbmRlZFdpZHRoPWUuZ2V0QXR0cmlidXRlKFwiZXhwYW5kZWRXaWR0aFwiKSx0LmV4cGFuZGVkSGVpZ2h0PWUuZ2V0QXR0cmlidXRlKFwiZXhwYW5kZWRIZWlnaHRcIiksdC5zY2FsYWJsZT1wYXJzZXJVdGlscy5wYXJzZUJvb2xlYW4oZS5nZXRBdHRyaWJ1dGUoXCJzY2FsYWJsZVwiKSksdC5tYWludGFpbkFzcGVjdFJhdGlvPXBhcnNlclV0aWxzLnBhcnNlQm9vbGVhbihlLmdldEF0dHJpYnV0ZShcIm1haW50YWluQXNwZWN0UmF0aW9cIikpLHQubWluU3VnZ2VzdGVkRHVyYXRpb249cGFyc2VyVXRpbHMucGFyc2VEdXJhdGlvbihlLmdldEF0dHJpYnV0ZShcIm1pblN1Z2dlc3RlZER1cmF0aW9uXCIpKSx0LmFwaUZyYW1ld29yaz1lLmdldEF0dHJpYnV0ZShcImFwaUZyYW1ld29ya1wiKSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiSFRNTFJlc291cmNlXCIpLmZvckVhY2goZT0+e3QudHlwZT1lLmdldEF0dHJpYnV0ZShcImNyZWF0aXZlVHlwZVwiKXx8XCJ0ZXh0L2h0bWxcIix0Lmh0bWxSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIklGcmFtZVJlc291cmNlXCIpLmZvckVhY2goZT0+e3QudHlwZT1lLmdldEF0dHJpYnV0ZShcImNyZWF0aXZlVHlwZVwiKXx8MCx0LmlmcmFtZVJlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiU3RhdGljUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHwwLHQuc3RhdGljUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pO2NvbnN0IGk9cGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIkFkUGFyYW1ldGVyc1wiKTtpJiYodC5hZFBhcmFtZXRlcnM9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKSksdC5ub25saW5lYXJDbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJOb25MaW5lYXJDbGlja1Rocm91Z2hcIikpLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJOb25MaW5lYXJDbGlja1RyYWNraW5nXCIpLmZvckVhY2goZT0+e3Qubm9ubGluZWFyQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5wdXNoKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSkpfSksci52YXJpYXRpb25zLnB1c2godCl9KSxyfWZ1bmN0aW9uIHBhcnNlQWQoZSl7Y29uc3QgdD1lLmNoaWxkTm9kZXM7Zm9yKGxldCByIGluIHQpe2NvbnN0IGk9dFtyXTtpZigtMSE9PVtcIldyYXBwZXJcIixcIkluTGluZVwiXS5pbmRleE9mKGkubm9kZU5hbWUpKXtpZihwYXJzZXJVdGlscy5jb3B5Tm9kZUF0dHJpYnV0ZShcImlkXCIsZSxpKSxwYXJzZXJVdGlscy5jb3B5Tm9kZUF0dHJpYnV0ZShcInNlcXVlbmNlXCIsZSxpKSxcIldyYXBwZXJcIj09PWkubm9kZU5hbWUpcmV0dXJuIHBhcnNlV3JhcHBlcihpKTtpZihcIkluTGluZVwiPT09aS5ub2RlTmFtZSlyZXR1cm4gcGFyc2VJbkxpbmUoaSl9fX1mdW5jdGlvbiBwYXJzZUluTGluZShlKXtjb25zdCB0PWUuY2hpbGROb2RlcyxyPW5ldyBBZDtyLmlkPWUuZ2V0QXR0cmlidXRlKFwiaWRcIil8fG51bGwsci5zZXF1ZW5jZT1lLmdldEF0dHJpYnV0ZShcInNlcXVlbmNlXCIpfHxudWxsO2ZvcihsZXQgZSBpbiB0KXtjb25zdCBpPXRbZV07c3dpdGNoKGkubm9kZU5hbWUpe2Nhc2VcIkVycm9yXCI6ci5lcnJvclVSTFRlbXBsYXRlcy5wdXNoKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaSkpO2JyZWFrO2Nhc2VcIkltcHJlc3Npb25cIjpyLmltcHJlc3Npb25VUkxUZW1wbGF0ZXMucHVzaChwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpKTticmVhaztjYXNlXCJDcmVhdGl2ZXNcIjpwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShpLFwiQ3JlYXRpdmVcIikuZm9yRWFjaChlPT57Y29uc3QgdD17aWQ6ZS5nZXRBdHRyaWJ1dGUoXCJpZFwiKXx8bnVsbCxhZElkOnBhcnNlQ3JlYXRpdmVBZElkQXR0cmlidXRlKGUpLHNlcXVlbmNlOmUuZ2V0QXR0cmlidXRlKFwic2VxdWVuY2VcIil8fG51bGwsYXBpRnJhbWV3b3JrOmUuZ2V0QXR0cmlidXRlKFwiYXBpRnJhbWV3b3JrXCIpfHxudWxsfTtmb3IobGV0IGkgaW4gZS5jaGlsZE5vZGVzKXtjb25zdCBzPWUuY2hpbGROb2Rlc1tpXTtzd2l0Y2gocy5ub2RlTmFtZSl7Y2FzZVwiTGluZWFyXCI6bGV0IGU9cGFyc2VDcmVhdGl2ZUxpbmVhcihzLHQpO2UmJnIuY3JlYXRpdmVzLnB1c2goZSk7YnJlYWs7Y2FzZVwiTm9uTGluZWFyQWRzXCI6bGV0IGk9cGFyc2VDcmVhdGl2ZU5vbkxpbmVhcihzLHQpO2kmJnIuY3JlYXRpdmVzLnB1c2goaSk7YnJlYWs7Y2FzZVwiQ29tcGFuaW9uQWRzXCI6bGV0IG49cGFyc2VDcmVhdGl2ZUNvbXBhbmlvbihzLHQpO24mJnIuY3JlYXRpdmVzLnB1c2gobil9fX0pO2JyZWFrO2Nhc2VcIkV4dGVuc2lvbnNcIjpwYXJzZUV4dGVuc2lvbnMoci5leHRlbnNpb25zLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGksXCJFeHRlbnNpb25cIikpO2JyZWFrO2Nhc2VcIkFkU3lzdGVtXCI6ci5zeXN0ZW09e3ZhbHVlOnBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaSksdmVyc2lvbjppLmdldEF0dHJpYnV0ZShcInZlcnNpb25cIil8fG51bGx9O2JyZWFrO2Nhc2VcIkFkVGl0bGVcIjpyLnRpdGxlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaSk7YnJlYWs7Y2FzZVwiRGVzY3JpcHRpb25cIjpyLmRlc2NyaXB0aW9uPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaSk7YnJlYWs7Y2FzZVwiQWR2ZXJ0aXNlclwiOnIuYWR2ZXJ0aXNlcj1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpO2JyZWFrO2Nhc2VcIlByaWNpbmdcIjpyLnByaWNpbmc9e3ZhbHVlOnBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaSksbW9kZWw6aS5nZXRBdHRyaWJ1dGUoXCJtb2RlbFwiKXx8bnVsbCxjdXJyZW5jeTppLmdldEF0dHJpYnV0ZShcImN1cnJlbmN5XCIpfHxudWxsfTticmVhaztjYXNlXCJTdXJ2ZXlcIjpyLnN1cnZleT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpfX1yZXR1cm4gcn1mdW5jdGlvbiBwYXJzZVdyYXBwZXIoZSl7Y29uc3QgdD1wYXJzZUluTGluZShlKTtsZXQgcj1wYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiVkFTVEFkVGFnVVJJXCIpO2lmKHI/dC5uZXh0V3JhcHBlclVSTD1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHIpOihyPXBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJWQVNUQWRUYWdVUkxcIikpJiYodC5uZXh0V3JhcHBlclVSTD1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKHIsXCJVUkxcIikpKSx0LmNyZWF0aXZlcy5mb3JFYWNoKGU9PntpZigtMSE9PVtcImxpbmVhclwiLFwibm9ubGluZWFyXCJdLmluZGV4T2YoZS50eXBlKSl7aWYoZS50cmFja2luZ0V2ZW50cyl7dC50cmFja2luZ0V2ZW50c3x8KHQudHJhY2tpbmdFdmVudHM9e30pLHQudHJhY2tpbmdFdmVudHNbZS50eXBlXXx8KHQudHJhY2tpbmdFdmVudHNbZS50eXBlXT17fSk7Zm9yKGxldCByIGluIGUudHJhY2tpbmdFdmVudHMpe2NvbnN0IGk9ZS50cmFja2luZ0V2ZW50c1tyXTt0LnRyYWNraW5nRXZlbnRzW2UudHlwZV1bcl18fCh0LnRyYWNraW5nRXZlbnRzW2UudHlwZV1bcl09W10pLGkuZm9yRWFjaChpPT57dC50cmFja2luZ0V2ZW50c1tlLnR5cGVdW3JdLnB1c2goaSl9KX19ZS52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMmJih0LnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlc3x8KHQudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPVtdKSxlLnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5mb3JFYWNoKGU9Pnt0LnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5wdXNoKGUpfSkpLGUudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSYmKHQudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1lLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUpLGUudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcyYmKHQudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlc3x8KHQudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcz1bXSksZS52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzLmZvckVhY2goZT0+e3QudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcy5wdXNoKGUpfSkpfX0pLHQubmV4dFdyYXBwZXJVUkwpcmV0dXJuIHR9ZnVuY3Rpb24gcGFyc2VFeHRlbnNpb25zKGUsdCl7dC5mb3JFYWNoKHQ9Pntjb25zdCByPW5ldyBBZEV4dGVuc2lvbixpPXQuYXR0cmlidXRlcyxzPXQuY2hpbGROb2RlcztpZih0LmF0dHJpYnV0ZXMpZm9yKGxldCBlIGluIGkpe2NvbnN0IHQ9aVtlXTt0Lm5vZGVOYW1lJiZ0Lm5vZGVWYWx1ZSYmKHIuYXR0cmlidXRlc1t0Lm5vZGVOYW1lXT10Lm5vZGVWYWx1ZSl9Zm9yKGxldCBlIGluIHMpe2NvbnN0IHQ9c1tlXSxpPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQodCk7aWYoXCIjY29tbWVudFwiIT09dC5ub2RlTmFtZSYmXCJcIiE9PWkpe2NvbnN0IGU9bmV3IEFkRXh0ZW5zaW9uQ2hpbGQ7aWYoZS5uYW1lPXQubm9kZU5hbWUsZS52YWx1ZT1pLHQuYXR0cmlidXRlcyl7Y29uc3Qgcj10LmF0dHJpYnV0ZXM7Zm9yKGxldCB0IGluIHIpe2NvbnN0IGk9clt0XTtlLmF0dHJpYnV0ZXNbaS5ub2RlTmFtZV09aS5ub2RlVmFsdWV9fXIuY2hpbGRyZW4ucHVzaChlKX19ZS5wdXNoKHIpfSl9ZnVuY3Rpb24gcGFyc2VDcmVhdGl2ZUFkSWRBdHRyaWJ1dGUoZSl7cmV0dXJuIGUuZ2V0QXR0cmlidXRlKFwiQWRJRFwiKXx8ZS5nZXRBdHRyaWJ1dGUoXCJhZElEXCIpfHxlLmdldEF0dHJpYnV0ZShcImFkSWRcIil8fG51bGx9dmFyIGRvbWFpbjtmdW5jdGlvbiBFdmVudEhhbmRsZXJzKCl7fWZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpe0V2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyl9ZnVuY3Rpb24gJGdldE1heExpc3RlbmVycyhlKXtyZXR1cm4gdm9pZCAwPT09ZS5fbWF4TGlzdGVuZXJzP0V2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzOmUuX21heExpc3RlbmVyc31mdW5jdGlvbiBlbWl0Tm9uZShlLHQscil7aWYodCllLmNhbGwocik7ZWxzZSBmb3IodmFyIGk9ZS5sZW5ndGgscz1hcnJheUNsb25lKGUsaSksbj0wO248aTsrK24pc1tuXS5jYWxsKHIpfWZ1bmN0aW9uIGVtaXRPbmUoZSx0LHIsaSl7aWYodCllLmNhbGwocixpKTtlbHNlIGZvcih2YXIgcz1lLmxlbmd0aCxuPWFycmF5Q2xvbmUoZSxzKSxhPTA7YTxzOysrYSluW2FdLmNhbGwocixpKX1mdW5jdGlvbiBlbWl0VHdvKGUsdCxyLGkscyl7aWYodCllLmNhbGwocixpLHMpO2Vsc2UgZm9yKHZhciBuPWUubGVuZ3RoLGE9YXJyYXlDbG9uZShlLG4pLG89MDtvPG47KytvKWFbb10uY2FsbChyLGkscyl9ZnVuY3Rpb24gZW1pdFRocmVlKGUsdCxyLGkscyxuKXtpZih0KWUuY2FsbChyLGkscyxuKTtlbHNlIGZvcih2YXIgYT1lLmxlbmd0aCxvPWFycmF5Q2xvbmUoZSxhKSxsPTA7bDxhOysrbClvW2xdLmNhbGwocixpLHMsbil9ZnVuY3Rpb24gZW1pdE1hbnkoZSx0LHIsaSl7aWYodCllLmFwcGx5KHIsaSk7ZWxzZSBmb3IodmFyIHM9ZS5sZW5ndGgsbj1hcnJheUNsb25lKGUscyksYT0wO2E8czsrK2EpblthXS5hcHBseShyLGkpfWZ1bmN0aW9uIF9hZGRMaXN0ZW5lcihlLHQscixpKXt2YXIgcyxuLGE7aWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygcil0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7aWYoKG49ZS5fZXZlbnRzKT8obi5uZXdMaXN0ZW5lciYmKGUuZW1pdChcIm5ld0xpc3RlbmVyXCIsdCxyLmxpc3RlbmVyP3IubGlzdGVuZXI6ciksbj1lLl9ldmVudHMpLGE9blt0XSk6KG49ZS5fZXZlbnRzPW5ldyBFdmVudEhhbmRsZXJzLGUuX2V2ZW50c0NvdW50PTApLGEpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGE/YT1uW3RdPWk/W3IsYV06W2Escl06aT9hLnVuc2hpZnQocik6YS5wdXNoKHIpLCFhLndhcm5lZCYmKHM9JGdldE1heExpc3RlbmVycyhlKSkmJnM+MCYmYS5sZW5ndGg+cyl7YS53YXJuZWQ9ITA7dmFyIG89bmV3IEVycm9yKFwiUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiBcIithLmxlbmd0aCtcIiBcIit0K1wiIGxpc3RlbmVycyBhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXRcIik7by5uYW1lPVwiTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nXCIsby5lbWl0dGVyPWUsby50eXBlPXQsby5jb3VudD1hLmxlbmd0aCxlbWl0V2FybmluZyhvKX19ZWxzZSBhPW5bdF09ciwrK2UuX2V2ZW50c0NvdW50O3JldHVybiBlfWZ1bmN0aW9uIGVtaXRXYXJuaW5nKGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGNvbnNvbGUud2Fybj9jb25zb2xlLndhcm4oZSk6Y29uc29sZS5sb2coZSl9ZnVuY3Rpb24gX29uY2VXcmFwKGUsdCxyKXt2YXIgaT0hMTtmdW5jdGlvbiBzKCl7ZS5yZW1vdmVMaXN0ZW5lcih0LHMpLGl8fChpPSEwLHIuYXBwbHkoZSxhcmd1bWVudHMpKX1yZXR1cm4gcy5saXN0ZW5lcj1yLHN9ZnVuY3Rpb24gbGlzdGVuZXJDb3VudChlKXt2YXIgdD10aGlzLl9ldmVudHM7aWYodCl7dmFyIHI9dFtlXTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiByKXJldHVybiAxO2lmKHIpcmV0dXJuIHIubGVuZ3RofXJldHVybiAwfWZ1bmN0aW9uIHNwbGljZU9uZShlLHQpe2Zvcih2YXIgcj10LGk9cisxLHM9ZS5sZW5ndGg7aTxzO3IrPTEsaSs9MSllW3JdPWVbaV07ZS5wb3AoKX1mdW5jdGlvbiBhcnJheUNsb25lKGUsdCl7Zm9yKHZhciByPW5ldyBBcnJheSh0KTt0LS07KXJbdF09ZVt0XTtyZXR1cm4gcn1mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoZSl7Zm9yKHZhciB0PW5ldyBBcnJheShlLmxlbmd0aCkscj0wO3I8dC5sZW5ndGg7KytyKXRbcl09ZVtyXS5saXN0ZW5lcnx8ZVtyXTtyZXR1cm4gdH1mdW5jdGlvbiB4ZHIoKXtsZXQgZTtyZXR1cm4gd2luZG93LlhEb21haW5SZXF1ZXN0JiYoZT1uZXcgWERvbWFpblJlcXVlc3QpLGV9ZnVuY3Rpb24gc3VwcG9ydGVkKCl7cmV0dXJuISF4ZHIoKX1mdW5jdGlvbiBnZXQoZSx0LHIpe2xldCBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIHdpbmRvdy5BY3RpdmVYT2JqZWN0P25ldyB3aW5kb3cuQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxET01cIik6dm9pZCAwO2lmKCFpKXJldHVybiByKG5ldyBFcnJvcihcIkZsYXNoVVJMSGFuZGxlcjogTWljcm9zb2Z0LlhNTERPTSBmb3JtYXQgbm90IHN1cHBvcnRlZFwiKSk7aS5hc3luYz0hMSxyZXF1ZXN0Lm9wZW4oXCJHRVRcIixlKSxyZXF1ZXN0LnRpbWVvdXQ9dC50aW1lb3V0fHwwLHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzPXQud2l0aENyZWRlbnRpYWxzfHwhMSxyZXF1ZXN0LnNlbmQoKSxyZXF1ZXN0Lm9ucHJvZ3Jlc3M9ZnVuY3Rpb24oKXt9LHJlcXVlc3Qub25sb2FkPWZ1bmN0aW9uKCl7aS5sb2FkWE1MKHJlcXVlc3QucmVzcG9uc2VUZXh0KSxyKG51bGwsaSl9fUV2ZW50SGFuZGxlcnMucHJvdG90eXBlPU9iamVjdC5jcmVhdGUobnVsbCksRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlcj1FdmVudEVtaXR0ZXIsRXZlbnRFbWl0dGVyLnVzaW5nRG9tYWlucz0hMSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLmRvbWFpbj12b2lkIDAsRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzPXZvaWQgMCxFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnM9dm9pZCAwLEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzPTEwLEV2ZW50RW1pdHRlci5pbml0PWZ1bmN0aW9uKCl7dGhpcy5kb21haW49bnVsbCxFdmVudEVtaXR0ZXIudXNpbmdEb21haW5zJiYoIWRvbWFpbi5hY3RpdmV8fHRoaXMgaW5zdGFuY2VvZiBkb21haW4uRG9tYWlufHwodGhpcy5kb21haW49ZG9tYWluLmFjdGl2ZSkpLHRoaXMuX2V2ZW50cyYmdGhpcy5fZXZlbnRzIT09T2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHN8fCh0aGlzLl9ldmVudHM9bmV3IEV2ZW50SGFuZGxlcnMsdGhpcy5fZXZlbnRzQ291bnQ9MCksdGhpcy5fbWF4TGlzdGVuZXJzPXRoaXMuX21heExpc3RlbmVyc3x8dm9pZCAwfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycz1mdW5jdGlvbihlKXtpZihcIm51bWJlclwiIT10eXBlb2YgZXx8ZTwwfHxpc05hTihlKSl0aHJvdyBuZXcgVHlwZUVycm9yKCdcIm5cIiBhcmd1bWVudCBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7cmV0dXJuIHRoaXMuX21heExpc3RlbmVycz1lLHRoaXN9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzPWZ1bmN0aW9uKCl7cmV0dXJuICRnZXRNYXhMaXN0ZW5lcnModGhpcyl9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbihlKXt2YXIgdCxyLGkscyxuLGEsbyxsPVwiZXJyb3JcIj09PWU7aWYoYT10aGlzLl9ldmVudHMpbD1sJiZudWxsPT1hLmVycm9yO2Vsc2UgaWYoIWwpcmV0dXJuITE7aWYobz10aGlzLmRvbWFpbixsKXtpZih0PWFyZ3VtZW50c1sxXSwhbyl7aWYodCBpbnN0YW5jZW9mIEVycm9yKXRocm93IHQ7dmFyIGM9bmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyt0K1wiKVwiKTt0aHJvdyBjLmNvbnRleHQ9dCxjfXJldHVybiB0fHwodD1uZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQnKSksdC5kb21haW5FbWl0dGVyPXRoaXMsdC5kb21haW49byx0LmRvbWFpblRocm93bj0hMSxvLmVtaXQoXCJlcnJvclwiLHQpLCExfWlmKCEocj1hW2VdKSlyZXR1cm4hMTt2YXIgcD1cImZ1bmN0aW9uXCI9PXR5cGVvZiByO3N3aXRjaChpPWFyZ3VtZW50cy5sZW5ndGgpe2Nhc2UgMTplbWl0Tm9uZShyLHAsdGhpcyk7YnJlYWs7Y2FzZSAyOmVtaXRPbmUocixwLHRoaXMsYXJndW1lbnRzWzFdKTticmVhaztjYXNlIDM6ZW1pdFR3byhyLHAsdGhpcyxhcmd1bWVudHNbMV0sYXJndW1lbnRzWzJdKTticmVhaztjYXNlIDQ6ZW1pdFRocmVlKHIscCx0aGlzLGFyZ3VtZW50c1sxXSxhcmd1bWVudHNbMl0sYXJndW1lbnRzWzNdKTticmVhaztkZWZhdWx0OmZvcihzPW5ldyBBcnJheShpLTEpLG49MTtuPGk7bisrKXNbbi0xXT1hcmd1bWVudHNbbl07ZW1pdE1hbnkocixwLHRoaXMscyl9cmV0dXJuITB9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsZSx0LCExKX0sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbj1FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyLEV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLGUsdCwhMCl9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZT1mdW5jdGlvbihlLHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO3JldHVybiB0aGlzLm9uKGUsX29uY2VXcmFwKHRoaXMsZSx0KSksdGhpc30sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCl0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7cmV0dXJuIHRoaXMucHJlcGVuZExpc3RlbmVyKGUsX29uY2VXcmFwKHRoaXMsZSx0KSksdGhpc30sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3ZhciByLGkscyxuLGE7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCl0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7aWYoIShpPXRoaXMuX2V2ZW50cykpcmV0dXJuIHRoaXM7aWYoIShyPWlbZV0pKXJldHVybiB0aGlzO2lmKHI9PT10fHxyLmxpc3RlbmVyJiZyLmxpc3RlbmVyPT09dCkwPT0tLXRoaXMuX2V2ZW50c0NvdW50P3RoaXMuX2V2ZW50cz1uZXcgRXZlbnRIYW5kbGVyczooZGVsZXRlIGlbZV0saS5yZW1vdmVMaXN0ZW5lciYmdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIixlLHIubGlzdGVuZXJ8fHQpKTtlbHNlIGlmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHIpe2ZvcihzPS0xLG49ci5sZW5ndGg7bi0tID4wOylpZihyW25dPT09dHx8cltuXS5saXN0ZW5lciYmcltuXS5saXN0ZW5lcj09PXQpe2E9cltuXS5saXN0ZW5lcixzPW47YnJlYWt9aWYoczwwKXJldHVybiB0aGlzO2lmKDE9PT1yLmxlbmd0aCl7aWYoclswXT12b2lkIDAsMD09LS10aGlzLl9ldmVudHNDb3VudClyZXR1cm4gdGhpcy5fZXZlbnRzPW5ldyBFdmVudEhhbmRsZXJzLHRoaXM7ZGVsZXRlIGlbZV19ZWxzZSBzcGxpY2VPbmUocixzKTtpLnJlbW92ZUxpc3RlbmVyJiZ0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLGUsYXx8dCl9cmV0dXJuIHRoaXN9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3ZhciB0LHI7aWYoIShyPXRoaXMuX2V2ZW50cykpcmV0dXJuIHRoaXM7aWYoIXIucmVtb3ZlTGlzdGVuZXIpcmV0dXJuIDA9PT1hcmd1bWVudHMubGVuZ3RoPyh0aGlzLl9ldmVudHM9bmV3IEV2ZW50SGFuZGxlcnMsdGhpcy5fZXZlbnRzQ291bnQ9MCk6cltlXSYmKDA9PS0tdGhpcy5fZXZlbnRzQ291bnQ/dGhpcy5fZXZlbnRzPW5ldyBFdmVudEhhbmRsZXJzOmRlbGV0ZSByW2VdKSx0aGlzO2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXtmb3IodmFyIGkscz1PYmplY3Qua2V5cyhyKSxuPTA7bjxzLmxlbmd0aDsrK24pXCJyZW1vdmVMaXN0ZW5lclwiIT09KGk9c1tuXSkmJnRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGkpO3JldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhcInJlbW92ZUxpc3RlbmVyXCIpLHRoaXMuX2V2ZW50cz1uZXcgRXZlbnRIYW5kbGVycyx0aGlzLl9ldmVudHNDb3VudD0wLHRoaXN9aWYoXCJmdW5jdGlvblwiPT10eXBlb2YodD1yW2VdKSl0aGlzLnJlbW92ZUxpc3RlbmVyKGUsdCk7ZWxzZSBpZih0KWRve3RoaXMucmVtb3ZlTGlzdGVuZXIoZSx0W3QubGVuZ3RoLTFdKX13aGlsZSh0WzBdKTtyZXR1cm4gdGhpc30sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnM9ZnVuY3Rpb24oZSl7dmFyIHQscj10aGlzLl9ldmVudHM7cmV0dXJuIHImJih0PXJbZV0pP1wiZnVuY3Rpb25cIj09dHlwZW9mIHQ/W3QubGlzdGVuZXJ8fHRdOnVud3JhcExpc3RlbmVycyh0KTpbXX0sRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQ9ZnVuY3Rpb24oZSx0KXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmxpc3RlbmVyQ291bnQ/ZS5saXN0ZW5lckNvdW50KHQpOmxpc3RlbmVyQ291bnQuY2FsbChlLHQpfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQ9bGlzdGVuZXJDb3VudCxFdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQ+MD9SZWZsZWN0Lm93bktleXModGhpcy5fZXZlbnRzKTpbXX07Y29uc3QgZmxhc2hVUkxIYW5kbGVyPXtnZXQ6Z2V0LHN1cHBvcnRlZDpzdXBwb3J0ZWR9O2Z1bmN0aW9uIGdldCQxKGUsdCxyKXtyKG5ldyBFcnJvcihcIlBsZWFzZSBidW5kbGUgdGhlIGxpYnJhcnkgZm9yIG5vZGUgdG8gdXNlIHRoZSBub2RlIHVybEhhbmRsZXJcIikpfWNvbnN0IG5vZGVVUkxIYW5kbGVyPXtnZXQ6Z2V0JDF9O2Z1bmN0aW9uIHhocigpe3RyeXtjb25zdCBlPW5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3Q7cmV0dXJuXCJ3aXRoQ3JlZGVudGlhbHNcImluIGU/ZTpudWxsfWNhdGNoKGUpe3JldHVybiBjb25zb2xlLmxvZyhcIkVycm9yIGluIFhIUlVSTEhhbmRsZXIgc3VwcG9ydCBjaGVjazpcIixlKSxudWxsfX1mdW5jdGlvbiBzdXBwb3J0ZWQkMSgpe3JldHVybiEheGhyKCl9ZnVuY3Rpb24gZ2V0JDIoZSx0LHIpe2lmKFwiaHR0cHM6XCI9PT13aW5kb3cubG9jYXRpb24ucHJvdG9jb2wmJjA9PT1lLmluZGV4T2YoXCJodHRwOi8vXCIpKXJldHVybiByKG5ldyBFcnJvcihcIlhIUlVSTEhhbmRsZXI6IENhbm5vdCBnbyBmcm9tIEhUVFBTIHRvIEhUVFAuXCIpKTt0cnl7Y29uc3QgaT14aHIoKTtpLm9wZW4oXCJHRVRcIixlKSxpLnRpbWVvdXQ9dC50aW1lb3V0fHwwLGkud2l0aENyZWRlbnRpYWxzPXQud2l0aENyZWRlbnRpYWxzfHwhMSxpLm92ZXJyaWRlTWltZVR5cGUmJmkub3ZlcnJpZGVNaW1lVHlwZShcInRleHQveG1sXCIpLGkub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7ND09PWkucmVhZHlTdGF0ZSYmKDIwMD09PWkuc3RhdHVzP3IobnVsbCxpLnJlc3BvbnNlWE1MKTpyKG5ldyBFcnJvcihgWEhSVVJMSGFuZGxlcjogJHtpLnN0YXR1c1RleHR9YCkpKX0saS5zZW5kKCl9Y2F0Y2goZSl7cihuZXcgRXJyb3IoXCJYSFJVUkxIYW5kbGVyOiBVbmV4cGVjdGVkIGVycm9yXCIpKX19Y29uc3QgWEhSVVJMSGFuZGxlcj17Z2V0OmdldCQyLHN1cHBvcnRlZDpzdXBwb3J0ZWQkMX07ZnVuY3Rpb24gZ2V0JDMoZSx0LHIpe3JldHVybiByfHwoXCJmdW5jdGlvblwiPT10eXBlb2YgdCYmKHI9dCksdD17fSksXCJ1bmRlZmluZWRcIj09dHlwZW9mIHdpbmRvd3x8bnVsbD09PXdpbmRvdz9ub2RlVVJMSGFuZGxlci5nZXQoZSx0LHIpOlhIUlVSTEhhbmRsZXIuc3VwcG9ydGVkKCk/WEhSVVJMSGFuZGxlci5nZXQoZSx0LHIpOmZsYXNoVVJMSGFuZGxlci5zdXBwb3J0ZWQoKT9mbGFzaFVSTEhhbmRsZXIuZ2V0KGUsdCxyKTpyKG5ldyBFcnJvcihcIkN1cnJlbnQgY29udGV4dCBpcyBub3Qgc3VwcG9ydGVkIGJ5IGFueSBvZiB0aGUgZGVmYXVsdCBVUkxIYW5kbGVycy4gUGxlYXNlIHByb3ZpZGUgYSBjdXN0b20gVVJMSGFuZGxlclwiKSl9Y29uc3QgdXJsSGFuZGxlcj17Z2V0OmdldCQzfTtjbGFzcyBWQVNUUmVzcG9uc2V7Y29uc3RydWN0b3IoKXt0aGlzLmFkcz1bXSx0aGlzLmVycm9yVVJMVGVtcGxhdGVzPVtdfX1jb25zdCBERUZBVUxUX01BWF9XUkFQUEVSX0RFUFRIPTEwLERFRkFVTFRfRVZFTlRfREFUQT17RVJST1JDT0RFOjkwMCxleHRlbnNpb25zOltdfTtjbGFzcyBWQVNUUGFyc2VyIGV4dGVuZHMgRXZlbnRFbWl0dGVye2NvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLnJlbWFpbmluZ0Fkcz1bXSx0aGlzLnBhcmVudFVSTHM9W10sdGhpcy5lcnJvclVSTFRlbXBsYXRlcz1bXSx0aGlzLnJvb3RFcnJvclVSTFRlbXBsYXRlcz1bXSx0aGlzLm1heFdyYXBwZXJEZXB0aD1udWxsLHRoaXMuVVJMVGVtcGxhdGVGaWx0ZXJzPVtdLHRoaXMuZmV0Y2hpbmdPcHRpb25zPXt9fWFkZFVSTFRlbXBsYXRlRmlsdGVyKGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGUmJnRoaXMuVVJMVGVtcGxhdGVGaWx0ZXJzLnB1c2goZSl9cmVtb3ZlVVJMVGVtcGxhdGVGaWx0ZXIoKXt0aGlzLlVSTFRlbXBsYXRlRmlsdGVycy5wb3AoKX1jb3VudFVSTFRlbXBsYXRlRmlsdGVycygpe3JldHVybiB0aGlzLlVSTFRlbXBsYXRlRmlsdGVycy5sZW5ndGh9Y2xlYXJVUkxUZW1wbGF0ZUZpbHRlcnMoKXt0aGlzLlVSTFRlbXBsYXRlRmlsdGVycz1bXX10cmFja1Zhc3RFcnJvcihlLHQsLi4ucil7dGhpcy5lbWl0KFwiVkFTVC1lcnJvclwiLE9iamVjdC5hc3NpZ24oREVGQVVMVF9FVkVOVF9EQVRBLHQsLi4ucikpLHV0aWwudHJhY2soZSx0KX1nZXRFcnJvclVSTFRlbXBsYXRlcygpe3JldHVybiB0aGlzLnJvb3RFcnJvclVSTFRlbXBsYXRlcy5jb25jYXQodGhpcy5lcnJvclVSTFRlbXBsYXRlcyl9ZmV0Y2hWQVNUKGUsdCxyKXtyZXR1cm4gbmV3IFByb21pc2UoKGkscyk9Pnt0aGlzLlVSTFRlbXBsYXRlRmlsdGVycy5mb3JFYWNoKHQ9PntlPXQoZSl9KSx0aGlzLnBhcmVudFVSTHMucHVzaChlKSx0aGlzLmVtaXQoXCJWQVNULXJlc29sdmluZ1wiLHt1cmw6ZSx3cmFwcGVyRGVwdGg6dCxvcmlnaW5hbFVybDpyfSksdGhpcy51cmxIYW5kbGVyLmdldChlLHRoaXMuZmV0Y2hpbmdPcHRpb25zLCh0LHIpPT57dGhpcy5lbWl0KFwiVkFTVC1yZXNvbHZlZFwiLHt1cmw6ZSxlcnJvcjp0fSksdD9zKHQpOmkocil9KX0pfWluaXRQYXJzaW5nU3RhdHVzKGU9e30pe3RoaXMucm9vdFVSTD1cIlwiLHRoaXMucmVtYWluaW5nQWRzPVtdLHRoaXMucGFyZW50VVJMcz1bXSx0aGlzLmVycm9yVVJMVGVtcGxhdGVzPVtdLHRoaXMucm9vdEVycm9yVVJMVGVtcGxhdGVzPVtdLHRoaXMubWF4V3JhcHBlckRlcHRoPWUud3JhcHBlckxpbWl0fHxERUZBVUxUX01BWF9XUkFQUEVSX0RFUFRILHRoaXMuZmV0Y2hpbmdPcHRpb25zPXt0aW1lb3V0OmUudGltZW91dCx3aXRoQ3JlZGVudGlhbHM6ZS53aXRoQ3JlZGVudGlhbHN9LHRoaXMudXJsSGFuZGxlcj1lLnVybGhhbmRsZXJ8fHVybEhhbmRsZXJ9Z2V0UmVtYWluaW5nQWRzKGUpe2lmKDA9PT10aGlzLnJlbWFpbmluZ0Fkcy5sZW5ndGgpcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIG1vcmUgYWRzIGFyZSBhdmFpbGFibGUgZm9yIHRoZSBnaXZlbiBWQVNUXCIpKTtjb25zdCB0PWU/dXRpbC5mbGF0dGVuKHRoaXMucmVtYWluaW5nQWRzKTp0aGlzLnJlbWFpbmluZ0Fkcy5zaGlmdCgpO3JldHVybiB0aGlzLmVycm9yVVJMVGVtcGxhdGVzPVtdLHRoaXMucGFyZW50VVJMcz1bXSx0aGlzLnJlc29sdmVBZHModCx7d3JhcHBlckRlcHRoOjAsb3JpZ2luYWxVcmw6dGhpcy5yb290VVJMfSkudGhlbihlPT50aGlzLmJ1aWxkVkFTVFJlc3BvbnNlKGUpKX1nZXRBbmRQYXJzZVZBU1QoZSx0PXt9KXtyZXR1cm4gdGhpcy5pbml0UGFyc2luZ1N0YXR1cyh0KSx0aGlzLnJvb3RVUkw9ZSx0aGlzLmZldGNoVkFTVChlKS50aGVuKHI9Pih0Lm9yaWdpbmFsVXJsPWUsdC5pc1Jvb3RWQVNUPSEwLHRoaXMucGFyc2Uocix0KS50aGVuKGU9PnRoaXMuYnVpbGRWQVNUUmVzcG9uc2UoZSkpKSl9cGFyc2VWQVNUKGUsdD17fSl7cmV0dXJuIHRoaXMuaW5pdFBhcnNpbmdTdGF0dXModCksdC5pc1Jvb3RWQVNUPSEwLHRoaXMucGFyc2UoZSx0KS50aGVuKGU9PnRoaXMuYnVpbGRWQVNUUmVzcG9uc2UoZSkpfWJ1aWxkVkFTVFJlc3BvbnNlKGUpe2NvbnN0IHQ9bmV3IFZBU1RSZXNwb25zZTtyZXR1cm4gdC5hZHM9ZSx0LmVycm9yVVJMVGVtcGxhdGVzPXRoaXMuZ2V0RXJyb3JVUkxUZW1wbGF0ZXMoKSx0aGlzLmNvbXBsZXRlV3JhcHBlclJlc29sdmluZyh0KSx0fXBhcnNlKGUse3Jlc29sdmVBbGw6dD0hMCx3cmFwcGVyU2VxdWVuY2U6cj1udWxsLG9yaWdpbmFsVXJsOmk9bnVsbCx3cmFwcGVyRGVwdGg6cz0wLGlzUm9vdFZBU1Q6bj0hMX0pe2lmKCFlfHwhZS5kb2N1bWVudEVsZW1lbnR8fFwiVkFTVFwiIT09ZS5kb2N1bWVudEVsZW1lbnQubm9kZU5hbWUpcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkludmFsaWQgVkFTVCBYTUxEb2N1bWVudFwiKSk7bGV0IGE9W107Y29uc3Qgbz1lLmRvY3VtZW50RWxlbWVudC5jaGlsZE5vZGVzO2ZvcihsZXQgZSBpbiBvKXtjb25zdCB0PW9bZV07aWYoXCJFcnJvclwiPT09dC5ub2RlTmFtZSl7Y29uc3QgZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHQpO24/dGhpcy5yb290RXJyb3JVUkxUZW1wbGF0ZXMucHVzaChlKTp0aGlzLmVycm9yVVJMVGVtcGxhdGVzLnB1c2goZSl9aWYoXCJBZFwiPT09dC5ub2RlTmFtZSl7Y29uc3QgZT1wYXJzZUFkKHQpO2U/YS5wdXNoKGUpOnRoaXMudHJhY2tWYXN0RXJyb3IodGhpcy5nZXRFcnJvclVSTFRlbXBsYXRlcygpLHtFUlJPUkNPREU6MTAxfSl9fWNvbnN0IGw9YS5sZW5ndGgsYz1hW2wtMV07cmV0dXJuIDE9PT1sJiZ2b2lkIDAhPT1yJiZudWxsIT09ciYmYyYmIWMuc2VxdWVuY2UmJihjLnNlcXVlbmNlPXIpLCExPT09dCYmKHRoaXMucmVtYWluaW5nQWRzPXBhcnNlclV0aWxzLnNwbGl0VkFTVChhKSxhPXRoaXMucmVtYWluaW5nQWRzLnNoaWZ0KCkpLHRoaXMucmVzb2x2ZUFkcyhhLHt3cmFwcGVyRGVwdGg6cyxvcmlnaW5hbFVybDppfSl9cmVzb2x2ZUFkcyhlPVtdLHt3cmFwcGVyRGVwdGg6dCxvcmlnaW5hbFVybDpyfSl7Y29uc3QgaT1bXTtyZXR1cm4gZS5mb3JFYWNoKGU9Pntjb25zdCBzPXRoaXMucmVzb2x2ZVdyYXBwZXJzKGUsdCxyKTtpLnB1c2gocyl9KSxQcm9taXNlLmFsbChpKS50aGVuKGU9Pntjb25zdCBpPXV0aWwuZmxhdHRlbihlKTtpZighaSYmdGhpcy5yZW1haW5pbmdBZHMubGVuZ3RoPjApe2NvbnN0IGU9dGhpcy5yZW1haW5pbmdBZHMuc2hpZnQoKTtyZXR1cm4gdGhpcy5yZXNvbHZlQWRzKGUse3dyYXBwZXJEZXB0aDp0LG9yaWdpbmFsVXJsOnJ9KX1yZXR1cm4gaX0pfXJlc29sdmVXcmFwcGVycyhlLHQscil7cmV0dXJuIG5ldyBQcm9taXNlKChpLHMpPT57aWYodCsrLCFlLm5leHRXcmFwcGVyVVJMKXJldHVybiBkZWxldGUgZS5uZXh0V3JhcHBlclVSTCxpKGUpO2lmKHQ+PXRoaXMubWF4V3JhcHBlckRlcHRofHwtMSE9PXRoaXMucGFyZW50VVJMcy5pbmRleE9mKGUubmV4dFdyYXBwZXJVUkwpKXJldHVybiBlLmVycm9yQ29kZT0zMDIsZGVsZXRlIGUubmV4dFdyYXBwZXJVUkwsaShlKTtlLm5leHRXcmFwcGVyVVJMPXBhcnNlclV0aWxzLnJlc29sdmVWYXN0QWRUYWdVUkkoZS5uZXh0V3JhcHBlclVSTCxyKTtjb25zdCBuPWUuc2VxdWVuY2U7cj1lLm5leHRXcmFwcGVyVVJMLHRoaXMuZmV0Y2hWQVNUKGUubmV4dFdyYXBwZXJVUkwsdCxyKS50aGVuKHM9PnRoaXMucGFyc2Uocyx7b3JpZ2luYWxVcmw6cix3cmFwcGVyU2VxdWVuY2U6bix3cmFwcGVyRGVwdGg6dH0pLnRoZW4odD0+e2lmKGRlbGV0ZSBlLm5leHRXcmFwcGVyVVJMLDA9PT10Lmxlbmd0aClyZXR1cm4gZS5jcmVhdGl2ZXM9W10saShlKTt0LmZvckVhY2godD0+e3QmJnBhcnNlclV0aWxzLm1lcmdlV3JhcHBlckFkRGF0YSh0LGUpfSksaSh0KX0pKS5jYXRjaCh0PT57ZS5lcnJvckNvZGU9MzAxLGUuZXJyb3JNZXNzYWdlPXQubWVzc2FnZSxpKGUpfSl9KX1jb21wbGV0ZVdyYXBwZXJSZXNvbHZpbmcoZSl7aWYoMD09PWUuYWRzLmxlbmd0aCl0aGlzLnRyYWNrVmFzdEVycm9yKGUuZXJyb3JVUkxUZW1wbGF0ZXMse0VSUk9SQ09ERTozMDN9KTtlbHNlIGZvcihsZXQgdD1lLmFkcy5sZW5ndGgtMTt0Pj0wO3QtLSl7bGV0IHI9ZS5hZHNbdF07KHIuZXJyb3JDb2RlfHwwPT09ci5jcmVhdGl2ZXMubGVuZ3RoKSYmKHRoaXMudHJhY2tWYXN0RXJyb3Ioci5lcnJvclVSTFRlbXBsYXRlcy5jb25jYXQoZS5lcnJvclVSTFRlbXBsYXRlcykse0VSUk9SQ09ERTpyLmVycm9yQ29kZXx8MzAzfSx7RVJST1JNRVNTQUdFOnIuZXJyb3JNZXNzYWdlfHxcIlwifSx7ZXh0ZW5zaW9uczpyLmV4dGVuc2lvbnN9LHtzeXN0ZW06ci5zeXN0ZW19KSxlLmFkcy5zcGxpY2UodCwxKSl9fX1sZXQgc3RvcmFnZT1udWxsO2NvbnN0IERFRkFVTFRfU1RPUkFHRT17ZGF0YTp7fSxsZW5ndGg6MCxnZXRJdGVtKGUpe3JldHVybiB0aGlzLmRhdGFbZV19LHNldEl0ZW0oZSx0KXt0aGlzLmRhdGFbZV09dCx0aGlzLmxlbmd0aD1PYmplY3Qua2V5cyh0aGlzLmRhdGEpLmxlbmd0aH0scmVtb3ZlSXRlbShlKXtkZWxldGUgZGF0YVtlXSx0aGlzLmxlbmd0aD1PYmplY3Qua2V5cyh0aGlzLmRhdGEpLmxlbmd0aH0sY2xlYXIoKXt0aGlzLmRhdGE9e30sdGhpcy5sZW5ndGg9MH19O2NsYXNzIFN0b3JhZ2V7Y29uc3RydWN0b3IoKXt0aGlzLnN0b3JhZ2U9dGhpcy5pbml0U3RvcmFnZSgpfWluaXRTdG9yYWdlKCl7aWYoc3RvcmFnZSlyZXR1cm4gc3RvcmFnZTt0cnl7c3RvcmFnZT1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZudWxsIT09d2luZG93P3dpbmRvdy5sb2NhbFN0b3JhZ2V8fHdpbmRvdy5zZXNzaW9uU3RvcmFnZTpudWxsfWNhdGNoKGUpe3N0b3JhZ2U9bnVsbH1yZXR1cm4gc3RvcmFnZSYmIXRoaXMuaXNTdG9yYWdlRGlzYWJsZWQoc3RvcmFnZSl8fChzdG9yYWdlPURFRkFVTFRfU1RPUkFHRSkuY2xlYXIoKSxzdG9yYWdlfWlzU3RvcmFnZURpc2FibGVkKGUpe2NvbnN0IHQ9XCJfX1ZBU1RTdG9yYWdlX19cIjt0cnl7aWYoZS5zZXRJdGVtKHQsdCksZS5nZXRJdGVtKHQpIT09dClyZXR1cm4gZS5yZW1vdmVJdGVtKHQpLCEwfWNhdGNoKGUpe3JldHVybiEwfXJldHVybiBlLnJlbW92ZUl0ZW0odCksITF9Z2V0SXRlbShlKXtyZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oZSl9c2V0SXRlbShlLHQpe3JldHVybiB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShlLHQpfXJlbW92ZUl0ZW0oZSl7cmV0dXJuIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKGUpfWNsZWFyKCl7cmV0dXJuIHRoaXMuc3RvcmFnZS5jbGVhcigpfX1jbGFzcyBWQVNUQ2xpZW50e2NvbnN0cnVjdG9yKGUsdCxyKXt0aGlzLmNhcHBpbmdGcmVlTHVuY2g9ZXx8MCx0aGlzLmNhcHBpbmdNaW5pbXVtVGltZUludGVydmFsPXR8fDAsdGhpcy5kZWZhdWx0T3B0aW9ucz17d2l0aENyZWRlbnRpYWxzOiExLHRpbWVvdXQ6MH0sdGhpcy52YXN0UGFyc2VyPW5ldyBWQVNUUGFyc2VyLHRoaXMuc3RvcmFnZT1yfHxuZXcgU3RvcmFnZSx2b2lkIDA9PT10aGlzLmxhc3RTdWNjZXNzZnVsQWQmJih0aGlzLmxhc3RTdWNjZXNzZnVsQWQ9MCksdm9pZCAwPT09dGhpcy50b3RhbENhbGxzJiYodGhpcy50b3RhbENhbGxzPTApLHZvaWQgMD09PXRoaXMudG90YWxDYWxsc1RpbWVvdXQmJih0aGlzLnRvdGFsQ2FsbHNUaW1lb3V0PTApfWdldFBhcnNlcigpe3JldHVybiB0aGlzLnZhc3RQYXJzZXJ9Z2V0IGxhc3RTdWNjZXNzZnVsQWQoKXtyZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oXCJ2YXN0LWNsaWVudC1sYXN0LXN1Y2Nlc3NmdWwtYWRcIil9c2V0IGxhc3RTdWNjZXNzZnVsQWQoZSl7dGhpcy5zdG9yYWdlLnNldEl0ZW0oXCJ2YXN0LWNsaWVudC1sYXN0LXN1Y2Nlc3NmdWwtYWRcIixlKX1nZXQgdG90YWxDYWxscygpe3JldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShcInZhc3QtY2xpZW50LXRvdGFsLWNhbGxzXCIpfXNldCB0b3RhbENhbGxzKGUpe3RoaXMuc3RvcmFnZS5zZXRJdGVtKFwidmFzdC1jbGllbnQtdG90YWwtY2FsbHNcIixlKX1nZXQgdG90YWxDYWxsc1RpbWVvdXQoKXtyZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oXCJ2YXN0LWNsaWVudC10b3RhbC1jYWxscy10aW1lb3V0XCIpfXNldCB0b3RhbENhbGxzVGltZW91dChlKXt0aGlzLnN0b3JhZ2Uuc2V0SXRlbShcInZhc3QtY2xpZW50LXRvdGFsLWNhbGxzLXRpbWVvdXRcIixlKX1oYXNSZW1haW5pbmdBZHMoKXtyZXR1cm4gdGhpcy52YXN0UGFyc2VyLnJlbWFpbmluZ0Fkcy5sZW5ndGg+MH1nZXROZXh0QWRzKGUpe3JldHVybiB0aGlzLnZhc3RQYXJzZXIuZ2V0UmVtYWluaW5nQWRzKGUpfWdldChlLHQ9e30pe2NvbnN0IHI9RGF0ZS5ub3coKTtyZXR1cm4odD1PYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdE9wdGlvbnMsdCkpLmhhc093blByb3BlcnR5KFwicmVzb2x2ZUFsbFwiKXx8KHQucmVzb2x2ZUFsbD0hMSksdGhpcy50b3RhbENhbGxzVGltZW91dDxyPyh0aGlzLnRvdGFsQ2FsbHM9MSx0aGlzLnRvdGFsQ2FsbHNUaW1lb3V0PXIrMzZlNSk6dGhpcy50b3RhbENhbGxzKyssbmV3IFByb21pc2UoKGkscyk9PntpZih0aGlzLmNhcHBpbmdGcmVlTHVuY2g+PXRoaXMudG90YWxDYWxscylyZXR1cm4gcyhuZXcgRXJyb3IoYFZBU1QgY2FsbCBjYW5jZWxlZCDigJMgRnJlZUx1bmNoIGNhcHBpbmcgbm90IHJlYWNoZWQgeWV0ICR7dGhpcy50b3RhbENhbGxzfS8ke3RoaXMuY2FwcGluZ0ZyZWVMdW5jaH1gKSk7Y29uc3Qgbj1yLXRoaXMubGFzdFN1Y2Nlc3NmdWxBZDtpZihuPDApdGhpcy5sYXN0U3VjY2Vzc2Z1bEFkPTA7ZWxzZSBpZihuPHRoaXMuY2FwcGluZ01pbmltdW1UaW1lSW50ZXJ2YWwpcmV0dXJuIHMobmV3IEVycm9yKGBWQVNUIGNhbGwgY2FuY2VsZWQg4oCTICgke3RoaXMuY2FwcGluZ01pbmltdW1UaW1lSW50ZXJ2YWx9KW1zIG1pbmltdW0gaW50ZXJ2YWwgcmVhY2hlZGApKTt0aGlzLnZhc3RQYXJzZXIuZ2V0QW5kUGFyc2VWQVNUKGUsdCkudGhlbihlPT5pKGUpKS5jYXRjaChlPT5zKGUpKX0pfX1jb25zdCBERUZBVUxUX1NLSVBfREVMQVk9LTE7Y2xhc3MgVkFTVFRyYWNrZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXJ7Y29uc3RydWN0b3IoZSx0LHIsaT1udWxsKXtzdXBlcigpLHRoaXMuYWQ9dCx0aGlzLmNyZWF0aXZlPXIsdGhpcy52YXJpYXRpb249aSx0aGlzLm11dGVkPSExLHRoaXMuaW1wcmVzc2VkPSExLHRoaXMuc2tpcHBhYmxlPSExLHRoaXMudHJhY2tpbmdFdmVudHM9e30sdGhpcy5fYWxyZWFkeVRyaWdnZXJlZFF1YXJ0aWxlcz17fSx0aGlzLmVtaXRBbHdheXNFdmVudHM9W1wiY3JlYXRpdmVWaWV3XCIsXCJzdGFydFwiLFwiZmlyc3RRdWFydGlsZVwiLFwibWlkcG9pbnRcIixcInRoaXJkUXVhcnRpbGVcIixcImNvbXBsZXRlXCIsXCJyZXN1bWVcIixcInBhdXNlXCIsXCJyZXdpbmRcIixcInNraXBcIixcImNsb3NlTGluZWFyXCIsXCJjbG9zZVwiXTtmb3IobGV0IGUgaW4gdGhpcy5jcmVhdGl2ZS50cmFja2luZ0V2ZW50cyl7Y29uc3QgdD10aGlzLmNyZWF0aXZlLnRyYWNraW5nRXZlbnRzW2VdO3RoaXMudHJhY2tpbmdFdmVudHNbZV09dC5zbGljZSgwKX10aGlzLmNyZWF0aXZlIGluc3RhbmNlb2YgQ3JlYXRpdmVMaW5lYXI/dGhpcy5faW5pdExpbmVhclRyYWNraW5nKCk6dGhpcy5faW5pdFZhcmlhdGlvblRyYWNraW5nKCksZSYmdGhpcy5vbihcInN0YXJ0XCIsKCk9PntlLmxhc3RTdWNjZXNzZnVsQWQ9RGF0ZS5ub3coKX0pfV9pbml0TGluZWFyVHJhY2tpbmcoKXt0aGlzLmxpbmVhcj0hMCx0aGlzLnNraXBEZWxheT10aGlzLmNyZWF0aXZlLnNraXBEZWxheSx0aGlzLnNldER1cmF0aW9uKHRoaXMuY3JlYXRpdmUuZHVyYXRpb24pLHRoaXMuY2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9dGhpcy5jcmVhdGl2ZS52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlLHRoaXMuY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz10aGlzLmNyZWF0aXZlLnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlc31faW5pdFZhcmlhdGlvblRyYWNraW5nKCl7aWYodGhpcy5saW5lYXI9ITEsdGhpcy5za2lwRGVsYXk9REVGQVVMVF9TS0lQX0RFTEFZLHRoaXMudmFyaWF0aW9uKXtmb3IobGV0IGUgaW4gdGhpcy52YXJpYXRpb24udHJhY2tpbmdFdmVudHMpe2NvbnN0IHQ9dGhpcy52YXJpYXRpb24udHJhY2tpbmdFdmVudHNbZV07dGhpcy50cmFja2luZ0V2ZW50c1tlXT90aGlzLnRyYWNraW5nRXZlbnRzW2VdPXRoaXMudHJhY2tpbmdFdmVudHNbZV0uY29uY2F0KHQuc2xpY2UoMCkpOnRoaXMudHJhY2tpbmdFdmVudHNbZV09dC5zbGljZSgwKX10aGlzLnZhcmlhdGlvbiBpbnN0YW5jZW9mIE5vbkxpbmVhckFkPyh0aGlzLmNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPXRoaXMudmFyaWF0aW9uLm5vbmxpbmVhckNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlLHRoaXMuY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz10aGlzLnZhcmlhdGlvbi5ub25saW5lYXJDbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLHRoaXMuc2V0RHVyYXRpb24odGhpcy52YXJpYXRpb24ubWluU3VnZ2VzdGVkRHVyYXRpb24pKTp0aGlzLnZhcmlhdGlvbiBpbnN0YW5jZW9mIENvbXBhbmlvbkFkJiYodGhpcy5jbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT10aGlzLnZhcmlhdGlvbi5jb21wYW5pb25DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSx0aGlzLmNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9dGhpcy52YXJpYXRpb24uY29tcGFuaW9uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyl9fXNldER1cmF0aW9uKGUpe3RoaXMuYXNzZXREdXJhdGlvbj1lLHRoaXMucXVhcnRpbGVzPXtmaXJzdFF1YXJ0aWxlOk1hdGgucm91bmQoMjUqdGhpcy5hc3NldER1cmF0aW9uKS8xMDAsbWlkcG9pbnQ6TWF0aC5yb3VuZCg1MCp0aGlzLmFzc2V0RHVyYXRpb24pLzEwMCx0aGlyZFF1YXJ0aWxlOk1hdGgucm91bmQoNzUqdGhpcy5hc3NldER1cmF0aW9uKS8xMDB9fXNldFByb2dyZXNzKGUpe2NvbnN0IHQ9dGhpcy5za2lwRGVsYXl8fERFRkFVTFRfU0tJUF9ERUxBWTtpZigtMT09PXR8fHRoaXMuc2tpcHBhYmxlfHwodD5lP3RoaXMuZW1pdChcInNraXAtY291bnRkb3duXCIsdC1lKToodGhpcy5za2lwcGFibGU9ITAsdGhpcy5lbWl0KFwic2tpcC1jb3VudGRvd25cIiwwKSkpLHRoaXMuYXNzZXREdXJhdGlvbj4wKXtjb25zdCB0PVtdO2lmKGU+MCl7Y29uc3Qgcj1NYXRoLnJvdW5kKGUvdGhpcy5hc3NldER1cmF0aW9uKjEwMCk7dC5wdXNoKFwic3RhcnRcIiksdC5wdXNoKGBwcm9ncmVzcy0ke3J9JWApLHQucHVzaChgcHJvZ3Jlc3MtJHtNYXRoLnJvdW5kKGUpfWApO2ZvcihsZXQgciBpbiB0aGlzLnF1YXJ0aWxlcyl0aGlzLmlzUXVhcnRpbGVSZWFjaGVkKHIsdGhpcy5xdWFydGlsZXNbcl0sZSkmJih0LnB1c2gociksdGhpcy5fYWxyZWFkeVRyaWdnZXJlZFF1YXJ0aWxlc1tyXT0hMCl9dC5mb3JFYWNoKGU9Pnt0aGlzLnRyYWNrKGUsITApfSksZTx0aGlzLnByb2dyZXNzJiZ0aGlzLnRyYWNrKFwicmV3aW5kXCIpfXRoaXMucHJvZ3Jlc3M9ZX1pc1F1YXJ0aWxlUmVhY2hlZChlLHQscil7bGV0IGk9ITE7cmV0dXJuIHQ8PXImJiF0aGlzLl9hbHJlYWR5VHJpZ2dlcmVkUXVhcnRpbGVzW2VdJiYoaT0hMCksaX1zZXRNdXRlZChlKXt0aGlzLm11dGVkIT09ZSYmdGhpcy50cmFjayhlP1wibXV0ZVwiOlwidW5tdXRlXCIpLHRoaXMubXV0ZWQ9ZX1zZXRQYXVzZWQoZSl7dGhpcy5wYXVzZWQhPT1lJiZ0aGlzLnRyYWNrKGU/XCJwYXVzZVwiOlwicmVzdW1lXCIpLHRoaXMucGF1c2VkPWV9c2V0RnVsbHNjcmVlbihlKXt0aGlzLmZ1bGxzY3JlZW4hPT1lJiZ0aGlzLnRyYWNrKGU/XCJmdWxsc2NyZWVuXCI6XCJleGl0RnVsbHNjcmVlblwiKSx0aGlzLmZ1bGxzY3JlZW49ZX1zZXRFeHBhbmQoZSl7dGhpcy5leHBhbmRlZCE9PWUmJnRoaXMudHJhY2soZT9cImV4cGFuZFwiOlwiY29sbGFwc2VcIiksdGhpcy5leHBhbmRlZD1lfXNldFNraXBEZWxheShlKXtcIm51bWJlclwiPT10eXBlb2YgZSYmKHRoaXMuc2tpcERlbGF5PWUpfXRyYWNrSW1wcmVzc2lvbigpe3RoaXMuaW1wcmVzc2VkfHwodGhpcy5pbXByZXNzZWQ9ITAsdGhpcy50cmFja1VSTHModGhpcy5hZC5pbXByZXNzaW9uVVJMVGVtcGxhdGVzKSx0aGlzLnRyYWNrKFwiY3JlYXRpdmVWaWV3XCIpKX1lcnJvcldpdGhDb2RlKGUpe3RoaXMudHJhY2tVUkxzKHRoaXMuYWQuZXJyb3JVUkxUZW1wbGF0ZXMse0VSUk9SQ09ERTplfSl9Y29tcGxldGUoKXt0aGlzLnRyYWNrKFwiY29tcGxldGVcIil9Y2xvc2UoKXt0aGlzLnRyYWNrKHRoaXMubGluZWFyP1wiY2xvc2VMaW5lYXJcIjpcImNsb3NlXCIpfXNraXAoKXt0aGlzLnRyYWNrKFwic2tpcFwiKSx0aGlzLnRyYWNraW5nRXZlbnRzPVtdfWNsaWNrKGU9bnVsbCl7dGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzJiZ0aGlzLmNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMubGVuZ3RoJiZ0aGlzLnRyYWNrVVJMcyh0aGlzLmNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMpO2NvbnN0IHQ9dGhpcy5jbGlja1Rocm91Z2hVUkxUZW1wbGF0ZXx8ZTtpZih0KXtjb25zdCBlPXRoaXMubGluZWFyP3tDT05URU5UUExBWUhFQUQ6dGhpcy5wcm9ncmVzc0Zvcm1hdHRlZCgpfTp7fSxyPXV0aWwucmVzb2x2ZVVSTFRlbXBsYXRlcyhbdF0sZSlbMF07dGhpcy5lbWl0KFwiY2xpY2t0aHJvdWdoXCIscil9fXRyYWNrKGUsdD0hMSl7XCJjbG9zZUxpbmVhclwiPT09ZSYmIXRoaXMudHJhY2tpbmdFdmVudHNbZV0mJnRoaXMudHJhY2tpbmdFdmVudHMuY2xvc2UmJihlPVwiY2xvc2VcIik7Y29uc3Qgcj10aGlzLnRyYWNraW5nRXZlbnRzW2VdLGk9dGhpcy5lbWl0QWx3YXlzRXZlbnRzLmluZGV4T2YoZSk+LTE7cj8odGhpcy5lbWl0KGUsXCJcIiksdGhpcy50cmFja1VSTHMocikpOmkmJnRoaXMuZW1pdChlLFwiXCIpLHQmJihkZWxldGUgdGhpcy50cmFja2luZ0V2ZW50c1tlXSxpJiZ0aGlzLmVtaXRBbHdheXNFdmVudHMuc3BsaWNlKHRoaXMuZW1pdEFsd2F5c0V2ZW50cy5pbmRleE9mKGUpLDEpKX10cmFja1VSTHMoZSx0PXt9KXt0aGlzLmxpbmVhciYmKHRoaXMuY3JlYXRpdmUmJnRoaXMuY3JlYXRpdmUubWVkaWFGaWxlcyYmdGhpcy5jcmVhdGl2ZS5tZWRpYUZpbGVzWzBdJiZ0aGlzLmNyZWF0aXZlLm1lZGlhRmlsZXNbMF0uZmlsZVVSTCYmKHQuQVNTRVRVUkk9dGhpcy5jcmVhdGl2ZS5tZWRpYUZpbGVzWzBdLmZpbGVVUkwpLHQuQ09OVEVOVFBMQVlIRUFEPXRoaXMucHJvZ3Jlc3NGb3JtYXR0ZWQoKSksdXRpbC50cmFjayhlLHQpfXByb2dyZXNzRm9ybWF0dGVkKCl7Y29uc3QgZT1wYXJzZUludCh0aGlzLnByb2dyZXNzKTtsZXQgdD1lLzM2MDA7dC5sZW5ndGg8MiYmKHQ9YDAke3R9YCk7bGV0IHI9ZS82MCU2MDtyLmxlbmd0aDwyJiYocj1gMCR7cn1gKTtsZXQgaT1lJTYwO3JldHVybiBpLmxlbmd0aDwyJiYoaT1gMCR7cn1gKSxgJHt0fToke3J9OiR7aX0uJHtwYXJzZUludCgxMDAqKHRoaXMucHJvZ3Jlc3MtZSkpfWB9fWV4cG9ydHtWQVNUQ2xpZW50LFZBU1RQYXJzZXIsVkFTVFRyYWNrZXJ9OyJdLCJzb3VyY2VSb290IjoiIn0=