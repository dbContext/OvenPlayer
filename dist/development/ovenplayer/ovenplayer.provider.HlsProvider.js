/*! ovenplayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (MIT) | Github : https://ovenplayer.com */
(window["webpackJsonpOvenPlayer"] = window["webpackJsonpOvenPlayer"] || []).push([["ovenplayer.provider.HlsProvider"],{

/***/ "./src/js/api/provider/html5/providers/Hls.js":
/*!****************************************************!*\
  !*** ./src/js/api/provider/html5/providers/Hls.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Provider = __webpack_require__(/*! api/provider/html5/Provider */ "./src/js/api/provider/html5/Provider.js");

var _Provider2 = _interopRequireDefault(_Provider);

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _constants2 = __webpack_require__(/*! ../../../constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   hlsjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

/**
 * Created by hoho on 2018. 6. 7..
 */
var HlsProvider = function HlsProvider(element, playerConfig, adTagUrl) {
    var that = {};
    var hls = null;
    var superPlay_func = null;
    var superStop_func = null;
    var superDestroy_func = null;
    var loadRetryer = null;
    var isManifestLoaded = false;
    var firstLoaded = false;

    try {

        var hlsConfig = {
            debug: false,
            maxBufferLength: 20,
            maxMaxBufferLength: 30,
            fragLoadingMaxRetry: 2,
            manifestLoadingMaxRetry: 2,
            levelLoadingMaxRetry: 2
        };

        var hlsConfigFromPlayerConfig = playerConfig.getConfig().hlsConfig;

        if (hlsConfigFromPlayerConfig) {

            for (var key in hlsConfigFromPlayerConfig) {
                hlsConfig[key] = hlsConfigFromPlayerConfig[key];
            }
        }

        hls = new Hls(hlsConfig);

        window.op_hls = hls;

        hls.attachMedia(element);

        var spec = {
            name: _constants.PROVIDER_HLS,
            element: element,
            mse: hls,
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

            OvenPlayerConsole.log("HLS : onExtendedLoad : ", source, "lastPlayPosition : " + lastPlayPosition);

            var loadingRetryCount = playerConfig.getConfig().loadingRetryCount;

            hls.loadSource(source.file);

            hls.once(Hls.Events.MANIFEST_LOADED, function (event, data) {

                isManifestLoaded = true;
            });

            hls.once(Hls.Events.LEVEL_LOADED, function (event, data) {

                firstLoaded = true;

                if (loadRetryer) {
                    clearTimeout(loadRetryer);
                    loadRetryer = null;
                }

                if (data.details.live) {
                    spec.isLive = true;
                } else {

                    if (lastPlayPosition && lastPlayPosition >= 0) {
                        that.seek(lastPlayPosition);
                    }
                }
                // if (playerConfig.isAutoStart()) {
                //     that.play();
                // }
            });

            hls.on(Hls.Events.ERROR, function (event, data) {

                if (data && data.networkDetails && data.networkDetails.status === 202) {

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    that.setState(_constants.STATE_LOADING);

                    loadRetryer = setTimeout(function () {

                        if (hls) {

                            that.stop();
                            hls.stopLoad();
                            hls.startLoad();
                            that.play();
                        }
                    }, 1000);
                } else {

                    hls.once(Hls.Events.FRAG_LOADING, function () {
                        that.setState(_constants.STATE_LOADING);
                    });

                    if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {

                        if (!data.fatal) {
                            // do nothing when non fatal media error. hlsjs will recover it automatically.
                            return;
                        }
                    }

                    if (loadingRetryCount > 0) {

                        that.setState(_constants.STATE_LOADING);

                        if (loadRetryer) {
                            clearTimeout(loadRetryer);
                            loadRetryer = null;
                        }

                        loadingRetryCount = loadingRetryCount - 1;

                        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {

                            loadRetryer = setTimeout(function () {

                                that.stop();

                                if (hls) {

                                    hls.stopLoad();
                                    hls.startLoad();
                                }

                                that.play();
                            }, 1000);
                        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {

                            loadRetryer = setTimeout(function () {

                                if (hls) {

                                    hls.recoverMediaError();
                                }

                                that.play();
                            }, 1000);
                        } else {

                            loadRetryer = setTimeout(function () {

                                that.stop();

                                if (hls) {

                                    hls.stopLoad();
                                    hls.startLoad();
                                }

                                that.play();
                            }, 1000);
                        }
                    } else {

                        var errorType = _constants2.PLAYER_UNKNWON_NETWORK_ERROR;

                        if (data && data.networkDetails && data.networkDetails.status === 400) {
                            errorType = _constants2.PLAYER_BAD_REQUEST_ERROR;
                        } else if (data && data.networkDetails && data.networkDetails.status === 403) {
                            errorType = _constants2.PLAYER_AUTH_FAILED_ERROR;
                        } else if (data && data.networkDetails && data.networkDetails.status === 406) {
                            errorType = _constants2.PLAYER_NOT_ACCEPTABLE_ERROR;
                        }

                        var tempError = _constants.ERRORS.codes[errorType];
                        tempError.error = data.details;
                        (0, _utils.errorTrigger)(tempError, that);
                    }
                }
            });

            that.on(_constants.PLAYER_STATE, function (data) {

                if (!firstLoaded && data.prevstate === _constants.STATE_LOADING && data.newstate === _constants.STATE_IDLE) {

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    if (hls) {

                        hls.stopLoad();
                    }
                }
            });
        });

        superPlay_func = that["super"]('play');
        superDestroy_func = that["super"]('destroy');
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");

        superStop_func = that["super"]('stop');

        that.play = function () {

            if (!isManifestLoaded) {
                var source = that.getSources()[that.getCurrentSource()].file;

                if (hls) {
                    hls.loadSource(source);
                }
            } else {
                superPlay_func();
            }
        };

        that.stop = function () {

            if (loadRetryer) {

                clearTimeout(loadRetryer);
                loadRetryer = null;
            }

            if (hls) {
                hls.stopLoad();
            }

            superStop_func();
        };

        that.destroy = function () {

            if (loadRetryer) {

                clearTimeout(loadRetryer);
                loadRetryer = null;
            }

            if (hls) {

                hls.destroy();
            }

            hls = null;
            OvenPlayerConsole.log("HLS : PROVIDER DESTROUYED.");
            superDestroy_func();
        };
    } catch (error) {
        var tempError = _constants.ERRORS.codes[_constants.INIT_HLSJS_NOTFOUND];
        tempError.error = error;
        throw tempError;
    }

    return that;
};

exports["default"] = HlsProvider;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSGxzLmpzIl0sIm5hbWVzIjpbIkhsc1Byb3ZpZGVyIiwiZWxlbWVudCIsInBsYXllckNvbmZpZyIsImFkVGFnVXJsIiwidGhhdCIsImhscyIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJTdG9wX2Z1bmMiLCJzdXBlckRlc3Ryb3lfZnVuYyIsImxvYWRSZXRyeWVyIiwiaXNNYW5pZmVzdExvYWRlZCIsImZpcnN0TG9hZGVkIiwiaGxzQ29uZmlnIiwiZGVidWciLCJtYXhCdWZmZXJMZW5ndGgiLCJtYXhNYXhCdWZmZXJMZW5ndGgiLCJmcmFnTG9hZGluZ01heFJldHJ5IiwibWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkiLCJsZXZlbExvYWRpbmdNYXhSZXRyeSIsImhsc0NvbmZpZ0Zyb21QbGF5ZXJDb25maWciLCJnZXRDb25maWciLCJrZXkiLCJIbHMiLCJ3aW5kb3ciLCJvcF9obHMiLCJhdHRhY2hNZWRpYSIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfSExTIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJsb2FkaW5nUmV0cnlDb3VudCIsImxvYWRTb3VyY2UiLCJmaWxlIiwib25jZSIsIkV2ZW50cyIsIk1BTklGRVNUX0xPQURFRCIsImV2ZW50IiwiZGF0YSIsIkxFVkVMX0xPQURFRCIsImNsZWFyVGltZW91dCIsImRldGFpbHMiLCJsaXZlIiwic2VlayIsIm9uIiwiRVJST1IiLCJuZXR3b3JrRGV0YWlscyIsInN0YXR1cyIsInNldFN0YXRlIiwiU1RBVEVfTE9BRElORyIsInNldFRpbWVvdXQiLCJzdG9wIiwic3RvcExvYWQiLCJzdGFydExvYWQiLCJwbGF5IiwiRlJBR19MT0FESU5HIiwidHlwZSIsIkVycm9yVHlwZXMiLCJNRURJQV9FUlJPUiIsImZhdGFsIiwiTkVUV09SS19FUlJPUiIsInJlY292ZXJNZWRpYUVycm9yIiwiZXJyb3JUeXBlIiwiUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUiIsIlBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUiIsIlBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUiIsIlBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUiIsInRlbXBFcnJvciIsIkVSUk9SUyIsImNvZGVzIiwiZXJyb3IiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJuZXdzdGF0ZSIsImdldFNvdXJjZXMiLCJnZXRDdXJyZW50U291cmNlIiwiZGVzdHJveSIsIklOSVRfSExTSlNfTk9URk9VTkQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7QUFDQTs7QUFNQTs7OztBQVNBOzs7Ozs7QUFwQkE7OztBQTJCQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBVUMsT0FBVixFQUFtQkMsWUFBbkIsRUFBaUNDLFFBQWpDLEVBQTJDO0FBQzNELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE1BQU0sSUFBVjtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLGNBQWMsSUFBbEI7QUFDQSxRQUFJQyxtQkFBbUIsS0FBdkI7QUFDQSxRQUFJQyxjQUFjLEtBQWxCOztBQUdBLFFBQUk7O0FBRUEsWUFBSUMsWUFBWTtBQUNaQyxtQkFBTyxLQURLO0FBRVpDLDZCQUFpQixFQUZMO0FBR1pDLGdDQUFvQixFQUhSO0FBSVpDLGlDQUFxQixDQUpUO0FBS1pDLHFDQUF5QixDQUxiO0FBTVpDLGtDQUFzQjtBQU5WLFNBQWhCOztBQVNBLFlBQUlDLDRCQUE0QmpCLGFBQWFrQixTQUFiLEdBQXlCUixTQUF6RDs7QUFFQSxZQUFJTyx5QkFBSixFQUErQjs7QUFFM0IsaUJBQUssSUFBSUUsR0FBVCxJQUFnQkYseUJBQWhCLEVBQTJDO0FBQ3ZDUCwwQkFBVVMsR0FBVixJQUFpQkYsMEJBQTBCRSxHQUExQixDQUFqQjtBQUNIO0FBQ0o7O0FBRURoQixjQUFNLElBQUlpQixHQUFKLENBQVFWLFNBQVIsQ0FBTjs7QUFFQVcsZUFBT0MsTUFBUCxHQUFnQm5CLEdBQWhCOztBQUVBQSxZQUFJb0IsV0FBSixDQUFnQnhCLE9BQWhCOztBQUVBLFlBQUl5QixPQUFPO0FBQ1BDLGtCQUFNQyx1QkFEQztBQUVQM0IscUJBQVNBLE9BRkY7QUFHUDRCLGlCQUFLeEIsR0FIRTtBQUlQeUIsc0JBQVUsSUFKSDtBQUtQQyxzQkFBVSxLQUxIO0FBTVBDLHFCQUFTLEtBTkY7QUFPUEMsb0JBQVEsS0FQRDtBQVFQQyxxQkFBUyxLQVJGO0FBU1BDLG1CQUFPQyxxQkFUQTtBQVVQQyxvQkFBUSxDQVZEO0FBV1BDLHVCQUFXLENBWEo7QUFZUEMsNEJBQWdCLENBQUMsQ0FaVjtBQWFQQywyQkFBZSxDQUFDLENBYlQ7QUFjUEMsMkJBQWUsRUFkUjtBQWVQQyxxQkFBUyxFQWZGO0FBZ0JQdkMsc0JBQVVBO0FBaEJILFNBQVg7O0FBbUJBQyxlQUFPLDJCQUFTc0IsSUFBVCxFQUFleEIsWUFBZixFQUE2QixVQUFVeUMsTUFBVixFQUFrQkMsZ0JBQWxCLEVBQW9DOztBQUVwRUMsOEJBQWtCQyxHQUFsQixDQUFzQix5QkFBdEIsRUFBaURILE1BQWpELEVBQXlELHdCQUF3QkMsZ0JBQWpGOztBQUVBLGdCQUFJRyxvQkFBb0I3QyxhQUFha0IsU0FBYixHQUF5QjJCLGlCQUFqRDs7QUFFQTFDLGdCQUFJMkMsVUFBSixDQUFlTCxPQUFPTSxJQUF0Qjs7QUFFQTVDLGdCQUFJNkMsSUFBSixDQUFTNUIsSUFBSTZCLE1BQUosQ0FBV0MsZUFBcEIsRUFBcUMsVUFBVUMsS0FBVixFQUFpQkMsSUFBakIsRUFBdUI7O0FBRXhENUMsbUNBQW1CLElBQW5CO0FBQ0gsYUFIRDs7QUFLQUwsZ0JBQUk2QyxJQUFKLENBQVM1QixJQUFJNkIsTUFBSixDQUFXSSxZQUFwQixFQUFrQyxVQUFVRixLQUFWLEVBQWlCQyxJQUFqQixFQUF1Qjs7QUFFckQzQyw4QkFBYyxJQUFkOztBQUVBLG9CQUFJRixXQUFKLEVBQWlCO0FBQ2IrQyxpQ0FBYS9DLFdBQWI7QUFDQUEsa0NBQWMsSUFBZDtBQUNIOztBQUVELG9CQUFJNkMsS0FBS0csT0FBTCxDQUFhQyxJQUFqQixFQUF1QjtBQUNuQmhDLHlCQUFLTyxNQUFMLEdBQWMsSUFBZDtBQUNILGlCQUZELE1BRU87O0FBRUgsd0JBQUlXLG9CQUFvQkEsb0JBQW9CLENBQTVDLEVBQStDO0FBQzNDeEMsNkJBQUt1RCxJQUFMLENBQVVmLGdCQUFWO0FBQ0g7QUFDSjtBQUNEO0FBQ0E7QUFDQTtBQUNILGFBcEJEOztBQXNCQXZDLGdCQUFJdUQsRUFBSixDQUFPdEMsSUFBSTZCLE1BQUosQ0FBV1UsS0FBbEIsRUFBeUIsVUFBVVIsS0FBVixFQUFpQkMsSUFBakIsRUFBdUI7O0FBRTVDLG9CQUFJQSxRQUFRQSxLQUFLUSxjQUFiLElBQStCUixLQUFLUSxjQUFMLENBQW9CQyxNQUFwQixLQUErQixHQUFsRSxFQUF1RTs7QUFFbkUsd0JBQUl0RCxXQUFKLEVBQWlCO0FBQ2IrQyxxQ0FBYS9DLFdBQWI7QUFDQUEsc0NBQWMsSUFBZDtBQUNIOztBQUVETCx5QkFBSzRELFFBQUwsQ0FBY0Msd0JBQWQ7O0FBRUF4RCxrQ0FBY3lELFdBQVcsWUFBWTs7QUFFakMsNEJBQUk3RCxHQUFKLEVBQVM7O0FBRUxELGlDQUFLK0QsSUFBTDtBQUNBOUQsZ0NBQUkrRCxRQUFKO0FBQ0EvRCxnQ0FBSWdFLFNBQUo7QUFDQWpFLGlDQUFLa0UsSUFBTDtBQUNIO0FBRUoscUJBVmEsRUFVWCxJQVZXLENBQWQ7QUFZSCxpQkFyQkQsTUFxQk87O0FBRUhqRSx3QkFBSTZDLElBQUosQ0FBUzVCLElBQUk2QixNQUFKLENBQVdvQixZQUFwQixFQUFrQyxZQUFZO0FBQzFDbkUsNkJBQUs0RCxRQUFMLENBQWNDLHdCQUFkO0FBQ0gscUJBRkQ7O0FBSUEsd0JBQUlYLEtBQUtrQixJQUFMLEtBQWNsRCxJQUFJbUQsVUFBSixDQUFlQyxXQUFqQyxFQUE4Qzs7QUFFMUMsNEJBQUksQ0FBQ3BCLEtBQUtxQixLQUFWLEVBQWlCO0FBQ2I7QUFDQTtBQUNIO0FBQ0o7O0FBRUQsd0JBQUk1QixvQkFBb0IsQ0FBeEIsRUFBMkI7O0FBRXZCM0MsNkJBQUs0RCxRQUFMLENBQWNDLHdCQUFkOztBQUVBLDRCQUFJeEQsV0FBSixFQUFpQjtBQUNiK0MseUNBQWEvQyxXQUFiO0FBQ0FBLDBDQUFjLElBQWQ7QUFDSDs7QUFFRHNDLDRDQUFvQkEsb0JBQW9CLENBQXhDOztBQUVBLDRCQUFJTyxLQUFLa0IsSUFBTCxLQUFjbEQsSUFBSW1ELFVBQUosQ0FBZUcsYUFBakMsRUFBZ0Q7O0FBRTVDbkUsMENBQWN5RCxXQUFXLFlBQVk7O0FBRWpDOUQscUNBQUsrRCxJQUFMOztBQUVBLG9DQUFJOUQsR0FBSixFQUFTOztBQUVMQSx3Q0FBSStELFFBQUo7QUFDQS9ELHdDQUFJZ0UsU0FBSjtBQUNIOztBQUVEakUscUNBQUtrRSxJQUFMO0FBQ0gsNkJBWGEsRUFXWCxJQVhXLENBQWQ7QUFZSCx5QkFkRCxNQWNPLElBQUloQixLQUFLa0IsSUFBTCxLQUFjbEQsSUFBSW1ELFVBQUosQ0FBZUMsV0FBakMsRUFBOEM7O0FBRWpEakUsMENBQWN5RCxXQUFXLFlBQVk7O0FBRWpDLG9DQUFJN0QsR0FBSixFQUFTOztBQUVMQSx3Q0FBSXdFLGlCQUFKO0FBQ0g7O0FBRUR6RSxxQ0FBS2tFLElBQUw7QUFDSCw2QkFSYSxFQVFYLElBUlcsQ0FBZDtBQVNILHlCQVhNLE1BV0E7O0FBRUg3RCwwQ0FBY3lELFdBQVcsWUFBWTs7QUFFakM5RCxxQ0FBSytELElBQUw7O0FBRUEsb0NBQUk5RCxHQUFKLEVBQVM7O0FBRUxBLHdDQUFJK0QsUUFBSjtBQUNBL0Qsd0NBQUlnRSxTQUFKO0FBQ0g7O0FBRURqRSxxQ0FBS2tFLElBQUw7QUFDSCw2QkFYYSxFQVdYLElBWFcsQ0FBZDtBQVlIO0FBRUoscUJBcERELE1Bb0RPOztBQUVILDRCQUFJUSxZQUFZQyx3Q0FBaEI7O0FBRUEsNEJBQUl6QixRQUFRQSxLQUFLUSxjQUFiLElBQStCUixLQUFLUSxjQUFMLENBQW9CQyxNQUFwQixLQUErQixHQUFsRSxFQUF1RTtBQUNuRWUsd0NBQVlFLG9DQUFaO0FBQ0gseUJBRkQsTUFFTyxJQUFJMUIsUUFBUUEsS0FBS1EsY0FBYixJQUErQlIsS0FBS1EsY0FBTCxDQUFvQkMsTUFBcEIsS0FBK0IsR0FBbEUsRUFBdUU7QUFDMUVlLHdDQUFZRyxvQ0FBWjtBQUNILHlCQUZNLE1BRUEsSUFBSTNCLFFBQVFBLEtBQUtRLGNBQWIsSUFBK0JSLEtBQUtRLGNBQUwsQ0FBb0JDLE1BQXBCLEtBQStCLEdBQWxFLEVBQXVFO0FBQzFFZSx3Q0FBWUksdUNBQVo7QUFDSDs7QUFFRCw0QkFBSUMsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYVAsU0FBYixDQUFoQjtBQUNBSyxrQ0FBVUcsS0FBVixHQUFrQmhDLEtBQUtHLE9BQXZCO0FBQ0EsaURBQWEwQixTQUFiLEVBQXdCL0UsSUFBeEI7QUFDSDtBQUNKO0FBQ0osYUExR0Q7O0FBNEdBQSxpQkFBS3dELEVBQUwsQ0FBUTJCLHVCQUFSLEVBQXNCLFVBQVVqQyxJQUFWLEVBQWdCOztBQUVsQyxvQkFBSSxDQUFDM0MsV0FBRCxJQUFnQjJDLEtBQUtrQyxTQUFMLEtBQW1CdkIsd0JBQW5DLElBQW9EWCxLQUFLbUMsUUFBTCxLQUFrQnJELHFCQUExRSxFQUFzRjs7QUFFbEYsd0JBQUkzQixXQUFKLEVBQWlCO0FBQ2IrQyxxQ0FBYS9DLFdBQWI7QUFDQUEsc0NBQWMsSUFBZDtBQUNIOztBQUVELHdCQUFJSixHQUFKLEVBQVM7O0FBRUxBLDRCQUFJK0QsUUFBSjtBQUNIO0FBQ0o7QUFDSixhQWREO0FBZUgsU0E5Sk0sQ0FBUDs7QUFnS0E5RCx5QkFBaUJGLGNBQVcsTUFBWCxDQUFqQjtBQUNBSSw0QkFBb0JKLGNBQVcsU0FBWCxDQUFwQjtBQUNBeUMsMEJBQWtCQyxHQUFsQixDQUFzQixzQkFBdEI7O0FBRUF2Qyx5QkFBaUJILGNBQVcsTUFBWCxDQUFqQjs7QUFFQUEsYUFBS2tFLElBQUwsR0FBWSxZQUFNOztBQUVkLGdCQUFJLENBQUM1RCxnQkFBTCxFQUF1QjtBQUNuQixvQkFBSWlDLFNBQVN2QyxLQUFLc0YsVUFBTCxHQUFrQnRGLEtBQUt1RixnQkFBTCxFQUFsQixFQUEyQzFDLElBQXhEOztBQUVBLG9CQUFJNUMsR0FBSixFQUFTO0FBQ0xBLHdCQUFJMkMsVUFBSixDQUFlTCxNQUFmO0FBQ0g7QUFFSixhQVBELE1BT087QUFDSHJDO0FBQ0g7QUFFSixTQWJEOztBQWVBRixhQUFLK0QsSUFBTCxHQUFZLFlBQU07O0FBRWQsZ0JBQUkxRCxXQUFKLEVBQWlCOztBQUViK0MsNkJBQWEvQyxXQUFiO0FBQ0FBLDhCQUFjLElBQWQ7QUFDSDs7QUFFRCxnQkFBSUosR0FBSixFQUFTO0FBQ0xBLG9CQUFJK0QsUUFBSjtBQUNIOztBQUVEN0Q7QUFDSCxTQWJEOztBQWVBSCxhQUFLd0YsT0FBTCxHQUFlLFlBQU07O0FBRWpCLGdCQUFJbkYsV0FBSixFQUFpQjs7QUFFYitDLDZCQUFhL0MsV0FBYjtBQUNBQSw4QkFBYyxJQUFkO0FBQ0g7O0FBRUQsZ0JBQUlKLEdBQUosRUFBUzs7QUFFTEEsb0JBQUl1RixPQUFKO0FBQ0g7O0FBRUR2RixrQkFBTSxJQUFOO0FBQ0F3Qyw4QkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNBdEM7QUFDSCxTQWhCRDtBQWlCSCxLQWxRRCxDQWtRRSxPQUFPOEUsS0FBUCxFQUFjO0FBQ1osWUFBSUgsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYVEsOEJBQWIsQ0FBaEI7QUFDQVYsa0JBQVVHLEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0EsY0FBTUgsU0FBTjtBQUNIOztBQUVELFdBQU8vRSxJQUFQO0FBQ0gsQ0FwUkQ7O3FCQXVSZUosVyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiA3Li5cclxuICovXHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBQUk9WSURFUl9ITFMsXHJcbiAgICBQTEFZRVJfU1RBVEUsIFNUQVRFX0lETEUsIFNUQVRFX0xPQURJTkcsIEVSUk9SUyxcclxuICAgIElOSVRfSExTSlNfTk9URk9VTkRcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcclxuICAgIFBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUixcclxuICAgIFBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUixcclxuICAgIFBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUlxyXG59IGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBobHNqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgSGxzUHJvdmlkZXIgPSBmdW5jdGlvbiAoZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCkge1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIGxldCBobHMgPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyUGxheV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBzdXBlclN0b3BfZnVuYyA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xyXG4gICAgbGV0IGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgIGxldCBpc01hbmlmZXN0TG9hZGVkID0gZmFsc2U7XHJcbiAgICBsZXQgZmlyc3RMb2FkZWQgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgbGV0IGhsc0NvbmZpZyA9IHtcclxuICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxyXG4gICAgICAgICAgICBtYXhCdWZmZXJMZW5ndGg6IDIwLFxyXG4gICAgICAgICAgICBtYXhNYXhCdWZmZXJMZW5ndGg6IDMwLFxyXG4gICAgICAgICAgICBmcmFnTG9hZGluZ01heFJldHJ5OiAyLFxyXG4gICAgICAgICAgICBtYW5pZmVzdExvYWRpbmdNYXhSZXRyeTogMixcclxuICAgICAgICAgICAgbGV2ZWxMb2FkaW5nTWF4UmV0cnk6IDJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZyA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5obHNDb25maWc7XHJcblxyXG4gICAgICAgIGlmIChobHNDb25maWdGcm9tUGxheWVyQ29uZmlnKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgaGxzQ29uZmlnW2tleV0gPSBobHNDb25maWdGcm9tUGxheWVyQ29uZmlnW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhscyA9IG5ldyBIbHMoaGxzQ29uZmlnKTtcclxuXHJcbiAgICAgICAgd2luZG93Lm9wX2hscyA9IGhscztcclxuXHJcbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICAgICAgbmFtZTogUFJPVklERVJfSExTLFxyXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICBtc2U6IGhscyxcclxuICAgICAgICAgICAgbGlzdGVuZXI6IG51bGwsXHJcbiAgICAgICAgICAgIGlzTG9hZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY2FuU2VlazogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzTGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlZWtpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdGF0ZTogU1RBVEVfSURMRSxcclxuICAgICAgICAgICAgYnVmZmVyOiAwLFxyXG4gICAgICAgICAgICBmcmFtZXJhdGU6IDAsXHJcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiAtMSxcclxuICAgICAgICAgICAgY3VycmVudFNvdXJjZTogLTEsXHJcbiAgICAgICAgICAgIHF1YWxpdHlMZXZlbHM6IFtdLFxyXG4gICAgICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICAgICAgYWRUYWdVcmw6IGFkVGFnVXJsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24gKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbikge1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIiArIGxhc3RQbGF5UG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGxvYWRpbmdSZXRyeUNvdW50ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvYWRpbmdSZXRyeUNvdW50O1xyXG5cclxuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xyXG5cclxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5NQU5JRkVTVF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlzTWFuaWZlc3RMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGhscy5vbmNlKEhscy5FdmVudHMuTEVWRUxfTE9BREVELCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmaXJzdExvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGV0YWlscy5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RQbGF5UG9zaXRpb24gJiYgbGFzdFBsYXlQb3NpdGlvbiA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBobHMub24oSGxzLkV2ZW50cy5FUlJPUiwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gMjAyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhscykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBobHMub25jZShIbHMuRXZlbnRzLkZSQUdfTE9BRElORywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBIbHMuRXJyb3JUeXBlcy5NRURJQV9FUlJPUikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLmZhdGFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nIHdoZW4gbm9uIGZhdGFsIG1lZGlhIGVycm9yLiBobHNqcyB3aWxsIHJlY292ZXIgaXQgYXV0b21hdGljYWxseS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRpbmdSZXRyeUNvdW50ID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ1JldHJ5Q291bnQgPSBsb2FkaW5nUmV0cnlDb3VudCAtIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBIbHMuRXJyb3JUeXBlcy5ORVRXT1JLX0VSUk9SKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gSGxzLkVycm9yVHlwZXMuTUVESUFfRVJST1IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGxzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMucmVjb3Zlck1lZGlhRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3JUeXBlID0gUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlID0gUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGUgPSBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzICYmIGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSA0MDYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZSA9IFBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tlcnJvclR5cGVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBkYXRhLmRldGFpbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm9uKFBMQVlFUl9TVEFURSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWZpcnN0TG9hZGVkICYmIGRhdGEucHJldnN0YXRlID09PSBTVEFURV9MT0FESU5HICYmIGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX0lETEUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN1cGVyUGxheV9mdW5jID0gdGhhdC5zdXBlcigncGxheScpO1xyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuICAgICAgICBzdXBlclN0b3BfZnVuYyA9IHRoYXQuc3VwZXIoJ3N0b3AnKTtcclxuXHJcbiAgICAgICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc01hbmlmZXN0TG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gdGhhdC5nZXRTb3VyY2VzKClbdGhhdC5nZXRDdXJyZW50U291cmNlKCldLmZpbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGhscykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0LnN0b3AgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xyXG4gICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaGxzKSB7XHJcbiAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3VwZXJTdG9wX2Z1bmMoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xyXG4gICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaGxzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaGxzLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaGxzID0gbnVsbDtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogUFJPVklERVIgREVTVFJPVVlFRC5cIik7XHJcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tJTklUX0hMU0pTX05PVEZPVU5EXTtcclxuICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICB0aHJvdyB0ZW1wRXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGxzUHJvdmlkZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==