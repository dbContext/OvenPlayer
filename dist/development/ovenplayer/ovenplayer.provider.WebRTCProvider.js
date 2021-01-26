/*! ovenplayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (MIT) | Github : https://ovenplayer.com */
(window["webpackJsonpOvenPlayer"] = window["webpackJsonpOvenPlayer"] || []).push([["ovenplayer.provider.WebRTCProvider"],{

/***/ "./src/js/api/provider/html5/providers/WebRTC.js":
/*!*******************************************************!*\
  !*** ./src/js/api/provider/html5/providers/WebRTC.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Provider = __webpack_require__(/*! api/provider/html5/Provider */ "./src/js/api/provider/html5/Provider.js");

var _Provider2 = _interopRequireDefault(_Provider);

var _WebRTCLoader = __webpack_require__(/*! api/provider/html5/providers/WebRTCLoader */ "./src/js/api/provider/html5/providers/WebRTCLoader.js");

var _WebRTCLoader2 = _interopRequireDefault(_WebRTCLoader);

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   webrtc provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

var WebRTC = function WebRTC(element, playerConfig, adTagUrl) {
    var that = {};
    var webrtcLoader = null;
    var superDestroy_func = null;

    var spec = {
        name: _constants.PROVIDER_WEBRTC,
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

    that = (0, _Provider2["default"])(spec, playerConfig, function (source) {
        if ((0, _validator.isWebRTC)(source.file, source.type)) {
            OvenPlayerConsole.log("WEBRTC : onBeforeLoad : ", source);
            if (webrtcLoader) {
                webrtcLoader.destroy();
                webrtcLoader = null;
            }

            var loadCallback = function loadCallback(stream) {

                if (element.srcObject) {
                    element.srcObject = null;
                }

                element.srcObject = stream;
            };

            webrtcLoader = (0, _WebRTCLoader2["default"])(that, source.file, loadCallback, _utils.errorTrigger, playerConfig);

            webrtcLoader.connect(function () {
                //ToDo : resolve not workring
            })["catch"](function (error) {
                //that.destroy();
                //Do nothing
            });

            that.on(_constants.CONTENT_META, function () {
                if (playerConfig.isAutoStart()) {
                    // if (that.getState() !== 'error') {
                    //     that.play();
                    // }
                }
            }, that);
        }
    });
    superDestroy_func = that["super"]('destroy');

    OvenPlayerConsole.log("WEBRTC PROVIDER LOADED.");

    that.destroy = function () {
        if (webrtcLoader) {
            webrtcLoader.destroy();
            element.srcObject = null;
            webrtcLoader = null;
        }
        that.off(_constants.CONTENT_META, null, that);
        OvenPlayerConsole.log("WEBRTC :  PROVIDER DESTROYED.");

        superDestroy_func();
    };
    return that;
}; /**
    * Created by hoho on 2018. 6. 11..
    */
exports["default"] = WebRTC;

/***/ }),

/***/ "./src/js/api/provider/html5/providers/WebRTCLoader.js":
/*!*************************************************************!*\
  !*** ./src/js/api/provider/html5/providers/WebRTCLoader.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WebRTCLoader = function WebRTCLoader(provider, webSocketUrl, loadCallback, errorTrigger, playerConfig) {

    var defaultConnectionConfig = {};

    var that = {};

    var ws = null;

    var wsPing = null;

    var mainStream = null;

    // used for getting media stream from OME or host peer
    var mainPeerConnectionInfo = null;

    // used for send media stream to client peer.
    var clientPeerConnections = {};

    //closed websocket by ome or client.
    var wsClosedByPlayer = false;

    var recorverPacketLoss = true;

    if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.recorverPacketLoss === false) {

        recorverPacketLoss = playerConfig.getConfig().webrtcConfig.recorverPacketLoss;
    }

    var generatePublicCandidate = true;

    if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.generatePublicCandidate === false) {

        generatePublicCandidate = playerConfig.getConfig().webrtcConfig.generatePublicCandidate;
    }

    var statisticsTimer = null;

    var currentBrowser = (0, _browser.analUserAgent)();

    (function () {
        var existingHandler = window.onbeforeunload;
        window.onbeforeunload = function (event) {
            if (existingHandler) {
                existingHandler(event);
            }
            OvenPlayerConsole.log("This calls auto when browser closed.");
            closePeer();
        };
    })();

    function getPeerConnectionById(id) {

        var peerConnection = null;

        if (mainPeerConnectionInfo && id === mainPeerConnectionInfo.id) {
            peerConnection = mainPeerConnectionInfo.peerConnection;
        } else if (clientPeerConnections[id]) {
            peerConnection = clientPeerConnections[id].peerConnection;
        }

        return peerConnection;
    }

    function extractLossPacketsOnNetworkStatus(peerConnectionInfo) {

        if (peerConnectionInfo.statisticsTimer) {
            clearTimeout(peerConnectionInfo.statisticsTimer);
        }

        if (!peerConnectionInfo.status) {
            peerConnectionInfo.status = {};
            peerConnectionInfo.status.lostPacketsArr = [];
            peerConnectionInfo.status.slotLength = 8; //8 statistics. every 2 seconds
            peerConnectionInfo.status.prevPacketsLost = 0;
            peerConnectionInfo.status.avg8Losses = 0;
            peerConnectionInfo.status.avgMoreThanThresholdCount = 0; //If avg8Loss more than threshold.
            peerConnectionInfo.status.threshold = 40;
        }

        var lostPacketsArr = peerConnectionInfo.status.lostPacketsArr,
            slotLength = peerConnectionInfo.status.slotLength,
            //8 statistics. every 2 seconds
        prevPacketsLost = peerConnectionInfo.status.prevPacketsLost,
            avg8Losses = peerConnectionInfo.status.avg8Losses,

        // avgMoreThanThresholdCount = peerConnectionInfo.status.avgMoreThanThresholdCount,  //If avg8Loss more than threshold.
        threshold = peerConnectionInfo.status.threshold;

        peerConnectionInfo.statisticsTimer = setTimeout(function () {
            if (!peerConnectionInfo.peerConnection) {
                return false;
            }

            peerConnectionInfo.peerConnection.getStats().then(function (stats) {

                if (!stats) {
                    return;
                }

                if (playerConfig.getConfig().autoFallback && stats) {

                    stats.forEach(function (state) {

                        if (state.type === "inbound-rtp" && state.kind === 'video' && !state.isRemote) {

                            //(state.packetsLost - prevPacketsLost) is real current lost.

                            var actualPacketLost = parseInt(state.packetsLost) - parseInt(prevPacketsLost);

                            lostPacketsArr.push(parseInt(state.packetsLost) - parseInt(prevPacketsLost));

                            if (lostPacketsArr.length > slotLength) {

                                lostPacketsArr.shift();
                            }

                            if (lostPacketsArr.length === slotLength) {

                                avg8Losses = _underscore2["default"].reduce(lostPacketsArr, function (memo, num) {
                                    return memo + num;
                                }, 0) / slotLength;
                                OvenPlayerConsole.log("Last8 LOST PACKET AVG  : " + avg8Losses, "Current Packet LOST: " + actualPacketLost, "Total Packet Lost: " + state.packetsLost, lostPacketsArr);

                                if (avg8Losses > threshold) {
                                    peerConnectionInfo.status.avgMoreThanThresholdCount = peerConnectionInfo.status.avgMoreThanThresholdCount + 1;
                                    if (peerConnectionInfo.status.avgMoreThanThresholdCount >= 60) {
                                        OvenPlayerConsole.log("NETWORK UNSTABLED!!! ");
                                        var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_NETWORK_SLOW];
                                        closePeer(tempError);
                                    }
                                } else {
                                    peerConnectionInfo.status.avgMoreThanThresholdCount = 0;
                                }
                            }
                            peerConnectionInfo.status.prevPacketsLost = state.packetsLost;
                        }
                    });

                    extractLossPacketsOnNetworkStatus(peerConnectionInfo);
                }
            });
        }, 2000);
    }

    function createMainPeerConnection(id, peerId, sdp, candidates, iceServers, resolve) {

        var peerConnectionConfig = {};

        // first priority using ice servers from player setting.
        if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.iceServers) {

            peerConnectionConfig.iceServers = playerConfig.getConfig().webrtcConfig.iceServers;

            if (playerConfig.getConfig().webrtcConfig.iceTransportPolicy) {

                peerConnectionConfig.iceTransportPolicy = playerConfig.getConfig().webrtcConfig.iceTransportPolicy;
            }
        } else if (iceServers) {

            // second priority using ice servers from ome and force using TCP
            peerConnectionConfig.iceServers = [];

            for (var i = 0; i < iceServers.length; i++) {

                var iceServer = iceServers[i];

                var regIceServer = {};

                regIceServer.urls = iceServer.urls;
                regIceServer.username = iceServer.user_name;
                regIceServer.credential = iceServer.credential;

                peerConnectionConfig.iceServers.push(regIceServer);
            }

            peerConnectionConfig.iceTransportPolicy = 'relay';
        } else {

            // last priority using default ice servers.
            peerConnectionConfig = defaultConnectionConfig;
        }

        OvenPlayerConsole.log("main peer connection config : ", peerConnectionConfig);

        var peerConnection = new RTCPeerConnection(peerConnectionConfig);

        mainPeerConnectionInfo = {
            id: id,
            peerId: peerId,
            peerConnection: peerConnection
        };

        //Set remote description when I received sdp from server.
        peerConnection.setRemoteDescription(new RTCSessionDescription(sdp)).then(function () {

            peerConnection.createAnswer().then(function (desc) {

                OvenPlayerConsole.log("create Host Answer : success");

                peerConnection.setLocalDescription(desc).then(function () {
                    // my SDP created.
                    var localSDP = peerConnection.localDescription;
                    OvenPlayerConsole.log('Local SDP', localSDP);

                    sendMessage(ws, {
                        id: id,
                        peer_id: peerId,
                        command: 'answer',
                        sdp: localSDP
                    });
                })["catch"](function (error) {

                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                });
            })["catch"](function (error) {
                var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_CREATE_ANSWER_ERROR];
                tempError.error = error;
                closePeer(tempError);
            });
        })["catch"](function (error) {
            var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
            tempError.error = error;
            closePeer(tempError);
        });

        if (candidates) {

            addIceCandidate(peerConnection, candidates);
        }

        peerConnection.onicecandidate = function (e) {
            if (e.candidate) {

                OvenPlayerConsole.log("WebRTCLoader send candidate to server : " + e.candidate);

                // console.log('Main Peer Connection candidate', e.candidate);

                sendMessage(ws, {
                    id: id,
                    peer_id: peerId,
                    command: "candidate",
                    candidates: [e.candidate]
                });
            }
        };
        peerConnection.onconnectionstatechange = function (e) {
            //iceConnectionState
            OvenPlayerConsole.log("[on connection state change]", peerConnection.connectionState, e);
        };
        peerConnection.oniceconnectionstatechange = function (e) {
            OvenPlayerConsole.log("[on ice connection state change]", peerConnection.iceConnectionState, e);

            /*
            * https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState
            * Checks to ensure that components are still connected failed for at least one component of the RTCPeerConnection. This is a less stringent test than "failed" and may trigger intermittently and resolve just as spontaneously on less reliable networks, or during temporary disconnections. When the problem resolves, the connection may return to the "connected" state.
            * */
            //This process is my imagination. I do not know how to reproduce.
            //Situation : OME is dead but ome can't send 'stop' message.
            if (peerConnection.iceConnectionState === 'disconnected' || peerConnection.iceConnectionState === 'closed') {
                if (!wsClosedByPlayer) {
                    if (mainPeerConnectionInfo) {
                        var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_UNEXPECTED_DISCONNECT];
                        closePeer(tempError);
                    }
                }
            }
        };
        peerConnection.ontrack = function (e) {

            OvenPlayerConsole.log("stream received.");

            OvenPlayerConsole.log('Recovery On Packet Loss :', recorverPacketLoss);

            if (recorverPacketLoss) {
                extractLossPacketsOnNetworkStatus(mainPeerConnectionInfo);
            }

            mainStream = e.streams[0];
            loadCallback(e.streams[0]);

            if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.playoutDelayHint) {

                var hint = playerConfig.getConfig().webrtcConfig.playoutDelayHint;

                var receivers = mainPeerConnectionInfo.peerConnection.getReceivers();

                for (var _i = 0; _i < receivers.length; _i++) {

                    var receiver = receivers[_i];

                    receiver.playoutDelayHint = hint;
                    OvenPlayerConsole.log("WebRTC playoutDelayHint", receiver, hint);
                }
            }
        };
    }

    function createClientPeerConnection(hostId, clientId) {

        if (!mainStream) {

            setTimeout(function () {

                createClientPeerConnection(hostId, clientId);
            }, 100);

            return;
        }

        var peerConnection = new RTCPeerConnection(defaultConnectionConfig);

        clientPeerConnections[clientId] = {
            id: clientId,
            peerId: hostId,
            peerConnection: peerConnection
        };

        peerConnection.addStream(mainStream);

        // let offerOption = {
        //     offerToReceiveAudio: 1,
        //     offerToReceiveVideo: 1
        // };

        peerConnection.createOffer(setLocalAndSendMessage, handleCreateOfferError, {});

        function setLocalAndSendMessage(sessionDescription) {
            peerConnection.setLocalDescription(sessionDescription);

            sendMessage(ws, {
                id: hostId,
                peer_id: clientId,
                sdp: sessionDescription,
                command: 'offer_p2p'
            });
        }

        function handleCreateOfferError(event) {}

        peerConnection.onicecandidate = function (e) {
            if (e.candidate) {
                OvenPlayerConsole.log("WebRTCLoader send candidate to server : " + e.candidate);

                // console.log('Client Peer Connection candidate', e.candidate);

                sendMessage(ws, {
                    id: hostId,
                    peer_id: clientId,
                    command: "candidate_p2p",
                    candidates: [e.candidate]
                });
            }
        };
    }

    var copyCandidate = function copyCandidate(basicCandidate) {

        var cloneCandidate = _underscore2["default"].clone(basicCandidate);

        function generateDomainFromUrl(url) {
            var result = '';
            var match = void 0;
            if (match = url.match(/^(?:wss?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
                result = match[1];
            }
            return result;
        }

        function findIp(candidate) {

            var result = '';
            var match = void 0;

            if (match = candidate.match(new RegExp("\\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b", 'gi'))) {
                result = match[0];
            }

            return result;
        }

        var newDomain = generateDomainFromUrl(webSocketUrl);
        var ip = findIp(cloneCandidate.candidate);

        if (ip === '' || ip === newDomain) {

            return null;
        }

        return new Promise(function (resolve, reject) {

            // firefox browser throws a candidate parsing exception when a domain name is set at the address property. So we resolve the dns using google dns resolve api.
            if (currentBrowser.browser === 'Firefox' && !findIp(newDomain)) {

                fetch('https://dns.google.com/resolve?name=' + newDomain).then(function (resp) {
                    return resp.json();
                }).then(function (data) {

                    if (data && data.Answer && data.Answer.length > 0) {

                        if (data.Answer[0].data) {

                            var relsolvedIp = data.Answer[0].data;

                            cloneCandidate.candidate = cloneCandidate.candidate.replace(ip, relsolvedIp);
                            resolve(cloneCandidate);
                        } else {

                            resolve(null);
                        }
                    } else {

                        resolve(null);
                    }
                });
            } else {

                cloneCandidate.candidate = cloneCandidate.candidate.replace(ip, newDomain);
                resolve(cloneCandidate);
            }
        });
    };

    function addIceCandidate(peerConnection, candidates) {

        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i] && candidates[i].candidate) {

                var basicCandidate = candidates[i];

                peerConnection.addIceCandidate(new RTCIceCandidate(basicCandidate)).then(function () {
                    OvenPlayerConsole.log("addIceCandidate : success");
                })["catch"](function (error) {
                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                });

                if (generatePublicCandidate) {

                    var cloneCandidatePromise = copyCandidate(basicCandidate);

                    if (cloneCandidatePromise) {
                        cloneCandidatePromise.then(function (cloneCandidate) {

                            if (cloneCandidate) {

                                peerConnection.addIceCandidate(new RTCIceCandidate(cloneCandidate)).then(function () {
                                    OvenPlayerConsole.log("cloned addIceCandidate : success");
                                })["catch"](function (error) {

                                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                                    tempError.error = error;
                                    closePeer(tempError);
                                });
                            }
                        });
                    }
                }
            }
        }
    }

    function initWebSocket(resolve, reject) {

        try {

            ws = new WebSocket(webSocketUrl);

            ws.onopen = function () {

                sendMessage(ws, {
                    command: "request_offer"
                });

                // wsPing = setInterval(function () {
                //
                //     sendMessage(ws, {command: "ping"});
                //
                // }, 20 * 1000);
            };

            ws.onmessage = function (e) {

                var message = JSON.parse(e.data);

                if (message.error) {
                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_WS_ERROR];
                    tempError.error = message.error;
                    closePeer(tempError);
                    return;
                }

                if (Object.keys(message).length === 0 && message.constructor === Object) {

                    OvenPlayerConsole.log('Empty Message');
                    return;
                }

                if (message.command === 'ping') {

                    sendMessage(ws, { command: 'pong' });
                    return;
                }

                if (!message.id) {

                    OvenPlayerConsole.log('ID must be not null');
                    return;
                }

                if (message.command === 'offer') {

                    createMainPeerConnection(message.id, message.peer_id, message.sdp, message.candidates, message.ice_servers, resolve);
                    if (message.peer_id === 0) {
                        provider.trigger(_constants.OME_P2P_MODE, false);
                    } else {
                        provider.trigger(_constants.OME_P2P_MODE, true);
                    }
                }

                if (message.command === 'request_offer_p2p') {

                    createClientPeerConnection(message.id, message.peer_id);
                }

                if (message.command === 'answer_p2p') {

                    var peerConnection1 = getPeerConnectionById(message.peer_id);

                    peerConnection1.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(function (desc) {})["catch"](function (error) {
                        var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
                        tempError.error = error;
                        closePeer(tempError);
                    });
                }

                if (message.command === 'candidate') {

                    // Candidates for new client peer
                    var peerConnection2 = getPeerConnectionById(message.id);

                    addIceCandidate(peerConnection2, message.candidates);
                }

                if (message.command === 'candidate_p2p') {

                    // Candidates for new client peer
                    var peerConnection3 = getPeerConnectionById(message.peer_id);

                    addIceCandidate(peerConnection3, message.candidates);
                }

                if (message.command === 'stop') {

                    if (mainPeerConnectionInfo.peerId === message.peer_id) {

                        //My parent was dead. And then I will retry.

                        // close connection with host and retry
                        // console.log('close connection with host');

                        mainStream = null;
                        mainPeerConnectionInfo.peerConnection.close();
                        mainPeerConnectionInfo = null;

                        //resetCallback();
                        provider.pause();

                        sendMessage(ws, {
                            command: 'request_offer'
                        });
                    } else {

                        // close connection with client
                        if (clientPeerConnections[message.peer_id]) {
                            // console.log('close connection with client: ', message.peer_id);
                            clientPeerConnections[message.peer_id].peerConnection.close();
                            delete clientPeerConnections[message.peer_id];
                        }
                    }
                }
            };
            ws.onclose = function () {

                if (!wsClosedByPlayer) {

                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_WS_ERROR];

                    if (mainPeerConnectionInfo) {
                        tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_UNEXPECTED_DISCONNECT];
                    }

                    closePeer(tempError);
                }
            };

            ws.onerror = function (error) {

                //Why Edge Browser calls onerror() when ws.close()?
                if (!wsClosedByPlayer) {
                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_WS_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                    // reject(error);
                }
            };
        } catch (error) {

            closePeer(error);
        }
    }

    function initialize() {

        OvenPlayerConsole.log("WebRTCLoader connecting...");

        return new Promise(function (resolve, reject) {

            OvenPlayerConsole.log("WebRTCLoader url : " + webSocketUrl);

            initWebSocket(resolve, reject);
        });
    }

    function closePeer(error) {

        OvenPlayerConsole.log('WebRTC Loader closePeer()');

        if (!error) {
            wsClosedByPlayer = true;
        }

        if (mainPeerConnectionInfo) {

            if (mainPeerConnectionInfo.statisticsTimer) {
                clearTimeout(mainPeerConnectionInfo.statisticsTimer);
            }

            mainStream = null;

            OvenPlayerConsole.log('Closing main peer connection...');
            if (statisticsTimer) {
                clearTimeout(statisticsTimer);
            }

            if (mainPeerConnectionInfo.peerConnection) {

                mainPeerConnectionInfo.peerConnection.close();
            }

            mainPeerConnectionInfo.peerConnection = null;
            mainPeerConnectionInfo = null;
        }

        if (Object.keys(clientPeerConnections).length > 0) {

            for (var clientId in clientPeerConnections) {

                var clientPeerConnection = clientPeerConnections[clientId].peerConnection;

                if (clientPeerConnection) {
                    OvenPlayerConsole.log('Closing client peer connection...');
                    clientPeerConnection.close();
                    clientPeerConnection = null;
                }
            }

            clientPeerConnections = {};
        }

        clearInterval(wsPing);
        wsPing = null;

        if (ws) {
            OvenPlayerConsole.log('Closing websocket connection...');
            OvenPlayerConsole.log("Send Signaling : Stop.");
            /*
            0 (CONNECTING)
            1 (OPEN)
            2 (CLOSING)
            3 (CLOSED)
            */
            if (ws.readyState === 0 || ws.readyState === 1) {

                wsClosedByPlayer = true;

                if (mainPeerConnectionInfo) {
                    sendMessage(ws, {
                        command: 'stop',
                        id: mainPeerConnectionInfo.id
                    });
                }

                ws.close();
            }
        } else {
            wsClosedByPlayer = false;
        }

        ws = null;

        if (error) {
            errorTrigger(error, provider);
        }
    }

    function sendMessage(ws, message) {

        if (ws) {
            ws.send(JSON.stringify(message));
        }
    }

    that.connect = function () {
        return initialize();
    };

    that.destroy = function () {
        closePeer();
    };

    return that;
};

exports["default"] = WebRTCLoader;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDLmpzIiwid2VicGFjazovL092ZW5QbGF5ZXIvLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVENMb2FkZXIuanMiXSwibmFtZXMiOlsiV2ViUlRDIiwiZWxlbWVudCIsInBsYXllckNvbmZpZyIsImFkVGFnVXJsIiwidGhhdCIsIndlYnJ0Y0xvYWRlciIsInN1cGVyRGVzdHJveV9mdW5jIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9XRUJSVEMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImZpbGUiLCJ0eXBlIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJkZXN0cm95IiwibG9hZENhbGxiYWNrIiwic3RyZWFtIiwic3JjT2JqZWN0IiwiZXJyb3JUcmlnZ2VyIiwiY29ubmVjdCIsImVycm9yIiwib24iLCJDT05URU5UX01FVEEiLCJpc0F1dG9TdGFydCIsIm9mZiIsIldlYlJUQ0xvYWRlciIsInByb3ZpZGVyIiwid2ViU29ja2V0VXJsIiwiZGVmYXVsdENvbm5lY3Rpb25Db25maWciLCJ3cyIsIndzUGluZyIsIm1haW5TdHJlYW0iLCJtYWluUGVlckNvbm5lY3Rpb25JbmZvIiwiY2xpZW50UGVlckNvbm5lY3Rpb25zIiwid3NDbG9zZWRCeVBsYXllciIsInJlY29ydmVyUGFja2V0TG9zcyIsImdldENvbmZpZyIsIndlYnJ0Y0NvbmZpZyIsImdlbmVyYXRlUHVibGljQ2FuZGlkYXRlIiwic3RhdGlzdGljc1RpbWVyIiwiY3VycmVudEJyb3dzZXIiLCJleGlzdGluZ0hhbmRsZXIiLCJ3aW5kb3ciLCJvbmJlZm9yZXVubG9hZCIsImV2ZW50IiwiY2xvc2VQZWVyIiwiZ2V0UGVlckNvbm5lY3Rpb25CeUlkIiwiaWQiLCJwZWVyQ29ubmVjdGlvbiIsImV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyIsInBlZXJDb25uZWN0aW9uSW5mbyIsImNsZWFyVGltZW91dCIsInN0YXR1cyIsImxvc3RQYWNrZXRzQXJyIiwic2xvdExlbmd0aCIsInByZXZQYWNrZXRzTG9zdCIsImF2ZzhMb3NzZXMiLCJhdmdNb3JlVGhhblRocmVzaG9sZENvdW50IiwidGhyZXNob2xkIiwic2V0VGltZW91dCIsImdldFN0YXRzIiwidGhlbiIsInN0YXRzIiwiYXV0b0ZhbGxiYWNrIiwiZm9yRWFjaCIsImtpbmQiLCJpc1JlbW90ZSIsImFjdHVhbFBhY2tldExvc3QiLCJwYXJzZUludCIsInBhY2tldHNMb3N0IiwicHVzaCIsImxlbmd0aCIsInNoaWZ0IiwiXyIsInJlZHVjZSIsIm1lbW8iLCJudW0iLCJ0ZW1wRXJyb3IiLCJFUlJPUlMiLCJjb2RlcyIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiY3JlYXRlTWFpblBlZXJDb25uZWN0aW9uIiwicGVlcklkIiwic2RwIiwiY2FuZGlkYXRlcyIsImljZVNlcnZlcnMiLCJyZXNvbHZlIiwicGVlckNvbm5lY3Rpb25Db25maWciLCJpY2VUcmFuc3BvcnRQb2xpY3kiLCJpIiwiaWNlU2VydmVyIiwicmVnSWNlU2VydmVyIiwidXJscyIsInVzZXJuYW1lIiwidXNlcl9uYW1lIiwiY3JlZGVudGlhbCIsIlJUQ1BlZXJDb25uZWN0aW9uIiwic2V0UmVtb3RlRGVzY3JpcHRpb24iLCJSVENTZXNzaW9uRGVzY3JpcHRpb24iLCJjcmVhdGVBbnN3ZXIiLCJkZXNjIiwic2V0TG9jYWxEZXNjcmlwdGlvbiIsImxvY2FsU0RQIiwibG9jYWxEZXNjcmlwdGlvbiIsInNlbmRNZXNzYWdlIiwicGVlcl9pZCIsImNvbW1hbmQiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJhZGRJY2VDYW5kaWRhdGUiLCJvbmljZWNhbmRpZGF0ZSIsImUiLCJjYW5kaWRhdGUiLCJvbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsImNvbm5lY3Rpb25TdGF0ZSIsIm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlIiwiaWNlQ29ubmVjdGlvblN0YXRlIiwiUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QiLCJvbnRyYWNrIiwic3RyZWFtcyIsInBsYXlvdXREZWxheUhpbnQiLCJoaW50IiwicmVjZWl2ZXJzIiwiZ2V0UmVjZWl2ZXJzIiwicmVjZWl2ZXIiLCJjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbiIsImhvc3RJZCIsImNsaWVudElkIiwiYWRkU3RyZWFtIiwiY3JlYXRlT2ZmZXIiLCJzZXRMb2NhbEFuZFNlbmRNZXNzYWdlIiwiaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvciIsInNlc3Npb25EZXNjcmlwdGlvbiIsImNvcHlDYW5kaWRhdGUiLCJiYXNpY0NhbmRpZGF0ZSIsImNsb25lQ2FuZGlkYXRlIiwiY2xvbmUiLCJnZW5lcmF0ZURvbWFpbkZyb21VcmwiLCJ1cmwiLCJyZXN1bHQiLCJtYXRjaCIsImZpbmRJcCIsIlJlZ0V4cCIsIm5ld0RvbWFpbiIsImlwIiwiUHJvbWlzZSIsInJlamVjdCIsImJyb3dzZXIiLCJmZXRjaCIsInJlc3AiLCJqc29uIiwiZGF0YSIsIkFuc3dlciIsInJlbHNvbHZlZElwIiwicmVwbGFjZSIsIlJUQ0ljZUNhbmRpZGF0ZSIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsImNsb25lQ2FuZGlkYXRlUHJvbWlzZSIsImluaXRXZWJTb2NrZXQiLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJvbm1lc3NhZ2UiLCJtZXNzYWdlIiwiSlNPTiIsInBhcnNlIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsIk9iamVjdCIsImtleXMiLCJjb25zdHJ1Y3RvciIsImljZV9zZXJ2ZXJzIiwidHJpZ2dlciIsIk9NRV9QMlBfTU9ERSIsInBlZXJDb25uZWN0aW9uMSIsInBlZXJDb25uZWN0aW9uMiIsInBlZXJDb25uZWN0aW9uMyIsImNsb3NlIiwicGF1c2UiLCJvbmNsb3NlIiwib25lcnJvciIsImluaXRpYWxpemUiLCJjbGllbnRQZWVyQ29ubmVjdGlvbiIsImNsZWFySW50ZXJ2YWwiLCJyZWFkeVN0YXRlIiwic2VuZCIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBTUEsSUFBTUEsU0FBUyxTQUFUQSxNQUFTLENBQVNDLE9BQVQsRUFBa0JDLFlBQWxCLEVBQWdDQyxRQUFoQyxFQUF5QztBQUNwRCxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxlQUFlLElBQW5CO0FBQ0EsUUFBSUMsb0JBQXFCLElBQXpCOztBQUVBLFFBQUlDLE9BQU87QUFDUEMsY0FBT0MsMEJBREE7QUFFUFIsaUJBQVVBLE9BRkg7QUFHUFMsYUFBTSxJQUhDO0FBSVBDLGtCQUFXLElBSko7QUFLUEMsa0JBQVcsS0FMSjtBQU1QQyxpQkFBVSxLQU5IO0FBT1BDLGdCQUFTLEtBUEY7QUFRUEMsaUJBQVUsS0FSSDtBQVNQQyxlQUFRQyxxQkFURDtBQVVQQyxnQkFBUyxDQVZGO0FBV1BDLG1CQUFZLENBWEw7QUFZUEMsd0JBQWlCLENBQUMsQ0FaWDtBQWFQQyx1QkFBZ0IsQ0FBQyxDQWJWO0FBY1BDLHVCQUFnQixFQWRUO0FBZVBDLGlCQUFVLEVBZkg7QUFnQlBwQixrQkFBV0E7QUFoQkosS0FBWDs7QUFtQkFDLFdBQU8sMkJBQVNHLElBQVQsRUFBZUwsWUFBZixFQUE2QixVQUFTc0IsTUFBVCxFQUFnQjtBQUNoRCxZQUFHLHlCQUFTQSxPQUFPQyxJQUFoQixFQUFzQkQsT0FBT0UsSUFBN0IsQ0FBSCxFQUFzQztBQUNsQ0MsOEJBQWtCQyxHQUFsQixDQUFzQiwwQkFBdEIsRUFBa0RKLE1BQWxEO0FBQ0EsZ0JBQUduQixZQUFILEVBQWdCO0FBQ1pBLDZCQUFhd0IsT0FBYjtBQUNBeEIsK0JBQWUsSUFBZjtBQUNIOztBQUVELGdCQUFJeUIsZUFBZSxTQUFmQSxZQUFlLENBQVNDLE1BQVQsRUFBZ0I7O0FBRS9CLG9CQUFJOUIsUUFBUStCLFNBQVosRUFBdUI7QUFDbkIvQiw0QkFBUStCLFNBQVIsR0FBb0IsSUFBcEI7QUFDSDs7QUFFRC9CLHdCQUFRK0IsU0FBUixHQUFvQkQsTUFBcEI7QUFDSCxhQVBEOztBQVNBMUIsMkJBQWUsK0JBQWFELElBQWIsRUFBbUJvQixPQUFPQyxJQUExQixFQUFnQ0ssWUFBaEMsRUFBOENHLG1CQUE5QyxFQUE0RC9CLFlBQTVELENBQWY7O0FBRUFHLHlCQUFhNkIsT0FBYixDQUFxQixZQUFVO0FBQzNCO0FBQ0gsYUFGRCxXQUVTLFVBQVNDLEtBQVQsRUFBZTtBQUNwQjtBQUNBO0FBQ0gsYUFMRDs7QUFPQS9CLGlCQUFLZ0MsRUFBTCxDQUFRQyx1QkFBUixFQUFzQixZQUFVO0FBQzVCLG9CQUFHbkMsYUFBYW9DLFdBQWIsRUFBSCxFQUE4QjtBQUMxQjtBQUNBO0FBQ0E7QUFDSDtBQUNKLGFBTkQsRUFNR2xDLElBTkg7QUFPSDtBQUNKLEtBbENNLENBQVA7QUFtQ0FFLHdCQUFvQkYsY0FBVyxTQUFYLENBQXBCOztBQUVBdUIsc0JBQWtCQyxHQUFsQixDQUFzQix5QkFBdEI7O0FBR0F4QixTQUFLeUIsT0FBTCxHQUFlLFlBQUs7QUFDaEIsWUFBR3hCLFlBQUgsRUFBZ0I7QUFDWkEseUJBQWF3QixPQUFiO0FBQ0E1QixvQkFBUStCLFNBQVIsR0FBb0IsSUFBcEI7QUFDQTNCLDJCQUFlLElBQWY7QUFDSDtBQUNERCxhQUFLbUMsR0FBTCxDQUFTRix1QkFBVCxFQUF1QixJQUF2QixFQUE2QmpDLElBQTdCO0FBQ0F1QiwwQkFBa0JDLEdBQWxCLENBQXNCLCtCQUF0Qjs7QUFFQXRCO0FBRUgsS0FYRDtBQVlBLFdBQU9GLElBQVA7QUFDSCxDQTdFRCxDLENBZkE7OztxQkErRmVKLE07Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9GZjs7OztBQUNBOztBQUNBOzs7O0FBYUEsSUFBTXdDLGVBQWUsU0FBZkEsWUFBZSxDQUFVQyxRQUFWLEVBQW9CQyxZQUFwQixFQUFrQ1osWUFBbEMsRUFBZ0RHLFlBQWhELEVBQThEL0IsWUFBOUQsRUFBNEU7O0FBRTdGLFFBQUl5QywwQkFBMEIsRUFBOUI7O0FBRUEsUUFBSXZDLE9BQU8sRUFBWDs7QUFFQSxRQUFJd0MsS0FBSyxJQUFUOztBQUVBLFFBQUlDLFNBQVMsSUFBYjs7QUFFQSxRQUFJQyxhQUFhLElBQWpCOztBQUVBO0FBQ0EsUUFBSUMseUJBQXlCLElBQTdCOztBQUVBO0FBQ0EsUUFBSUMsd0JBQXdCLEVBQTVCOztBQUVBO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCOztBQUVBLFFBQUlDLHFCQUFxQixJQUF6Qjs7QUFFQSxRQUFJaEQsYUFBYWlELFNBQWIsR0FBeUJDLFlBQXpCLElBQ0FsRCxhQUFhaUQsU0FBYixHQUF5QkMsWUFBekIsQ0FBc0NGLGtCQUF0QyxLQUE2RCxLQURqRSxFQUN3RTs7QUFFcEVBLDZCQUFxQmhELGFBQWFpRCxTQUFiLEdBQXlCQyxZQUF6QixDQUFzQ0Ysa0JBQTNEO0FBQ0g7O0FBRUQsUUFBSUcsMEJBQTBCLElBQTlCOztBQUVBLFFBQUluRCxhQUFhaUQsU0FBYixHQUF5QkMsWUFBekIsSUFDQWxELGFBQWFpRCxTQUFiLEdBQXlCQyxZQUF6QixDQUFzQ0MsdUJBQXRDLEtBQWtFLEtBRHRFLEVBQzZFOztBQUV6RUEsa0NBQTBCbkQsYUFBYWlELFNBQWIsR0FBeUJDLFlBQXpCLENBQXNDQyx1QkFBaEU7QUFDSDs7QUFFRCxRQUFJQyxrQkFBa0IsSUFBdEI7O0FBRUEsUUFBSUMsaUJBQWlCLDZCQUFyQjs7QUFFQSxLQUFDLFlBQVk7QUFDVCxZQUFJQyxrQkFBa0JDLE9BQU9DLGNBQTdCO0FBQ0FELGVBQU9DLGNBQVAsR0FBd0IsVUFBVUMsS0FBVixFQUFpQjtBQUNyQyxnQkFBSUgsZUFBSixFQUFxQjtBQUNqQkEsZ0NBQWdCRyxLQUFoQjtBQUNIO0FBQ0RoQyw4QkFBa0JDLEdBQWxCLENBQXNCLHNDQUF0QjtBQUNBZ0M7QUFDSCxTQU5EO0FBT0gsS0FURDs7QUFXQSxhQUFTQyxxQkFBVCxDQUErQkMsRUFBL0IsRUFBbUM7O0FBRS9CLFlBQUlDLGlCQUFpQixJQUFyQjs7QUFFQSxZQUFJaEIsMEJBQTBCZSxPQUFPZix1QkFBdUJlLEVBQTVELEVBQWdFO0FBQzVEQyw2QkFBaUJoQix1QkFBdUJnQixjQUF4QztBQUNILFNBRkQsTUFFTyxJQUFJZixzQkFBc0JjLEVBQXRCLENBQUosRUFBK0I7QUFDbENDLDZCQUFpQmYsc0JBQXNCYyxFQUF0QixFQUEwQkMsY0FBM0M7QUFDSDs7QUFFRCxlQUFPQSxjQUFQO0FBQ0g7O0FBRUQsYUFBU0MsaUNBQVQsQ0FBMkNDLGtCQUEzQyxFQUErRDs7QUFFM0QsWUFBSUEsbUJBQW1CWCxlQUF2QixFQUF3QztBQUNwQ1kseUJBQWFELG1CQUFtQlgsZUFBaEM7QUFDSDs7QUFFRCxZQUFJLENBQUNXLG1CQUFtQkUsTUFBeEIsRUFBZ0M7QUFDNUJGLCtCQUFtQkUsTUFBbkIsR0FBNEIsRUFBNUI7QUFDQUYsK0JBQW1CRSxNQUFuQixDQUEwQkMsY0FBMUIsR0FBMkMsRUFBM0M7QUFDQUgsK0JBQW1CRSxNQUFuQixDQUEwQkUsVUFBMUIsR0FBdUMsQ0FBdkMsQ0FINEIsQ0FHYztBQUMxQ0osK0JBQW1CRSxNQUFuQixDQUEwQkcsZUFBMUIsR0FBNEMsQ0FBNUM7QUFDQUwsK0JBQW1CRSxNQUFuQixDQUEwQkksVUFBMUIsR0FBdUMsQ0FBdkM7QUFDQU4sK0JBQW1CRSxNQUFuQixDQUEwQksseUJBQTFCLEdBQXNELENBQXRELENBTjRCLENBTThCO0FBQzFEUCwrQkFBbUJFLE1BQW5CLENBQTBCTSxTQUExQixHQUFzQyxFQUF0QztBQUNIOztBQUVELFlBQUlMLGlCQUFpQkgsbUJBQW1CRSxNQUFuQixDQUEwQkMsY0FBL0M7QUFBQSxZQUNJQyxhQUFhSixtQkFBbUJFLE1BQW5CLENBQTBCRSxVQUQzQztBQUFBLFlBQ3VEO0FBQ25EQywwQkFBa0JMLG1CQUFtQkUsTUFBbkIsQ0FBMEJHLGVBRmhEO0FBQUEsWUFHSUMsYUFBYU4sbUJBQW1CRSxNQUFuQixDQUEwQkksVUFIM0M7O0FBSUk7QUFDQUUsb0JBQVlSLG1CQUFtQkUsTUFBbkIsQ0FBMEJNLFNBTDFDOztBQU9BUiwyQkFBbUJYLGVBQW5CLEdBQXFDb0IsV0FBVyxZQUFZO0FBQ3hELGdCQUFJLENBQUNULG1CQUFtQkYsY0FBeEIsRUFBd0M7QUFDcEMsdUJBQU8sS0FBUDtBQUNIOztBQUVERSwrQkFBbUJGLGNBQW5CLENBQWtDWSxRQUFsQyxHQUE2Q0MsSUFBN0MsQ0FBa0QsVUFBVUMsS0FBVixFQUFpQjs7QUFFL0Qsb0JBQUksQ0FBQ0EsS0FBTCxFQUFZO0FBQ1I7QUFDSDs7QUFFRCxvQkFBSTNFLGFBQWFpRCxTQUFiLEdBQXlCMkIsWUFBekIsSUFBeUNELEtBQTdDLEVBQW9EOztBQUVoREEsMEJBQU1FLE9BQU4sQ0FBYyxVQUFVL0QsS0FBVixFQUFpQjs7QUFFM0IsNEJBQUlBLE1BQU1VLElBQU4sS0FBZSxhQUFmLElBQWdDVixNQUFNZ0UsSUFBTixLQUFlLE9BQS9DLElBQTBELENBQUNoRSxNQUFNaUUsUUFBckUsRUFBK0U7O0FBRTNFOztBQUVBLGdDQUFJQyxtQkFBbUJDLFNBQVNuRSxNQUFNb0UsV0FBZixJQUE4QkQsU0FBU2IsZUFBVCxDQUFyRDs7QUFFQUYsMkNBQWVpQixJQUFmLENBQW9CRixTQUFTbkUsTUFBTW9FLFdBQWYsSUFBOEJELFNBQVNiLGVBQVQsQ0FBbEQ7O0FBRUEsZ0NBQUlGLGVBQWVrQixNQUFmLEdBQXdCakIsVUFBNUIsRUFBd0M7O0FBRXBDRCwrQ0FBZW1CLEtBQWY7QUFDSDs7QUFFRCxnQ0FBSW5CLGVBQWVrQixNQUFmLEtBQTBCakIsVUFBOUIsRUFBMEM7O0FBRXRDRSw2Q0FBYWlCLHdCQUFFQyxNQUFGLENBQVNyQixjQUFULEVBQXlCLFVBQVVzQixJQUFWLEVBQWdCQyxHQUFoQixFQUFxQjtBQUN2RCwyQ0FBT0QsT0FBT0MsR0FBZDtBQUNILGlDQUZZLEVBRVYsQ0FGVSxJQUVMdEIsVUFGUjtBQUdBMUMsa0RBQWtCQyxHQUFsQixDQUFzQiw4QkFBK0IyQyxVQUFyRCxFQUFrRSwwQkFBMEJXLGdCQUE1RixFQUE4Ryx3QkFBd0JsRSxNQUFNb0UsV0FBNUksRUFBeUpoQixjQUF6Sjs7QUFFQSxvQ0FBSUcsYUFBYUUsU0FBakIsRUFBNEI7QUFDeEJSLHVEQUFtQkUsTUFBbkIsQ0FBMEJLLHlCQUExQixHQUFzRFAsbUJBQW1CRSxNQUFuQixDQUEwQksseUJBQTFCLEdBQXNELENBQTVHO0FBQ0Esd0NBQUlQLG1CQUFtQkUsTUFBbkIsQ0FBMEJLLHlCQUExQixJQUF1RCxFQUEzRCxFQUErRDtBQUMzRDdDLDBEQUFrQkMsR0FBbEIsQ0FBc0IsdUJBQXRCO0FBQ0EsNENBQUlnRSxZQUFZQyxrQkFBT0MsS0FBUCxDQUFhQyxxQ0FBYixDQUFoQjtBQUNBbkMsa0RBQVVnQyxTQUFWO0FBQ0g7QUFDSixpQ0FQRCxNQU9PO0FBQ0gzQix1REFBbUJFLE1BQW5CLENBQTBCSyx5QkFBMUIsR0FBc0QsQ0FBdEQ7QUFDSDtBQUNKO0FBQ0RQLCtDQUFtQkUsTUFBbkIsQ0FBMEJHLGVBQTFCLEdBQTRDdEQsTUFBTW9FLFdBQWxEO0FBQ0g7QUFDSixxQkFuQ0Q7O0FBcUNBcEIsc0RBQWtDQyxrQkFBbEM7QUFDSDtBQUNKLGFBL0NEO0FBaURILFNBdERvQyxFQXNEbEMsSUF0RGtDLENBQXJDO0FBd0RIOztBQUVELGFBQVMrQix3QkFBVCxDQUFrQ2xDLEVBQWxDLEVBQXNDbUMsTUFBdEMsRUFBOENDLEdBQTlDLEVBQW1EQyxVQUFuRCxFQUErREMsVUFBL0QsRUFBMkVDLE9BQTNFLEVBQW9GOztBQUVoRixZQUFJQyx1QkFBdUIsRUFBM0I7O0FBRUE7QUFDQSxZQUFJcEcsYUFBYWlELFNBQWIsR0FBeUJDLFlBQXpCLElBQXlDbEQsYUFBYWlELFNBQWIsR0FBeUJDLFlBQXpCLENBQXNDZ0QsVUFBbkYsRUFBK0Y7O0FBRTNGRSxpQ0FBcUJGLFVBQXJCLEdBQWtDbEcsYUFBYWlELFNBQWIsR0FBeUJDLFlBQXpCLENBQXNDZ0QsVUFBeEU7O0FBRUEsZ0JBQUlsRyxhQUFhaUQsU0FBYixHQUF5QkMsWUFBekIsQ0FBc0NtRCxrQkFBMUMsRUFBOEQ7O0FBRTFERCxxQ0FBcUJDLGtCQUFyQixHQUEwQ3JHLGFBQWFpRCxTQUFiLEdBQXlCQyxZQUF6QixDQUFzQ21ELGtCQUFoRjtBQUNIO0FBQ0osU0FSRCxNQVFPLElBQUlILFVBQUosRUFBZ0I7O0FBRW5CO0FBQ0FFLGlDQUFxQkYsVUFBckIsR0FBa0MsRUFBbEM7O0FBRUEsaUJBQUssSUFBSUksSUFBSSxDQUFiLEVBQWdCQSxJQUFJSixXQUFXZCxNQUEvQixFQUF1Q2tCLEdBQXZDLEVBQTRDOztBQUV4QyxvQkFBSUMsWUFBWUwsV0FBV0ksQ0FBWCxDQUFoQjs7QUFFQSxvQkFBSUUsZUFBZSxFQUFuQjs7QUFFQUEsNkJBQWFDLElBQWIsR0FBb0JGLFVBQVVFLElBQTlCO0FBQ0FELDZCQUFhRSxRQUFiLEdBQXdCSCxVQUFVSSxTQUFsQztBQUNBSCw2QkFBYUksVUFBYixHQUEwQkwsVUFBVUssVUFBcEM7O0FBRUFSLHFDQUFxQkYsVUFBckIsQ0FBZ0NmLElBQWhDLENBQXFDcUIsWUFBckM7QUFDSDs7QUFFREosaUNBQXFCQyxrQkFBckIsR0FBMEMsT0FBMUM7QUFFSCxTQXBCTSxNQW9CQTs7QUFFSDtBQUNBRCxtQ0FBdUIzRCx1QkFBdkI7QUFDSDs7QUFFRGhCLDBCQUFrQkMsR0FBbEIsQ0FBc0IsZ0NBQXRCLEVBQXdEMEUsb0JBQXhEOztBQUVBLFlBQUl2QyxpQkFBaUIsSUFBSWdELGlCQUFKLENBQXNCVCxvQkFBdEIsQ0FBckI7O0FBRUF2RCxpQ0FBeUI7QUFDckJlLGdCQUFJQSxFQURpQjtBQUVyQm1DLG9CQUFRQSxNQUZhO0FBR3JCbEMsNEJBQWdCQTtBQUhLLFNBQXpCOztBQU1BO0FBQ0FBLHVCQUFlaUQsb0JBQWYsQ0FBb0MsSUFBSUMscUJBQUosQ0FBMEJmLEdBQTFCLENBQXBDLEVBQ0t0QixJQURMLENBQ1UsWUFBWTs7QUFFZGIsMkJBQWVtRCxZQUFmLEdBQ0t0QyxJQURMLENBQ1UsVUFBVXVDLElBQVYsRUFBZ0I7O0FBRWxCeEYsa0NBQWtCQyxHQUFsQixDQUFzQiw4QkFBdEI7O0FBRUFtQywrQkFBZXFELG1CQUFmLENBQW1DRCxJQUFuQyxFQUF5Q3ZDLElBQXpDLENBQThDLFlBQVk7QUFDdEQ7QUFDQSx3QkFBSXlDLFdBQVd0RCxlQUFldUQsZ0JBQTlCO0FBQ0EzRixzQ0FBa0JDLEdBQWxCLENBQXNCLFdBQXRCLEVBQW1DeUYsUUFBbkM7O0FBRUFFLGdDQUFZM0UsRUFBWixFQUFnQjtBQUNaa0IsNEJBQUlBLEVBRFE7QUFFWjBELGlDQUFTdkIsTUFGRztBQUdad0IsaUNBQVMsUUFIRztBQUladkIsNkJBQUttQjtBQUpPLHFCQUFoQjtBQU9ILGlCQVpELFdBWVMsVUFBVWxGLEtBQVYsRUFBaUI7O0FBRXRCLHdCQUFJeUQsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYTRCLDZDQUFiLENBQWhCO0FBQ0E5Qiw4QkFBVXpELEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0F5Qiw4QkFBVWdDLFNBQVY7QUFDSCxpQkFqQkQ7QUFrQkgsYUF2QkwsV0F3QlcsVUFBVXpELEtBQVYsRUFBaUI7QUFDcEIsb0JBQUl5RCxZQUFZQyxrQkFBT0MsS0FBUCxDQUFhNkIsNENBQWIsQ0FBaEI7QUFDQS9CLDBCQUFVekQsS0FBVixHQUFrQkEsS0FBbEI7QUFDQXlCLDBCQUFVZ0MsU0FBVjtBQUNILGFBNUJMO0FBNkJILFNBaENMLFdBaUNXLFVBQVV6RCxLQUFWLEVBQWlCO0FBQ3BCLGdCQUFJeUQsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYThCLDhDQUFiLENBQWhCO0FBQ0FoQyxzQkFBVXpELEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0F5QixzQkFBVWdDLFNBQVY7QUFDSCxTQXJDTDs7QUF1Q0EsWUFBSU8sVUFBSixFQUFnQjs7QUFFWjBCLDRCQUFnQjlELGNBQWhCLEVBQWdDb0MsVUFBaEM7QUFDSDs7QUFFRHBDLHVCQUFlK0QsY0FBZixHQUFnQyxVQUFVQyxDQUFWLEVBQWE7QUFDekMsZ0JBQUlBLEVBQUVDLFNBQU4sRUFBaUI7O0FBRWJyRyxrQ0FBa0JDLEdBQWxCLENBQXNCLDZDQUE2Q21HLEVBQUVDLFNBQXJFOztBQUVBOztBQUVBVCw0QkFBWTNFLEVBQVosRUFBZ0I7QUFDWmtCLHdCQUFJQSxFQURRO0FBRVowRCw2QkFBU3ZCLE1BRkc7QUFHWndCLDZCQUFTLFdBSEc7QUFJWnRCLGdDQUFZLENBQUM0QixFQUFFQyxTQUFIO0FBSkEsaUJBQWhCO0FBTUg7QUFDSixTQWREO0FBZUFqRSx1QkFBZWtFLHVCQUFmLEdBQXlDLFVBQVVGLENBQVYsRUFBYTtBQUNsRDtBQUNBcEcsOEJBQWtCQyxHQUFsQixDQUFzQiw4QkFBdEIsRUFBc0RtQyxlQUFlbUUsZUFBckUsRUFBc0ZILENBQXRGO0FBRUgsU0FKRDtBQUtBaEUsdUJBQWVvRSwwQkFBZixHQUE0QyxVQUFVSixDQUFWLEVBQWE7QUFDckRwRyw4QkFBa0JDLEdBQWxCLENBQXNCLGtDQUF0QixFQUEwRG1DLGVBQWVxRSxrQkFBekUsRUFBNkZMLENBQTdGOztBQUVBOzs7O0FBSUE7QUFDQTtBQUNBLGdCQUFJaEUsZUFBZXFFLGtCQUFmLEtBQXNDLGNBQXRDLElBQXdEckUsZUFBZXFFLGtCQUFmLEtBQXNDLFFBQWxHLEVBQTRHO0FBQ3hHLG9CQUFJLENBQUNuRixnQkFBTCxFQUF1QjtBQUNuQix3QkFBSUYsc0JBQUosRUFBNEI7QUFDeEIsNEJBQUk2QyxZQUFZQyxrQkFBT0MsS0FBUCxDQUFhdUMsOENBQWIsQ0FBaEI7QUFDQXpFLGtDQUFVZ0MsU0FBVjtBQUNIO0FBQ0o7QUFDSjtBQUNKLFNBakJEO0FBa0JBN0IsdUJBQWV1RSxPQUFmLEdBQXlCLFVBQVVQLENBQVYsRUFBYTs7QUFFbENwRyw4QkFBa0JDLEdBQWxCLENBQXNCLGtCQUF0Qjs7QUFFQUQsOEJBQWtCQyxHQUFsQixDQUFzQiwyQkFBdEIsRUFBbURzQixrQkFBbkQ7O0FBRUEsZ0JBQUlBLGtCQUFKLEVBQXdCO0FBQ3BCYyxrREFBa0NqQixzQkFBbEM7QUFDSDs7QUFFREQseUJBQWFpRixFQUFFUSxPQUFGLENBQVUsQ0FBVixDQUFiO0FBQ0F6Ryx5QkFBYWlHLEVBQUVRLE9BQUYsQ0FBVSxDQUFWLENBQWI7O0FBRUEsZ0JBQUlySSxhQUFhaUQsU0FBYixHQUF5QkMsWUFBekIsSUFBeUNsRCxhQUFhaUQsU0FBYixHQUF5QkMsWUFBekIsQ0FBc0NvRixnQkFBbkYsRUFBcUc7O0FBRWpHLG9CQUFJQyxPQUFPdkksYUFBYWlELFNBQWIsR0FBeUJDLFlBQXpCLENBQXNDb0YsZ0JBQWpEOztBQUVBLG9CQUFNRSxZQUFZM0YsdUJBQXVCZ0IsY0FBdkIsQ0FBc0M0RSxZQUF0QyxFQUFsQjs7QUFFQSxxQkFBSyxJQUFJbkMsS0FBSSxDQUFiLEVBQWdCQSxLQUFJa0MsVUFBVXBELE1BQTlCLEVBQXNDa0IsSUFBdEMsRUFBMkM7O0FBRXZDLHdCQUFJb0MsV0FBV0YsVUFBVWxDLEVBQVYsQ0FBZjs7QUFFQW9DLDZCQUFTSixnQkFBVCxHQUE0QkMsSUFBNUI7QUFDQTlHLHNDQUFrQkMsR0FBbEIsQ0FBc0IseUJBQXRCLEVBQWlEZ0gsUUFBakQsRUFBMkRILElBQTNEO0FBQ0g7QUFFSjtBQUNKLFNBNUJEO0FBNkJIOztBQUVELGFBQVNJLDBCQUFULENBQW9DQyxNQUFwQyxFQUE0Q0MsUUFBNUMsRUFBc0Q7O0FBRWxELFlBQUksQ0FBQ2pHLFVBQUwsRUFBaUI7O0FBRWI0Qix1QkFBVyxZQUFZOztBQUVuQm1FLDJDQUEyQkMsTUFBM0IsRUFBbUNDLFFBQW5DO0FBQ0gsYUFIRCxFQUdHLEdBSEg7O0FBS0E7QUFDSDs7QUFFRCxZQUFJaEYsaUJBQWlCLElBQUlnRCxpQkFBSixDQUFzQnBFLHVCQUF0QixDQUFyQjs7QUFFQUssOEJBQXNCK0YsUUFBdEIsSUFBa0M7QUFDOUJqRixnQkFBSWlGLFFBRDBCO0FBRTlCOUMsb0JBQVE2QyxNQUZzQjtBQUc5Qi9FLDRCQUFnQkE7QUFIYyxTQUFsQzs7QUFNQUEsdUJBQWVpRixTQUFmLENBQXlCbEcsVUFBekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUFpQix1QkFBZWtGLFdBQWYsQ0FBMkJDLHNCQUEzQixFQUFtREMsc0JBQW5ELEVBQTJFLEVBQTNFOztBQUVBLGlCQUFTRCxzQkFBVCxDQUFnQ0Usa0JBQWhDLEVBQW9EO0FBQ2hEckYsMkJBQWVxRCxtQkFBZixDQUFtQ2dDLGtCQUFuQzs7QUFFQTdCLHdCQUFZM0UsRUFBWixFQUFnQjtBQUNaa0Isb0JBQUlnRixNQURRO0FBRVp0Qix5QkFBU3VCLFFBRkc7QUFHWjdDLHFCQUFLa0Qsa0JBSE87QUFJWjNCLHlCQUFTO0FBSkcsYUFBaEI7QUFNSDs7QUFFRCxpQkFBUzBCLHNCQUFULENBQWdDeEYsS0FBaEMsRUFBdUMsQ0FFdEM7O0FBRURJLHVCQUFlK0QsY0FBZixHQUFnQyxVQUFVQyxDQUFWLEVBQWE7QUFDekMsZ0JBQUlBLEVBQUVDLFNBQU4sRUFBaUI7QUFDYnJHLGtDQUFrQkMsR0FBbEIsQ0FBc0IsNkNBQTZDbUcsRUFBRUMsU0FBckU7O0FBR0E7O0FBRUFULDRCQUFZM0UsRUFBWixFQUFnQjtBQUNaa0Isd0JBQUlnRixNQURRO0FBRVp0Qiw2QkFBU3VCLFFBRkc7QUFHWnRCLDZCQUFTLGVBSEc7QUFJWnRCLGdDQUFZLENBQUM0QixFQUFFQyxTQUFIO0FBSkEsaUJBQWhCO0FBT0g7QUFDSixTQWZEO0FBZ0JIOztBQUVELFFBQUlxQixnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQVVDLGNBQVYsRUFBMEI7O0FBRTFDLFlBQUlDLGlCQUFpQi9ELHdCQUFFZ0UsS0FBRixDQUFRRixjQUFSLENBQXJCOztBQUVBLGlCQUFTRyxxQkFBVCxDQUErQkMsR0FBL0IsRUFBb0M7QUFDaEMsZ0JBQUlDLFNBQVMsRUFBYjtBQUNBLGdCQUFJQyxjQUFKO0FBQ0EsZ0JBQUlBLFFBQVFGLElBQUlFLEtBQUosQ0FBVSx5REFBVixDQUFaLEVBQWtGO0FBQzlFRCx5QkFBU0MsTUFBTSxDQUFOLENBQVQ7QUFDSDtBQUNELG1CQUFPRCxNQUFQO0FBQ0g7O0FBRUQsaUJBQVNFLE1BQVQsQ0FBZ0I3QixTQUFoQixFQUEyQjs7QUFFdkIsZ0JBQUkyQixTQUFTLEVBQWI7QUFDQSxnQkFBSUMsY0FBSjs7QUFFQSxnQkFBSUEsUUFBUTVCLFVBQVU0QixLQUFWLENBQWdCLElBQUlFLE1BQUosQ0FBVyx5S0FBWCxFQUFzTCxJQUF0TCxDQUFoQixDQUFaLEVBQTBOO0FBQ3ROSCx5QkFBU0MsTUFBTSxDQUFOLENBQVQ7QUFDSDs7QUFFRCxtQkFBT0QsTUFBUDtBQUNIOztBQUVELFlBQUlJLFlBQVlOLHNCQUFzQi9HLFlBQXRCLENBQWhCO0FBQ0EsWUFBSXNILEtBQUtILE9BQU9OLGVBQWV2QixTQUF0QixDQUFUOztBQUVBLFlBQUlnQyxPQUFPLEVBQVAsSUFBYUEsT0FBT0QsU0FBeEIsRUFBbUM7O0FBRS9CLG1CQUFPLElBQVA7QUFDSDs7QUFFRCxlQUFPLElBQUlFLE9BQUosQ0FBWSxVQUFVNUQsT0FBVixFQUFtQjZELE1BQW5CLEVBQTJCOztBQUUxQztBQUNBLGdCQUFJM0csZUFBZTRHLE9BQWYsS0FBMkIsU0FBM0IsSUFBd0MsQ0FBQ04sT0FBT0UsU0FBUCxDQUE3QyxFQUFnRTs7QUFFNURLLHNCQUFNLHlDQUF5Q0wsU0FBL0MsRUFDS25GLElBREwsQ0FDVTtBQUFBLDJCQUFReUYsS0FBS0MsSUFBTCxFQUFSO0FBQUEsaUJBRFYsRUFFSzFGLElBRkwsQ0FFVSxnQkFBUTs7QUFFVix3QkFBSTJGLFFBQVFBLEtBQUtDLE1BQWIsSUFBdUJELEtBQUtDLE1BQUwsQ0FBWWxGLE1BQVosR0FBcUIsQ0FBaEQsRUFBbUQ7O0FBRS9DLDRCQUFJaUYsS0FBS0MsTUFBTCxDQUFZLENBQVosRUFBZUQsSUFBbkIsRUFBeUI7O0FBRXJCLGdDQUFJRSxjQUFjRixLQUFLQyxNQUFMLENBQVksQ0FBWixFQUFlRCxJQUFqQzs7QUFFQWhCLDJDQUFldkIsU0FBZixHQUEyQnVCLGVBQWV2QixTQUFmLENBQXlCMEMsT0FBekIsQ0FBaUNWLEVBQWpDLEVBQXFDUyxXQUFyQyxDQUEzQjtBQUNBcEUsb0NBQVFrRCxjQUFSO0FBQ0gseUJBTkQsTUFNTzs7QUFFSGxELG9DQUFRLElBQVI7QUFDSDtBQUNKLHFCQVpELE1BWU87O0FBRUhBLGdDQUFRLElBQVI7QUFDSDtBQUNKLGlCQXBCTDtBQXNCSCxhQXhCRCxNQXdCTzs7QUFFSGtELCtCQUFldkIsU0FBZixHQUEyQnVCLGVBQWV2QixTQUFmLENBQXlCMEMsT0FBekIsQ0FBaUNWLEVBQWpDLEVBQXFDRCxTQUFyQyxDQUEzQjtBQUNBMUQsd0JBQVFrRCxjQUFSO0FBQ0g7QUFFSixTQWpDTSxDQUFQO0FBa0NILEtBbkVEOztBQXFFQSxhQUFTMUIsZUFBVCxDQUF5QjlELGNBQXpCLEVBQXlDb0MsVUFBekMsRUFBcUQ7O0FBRWpELGFBQUssSUFBSUssSUFBSSxDQUFiLEVBQWdCQSxJQUFJTCxXQUFXYixNQUEvQixFQUF1Q2tCLEdBQXZDLEVBQTRDO0FBQ3hDLGdCQUFJTCxXQUFXSyxDQUFYLEtBQWlCTCxXQUFXSyxDQUFYLEVBQWN3QixTQUFuQyxFQUE4Qzs7QUFFMUMsb0JBQUlzQixpQkFBaUJuRCxXQUFXSyxDQUFYLENBQXJCOztBQUVBekMsK0JBQWU4RCxlQUFmLENBQStCLElBQUk4QyxlQUFKLENBQW9CckIsY0FBcEIsQ0FBL0IsRUFBb0UxRSxJQUFwRSxDQUF5RSxZQUFZO0FBQ2pGakQsc0NBQWtCQyxHQUFsQixDQUFzQiwyQkFBdEI7QUFDSCxpQkFGRCxXQUVTLFVBQVVPLEtBQVYsRUFBaUI7QUFDdEIsd0JBQUl5RCxZQUFZQyxrQkFBT0MsS0FBUCxDQUFhOEUsK0NBQWIsQ0FBaEI7QUFDQWhGLDhCQUFVekQsS0FBVixHQUFrQkEsS0FBbEI7QUFDQXlCLDhCQUFVZ0MsU0FBVjtBQUNILGlCQU5EOztBQVFBLG9CQUFJdkMsdUJBQUosRUFBNkI7O0FBRXpCLHdCQUFJd0gsd0JBQXdCeEIsY0FBY0MsY0FBZCxDQUE1Qjs7QUFFQSx3QkFBSXVCLHFCQUFKLEVBQTJCO0FBQ3ZCQSw4Q0FBc0JqRyxJQUF0QixDQUEyQixVQUFVMkUsY0FBVixFQUEwQjs7QUFFakQsZ0NBQUlBLGNBQUosRUFBb0I7O0FBRWhCeEYsK0NBQWU4RCxlQUFmLENBQStCLElBQUk4QyxlQUFKLENBQW9CcEIsY0FBcEIsQ0FBL0IsRUFBb0UzRSxJQUFwRSxDQUF5RSxZQUFZO0FBQ2pGakQsc0RBQWtCQyxHQUFsQixDQUFzQixrQ0FBdEI7QUFFSCxpQ0FIRCxXQUdTLFVBQVVPLEtBQVYsRUFBaUI7O0FBRXRCLHdDQUFJeUQsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYThFLCtDQUFiLENBQWhCO0FBQ0FoRiw4Q0FBVXpELEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0F5Qiw4Q0FBVWdDLFNBQVY7QUFDSCxpQ0FSRDtBQVNIO0FBQ0oseUJBZEQ7QUFlSDtBQUNKO0FBQ0o7QUFDSjtBQUNKOztBQUVELGFBQVNrRixhQUFULENBQXVCekUsT0FBdkIsRUFBZ0M2RCxNQUFoQyxFQUF3Qzs7QUFFcEMsWUFBSTs7QUFFQXRILGlCQUFLLElBQUltSSxTQUFKLENBQWNySSxZQUFkLENBQUw7O0FBRUFFLGVBQUdvSSxNQUFILEdBQVksWUFBWTs7QUFFcEJ6RCw0QkFBWTNFLEVBQVosRUFBZ0I7QUFDWjZFLDZCQUFTO0FBREcsaUJBQWhCOztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSCxhQVhEOztBQWFBN0UsZUFBR3FJLFNBQUgsR0FBZSxVQUFVbEQsQ0FBVixFQUFhOztBQUV4QixvQkFBTW1ELFVBQVVDLEtBQUtDLEtBQUwsQ0FBV3JELEVBQUV3QyxJQUFiLENBQWhCOztBQUVBLG9CQUFJVyxRQUFRL0ksS0FBWixFQUFtQjtBQUNmLHdCQUFJeUQsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYXVGLGlDQUFiLENBQWhCO0FBQ0F6Riw4QkFBVXpELEtBQVYsR0FBa0IrSSxRQUFRL0ksS0FBMUI7QUFDQXlCLDhCQUFVZ0MsU0FBVjtBQUNBO0FBQ0g7O0FBRUQsb0JBQUkwRixPQUFPQyxJQUFQLENBQVlMLE9BQVosRUFBcUI1RixNQUFyQixLQUFnQyxDQUFoQyxJQUFxQzRGLFFBQVFNLFdBQVIsS0FBd0JGLE1BQWpFLEVBQXlFOztBQUVyRTNKLHNDQUFrQkMsR0FBbEIsQ0FBc0IsZUFBdEI7QUFDQTtBQUNIOztBQUVELG9CQUFJc0osUUFBUXpELE9BQVIsS0FBb0IsTUFBeEIsRUFBZ0M7O0FBRTVCRixnQ0FBWTNFLEVBQVosRUFBZ0IsRUFBQzZFLFNBQVMsTUFBVixFQUFoQjtBQUNBO0FBQ0g7O0FBRUQsb0JBQUksQ0FBQ3lELFFBQVFwSCxFQUFiLEVBQWlCOztBQUVibkMsc0NBQWtCQyxHQUFsQixDQUFzQixxQkFBdEI7QUFDQTtBQUNIOztBQUVELG9CQUFJc0osUUFBUXpELE9BQVIsS0FBb0IsT0FBeEIsRUFBaUM7O0FBRTdCekIsNkNBQXlCa0YsUUFBUXBILEVBQWpDLEVBQXFDb0gsUUFBUTFELE9BQTdDLEVBQXNEMEQsUUFBUWhGLEdBQTlELEVBQW1FZ0YsUUFBUS9FLFVBQTNFLEVBQXVGK0UsUUFBUU8sV0FBL0YsRUFBNEdwRixPQUE1RztBQUNBLHdCQUFJNkUsUUFBUTFELE9BQVIsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDdkIvRSxpQ0FBU2lKLE9BQVQsQ0FBaUJDLHVCQUFqQixFQUErQixLQUEvQjtBQUNILHFCQUZELE1BRU87QUFDSGxKLGlDQUFTaUosT0FBVCxDQUFpQkMsdUJBQWpCLEVBQStCLElBQS9CO0FBQ0g7QUFDSjs7QUFFRCxvQkFBSVQsUUFBUXpELE9BQVIsS0FBb0IsbUJBQXhCLEVBQTZDOztBQUV6Q29CLCtDQUEyQnFDLFFBQVFwSCxFQUFuQyxFQUF1Q29ILFFBQVExRCxPQUEvQztBQUNIOztBQUVELG9CQUFJMEQsUUFBUXpELE9BQVIsS0FBb0IsWUFBeEIsRUFBc0M7O0FBRWxDLHdCQUFJbUUsa0JBQWtCL0gsc0JBQXNCcUgsUUFBUTFELE9BQTlCLENBQXRCOztBQUVBb0Usb0NBQWdCNUUsb0JBQWhCLENBQXFDLElBQUlDLHFCQUFKLENBQTBCaUUsUUFBUWhGLEdBQWxDLENBQXJDLEVBQ0t0QixJQURMLENBQ1UsVUFBVXVDLElBQVYsRUFBZ0IsQ0FFckIsQ0FITCxXQUlXLFVBQVVoRixLQUFWLEVBQWlCO0FBQ3BCLDRCQUFJeUQsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYThCLDhDQUFiLENBQWhCO0FBQ0FoQyxrQ0FBVXpELEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0F5QixrQ0FBVWdDLFNBQVY7QUFDSCxxQkFSTDtBQVNIOztBQUVELG9CQUFJc0YsUUFBUXpELE9BQVIsS0FBb0IsV0FBeEIsRUFBcUM7O0FBRWpDO0FBQ0Esd0JBQUlvRSxrQkFBa0JoSSxzQkFBc0JxSCxRQUFRcEgsRUFBOUIsQ0FBdEI7O0FBRUErRCxvQ0FBZ0JnRSxlQUFoQixFQUFpQ1gsUUFBUS9FLFVBQXpDO0FBQ0g7O0FBRUQsb0JBQUkrRSxRQUFRekQsT0FBUixLQUFvQixlQUF4QixFQUF5Qzs7QUFFckM7QUFDQSx3QkFBSXFFLGtCQUFrQmpJLHNCQUFzQnFILFFBQVExRCxPQUE5QixDQUF0Qjs7QUFFQUssb0NBQWdCaUUsZUFBaEIsRUFBaUNaLFFBQVEvRSxVQUF6QztBQUNIOztBQUVELG9CQUFJK0UsUUFBUXpELE9BQVIsS0FBb0IsTUFBeEIsRUFBZ0M7O0FBRTVCLHdCQUFJMUUsdUJBQXVCa0QsTUFBdkIsS0FBa0NpRixRQUFRMUQsT0FBOUMsRUFBdUQ7O0FBRW5EOztBQUVBO0FBQ0E7O0FBRUExRSxxQ0FBYSxJQUFiO0FBQ0FDLCtDQUF1QmdCLGNBQXZCLENBQXNDZ0ksS0FBdEM7QUFDQWhKLGlEQUF5QixJQUF6Qjs7QUFFQTtBQUNBTixpQ0FBU3VKLEtBQVQ7O0FBRUF6RSxvQ0FBWTNFLEVBQVosRUFBZ0I7QUFDWjZFLHFDQUFTO0FBREcseUJBQWhCO0FBSUgscUJBbEJELE1Ba0JPOztBQUVIO0FBQ0EsNEJBQUl6RSxzQkFBc0JrSSxRQUFRMUQsT0FBOUIsQ0FBSixFQUE0QztBQUN4QztBQUNBeEUsa0RBQXNCa0ksUUFBUTFELE9BQTlCLEVBQXVDekQsY0FBdkMsQ0FBc0RnSSxLQUF0RDtBQUNBLG1DQUFPL0ksc0JBQXNCa0ksUUFBUTFELE9BQTlCLENBQVA7QUFDSDtBQUNKO0FBQ0o7QUFDSixhQXpHRDtBQTBHQTVFLGVBQUdxSixPQUFILEdBQWEsWUFBWTs7QUFFckIsb0JBQUksQ0FBQ2hKLGdCQUFMLEVBQXVCOztBQUVuQix3QkFBSTJDLFlBQVlDLGtCQUFPQyxLQUFQLENBQWF1RixpQ0FBYixDQUFoQjs7QUFFQSx3QkFBSXRJLHNCQUFKLEVBQTRCO0FBQ3hCNkMsb0NBQVlDLGtCQUFPQyxLQUFQLENBQWF1Qyw4Q0FBYixDQUFaO0FBQ0g7O0FBRUR6RSw4QkFBVWdDLFNBQVY7QUFDSDtBQUNKLGFBWkQ7O0FBY0FoRCxlQUFHc0osT0FBSCxHQUFhLFVBQVUvSixLQUFWLEVBQWlCOztBQUUxQjtBQUNBLG9CQUFJLENBQUNjLGdCQUFMLEVBQXVCO0FBQ25CLHdCQUFJMkMsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYXVGLGlDQUFiLENBQWhCO0FBQ0F6Riw4QkFBVXpELEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0F5Qiw4QkFBVWdDLFNBQVY7QUFDQTtBQUNIO0FBQ0osYUFURDtBQVdILFNBcEpELENBb0pFLE9BQU96RCxLQUFQLEVBQWM7O0FBRVp5QixzQkFBVXpCLEtBQVY7QUFDSDtBQUNKOztBQUVELGFBQVNnSyxVQUFULEdBQXNCOztBQUVsQnhLLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCOztBQUVBLGVBQU8sSUFBSXFJLE9BQUosQ0FBWSxVQUFVNUQsT0FBVixFQUFtQjZELE1BQW5CLEVBQTJCOztBQUUxQ3ZJLDhCQUFrQkMsR0FBbEIsQ0FBc0Isd0JBQXdCYyxZQUE5Qzs7QUFFQW9JLDBCQUFjekUsT0FBZCxFQUF1QjZELE1BQXZCO0FBQ0gsU0FMTSxDQUFQO0FBTUg7O0FBRUQsYUFBU3RHLFNBQVQsQ0FBbUJ6QixLQUFuQixFQUEwQjs7QUFFdEJSLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMkJBQXRCOztBQUVBLFlBQUksQ0FBQ08sS0FBTCxFQUFZO0FBQ1JjLCtCQUFtQixJQUFuQjtBQUNIOztBQUVELFlBQUlGLHNCQUFKLEVBQTRCOztBQUV4QixnQkFBSUEsdUJBQXVCTyxlQUEzQixFQUE0QztBQUN4Q1ksNkJBQWFuQix1QkFBdUJPLGVBQXBDO0FBQ0g7O0FBRURSLHlCQUFhLElBQWI7O0FBRUFuQiw4QkFBa0JDLEdBQWxCLENBQXNCLGlDQUF0QjtBQUNBLGdCQUFJMEIsZUFBSixFQUFxQjtBQUNqQlksNkJBQWFaLGVBQWI7QUFDSDs7QUFFRCxnQkFBSVAsdUJBQXVCZ0IsY0FBM0IsRUFBMkM7O0FBRXZDaEIsdUNBQXVCZ0IsY0FBdkIsQ0FBc0NnSSxLQUF0QztBQUNIOztBQUVEaEosbUNBQXVCZ0IsY0FBdkIsR0FBd0MsSUFBeEM7QUFDQWhCLHFDQUF5QixJQUF6QjtBQUNIOztBQUVELFlBQUl1SSxPQUFPQyxJQUFQLENBQVl2SSxxQkFBWixFQUFtQ3NDLE1BQW5DLEdBQTRDLENBQWhELEVBQW1EOztBQUUvQyxpQkFBSyxJQUFJeUQsUUFBVCxJQUFxQi9GLHFCQUFyQixFQUE0Qzs7QUFFeEMsb0JBQUlvSix1QkFBdUJwSixzQkFBc0IrRixRQUF0QixFQUFnQ2hGLGNBQTNEOztBQUVBLG9CQUFJcUksb0JBQUosRUFBMEI7QUFDdEJ6SyxzQ0FBa0JDLEdBQWxCLENBQXNCLG1DQUF0QjtBQUNBd0sseUNBQXFCTCxLQUFyQjtBQUNBSywyQ0FBdUIsSUFBdkI7QUFDSDtBQUNKOztBQUVEcEosb0NBQXdCLEVBQXhCO0FBQ0g7O0FBRURxSixzQkFBY3hKLE1BQWQ7QUFDQUEsaUJBQVMsSUFBVDs7QUFFQSxZQUFJRCxFQUFKLEVBQVE7QUFDSmpCLDhCQUFrQkMsR0FBbEIsQ0FBc0IsaUNBQXRCO0FBQ0FELDhCQUFrQkMsR0FBbEIsQ0FBc0Isd0JBQXRCO0FBQ0E7Ozs7OztBQU1BLGdCQUFJZ0IsR0FBRzBKLFVBQUgsS0FBa0IsQ0FBbEIsSUFBdUIxSixHQUFHMEosVUFBSCxLQUFrQixDQUE3QyxFQUFnRDs7QUFFNUNySixtQ0FBbUIsSUFBbkI7O0FBRUEsb0JBQUlGLHNCQUFKLEVBQTRCO0FBQ3hCd0UsZ0NBQVkzRSxFQUFaLEVBQWdCO0FBQ1o2RSxpQ0FBUyxNQURHO0FBRVozRCw0QkFBSWYsdUJBQXVCZTtBQUZmLHFCQUFoQjtBQUlIOztBQUVEbEIsbUJBQUdtSixLQUFIO0FBQ0g7QUFFSixTQXZCRCxNQXVCTztBQUNIOUksK0JBQW1CLEtBQW5CO0FBQ0g7O0FBRURMLGFBQUssSUFBTDs7QUFFQSxZQUFJVCxLQUFKLEVBQVc7QUFDUEYseUJBQWFFLEtBQWIsRUFBb0JNLFFBQXBCO0FBQ0g7QUFDSjs7QUFFRCxhQUFTOEUsV0FBVCxDQUFxQjNFLEVBQXJCLEVBQXlCc0ksT0FBekIsRUFBa0M7O0FBRTlCLFlBQUl0SSxFQUFKLEVBQVE7QUFDSkEsZUFBRzJKLElBQUgsQ0FBUXBCLEtBQUtxQixTQUFMLENBQWV0QixPQUFmLENBQVI7QUFDSDtBQUVKOztBQUVEOUssU0FBSzhCLE9BQUwsR0FBZSxZQUFNO0FBQ2pCLGVBQU9pSyxZQUFQO0FBQ0gsS0FGRDs7QUFJQS9MLFNBQUt5QixPQUFMLEdBQWUsWUFBTTtBQUNqQitCO0FBQ0gsS0FGRDs7QUFJQSxXQUFPeEQsSUFBUDtBQUNILENBN3VCRDs7cUJBK3VCZW9DLFkiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTEuLlxyXG4gKi9cclxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcclxuaW1wb3J0IFdlYlJUQ0xvYWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVENMb2FkZXJcIjtcclxuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1BST1ZJREVSX1dFQlJUQywgU1RBVEVfSURMRSwgQ09OVEVOVF9NRVRBLCBTVEFURV9QTEFZSU5HfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIHdlYnJ0YyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5jb25zdCBXZWJSVEMgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgd2VicnRjTG9hZGVyID0gbnVsbDtcclxuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyAgPSBudWxsO1xyXG5cclxuICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgIG5hbWUgOiBQUk9WSURFUl9XRUJSVEMsXHJcbiAgICAgICAgZWxlbWVudCA6IGVsZW1lbnQsXHJcbiAgICAgICAgbXNlIDogbnVsbCxcclxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgaXNMb2FkZWQgOiBmYWxzZSxcclxuICAgICAgICBjYW5TZWVrIDogZmFsc2UsXHJcbiAgICAgICAgaXNMaXZlIDogZmFsc2UsXHJcbiAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxyXG4gICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcclxuICAgICAgICBidWZmZXIgOiAwLFxyXG4gICAgICAgIGZyYW1lcmF0ZSA6IDAsXHJcbiAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcclxuICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXHJcbiAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxyXG4gICAgICAgIHNvdXJjZXMgOiBbXSxcclxuICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSl7XHJcbiAgICAgICAgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyA6IG9uQmVmb3JlTG9hZCA6IFwiLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsb2FkQ2FsbGJhY2sgPSBmdW5jdGlvbihzdHJlYW0pe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnNyY09iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3JjT2JqZWN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IFdlYlJUQ0xvYWRlcih0aGF0LCBzb3VyY2UuZmlsZSwgbG9hZENhbGxiYWNrLCBlcnJvclRyaWdnZXIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuY29ubmVjdChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy9Ub0RvIDogcmVzb2x2ZSBub3Qgd29ya3JpbmdcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQub24oQ09OVEVOVF9NRVRBLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0aGF0LmdldFN0YXRlKCkgIT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQub2ZmKENPTlRFTlRfTUVUQSwgbnVsbCwgdGhhdCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIDogIFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcblxyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlJUQztcclxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuaW1wb3J0IHthbmFsVXNlckFnZW50fSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgRVJST1JTLFxyXG4gICAgUExBWUVSX1dFQlJUQ19XU19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XLFxyXG4gICAgUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QsXHJcbiAgICBPTUVfUDJQX01PREVcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbmNvbnN0IFdlYlJUQ0xvYWRlciA9IGZ1bmN0aW9uIChwcm92aWRlciwgd2ViU29ja2V0VXJsLCBsb2FkQ2FsbGJhY2ssIGVycm9yVHJpZ2dlciwgcGxheWVyQ29uZmlnKSB7XHJcblxyXG4gICAgbGV0IGRlZmF1bHRDb25uZWN0aW9uQ29uZmlnID0ge307XHJcblxyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuXHJcbiAgICBsZXQgd3MgPSBudWxsO1xyXG5cclxuICAgIGxldCB3c1BpbmcgPSBudWxsO1xyXG5cclxuICAgIGxldCBtYWluU3RyZWFtID0gbnVsbDtcclxuXHJcbiAgICAvLyB1c2VkIGZvciBnZXR0aW5nIG1lZGlhIHN0cmVhbSBmcm9tIE9NRSBvciBob3N0IHBlZXJcclxuICAgIGxldCBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0gbnVsbDtcclxuXHJcbiAgICAvLyB1c2VkIGZvciBzZW5kIG1lZGlhIHN0cmVhbSB0byBjbGllbnQgcGVlci5cclxuICAgIGxldCBjbGllbnRQZWVyQ29ubmVjdGlvbnMgPSB7fTtcclxuXHJcbiAgICAvL2Nsb3NlZCB3ZWJzb2NrZXQgYnkgb21lIG9yIGNsaWVudC5cclxuICAgIGxldCB3c0Nsb3NlZEJ5UGxheWVyID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHJlY29ydmVyUGFja2V0TG9zcyA9IHRydWU7XHJcblxyXG4gICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcgJiZcclxuICAgICAgICBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLnJlY29ydmVyUGFja2V0TG9zcyA9PT0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgcmVjb3J2ZXJQYWNrZXRMb3NzID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5yZWNvcnZlclBhY2tldExvc3M7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGdlbmVyYXRlUHVibGljQ2FuZGlkYXRlID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZyAmJlxyXG4gICAgICAgIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuZ2VuZXJhdGVQdWJsaWNDYW5kaWRhdGUgPT09IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIGdlbmVyYXRlUHVibGljQ2FuZGlkYXRlID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5nZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc3RhdGlzdGljc1RpbWVyID0gbnVsbDtcclxuXHJcbiAgICBsZXQgY3VycmVudEJyb3dzZXIgPSBhbmFsVXNlckFnZW50KCk7XHJcblxyXG4gICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZXhpc3RpbmdIYW5kbGVyID0gd2luZG93Lm9uYmVmb3JldW5sb2FkO1xyXG4gICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBleGlzdGluZ0hhbmRsZXIoZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlRoaXMgY2FsbHMgYXV0byB3aGVuIGJyb3dzZXIgY2xvc2VkLlwiKTtcclxuICAgICAgICAgICAgY2xvc2VQZWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQoaWQpIHtcclxuXHJcbiAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8gJiYgaWQgPT09IG1haW5QZWVyQ29ubmVjdGlvbkluZm8uaWQpIHtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24gPSBtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpZW50UGVlckNvbm5lY3Rpb25zW2lkXSkge1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbiA9IGNsaWVudFBlZXJDb25uZWN0aW9uc1tpZF0ucGVlckNvbm5lY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGVlckNvbm5lY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzKHBlZXJDb25uZWN0aW9uSW5mbykge1xyXG5cclxuICAgICAgICBpZiAocGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lcikge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQocGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMpIHtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cyA9IHt9O1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmxvc3RQYWNrZXRzQXJyID0gW107XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuc2xvdExlbmd0aCA9IDg7IC8vOCBzdGF0aXN0aWNzLiBldmVyeSAyIHNlY29uZHNcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5wcmV2UGFja2V0c0xvc3QgPSAwO1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2ZzhMb3NzZXMgPSAwO1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSAwOyAgLy9JZiBhdmc4TG9zcyBtb3JlIHRoYW4gdGhyZXNob2xkLlxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnRocmVzaG9sZCA9IDQwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxvc3RQYWNrZXRzQXJyID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5sb3N0UGFja2V0c0FycixcclxuICAgICAgICAgICAgc2xvdExlbmd0aCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuc2xvdExlbmd0aCwgLy84IHN0YXRpc3RpY3MuIGV2ZXJ5IDIgc2Vjb25kc1xyXG4gICAgICAgICAgICBwcmV2UGFja2V0c0xvc3QgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnByZXZQYWNrZXRzTG9zdCxcclxuICAgICAgICAgICAgYXZnOExvc3NlcyA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnOExvc3NlcyxcclxuICAgICAgICAgICAgLy8gYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCwgIC8vSWYgYXZnOExvc3MgbW9yZSB0aGFuIHRocmVzaG9sZC5cclxuICAgICAgICAgICAgdGhyZXNob2xkID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy50aHJlc2hvbGQ7XHJcblxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFwZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uLmdldFN0YXRzKCkudGhlbihmdW5jdGlvbiAoc3RhdHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuYXV0b0ZhbGxiYWNrICYmIHN0YXRzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzLmZvckVhY2goZnVuY3Rpb24gKHN0YXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUudHlwZSA9PT0gXCJpbmJvdW5kLXJ0cFwiICYmIHN0YXRlLmtpbmQgPT09ICd2aWRlbycgJiYgIXN0YXRlLmlzUmVtb3RlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8oc3RhdGUucGFja2V0c0xvc3QgLSBwcmV2UGFja2V0c0xvc3QpIGlzIHJlYWwgY3VycmVudCBsb3N0LlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3R1YWxQYWNrZXRMb3N0ID0gcGFyc2VJbnQoc3RhdGUucGFja2V0c0xvc3QpIC0gcGFyc2VJbnQocHJldlBhY2tldHNMb3N0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3N0UGFja2V0c0Fyci5wdXNoKHBhcnNlSW50KHN0YXRlLnBhY2tldHNMb3N0KSAtIHBhcnNlSW50KHByZXZQYWNrZXRzTG9zdCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb3N0UGFja2V0c0Fyci5sZW5ndGggPiBzbG90TGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3RQYWNrZXRzQXJyLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvc3RQYWNrZXRzQXJyLmxlbmd0aCA9PT0gc2xvdExlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmc4TG9zc2VzID0gXy5yZWR1Y2UobG9zdFBhY2tldHNBcnIsIGZ1bmN0aW9uIChtZW1vLCBudW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lbW8gKyBudW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCkgLyBzbG90TGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhc3Q4IExPU1QgUEFDS0VUIEFWRyAgOiBcIiArIChhdmc4TG9zc2VzKSwgXCJDdXJyZW50IFBhY2tldCBMT1NUOiBcIiArIGFjdHVhbFBhY2tldExvc3QsIFwiVG90YWwgUGFja2V0IExvc3Q6IFwiICsgc3RhdGUucGFja2V0c0xvc3QsIGxvc3RQYWNrZXRzQXJyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF2ZzhMb3NzZXMgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA+PSA2MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTkVUV09SSyBVTlNUQUJMRUQhISEgXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPV107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5wcmV2UGFja2V0c0xvc3QgPSBzdGF0ZS5wYWNrZXRzTG9zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMocGVlckNvbm5lY3Rpb25JbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sIDIwMDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVNYWluUGVlckNvbm5lY3Rpb24oaWQsIHBlZXJJZCwgc2RwLCBjYW5kaWRhdGVzLCBpY2VTZXJ2ZXJzLCByZXNvbHZlKSB7XHJcblxyXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbkNvbmZpZyA9IHt9O1xyXG5cclxuICAgICAgICAvLyBmaXJzdCBwcmlvcml0eSB1c2luZyBpY2Ugc2VydmVycyBmcm9tIHBsYXllciBzZXR0aW5nLlxyXG4gICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnICYmIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuaWNlU2VydmVycykge1xyXG5cclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWcuaWNlU2VydmVycyA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuaWNlU2VydmVycztcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChpY2VTZXJ2ZXJzKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBzZWNvbmQgcHJpb3JpdHkgdXNpbmcgaWNlIHNlcnZlcnMgZnJvbSBvbWUgYW5kIGZvcmNlIHVzaW5nIFRDUFxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VTZXJ2ZXJzID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGljZVNlcnZlcnMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaWNlU2VydmVyID0gaWNlU2VydmVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVnSWNlU2VydmVyID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgcmVnSWNlU2VydmVyLnVybHMgPSBpY2VTZXJ2ZXIudXJscztcclxuICAgICAgICAgICAgICAgIHJlZ0ljZVNlcnZlci51c2VybmFtZSA9IGljZVNlcnZlci51c2VyX25hbWU7XHJcbiAgICAgICAgICAgICAgICByZWdJY2VTZXJ2ZXIuY3JlZGVudGlhbCA9IGljZVNlcnZlci5jcmVkZW50aWFsO1xyXG5cclxuICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnLmljZVNlcnZlcnMucHVzaChyZWdJY2VTZXJ2ZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kgPSAncmVsYXknO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgLy8gbGFzdCBwcmlvcml0eSB1c2luZyBkZWZhdWx0IGljZSBzZXJ2ZXJzLlxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZyA9IGRlZmF1bHRDb25uZWN0aW9uQ29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwibWFpbiBwZWVyIGNvbm5lY3Rpb24gY29uZmlnIDogXCIsIHBlZXJDb25uZWN0aW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKHBlZXJDb25uZWN0aW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mbyA9IHtcclxuICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICBwZWVySWQ6IHBlZXJJZCxcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb246IHBlZXJDb25uZWN0aW9uXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9TZXQgcmVtb3RlIGRlc2NyaXB0aW9uIHdoZW4gSSByZWNlaXZlZCBzZHAgZnJvbSBzZXJ2ZXIuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihzZHApKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uY3JlYXRlQW5zd2VyKClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGVzYykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiY3JlYXRlIEhvc3QgQW5zd2VyIDogc3VjY2Vzc1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oZGVzYykudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBteSBTRFAgY3JlYXRlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2NhbFNEUCA9IHBlZXJDb25uZWN0aW9uLmxvY2FsRGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0xvY2FsIFNEUCcsIGxvY2FsU0RQKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBwZWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ2Fuc3dlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RwOiBsb2NhbFNEUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY2FuZGlkYXRlcykge1xyXG5cclxuICAgICAgICAgICAgYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uLCBjYW5kaWRhdGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuY2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHNlbmQgY2FuZGlkYXRlIHRvIHNlcnZlciA6IFwiICsgZS5jYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdNYWluIFBlZXIgQ29ubmVjdGlvbiBjYW5kaWRhdGUnLCBlLmNhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVlcl9pZDogcGVlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2FuZGlkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlczogW2UuY2FuZGlkYXRlXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9uY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgLy9pY2VDb25uZWN0aW9uU3RhdGVcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW29uIGNvbm5lY3Rpb24gc3RhdGUgY2hhbmdlXVwiLCBwZWVyQ29ubmVjdGlvbi5jb25uZWN0aW9uU3RhdGUsIGUpO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW29uIGljZSBjb25uZWN0aW9uIHN0YXRlIGNoYW5nZV1cIiwgcGVlckNvbm5lY3Rpb24uaWNlQ29ubmVjdGlvblN0YXRlLCBlKTtcclxuXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1JUQ1BlZXJDb25uZWN0aW9uL2ljZUNvbm5lY3Rpb25TdGF0ZVxyXG4gICAgICAgICAgICAqIENoZWNrcyB0byBlbnN1cmUgdGhhdCBjb21wb25lbnRzIGFyZSBzdGlsbCBjb25uZWN0ZWQgZmFpbGVkIGZvciBhdCBsZWFzdCBvbmUgY29tcG9uZW50IG9mIHRoZSBSVENQZWVyQ29ubmVjdGlvbi4gVGhpcyBpcyBhIGxlc3Mgc3RyaW5nZW50IHRlc3QgdGhhbiBcImZhaWxlZFwiIGFuZCBtYXkgdHJpZ2dlciBpbnRlcm1pdHRlbnRseSBhbmQgcmVzb2x2ZSBqdXN0IGFzIHNwb250YW5lb3VzbHkgb24gbGVzcyByZWxpYWJsZSBuZXR3b3Jrcywgb3IgZHVyaW5nIHRlbXBvcmFyeSBkaXNjb25uZWN0aW9ucy4gV2hlbiB0aGUgcHJvYmxlbSByZXNvbHZlcywgdGhlIGNvbm5lY3Rpb24gbWF5IHJldHVybiB0byB0aGUgXCJjb25uZWN0ZWRcIiBzdGF0ZS5cclxuICAgICAgICAgICAgKiAqL1xyXG4gICAgICAgICAgICAvL1RoaXMgcHJvY2VzcyBpcyBteSBpbWFnaW5hdGlvbi4gSSBkbyBub3Qga25vdyBob3cgdG8gcmVwcm9kdWNlLlxyXG4gICAgICAgICAgICAvL1NpdHVhdGlvbiA6IE9NRSBpcyBkZWFkIGJ1dCBvbWUgY2FuJ3Qgc2VuZCAnc3RvcCcgbWVzc2FnZS5cclxuICAgICAgICAgICAgaWYgKHBlZXJDb25uZWN0aW9uLmljZUNvbm5lY3Rpb25TdGF0ZSA9PT0gJ2Rpc2Nvbm5lY3RlZCcgfHwgcGVlckNvbm5lY3Rpb24uaWNlQ29ubmVjdGlvblN0YXRlID09PSAnY2xvc2VkJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF3c0Nsb3NlZEJ5UGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub250cmFjayA9IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzdHJlYW0gcmVjZWl2ZWQuXCIpO1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdSZWNvdmVyeSBPbiBQYWNrZXQgTG9zcyA6JywgcmVjb3J2ZXJQYWNrZXRMb3NzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWNvcnZlclBhY2tldExvc3MpIHtcclxuICAgICAgICAgICAgICAgIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyhtYWluUGVlckNvbm5lY3Rpb25JbmZvKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWFpblN0cmVhbSA9IGUuc3RyZWFtc1swXTtcclxuICAgICAgICAgICAgbG9hZENhbGxiYWNrKGUuc3RyZWFtc1swXSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZyAmJiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLnBsYXlvdXREZWxheUhpbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaGludCA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcucGxheW91dERlbGF5SGludDtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWNlaXZlcnMgPSBtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uLmdldFJlY2VpdmVycygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjZWl2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWNlaXZlciA9IHJlY2VpdmVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZWl2ZXIucGxheW91dERlbGF5SGludCA9IGhpbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDIHBsYXlvdXREZWxheUhpbnRcIiwgcmVjZWl2ZXIsIGhpbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24oaG9zdElkLCBjbGllbnRJZCkge1xyXG5cclxuICAgICAgICBpZiAoIW1haW5TdHJlYW0pIHtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uKGhvc3RJZCwgY2xpZW50SWQpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKGRlZmF1bHRDb25uZWN0aW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb25zW2NsaWVudElkXSA9IHtcclxuICAgICAgICAgICAgaWQ6IGNsaWVudElkLFxyXG4gICAgICAgICAgICBwZWVySWQ6IGhvc3RJZCxcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb246IHBlZXJDb25uZWN0aW9uXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkU3RyZWFtKG1haW5TdHJlYW0pO1xyXG5cclxuICAgICAgICAvLyBsZXQgb2ZmZXJPcHRpb24gPSB7XHJcbiAgICAgICAgLy8gICAgIG9mZmVyVG9SZWNlaXZlQXVkaW86IDEsXHJcbiAgICAgICAgLy8gICAgIG9mZmVyVG9SZWNlaXZlVmlkZW86IDFcclxuICAgICAgICAvLyB9O1xyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVPZmZlcihzZXRMb2NhbEFuZFNlbmRNZXNzYWdlLCBoYW5kbGVDcmVhdGVPZmZlckVycm9yLCB7fSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldExvY2FsQW5kU2VuZE1lc3NhZ2Uoc2Vzc2lvbkRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oc2Vzc2lvbkRlc2NyaXB0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICBpZDogaG9zdElkLFxyXG4gICAgICAgICAgICAgICAgcGVlcl9pZDogY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgICBzZHA6IHNlc3Npb25EZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdvZmZlcl9wMnAnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvcihldmVudCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuY2FuZGlkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgc2VuZCBjYW5kaWRhdGUgdG8gc2VydmVyIDogXCIgKyBlLmNhbmRpZGF0ZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdDbGllbnQgUGVlciBDb25uZWN0aW9uIGNhbmRpZGF0ZScsIGUuY2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBob3N0SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVlcl9pZDogY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJjYW5kaWRhdGVfcDJwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlczogW2UuY2FuZGlkYXRlXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29weUNhbmRpZGF0ZSA9IGZ1bmN0aW9uIChiYXNpY0NhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICBsZXQgY2xvbmVDYW5kaWRhdGUgPSBfLmNsb25lKGJhc2ljQ2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVEb21haW5Gcm9tVXJsKHVybCkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaDtcclxuICAgICAgICAgICAgaWYgKG1hdGNoID0gdXJsLm1hdGNoKC9eKD86d3NzPzpcXC9cXC8pPyg/OlteQFxcbl0rQCk/KD86d3d3XFwuKT8oW146XFwvXFxuXFw/XFw9XSspL2ltKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbWF0Y2hbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRJcChjYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgICAgICAgICAgbGV0IG1hdGNoO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoID0gY2FuZGlkYXRlLm1hdGNoKG5ldyBSZWdFeHAoXCJcXFxcYigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXGJcIiwgJ2dpJykpKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBtYXRjaFswXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdEb21haW4gPSBnZW5lcmF0ZURvbWFpbkZyb21Vcmwod2ViU29ja2V0VXJsKTtcclxuICAgICAgICBsZXQgaXAgPSBmaW5kSXAoY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgaWYgKGlwID09PSAnJyB8fCBpcCA9PT0gbmV3RG9tYWluKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBmaXJlZm94IGJyb3dzZXIgdGhyb3dzIGEgY2FuZGlkYXRlIHBhcnNpbmcgZXhjZXB0aW9uIHdoZW4gYSBkb21haW4gbmFtZSBpcyBzZXQgYXQgdGhlIGFkZHJlc3MgcHJvcGVydHkuIFNvIHdlIHJlc29sdmUgdGhlIGRucyB1c2luZyBnb29nbGUgZG5zIHJlc29sdmUgYXBpLlxyXG4gICAgICAgICAgICBpZiAoY3VycmVudEJyb3dzZXIuYnJvd3NlciA9PT0gJ0ZpcmVmb3gnICYmICFmaW5kSXAobmV3RG9tYWluKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGZldGNoKCdodHRwczovL2Rucy5nb29nbGUuY29tL3Jlc29sdmU/bmFtZT0nICsgbmV3RG9tYWluKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3AgPT4gcmVzcC5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLkFuc3dlciAmJiBkYXRhLkFuc3dlci5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuQW5zd2VyWzBdLmRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbHNvbHZlZElwID0gZGF0YS5BbnN3ZXJbMF0uZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlID0gY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlLnJlcGxhY2UoaXAsIHJlbHNvbHZlZElwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lQ2FuZGlkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUgPSBjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUucmVwbGFjZShpcCwgbmV3RG9tYWluKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoY2xvbmVDYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24sIGNhbmRpZGF0ZXMpIHtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjYW5kaWRhdGVzW2ldICYmIGNhbmRpZGF0ZXNbaV0uY2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJhc2ljQ2FuZGlkYXRlID0gY2FuZGlkYXRlc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShiYXNpY0NhbmRpZGF0ZSkpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImFkZEljZUNhbmRpZGF0ZSA6IHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2VuZXJhdGVQdWJsaWNDYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsb25lQ2FuZGlkYXRlUHJvbWlzZSA9IGNvcHlDYW5kaWRhdGUoYmFzaWNDYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVDYW5kaWRhdGVQcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lQ2FuZGlkYXRlUHJvbWlzZS50aGVuKGZ1bmN0aW9uIChjbG9uZUNhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZUNhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShjbG9uZUNhbmRpZGF0ZSkpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJjbG9uZWQgYWRkSWNlQ2FuZGlkYXRlIDogc3VjY2Vzc1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRXZWJTb2NrZXQocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICB3cyA9IG5ldyBXZWJTb2NrZXQod2ViU29ja2V0VXJsKTtcclxuXHJcbiAgICAgICAgICAgIHdzLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFwicmVxdWVzdF9vZmZlclwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB3c1BpbmcgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNlbmRNZXNzYWdlKHdzLCB7Y29tbWFuZDogXCJwaW5nXCJ9KTtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyB9LCAyMCAqIDEwMDApO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgd3Mub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBtZXNzYWdlLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMobWVzc2FnZSkubGVuZ3RoID09PSAwICYmIG1lc3NhZ2UuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0VtcHR5IE1lc3NhZ2UnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ3BpbmcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7Y29tbWFuZDogJ3BvbmcnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbWVzc2FnZS5pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0lEIG11c3QgYmUgbm90IG51bGwnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ29mZmVyJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVNYWluUGVlckNvbm5lY3Rpb24obWVzc2FnZS5pZCwgbWVzc2FnZS5wZWVyX2lkLCBtZXNzYWdlLnNkcCwgbWVzc2FnZS5jYW5kaWRhdGVzLCBtZXNzYWdlLmljZV9zZXJ2ZXJzLCByZXNvbHZlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5wZWVyX2lkID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoT01FX1AyUF9NT0RFLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihPTUVfUDJQX01PREUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAncmVxdWVzdF9vZmZlcl9wMnAnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uKG1lc3NhZ2UuaWQsIG1lc3NhZ2UucGVlcl9pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2Fuc3dlcl9wMnAnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbjEgPSBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQobWVzc2FnZS5wZWVyX2lkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24xLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24obWVzc2FnZS5zZHApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGVzYykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnY2FuZGlkYXRlJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDYW5kaWRhdGVzIGZvciBuZXcgY2xpZW50IHBlZXJcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24yID0gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKG1lc3NhZ2UuaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24yLCBtZXNzYWdlLmNhbmRpZGF0ZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdjYW5kaWRhdGVfcDJwJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDYW5kaWRhdGVzIGZvciBuZXcgY2xpZW50IHBlZXJcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24zID0gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKG1lc3NhZ2UucGVlcl9pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbjMsIG1lc3NhZ2UuY2FuZGlkYXRlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ3N0b3AnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJJZCA9PT0gbWVzc2FnZS5wZWVyX2lkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL015IHBhcmVudCB3YXMgZGVhZC4gQW5kIHRoZW4gSSB3aWxsIHJldHJ5LlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgY29ubmVjdGlvbiB3aXRoIGhvc3QgYW5kIHJldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjbG9zZSBjb25uZWN0aW9uIHdpdGggaG9zdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblN0cmVhbSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mbyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc2V0Q2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiAncmVxdWVzdF9vZmZlcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSBjb25uZWN0aW9uIHdpdGggY2xpZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGllbnRQZWVyQ29ubmVjdGlvbnNbbWVzc2FnZS5wZWVyX2lkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Nsb3NlIGNvbm5lY3Rpb24gd2l0aCBjbGllbnQ6ICcsIG1lc3NhZ2UucGVlcl9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbnNbbWVzc2FnZS5wZWVyX2lkXS5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNsaWVudFBlZXJDb25uZWN0aW9uc1ttZXNzYWdlLnBlZXJfaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB3cy5vbmNsb3NlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghd3NDbG9zZWRCeVBsYXllcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfV1NfRVJST1JdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1RdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB3cy5vbmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9XaHkgRWRnZSBCcm93c2VyIGNhbGxzIG9uZXJyb3IoKSB3aGVuIHdzLmNsb3NlKCk/XHJcbiAgICAgICAgICAgICAgICBpZiAoIXdzQ2xvc2VkQnlQbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfV1NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICBjbG9zZVBlZXIoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgY29ubmVjdGluZy4uLlwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciB1cmwgOiBcIiArIHdlYlNvY2tldFVybCk7XHJcblxyXG4gICAgICAgICAgICBpbml0V2ViU29ja2V0KHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQZWVyKGVycm9yKSB7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnV2ViUlRDIExvYWRlciBjbG9zZVBlZXIoKScpO1xyXG5cclxuICAgICAgICBpZiAoIWVycm9yKSB7XHJcbiAgICAgICAgICAgIHdzQ2xvc2VkQnlQbGF5ZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lcikge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KG1haW5QZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWFpblN0cmVhbSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3NpbmcgbWFpbiBwZWVyIGNvbm5lY3Rpb24uLi4nKTtcclxuICAgICAgICAgICAgaWYgKHN0YXRpc3RpY3NUaW1lcikge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN0YXRpc3RpY3NUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mbyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoY2xpZW50UGVlckNvbm5lY3Rpb25zKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBjbGllbnRJZCBpbiBjbGllbnRQZWVyQ29ubmVjdGlvbnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY2xpZW50UGVlckNvbm5lY3Rpb24gPSBjbGllbnRQZWVyQ29ubmVjdGlvbnNbY2xpZW50SWRdLnBlZXJDb25uZWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjbGllbnRQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyBjbGllbnQgcGVlciBjb25uZWN0aW9uLi4uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9ucyA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh3c1BpbmcpO1xyXG4gICAgICAgIHdzUGluZyA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh3cykge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3Npbmcgd2Vic29ja2V0IGNvbm5lY3Rpb24uLi4nKTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU2VuZCBTaWduYWxpbmcgOiBTdG9wLlwiKTtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgMCAoQ09OTkVDVElORylcclxuICAgICAgICAgICAgMSAoT1BFTilcclxuICAgICAgICAgICAgMiAoQ0xPU0lORylcclxuICAgICAgICAgICAgMyAoQ0xPU0VEKVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gMCB8fCB3cy5yZWFkeVN0YXRlID09PSAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgd3NDbG9zZWRCeVBsYXllciA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiAnc3RvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBtYWluUGVlckNvbm5lY3Rpb25JbmZvLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgd3MuY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3c0Nsb3NlZEJ5UGxheWVyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3cyA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICBlcnJvclRyaWdnZXIoZXJyb3IsIHByb3ZpZGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZE1lc3NhZ2Uod3MsIG1lc3NhZ2UpIHtcclxuXHJcbiAgICAgICAgaWYgKHdzKSB7XHJcbiAgICAgICAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5jb25uZWN0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpbml0aWFsaXplKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgICBjbG9zZVBlZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXZWJSVENMb2FkZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=