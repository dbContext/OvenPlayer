/*! ovenplayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (MIT) | Github : https://ovenplayer.com */
(window["webpackJsonpOvenPlayer"] = window["webpackJsonpOvenPlayer"] || []).push([["ovenplayer.provider.DashProvider"],{

/***/ "./src/js/api/provider/html5/providers/Dash.js":
/*!*****************************************************!*\
  !*** ./src/js/api/provider/html5/providers/Dash.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Provider = __webpack_require__(/*! api/provider/html5/Provider */ "./src/js/api/provider/html5/Provider.js");

var _Provider2 = _interopRequireDefault(_Provider);

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _sizeHumanizer = __webpack_require__(/*! utils/sizeHumanizer */ "./src/js/utils/sizeHumanizer.js");

var _sizeHumanizer2 = _interopRequireDefault(_sizeHumanizer);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _constants2 = __webpack_require__(/*! ../../../constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   dashjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */
/**
 * Created by hoho on 2018. 6. 14..
 */
var DASHERROR = {
    DOWNLOAD: "download",
    MANIFESTERROR: "manifestError"
};
var Dash = function Dash(element, playerConfig, adTagUrl) {

    var that = {};
    var dash = null;
    var superPlay_func = null;
    var superDestroy_func = null;
    var seekPosition_sec = 0;
    var isDashMetaLoaded = false;
    var prevLLLiveDuration = null;
    var loadRetryer = null;
    var sourceOfFile = "";
    var runedAutoStart = false;

    try {

        if (dashjs.Version < "2.6.5") {
            throw _constants.ERRORS.codes[_constants.INIT_DASH_UNSUPPORT];
        }

        var coveredSetAutoSwitchQualityFor = function coveredSetAutoSwitchQualityFor(isAuto) {

            if (dashjs.Version >= '3.0.0') {
                dash.updateSettings({
                    streaming: {
                        abr: {
                            autoSwitchBitrate: {
                                video: isAuto
                            }
                        }
                    }
                });
            } else if (dashjs.Version > "2.9.0") {
                dash.setAutoSwitchQualityFor("video", isAuto);
            } else {
                dash.setAutoSwitchQualityFor(isAuto);
            }
        };

        var coveredGetAutoSwitchQualityFor = function coveredGetAutoSwitchQualityFor() {
            var result = "";

            if (dashjs.Version >= '3.0.0') {
                result = dash.getSettings().streaming.abr.autoSwitchBitrate.video;
            } else if (dashjs.Version > "2.9.0") {
                result = dash.getAutoSwitchQualityFor("video");
            } else {
                result = dash.getAutoSwitchQualityFor();
            }
            return result;
        };

        var liveDelayReducingCallback = function liveDelayReducingCallback() {

            if (dash.duration() !== prevLLLiveDuration) {
                prevLLLiveDuration = dash.duration();

                var dvrInfo = dash.getDashMetrics().getCurrentDVRInfo();
                var liveDelay = playerConfig.getConfig().lowLatencyMpdLiveDelay;

                if (!liveDelay) {
                    liveDelay = 3;
                }

                dash.seek(dvrInfo.range.end - dvrInfo.range.start - liveDelay);
            }
        };

        dash = dashjs.MediaPlayer().create();
        dash.initialize(element, null, false);

        window.op_dash = dash;

        var spec = {
            name: _constants.PROVIDER_DASH,
            element: element,
            mse: dash,
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

        that = (0, _Provider2["default"])(spec, playerConfig, function (source, lastPlayPosition) {

            OvenPlayerConsole.log("DASH : Attach File : ", source, "lastPlayPosition : " + lastPlayPosition);

            coveredSetAutoSwitchQualityFor(true);
            sourceOfFile = source.file;

            dash.off(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, liveDelayReducingCallback);

            if (source.lowLatency === true) {

                prevLLLiveDuration = null;

                if (dashjs.Version >= '3.0.0') {

                    dash.updateSettings({
                        streaming: {
                            lowLatencyEnabled: source.lowLatency
                        }
                    });
                } else {

                    dash.setLowLatencyEnabled(source.lowLatency);
                }

                if (playerConfig.getConfig().lowLatencyMpdLiveDelay && typeof playerConfig.getConfig().lowLatencyMpdLiveDelay === 'number') {

                    if (dashjs.Version >= '3.0.0') {

                        dash.updateSettings({
                            streaming: {
                                liveDelay: playerConfig.getConfig().lowLatencyMpdLiveDelay
                            }
                        });
                    } else {
                        dash.setLiveDelay(playerConfig.getConfig().lowLatencyMpdLiveDelay);
                    }
                }

                dash.on(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, liveDelayReducingCallback);
            } else {

                if (dashjs.Version >= '3.0.0') {

                    dash.updateSettings({
                        streaming: {
                            lowLatencyEnabled: false,
                            liveDelay: undefined
                        }
                    });
                } else {

                    dash.setLowLatencyEnabled(false);
                    dash.setLiveDelay();
                }
            }

            if (dashjs.Version >= '3.0.0') {

                dash.updateSettings({
                    debug: {
                        logLevel: dashjs.Debug.LOG_LEVEL_NONE
                    },
                    streaming: {
                        retryAttempts: {
                            MPD: 0
                        }
                    }
                });
            } else {

                dash.getDebug().setLogToBrowserConsole(false);
            }

            dash.attachSource(sourceOfFile);

            seekPosition_sec = lastPlayPosition;
        });

        superPlay_func = that["super"]('play');
        superDestroy_func = that["super"]('destroy');
        OvenPlayerConsole.log("DASH PROVIDER LOADED.");

        var loadingRetryCount = playerConfig.getConfig().loadingRetryCount;

        dash.on(dashjs.MediaPlayer.events.ERROR, function (error) {

            // Handle mpd load error.
            if (error && (error.error.code === dashjs.MediaPlayer.errors.DOWNLOAD_ERROR_ID_MANIFEST_CODE || error.error.code === dashjs.MediaPlayer.errors.MANIFEST_LOADER_LOADING_FAILURE_ERROR_CODE)) {

                if (loadingRetryCount > 0) {

                    that.setState(_constants2.STATE_LOADING);

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    loadingRetryCount = loadingRetryCount - 1;

                    loadRetryer = setTimeout(function () {

                        dash.attachSource(sourceOfFile);
                    }, 1000);
                } else {

                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_UNKNWON_NETWORK_ERROR];
                    tempError.error = error;
                    (0, _utils.errorTrigger)(tempError, that);
                }
            }
        });

        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function (event) {
            if (event && event.mediaType && event.mediaType === "video") {
                that.trigger(_constants.CONTENT_LEVEL_CHANGED, {
                    isAuto: coveredGetAutoSwitchQualityFor(),
                    currentQuality: spec.currentQuality,
                    type: "request"
                });
            }
        });
        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (event) {
            if (event && event.mediaType && event.mediaType === "video") {
                spec.currentQuality = event.newQuality;
                that.trigger(_constants.CONTENT_LEVEL_CHANGED, {
                    isAuto: coveredGetAutoSwitchQualityFor(),
                    currentQuality: event.newQuality,
                    type: "render"
                });
            }
        });

        dash.on(dashjs.MediaPlayer.events.PLAYBACK_METADATA_LOADED, function (event) {

            if (dashjs.Version >= '3.0.0') {

                dash.updateSettings({
                    streaming: {
                        retryAttempts: {
                            MPD: 2
                        }
                    }
                });
            }

            OvenPlayerConsole.log("DASH : PLAYBACK_METADATA_LOADED  : ", dash.getQualityFor("video"), dash.getBitrateInfoListFor('video'), dash.getBitrateInfoListFor('video')[dash.getQualityFor("video")]);

            isDashMetaLoaded = true;
            var subQualityList = dash.getBitrateInfoListFor('video');
            spec.currentQuality = dash.getQualityFor("video");
            for (var i = 0; i < subQualityList.length; i++) {
                if (!_underscore2["default"].findWhere(spec.qualityLevels, { bitrate: subQualityList[i].bitrate, height: subQualityList[i].height, width: subQualityList[i].width })) {
                    spec.qualityLevels.push({
                        bitrate: subQualityList[i].bitrate,
                        height: subQualityList[i].height,
                        width: subQualityList[i].width,
                        index: subQualityList[i].qualityIndex,
                        label: subQualityList[i].width + "x" + subQualityList[i].height + ", " + (0, _sizeHumanizer2["default"])(subQualityList[i].bitrate, true, "bps")
                    });
                }
            }

            if (seekPosition_sec) {
                dash.seek(seekPosition_sec);
                if (!playerConfig.isAutoStart()) {
                    // that.play();
                }
            }

            if (dash.isDynamic()) {
                spec.isLive = true;
            }

            if (playerConfig.isAutoStart() && !runedAutoStart) {
                OvenPlayerConsole.log("DASH : AUTOPLAY()!");
                that.play();
                runedAutoStart = true;
            }
        });

        that.play = function (mutedPlay) {

            var retryCount = 0;
            if (that.getState() === _constants.STATE_AD_PLAYING || that.getState() === _constants.STATE_AD_PAUSED) {} else {
                isDashMetaLoaded = false;
                dash.attachView(element);
            }
            //Dash can infinite loading when player is in a paused state for a long time.
            //Then dash always have to reload(attachView) and wait for MetaLoaded event when resume.
            (function checkDashMetaLoaded() {
                retryCount++;
                if (isDashMetaLoaded) {
                    superPlay_func(mutedPlay);
                } else {

                    if (retryCount < 300) {
                        setTimeout(checkDashMetaLoaded, 100);
                    } else {
                        that.play();
                    }
                }
            })();
        };

        that.setCurrentQuality = function (qualityIndex) {
            if (that.getState() !== _constants.STATE_PLAYING) {
                that.play();
            }
            spec.currentQuality = qualityIndex;
            if (coveredGetAutoSwitchQualityFor()) {
                coveredSetAutoSwitchQualityFor(false);
            }
            dash.setQualityFor("video", qualityIndex);
            return spec.currentQuality;
        };
        that.isAutoQuality = function () {
            return coveredGetAutoSwitchQualityFor();
        };
        that.setAutoQuality = function (isAuto) {
            coveredSetAutoSwitchQualityFor(isAuto);
        };
        that.destroy = function () {
            dash.reset();
            OvenPlayerConsole.log("DASH : PROVIDER DESTROYED.");
            superDestroy_func();
        };
    } catch (error) {

        if (error && error.code && error.code === _constants.INIT_DASH_UNSUPPORT) {
            throw error;
        } else {
            var tempError = _constants.ERRORS.codes[_constants.INIT_DASH_NOTFOUND];
            tempError.error = error;
            throw tempError;
        }
    }

    return that;
};

exports["default"] = Dash;

/***/ }),

/***/ "./src/js/utils/sizeHumanizer.js":
/*!***************************************!*\
  !*** ./src/js/utils/sizeHumanizer.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 11. 14..
 */

var sizeHumanizer = function sizeHumanizer(bytes, si, postpix) {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var unit = postpix || "B";
    var units = ['k' + unit, 'M' + unit, 'G' + unit, 'T' + unit, 'P' + unit, 'E' + unit, 'Z' + unit, 'Y' + unit];
    // ? ['kB','MB','GB','TB','PB','EB','ZB','YB']: ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + units[u];
};

exports['default'] = sizeHumanizer;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvRGFzaC5qcyIsIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL3V0aWxzL3NpemVIdW1hbml6ZXIuanMiXSwibmFtZXMiOlsiREFTSEVSUk9SIiwiRE9XTkxPQUQiLCJNQU5JRkVTVEVSUk9SIiwiRGFzaCIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsInRoYXQiLCJkYXNoIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlckRlc3Ryb3lfZnVuYyIsInNlZWtQb3NpdGlvbl9zZWMiLCJpc0Rhc2hNZXRhTG9hZGVkIiwicHJldkxMTGl2ZUR1cmF0aW9uIiwibG9hZFJldHJ5ZXIiLCJzb3VyY2VPZkZpbGUiLCJydW5lZEF1dG9TdGFydCIsImRhc2hqcyIsIlZlcnNpb24iLCJFUlJPUlMiLCJjb2RlcyIsIklOSVRfREFTSF9VTlNVUFBPUlQiLCJjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJpc0F1dG8iLCJ1cGRhdGVTZXR0aW5ncyIsInN0cmVhbWluZyIsImFiciIsImF1dG9Td2l0Y2hCaXRyYXRlIiwidmlkZW8iLCJzZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsInJlc3VsdCIsImdldFNldHRpbmdzIiwiZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJsaXZlRGVsYXlSZWR1Y2luZ0NhbGxiYWNrIiwiZHVyYXRpb24iLCJkdnJJbmZvIiwiZ2V0RGFzaE1ldHJpY3MiLCJnZXRDdXJyZW50RFZSSW5mbyIsImxpdmVEZWxheSIsImdldENvbmZpZyIsImxvd0xhdGVuY3lNcGRMaXZlRGVsYXkiLCJzZWVrIiwicmFuZ2UiLCJlbmQiLCJzdGFydCIsIk1lZGlhUGxheWVyIiwiY3JlYXRlIiwiaW5pdGlhbGl6ZSIsIndpbmRvdyIsIm9wX2Rhc2giLCJzcGVjIiwibmFtZSIsIlBST1ZJREVSX0RBU0giLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImZpbGUiLCJvZmYiLCJldmVudHMiLCJQTEFZQkFDS19QTEFZSU5HIiwibG93TGF0ZW5jeSIsImxvd0xhdGVuY3lFbmFibGVkIiwic2V0TG93TGF0ZW5jeUVuYWJsZWQiLCJzZXRMaXZlRGVsYXkiLCJvbiIsInVuZGVmaW5lZCIsImRlYnVnIiwibG9nTGV2ZWwiLCJEZWJ1ZyIsIkxPR19MRVZFTF9OT05FIiwicmV0cnlBdHRlbXB0cyIsIk1QRCIsImdldERlYnVnIiwic2V0TG9nVG9Ccm93c2VyQ29uc29sZSIsImF0dGFjaFNvdXJjZSIsImxvYWRpbmdSZXRyeUNvdW50IiwiRVJST1IiLCJlcnJvciIsImNvZGUiLCJlcnJvcnMiLCJET1dOTE9BRF9FUlJPUl9JRF9NQU5JRkVTVF9DT0RFIiwiTUFOSUZFU1RfTE9BREVSX0xPQURJTkdfRkFJTFVSRV9FUlJPUl9DT0RFIiwic2V0U3RhdGUiLCJTVEFURV9MT0FESU5HIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInRlbXBFcnJvciIsIlBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IiLCJRVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQiLCJldmVudCIsIm1lZGlhVHlwZSIsInRyaWdnZXIiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJ0eXBlIiwiUVVBTElUWV9DSEFOR0VfUkVOREVSRUQiLCJuZXdRdWFsaXR5IiwiUExBWUJBQ0tfTUVUQURBVEFfTE9BREVEIiwiZ2V0UXVhbGl0eUZvciIsImdldEJpdHJhdGVJbmZvTGlzdEZvciIsInN1YlF1YWxpdHlMaXN0IiwiaSIsImxlbmd0aCIsIl8iLCJmaW5kV2hlcmUiLCJiaXRyYXRlIiwiaGVpZ2h0Iiwid2lkdGgiLCJwdXNoIiwiaW5kZXgiLCJxdWFsaXR5SW5kZXgiLCJsYWJlbCIsImlzQXV0b1N0YXJ0IiwiaXNEeW5hbWljIiwicGxheSIsIm11dGVkUGxheSIsInJldHJ5Q291bnQiLCJnZXRTdGF0ZSIsIlNUQVRFX0FEX1BMQVlJTkciLCJTVEFURV9BRF9QQVVTRUQiLCJhdHRhY2hWaWV3IiwiY2hlY2tEYXNoTWV0YUxvYWRlZCIsInNldEN1cnJlbnRRdWFsaXR5IiwiU1RBVEVfUExBWUlORyIsInNldFF1YWxpdHlGb3IiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJkZXN0cm95IiwicmVzZXQiLCJJTklUX0RBU0hfTk9URk9VTkQiLCJzaXplSHVtYW5pemVyIiwiYnl0ZXMiLCJzaSIsInBvc3RwaXgiLCJ0aHJlc2giLCJNYXRoIiwiYWJzIiwidW5pdCIsInVuaXRzIiwidSIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQVlBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7QUFyQkE7OztBQTBCQSxJQUFNQSxZQUFZO0FBQ2RDLGNBQVUsVUFESTtBQUVkQyxtQkFBZTtBQUZELENBQWxCO0FBSUEsSUFBTUMsT0FBTyxTQUFQQSxJQUFPLENBQVVDLE9BQVYsRUFBbUJDLFlBQW5CLEVBQWlDQyxRQUFqQyxFQUEyQzs7QUFFcEQsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsT0FBTyxJQUFYO0FBQ0EsUUFBSUMsaUJBQWlCLElBQXJCO0FBQ0EsUUFBSUMsb0JBQW9CLElBQXhCO0FBQ0EsUUFBSUMsbUJBQW1CLENBQXZCO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMscUJBQXFCLElBQXpCO0FBQ0EsUUFBSUMsY0FBYyxJQUFsQjtBQUNBLFFBQUlDLGVBQWUsRUFBbkI7QUFDQSxRQUFJQyxp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NEgsNkJBQWIsQ0FBaEI7QUFDQTFDLHNCQUFVVCxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBLGtCQUFNUyxTQUFOO0FBQ0g7QUFDSjs7QUFFRCxXQUFPL0YsSUFBUDtBQUNILENBM1ZEOztxQkE4VmVKLEk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNVhmOzs7O0FBSUEsSUFBTThJLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBVUMsS0FBVixFQUFpQkMsRUFBakIsRUFBcUJDLE9BQXJCLEVBQThCO0FBQ2hELFFBQUlDLFNBQVNGLEtBQUssSUFBTCxHQUFZLElBQXpCO0FBQ0EsUUFBR0csS0FBS0MsR0FBTCxDQUFTTCxLQUFULElBQWtCRyxNQUFyQixFQUE2QjtBQUN6QixlQUFPSCxRQUFRLElBQWY7QUFDSDtBQUNELFFBQUlNLE9BQU9KLFdBQVMsR0FBcEI7QUFDQSxRQUFJSyxRQUFRLENBQUMsTUFBSUQsSUFBTCxFQUFVLE1BQUlBLElBQWQsRUFBbUIsTUFBSUEsSUFBdkIsRUFBNEIsTUFBSUEsSUFBaEMsRUFBcUMsTUFBSUEsSUFBekMsRUFBOEMsTUFBSUEsSUFBbEQsRUFBdUQsTUFBSUEsSUFBM0QsRUFBZ0UsTUFBSUEsSUFBcEUsQ0FBWjtBQUNHO0FBQ0gsUUFBSUUsSUFBSSxDQUFDLENBQVQ7QUFDQSxPQUFHO0FBQ0NSLGlCQUFTRyxNQUFUO0FBQ0EsVUFBRUssQ0FBRjtBQUNILEtBSEQsUUFHUUosS0FBS0MsR0FBTCxDQUFTTCxLQUFULEtBQW1CRyxNQUFuQixJQUE2QkssSUFBSUQsTUFBTXBDLE1BQU4sR0FBZSxDQUh4RDtBQUlBLFdBQU82QixNQUFNUyxPQUFOLENBQWMsQ0FBZCxJQUFpQkYsTUFBTUMsQ0FBTixDQUF4QjtBQUNILENBZEQ7O3FCQWdCZVQsYSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTQuLlxyXG4gKi9cclxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcclxuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuaW1wb3J0IHNpemVIdW1hbml6ZXIgZnJvbSBcInV0aWxzL3NpemVIdW1hbml6ZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfQURfUExBWUlORyxcclxuICAgIFNUQVRFX0FEX1BBVVNFRCxcclxuICAgIElOSVRfREFTSF9VTlNVUFBPUlQsXHJcbiAgICBJTklUX0RBU0hfTk9URk9VTkQsXHJcbiAgICBFUlJPUlMsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SLFxyXG4gICAgQ09OVEVOVF9MRVZFTF9DSEFOR0VELFxyXG4gICAgUFJPVklERVJfREFTSFxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7U1RBVEVfTE9BRElOR30gZnJvbSBcIi4uLy4uLy4uL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcbmNvbnN0IERBU0hFUlJPUiA9IHtcclxuICAgIERPV05MT0FEOiBcImRvd25sb2FkXCIsXHJcbiAgICBNQU5JRkVTVEVSUk9SOiBcIm1hbmlmZXN0RXJyb3JcIlxyXG59O1xyXG5jb25zdCBEYXNoID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpIHtcclxuXHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGRhc2ggPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyUGxheV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XHJcbiAgICBsZXQgc2Vla1Bvc2l0aW9uX3NlYyA9IDA7XHJcbiAgICBsZXQgaXNEYXNoTWV0YUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgdmFyIHByZXZMTExpdmVEdXJhdGlvbiA9IG51bGw7XHJcbiAgICBsZXQgbG9hZFJldHJ5ZXIgPSBudWxsO1xyXG4gICAgbGV0IHNvdXJjZU9mRmlsZSA9IFwiXCI7XHJcbiAgICBsZXQgcnVuZWRBdXRvU3RhcnQgPSBmYWxzZTtcclxuXHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPCBcIjIuNi41XCIpIHtcclxuICAgICAgICAgICAgdGhyb3cgRVJST1JTLmNvZGVzW0lOSVRfREFTSF9VTlNVUFBPUlRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yID0gZnVuY3Rpb24gKGlzQXV0bykge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcclxuICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhYnI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Td2l0Y2hCaXRyYXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW86IGlzQXV0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpIHtcclxuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCBpc0F1dG8pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkYXNoLmdldFNldHRpbmdzKCkuc3RyZWFtaW5nLmFici5hdXRvU3dpdGNoQml0cmF0ZS52aWRlbztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXNoanMuVmVyc2lvbiA+IFwiMi45LjBcIikge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihcInZpZGVvXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgbGl2ZURlbGF5UmVkdWNpbmdDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXNoLmR1cmF0aW9uKCkgIT09IHByZXZMTExpdmVEdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcHJldkxMTGl2ZUR1cmF0aW9uID0gZGFzaC5kdXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkdnJJbmZvID0gZGFzaC5nZXREYXNoTWV0cmljcygpLmdldEN1cnJlbnREVlJJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGl2ZURlbGF5ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFsaXZlRGVsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXZlRGVsYXkgPSAzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRhc2guc2VlayhkdnJJbmZvLnJhbmdlLmVuZCAtIGR2ckluZm8ucmFuZ2Uuc3RhcnQgLSBsaXZlRGVsYXkpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZGFzaCA9IGRhc2hqcy5NZWRpYVBsYXllcigpLmNyZWF0ZSgpO1xyXG4gICAgICAgIGRhc2guaW5pdGlhbGl6ZShlbGVtZW50LCBudWxsLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5vcF9kYXNoID0gZGFzaDtcclxuXHJcbiAgICAgICAgbGV0IHNwZWMgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IFBST1ZJREVSX0RBU0gsXHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXHJcbiAgICAgICAgICAgIG1zZTogZGFzaCxcclxuICAgICAgICAgICAgbGlzdGVuZXI6IG51bGwsXHJcbiAgICAgICAgICAgIGlzTG9hZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY2FuU2VlazogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzTGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlZWtpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdGF0ZTogU1RBVEVfSURMRSxcclxuICAgICAgICAgICAgYnVmZmVyOiAwLFxyXG4gICAgICAgICAgICBmcmFtZXJhdGU6IDAsXHJcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiAtMSxcclxuICAgICAgICAgICAgY3VycmVudFNvdXJjZTogLTEsXHJcbiAgICAgICAgICAgIHF1YWxpdHlMZXZlbHM6IFtdLFxyXG4gICAgICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICAgICAgYWRUYWdVcmw6IGFkVGFnVXJsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24gKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbikge1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IEF0dGFjaCBGaWxlIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIgKyBsYXN0UGxheVBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcih0cnVlKTtcclxuICAgICAgICAgICAgc291cmNlT2ZGaWxlID0gc291cmNlLmZpbGU7XHJcblxyXG4gICAgICAgICAgICBkYXNoLm9mZihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlBMQVlCQUNLX1BMQVlJTkcsIGxpdmVEZWxheVJlZHVjaW5nQ2FsbGJhY2spO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNvdXJjZS5sb3dMYXRlbmN5ID09PSB0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcHJldkxMTGl2ZUR1cmF0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dMYXRlbmN5RW5hYmxlZDogc291cmNlLmxvd0xhdGVuY3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TG93TGF0ZW5jeUVuYWJsZWQoc291cmNlLmxvd0xhdGVuY3kpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheSAmJiB0eXBlb2YocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXkpID09PSAnbnVtYmVyJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXZlRGVsYXk6IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TGl2ZURlbGF5KHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlBMQVlCQUNLX1BMQVlJTkcsIGxpdmVEZWxheVJlZHVjaW5nQ2FsbGJhY2spO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dMYXRlbmN5RW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXZlRGVsYXk6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGFzaC5zZXRMb3dMYXRlbmN5RW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGFzaC5zZXRMaXZlRGVsYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nTGV2ZWw6IGRhc2hqcy5EZWJ1Zy5MT0dfTEVWRUxfTk9ORVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5QXR0ZW1wdHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1QRDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhc2guZ2V0RGVidWcoKS5zZXRMb2dUb0Jyb3dzZXJDb25zb2xlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGFzaC5hdHRhY2hTb3VyY2Uoc291cmNlT2ZGaWxlKTtcclxuXHJcbiAgICAgICAgICAgIHNlZWtQb3NpdGlvbl9zZWMgPSBsYXN0UGxheVBvc2l0aW9uO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3VwZXJQbGF5X2Z1bmMgPSB0aGF0LnN1cGVyKCdwbGF5Jyk7XHJcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuICAgICAgICBsZXQgbG9hZGluZ1JldHJ5Q291bnQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG9hZGluZ1JldHJ5Q291bnQ7XHJcblxyXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5FUlJPUiwgZnVuY3Rpb24gKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBIYW5kbGUgbXBkIGxvYWQgZXJyb3IuXHJcbiAgICAgICAgICAgIGlmIChlcnJvciAmJlxyXG4gICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmVycm9yLmNvZGUgPT09IGRhc2hqcy5NZWRpYVBsYXllci5lcnJvcnMuRE9XTkxPQURfRVJST1JfSURfTUFOSUZFU1RfQ09ERSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmVycm9yLmNvZGUgPT09IGRhc2hqcy5NZWRpYVBsYXllci5lcnJvcnMuTUFOSUZFU1RfTE9BREVSX0xPQURJTkdfRkFJTFVSRV9FUlJPUl9DT0RFXHJcbiAgICAgICAgICAgICAgICApKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRpbmdSZXRyeUNvdW50ID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZ1JldHJ5Q291bnQgPSBsb2FkaW5nUmV0cnlDb3VudCAtIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGFzaC5hdHRhY2hTb3VyY2Uoc291cmNlT2ZGaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKHRlbXBFcnJvciwgdGhhdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFUVVFU1RFRCwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC5tZWRpYVR5cGUgJiYgZXZlbnQubWVkaWFUeXBlID09PSBcInZpZGVvXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBzcGVjLmN1cnJlbnRRdWFsaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicmVxdWVzdFwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRU5ERVJFRCwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC5tZWRpYVR5cGUgJiYgZXZlbnQubWVkaWFUeXBlID09PSBcInZpZGVvXCIpIHtcclxuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBldmVudC5uZXdRdWFsaXR5O1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCksXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IGV2ZW50Lm5ld1F1YWxpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZW5kZXJcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUF0dGVtcHRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNUEQ6IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUExBWUJBQ0tfTUVUQURBVEFfTE9BREVEICA6IFwiLCBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpW2Rhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpXSk7XHJcblxyXG4gICAgICAgICAgICBpc0Rhc2hNZXRhTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHN1YlF1YWxpdHlMaXN0ID0gZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJRdWFsaXR5TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfLmZpbmRXaGVyZShzcGVjLnF1YWxpdHlMZXZlbHMsIHtiaXRyYXRlOiBzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCwgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRofSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGVjLnF1YWxpdHlMZXZlbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpdHJhdGU6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBzdWJRdWFsaXR5TGlzdFtpXS5xdWFsaXR5SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCArIFwieFwiICsgc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0ICsgXCIsIFwiICsgc2l6ZUh1bWFuaXplcihzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCB0cnVlLCBcImJwc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzZWVrUG9zaXRpb25fc2VjKXtcclxuICAgICAgICAgICAgICAgIGRhc2guc2VlayhzZWVrUG9zaXRpb25fc2VjKTtcclxuICAgICAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXNoLmlzRHluYW1pYygpKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVjLmlzTGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpICYmICFydW5lZEF1dG9TdGFydCl7XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogQVVUT1BMQVkoKSFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIHJ1bmVkQXV0b1N0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhhdC5wbGF5ID0gKG11dGVkUGxheSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HIHx8IHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUEFVU0VEKSB7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXNEYXNoTWV0YUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZGFzaC5hdHRhY2hWaWV3KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vRGFzaCBjYW4gaW5maW5pdGUgbG9hZGluZyB3aGVuIHBsYXllciBpcyBpbiBhIHBhdXNlZCBzdGF0ZSBmb3IgYSBsb25nIHRpbWUuXHJcbiAgICAgICAgICAgIC8vVGhlbiBkYXNoIGFsd2F5cyBoYXZlIHRvIHJlbG9hZChhdHRhY2hWaWV3KSBhbmQgd2FpdCBmb3IgTWV0YUxvYWRlZCBldmVudCB3aGVuIHJlc3VtZS5cclxuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrRGFzaE1ldGFMb2FkZWQoKSB7XHJcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoTWV0YUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyUGxheV9mdW5jKG11dGVkUGxheSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0cnlDb3VudCA8IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRGFzaE1ldGFMb2FkZWQsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gcXVhbGl0eUluZGV4O1xyXG4gICAgICAgICAgICBpZiAoY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCkpIHtcclxuICAgICAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGFzaC5zZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiwgcXVhbGl0eUluZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XHJcbiAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBkYXNoLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xyXG4gICAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG5cclxuICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBlcnJvci5jb2RlID09PSBJTklUX0RBU0hfVU5TVVBQT1JUKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9EQVNIX05PVEZPVU5EXTtcclxuICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgIHRocm93IHRlbXBFcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaDtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTQuLlxyXG4gKi9cclxuXHJcbmNvbnN0IHNpemVIdW1hbml6ZXIgPSBmdW5jdGlvbiAoYnl0ZXMsIHNpLCBwb3N0cGl4KSB7XHJcbiAgICBsZXQgdGhyZXNoID0gc2kgPyAxMDAwIDogMTAyNDtcclxuICAgIGlmKE1hdGguYWJzKGJ5dGVzKSA8IHRocmVzaCkge1xyXG4gICAgICAgIHJldHVybiBieXRlcyArICcgQic7XHJcbiAgICB9XHJcbiAgICBsZXQgdW5pdCA9IHBvc3RwaXh8fFwiQlwiO1xyXG4gICAgbGV0IHVuaXRzID0gWydrJyt1bml0LCdNJyt1bml0LCdHJyt1bml0LCdUJyt1bml0LCdQJyt1bml0LCdFJyt1bml0LCdaJyt1bml0LCdZJyt1bml0XTtcclxuICAgICAgIC8vID8gWydrQicsJ01CJywnR0InLCdUQicsJ1BCJywnRUInLCdaQicsJ1lCJ106IFsnS2lCJywnTWlCJywnR2lCJywnVGlCJywnUGlCJywnRWlCJywnWmlCJywnWWlCJ107XHJcbiAgICBsZXQgdSA9IC0xO1xyXG4gICAgZG8ge1xyXG4gICAgICAgIGJ5dGVzIC89IHRocmVzaDtcclxuICAgICAgICArK3U7XHJcbiAgICB9IHdoaWxlKE1hdGguYWJzKGJ5dGVzKSA+PSB0aHJlc2ggJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpO1xyXG4gICAgcmV0dXJuIGJ5dGVzLnRvRml4ZWQoMSkrdW5pdHNbdV07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNpemVIdW1hbml6ZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==