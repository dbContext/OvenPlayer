/*! ovenplayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (MIT) | Github : https://ovenplayer.com */
(window["webpackJsonpOvenPlayer"] = window["webpackJsonpOvenPlayer"] || []).push([["vttparser"],{

/***/ "./src/js/api/caption/parser/VttParser.js":
/*!************************************************!*\
  !*** ./src/js/api/caption/parser/VttParser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vttCue = __webpack_require__(/*! utils/captions/vttCue */ "./src/js/utils/captions/vttCue.js");

var _vttCue2 = _interopRequireDefault(_vttCue);

var _vttRegion = __webpack_require__(/*! utils/captions/vttRegion */ "./src/js/utils/captions/vttRegion.js");

var _vttRegion2 = _interopRequireDefault(_vttRegion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

/* vtt.js - v0.12.1 (https://github.com/mozilla/vtt.js) built on 03-12-2015 */
var WebVTT = function WebVTT() {};
function makeColorSet(color, opacity) {
    if (opacity === undefined) {
        opacity = 1;
    }
    return "rgba(" + [parseInt(color.substring(0, 2), 16), parseInt(color.substring(2, 4), 16), parseInt(color.substring(4, 6), 16), opacity].join(",") + ")";
}

var WebVTTPrefs = ['webvtt.font.color', 'webvtt.font.opacity', 'webvtt.font.scale', 'webvtt.bg.color', 'webvtt.bg.opacity', 'webvtt.edge.color', 'webvtt.edge.type'];

var fontScale = 1;

function observe(subject, topic, data) {
    switch (data) {
        case "webvtt.font.color":
        case "webvtt.font.opacity":
            var fontColor = Services.prefs.getCharPref("webvtt.font.color");
            var fontOpacity = Services.prefs.getIntPref("webvtt.font.opacity") / 100;
            WebVTTSet.fontSet = makeColorSet(fontColor, fontOpacity);
            break;
        case "webvtt.font.scale":
            fontScale = Services.prefs.getIntPref("webvtt.font.scale") / 100;
            break;
        case "webvtt.bg.color":
        case "webvtt.bg.opacity":
            var backgroundColor = Services.prefs.getCharPref("webvtt.bg.color");
            var backgroundOpacity = Services.prefs.getIntPref("webvtt.bg.opacity") / 100;
            WebVTTSet.backgroundSet = makeColorSet(backgroundColor, backgroundOpacity);
            break;
        case "webvtt.edge.color":
        case "webvtt.edge.type":
            var edgeTypeList = ["", "0px 0px ", "4px 4px 4px ", "-2px -2px ", "2px 2px "];
            var edgeType = Services.prefs.getIntPref("webvtt.edge.type");
            var edgeColor = Services.prefs.getCharPref("webvtt.edge.color");
            WebVTTSet.edgeSet = edgeTypeList[edgeType] + makeColorSet(edgeColor);
            break;
    }
}

if (typeof Services !== "undefined") {
    var WebVTTSet = {};
    WebVTTPrefs.forEach(function (pref) {
        observe(undefined, undefined, pref);
        Services.prefs.addObserver(pref, observe, false);
    });
}

var _objCreate = Object.create || function () {
    function F() {}
    return function (o) {
        if (arguments.length !== 1) {
            throw new Error('Object.create shim only accepts one parameter.');
        }
        F.prototype = o;
        return new F();
    };
}();

// Creates a new ParserError object from an errorData object. The errorData
// object should have default code and message properties. The default message
// property can be overriden by passing in a message parameter.
// See ParsingError.Errors below for acceptable errors.
function ParsingError(errorData, message) {
    this.name = "ParsingError";
    this.code = errorData.code;
    this.message = message || errorData.message;
}
ParsingError.prototype = _objCreate(Error.prototype);
ParsingError.prototype.constructor = ParsingError;

// ParsingError metadata for acceptable ParsingErrors.
ParsingError.Errors = {
    BadSignature: {
        code: 0,
        message: "Malformed WebVTT signature."
    },
    BadTimeStamp: {
        code: 1,
        message: "Malformed time stamp."
    }
};

// Try to parse input as a time stamp.
function parseTimeStamp(input) {

    function computeSeconds(h, m, s, f) {
        return (h | 0) * 3600 + (m | 0) * 60 + (s | 0) + (f | 0) / 1000;
    }

    var m = input.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
    if (!m) {
        return null;
    }

    if (m[3]) {
        // Timestamp takes the form of [hours]:[minutes]:[seconds].[milliseconds]
        return computeSeconds(m[1], m[2], m[3].replace(":", ""), m[4]);
    } else if (m[1] > 59) {
        // Timestamp takes the form of [hours]:[minutes].[milliseconds]
        // First position is hours as it's over 59.
        return computeSeconds(m[1], m[2], 0, m[4]);
    } else {
        // Timestamp takes the form of [minutes]:[seconds].[milliseconds]
        return computeSeconds(0, m[1], m[2], m[4]);
    }
}

// A settings object holds key/value pairs and will ignore anything but the first
// assignment to a specific key.
function Settings() {
    this.values = _objCreate(null);
}

Settings.prototype = {
    // Only accept the first assignment to any key.
    set: function set(k, v) {
        if (!this.get(k) && v !== "") {
            this.values[k] = v;
        }
    },
    // Return the value for a key, or a default value.
    // If 'defaultKey' is passed then 'dflt' is assumed to be an object with
    // a number of possible default values as properties where 'defaultKey' is
    // the key of the property that will be chosen; otherwise it's assumed to be
    // a single value.
    get: function get(k, dflt, defaultKey) {
        if (defaultKey) {
            return this.has(k) ? this.values[k] : dflt[defaultKey];
        }
        return this.has(k) ? this.values[k] : dflt;
    },
    // Check whether we have a value for a key.
    has: function has(k) {
        return k in this.values;
    },
    // Accept a setting if its one of the given alternatives.
    alt: function alt(k, v, a) {
        for (var n = 0; n < a.length; ++n) {
            if (v === a[n]) {
                this.set(k, v);
                break;
            }
        }
    },
    // Accept a setting if its a valid (signed) integer.
    integer: function integer(k, v) {
        if (/^-?\d+$/.test(v)) {
            // integer
            this.set(k, parseInt(v, 10));
        }
    },
    // Accept a setting if its a valid percentage.
    percent: function percent(k, v) {
        var m;
        if (m = v.match(/^([\d]{1,3})(\.[\d]*)?%$/)) {
            v = parseFloat(v);
            if (v >= 0 && v <= 100) {
                this.set(k, v);
                return true;
            }
        }
        return false;
    }
};

// Helper function to parse input into groups separated by 'groupDelim', and
// interprete each group as a key/value pair separated by 'keyValueDelim'.
function parseOptions(input, callback, keyValueDelim, groupDelim) {
    var groups = groupDelim ? input.split(groupDelim) : [input];
    for (var i in groups) {
        if (typeof groups[i] !== "string") {
            continue;
        }
        var kv = groups[i].split(keyValueDelim);
        if (kv.length !== 2) {
            continue;
        }
        var k = kv[0];
        var v = kv[1];
        callback(k, v);
    }
}

function parseCue(input, cue, regionList) {
    // Remember the original input if we need to throw an error.
    var oInput = input;
    // 4.1 WebVTT timestamp
    function consumeTimeStamp() {
        var ts = parseTimeStamp(input);
        if (ts === null) {
            throw new ParsingError(ParsingError.Errors.BadTimeStamp, "Malformed timestamp: " + oInput);
        }
        // Remove time stamp from input.
        input = input.replace(/^[^\sa-zA-Z-]+/, "");
        return ts;
    }

    // 4.4.2 WebVTT cue settings
    function consumeCueSettings(input, cue) {
        var settings = new Settings();

        parseOptions(input, function (k, v) {
            switch (k) {
                case "region":
                    // Find the last region we parsed with the same region id.
                    for (var i = regionList.length - 1; i >= 0; i--) {
                        if (regionList[i].id === v) {
                            settings.set(k, regionList[i].region);
                            break;
                        }
                    }
                    break;
                case "vertical":
                    settings.alt(k, v, ["rl", "lr"]);
                    break;
                case "line":
                    var vals = v.split(","),
                        vals0 = vals[0];
                    settings.integer(k, vals0);
                    settings.percent(k, vals0) ? settings.set("snapToLines", false) : null;
                    settings.alt(k, vals0, ["auto"]);
                    if (vals.length === 2) {
                        settings.alt("lineAlign", vals[1], ["start", "middle", "end"]);
                    }
                    break;
                case "position":
                    vals = v.split(",");
                    settings.percent(k, vals[0]);
                    if (vals.length === 2) {
                        settings.alt("positionAlign", vals[1], ["start", "middle", "end"]);
                    }
                    break;
                case "size":
                    settings.percent(k, v);
                    break;
                case "align":
                    settings.alt(k, v, ["start", "middle", "end", "left", "right"]);
                    break;
            }
        }, /:/, /\s/);

        //hslee remove these fields.
        //Because safari dies here always. And Player doen't use style fields.
        // Apply default values for any missing fields.
        /*cue.region = settings.get("region", null);
        cue.vertical = settings.get("vertical", "");
        cue.line = settings.get("line", "auto");
        cue.lineAlign = settings.get("lineAlign", "start");
        cue.snapToLines = settings.get("snapToLines", true);
        cue.size = settings.get("size", 100);
        //cue.align = settings.get("align", "middle");
        cue.position = settings.get("position", "auto");
        cue.positionAlign = settings.get("positionAlign", {
            start: "start",
            left: "start",
            middle: "middle",
            end: "end",
            right: "end"
        }, cue.align
        );*/
    }

    function skipWhitespace() {
        input = input.replace(/^\s+/, "");
    }

    // 4.1 WebVTT cue timings.
    skipWhitespace();
    cue.startTime = consumeTimeStamp(); // (1) collect cue start time
    skipWhitespace();
    if (input.substr(0, 3) !== "-->") {
        // (3) next characters must match "-->"
        throw new ParsingError(ParsingError.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '-->'): " + oInput);
    }
    input = input.substr(3);
    skipWhitespace();
    cue.endTime = consumeTimeStamp(); // (5) collect cue end time

    // 4.1 WebVTT cue settings list.
    skipWhitespace();
    consumeCueSettings(input, cue);
}

var ESCAPE = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&lrm;": '\u200E',
    "&rlm;": '\u200F',
    "&nbsp;": '\xA0'
};

var TAG_NAME = {
    c: "span",
    i: "i",
    b: "b",
    u: "u",
    ruby: "ruby",
    rt: "rt",
    v: "span",
    lang: "span"
};

var TAG_ANNOTATION = {
    v: "title",
    lang: "lang"
};

var NEEDS_PARENT = {
    rt: "ruby"
};

// Parse content into a document fragment.
function parseContent(window, input) {
    function nextToken() {
        // Check for end-of-string.
        if (!input) {
            return null;
        }

        // Consume 'n' characters from the input.
        function consume(result) {
            input = input.substr(result.length);
            return result;
        }

        var m = input.match(/^([^<]*)(<[^>]+>?)?/);
        // If there is some text before the next tag, return it, otherwise return
        // the tag.
        return consume(m[1] ? m[1] : m[2]);
    }

    // Unescape a string 's'.
    function unescape1(e) {
        return ESCAPE[e];
    }
    function unescape(s) {
        while (m = s.match(/&(amp|lt|gt|lrm|rlm|nbsp);/)) {
            s = s.replace(m[0], unescape1);
        }
        return s;
    }

    function shouldAdd(current, element) {
        return !NEEDS_PARENT[element.localName] || NEEDS_PARENT[element.localName] === current.localName;
    }

    // Create an element for this tag.
    function createElement(type, annotation) {
        var tagName = TAG_NAME[type];
        if (!tagName) {
            return null;
        }
        var element = window.document.createElement(tagName);
        element.localName = tagName;
        var name = TAG_ANNOTATION[type];
        if (name && annotation) {
            element[name] = annotation.trim();
        }
        return element;
    }

    var rootDiv = window.document.createElement("div"),
        current = rootDiv,
        t,
        tagStack = [];

    while ((t = nextToken()) !== null) {
        if (t[0] === '<') {
            if (t[1] === "/") {
                // If the closing tag matches, move back up to the parent node.
                if (tagStack.length && tagStack[tagStack.length - 1] === t.substr(2).replace(">", "")) {
                    tagStack.pop();
                    current = current.parentNode;
                }
                // Otherwise just ignore the end tag.
                continue;
            }
            var ts = parseTimeStamp(t.substr(1, t.length - 2));
            var node;
            if (ts) {
                // Timestamps are lead nodes as well.
                node = window.document.createProcessingInstruction("timestamp", ts);
                current.appendChild(node);
                continue;
            }
            var m = t.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
            // If we can't parse the tag, skip to the next tag.
            if (!m) {
                continue;
            }
            // Try to construct an element, and ignore the tag if we couldn't.
            node = createElement(m[1], m[3]);
            if (!node) {
                continue;
            }
            // Determine if the tag should be added based on the context of where it
            // is placed in the cuetext.
            if (!shouldAdd(current, node)) {
                continue;
            }
            // Set the class list (as a list of classes, separated by space).
            if (m[2]) {
                node.className = m[2].substr(1).replace('.', ' ');
            }
            // Append the node to the current node, and enter the scope of the new
            // node.
            tagStack.push(m[1]);
            current.appendChild(node);
            current = node;
            continue;
        }

        // Text nodes are leaf nodes.
        current.appendChild(window.document.createTextNode(unescape(t)));
    }

    return rootDiv;
}

// This is a list of all the Unicode characters that have a strong
// right-to-left category. What this means is that these characters are
// written right-to-left for sure. It was generated by pulling all the strong
// right-to-left characters out of the Unicode data table. That table can
// found at: http://www.unicode.org/Public/UNIDATA/UnicodeData.txt
var strongRTLChars = [0x05BE, 0x05C0, 0x05C3, 0x05C6, 0x05D0, 0x05D1, 0x05D2, 0x05D3, 0x05D4, 0x05D5, 0x05D6, 0x05D7, 0x05D8, 0x05D9, 0x05DA, 0x05DB, 0x05DC, 0x05DD, 0x05DE, 0x05DF, 0x05E0, 0x05E1, 0x05E2, 0x05E3, 0x05E4, 0x05E5, 0x05E6, 0x05E7, 0x05E8, 0x05E9, 0x05EA, 0x05F0, 0x05F1, 0x05F2, 0x05F3, 0x05F4, 0x0608, 0x060B, 0x060D, 0x061B, 0x061E, 0x061F, 0x0620, 0x0621, 0x0622, 0x0623, 0x0624, 0x0625, 0x0626, 0x0627, 0x0628, 0x0629, 0x062A, 0x062B, 0x062C, 0x062D, 0x062E, 0x062F, 0x0630, 0x0631, 0x0632, 0x0633, 0x0634, 0x0635, 0x0636, 0x0637, 0x0638, 0x0639, 0x063A, 0x063B, 0x063C, 0x063D, 0x063E, 0x063F, 0x0640, 0x0641, 0x0642, 0x0643, 0x0644, 0x0645, 0x0646, 0x0647, 0x0648, 0x0649, 0x064A, 0x066D, 0x066E, 0x066F, 0x0671, 0x0672, 0x0673, 0x0674, 0x0675, 0x0676, 0x0677, 0x0678, 0x0679, 0x067A, 0x067B, 0x067C, 0x067D, 0x067E, 0x067F, 0x0680, 0x0681, 0x0682, 0x0683, 0x0684, 0x0685, 0x0686, 0x0687, 0x0688, 0x0689, 0x068A, 0x068B, 0x068C, 0x068D, 0x068E, 0x068F, 0x0690, 0x0691, 0x0692, 0x0693, 0x0694, 0x0695, 0x0696, 0x0697, 0x0698, 0x0699, 0x069A, 0x069B, 0x069C, 0x069D, 0x069E, 0x069F, 0x06A0, 0x06A1, 0x06A2, 0x06A3, 0x06A4, 0x06A5, 0x06A6, 0x06A7, 0x06A8, 0x06A9, 0x06AA, 0x06AB, 0x06AC, 0x06AD, 0x06AE, 0x06AF, 0x06B0, 0x06B1, 0x06B2, 0x06B3, 0x06B4, 0x06B5, 0x06B6, 0x06B7, 0x06B8, 0x06B9, 0x06BA, 0x06BB, 0x06BC, 0x06BD, 0x06BE, 0x06BF, 0x06C0, 0x06C1, 0x06C2, 0x06C3, 0x06C4, 0x06C5, 0x06C6, 0x06C7, 0x06C8, 0x06C9, 0x06CA, 0x06CB, 0x06CC, 0x06CD, 0x06CE, 0x06CF, 0x06D0, 0x06D1, 0x06D2, 0x06D3, 0x06D4, 0x06D5, 0x06E5, 0x06E6, 0x06EE, 0x06EF, 0x06FA, 0x06FB, 0x06FC, 0x06FD, 0x06FE, 0x06FF, 0x0700, 0x0701, 0x0702, 0x0703, 0x0704, 0x0705, 0x0706, 0x0707, 0x0708, 0x0709, 0x070A, 0x070B, 0x070C, 0x070D, 0x070F, 0x0710, 0x0712, 0x0713, 0x0714, 0x0715, 0x0716, 0x0717, 0x0718, 0x0719, 0x071A, 0x071B, 0x071C, 0x071D, 0x071E, 0x071F, 0x0720, 0x0721, 0x0722, 0x0723, 0x0724, 0x0725, 0x0726, 0x0727, 0x0728, 0x0729, 0x072A, 0x072B, 0x072C, 0x072D, 0x072E, 0x072F, 0x074D, 0x074E, 0x074F, 0x0750, 0x0751, 0x0752, 0x0753, 0x0754, 0x0755, 0x0756, 0x0757, 0x0758, 0x0759, 0x075A, 0x075B, 0x075C, 0x075D, 0x075E, 0x075F, 0x0760, 0x0761, 0x0762, 0x0763, 0x0764, 0x0765, 0x0766, 0x0767, 0x0768, 0x0769, 0x076A, 0x076B, 0x076C, 0x076D, 0x076E, 0x076F, 0x0770, 0x0771, 0x0772, 0x0773, 0x0774, 0x0775, 0x0776, 0x0777, 0x0778, 0x0779, 0x077A, 0x077B, 0x077C, 0x077D, 0x077E, 0x077F, 0x0780, 0x0781, 0x0782, 0x0783, 0x0784, 0x0785, 0x0786, 0x0787, 0x0788, 0x0789, 0x078A, 0x078B, 0x078C, 0x078D, 0x078E, 0x078F, 0x0790, 0x0791, 0x0792, 0x0793, 0x0794, 0x0795, 0x0796, 0x0797, 0x0798, 0x0799, 0x079A, 0x079B, 0x079C, 0x079D, 0x079E, 0x079F, 0x07A0, 0x07A1, 0x07A2, 0x07A3, 0x07A4, 0x07A5, 0x07B1, 0x07C0, 0x07C1, 0x07C2, 0x07C3, 0x07C4, 0x07C5, 0x07C6, 0x07C7, 0x07C8, 0x07C9, 0x07CA, 0x07CB, 0x07CC, 0x07CD, 0x07CE, 0x07CF, 0x07D0, 0x07D1, 0x07D2, 0x07D3, 0x07D4, 0x07D5, 0x07D6, 0x07D7, 0x07D8, 0x07D9, 0x07DA, 0x07DB, 0x07DC, 0x07DD, 0x07DE, 0x07DF, 0x07E0, 0x07E1, 0x07E2, 0x07E3, 0x07E4, 0x07E5, 0x07E6, 0x07E7, 0x07E8, 0x07E9, 0x07EA, 0x07F4, 0x07F5, 0x07FA, 0x0800, 0x0801, 0x0802, 0x0803, 0x0804, 0x0805, 0x0806, 0x0807, 0x0808, 0x0809, 0x080A, 0x080B, 0x080C, 0x080D, 0x080E, 0x080F, 0x0810, 0x0811, 0x0812, 0x0813, 0x0814, 0x0815, 0x081A, 0x0824, 0x0828, 0x0830, 0x0831, 0x0832, 0x0833, 0x0834, 0x0835, 0x0836, 0x0837, 0x0838, 0x0839, 0x083A, 0x083B, 0x083C, 0x083D, 0x083E, 0x0840, 0x0841, 0x0842, 0x0843, 0x0844, 0x0845, 0x0846, 0x0847, 0x0848, 0x0849, 0x084A, 0x084B, 0x084C, 0x084D, 0x084E, 0x084F, 0x0850, 0x0851, 0x0852, 0x0853, 0x0854, 0x0855, 0x0856, 0x0857, 0x0858, 0x085E, 0x08A0, 0x08A2, 0x08A3, 0x08A4, 0x08A5, 0x08A6, 0x08A7, 0x08A8, 0x08A9, 0x08AA, 0x08AB, 0x08AC, 0x200F, 0xFB1D, 0xFB1F, 0xFB20, 0xFB21, 0xFB22, 0xFB23, 0xFB24, 0xFB25, 0xFB26, 0xFB27, 0xFB28, 0xFB2A, 0xFB2B, 0xFB2C, 0xFB2D, 0xFB2E, 0xFB2F, 0xFB30, 0xFB31, 0xFB32, 0xFB33, 0xFB34, 0xFB35, 0xFB36, 0xFB38, 0xFB39, 0xFB3A, 0xFB3B, 0xFB3C, 0xFB3E, 0xFB40, 0xFB41, 0xFB43, 0xFB44, 0xFB46, 0xFB47, 0xFB48, 0xFB49, 0xFB4A, 0xFB4B, 0xFB4C, 0xFB4D, 0xFB4E, 0xFB4F, 0xFB50, 0xFB51, 0xFB52, 0xFB53, 0xFB54, 0xFB55, 0xFB56, 0xFB57, 0xFB58, 0xFB59, 0xFB5A, 0xFB5B, 0xFB5C, 0xFB5D, 0xFB5E, 0xFB5F, 0xFB60, 0xFB61, 0xFB62, 0xFB63, 0xFB64, 0xFB65, 0xFB66, 0xFB67, 0xFB68, 0xFB69, 0xFB6A, 0xFB6B, 0xFB6C, 0xFB6D, 0xFB6E, 0xFB6F, 0xFB70, 0xFB71, 0xFB72, 0xFB73, 0xFB74, 0xFB75, 0xFB76, 0xFB77, 0xFB78, 0xFB79, 0xFB7A, 0xFB7B, 0xFB7C, 0xFB7D, 0xFB7E, 0xFB7F, 0xFB80, 0xFB81, 0xFB82, 0xFB83, 0xFB84, 0xFB85, 0xFB86, 0xFB87, 0xFB88, 0xFB89, 0xFB8A, 0xFB8B, 0xFB8C, 0xFB8D, 0xFB8E, 0xFB8F, 0xFB90, 0xFB91, 0xFB92, 0xFB93, 0xFB94, 0xFB95, 0xFB96, 0xFB97, 0xFB98, 0xFB99, 0xFB9A, 0xFB9B, 0xFB9C, 0xFB9D, 0xFB9E, 0xFB9F, 0xFBA0, 0xFBA1, 0xFBA2, 0xFBA3, 0xFBA4, 0xFBA5, 0xFBA6, 0xFBA7, 0xFBA8, 0xFBA9, 0xFBAA, 0xFBAB, 0xFBAC, 0xFBAD, 0xFBAE, 0xFBAF, 0xFBB0, 0xFBB1, 0xFBB2, 0xFBB3, 0xFBB4, 0xFBB5, 0xFBB6, 0xFBB7, 0xFBB8, 0xFBB9, 0xFBBA, 0xFBBB, 0xFBBC, 0xFBBD, 0xFBBE, 0xFBBF, 0xFBC0, 0xFBC1, 0xFBD3, 0xFBD4, 0xFBD5, 0xFBD6, 0xFBD7, 0xFBD8, 0xFBD9, 0xFBDA, 0xFBDB, 0xFBDC, 0xFBDD, 0xFBDE, 0xFBDF, 0xFBE0, 0xFBE1, 0xFBE2, 0xFBE3, 0xFBE4, 0xFBE5, 0xFBE6, 0xFBE7, 0xFBE8, 0xFBE9, 0xFBEA, 0xFBEB, 0xFBEC, 0xFBED, 0xFBEE, 0xFBEF, 0xFBF0, 0xFBF1, 0xFBF2, 0xFBF3, 0xFBF4, 0xFBF5, 0xFBF6, 0xFBF7, 0xFBF8, 0xFBF9, 0xFBFA, 0xFBFB, 0xFBFC, 0xFBFD, 0xFBFE, 0xFBFF, 0xFC00, 0xFC01, 0xFC02, 0xFC03, 0xFC04, 0xFC05, 0xFC06, 0xFC07, 0xFC08, 0xFC09, 0xFC0A, 0xFC0B, 0xFC0C, 0xFC0D, 0xFC0E, 0xFC0F, 0xFC10, 0xFC11, 0xFC12, 0xFC13, 0xFC14, 0xFC15, 0xFC16, 0xFC17, 0xFC18, 0xFC19, 0xFC1A, 0xFC1B, 0xFC1C, 0xFC1D, 0xFC1E, 0xFC1F, 0xFC20, 0xFC21, 0xFC22, 0xFC23, 0xFC24, 0xFC25, 0xFC26, 0xFC27, 0xFC28, 0xFC29, 0xFC2A, 0xFC2B, 0xFC2C, 0xFC2D, 0xFC2E, 0xFC2F, 0xFC30, 0xFC31, 0xFC32, 0xFC33, 0xFC34, 0xFC35, 0xFC36, 0xFC37, 0xFC38, 0xFC39, 0xFC3A, 0xFC3B, 0xFC3C, 0xFC3D, 0xFC3E, 0xFC3F, 0xFC40, 0xFC41, 0xFC42, 0xFC43, 0xFC44, 0xFC45, 0xFC46, 0xFC47, 0xFC48, 0xFC49, 0xFC4A, 0xFC4B, 0xFC4C, 0xFC4D, 0xFC4E, 0xFC4F, 0xFC50, 0xFC51, 0xFC52, 0xFC53, 0xFC54, 0xFC55, 0xFC56, 0xFC57, 0xFC58, 0xFC59, 0xFC5A, 0xFC5B, 0xFC5C, 0xFC5D, 0xFC5E, 0xFC5F, 0xFC60, 0xFC61, 0xFC62, 0xFC63, 0xFC64, 0xFC65, 0xFC66, 0xFC67, 0xFC68, 0xFC69, 0xFC6A, 0xFC6B, 0xFC6C, 0xFC6D, 0xFC6E, 0xFC6F, 0xFC70, 0xFC71, 0xFC72, 0xFC73, 0xFC74, 0xFC75, 0xFC76, 0xFC77, 0xFC78, 0xFC79, 0xFC7A, 0xFC7B, 0xFC7C, 0xFC7D, 0xFC7E, 0xFC7F, 0xFC80, 0xFC81, 0xFC82, 0xFC83, 0xFC84, 0xFC85, 0xFC86, 0xFC87, 0xFC88, 0xFC89, 0xFC8A, 0xFC8B, 0xFC8C, 0xFC8D, 0xFC8E, 0xFC8F, 0xFC90, 0xFC91, 0xFC92, 0xFC93, 0xFC94, 0xFC95, 0xFC96, 0xFC97, 0xFC98, 0xFC99, 0xFC9A, 0xFC9B, 0xFC9C, 0xFC9D, 0xFC9E, 0xFC9F, 0xFCA0, 0xFCA1, 0xFCA2, 0xFCA3, 0xFCA4, 0xFCA5, 0xFCA6, 0xFCA7, 0xFCA8, 0xFCA9, 0xFCAA, 0xFCAB, 0xFCAC, 0xFCAD, 0xFCAE, 0xFCAF, 0xFCB0, 0xFCB1, 0xFCB2, 0xFCB3, 0xFCB4, 0xFCB5, 0xFCB6, 0xFCB7, 0xFCB8, 0xFCB9, 0xFCBA, 0xFCBB, 0xFCBC, 0xFCBD, 0xFCBE, 0xFCBF, 0xFCC0, 0xFCC1, 0xFCC2, 0xFCC3, 0xFCC4, 0xFCC5, 0xFCC6, 0xFCC7, 0xFCC8, 0xFCC9, 0xFCCA, 0xFCCB, 0xFCCC, 0xFCCD, 0xFCCE, 0xFCCF, 0xFCD0, 0xFCD1, 0xFCD2, 0xFCD3, 0xFCD4, 0xFCD5, 0xFCD6, 0xFCD7, 0xFCD8, 0xFCD9, 0xFCDA, 0xFCDB, 0xFCDC, 0xFCDD, 0xFCDE, 0xFCDF, 0xFCE0, 0xFCE1, 0xFCE2, 0xFCE3, 0xFCE4, 0xFCE5, 0xFCE6, 0xFCE7, 0xFCE8, 0xFCE9, 0xFCEA, 0xFCEB, 0xFCEC, 0xFCED, 0xFCEE, 0xFCEF, 0xFCF0, 0xFCF1, 0xFCF2, 0xFCF3, 0xFCF4, 0xFCF5, 0xFCF6, 0xFCF7, 0xFCF8, 0xFCF9, 0xFCFA, 0xFCFB, 0xFCFC, 0xFCFD, 0xFCFE, 0xFCFF, 0xFD00, 0xFD01, 0xFD02, 0xFD03, 0xFD04, 0xFD05, 0xFD06, 0xFD07, 0xFD08, 0xFD09, 0xFD0A, 0xFD0B, 0xFD0C, 0xFD0D, 0xFD0E, 0xFD0F, 0xFD10, 0xFD11, 0xFD12, 0xFD13, 0xFD14, 0xFD15, 0xFD16, 0xFD17, 0xFD18, 0xFD19, 0xFD1A, 0xFD1B, 0xFD1C, 0xFD1D, 0xFD1E, 0xFD1F, 0xFD20, 0xFD21, 0xFD22, 0xFD23, 0xFD24, 0xFD25, 0xFD26, 0xFD27, 0xFD28, 0xFD29, 0xFD2A, 0xFD2B, 0xFD2C, 0xFD2D, 0xFD2E, 0xFD2F, 0xFD30, 0xFD31, 0xFD32, 0xFD33, 0xFD34, 0xFD35, 0xFD36, 0xFD37, 0xFD38, 0xFD39, 0xFD3A, 0xFD3B, 0xFD3C, 0xFD3D, 0xFD50, 0xFD51, 0xFD52, 0xFD53, 0xFD54, 0xFD55, 0xFD56, 0xFD57, 0xFD58, 0xFD59, 0xFD5A, 0xFD5B, 0xFD5C, 0xFD5D, 0xFD5E, 0xFD5F, 0xFD60, 0xFD61, 0xFD62, 0xFD63, 0xFD64, 0xFD65, 0xFD66, 0xFD67, 0xFD68, 0xFD69, 0xFD6A, 0xFD6B, 0xFD6C, 0xFD6D, 0xFD6E, 0xFD6F, 0xFD70, 0xFD71, 0xFD72, 0xFD73, 0xFD74, 0xFD75, 0xFD76, 0xFD77, 0xFD78, 0xFD79, 0xFD7A, 0xFD7B, 0xFD7C, 0xFD7D, 0xFD7E, 0xFD7F, 0xFD80, 0xFD81, 0xFD82, 0xFD83, 0xFD84, 0xFD85, 0xFD86, 0xFD87, 0xFD88, 0xFD89, 0xFD8A, 0xFD8B, 0xFD8C, 0xFD8D, 0xFD8E, 0xFD8F, 0xFD92, 0xFD93, 0xFD94, 0xFD95, 0xFD96, 0xFD97, 0xFD98, 0xFD99, 0xFD9A, 0xFD9B, 0xFD9C, 0xFD9D, 0xFD9E, 0xFD9F, 0xFDA0, 0xFDA1, 0xFDA2, 0xFDA3, 0xFDA4, 0xFDA5, 0xFDA6, 0xFDA7, 0xFDA8, 0xFDA9, 0xFDAA, 0xFDAB, 0xFDAC, 0xFDAD, 0xFDAE, 0xFDAF, 0xFDB0, 0xFDB1, 0xFDB2, 0xFDB3, 0xFDB4, 0xFDB5, 0xFDB6, 0xFDB7, 0xFDB8, 0xFDB9, 0xFDBA, 0xFDBB, 0xFDBC, 0xFDBD, 0xFDBE, 0xFDBF, 0xFDC0, 0xFDC1, 0xFDC2, 0xFDC3, 0xFDC4, 0xFDC5, 0xFDC6, 0xFDC7, 0xFDF0, 0xFDF1, 0xFDF2, 0xFDF3, 0xFDF4, 0xFDF5, 0xFDF6, 0xFDF7, 0xFDF8, 0xFDF9, 0xFDFA, 0xFDFB, 0xFDFC, 0xFE70, 0xFE71, 0xFE72, 0xFE73, 0xFE74, 0xFE76, 0xFE77, 0xFE78, 0xFE79, 0xFE7A, 0xFE7B, 0xFE7C, 0xFE7D, 0xFE7E, 0xFE7F, 0xFE80, 0xFE81, 0xFE82, 0xFE83, 0xFE84, 0xFE85, 0xFE86, 0xFE87, 0xFE88, 0xFE89, 0xFE8A, 0xFE8B, 0xFE8C, 0xFE8D, 0xFE8E, 0xFE8F, 0xFE90, 0xFE91, 0xFE92, 0xFE93, 0xFE94, 0xFE95, 0xFE96, 0xFE97, 0xFE98, 0xFE99, 0xFE9A, 0xFE9B, 0xFE9C, 0xFE9D, 0xFE9E, 0xFE9F, 0xFEA0, 0xFEA1, 0xFEA2, 0xFEA3, 0xFEA4, 0xFEA5, 0xFEA6, 0xFEA7, 0xFEA8, 0xFEA9, 0xFEAA, 0xFEAB, 0xFEAC, 0xFEAD, 0xFEAE, 0xFEAF, 0xFEB0, 0xFEB1, 0xFEB2, 0xFEB3, 0xFEB4, 0xFEB5, 0xFEB6, 0xFEB7, 0xFEB8, 0xFEB9, 0xFEBA, 0xFEBB, 0xFEBC, 0xFEBD, 0xFEBE, 0xFEBF, 0xFEC0, 0xFEC1, 0xFEC2, 0xFEC3, 0xFEC4, 0xFEC5, 0xFEC6, 0xFEC7, 0xFEC8, 0xFEC9, 0xFECA, 0xFECB, 0xFECC, 0xFECD, 0xFECE, 0xFECF, 0xFED0, 0xFED1, 0xFED2, 0xFED3, 0xFED4, 0xFED5, 0xFED6, 0xFED7, 0xFED8, 0xFED9, 0xFEDA, 0xFEDB, 0xFEDC, 0xFEDD, 0xFEDE, 0xFEDF, 0xFEE0, 0xFEE1, 0xFEE2, 0xFEE3, 0xFEE4, 0xFEE5, 0xFEE6, 0xFEE7, 0xFEE8, 0xFEE9, 0xFEEA, 0xFEEB, 0xFEEC, 0xFEED, 0xFEEE, 0xFEEF, 0xFEF0, 0xFEF1, 0xFEF2, 0xFEF3, 0xFEF4, 0xFEF5, 0xFEF6, 0xFEF7, 0xFEF8, 0xFEF9, 0xFEFA, 0xFEFB, 0xFEFC, 0x10800, 0x10801, 0x10802, 0x10803, 0x10804, 0x10805, 0x10808, 0x1080A, 0x1080B, 0x1080C, 0x1080D, 0x1080E, 0x1080F, 0x10810, 0x10811, 0x10812, 0x10813, 0x10814, 0x10815, 0x10816, 0x10817, 0x10818, 0x10819, 0x1081A, 0x1081B, 0x1081C, 0x1081D, 0x1081E, 0x1081F, 0x10820, 0x10821, 0x10822, 0x10823, 0x10824, 0x10825, 0x10826, 0x10827, 0x10828, 0x10829, 0x1082A, 0x1082B, 0x1082C, 0x1082D, 0x1082E, 0x1082F, 0x10830, 0x10831, 0x10832, 0x10833, 0x10834, 0x10835, 0x10837, 0x10838, 0x1083C, 0x1083F, 0x10840, 0x10841, 0x10842, 0x10843, 0x10844, 0x10845, 0x10846, 0x10847, 0x10848, 0x10849, 0x1084A, 0x1084B, 0x1084C, 0x1084D, 0x1084E, 0x1084F, 0x10850, 0x10851, 0x10852, 0x10853, 0x10854, 0x10855, 0x10857, 0x10858, 0x10859, 0x1085A, 0x1085B, 0x1085C, 0x1085D, 0x1085E, 0x1085F, 0x10900, 0x10901, 0x10902, 0x10903, 0x10904, 0x10905, 0x10906, 0x10907, 0x10908, 0x10909, 0x1090A, 0x1090B, 0x1090C, 0x1090D, 0x1090E, 0x1090F, 0x10910, 0x10911, 0x10912, 0x10913, 0x10914, 0x10915, 0x10916, 0x10917, 0x10918, 0x10919, 0x1091A, 0x1091B, 0x10920, 0x10921, 0x10922, 0x10923, 0x10924, 0x10925, 0x10926, 0x10927, 0x10928, 0x10929, 0x1092A, 0x1092B, 0x1092C, 0x1092D, 0x1092E, 0x1092F, 0x10930, 0x10931, 0x10932, 0x10933, 0x10934, 0x10935, 0x10936, 0x10937, 0x10938, 0x10939, 0x1093F, 0x10980, 0x10981, 0x10982, 0x10983, 0x10984, 0x10985, 0x10986, 0x10987, 0x10988, 0x10989, 0x1098A, 0x1098B, 0x1098C, 0x1098D, 0x1098E, 0x1098F, 0x10990, 0x10991, 0x10992, 0x10993, 0x10994, 0x10995, 0x10996, 0x10997, 0x10998, 0x10999, 0x1099A, 0x1099B, 0x1099C, 0x1099D, 0x1099E, 0x1099F, 0x109A0, 0x109A1, 0x109A2, 0x109A3, 0x109A4, 0x109A5, 0x109A6, 0x109A7, 0x109A8, 0x109A9, 0x109AA, 0x109AB, 0x109AC, 0x109AD, 0x109AE, 0x109AF, 0x109B0, 0x109B1, 0x109B2, 0x109B3, 0x109B4, 0x109B5, 0x109B6, 0x109B7, 0x109BE, 0x109BF, 0x10A00, 0x10A10, 0x10A11, 0x10A12, 0x10A13, 0x10A15, 0x10A16, 0x10A17, 0x10A19, 0x10A1A, 0x10A1B, 0x10A1C, 0x10A1D, 0x10A1E, 0x10A1F, 0x10A20, 0x10A21, 0x10A22, 0x10A23, 0x10A24, 0x10A25, 0x10A26, 0x10A27, 0x10A28, 0x10A29, 0x10A2A, 0x10A2B, 0x10A2C, 0x10A2D, 0x10A2E, 0x10A2F, 0x10A30, 0x10A31, 0x10A32, 0x10A33, 0x10A40, 0x10A41, 0x10A42, 0x10A43, 0x10A44, 0x10A45, 0x10A46, 0x10A47, 0x10A50, 0x10A51, 0x10A52, 0x10A53, 0x10A54, 0x10A55, 0x10A56, 0x10A57, 0x10A58, 0x10A60, 0x10A61, 0x10A62, 0x10A63, 0x10A64, 0x10A65, 0x10A66, 0x10A67, 0x10A68, 0x10A69, 0x10A6A, 0x10A6B, 0x10A6C, 0x10A6D, 0x10A6E, 0x10A6F, 0x10A70, 0x10A71, 0x10A72, 0x10A73, 0x10A74, 0x10A75, 0x10A76, 0x10A77, 0x10A78, 0x10A79, 0x10A7A, 0x10A7B, 0x10A7C, 0x10A7D, 0x10A7E, 0x10A7F, 0x10B00, 0x10B01, 0x10B02, 0x10B03, 0x10B04, 0x10B05, 0x10B06, 0x10B07, 0x10B08, 0x10B09, 0x10B0A, 0x10B0B, 0x10B0C, 0x10B0D, 0x10B0E, 0x10B0F, 0x10B10, 0x10B11, 0x10B12, 0x10B13, 0x10B14, 0x10B15, 0x10B16, 0x10B17, 0x10B18, 0x10B19, 0x10B1A, 0x10B1B, 0x10B1C, 0x10B1D, 0x10B1E, 0x10B1F, 0x10B20, 0x10B21, 0x10B22, 0x10B23, 0x10B24, 0x10B25, 0x10B26, 0x10B27, 0x10B28, 0x10B29, 0x10B2A, 0x10B2B, 0x10B2C, 0x10B2D, 0x10B2E, 0x10B2F, 0x10B30, 0x10B31, 0x10B32, 0x10B33, 0x10B34, 0x10B35, 0x10B40, 0x10B41, 0x10B42, 0x10B43, 0x10B44, 0x10B45, 0x10B46, 0x10B47, 0x10B48, 0x10B49, 0x10B4A, 0x10B4B, 0x10B4C, 0x10B4D, 0x10B4E, 0x10B4F, 0x10B50, 0x10B51, 0x10B52, 0x10B53, 0x10B54, 0x10B55, 0x10B58, 0x10B59, 0x10B5A, 0x10B5B, 0x10B5C, 0x10B5D, 0x10B5E, 0x10B5F, 0x10B60, 0x10B61, 0x10B62, 0x10B63, 0x10B64, 0x10B65, 0x10B66, 0x10B67, 0x10B68, 0x10B69, 0x10B6A, 0x10B6B, 0x10B6C, 0x10B6D, 0x10B6E, 0x10B6F, 0x10B70, 0x10B71, 0x10B72, 0x10B78, 0x10B79, 0x10B7A, 0x10B7B, 0x10B7C, 0x10B7D, 0x10B7E, 0x10B7F, 0x10C00, 0x10C01, 0x10C02, 0x10C03, 0x10C04, 0x10C05, 0x10C06, 0x10C07, 0x10C08, 0x10C09, 0x10C0A, 0x10C0B, 0x10C0C, 0x10C0D, 0x10C0E, 0x10C0F, 0x10C10, 0x10C11, 0x10C12, 0x10C13, 0x10C14, 0x10C15, 0x10C16, 0x10C17, 0x10C18, 0x10C19, 0x10C1A, 0x10C1B, 0x10C1C, 0x10C1D, 0x10C1E, 0x10C1F, 0x10C20, 0x10C21, 0x10C22, 0x10C23, 0x10C24, 0x10C25, 0x10C26, 0x10C27, 0x10C28, 0x10C29, 0x10C2A, 0x10C2B, 0x10C2C, 0x10C2D, 0x10C2E, 0x10C2F, 0x10C30, 0x10C31, 0x10C32, 0x10C33, 0x10C34, 0x10C35, 0x10C36, 0x10C37, 0x10C38, 0x10C39, 0x10C3A, 0x10C3B, 0x10C3C, 0x10C3D, 0x10C3E, 0x10C3F, 0x10C40, 0x10C41, 0x10C42, 0x10C43, 0x10C44, 0x10C45, 0x10C46, 0x10C47, 0x10C48, 0x1EE00, 0x1EE01, 0x1EE02, 0x1EE03, 0x1EE05, 0x1EE06, 0x1EE07, 0x1EE08, 0x1EE09, 0x1EE0A, 0x1EE0B, 0x1EE0C, 0x1EE0D, 0x1EE0E, 0x1EE0F, 0x1EE10, 0x1EE11, 0x1EE12, 0x1EE13, 0x1EE14, 0x1EE15, 0x1EE16, 0x1EE17, 0x1EE18, 0x1EE19, 0x1EE1A, 0x1EE1B, 0x1EE1C, 0x1EE1D, 0x1EE1E, 0x1EE1F, 0x1EE21, 0x1EE22, 0x1EE24, 0x1EE27, 0x1EE29, 0x1EE2A, 0x1EE2B, 0x1EE2C, 0x1EE2D, 0x1EE2E, 0x1EE2F, 0x1EE30, 0x1EE31, 0x1EE32, 0x1EE34, 0x1EE35, 0x1EE36, 0x1EE37, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE4D, 0x1EE4E, 0x1EE4F, 0x1EE51, 0x1EE52, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE61, 0x1EE62, 0x1EE64, 0x1EE67, 0x1EE68, 0x1EE69, 0x1EE6A, 0x1EE6C, 0x1EE6D, 0x1EE6E, 0x1EE6F, 0x1EE70, 0x1EE71, 0x1EE72, 0x1EE74, 0x1EE75, 0x1EE76, 0x1EE77, 0x1EE79, 0x1EE7A, 0x1EE7B, 0x1EE7C, 0x1EE7E, 0x1EE80, 0x1EE81, 0x1EE82, 0x1EE83, 0x1EE84, 0x1EE85, 0x1EE86, 0x1EE87, 0x1EE88, 0x1EE89, 0x1EE8B, 0x1EE8C, 0x1EE8D, 0x1EE8E, 0x1EE8F, 0x1EE90, 0x1EE91, 0x1EE92, 0x1EE93, 0x1EE94, 0x1EE95, 0x1EE96, 0x1EE97, 0x1EE98, 0x1EE99, 0x1EE9A, 0x1EE9B, 0x1EEA1, 0x1EEA2, 0x1EEA3, 0x1EEA5, 0x1EEA6, 0x1EEA7, 0x1EEA8, 0x1EEA9, 0x1EEAB, 0x1EEAC, 0x1EEAD, 0x1EEAE, 0x1EEAF, 0x1EEB0, 0x1EEB1, 0x1EEB2, 0x1EEB3, 0x1EEB4, 0x1EEB5, 0x1EEB6, 0x1EEB7, 0x1EEB8, 0x1EEB9, 0x1EEBA, 0x1EEBB, 0x10FFFD];

function determineBidi(cueDiv) {
    var nodeStack = [],
        text = "",
        charCode;

    if (!cueDiv || !cueDiv.childNodes) {
        return "ltr";
    }

    function pushNodes(nodeStack, node) {
        for (var i = node.childNodes.length - 1; i >= 0; i--) {
            nodeStack.push(node.childNodes[i]);
        }
    }

    function nextTextNode(nodeStack) {
        if (!nodeStack || !nodeStack.length) {
            return null;
        }

        var node = nodeStack.pop(),
            text = node.textContent || node.innerText;
        if (text) {
            // TODO: This should match all unicode type B characters (paragraph
            // separator characters). See issue #115.
            var m = text.match(/^.*(\n|\r)/);
            if (m) {
                nodeStack.length = 0;
                return m[0];
            }
            return text;
        }
        if (node.tagName === "ruby") {
            return nextTextNode(nodeStack);
        }
        if (node.childNodes) {
            pushNodes(nodeStack, node);
            return nextTextNode(nodeStack);
        }
    }

    pushNodes(nodeStack, cueDiv);
    while (text = nextTextNode(nodeStack)) {
        for (var i = 0; i < text.length; i++) {
            charCode = text.charCodeAt(i);
            for (var j = 0; j < strongRTLChars.length; j++) {
                if (strongRTLChars[j] === charCode) {
                    return "rtl";
                }
            }
        }
    }
    return "ltr";
}

function computeLinePos(cue) {
    if (typeof cue.line === "number" && (cue.snapToLines || cue.line >= 0 && cue.line <= 100)) {
        return cue.line;
    }
    if (!cue.track || !cue.track.textTrackList || !cue.track.textTrackList.mediaElement) {
        return -1;
    }
    var track = cue.track,
        trackList = track.textTrackList,
        count = 0;
    for (var i = 0; i < trackList.length && trackList[i] !== track; i++) {
        if (trackList[i].mode === "showing") {
            count++;
        }
    }
    return ++count * -1;
}

function StyleBox() {}

// Apply styles to a div. If there is no div passed then it defaults to the
// div on 'this'.
StyleBox.prototype.applyStyles = function (styles, div) {
    div = div || this.div;
    for (var prop in styles) {
        if (styles.hasOwnProperty(prop)) {
            div.style[prop] = styles[prop];
        }
    }
};

StyleBox.prototype.formatStyle = function (val, unit) {
    return val === 0 ? 0 : val + unit;
};

// Constructs the computed display state of the cue (a div). Places the div
// into the overlay which should be a block level element (usually a div).
function CueStyleBox(window, cue, styleOptions) {
    var isIE8 = typeof navigator !== "undefined" && /MSIE\s8\.0/.test(navigator.userAgent);
    var color = "rgba(255, 255, 255, 1)";
    var backgroundColor = "rgba(0, 0, 0, 0.8)";
    var textShadow = "";

    if (typeof WebVTTSet !== "undefined") {
        color = WebVTTSet.fontSet;
        backgroundColor = WebVTTSet.backgroundSet;
        textShadow = WebVTTSet.edgeSet;
    }

    if (isIE8) {
        color = "rgb(255, 255, 255)";
        backgroundColor = "rgb(0, 0, 0)";
    }

    StyleBox.call(this);
    this.cue = cue;

    // Parse our cue's text into a DOM tree rooted at 'cueDiv'. This div will
    // have inline positioning and will function as the cue background box.
    this.cueDiv = parseContent(window, cue.text);
    var styles = {
        color: color,
        backgroundColor: backgroundColor,
        textShadow: textShadow,
        position: "relative",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "inline"
    };

    if (!isIE8) {
        styles.writingMode = cue.vertical === "" ? "horizontal-tb" : cue.vertical === "lr" ? "vertical-lr" : "vertical-rl";
        styles.unicodeBidi = "plaintext";
    }
    this.applyStyles(styles, this.cueDiv);

    // Create an absolutely positioned div that will be used to position the cue
    // div. Note, all WebVTT cue-setting alignments are equivalent to the CSS
    // mirrors of them except "middle" which is "center" in CSS.
    this.div = window.document.createElement("div");
    styles = {
        textAlign: cue.align === "middle" ? "center" : cue.align,
        font: styleOptions.font,
        whiteSpace: "pre-line",
        position: "absolute"
    };

    if (!isIE8) {
        styles.direction = determineBidi(this.cueDiv);
        styles.writingMode = cue.vertical === "" ? "horizontal-tb" : cue.vertical === "lr" ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext";
    }

    this.applyStyles(styles);

    this.div.appendChild(this.cueDiv);

    // Calculate the distance from the reference edge of the viewport to the text
    // position of the cue box. The reference edge will be resolved later when
    // the box orientation styles are applied.
    var textPos = 0;
    switch (cue.positionAlign) {
        case "start":
            textPos = cue.position;
            break;
        case "middle":
            textPos = cue.position - cue.size / 2;
            break;
        case "end":
            textPos = cue.position - cue.size;
            break;
    }

    // Horizontal box orientation; textPos is the distance from the left edge of the
    // area to the left edge of the box and cue.size is the distance extending to
    // the right from there.
    if (cue.vertical === "") {
        this.applyStyles({
            left: this.formatStyle(textPos, "%"),
            width: this.formatStyle(cue.size, "%")
        });
        // Vertical box orientation; textPos is the distance from the top edge of the
        // area to the top edge of the box and cue.size is the height extending
        // downwards from there.
    } else {
        this.applyStyles({
            top: this.formatStyle(textPos, "%"),
            height: this.formatStyle(cue.size, "%")
        });
    }

    this.move = function (box) {
        this.applyStyles({
            top: this.formatStyle(box.top, "px"),
            bottom: this.formatStyle(box.bottom, "px"),
            left: this.formatStyle(box.left, "px"),
            right: this.formatStyle(box.right, "px"),
            height: this.formatStyle(box.height, "px"),
            width: this.formatStyle(box.width, "px")
        });
    };
}
CueStyleBox.prototype = _objCreate(StyleBox.prototype);
CueStyleBox.prototype.constructor = CueStyleBox;

// Represents the co-ordinates of an Element in a way that we can easily
// compute things with such as if it overlaps or intersects with another Element.
// Can initialize it with either a StyleBox or another BoxPosition.
function BoxPosition(obj) {
    var isIE8 = typeof navigator !== "undefined" && /MSIE\s8\.0/.test(navigator.userAgent);

    // Either a BoxPosition was passed in and we need to copy it, or a StyleBox
    // was passed in and we need to copy the results of 'getBoundingClientRect'
    // as the object returned is readonly. All co-ordinate values are in reference
    // to the viewport origin (top left).
    var lh, height, width, top;
    if (obj.div) {
        height = obj.div.offsetHeight;
        width = obj.div.offsetWidth;
        top = obj.div.offsetTop;

        var rects = (rects = obj.div.childNodes) && (rects = rects[0]) && rects.getClientRects && rects.getClientRects();
        obj = obj.div.getBoundingClientRect();
        // In certain cases the outter div will be slightly larger then the sum of
        // the inner div's lines. This could be due to bold text, etc, on some platforms.
        // In this case we should get the average line height and use that. This will
        // result in the desired behaviour.
        lh = rects ? Math.max(rects[0] && rects[0].height || 0, obj.height / rects.length) : 0;
    }
    this.left = obj.left;
    this.right = obj.right;
    this.top = obj.top || top;
    this.height = obj.height || height;
    this.bottom = obj.bottom || top + (obj.height || height);
    this.width = obj.width || width;
    this.lineHeight = lh !== undefined ? lh : obj.lineHeight;

    if (isIE8 && !this.lineHeight) {
        this.lineHeight = 13;
    }
}

// Move the box along a particular axis. Optionally pass in an amount to move
// the box. If no amount is passed then the default is the line height of the
// box.
BoxPosition.prototype.move = function (axis, toMove) {
    toMove = toMove !== undefined ? toMove : this.lineHeight;
    switch (axis) {
        case "+x":
            this.left += toMove;
            this.right += toMove;
            break;
        case "-x":
            this.left -= toMove;
            this.right -= toMove;
            break;
        case "+y":
            this.top += toMove;
            this.bottom += toMove;
            break;
        case "-y":
            this.top -= toMove;
            this.bottom -= toMove;
            break;
    }
};

// Check if this box overlaps another box, b2.
BoxPosition.prototype.overlaps = function (b2) {
    return this.left < b2.right && this.right > b2.left && this.top < b2.bottom && this.bottom > b2.top;
};

// Check if this box overlaps any other boxes in boxes.
BoxPosition.prototype.overlapsAny = function (boxes) {
    for (var i = 0; i < boxes.length; i++) {
        if (this.overlaps(boxes[i])) {
            return true;
        }
    }
    return false;
};

// Check if this box is within another box.
BoxPosition.prototype.within = function (container) {
    return this.top >= container.top && this.bottom <= container.bottom && this.left >= container.left && this.right <= container.right;
};

// Check if this box is entirely within the container or it is overlapping
// on the edge opposite of the axis direction passed. For example, if "+x" is
// passed and the box is overlapping on the left edge of the container, then
// return true.
BoxPosition.prototype.overlapsOppositeAxis = function (container, axis) {
    switch (axis) {
        case "+x":
            return this.left < container.left;
        case "-x":
            return this.right > container.right;
        case "+y":
            return this.top < container.top;
        case "-y":
            return this.bottom > container.bottom;
    }
};

// Find the percentage of the area that this box is overlapping with another
// box.
BoxPosition.prototype.intersectPercentage = function (b2) {
    var x = Math.max(0, Math.min(this.right, b2.right) - Math.max(this.left, b2.left)),
        y = Math.max(0, Math.min(this.bottom, b2.bottom) - Math.max(this.top, b2.top)),
        intersectArea = x * y;
    return intersectArea / (this.height * this.width);
};

// Convert the positions from this box to CSS compatible positions using
// the reference container's positions. This has to be done because this
// box's positions are in reference to the viewport origin, whereas, CSS
// values are in referecne to their respective edges.
BoxPosition.prototype.toCSSCompatValues = function (reference) {
    return {
        top: this.top - reference.top,
        bottom: reference.bottom - this.bottom,
        left: this.left - reference.left,
        right: reference.right - this.right,
        height: this.height,
        width: this.width
    };
};

// Get an object that represents the box's position without anything extra.
// Can pass a StyleBox, HTMLElement, or another BoxPositon.
BoxPosition.getSimpleBoxPosition = function (obj) {
    var height = obj.div ? obj.div.offsetHeight : obj.tagName ? obj.offsetHeight : 0;
    var width = obj.div ? obj.div.offsetWidth : obj.tagName ? obj.offsetWidth : 0;
    var top = obj.div ? obj.div.offsetTop : obj.tagName ? obj.offsetTop : 0;

    obj = obj.div ? obj.div.getBoundingClientRect() : obj.tagName ? obj.getBoundingClientRect() : obj;
    var ret = {
        left: obj.left,
        right: obj.right,
        top: obj.top || top,
        height: obj.height || height,
        bottom: obj.bottom || top + (obj.height || height),
        width: obj.width || width
    };
    return ret;
};

// Move a StyleBox to its specified, or next best, position. The containerBox
// is the box that contains the StyleBox, such as a div. boxPositions are
// a list of other boxes that the styleBox can't overlap with.
function moveBoxToLinePosition(window, styleBox, containerBox, boxPositions) {

    // Find the best position for a cue box, b, on the video. The axis parameter
    // is a list of axis, the order of which, it will move the box along. For example:
    // Passing ["+x", "-x"] will move the box first along the x axis in the positive
    // direction. If it doesn't find a good position for it there it will then move
    // it along the x axis in the negative direction.
    function findBestPosition(b, axis) {
        var bestPosition,
            specifiedPosition = new BoxPosition(b),
            percentage = 1; // Highest possible so the first thing we get is better.

        for (var i = 0; i < axis.length; i++) {
            while (b.overlapsOppositeAxis(containerBox, axis[i]) || b.within(containerBox) && b.overlapsAny(boxPositions)) {
                b.move(axis[i]);
            }
            // We found a spot where we aren't overlapping anything. This is our
            // best position.
            if (b.within(containerBox)) {
                return b;
            }
            var p = b.intersectPercentage(containerBox);
            // If we're outside the container box less then we were on our last try
            // then remember this position as the best position.
            if (percentage > p) {
                bestPosition = new BoxPosition(b);
                percentage = p;
            }
            // Reset the box position to the specified position.
            b = new BoxPosition(specifiedPosition);
        }
        return bestPosition || specifiedPosition;
    }

    var boxPosition = new BoxPosition(styleBox),
        cue = styleBox.cue,
        linePos = computeLinePos(cue),
        axis = [];

    // If we have a line number to align the cue to.
    if (cue.snapToLines) {
        var size;
        switch (cue.vertical) {
            case "":
                axis = ["+y", "-y"];
                size = "height";
                break;
            case "rl":
                axis = ["+x", "-x"];
                size = "width";
                break;
            case "lr":
                axis = ["-x", "+x"];
                size = "width";
                break;
        }

        var step = boxPosition.lineHeight,
            position = step * Math.round(linePos),
            maxPosition = containerBox[size] + step,
            initialAxis = axis[0];

        // If the specified intial position is greater then the max position then
        // clamp the box to the amount of steps it would take for the box to
        // reach the max position.
        if (Math.abs(position) > maxPosition) {
            position = position < 0 ? -1 : 1;
            position *= Math.ceil(maxPosition / step) * step;
        }

        // If computed line position returns negative then line numbers are
        // relative to the bottom of the video instead of the top. Therefore, we
        // need to increase our initial position by the length or width of the
        // video, depending on the writing direction, and reverse our axis directions.
        if (linePos < 0) {
            position += cue.vertical === "" ? containerBox.height : containerBox.width;
            axis = axis.reverse();
        }

        // Move the box to the specified position. This may not be its best
        // position.
        boxPosition.move(initialAxis, position);
    } else {
        // If we have a percentage line value for the cue.
        var calculatedPercentage = boxPosition.lineHeight / containerBox.height * 100;

        switch (cue.lineAlign) {
            case "middle":
                linePos -= calculatedPercentage / 2;
                break;
            case "end":
                linePos -= calculatedPercentage;
                break;
        }

        // Apply initial line position to the cue box.
        switch (cue.vertical) {
            case "":
                styleBox.applyStyles({
                    top: styleBox.formatStyle(linePos, "%")
                });
                break;
            case "rl":
                styleBox.applyStyles({
                    left: styleBox.formatStyle(linePos, "%")
                });
                break;
            case "lr":
                styleBox.applyStyles({
                    right: styleBox.formatStyle(linePos, "%")
                });
                break;
        }

        axis = ["+y", "-x", "+x", "-y"];

        // Get the box position again after we've applied the specified positioning
        // to it.
        boxPosition = new BoxPosition(styleBox);
    }

    var bestPosition = findBestPosition(boxPosition, axis);
    styleBox.move(bestPosition.toCSSCompatValues(containerBox));
}

/*function WebVTT() {
 // Nothing
 }*/

// Helper to allow strings to be decoded instead of the default binary utf8 data.
WebVTT.StringDecoder = function () {
    return {
        decode: function decode(data) {
            if (!data) {
                return "";
            }
            if (typeof data !== "string") {
                throw new Error("Error - expected string data.");
            }
            return decodeURIComponent(encodeURIComponent(data));
        }
    };
};

WebVTT.convertCueToDOMTree = function (window, cuetext) {
    if (!window || !cuetext) {
        return null;
    }
    return parseContent(window, cuetext);
};

var FONT_SIZE_PERCENT = 0.05;
var FONT_STYLE = "sans-serif";
var CUE_BACKGROUND_PADDING = "1.5%";

// Runs the processing model over the cues and regions passed to it.
// @param overlay A block level element (usually a div) that the computed cues
//                and regions will be placed into.
WebVTT.processCues = function (window, cues, overlay) {
    if (!window || !cues || !overlay) {
        return null;
    }

    // Remove all previous children.
    while (overlay.firstChild) {
        overlay.removeChild(overlay.firstChild);
    }

    var paddedOverlay = window.document.createElement("div");
    paddedOverlay.style.position = "absolute";
    paddedOverlay.style.left = "0";
    paddedOverlay.style.right = "0";
    paddedOverlay.style.top = "0";
    paddedOverlay.style.bottom = "0";
    paddedOverlay.style.margin = CUE_BACKGROUND_PADDING;
    overlay.appendChild(paddedOverlay);

    // Determine if we need to compute the display states of the cues. This could
    // be the case if a cue's state has been changed since the last computation or
    // if it has not been computed yet.
    function shouldCompute(cues) {
        for (var i = 0; i < cues.length; i++) {
            if (cues[i].hasBeenReset || !cues[i].displayState) {
                return true;
            }
        }
        return false;
    }

    // We don't need to recompute the cues' display states. Just reuse them.
    if (!shouldCompute(cues)) {
        for (var i = 0; i < cues.length; i++) {
            paddedOverlay.appendChild(cues[i].displayState);
        }
        return;
    }

    var boxPositions = [],
        containerBox = BoxPosition.getSimpleBoxPosition(paddedOverlay),
        fontSize = Math.round(containerBox.height * FONT_SIZE_PERCENT * 100) / 100;
    var styleOptions = {
        font: fontSize * fontScale + "px " + FONT_STYLE
    };

    (function () {
        var styleBox, cue;

        for (var i = 0; i < cues.length; i++) {
            cue = cues[i];

            // Compute the intial position and styles of the cue div.
            styleBox = new CueStyleBox(window, cue, styleOptions);
            paddedOverlay.appendChild(styleBox.div);

            // Move the cue div to it's correct line position.
            moveBoxToLinePosition(window, styleBox, containerBox, boxPositions);

            // Remember the computed div so that we don't have to recompute it later
            // if we don't have too.
            cue.displayState = styleBox.div;

            boxPositions.push(BoxPosition.getSimpleBoxPosition(styleBox));
        }
    })();
};

WebVTT.Parser = function (window, decoder) {
    this.window = window;
    this.state = "INITIAL";
    this.buffer = "";
    this.decoder = decoder || new TextDecoder("utf8");
    this.regionList = [];
};

WebVTT.Parser.prototype = {
    // If the error is a ParsingError then report it to the consumer if
    // possible. If it's not a ParsingError then throw it like normal.
    reportOrThrowError: function reportOrThrowError(e) {
        if (e instanceof ParsingError) {
            this.onparsingerror && this.onparsingerror(e);
        } else {
            throw e;
        }
    },
    parse: function parse(data, flushing) {
        var self = this;
        // If there is no data then we won't decode it, but will just try to parse
        // whatever is in buffer already. This may occur in circumstances, for
        // example when flush() is called.
        if (data) {
            // Try to decode the data that we received.
            self.buffer += self.decoder.decode(data, { stream: true });
        }
        function collectNextLine() {
            var buffer = self.buffer;
            var pos = 0;
            while (pos < buffer.length && buffer[pos] !== '\r' && buffer[pos] !== '\n') {
                ++pos;
            }
            var line = buffer.substr(0, pos);
            // Advance the buffer early in case we fail below.
            if (buffer[pos] === '\r') {
                ++pos;
            }
            if (buffer[pos] === '\n') {
                ++pos;
            }
            self.buffer = buffer.substr(pos);
            return line;
        }

        // 3.4 WebVTT region and WebVTT region settings syntax
        function parseRegion(input) {
            var settings = new Settings();

            parseOptions(input, function (k, v) {
                switch (k) {
                    case "id":
                        settings.set(k, v);
                        break;
                    case "width":
                        settings.percent(k, v);
                        break;
                    case "lines":
                        settings.integer(k, v);
                        break;
                    case "regionanchor":
                    case "viewportanchor":
                        var xy = v.split(',');
                        if (xy.length !== 2) {
                            break;
                        }
                        // We have to make sure both x and y parse, so use a temporary
                        // settings object here.
                        var anchor = new Settings();
                        anchor.percent("x", xy[0]);
                        anchor.percent("y", xy[1]);
                        if (!anchor.has("x") || !anchor.has("y")) {
                            break;
                        }
                        settings.set(k + "X", anchor.get("x"));
                        settings.set(k + "Y", anchor.get("y"));
                        break;
                    case "scroll":
                        settings.alt(k, v, ["up"]);
                        break;
                }
            }, /=/, /\s/);

            // Create the region, using default values for any values that were not
            // specified.
            if (settings.has("id")) {
                var region = new self.window.VTTRegion();
                region.width = settings.get("width", 100);
                region.lines = settings.get("lines", 3);
                region.regionAnchorX = settings.get("regionanchorX", 0);
                region.regionAnchorY = settings.get("regionanchorY", 100);
                region.viewportAnchorX = settings.get("viewportanchorX", 0);
                region.viewportAnchorY = settings.get("viewportanchorY", 100);
                region.scroll = settings.get("scroll", "");
                // Register the region.
                self.onregion && self.onregion(region);
                // Remember the VTTRegion for later in case we parse any VTTCues that
                // reference it.
                self.regionList.push({
                    id: settings.get("id"),
                    region: region
                });
            }
        }

        // 3.2 WebVTT metadata header syntax
        function parseHeader(input) {
            parseOptions(input, function (k, v) {
                switch (k) {
                    case "Region":
                        // 3.3 WebVTT region metadata header syntax
                        parseRegion(v);
                        break;
                }
            }, /:/);
        }

        // 5.1 WebVTT file parsing.
        try {
            var line;
            if (self.state === "INITIAL") {
                // We can't start parsing until we have the first line.
                if (!/\r\n|\n/.test(self.buffer)) {
                    return this;
                }

                line = collectNextLine();

                var m = line.match(/^WEBVTT([ \t].*)?$/);
                if (!m || !m[0]) {
                    throw new ParsingError(ParsingError.Errors.BadSignature);
                }

                self.state = "HEADER";
            }

            var alreadyCollectedLine = false;
            while (self.buffer) {
                // We can't parse a line until we have the full line.
                if (!/\r\n|\n/.test(self.buffer)) {
                    return this;
                }

                if (!alreadyCollectedLine) {
                    line = collectNextLine();
                } else {
                    alreadyCollectedLine = false;
                }
                switch (self.state) {
                    case "HEADER":
                        // 13-18 - Allow a header (metadata) under the WEBVTT line.
                        if (/:/.test(line)) {
                            parseHeader(line);
                        } else if (!line) {
                            // An empty line terminates the header and starts the body (cues).
                            self.state = "ID";
                        }
                        continue;
                    case "NOTE":
                        // Ignore NOTE blocks.
                        if (!line) {
                            self.state = "ID";
                        }
                        continue;
                    case "ID":
                        // Check for the start of NOTE blocks.
                        if (/^NOTE($|[ \t])/.test(line)) {
                            self.state = "NOTE";
                            break;
                        }
                        // 19-29 - Allow any number of line terminators, then initialize new cue values.
                        if (!line) {
                            continue;
                        }
                        self.cue = new self.window.VTTCue(0, 0, "");
                        self.state = "CUE";
                        // 30-39 - Check if self line contains an optional identifier or timing data.
                        if (line.indexOf("-->") === -1) {
                            self.cue.id = line;
                            continue;
                        }
                    // Process line as start of a cue.
                    /*falls through*/
                    case "CUE":
                        // 40 - Collect cue timings and settings.
                        try {
                            parseCue(line, self.cue, self.regionList);
                        } catch (e) {
                            self.reportOrThrowError(e);
                            // In case of an error ignore rest of the cue.
                            self.cue = null;
                            self.state = "BADCUE";
                            continue;
                        }
                        self.state = "CUETEXT";
                        continue;
                    case "CUETEXT":
                        var hasSubstring = line.indexOf("-->") !== -1;
                        // 34 - If we have an empty line then report the cue.
                        // 35 - If we have the special substring '-->' then report the cue,
                        // but do not collect the line as we need to process the current
                        // one as a new cue.
                        if (!line || hasSubstring && (alreadyCollectedLine = true)) {
                            // We are done parsing self cue.
                            self.oncue && self.oncue(self.cue);
                            self.cue = null;
                            self.state = "ID";
                            continue;
                        }
                        if (self.cue.text) {
                            self.cue.text += "\n";
                        }
                        self.cue.text += line;
                        continue;
                    case "BADCUE":
                        // BADCUE
                        // 54-62 - Collect and discard the remaining cue.
                        if (!line) {
                            self.state = "ID";
                        }
                        continue;
                }
            }

            if (!flushing) {
                //때때로 (한긇 vtt로 추정) cue가 남아 있는채로 self.flush()를 호출해서 cue가 있기 때문에 다시 self.parse()를 타는 경우가 생김.
                //왜 이렇게 짜여 있는지 모르겠고 일단 아래와 같은 코드로 위기를 극복한다.
                if (self.state === "CUETEXT" && self.cue && self.oncue) {
                    self.oncue(self.cue);
                }
                self.flush();
                return this;
            }
        } catch (e) {
            self.reportOrThrowError(e);
            // If we are currently parsing a cue, report what we have.
            if (self.state === "CUETEXT" && self.cue && self.oncue) {
                self.oncue(self.cue);
            }
            self.cue = null;
            // Enter BADWEBVTT state if header was not parsed correctly otherwise
            // another exception occurred so enter BADCUE state.
            self.state = self.state === "INITIAL" ? "BADWEBVTT" : "BADCUE";
        }
        return this;
    },
    flush: function flush() {
        var self = this;

        try {
            // Finish decoding the stream.
            self.buffer += self.decoder.decode();
            // Synthesize the end of the current cue or region.
            if (self.cue || self.state === "HEADER") {
                self.buffer += "\n\n";
                self.parse(null, true);
            }
            // If we've flushed, parsed, and we're still on the INITIAL state then
            // that means we don't have enough of the stream to parse the first
            // line.
            if (self.state === "INITIAL") {
                throw new ParsingError(ParsingError.Errors.BadSignature);
            }
        } catch (e) {
            self.reportOrThrowError(e);
        }
        self.onflush && self.onflush();
        return this;
    }
};

exports['default'] = WebVTT;

/***/ }),

/***/ "./src/js/utils/captions/vttRegion.js":
/*!********************************************!*\
  !*** ./src/js/utils/captions/vttRegion.js ***!
  \********************************************/
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

var VTTRegion = "";

var scrollSetting = {
    "": true,
    "up": true
};

function findScrollSetting(value) {
    if (typeof value !== "string") {
        return false;
    }
    var scroll = scrollSetting[value.toLowerCase()];
    return scroll ? value.toLowerCase() : false;
}

function isValidPercentValue(value) {
    return typeof value === "number" && value >= 0 && value <= 100;
}

// VTTRegion shim http://dev.w3.org/html5/webvtt/#vttregion-interface
VTTRegion = function VTTRegion() {
    var _width = 100;
    var _lines = 3;
    var _regionAnchorX = 0;
    var _regionAnchorY = 100;
    var _viewportAnchorX = 0;
    var _viewportAnchorY = 100;
    var _scroll = "";

    Object.defineProperties(this, {
        "width": {
            enumerable: true,
            get: function get() {
                return _width;
            },
            set: function set(value) {
                if (!isValidPercentValue(value)) {
                    throw new Error("Width must be between 0 and 100.");
                }
                _width = value;
            }
        },
        "lines": {
            enumerable: true,
            get: function get() {
                return _lines;
            },
            set: function set(value) {
                if (typeof value !== "number") {
                    throw new TypeError("Lines must be set to a number.");
                }
                _lines = value;
            }
        },
        "regionAnchorY": {
            enumerable: true,
            get: function get() {
                return _regionAnchorY;
            },
            set: function set(value) {
                if (!isValidPercentValue(value)) {
                    throw new Error("RegionAnchorX must be between 0 and 100.");
                }
                _regionAnchorY = value;
            }
        },
        "regionAnchorX": {
            enumerable: true,
            get: function get() {
                return _regionAnchorX;
            },
            set: function set(value) {
                if (!isValidPercentValue(value)) {
                    throw new Error("RegionAnchorY must be between 0 and 100.");
                }
                _regionAnchorX = value;
            }
        },
        "viewportAnchorY": {
            enumerable: true,
            get: function get() {
                return _viewportAnchorY;
            },
            set: function set(value) {
                if (!isValidPercentValue(value)) {
                    throw new Error("ViewportAnchorY must be between 0 and 100.");
                }
                _viewportAnchorY = value;
            }
        },
        "viewportAnchorX": {
            enumerable: true,
            get: function get() {
                return _viewportAnchorX;
            },
            set: function set(value) {
                if (!isValidPercentValue(value)) {
                    throw new Error("ViewportAnchorX must be between 0 and 100.");
                }
                _viewportAnchorX = value;
            }
        },
        "scroll": {
            enumerable: true,
            get: function get() {
                return _scroll;
            },
            set: function set(value) {
                var setting = findScrollSetting(value);
                // Have to check for false as an empty string is a legal value.
                if (setting === false) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _scroll = setting;
            }
        }
    });
};

exports["default"] = VTTRegion;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXIuanMiLCJ3ZWJwYWNrOi8vT3ZlblBsYXllci8uL3NyYy9qcy91dGlscy9jYXB0aW9ucy92dHRSZWdpb24uanMiXSwibmFtZXMiOlsiV2ViVlRUIiwibWFrZUNvbG9yU2V0IiwiY29sb3IiLCJvcGFjaXR5IiwidW5kZWZpbmVkIiwicGFyc2VJbnQiLCJzdWJzdHJpbmciLCJqb2luIiwiV2ViVlRUUHJlZnMiLCJmb250U2NhbGUiLCJvYnNlcnZlIiwic3ViamVjdCIsInRvcGljIiwiZGF0YSIsImZvbnRDb2xvciIsIlNlcnZpY2VzIiwicHJlZnMiLCJnZXRDaGFyUHJlZiIsImZvbnRPcGFjaXR5IiwiZ2V0SW50UHJlZiIsIldlYlZUVFNldCIsImZvbnRTZXQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJiYWNrZ3JvdW5kT3BhY2l0eSIsImJhY2tncm91bmRTZXQiLCJlZGdlVHlwZUxpc3QiLCJlZGdlVHlwZSIsImVkZ2VDb2xvciIsImVkZ2VTZXQiLCJmb3JFYWNoIiwicHJlZiIsImFkZE9ic2VydmVyIiwiX29iakNyZWF0ZSIsIk9iamVjdCIsImNyZWF0ZSIsIkYiLCJvIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiRXJyb3IiLCJwcm90b3R5cGUiLCJQYXJzaW5nRXJyb3IiLCJlcnJvckRhdGEiLCJtZXNzYWdlIiwibmFtZSIsImNvZGUiLCJjb25zdHJ1Y3RvciIsIkVycm9ycyIsIkJhZFNpZ25hdHVyZSIsIkJhZFRpbWVTdGFtcCIsInBhcnNlVGltZVN0YW1wIiwiaW5wdXQiLCJjb21wdXRlU2Vjb25kcyIsImgiLCJtIiwicyIsImYiLCJtYXRjaCIsInJlcGxhY2UiLCJTZXR0aW5ncyIsInZhbHVlcyIsInNldCIsImsiLCJ2IiwiZ2V0IiwiZGZsdCIsImRlZmF1bHRLZXkiLCJoYXMiLCJhbHQiLCJhIiwibiIsImludGVnZXIiLCJ0ZXN0IiwicGVyY2VudCIsInBhcnNlRmxvYXQiLCJwYXJzZU9wdGlvbnMiLCJjYWxsYmFjayIsImtleVZhbHVlRGVsaW0iLCJncm91cERlbGltIiwiZ3JvdXBzIiwic3BsaXQiLCJpIiwia3YiLCJwYXJzZUN1ZSIsImN1ZSIsInJlZ2lvbkxpc3QiLCJvSW5wdXQiLCJjb25zdW1lVGltZVN0YW1wIiwidHMiLCJjb25zdW1lQ3VlU2V0dGluZ3MiLCJzZXR0aW5ncyIsImlkIiwicmVnaW9uIiwidmFscyIsInZhbHMwIiwic2tpcFdoaXRlc3BhY2UiLCJzdGFydFRpbWUiLCJzdWJzdHIiLCJlbmRUaW1lIiwiRVNDQVBFIiwiVEFHX05BTUUiLCJjIiwiYiIsInUiLCJydWJ5IiwicnQiLCJsYW5nIiwiVEFHX0FOTk9UQVRJT04iLCJORUVEU19QQVJFTlQiLCJwYXJzZUNvbnRlbnQiLCJ3aW5kb3ciLCJuZXh0VG9rZW4iLCJjb25zdW1lIiwicmVzdWx0IiwidW5lc2NhcGUxIiwiZSIsInVuZXNjYXBlIiwic2hvdWxkQWRkIiwiY3VycmVudCIsImVsZW1lbnQiLCJsb2NhbE5hbWUiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImFubm90YXRpb24iLCJ0YWdOYW1lIiwiZG9jdW1lbnQiLCJ0cmltIiwicm9vdERpdiIsInQiLCJ0YWdTdGFjayIsInBvcCIsInBhcmVudE5vZGUiLCJub2RlIiwiY3JlYXRlUHJvY2Vzc2luZ0luc3RydWN0aW9uIiwiYXBwZW5kQ2hpbGQiLCJjbGFzc05hbWUiLCJwdXNoIiwiY3JlYXRlVGV4dE5vZGUiLCJzdHJvbmdSVExDaGFycyIsImRldGVybWluZUJpZGkiLCJjdWVEaXYiLCJub2RlU3RhY2siLCJ0ZXh0IiwiY2hhckNvZGUiLCJjaGlsZE5vZGVzIiwicHVzaE5vZGVzIiwibmV4dFRleHROb2RlIiwidGV4dENvbnRlbnQiLCJpbm5lclRleHQiLCJjaGFyQ29kZUF0IiwiaiIsImNvbXB1dGVMaW5lUG9zIiwibGluZSIsInNuYXBUb0xpbmVzIiwidHJhY2siLCJ0ZXh0VHJhY2tMaXN0IiwibWVkaWFFbGVtZW50IiwidHJhY2tMaXN0IiwiY291bnQiLCJtb2RlIiwiU3R5bGVCb3giLCJhcHBseVN0eWxlcyIsInN0eWxlcyIsImRpdiIsInByb3AiLCJoYXNPd25Qcm9wZXJ0eSIsInN0eWxlIiwiZm9ybWF0U3R5bGUiLCJ2YWwiLCJ1bml0IiwiQ3VlU3R5bGVCb3giLCJzdHlsZU9wdGlvbnMiLCJpc0lFOCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInRleHRTaGFkb3ciLCJjYWxsIiwicG9zaXRpb24iLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJkaXNwbGF5Iiwid3JpdGluZ01vZGUiLCJ2ZXJ0aWNhbCIsInVuaWNvZGVCaWRpIiwidGV4dEFsaWduIiwiYWxpZ24iLCJmb250Iiwid2hpdGVTcGFjZSIsImRpcmVjdGlvbiIsInN0eWxlc3VuaWNvZGVCaWRpIiwidGV4dFBvcyIsInBvc2l0aW9uQWxpZ24iLCJzaXplIiwid2lkdGgiLCJoZWlnaHQiLCJtb3ZlIiwiYm94IiwiQm94UG9zaXRpb24iLCJvYmoiLCJsaCIsIm9mZnNldEhlaWdodCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0VG9wIiwicmVjdHMiLCJnZXRDbGllbnRSZWN0cyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIk1hdGgiLCJtYXgiLCJsaW5lSGVpZ2h0IiwiYXhpcyIsInRvTW92ZSIsIm92ZXJsYXBzIiwiYjIiLCJvdmVybGFwc0FueSIsImJveGVzIiwid2l0aGluIiwiY29udGFpbmVyIiwib3ZlcmxhcHNPcHBvc2l0ZUF4aXMiLCJpbnRlcnNlY3RQZXJjZW50YWdlIiwieCIsIm1pbiIsInkiLCJpbnRlcnNlY3RBcmVhIiwidG9DU1NDb21wYXRWYWx1ZXMiLCJyZWZlcmVuY2UiLCJnZXRTaW1wbGVCb3hQb3NpdGlvbiIsInJldCIsIm1vdmVCb3hUb0xpbmVQb3NpdGlvbiIsInN0eWxlQm94IiwiY29udGFpbmVyQm94IiwiYm94UG9zaXRpb25zIiwiZmluZEJlc3RQb3NpdGlvbiIsImJlc3RQb3NpdGlvbiIsInNwZWNpZmllZFBvc2l0aW9uIiwicGVyY2VudGFnZSIsInAiLCJib3hQb3NpdGlvbiIsImxpbmVQb3MiLCJzdGVwIiwicm91bmQiLCJtYXhQb3NpdGlvbiIsImluaXRpYWxBeGlzIiwiYWJzIiwiY2VpbCIsInJldmVyc2UiLCJjYWxjdWxhdGVkUGVyY2VudGFnZSIsImxpbmVBbGlnbiIsIlN0cmluZ0RlY29kZXIiLCJkZWNvZGUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJjb252ZXJ0Q3VlVG9ET01UcmVlIiwiY3VldGV4dCIsIkZPTlRfU0laRV9QRVJDRU5UIiwiRk9OVF9TVFlMRSIsIkNVRV9CQUNLR1JPVU5EX1BBRERJTkciLCJwcm9jZXNzQ3VlcyIsImN1ZXMiLCJvdmVybGF5IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwicGFkZGVkT3ZlcmxheSIsIm1hcmdpbiIsInNob3VsZENvbXB1dGUiLCJoYXNCZWVuUmVzZXQiLCJkaXNwbGF5U3RhdGUiLCJmb250U2l6ZSIsIlBhcnNlciIsImRlY29kZXIiLCJzdGF0ZSIsImJ1ZmZlciIsIlRleHREZWNvZGVyIiwicmVwb3J0T3JUaHJvd0Vycm9yIiwib25wYXJzaW5nZXJyb3IiLCJwYXJzZSIsImZsdXNoaW5nIiwic2VsZiIsInN0cmVhbSIsImNvbGxlY3ROZXh0TGluZSIsInBvcyIsInBhcnNlUmVnaW9uIiwieHkiLCJhbmNob3IiLCJWVFRSZWdpb24iLCJsaW5lcyIsInJlZ2lvbkFuY2hvclgiLCJyZWdpb25BbmNob3JZIiwidmlld3BvcnRBbmNob3JYIiwidmlld3BvcnRBbmNob3JZIiwic2Nyb2xsIiwib25yZWdpb24iLCJwYXJzZUhlYWRlciIsImFscmVhZHlDb2xsZWN0ZWRMaW5lIiwiVlRUQ3VlIiwiaW5kZXhPZiIsImhhc1N1YnN0cmluZyIsIm9uY3VlIiwiZmx1c2giLCJvbmZsdXNoIiwic2Nyb2xsU2V0dGluZyIsImZpbmRTY3JvbGxTZXR0aW5nIiwidmFsdWUiLCJ0b0xvd2VyQ2FzZSIsImlzVmFsaWRQZXJjZW50VmFsdWUiLCJfd2lkdGgiLCJfbGluZXMiLCJfcmVnaW9uQW5jaG9yWCIsIl9yZWdpb25BbmNob3JZIiwiX3ZpZXdwb3J0QW5jaG9yWCIsIl92aWV3cG9ydEFuY2hvclkiLCJfc2Nyb2xsIiwiZGVmaW5lUHJvcGVydGllcyIsImVudW1lcmFibGUiLCJUeXBlRXJyb3IiLCJzZXR0aW5nIiwiU3ludGF4RXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7QUFDQTs7QUFyQkE7QUF1QkEsSUFBSUEsU0FBUyxTQUFUQSxNQUFTLEdBQVUsQ0FBRSxDQUF6QjtBQUNBLFNBQVNDLFlBQVQsQ0FBc0JDLEtBQXRCLEVBQTZCQyxPQUE3QixFQUFzQztBQUNsQyxRQUFHQSxZQUFZQyxTQUFmLEVBQTBCO0FBQ3RCRCxrQkFBVSxDQUFWO0FBQ0g7QUFDRCxXQUFPLFVBQVUsQ0FBQ0UsU0FBU0gsTUFBTUksU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFULEVBQWdDLEVBQWhDLENBQUQsRUFDVEQsU0FBU0gsTUFBTUksU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFULEVBQWdDLEVBQWhDLENBRFMsRUFFVEQsU0FBU0gsTUFBTUksU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFULEVBQWdDLEVBQWhDLENBRlMsRUFHVEgsT0FIUyxFQUdBSSxJQUhBLENBR0ssR0FITCxDQUFWLEdBR3NCLEdBSDdCO0FBSUg7O0FBRUQsSUFBSUMsY0FBYyxDQUFDLG1CQUFELEVBQXNCLHFCQUF0QixFQUE2QyxtQkFBN0MsRUFDZCxpQkFEYyxFQUNLLG1CQURMLEVBRWQsbUJBRmMsRUFFTyxrQkFGUCxDQUFsQjs7QUFJQSxJQUFJQyxZQUFZLENBQWhCOztBQUVBLFNBQVNDLE9BQVQsQ0FBaUJDLE9BQWpCLEVBQTBCQyxLQUExQixFQUFpQ0MsSUFBakMsRUFBdUM7QUFDbkMsWUFBUUEsSUFBUjtBQUNJLGFBQUssbUJBQUw7QUFD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c0NvbnRlbnQiOlsiLyogdnR0LmpzIC0gdjAuMTIuMSAoaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvdnR0LmpzKSBidWlsdCBvbiAwMy0xMi0yMDE1ICovXHJcbmltcG9ydCBWVFRDdWUgZnJvbSAndXRpbHMvY2FwdGlvbnMvdnR0Q3VlJztcclxuaW1wb3J0IFZUVFJlZ2lvbiBmcm9tICd1dGlscy9jYXB0aW9ucy92dHRSZWdpb24nO1xyXG5cclxuLyoqXHJcbiAqIENvcHlyaWdodCAyMDEzIHZ0dC5qcyBDb250cmlidXRvcnNcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8qIC0qLSBNb2RlOiBKYXZhOyB0YWItd2lkdGg6IDI7IGluZGVudC10YWJzLW1vZGU6IG5pbDsgYy1iYXNpYy1vZmZzZXQ6IDIgLSotICovXHJcbi8qIHZpbTogc2V0IHNoaWZ0d2lkdGg9MiB0YWJzdG9wPTIgYXV0b2luZGVudCBjaW5kZW50IGV4cGFuZHRhYjogKi9cclxuXHJcbmxldCBXZWJWVFQgPSBmdW5jdGlvbigpe307XHJcbmZ1bmN0aW9uIG1ha2VDb2xvclNldChjb2xvciwgb3BhY2l0eSkge1xyXG4gICAgaWYob3BhY2l0eSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgb3BhY2l0eSA9IDE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJyZ2JhKFwiICsgW3BhcnNlSW50KGNvbG9yLnN1YnN0cmluZygwLCAyKSwgMTYpLFxyXG4gICAgICAgICAgICBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMiwgNCksIDE2KSxcclxuICAgICAgICAgICAgcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDQsIDYpLCAxNiksXHJcbiAgICAgICAgICAgIG9wYWNpdHldLmpvaW4oXCIsXCIpICsgXCIpXCI7XHJcbn1cclxuXHJcbnZhciBXZWJWVFRQcmVmcyA9IFsnd2VidnR0LmZvbnQuY29sb3InLCAnd2VidnR0LmZvbnQub3BhY2l0eScsICd3ZWJ2dHQuZm9udC5zY2FsZScsXHJcbiAgICAnd2VidnR0LmJnLmNvbG9yJywgJ3dlYnZ0dC5iZy5vcGFjaXR5JyxcclxuICAgICd3ZWJ2dHQuZWRnZS5jb2xvcicsICd3ZWJ2dHQuZWRnZS50eXBlJ107XHJcblxyXG52YXIgZm9udFNjYWxlID0gMTtcclxuXHJcbmZ1bmN0aW9uIG9ic2VydmUoc3ViamVjdCwgdG9waWMsIGRhdGEpIHtcclxuICAgIHN3aXRjaCAoZGF0YSkge1xyXG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuZm9udC5jb2xvclwiOlxyXG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuZm9udC5vcGFjaXR5XCI6XHJcbiAgICAgICAgICAgIHZhciBmb250Q29sb3IgPSBTZXJ2aWNlcy5wcmVmcy5nZXRDaGFyUHJlZihcIndlYnZ0dC5mb250LmNvbG9yXCIpO1xyXG4gICAgICAgICAgICB2YXIgZm9udE9wYWNpdHkgPSBTZXJ2aWNlcy5wcmVmcy5nZXRJbnRQcmVmKFwid2VidnR0LmZvbnQub3BhY2l0eVwiKSAvIDEwMDtcclxuICAgICAgICAgICAgV2ViVlRUU2V0LmZvbnRTZXQgPSBtYWtlQ29sb3JTZXQoZm9udENvbG9yLCBmb250T3BhY2l0eSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuZm9udC5zY2FsZVwiOlxyXG4gICAgICAgICAgICBmb250U2NhbGUgPSBTZXJ2aWNlcy5wcmVmcy5nZXRJbnRQcmVmKFwid2VidnR0LmZvbnQuc2NhbGVcIikgLyAxMDA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuYmcuY29sb3JcIjpcclxuICAgICAgICBjYXNlIFwid2VidnR0LmJnLm9wYWNpdHlcIjpcclxuICAgICAgICAgICAgdmFyIGJhY2tncm91bmRDb2xvciA9IFNlcnZpY2VzLnByZWZzLmdldENoYXJQcmVmKFwid2VidnR0LmJnLmNvbG9yXCIpO1xyXG4gICAgICAgICAgICB2YXIgYmFja2dyb3VuZE9wYWNpdHkgPSBTZXJ2aWNlcy5wcmVmcy5nZXRJbnRQcmVmKFwid2VidnR0LmJnLm9wYWNpdHlcIikgLyAxMDA7XHJcbiAgICAgICAgICAgIFdlYlZUVFNldC5iYWNrZ3JvdW5kU2V0ID0gbWFrZUNvbG9yU2V0KGJhY2tncm91bmRDb2xvciwgYmFja2dyb3VuZE9wYWNpdHkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwid2VidnR0LmVkZ2UuY29sb3JcIjpcclxuICAgICAgICBjYXNlIFwid2VidnR0LmVkZ2UudHlwZVwiOlxyXG4gICAgICAgICAgICB2YXIgZWRnZVR5cGVMaXN0ID0gW1wiXCIsIFwiMHB4IDBweCBcIiwgXCI0cHggNHB4IDRweCBcIiwgXCItMnB4IC0ycHggXCIsIFwiMnB4IDJweCBcIl07XHJcbiAgICAgICAgICAgIHZhciBlZGdlVHlwZSA9IFNlcnZpY2VzLnByZWZzLmdldEludFByZWYoXCJ3ZWJ2dHQuZWRnZS50eXBlXCIpO1xyXG4gICAgICAgICAgICB2YXIgZWRnZUNvbG9yID0gU2VydmljZXMucHJlZnMuZ2V0Q2hhclByZWYoXCJ3ZWJ2dHQuZWRnZS5jb2xvclwiKTtcclxuICAgICAgICAgICAgV2ViVlRUU2V0LmVkZ2VTZXQgPSBlZGdlVHlwZUxpc3RbZWRnZVR5cGVdICsgbWFrZUNvbG9yU2V0KGVkZ2VDb2xvcik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59XHJcblxyXG5pZih0eXBlb2YgU2VydmljZXMgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHZhciBXZWJWVFRTZXQgPSB7fTtcclxuICAgIFdlYlZUVFByZWZzLmZvckVhY2goZnVuY3Rpb24gKHByZWYpIHtcclxuICAgICAgICBvYnNlcnZlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBwcmVmKTtcclxuICAgICAgICBTZXJ2aWNlcy5wcmVmcy5hZGRPYnNlcnZlcihwcmVmLCBvYnNlcnZlLCBmYWxzZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxudmFyIF9vYmpDcmVhdGUgPSBPYmplY3QuY3JlYXRlIHx8IChmdW5jdGlvbigpIHtcclxuICAgICAgICBmdW5jdGlvbiBGKCkge31cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24obykge1xyXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPYmplY3QuY3JlYXRlIHNoaW0gb25seSBhY2NlcHRzIG9uZSBwYXJhbWV0ZXIuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBvO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEYoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSkoKTtcclxuXHJcbi8vIENyZWF0ZXMgYSBuZXcgUGFyc2VyRXJyb3Igb2JqZWN0IGZyb20gYW4gZXJyb3JEYXRhIG9iamVjdC4gVGhlIGVycm9yRGF0YVxyXG4vLyBvYmplY3Qgc2hvdWxkIGhhdmUgZGVmYXVsdCBjb2RlIGFuZCBtZXNzYWdlIHByb3BlcnRpZXMuIFRoZSBkZWZhdWx0IG1lc3NhZ2VcclxuLy8gcHJvcGVydHkgY2FuIGJlIG92ZXJyaWRlbiBieSBwYXNzaW5nIGluIGEgbWVzc2FnZSBwYXJhbWV0ZXIuXHJcbi8vIFNlZSBQYXJzaW5nRXJyb3IuRXJyb3JzIGJlbG93IGZvciBhY2NlcHRhYmxlIGVycm9ycy5cclxuZnVuY3Rpb24gUGFyc2luZ0Vycm9yKGVycm9yRGF0YSwgbWVzc2FnZSkge1xyXG4gICAgdGhpcy5uYW1lID0gXCJQYXJzaW5nRXJyb3JcIjtcclxuICAgIHRoaXMuY29kZSA9IGVycm9yRGF0YS5jb2RlO1xyXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBlcnJvckRhdGEubWVzc2FnZTtcclxufVxyXG5QYXJzaW5nRXJyb3IucHJvdG90eXBlID0gX29iakNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xyXG5QYXJzaW5nRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUGFyc2luZ0Vycm9yO1xyXG5cclxuLy8gUGFyc2luZ0Vycm9yIG1ldGFkYXRhIGZvciBhY2NlcHRhYmxlIFBhcnNpbmdFcnJvcnMuXHJcblBhcnNpbmdFcnJvci5FcnJvcnMgPSB7XHJcbiAgICBCYWRTaWduYXR1cmU6IHtcclxuICAgICAgICBjb2RlOiAwLFxyXG4gICAgICAgIG1lc3NhZ2U6IFwiTWFsZm9ybWVkIFdlYlZUVCBzaWduYXR1cmUuXCJcclxuICAgIH0sXHJcbiAgICBCYWRUaW1lU3RhbXA6IHtcclxuICAgICAgICBjb2RlOiAxLFxyXG4gICAgICAgIG1lc3NhZ2U6IFwiTWFsZm9ybWVkIHRpbWUgc3RhbXAuXCJcclxuICAgIH1cclxufTtcclxuXHJcbi8vIFRyeSB0byBwYXJzZSBpbnB1dCBhcyBhIHRpbWUgc3RhbXAuXHJcbmZ1bmN0aW9uIHBhcnNlVGltZVN0YW1wKGlucHV0KSB7XHJcblxyXG4gICAgZnVuY3Rpb24gY29tcHV0ZVNlY29uZHMoaCwgbSwgcywgZikge1xyXG4gICAgICAgIHJldHVybiAoaCB8IDApICogMzYwMCArIChtIHwgMCkgKiA2MCArIChzIHwgMCkgKyAoZiB8IDApIC8gMTAwMDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbSA9IGlucHV0Lm1hdGNoKC9eKFxcZCspOihcXGR7Mn0pKDpcXGR7Mn0pP1xcLihcXGR7M30pLyk7XHJcbiAgICBpZiAoIW0pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobVszXSkge1xyXG4gICAgICAgIC8vIFRpbWVzdGFtcCB0YWtlcyB0aGUgZm9ybSBvZiBbaG91cnNdOlttaW51dGVzXTpbc2Vjb25kc10uW21pbGxpc2Vjb25kc11cclxuICAgICAgICByZXR1cm4gY29tcHV0ZVNlY29uZHMobVsxXSwgbVsyXSwgbVszXS5yZXBsYWNlKFwiOlwiLCBcIlwiKSwgbVs0XSk7XHJcbiAgICB9IGVsc2UgaWYgKG1bMV0gPiA1OSkge1xyXG4gICAgICAgIC8vIFRpbWVzdGFtcCB0YWtlcyB0aGUgZm9ybSBvZiBbaG91cnNdOlttaW51dGVzXS5bbWlsbGlzZWNvbmRzXVxyXG4gICAgICAgIC8vIEZpcnN0IHBvc2l0aW9uIGlzIGhvdXJzIGFzIGl0J3Mgb3ZlciA1OS5cclxuICAgICAgICByZXR1cm4gY29tcHV0ZVNlY29uZHMobVsxXSwgbVsyXSwgMCwgIG1bNF0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBUaW1lc3RhbXAgdGFrZXMgdGhlIGZvcm0gb2YgW21pbnV0ZXNdOltzZWNvbmRzXS5bbWlsbGlzZWNvbmRzXVxyXG4gICAgICAgIHJldHVybiBjb21wdXRlU2Vjb25kcygwLCBtWzFdLCBtWzJdLCBtWzRdKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gQSBzZXR0aW5ncyBvYmplY3QgaG9sZHMga2V5L3ZhbHVlIHBhaXJzIGFuZCB3aWxsIGlnbm9yZSBhbnl0aGluZyBidXQgdGhlIGZpcnN0XHJcbi8vIGFzc2lnbm1lbnQgdG8gYSBzcGVjaWZpYyBrZXkuXHJcbmZ1bmN0aW9uIFNldHRpbmdzKCkge1xyXG4gICAgdGhpcy52YWx1ZXMgPSBfb2JqQ3JlYXRlKG51bGwpO1xyXG59XHJcblxyXG5TZXR0aW5ncy5wcm90b3R5cGUgPSB7XHJcbiAgICAvLyBPbmx5IGFjY2VwdCB0aGUgZmlyc3QgYXNzaWdubWVudCB0byBhbnkga2V5LlxyXG4gICAgc2V0OiBmdW5jdGlvbihrLCB2KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdldChrKSAmJiB2ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVzW2tdID0gdjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gUmV0dXJuIHRoZSB2YWx1ZSBmb3IgYSBrZXksIG9yIGEgZGVmYXVsdCB2YWx1ZS5cclxuICAgIC8vIElmICdkZWZhdWx0S2V5JyBpcyBwYXNzZWQgdGhlbiAnZGZsdCcgaXMgYXNzdW1lZCB0byBiZSBhbiBvYmplY3Qgd2l0aFxyXG4gICAgLy8gYSBudW1iZXIgb2YgcG9zc2libGUgZGVmYXVsdCB2YWx1ZXMgYXMgcHJvcGVydGllcyB3aGVyZSAnZGVmYXVsdEtleScgaXNcclxuICAgIC8vIHRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRoYXQgd2lsbCBiZSBjaG9zZW47IG90aGVyd2lzZSBpdCdzIGFzc3VtZWQgdG8gYmVcclxuICAgIC8vIGEgc2luZ2xlIHZhbHVlLlxyXG4gICAgZ2V0OiBmdW5jdGlvbihrLCBkZmx0LCBkZWZhdWx0S2V5KSB7XHJcbiAgICAgICAgaWYgKGRlZmF1bHRLZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzKGspID8gdGhpcy52YWx1ZXNba10gOiBkZmx0W2RlZmF1bHRLZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5oYXMoaykgPyB0aGlzLnZhbHVlc1trXSA6IGRmbHQ7XHJcbiAgICB9LFxyXG4gICAgLy8gQ2hlY2sgd2hldGhlciB3ZSBoYXZlIGEgdmFsdWUgZm9yIGEga2V5LlxyXG4gICAgaGFzOiBmdW5jdGlvbihrKSB7XHJcbiAgICAgICAgcmV0dXJuIGsgaW4gdGhpcy52YWx1ZXM7XHJcbiAgICB9LFxyXG4gICAgLy8gQWNjZXB0IGEgc2V0dGluZyBpZiBpdHMgb25lIG9mIHRoZSBnaXZlbiBhbHRlcm5hdGl2ZXMuXHJcbiAgICBhbHQ6IGZ1bmN0aW9uKGssIHYsIGEpIHtcclxuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGEubGVuZ3RoOyArK24pIHtcclxuICAgICAgICAgICAgaWYgKHYgPT09IGFbbl0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGssIHYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gQWNjZXB0IGEgc2V0dGluZyBpZiBpdHMgYSB2YWxpZCAoc2lnbmVkKSBpbnRlZ2VyLlxyXG4gICAgaW50ZWdlcjogZnVuY3Rpb24oaywgdikge1xyXG4gICAgICAgIGlmICgvXi0/XFxkKyQvLnRlc3QodikpIHsgLy8gaW50ZWdlclxyXG4gICAgICAgICAgICB0aGlzLnNldChrLCBwYXJzZUludCh2LCAxMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBBY2NlcHQgYSBzZXR0aW5nIGlmIGl0cyBhIHZhbGlkIHBlcmNlbnRhZ2UuXHJcbiAgICBwZXJjZW50OiBmdW5jdGlvbihrLCB2KSB7XHJcbiAgICAgICAgdmFyIG07XHJcbiAgICAgICAgaWYgKChtID0gdi5tYXRjaCgvXihbXFxkXXsxLDN9KShcXC5bXFxkXSopPyUkLykpKSB7XHJcbiAgICAgICAgICAgIHYgPSBwYXJzZUZsb2F0KHYpO1xyXG4gICAgICAgICAgICBpZiAodiA+PSAwICYmIHYgPD0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldChrLCB2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIEhlbHBlciBmdW5jdGlvbiB0byBwYXJzZSBpbnB1dCBpbnRvIGdyb3VwcyBzZXBhcmF0ZWQgYnkgJ2dyb3VwRGVsaW0nLCBhbmRcclxuLy8gaW50ZXJwcmV0ZSBlYWNoIGdyb3VwIGFzIGEga2V5L3ZhbHVlIHBhaXIgc2VwYXJhdGVkIGJ5ICdrZXlWYWx1ZURlbGltJy5cclxuZnVuY3Rpb24gcGFyc2VPcHRpb25zKGlucHV0LCBjYWxsYmFjaywga2V5VmFsdWVEZWxpbSwgZ3JvdXBEZWxpbSkge1xyXG4gICAgdmFyIGdyb3VwcyA9IGdyb3VwRGVsaW0gPyBpbnB1dC5zcGxpdChncm91cERlbGltKSA6IFtpbnB1dF07XHJcbiAgICBmb3IgKHZhciBpIGluIGdyb3Vwcykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZ3JvdXBzW2ldICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIga3YgPSBncm91cHNbaV0uc3BsaXQoa2V5VmFsdWVEZWxpbSk7XHJcbiAgICAgICAgaWYgKGt2Lmxlbmd0aCAhPT0gMikge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGsgPSBrdlswXTtcclxuICAgICAgICB2YXIgdiA9IGt2WzFdO1xyXG4gICAgICAgIGNhbGxiYWNrKGssIHYpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUN1ZShpbnB1dCwgY3VlLCByZWdpb25MaXN0KSB7XHJcbiAgICAvLyBSZW1lbWJlciB0aGUgb3JpZ2luYWwgaW5wdXQgaWYgd2UgbmVlZCB0byB0aHJvdyBhbiBlcnJvci5cclxuICAgIHZhciBvSW5wdXQgPSBpbnB1dDtcclxuICAgIC8vIDQuMSBXZWJWVFQgdGltZXN0YW1wXHJcbiAgICBmdW5jdGlvbiBjb25zdW1lVGltZVN0YW1wKCkge1xyXG4gICAgICAgIHZhciB0cyA9IHBhcnNlVGltZVN0YW1wKGlucHV0KTtcclxuICAgICAgICBpZiAodHMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNpbmdFcnJvcihQYXJzaW5nRXJyb3IuRXJyb3JzLkJhZFRpbWVTdGFtcCxcclxuICAgICAgICAgICAgICAgIFwiTWFsZm9ybWVkIHRpbWVzdGFtcDogXCIgKyBvSW5wdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgdGltZSBzdGFtcCBmcm9tIGlucHV0LlxyXG4gICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXlteXFxzYS16QS1aLV0rLywgXCJcIik7XHJcbiAgICAgICAgcmV0dXJuIHRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDQuNC4yIFdlYlZUVCBjdWUgc2V0dGluZ3NcclxuICAgIGZ1bmN0aW9uIGNvbnN1bWVDdWVTZXR0aW5ncyhpbnB1dCwgY3VlKSB7XHJcbiAgICAgICAgdmFyIHNldHRpbmdzID0gbmV3IFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgIHBhcnNlT3B0aW9ucyhpbnB1dCwgZnVuY3Rpb24gKGssIHYpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChrKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVnaW9uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmluZCB0aGUgbGFzdCByZWdpb24gd2UgcGFyc2VkIHdpdGggdGhlIHNhbWUgcmVnaW9uIGlkLlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSByZWdpb25MaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWdpb25MaXN0W2ldLmlkID09PSB2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5zZXQoaywgcmVnaW9uTGlzdFtpXS5yZWdpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwidmVydGljYWxcIjpcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5hbHQoaywgdiwgW1wicmxcIiwgXCJsclwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibGluZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWxzID0gdi5zcGxpdChcIixcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHMwID0gdmFsc1swXTtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5pbnRlZ2VyKGssIHZhbHMwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5wZXJjZW50KGssIHZhbHMwKSA/IHNldHRpbmdzLnNldChcInNuYXBUb0xpbmVzXCIsIGZhbHNlKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KGssIHZhbHMwLCBbXCJhdXRvXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFscy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KFwibGluZUFsaWduXCIsIHZhbHNbMV0sIFtcInN0YXJ0XCIsIFwibWlkZGxlXCIsIFwiZW5kXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicG9zaXRpb25cIjpcclxuICAgICAgICAgICAgICAgICAgICB2YWxzID0gdi5zcGxpdChcIixcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MucGVyY2VudChrLCB2YWxzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFscy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KFwicG9zaXRpb25BbGlnblwiLCB2YWxzWzFdLCBbXCJzdGFydFwiLCBcIm1pZGRsZVwiLCBcImVuZFwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNpemVcIjpcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5wZXJjZW50KGssIHYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImFsaWduXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KGssIHYsIFtcInN0YXJ0XCIsIFwibWlkZGxlXCIsIFwiZW5kXCIsIFwibGVmdFwiLCBcInJpZ2h0XCJdKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIC86LywgL1xccy8pO1xyXG5cclxuICAgICAgICAvL2hzbGVlIHJlbW92ZSB0aGVzZSBmaWVsZHMuXHJcbiAgICAgICAgLy9CZWNhdXNlIHNhZmFyaSBkaWVzIGhlcmUgYWx3YXlzLiBBbmQgUGxheWVyIGRvZW4ndCB1c2Ugc3R5bGUgZmllbGRzLlxyXG4gICAgICAgIC8vIEFwcGx5IGRlZmF1bHQgdmFsdWVzIGZvciBhbnkgbWlzc2luZyBmaWVsZHMuXHJcbiAgICAgICAgLypjdWUucmVnaW9uID0gc2V0dGluZ3MuZ2V0KFwicmVnaW9uXCIsIG51bGwpO1xyXG4gICAgICAgIGN1ZS52ZXJ0aWNhbCA9IHNldHRpbmdzLmdldChcInZlcnRpY2FsXCIsIFwiXCIpO1xyXG4gICAgICAgIGN1ZS5saW5lID0gc2V0dGluZ3MuZ2V0KFwibGluZVwiLCBcImF1dG9cIik7XHJcbiAgICAgICAgY3VlLmxpbmVBbGlnbiA9IHNldHRpbmdzLmdldChcImxpbmVBbGlnblwiLCBcInN0YXJ0XCIpO1xyXG4gICAgICAgIGN1ZS5zbmFwVG9MaW5lcyA9IHNldHRpbmdzLmdldChcInNuYXBUb0xpbmVzXCIsIHRydWUpO1xyXG4gICAgICAgIGN1ZS5zaXplID0gc2V0dGluZ3MuZ2V0KFwic2l6ZVwiLCAxMDApO1xyXG4gICAgICAgIC8vY3VlLmFsaWduID0gc2V0dGluZ3MuZ2V0KFwiYWxpZ25cIiwgXCJtaWRkbGVcIik7XHJcbiAgICAgICAgY3VlLnBvc2l0aW9uID0gc2V0dGluZ3MuZ2V0KFwicG9zaXRpb25cIiwgXCJhdXRvXCIpO1xyXG4gICAgICAgIGN1ZS5wb3NpdGlvbkFsaWduID0gc2V0dGluZ3MuZ2V0KFwicG9zaXRpb25BbGlnblwiLCB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiBcInN0YXJ0XCIsXHJcbiAgICAgICAgICAgIGxlZnQ6IFwic3RhcnRcIixcclxuICAgICAgICAgICAgbWlkZGxlOiBcIm1pZGRsZVwiLFxyXG4gICAgICAgICAgICBlbmQ6IFwiZW5kXCIsXHJcbiAgICAgICAgICAgIHJpZ2h0OiBcImVuZFwiXHJcbiAgICAgICAgfSwgY3VlLmFsaWduXHJcbiAgICAgICAgKTsqL1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNraXBXaGl0ZXNwYWNlKCkge1xyXG4gICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXlxccysvLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA0LjEgV2ViVlRUIGN1ZSB0aW1pbmdzLlxyXG4gICAgc2tpcFdoaXRlc3BhY2UoKTtcclxuICAgIGN1ZS5zdGFydFRpbWUgPSBjb25zdW1lVGltZVN0YW1wKCk7ICAgLy8gKDEpIGNvbGxlY3QgY3VlIHN0YXJ0IHRpbWVcclxuICAgIHNraXBXaGl0ZXNwYWNlKCk7XHJcbiAgICBpZiAoaW5wdXQuc3Vic3RyKDAsIDMpICE9PSBcIi0tPlwiKSB7ICAgICAvLyAoMykgbmV4dCBjaGFyYWN0ZXJzIG11c3QgbWF0Y2ggXCItLT5cIlxyXG4gICAgICAgIHRocm93IG5ldyBQYXJzaW5nRXJyb3IoUGFyc2luZ0Vycm9yLkVycm9ycy5CYWRUaW1lU3RhbXAsXHJcbiAgICAgICAgICAgIFwiTWFsZm9ybWVkIHRpbWUgc3RhbXAgKHRpbWUgc3RhbXBzIG11c3QgYmUgc2VwYXJhdGVkIGJ5ICctLT4nKTogXCIgK1xyXG4gICAgICAgICAgICBvSW5wdXQpO1xyXG4gICAgfVxyXG4gICAgaW5wdXQgPSBpbnB1dC5zdWJzdHIoMyk7XHJcbiAgICBza2lwV2hpdGVzcGFjZSgpO1xyXG4gICAgY3VlLmVuZFRpbWUgPSBjb25zdW1lVGltZVN0YW1wKCk7ICAgICAvLyAoNSkgY29sbGVjdCBjdWUgZW5kIHRpbWVcclxuXHJcbiAgICAvLyA0LjEgV2ViVlRUIGN1ZSBzZXR0aW5ncyBsaXN0LlxyXG4gICAgc2tpcFdoaXRlc3BhY2UoKTtcclxuICAgIGNvbnN1bWVDdWVTZXR0aW5ncyhpbnB1dCwgY3VlKTtcclxufVxyXG5cclxudmFyIEVTQ0FQRSA9IHtcclxuICAgIFwiJmFtcDtcIjogXCImXCIsXHJcbiAgICBcIiZsdDtcIjogXCI8XCIsXHJcbiAgICBcIiZndDtcIjogXCI+XCIsXHJcbiAgICBcIiZscm07XCI6IFwiXFx1MjAwZVwiLFxyXG4gICAgXCImcmxtO1wiOiBcIlxcdTIwMGZcIixcclxuICAgIFwiJm5ic3A7XCI6IFwiXFx1MDBhMFwiXHJcbn07XHJcblxyXG52YXIgVEFHX05BTUUgPSB7XHJcbiAgICBjOiBcInNwYW5cIixcclxuICAgIGk6IFwiaVwiLFxyXG4gICAgYjogXCJiXCIsXHJcbiAgICB1OiBcInVcIixcclxuICAgIHJ1Ynk6IFwicnVieVwiLFxyXG4gICAgcnQ6IFwicnRcIixcclxuICAgIHY6IFwic3BhblwiLFxyXG4gICAgbGFuZzogXCJzcGFuXCJcclxufTtcclxuXHJcbnZhciBUQUdfQU5OT1RBVElPTiA9IHtcclxuICAgIHY6IFwidGl0bGVcIixcclxuICAgIGxhbmc6IFwibGFuZ1wiXHJcbn07XHJcblxyXG52YXIgTkVFRFNfUEFSRU5UID0ge1xyXG4gICAgcnQ6IFwicnVieVwiXHJcbn07XHJcblxyXG4vLyBQYXJzZSBjb250ZW50IGludG8gYSBkb2N1bWVudCBmcmFnbWVudC5cclxuZnVuY3Rpb24gcGFyc2VDb250ZW50KHdpbmRvdywgaW5wdXQpIHtcclxuICAgIGZ1bmN0aW9uIG5leHRUb2tlbigpIHtcclxuICAgICAgICAvLyBDaGVjayBmb3IgZW5kLW9mLXN0cmluZy5cclxuICAgICAgICBpZiAoIWlucHV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ29uc3VtZSAnbicgY2hhcmFjdGVycyBmcm9tIHRoZSBpbnB1dC5cclxuICAgICAgICBmdW5jdGlvbiBjb25zdW1lKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cihyZXN1bHQubGVuZ3RoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtID0gaW5wdXQubWF0Y2goL14oW148XSopKDxbXj5dKz4/KT8vKTtcclxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBzb21lIHRleHQgYmVmb3JlIHRoZSBuZXh0IHRhZywgcmV0dXJuIGl0LCBvdGhlcndpc2UgcmV0dXJuXHJcbiAgICAgICAgLy8gdGhlIHRhZy5cclxuICAgICAgICByZXR1cm4gY29uc3VtZShtWzFdID8gbVsxXSA6IG1bMl0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVuZXNjYXBlIGEgc3RyaW5nICdzJy5cclxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlMShlKSB7XHJcbiAgICAgICAgcmV0dXJuIEVTQ0FQRVtlXTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlKHMpIHtcclxuICAgICAgICB3aGlsZSAoKG0gPSBzLm1hdGNoKC8mKGFtcHxsdHxndHxscm18cmxtfG5ic3ApOy8pKSkge1xyXG4gICAgICAgICAgICBzID0gcy5yZXBsYWNlKG1bMF0sIHVuZXNjYXBlMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3VsZEFkZChjdXJyZW50LCBlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuICFORUVEU19QQVJFTlRbZWxlbWVudC5sb2NhbE5hbWVdIHx8XHJcbiAgICAgICAgICAgIE5FRURTX1BBUkVOVFtlbGVtZW50LmxvY2FsTmFtZV0gPT09IGN1cnJlbnQubG9jYWxOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENyZWF0ZSBhbiBlbGVtZW50IGZvciB0aGlzIHRhZy5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgYW5ub3RhdGlvbikge1xyXG4gICAgICAgIHZhciB0YWdOYW1lID0gVEFHX05BTUVbdHlwZV07XHJcbiAgICAgICAgaWYgKCF0YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG4gICAgICAgIGVsZW1lbnQubG9jYWxOYW1lID0gdGFnTmFtZTtcclxuICAgICAgICB2YXIgbmFtZSA9IFRBR19BTk5PVEFUSU9OW3R5cGVdO1xyXG4gICAgICAgIGlmIChuYW1lICYmIGFubm90YXRpb24pIHtcclxuICAgICAgICAgICAgZWxlbWVudFtuYW1lXSA9IGFubm90YXRpb24udHJpbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcm9vdERpdiA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxyXG4gICAgICAgIGN1cnJlbnQgPSByb290RGl2LFxyXG4gICAgICAgIHQsXHJcbiAgICAgICAgdGFnU3RhY2sgPSBbXTtcclxuXHJcbiAgICB3aGlsZSAoKHQgPSBuZXh0VG9rZW4oKSkgIT09IG51bGwpIHtcclxuICAgICAgICBpZiAodFswXSA9PT0gJzwnKSB7XHJcbiAgICAgICAgICAgIGlmICh0WzFdID09PSBcIi9cIikge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGNsb3NpbmcgdGFnIG1hdGNoZXMsIG1vdmUgYmFjayB1cCB0byB0aGUgcGFyZW50IG5vZGUuXHJcbiAgICAgICAgICAgICAgICBpZiAodGFnU3RhY2subGVuZ3RoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGFnU3RhY2tbdGFnU3RhY2subGVuZ3RoIC0gMV0gPT09IHQuc3Vic3RyKDIpLnJlcGxhY2UoXCI+XCIsIFwiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBqdXN0IGlnbm9yZSB0aGUgZW5kIHRhZy5cclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB0cyA9IHBhcnNlVGltZVN0YW1wKHQuc3Vic3RyKDEsIHQubGVuZ3RoIC0gMikpO1xyXG4gICAgICAgICAgICB2YXIgbm9kZTtcclxuICAgICAgICAgICAgaWYgKHRzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaW1lc3RhbXBzIGFyZSBsZWFkIG5vZGVzIGFzIHdlbGwuXHJcbiAgICAgICAgICAgICAgICBub2RlID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZVByb2Nlc3NpbmdJbnN0cnVjdGlvbihcInRpbWVzdGFtcFwiLCB0cyk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50LmFwcGVuZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG0gPSB0Lm1hdGNoKC9ePChbXi5cXHMvMC05Pl0rKShcXC5bXlxcc1xcXFw+XSspPyhbXj5cXFxcXSspPyhcXFxcPyk+PyQvKTtcclxuICAgICAgICAgICAgLy8gSWYgd2UgY2FuJ3QgcGFyc2UgdGhlIHRhZywgc2tpcCB0byB0aGUgbmV4dCB0YWcuXHJcbiAgICAgICAgICAgIGlmICghbSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVHJ5IHRvIGNvbnN0cnVjdCBhbiBlbGVtZW50LCBhbmQgaWdub3JlIHRoZSB0YWcgaWYgd2UgY291bGRuJ3QuXHJcbiAgICAgICAgICAgIG5vZGUgPSBjcmVhdGVFbGVtZW50KG1bMV0sIG1bM10pO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSBpZiB0aGUgdGFnIHNob3VsZCBiZSBhZGRlZCBiYXNlZCBvbiB0aGUgY29udGV4dCBvZiB3aGVyZSBpdFxyXG4gICAgICAgICAgICAvLyBpcyBwbGFjZWQgaW4gdGhlIGN1ZXRleHQuXHJcbiAgICAgICAgICAgIGlmICghc2hvdWxkQWRkKGN1cnJlbnQsIG5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGNsYXNzIGxpc3QgKGFzIGEgbGlzdCBvZiBjbGFzc2VzLCBzZXBhcmF0ZWQgYnkgc3BhY2UpLlxyXG4gICAgICAgICAgICBpZiAobVsyXSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSBtWzJdLnN1YnN0cigxKS5yZXBsYWNlKCcuJywgJyAnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBBcHBlbmQgdGhlIG5vZGUgdG8gdGhlIGN1cnJlbnQgbm9kZSwgYW5kIGVudGVyIHRoZSBzY29wZSBvZiB0aGUgbmV3XHJcbiAgICAgICAgICAgIC8vIG5vZGUuXHJcbiAgICAgICAgICAgIHRhZ1N0YWNrLnB1c2gobVsxXSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnQuYXBwZW5kQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBub2RlO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRleHQgbm9kZXMgYXJlIGxlYWYgbm9kZXMuXHJcbiAgICAgICAgY3VycmVudC5hcHBlbmRDaGlsZCh3aW5kb3cuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodW5lc2NhcGUodCkpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm9vdERpdjtcclxufVxyXG5cclxuLy8gVGhpcyBpcyBhIGxpc3Qgb2YgYWxsIHRoZSBVbmljb2RlIGNoYXJhY3RlcnMgdGhhdCBoYXZlIGEgc3Ryb25nXHJcbi8vIHJpZ2h0LXRvLWxlZnQgY2F0ZWdvcnkuIFdoYXQgdGhpcyBtZWFucyBpcyB0aGF0IHRoZXNlIGNoYXJhY3RlcnMgYXJlXHJcbi8vIHdyaXR0ZW4gcmlnaHQtdG8tbGVmdCBmb3Igc3VyZS4gSXQgd2FzIGdlbmVyYXRlZCBieSBwdWxsaW5nIGFsbCB0aGUgc3Ryb25nXHJcbi8vIHJpZ2h0LXRvLWxlZnQgY2hhcmFjdGVycyBvdXQgb2YgdGhlIFVuaWNvZGUgZGF0YSB0YWJsZS4gVGhhdCB0YWJsZSBjYW5cclxuLy8gZm91bmQgYXQ6IGh0dHA6Ly93d3cudW5pY29kZS5vcmcvUHVibGljL1VOSURBVEEvVW5pY29kZURhdGEudHh0XHJcbnZhciBzdHJvbmdSVExDaGFycyA9IFsweDA1QkUsIDB4MDVDMCwgMHgwNUMzLCAweDA1QzYsIDB4MDVEMCwgMHgwNUQxLFxyXG4gICAgMHgwNUQyLCAweDA1RDMsIDB4MDVENCwgMHgwNUQ1LCAweDA1RDYsIDB4MDVENywgMHgwNUQ4LCAweDA1RDksIDB4MDVEQSxcclxuICAgIDB4MDVEQiwgMHgwNURDLCAweDA1REQsIDB4MDVERSwgMHgwNURGLCAweDA1RTAsIDB4MDVFMSwgMHgwNUUyLCAweDA1RTMsXHJcbiAgICAweDA1RTQsIDB4MDVFNSwgMHgwNUU2LCAweDA1RTcsIDB4MDVFOCwgMHgwNUU5LCAweDA1RUEsIDB4MDVGMCwgMHgwNUYxLFxyXG4gICAgMHgwNUYyLCAweDA1RjMsIDB4MDVGNCwgMHgwNjA4LCAweDA2MEIsIDB4MDYwRCwgMHgwNjFCLCAweDA2MUUsIDB4MDYxRixcclxuICAgIDB4MDYyMCwgMHgwNjIxLCAweDA2MjIsIDB4MDYyMywgMHgwNjI0LCAweDA2MjUsIDB4MDYyNiwgMHgwNjI3LCAweDA2MjgsXHJcbiAgICAweDA2MjksIDB4MDYyQSwgMHgwNjJCLCAweDA2MkMsIDB4MDYyRCwgMHgwNjJFLCAweDA2MkYsIDB4MDYzMCwgMHgwNjMxLFxyXG4gICAgMHgwNjMyLCAweDA2MzMsIDB4MDYzNCwgMHgwNjM1LCAweDA2MzYsIDB4MDYzNywgMHgwNjM4LCAweDA2MzksIDB4MDYzQSxcclxuICAgIDB4MDYzQiwgMHgwNjNDLCAweDA2M0QsIDB4MDYzRSwgMHgwNjNGLCAweDA2NDAsIDB4MDY0MSwgMHgwNjQyLCAweDA2NDMsXHJcbiAgICAweDA2NDQsIDB4MDY0NSwgMHgwNjQ2LCAweDA2NDcsIDB4MDY0OCwgMHgwNjQ5LCAweDA2NEEsIDB4MDY2RCwgMHgwNjZFLFxyXG4gICAgMHgwNjZGLCAweDA2NzEsIDB4MDY3MiwgMHgwNjczLCAweDA2NzQsIDB4MDY3NSwgMHgwNjc2LCAweDA2NzcsIDB4MDY3OCxcclxuICAgIDB4MDY3OSwgMHgwNjdBLCAweDA2N0IsIDB4MDY3QywgMHgwNjdELCAweDA2N0UsIDB4MDY3RiwgMHgwNjgwLCAweDA2ODEsXHJcbiAgICAweDA2ODIsIDB4MDY4MywgMHgwNjg0LCAweDA2ODUsIDB4MDY4NiwgMHgwNjg3LCAweDA2ODgsIDB4MDY4OSwgMHgwNjhBLFxyXG4gICAgMHgwNjhCLCAweDA2OEMsIDB4MDY4RCwgMHgwNjhFLCAweDA2OEYsIDB4MDY5MCwgMHgwNjkxLCAweDA2OTIsIDB4MDY5MyxcclxuICAgIDB4MDY5NCwgMHgwNjk1LCAweDA2OTYsIDB4MDY5NywgMHgwNjk4LCAweDA2OTksIDB4MDY5QSwgMHgwNjlCLCAweDA2OUMsXHJcbiAgICAweDA2OUQsIDB4MDY5RSwgMHgwNjlGLCAweDA2QTAsIDB4MDZBMSwgMHgwNkEyLCAweDA2QTMsIDB4MDZBNCwgMHgwNkE1LFxyXG4gICAgMHgwNkE2LCAweDA2QTcsIDB4MDZBOCwgMHgwNkE5LCAweDA2QUEsIDB4MDZBQiwgMHgwNkFDLCAweDA2QUQsIDB4MDZBRSxcclxuICAgIDB4MDZBRiwgMHgwNkIwLCAweDA2QjEsIDB4MDZCMiwgMHgwNkIzLCAweDA2QjQsIDB4MDZCNSwgMHgwNkI2LCAweDA2QjcsXHJcbiAgICAweDA2QjgsIDB4MDZCOSwgMHgwNkJBLCAweDA2QkIsIDB4MDZCQywgMHgwNkJELCAweDA2QkUsIDB4MDZCRiwgMHgwNkMwLFxyXG4gICAgMHgwNkMxLCAweDA2QzIsIDB4MDZDMywgMHgwNkM0LCAweDA2QzUsIDB4MDZDNiwgMHgwNkM3LCAweDA2QzgsIDB4MDZDOSxcclxuICAgIDB4MDZDQSwgMHgwNkNCLCAweDA2Q0MsIDB4MDZDRCwgMHgwNkNFLCAweDA2Q0YsIDB4MDZEMCwgMHgwNkQxLCAweDA2RDIsXHJcbiAgICAweDA2RDMsIDB4MDZENCwgMHgwNkQ1LCAweDA2RTUsIDB4MDZFNiwgMHgwNkVFLCAweDA2RUYsIDB4MDZGQSwgMHgwNkZCLFxyXG4gICAgMHgwNkZDLCAweDA2RkQsIDB4MDZGRSwgMHgwNkZGLCAweDA3MDAsIDB4MDcwMSwgMHgwNzAyLCAweDA3MDMsIDB4MDcwNCxcclxuICAgIDB4MDcwNSwgMHgwNzA2LCAweDA3MDcsIDB4MDcwOCwgMHgwNzA5LCAweDA3MEEsIDB4MDcwQiwgMHgwNzBDLCAweDA3MEQsXHJcbiAgICAweDA3MEYsIDB4MDcxMCwgMHgwNzEyLCAweDA3MTMsIDB4MDcxNCwgMHgwNzE1LCAweDA3MTYsIDB4MDcxNywgMHgwNzE4LFxyXG4gICAgMHgwNzE5LCAweDA3MUEsIDB4MDcxQiwgMHgwNzFDLCAweDA3MUQsIDB4MDcxRSwgMHgwNzFGLCAweDA3MjAsIDB4MDcyMSxcclxuICAgIDB4MDcyMiwgMHgwNzIzLCAweDA3MjQsIDB4MDcyNSwgMHgwNzI2LCAweDA3MjcsIDB4MDcyOCwgMHgwNzI5LCAweDA3MkEsXHJcbiAgICAweDA3MkIsIDB4MDcyQywgMHgwNzJELCAweDA3MkUsIDB4MDcyRiwgMHgwNzRELCAweDA3NEUsIDB4MDc0RiwgMHgwNzUwLFxyXG4gICAgMHgwNzUxLCAweDA3NTIsIDB4MDc1MywgMHgwNzU0LCAweDA3NTUsIDB4MDc1NiwgMHgwNzU3LCAweDA3NTgsIDB4MDc1OSxcclxuICAgIDB4MDc1QSwgMHgwNzVCLCAweDA3NUMsIDB4MDc1RCwgMHgwNzVFLCAweDA3NUYsIDB4MDc2MCwgMHgwNzYxLCAweDA3NjIsXHJcbiAgICAweDA3NjMsIDB4MDc2NCwgMHgwNzY1LCAweDA3NjYsIDB4MDc2NywgMHgwNzY4LCAweDA3NjksIDB4MDc2QSwgMHgwNzZCLFxyXG4gICAgMHgwNzZDLCAweDA3NkQsIDB4MDc2RSwgMHgwNzZGLCAweDA3NzAsIDB4MDc3MSwgMHgwNzcyLCAweDA3NzMsIDB4MDc3NCxcclxuICAgIDB4MDc3NSwgMHgwNzc2LCAweDA3NzcsIDB4MDc3OCwgMHgwNzc5LCAweDA3N0EsIDB4MDc3QiwgMHgwNzdDLCAweDA3N0QsXHJcbiAgICAweDA3N0UsIDB4MDc3RiwgMHgwNzgwLCAweDA3ODEsIDB4MDc4MiwgMHgwNzgzLCAweDA3ODQsIDB4MDc4NSwgMHgwNzg2LFxyXG4gICAgMHgwNzg3LCAweDA3ODgsIDB4MDc4OSwgMHgwNzhBLCAweDA3OEIsIDB4MDc4QywgMHgwNzhELCAweDA3OEUsIDB4MDc4RixcclxuICAgIDB4MDc5MCwgMHgwNzkxLCAweDA3OTIsIDB4MDc5MywgMHgwNzk0LCAweDA3OTUsIDB4MDc5NiwgMHgwNzk3LCAweDA3OTgsXHJcbiAgICAweDA3OTksIDB4MDc5QSwgMHgwNzlCLCAweDA3OUMsIDB4MDc5RCwgMHgwNzlFLCAweDA3OUYsIDB4MDdBMCwgMHgwN0ExLFxyXG4gICAgMHgwN0EyLCAweDA3QTMsIDB4MDdBNCwgMHgwN0E1LCAweDA3QjEsIDB4MDdDMCwgMHgwN0MxLCAweDA3QzIsIDB4MDdDMyxcclxuICAgIDB4MDdDNCwgMHgwN0M1LCAweDA3QzYsIDB4MDdDNywgMHgwN0M4LCAweDA3QzksIDB4MDdDQSwgMHgwN0NCLCAweDA3Q0MsXHJcbiAgICAweDA3Q0QsIDB4MDdDRSwgMHgwN0NGLCAweDA3RDAsIDB4MDdEMSwgMHgwN0QyLCAweDA3RDMsIDB4MDdENCwgMHgwN0Q1LFxyXG4gICAgMHgwN0Q2LCAweDA3RDcsIDB4MDdEOCwgMHgwN0Q5LCAweDA3REEsIDB4MDdEQiwgMHgwN0RDLCAweDA3REQsIDB4MDdERSxcclxuICAgIDB4MDdERiwgMHgwN0UwLCAweDA3RTEsIDB4MDdFMiwgMHgwN0UzLCAweDA3RTQsIDB4MDdFNSwgMHgwN0U2LCAweDA3RTcsXHJcbiAgICAweDA3RTgsIDB4MDdFOSwgMHgwN0VBLCAweDA3RjQsIDB4MDdGNSwgMHgwN0ZBLCAweDA4MDAsIDB4MDgwMSwgMHgwODAyLFxyXG4gICAgMHgwODAzLCAweDA4MDQsIDB4MDgwNSwgMHgwODA2LCAweDA4MDcsIDB4MDgwOCwgMHgwODA5LCAweDA4MEEsIDB4MDgwQixcclxuICAgIDB4MDgwQywgMHgwODBELCAweDA4MEUsIDB4MDgwRiwgMHgwODEwLCAweDA4MTEsIDB4MDgxMiwgMHgwODEzLCAweDA4MTQsXHJcbiAgICAweDA4MTUsIDB4MDgxQSwgMHgwODI0LCAweDA4MjgsIDB4MDgzMCwgMHgwODMxLCAweDA4MzIsIDB4MDgzMywgMHgwODM0LFxyXG4gICAgMHgwODM1LCAweDA4MzYsIDB4MDgzNywgMHgwODM4LCAweDA4MzksIDB4MDgzQSwgMHgwODNCLCAweDA4M0MsIDB4MDgzRCxcclxuICAgIDB4MDgzRSwgMHgwODQwLCAweDA4NDEsIDB4MDg0MiwgMHgwODQzLCAweDA4NDQsIDB4MDg0NSwgMHgwODQ2LCAweDA4NDcsXHJcbiAgICAweDA4NDgsIDB4MDg0OSwgMHgwODRBLCAweDA4NEIsIDB4MDg0QywgMHgwODRELCAweDA4NEUsIDB4MDg0RiwgMHgwODUwLFxyXG4gICAgMHgwODUxLCAweDA4NTIsIDB4MDg1MywgMHgwODU0LCAweDA4NTUsIDB4MDg1NiwgMHgwODU3LCAweDA4NTgsIDB4MDg1RSxcclxuICAgIDB4MDhBMCwgMHgwOEEyLCAweDA4QTMsIDB4MDhBNCwgMHgwOEE1LCAweDA4QTYsIDB4MDhBNywgMHgwOEE4LCAweDA4QTksXHJcbiAgICAweDA4QUEsIDB4MDhBQiwgMHgwOEFDLCAweDIwMEYsIDB4RkIxRCwgMHhGQjFGLCAweEZCMjAsIDB4RkIyMSwgMHhGQjIyLFxyXG4gICAgMHhGQjIzLCAweEZCMjQsIDB4RkIyNSwgMHhGQjI2LCAweEZCMjcsIDB4RkIyOCwgMHhGQjJBLCAweEZCMkIsIDB4RkIyQyxcclxuICAgIDB4RkIyRCwgMHhGQjJFLCAweEZCMkYsIDB4RkIzMCwgMHhGQjMxLCAweEZCMzIsIDB4RkIzMywgMHhGQjM0LCAweEZCMzUsXHJcbiAgICAweEZCMzYsIDB4RkIzOCwgMHhGQjM5LCAweEZCM0EsIDB4RkIzQiwgMHhGQjNDLCAweEZCM0UsIDB4RkI0MCwgMHhGQjQxLFxyXG4gICAgMHhGQjQzLCAweEZCNDQsIDB4RkI0NiwgMHhGQjQ3LCAweEZCNDgsIDB4RkI0OSwgMHhGQjRBLCAweEZCNEIsIDB4RkI0QyxcclxuICAgIDB4RkI0RCwgMHhGQjRFLCAweEZCNEYsIDB4RkI1MCwgMHhGQjUxLCAweEZCNTIsIDB4RkI1MywgMHhGQjU0LCAweEZCNTUsXHJcbiAgICAweEZCNTYsIDB4RkI1NywgMHhGQjU4LCAweEZCNTksIDB4RkI1QSwgMHhGQjVCLCAweEZCNUMsIDB4RkI1RCwgMHhGQjVFLFxyXG4gICAgMHhGQjVGLCAweEZCNjAsIDB4RkI2MSwgMHhGQjYyLCAweEZCNjMsIDB4RkI2NCwgMHhGQjY1LCAweEZCNjYsIDB4RkI2NyxcclxuICAgIDB4RkI2OCwgMHhGQjY5LCAweEZCNkEsIDB4RkI2QiwgMHhGQjZDLCAweEZCNkQsIDB4RkI2RSwgMHhGQjZGLCAweEZCNzAsXHJcbiAgICAweEZCNzEsIDB4RkI3MiwgMHhGQjczLCAweEZCNzQsIDB4RkI3NSwgMHhGQjc2LCAweEZCNzcsIDB4RkI3OCwgMHhGQjc5LFxyXG4gICAgMHhGQjdBLCAweEZCN0IsIDB4RkI3QywgMHhGQjdELCAweEZCN0UsIDB4RkI3RiwgMHhGQjgwLCAweEZCODEsIDB4RkI4MixcclxuICAgIDB4RkI4MywgMHhGQjg0LCAweEZCODUsIDB4RkI4NiwgMHhGQjg3LCAweEZCODgsIDB4RkI4OSwgMHhGQjhBLCAweEZCOEIsXHJcbiAgICAweEZCOEMsIDB4RkI4RCwgMHhGQjhFLCAweEZCOEYsIDB4RkI5MCwgMHhGQjkxLCAweEZCOTIsIDB4RkI5MywgMHhGQjk0LFxyXG4gICAgMHhGQjk1LCAweEZCOTYsIDB4RkI5NywgMHhGQjk4LCAweEZCOTksIDB4RkI5QSwgMHhGQjlCLCAweEZCOUMsIDB4RkI5RCxcclxuICAgIDB4RkI5RSwgMHhGQjlGLCAweEZCQTAsIDB4RkJBMSwgMHhGQkEyLCAweEZCQTMsIDB4RkJBNCwgMHhGQkE1LCAweEZCQTYsXHJcbiAgICAweEZCQTcsIDB4RkJBOCwgMHhGQkE5LCAweEZCQUEsIDB4RkJBQiwgMHhGQkFDLCAweEZCQUQsIDB4RkJBRSwgMHhGQkFGLFxyXG4gICAgMHhGQkIwLCAweEZCQjEsIDB4RkJCMiwgMHhGQkIzLCAweEZCQjQsIDB4RkJCNSwgMHhGQkI2LCAweEZCQjcsIDB4RkJCOCxcclxuICAgIDB4RkJCOSwgMHhGQkJBLCAweEZCQkIsIDB4RkJCQywgMHhGQkJELCAweEZCQkUsIDB4RkJCRiwgMHhGQkMwLCAweEZCQzEsXHJcbiAgICAweEZCRDMsIDB4RkJENCwgMHhGQkQ1LCAweEZCRDYsIDB4RkJENywgMHhGQkQ4LCAweEZCRDksIDB4RkJEQSwgMHhGQkRCLFxyXG4gICAgMHhGQkRDLCAweEZCREQsIDB4RkJERSwgMHhGQkRGLCAweEZCRTAsIDB4RkJFMSwgMHhGQkUyLCAweEZCRTMsIDB4RkJFNCxcclxuICAgIDB4RkJFNSwgMHhGQkU2LCAweEZCRTcsIDB4RkJFOCwgMHhGQkU5LCAweEZCRUEsIDB4RkJFQiwgMHhGQkVDLCAweEZCRUQsXHJcbiAgICAweEZCRUUsIDB4RkJFRiwgMHhGQkYwLCAweEZCRjEsIDB4RkJGMiwgMHhGQkYzLCAweEZCRjQsIDB4RkJGNSwgMHhGQkY2LFxyXG4gICAgMHhGQkY3LCAweEZCRjgsIDB4RkJGOSwgMHhGQkZBLCAweEZCRkIsIDB4RkJGQywgMHhGQkZELCAweEZCRkUsIDB4RkJGRixcclxuICAgIDB4RkMwMCwgMHhGQzAxLCAweEZDMDIsIDB4RkMwMywgMHhGQzA0LCAweEZDMDUsIDB4RkMwNiwgMHhGQzA3LCAweEZDMDgsXHJcbiAgICAweEZDMDksIDB4RkMwQSwgMHhGQzBCLCAweEZDMEMsIDB4RkMwRCwgMHhGQzBFLCAweEZDMEYsIDB4RkMxMCwgMHhGQzExLFxyXG4gICAgMHhGQzEyLCAweEZDMTMsIDB4RkMxNCwgMHhGQzE1LCAweEZDMTYsIDB4RkMxNywgMHhGQzE4LCAweEZDMTksIDB4RkMxQSxcclxuICAgIDB4RkMxQiwgMHhGQzFDLCAweEZDMUQsIDB4RkMxRSwgMHhGQzFGLCAweEZDMjAsIDB4RkMyMSwgMHhGQzIyLCAweEZDMjMsXHJcbiAgICAweEZDMjQsIDB4RkMyNSwgMHhGQzI2LCAweEZDMjcsIDB4RkMyOCwgMHhGQzI5LCAweEZDMkEsIDB4RkMyQiwgMHhGQzJDLFxyXG4gICAgMHhGQzJELCAweEZDMkUsIDB4RkMyRiwgMHhGQzMwLCAweEZDMzEsIDB4RkMzMiwgMHhGQzMzLCAweEZDMzQsIDB4RkMzNSxcclxuICAgIDB4RkMzNiwgMHhGQzM3LCAweEZDMzgsIDB4RkMzOSwgMHhGQzNBLCAweEZDM0IsIDB4RkMzQywgMHhGQzNELCAweEZDM0UsXHJcbiAgICAweEZDM0YsIDB4RkM0MCwgMHhGQzQxLCAweEZDNDIsIDB4RkM0MywgMHhGQzQ0LCAweEZDNDUsIDB4RkM0NiwgMHhGQzQ3LFxyXG4gICAgMHhGQzQ4LCAweEZDNDksIDB4RkM0QSwgMHhGQzRCLCAweEZDNEMsIDB4RkM0RCwgMHhGQzRFLCAweEZDNEYsIDB4RkM1MCxcclxuICAgIDB4RkM1MSwgMHhGQzUyLCAweEZDNTMsIDB4RkM1NCwgMHhGQzU1LCAweEZDNTYsIDB4RkM1NywgMHhGQzU4LCAweEZDNTksXHJcbiAgICAweEZDNUEsIDB4RkM1QiwgMHhGQzVDLCAweEZDNUQsIDB4RkM1RSwgMHhGQzVGLCAweEZDNjAsIDB4RkM2MSwgMHhGQzYyLFxyXG4gICAgMHhGQzYzLCAweEZDNjQsIDB4RkM2NSwgMHhGQzY2LCAweEZDNjcsIDB4RkM2OCwgMHhGQzY5LCAweEZDNkEsIDB4RkM2QixcclxuICAgIDB4RkM2QywgMHhGQzZELCAweEZDNkUsIDB4RkM2RiwgMHhGQzcwLCAweEZDNzEsIDB4RkM3MiwgMHhGQzczLCAweEZDNzQsXHJcbiAgICAweEZDNzUsIDB4RkM3NiwgMHhGQzc3LCAweEZDNzgsIDB4RkM3OSwgMHhGQzdBLCAweEZDN0IsIDB4RkM3QywgMHhGQzdELFxyXG4gICAgMHhGQzdFLCAweEZDN0YsIDB4RkM4MCwgMHhGQzgxLCAweEZDODIsIDB4RkM4MywgMHhGQzg0LCAweEZDODUsIDB4RkM4NixcclxuICAgIDB4RkM4NywgMHhGQzg4LCAweEZDODksIDB4RkM4QSwgMHhGQzhCLCAweEZDOEMsIDB4RkM4RCwgMHhGQzhFLCAweEZDOEYsXHJcbiAgICAweEZDOTAsIDB4RkM5MSwgMHhGQzkyLCAweEZDOTMsIDB4RkM5NCwgMHhGQzk1LCAweEZDOTYsIDB4RkM5NywgMHhGQzk4LFxyXG4gICAgMHhGQzk5LCAweEZDOUEsIDB4RkM5QiwgMHhGQzlDLCAweEZDOUQsIDB4RkM5RSwgMHhGQzlGLCAweEZDQTAsIDB4RkNBMSxcclxuICAgIDB4RkNBMiwgMHhGQ0EzLCAweEZDQTQsIDB4RkNBNSwgMHhGQ0E2LCAweEZDQTcsIDB4RkNBOCwgMHhGQ0E5LCAweEZDQUEsXHJcbiAgICAweEZDQUIsIDB4RkNBQywgMHhGQ0FELCAweEZDQUUsIDB4RkNBRiwgMHhGQ0IwLCAweEZDQjEsIDB4RkNCMiwgMHhGQ0IzLFxyXG4gICAgMHhGQ0I0LCAweEZDQjUsIDB4RkNCNiwgMHhGQ0I3LCAweEZDQjgsIDB4RkNCOSwgMHhGQ0JBLCAweEZDQkIsIDB4RkNCQyxcclxuICAgIDB4RkNCRCwgMHhGQ0JFLCAweEZDQkYsIDB4RkNDMCwgMHhGQ0MxLCAweEZDQzIsIDB4RkNDMywgMHhGQ0M0LCAweEZDQzUsXHJcbiAgICAweEZDQzYsIDB4RkNDNywgMHhGQ0M4LCAweEZDQzksIDB4RkNDQSwgMHhGQ0NCLCAweEZDQ0MsIDB4RkNDRCwgMHhGQ0NFLFxyXG4gICAgMHhGQ0NGLCAweEZDRDAsIDB4RkNEMSwgMHhGQ0QyLCAweEZDRDMsIDB4RkNENCwgMHhGQ0Q1LCAweEZDRDYsIDB4RkNENyxcclxuICAgIDB4RkNEOCwgMHhGQ0Q5LCAweEZDREEsIDB4RkNEQiwgMHhGQ0RDLCAweEZDREQsIDB4RkNERSwgMHhGQ0RGLCAweEZDRTAsXHJcbiAgICAweEZDRTEsIDB4RkNFMiwgMHhGQ0UzLCAweEZDRTQsIDB4RkNFNSwgMHhGQ0U2LCAweEZDRTcsIDB4RkNFOCwgMHhGQ0U5LFxyXG4gICAgMHhGQ0VBLCAweEZDRUIsIDB4RkNFQywgMHhGQ0VELCAweEZDRUUsIDB4RkNFRiwgMHhGQ0YwLCAweEZDRjEsIDB4RkNGMixcclxuICAgIDB4RkNGMywgMHhGQ0Y0LCAweEZDRjUsIDB4RkNGNiwgMHhGQ0Y3LCAweEZDRjgsIDB4RkNGOSwgMHhGQ0ZBLCAweEZDRkIsXHJcbiAgICAweEZDRkMsIDB4RkNGRCwgMHhGQ0ZFLCAweEZDRkYsIDB4RkQwMCwgMHhGRDAxLCAweEZEMDIsIDB4RkQwMywgMHhGRDA0LFxyXG4gICAgMHhGRDA1LCAweEZEMDYsIDB4RkQwNywgMHhGRDA4LCAweEZEMDksIDB4RkQwQSwgMHhGRDBCLCAweEZEMEMsIDB4RkQwRCxcclxuICAgIDB4RkQwRSwgMHhGRDBGLCAweEZEMTAsIDB4RkQxMSwgMHhGRDEyLCAweEZEMTMsIDB4RkQxNCwgMHhGRDE1LCAweEZEMTYsXHJcbiAgICAweEZEMTcsIDB4RkQxOCwgMHhGRDE5LCAweEZEMUEsIDB4RkQxQiwgMHhGRDFDLCAweEZEMUQsIDB4RkQxRSwgMHhGRDFGLFxyXG4gICAgMHhGRDIwLCAweEZEMjEsIDB4RkQyMiwgMHhGRDIzLCAweEZEMjQsIDB4RkQyNSwgMHhGRDI2LCAweEZEMjcsIDB4RkQyOCxcclxuICAgIDB4RkQyOSwgMHhGRDJBLCAweEZEMkIsIDB4RkQyQywgMHhGRDJELCAweEZEMkUsIDB4RkQyRiwgMHhGRDMwLCAweEZEMzEsXHJcbiAgICAweEZEMzIsIDB4RkQzMywgMHhGRDM0LCAweEZEMzUsIDB4RkQzNiwgMHhGRDM3LCAweEZEMzgsIDB4RkQzOSwgMHhGRDNBLFxyXG4gICAgMHhGRDNCLCAweEZEM0MsIDB4RkQzRCwgMHhGRDUwLCAweEZENTEsIDB4RkQ1MiwgMHhGRDUzLCAweEZENTQsIDB4RkQ1NSxcclxuICAgIDB4RkQ1NiwgMHhGRDU3LCAweEZENTgsIDB4RkQ1OSwgMHhGRDVBLCAweEZENUIsIDB4RkQ1QywgMHhGRDVELCAweEZENUUsXHJcbiAgICAweEZENUYsIDB4RkQ2MCwgMHhGRDYxLCAweEZENjIsIDB4RkQ2MywgMHhGRDY0LCAweEZENjUsIDB4RkQ2NiwgMHhGRDY3LFxyXG4gICAgMHhGRDY4LCAweEZENjksIDB4RkQ2QSwgMHhGRDZCLCAweEZENkMsIDB4RkQ2RCwgMHhGRDZFLCAweEZENkYsIDB4RkQ3MCxcclxuICAgIDB4RkQ3MSwgMHhGRDcyLCAweEZENzMsIDB4RkQ3NCwgMHhGRDc1LCAweEZENzYsIDB4RkQ3NywgMHhGRDc4LCAweEZENzksXHJcbiAgICAweEZEN0EsIDB4RkQ3QiwgMHhGRDdDLCAweEZEN0QsIDB4RkQ3RSwgMHhGRDdGLCAweEZEODAsIDB4RkQ4MSwgMHhGRDgyLFxyXG4gICAgMHhGRDgzLCAweEZEODQsIDB4RkQ4NSwgMHhGRDg2LCAweEZEODcsIDB4RkQ4OCwgMHhGRDg5LCAweEZEOEEsIDB4RkQ4QixcclxuICAgIDB4RkQ4QywgMHhGRDhELCAweEZEOEUsIDB4RkQ4RiwgMHhGRDkyLCAweEZEOTMsIDB4RkQ5NCwgMHhGRDk1LCAweEZEOTYsXHJcbiAgICAweEZEOTcsIDB4RkQ5OCwgMHhGRDk5LCAweEZEOUEsIDB4RkQ5QiwgMHhGRDlDLCAweEZEOUQsIDB4RkQ5RSwgMHhGRDlGLFxyXG4gICAgMHhGREEwLCAweEZEQTEsIDB4RkRBMiwgMHhGREEzLCAweEZEQTQsIDB4RkRBNSwgMHhGREE2LCAweEZEQTcsIDB4RkRBOCxcclxuICAgIDB4RkRBOSwgMHhGREFBLCAweEZEQUIsIDB4RkRBQywgMHhGREFELCAweEZEQUUsIDB4RkRBRiwgMHhGREIwLCAweEZEQjEsXHJcbiAgICAweEZEQjIsIDB4RkRCMywgMHhGREI0LCAweEZEQjUsIDB4RkRCNiwgMHhGREI3LCAweEZEQjgsIDB4RkRCOSwgMHhGREJBLFxyXG4gICAgMHhGREJCLCAweEZEQkMsIDB4RkRCRCwgMHhGREJFLCAweEZEQkYsIDB4RkRDMCwgMHhGREMxLCAweEZEQzIsIDB4RkRDMyxcclxuICAgIDB4RkRDNCwgMHhGREM1LCAweEZEQzYsIDB4RkRDNywgMHhGREYwLCAweEZERjEsIDB4RkRGMiwgMHhGREYzLCAweEZERjQsXHJcbiAgICAweEZERjUsIDB4RkRGNiwgMHhGREY3LCAweEZERjgsIDB4RkRGOSwgMHhGREZBLCAweEZERkIsIDB4RkRGQywgMHhGRTcwLFxyXG4gICAgMHhGRTcxLCAweEZFNzIsIDB4RkU3MywgMHhGRTc0LCAweEZFNzYsIDB4RkU3NywgMHhGRTc4LCAweEZFNzksIDB4RkU3QSxcclxuICAgIDB4RkU3QiwgMHhGRTdDLCAweEZFN0QsIDB4RkU3RSwgMHhGRTdGLCAweEZFODAsIDB4RkU4MSwgMHhGRTgyLCAweEZFODMsXHJcbiAgICAweEZFODQsIDB4RkU4NSwgMHhGRTg2LCAweEZFODcsIDB4RkU4OCwgMHhGRTg5LCAweEZFOEEsIDB4RkU4QiwgMHhGRThDLFxyXG4gICAgMHhGRThELCAweEZFOEUsIDB4RkU4RiwgMHhGRTkwLCAweEZFOTEsIDB4RkU5MiwgMHhGRTkzLCAweEZFOTQsIDB4RkU5NSxcclxuICAgIDB4RkU5NiwgMHhGRTk3LCAweEZFOTgsIDB4RkU5OSwgMHhGRTlBLCAweEZFOUIsIDB4RkU5QywgMHhGRTlELCAweEZFOUUsXHJcbiAgICAweEZFOUYsIDB4RkVBMCwgMHhGRUExLCAweEZFQTIsIDB4RkVBMywgMHhGRUE0LCAweEZFQTUsIDB4RkVBNiwgMHhGRUE3LFxyXG4gICAgMHhGRUE4LCAweEZFQTksIDB4RkVBQSwgMHhGRUFCLCAweEZFQUMsIDB4RkVBRCwgMHhGRUFFLCAweEZFQUYsIDB4RkVCMCxcclxuICAgIDB4RkVCMSwgMHhGRUIyLCAweEZFQjMsIDB4RkVCNCwgMHhGRUI1LCAweEZFQjYsIDB4RkVCNywgMHhGRUI4LCAweEZFQjksXHJcbiAgICAweEZFQkEsIDB4RkVCQiwgMHhGRUJDLCAweEZFQkQsIDB4RkVCRSwgMHhGRUJGLCAweEZFQzAsIDB4RkVDMSwgMHhGRUMyLFxyXG4gICAgMHhGRUMzLCAweEZFQzQsIDB4RkVDNSwgMHhGRUM2LCAweEZFQzcsIDB4RkVDOCwgMHhGRUM5LCAweEZFQ0EsIDB4RkVDQixcclxuICAgIDB4RkVDQywgMHhGRUNELCAweEZFQ0UsIDB4RkVDRiwgMHhGRUQwLCAweEZFRDEsIDB4RkVEMiwgMHhGRUQzLCAweEZFRDQsXHJcbiAgICAweEZFRDUsIDB4RkVENiwgMHhGRUQ3LCAweEZFRDgsIDB4RkVEOSwgMHhGRURBLCAweEZFREIsIDB4RkVEQywgMHhGRURELFxyXG4gICAgMHhGRURFLCAweEZFREYsIDB4RkVFMCwgMHhGRUUxLCAweEZFRTIsIDB4RkVFMywgMHhGRUU0LCAweEZFRTUsIDB4RkVFNixcclxuICAgIDB4RkVFNywgMHhGRUU4LCAweEZFRTksIDB4RkVFQSwgMHhGRUVCLCAweEZFRUMsIDB4RkVFRCwgMHhGRUVFLCAweEZFRUYsXHJcbiAgICAweEZFRjAsIDB4RkVGMSwgMHhGRUYyLCAweEZFRjMsIDB4RkVGNCwgMHhGRUY1LCAweEZFRjYsIDB4RkVGNywgMHhGRUY4LFxyXG4gICAgMHhGRUY5LCAweEZFRkEsIDB4RkVGQiwgMHhGRUZDLCAweDEwODAwLCAweDEwODAxLCAweDEwODAyLCAweDEwODAzLFxyXG4gICAgMHgxMDgwNCwgMHgxMDgwNSwgMHgxMDgwOCwgMHgxMDgwQSwgMHgxMDgwQiwgMHgxMDgwQywgMHgxMDgwRCwgMHgxMDgwRSxcclxuICAgIDB4MTA4MEYsIDB4MTA4MTAsIDB4MTA4MTEsIDB4MTA4MTIsIDB4MTA4MTMsIDB4MTA4MTQsIDB4MTA4MTUsIDB4MTA4MTYsXHJcbiAgICAweDEwODE3LCAweDEwODE4LCAweDEwODE5LCAweDEwODFBLCAweDEwODFCLCAweDEwODFDLCAweDEwODFELCAweDEwODFFLFxyXG4gICAgMHgxMDgxRiwgMHgxMDgyMCwgMHgxMDgyMSwgMHgxMDgyMiwgMHgxMDgyMywgMHgxMDgyNCwgMHgxMDgyNSwgMHgxMDgyNixcclxuICAgIDB4MTA4MjcsIDB4MTA4MjgsIDB4MTA4MjksIDB4MTA4MkEsIDB4MTA4MkIsIDB4MTA4MkMsIDB4MTA4MkQsIDB4MTA4MkUsXHJcbiAgICAweDEwODJGLCAweDEwODMwLCAweDEwODMxLCAweDEwODMyLCAweDEwODMzLCAweDEwODM0LCAweDEwODM1LCAweDEwODM3LFxyXG4gICAgMHgxMDgzOCwgMHgxMDgzQywgMHgxMDgzRiwgMHgxMDg0MCwgMHgxMDg0MSwgMHgxMDg0MiwgMHgxMDg0MywgMHgxMDg0NCxcclxuICAgIDB4MTA4NDUsIDB4MTA4NDYsIDB4MTA4NDcsIDB4MTA4NDgsIDB4MTA4NDksIDB4MTA4NEEsIDB4MTA4NEIsIDB4MTA4NEMsXHJcbiAgICAweDEwODRELCAweDEwODRFLCAweDEwODRGLCAweDEwODUwLCAweDEwODUxLCAweDEwODUyLCAweDEwODUzLCAweDEwODU0LFxyXG4gICAgMHgxMDg1NSwgMHgxMDg1NywgMHgxMDg1OCwgMHgxMDg1OSwgMHgxMDg1QSwgMHgxMDg1QiwgMHgxMDg1QywgMHgxMDg1RCxcclxuICAgIDB4MTA4NUUsIDB4MTA4NUYsIDB4MTA5MDAsIDB4MTA5MDEsIDB4MTA5MDIsIDB4MTA5MDMsIDB4MTA5MDQsIDB4MTA5MDUsXHJcbiAgICAweDEwOTA2LCAweDEwOTA3LCAweDEwOTA4LCAweDEwOTA5LCAweDEwOTBBLCAweDEwOTBCLCAweDEwOTBDLCAweDEwOTBELFxyXG4gICAgMHgxMDkwRSwgMHgxMDkwRiwgMHgxMDkxMCwgMHgxMDkxMSwgMHgxMDkxMiwgMHgxMDkxMywgMHgxMDkxNCwgMHgxMDkxNSxcclxuICAgIDB4MTA5MTYsIDB4MTA5MTcsIDB4MTA5MTgsIDB4MTA5MTksIDB4MTA5MUEsIDB4MTA5MUIsIDB4MTA5MjAsIDB4MTA5MjEsXHJcbiAgICAweDEwOTIyLCAweDEwOTIzLCAweDEwOTI0LCAweDEwOTI1LCAweDEwOTI2LCAweDEwOTI3LCAweDEwOTI4LCAweDEwOTI5LFxyXG4gICAgMHgxMDkyQSwgMHgxMDkyQiwgMHgxMDkyQywgMHgxMDkyRCwgMHgxMDkyRSwgMHgxMDkyRiwgMHgxMDkzMCwgMHgxMDkzMSxcclxuICAgIDB4MTA5MzIsIDB4MTA5MzMsIDB4MTA5MzQsIDB4MTA5MzUsIDB4MTA5MzYsIDB4MTA5MzcsIDB4MTA5MzgsIDB4MTA5MzksXHJcbiAgICAweDEwOTNGLCAweDEwOTgwLCAweDEwOTgxLCAweDEwOTgyLCAweDEwOTgzLCAweDEwOTg0LCAweDEwOTg1LCAweDEwOTg2LFxyXG4gICAgMHgxMDk4NywgMHgxMDk4OCwgMHgxMDk4OSwgMHgxMDk4QSwgMHgxMDk4QiwgMHgxMDk4QywgMHgxMDk4RCwgMHgxMDk4RSxcclxuICAgIDB4MTA5OEYsIDB4MTA5OTAsIDB4MTA5OTEsIDB4MTA5OTIsIDB4MTA5OTMsIDB4MTA5OTQsIDB4MTA5OTUsIDB4MTA5OTYsXHJcbiAgICAweDEwOTk3LCAweDEwOTk4LCAweDEwOTk5LCAweDEwOTlBLCAweDEwOTlCLCAweDEwOTlDLCAweDEwOTlELCAweDEwOTlFLFxyXG4gICAgMHgxMDk5RiwgMHgxMDlBMCwgMHgxMDlBMSwgMHgxMDlBMiwgMHgxMDlBMywgMHgxMDlBNCwgMHgxMDlBNSwgMHgxMDlBNixcclxuICAgIDB4MTA5QTcsIDB4MTA5QTgsIDB4MTA5QTksIDB4MTA5QUEsIDB4MTA5QUIsIDB4MTA5QUMsIDB4MTA5QUQsIDB4MTA5QUUsXHJcbiAgICAweDEwOUFGLCAweDEwOUIwLCAweDEwOUIxLCAweDEwOUIyLCAweDEwOUIzLCAweDEwOUI0LCAweDEwOUI1LCAweDEwOUI2LFxyXG4gICAgMHgxMDlCNywgMHgxMDlCRSwgMHgxMDlCRiwgMHgxMEEwMCwgMHgxMEExMCwgMHgxMEExMSwgMHgxMEExMiwgMHgxMEExMyxcclxuICAgIDB4MTBBMTUsIDB4MTBBMTYsIDB4MTBBMTcsIDB4MTBBMTksIDB4MTBBMUEsIDB4MTBBMUIsIDB4MTBBMUMsIDB4MTBBMUQsXHJcbiAgICAweDEwQTFFLCAweDEwQTFGLCAweDEwQTIwLCAweDEwQTIxLCAweDEwQTIyLCAweDEwQTIzLCAweDEwQTI0LCAweDEwQTI1LFxyXG4gICAgMHgxMEEyNiwgMHgxMEEyNywgMHgxMEEyOCwgMHgxMEEyOSwgMHgxMEEyQSwgMHgxMEEyQiwgMHgxMEEyQywgMHgxMEEyRCxcclxuICAgIDB4MTBBMkUsIDB4MTBBMkYsIDB4MTBBMzAsIDB4MTBBMzEsIDB4MTBBMzIsIDB4MTBBMzMsIDB4MTBBNDAsIDB4MTBBNDEsXHJcbiAgICAweDEwQTQyLCAweDEwQTQzLCAweDEwQTQ0LCAweDEwQTQ1LCAweDEwQTQ2LCAweDEwQTQ3LCAweDEwQTUwLCAweDEwQTUxLFxyXG4gICAgMHgxMEE1MiwgMHgxMEE1MywgMHgxMEE1NCwgMHgxMEE1NSwgMHgxMEE1NiwgMHgxMEE1NywgMHgxMEE1OCwgMHgxMEE2MCxcclxuICAgIDB4MTBBNjEsIDB4MTBBNjIsIDB4MTBBNjMsIDB4MTBBNjQsIDB4MTBBNjUsIDB4MTBBNjYsIDB4MTBBNjcsIDB4MTBBNjgsXHJcbiAgICAweDEwQTY5LCAweDEwQTZBLCAweDEwQTZCLCAweDEwQTZDLCAweDEwQTZELCAweDEwQTZFLCAweDEwQTZGLCAweDEwQTcwLFxyXG4gICAgMHgxMEE3MSwgMHgxMEE3MiwgMHgxMEE3MywgMHgxMEE3NCwgMHgxMEE3NSwgMHgxMEE3NiwgMHgxMEE3NywgMHgxMEE3OCxcclxuICAgIDB4MTBBNzksIDB4MTBBN0EsIDB4MTBBN0IsIDB4MTBBN0MsIDB4MTBBN0QsIDB4MTBBN0UsIDB4MTBBN0YsIDB4MTBCMDAsXHJcbiAgICAweDEwQjAxLCAweDEwQjAyLCAweDEwQjAzLCAweDEwQjA0LCAweDEwQjA1LCAweDEwQjA2LCAweDEwQjA3LCAweDEwQjA4LFxyXG4gICAgMHgxMEIwOSwgMHgxMEIwQSwgMHgxMEIwQiwgMHgxMEIwQywgMHgxMEIwRCwgMHgxMEIwRSwgMHgxMEIwRiwgMHgxMEIxMCxcclxuICAgIDB4MTBCMTEsIDB4MTBCMTIsIDB4MTBCMTMsIDB4MTBCMTQsIDB4MTBCMTUsIDB4MTBCMTYsIDB4MTBCMTcsIDB4MTBCMTgsXHJcbiAgICAweDEwQjE5LCAweDEwQjFBLCAweDEwQjFCLCAweDEwQjFDLCAweDEwQjFELCAweDEwQjFFLCAweDEwQjFGLCAweDEwQjIwLFxyXG4gICAgMHgxMEIyMSwgMHgxMEIyMiwgMHgxMEIyMywgMHgxMEIyNCwgMHgxMEIyNSwgMHgxMEIyNiwgMHgxMEIyNywgMHgxMEIyOCxcclxuICAgIDB4MTBCMjksIDB4MTBCMkEsIDB4MTBCMkIsIDB4MTBCMkMsIDB4MTBCMkQsIDB4MTBCMkUsIDB4MTBCMkYsIDB4MTBCMzAsXHJcbiAgICAweDEwQjMxLCAweDEwQjMyLCAweDEwQjMzLCAweDEwQjM0LCAweDEwQjM1LCAweDEwQjQwLCAweDEwQjQxLCAweDEwQjQyLFxyXG4gICAgMHgxMEI0MywgMHgxMEI0NCwgMHgxMEI0NSwgMHgxMEI0NiwgMHgxMEI0NywgMHgxMEI0OCwgMHgxMEI0OSwgMHgxMEI0QSxcclxuICAgIDB4MTBCNEIsIDB4MTBCNEMsIDB4MTBCNEQsIDB4MTBCNEUsIDB4MTBCNEYsIDB4MTBCNTAsIDB4MTBCNTEsIDB4MTBCNTIsXHJcbiAgICAweDEwQjUzLCAweDEwQjU0LCAweDEwQjU1LCAweDEwQjU4LCAweDEwQjU5LCAweDEwQjVBLCAweDEwQjVCLCAweDEwQjVDLFxyXG4gICAgMHgxMEI1RCwgMHgxMEI1RSwgMHgxMEI1RiwgMHgxMEI2MCwgMHgxMEI2MSwgMHgxMEI2MiwgMHgxMEI2MywgMHgxMEI2NCxcclxuICAgIDB4MTBCNjUsIDB4MTBCNjYsIDB4MTBCNjcsIDB4MTBCNjgsIDB4MTBCNjksIDB4MTBCNkEsIDB4MTBCNkIsIDB4MTBCNkMsXHJcbiAgICAweDEwQjZELCAweDEwQjZFLCAweDEwQjZGLCAweDEwQjcwLCAweDEwQjcxLCAweDEwQjcyLCAweDEwQjc4LCAweDEwQjc5LFxyXG4gICAgMHgxMEI3QSwgMHgxMEI3QiwgMHgxMEI3QywgMHgxMEI3RCwgMHgxMEI3RSwgMHgxMEI3RiwgMHgxMEMwMCwgMHgxMEMwMSxcclxuICAgIDB4MTBDMDIsIDB4MTBDMDMsIDB4MTBDMDQsIDB4MTBDMDUsIDB4MTBDMDYsIDB4MTBDMDcsIDB4MTBDMDgsIDB4MTBDMDksXHJcbiAgICAweDEwQzBBLCAweDEwQzBCLCAweDEwQzBDLCAweDEwQzBELCAweDEwQzBFLCAweDEwQzBGLCAweDEwQzEwLCAweDEwQzExLFxyXG4gICAgMHgxMEMxMiwgMHgxMEMxMywgMHgxMEMxNCwgMHgxMEMxNSwgMHgxMEMxNiwgMHgxMEMxNywgMHgxMEMxOCwgMHgxMEMxOSxcclxuICAgIDB4MTBDMUEsIDB4MTBDMUIsIDB4MTBDMUMsIDB4MTBDMUQsIDB4MTBDMUUsIDB4MTBDMUYsIDB4MTBDMjAsIDB4MTBDMjEsXHJcbiAgICAweDEwQzIyLCAweDEwQzIzLCAweDEwQzI0LCAweDEwQzI1LCAweDEwQzI2LCAweDEwQzI3LCAweDEwQzI4LCAweDEwQzI5LFxyXG4gICAgMHgxMEMyQSwgMHgxMEMyQiwgMHgxMEMyQywgMHgxMEMyRCwgMHgxMEMyRSwgMHgxMEMyRiwgMHgxMEMzMCwgMHgxMEMzMSxcclxuICAgIDB4MTBDMzIsIDB4MTBDMzMsIDB4MTBDMzQsIDB4MTBDMzUsIDB4MTBDMzYsIDB4MTBDMzcsIDB4MTBDMzgsIDB4MTBDMzksXHJcbiAgICAweDEwQzNBLCAweDEwQzNCLCAweDEwQzNDLCAweDEwQzNELCAweDEwQzNFLCAweDEwQzNGLCAweDEwQzQwLCAweDEwQzQxLFxyXG4gICAgMHgxMEM0MiwgMHgxMEM0MywgMHgxMEM0NCwgMHgxMEM0NSwgMHgxMEM0NiwgMHgxMEM0NywgMHgxMEM0OCwgMHgxRUUwMCxcclxuICAgIDB4MUVFMDEsIDB4MUVFMDIsIDB4MUVFMDMsIDB4MUVFMDUsIDB4MUVFMDYsIDB4MUVFMDcsIDB4MUVFMDgsIDB4MUVFMDksXHJcbiAgICAweDFFRTBBLCAweDFFRTBCLCAweDFFRTBDLCAweDFFRTBELCAweDFFRTBFLCAweDFFRTBGLCAweDFFRTEwLCAweDFFRTExLFxyXG4gICAgMHgxRUUxMiwgMHgxRUUxMywgMHgxRUUxNCwgMHgxRUUxNSwgMHgxRUUxNiwgMHgxRUUxNywgMHgxRUUxOCwgMHgxRUUxOSxcclxuICAgIDB4MUVFMUEsIDB4MUVFMUIsIDB4MUVFMUMsIDB4MUVFMUQsIDB4MUVFMUUsIDB4MUVFMUYsIDB4MUVFMjEsIDB4MUVFMjIsXHJcbiAgICAweDFFRTI0LCAweDFFRTI3LCAweDFFRTI5LCAweDFFRTJBLCAweDFFRTJCLCAweDFFRTJDLCAweDFFRTJELCAweDFFRTJFLFxyXG4gICAgMHgxRUUyRiwgMHgxRUUzMCwgMHgxRUUzMSwgMHgxRUUzMiwgMHgxRUUzNCwgMHgxRUUzNSwgMHgxRUUzNiwgMHgxRUUzNyxcclxuICAgIDB4MUVFMzksIDB4MUVFM0IsIDB4MUVFNDIsIDB4MUVFNDcsIDB4MUVFNDksIDB4MUVFNEIsIDB4MUVFNEQsIDB4MUVFNEUsXHJcbiAgICAweDFFRTRGLCAweDFFRTUxLCAweDFFRTUyLCAweDFFRTU0LCAweDFFRTU3LCAweDFFRTU5LCAweDFFRTVCLCAweDFFRTVELFxyXG4gICAgMHgxRUU1RiwgMHgxRUU2MSwgMHgxRUU2MiwgMHgxRUU2NCwgMHgxRUU2NywgMHgxRUU2OCwgMHgxRUU2OSwgMHgxRUU2QSxcclxuICAgIDB4MUVFNkMsIDB4MUVFNkQsIDB4MUVFNkUsIDB4MUVFNkYsIDB4MUVFNzAsIDB4MUVFNzEsIDB4MUVFNzIsIDB4MUVFNzQsXHJcbiAgICAweDFFRTc1LCAweDFFRTc2LCAweDFFRTc3LCAweDFFRTc5LCAweDFFRTdBLCAweDFFRTdCLCAweDFFRTdDLCAweDFFRTdFLFxyXG4gICAgMHgxRUU4MCwgMHgxRUU4MSwgMHgxRUU4MiwgMHgxRUU4MywgMHgxRUU4NCwgMHgxRUU4NSwgMHgxRUU4NiwgMHgxRUU4NyxcclxuICAgIDB4MUVFODgsIDB4MUVFODksIDB4MUVFOEIsIDB4MUVFOEMsIDB4MUVFOEQsIDB4MUVFOEUsIDB4MUVFOEYsIDB4MUVFOTAsXHJcbiAgICAweDFFRTkxLCAweDFFRTkyLCAweDFFRTkzLCAweDFFRTk0LCAweDFFRTk1LCAweDFFRTk2LCAweDFFRTk3LCAweDFFRTk4LFxyXG4gICAgMHgxRUU5OSwgMHgxRUU5QSwgMHgxRUU5QiwgMHgxRUVBMSwgMHgxRUVBMiwgMHgxRUVBMywgMHgxRUVBNSwgMHgxRUVBNixcclxuICAgIDB4MUVFQTcsIDB4MUVFQTgsIDB4MUVFQTksIDB4MUVFQUIsIDB4MUVFQUMsIDB4MUVFQUQsIDB4MUVFQUUsIDB4MUVFQUYsXHJcbiAgICAweDFFRUIwLCAweDFFRUIxLCAweDFFRUIyLCAweDFFRUIzLCAweDFFRUI0LCAweDFFRUI1LCAweDFFRUI2LCAweDFFRUI3LFxyXG4gICAgMHgxRUVCOCwgMHgxRUVCOSwgMHgxRUVCQSwgMHgxRUVCQiwgMHgxMEZGRkRdO1xyXG5cclxuZnVuY3Rpb24gZGV0ZXJtaW5lQmlkaShjdWVEaXYpIHtcclxuICAgIHZhciBub2RlU3RhY2sgPSBbXSxcclxuICAgICAgICB0ZXh0ID0gXCJcIixcclxuICAgICAgICBjaGFyQ29kZTtcclxuXHJcbiAgICBpZiAoIWN1ZURpdiB8fCAhY3VlRGl2LmNoaWxkTm9kZXMpIHtcclxuICAgICAgICByZXR1cm4gXCJsdHJcIjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwdXNoTm9kZXMobm9kZVN0YWNrLCBub2RlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBub2RlU3RhY2sucHVzaChub2RlLmNoaWxkTm9kZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBuZXh0VGV4dE5vZGUobm9kZVN0YWNrKSB7XHJcbiAgICAgICAgaWYgKCFub2RlU3RhY2sgfHwgIW5vZGVTdGFjay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbm9kZSA9IG5vZGVTdGFjay5wb3AoKSxcclxuICAgICAgICAgICAgdGV4dCA9IG5vZGUudGV4dENvbnRlbnQgfHwgbm9kZS5pbm5lclRleHQ7XHJcbiAgICAgICAgaWYgKHRleHQpIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogVGhpcyBzaG91bGQgbWF0Y2ggYWxsIHVuaWNvZGUgdHlwZSBCIGNoYXJhY3RlcnMgKHBhcmFncmFwaFxyXG4gICAgICAgICAgICAvLyBzZXBhcmF0b3IgY2hhcmFjdGVycykuIFNlZSBpc3N1ZSAjMTE1LlxyXG4gICAgICAgICAgICB2YXIgbSA9IHRleHQubWF0Y2goL14uKihcXG58XFxyKS8pO1xyXG4gICAgICAgICAgICBpZiAobSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZVN0YWNrLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbVswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gXCJydWJ5XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5leHRUZXh0Tm9kZShub2RlU3RhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9kZS5jaGlsZE5vZGVzKSB7XHJcbiAgICAgICAgICAgIHB1c2hOb2Rlcyhub2RlU3RhY2ssIG5vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV4dFRleHROb2RlKG5vZGVTdGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1c2hOb2Rlcyhub2RlU3RhY2ssIGN1ZURpdik7XHJcbiAgICB3aGlsZSAoKHRleHQgPSBuZXh0VGV4dE5vZGUobm9kZVN0YWNrKSkpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2hhckNvZGUgPSB0ZXh0LmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3Ryb25nUlRMQ2hhcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdHJvbmdSVExDaGFyc1tqXSA9PT0gY2hhckNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJydGxcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBcImx0clwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlTGluZVBvcyhjdWUpIHtcclxuICAgIGlmICh0eXBlb2YgY3VlLmxpbmUgPT09IFwibnVtYmVyXCIgJiZcclxuICAgICAgICAoY3VlLnNuYXBUb0xpbmVzIHx8IChjdWUubGluZSA+PSAwICYmIGN1ZS5saW5lIDw9IDEwMCkpKSB7XHJcbiAgICAgICAgcmV0dXJuIGN1ZS5saW5lO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjdWUudHJhY2sgfHwgIWN1ZS50cmFjay50ZXh0VHJhY2tMaXN0IHx8XHJcbiAgICAgICAgIWN1ZS50cmFjay50ZXh0VHJhY2tMaXN0Lm1lZGlhRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIHZhciB0cmFjayA9IGN1ZS50cmFjayxcclxuICAgICAgICB0cmFja0xpc3QgPSB0cmFjay50ZXh0VHJhY2tMaXN0LFxyXG4gICAgICAgIGNvdW50ID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhY2tMaXN0Lmxlbmd0aCAmJiB0cmFja0xpc3RbaV0gIT09IHRyYWNrOyBpKyspIHtcclxuICAgICAgICBpZiAodHJhY2tMaXN0W2ldLm1vZGUgPT09IFwic2hvd2luZ1wiKSB7XHJcbiAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuICsrY291bnQgKiAtMTtcclxufVxyXG5cclxuZnVuY3Rpb24gU3R5bGVCb3goKSB7XHJcbn1cclxuXHJcbi8vIEFwcGx5IHN0eWxlcyB0byBhIGRpdi4gSWYgdGhlcmUgaXMgbm8gZGl2IHBhc3NlZCB0aGVuIGl0IGRlZmF1bHRzIHRvIHRoZVxyXG4vLyBkaXYgb24gJ3RoaXMnLlxyXG5TdHlsZUJveC5wcm90b3R5cGUuYXBwbHlTdHlsZXMgPSBmdW5jdGlvbihzdHlsZXMsIGRpdikge1xyXG4gICAgZGl2ID0gZGl2IHx8IHRoaXMuZGl2O1xyXG4gICAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZXMpIHtcclxuICAgICAgICBpZiAoc3R5bGVzLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgICAgICAgIGRpdi5zdHlsZVtwcm9wXSA9IHN0eWxlc1twcm9wXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5TdHlsZUJveC5wcm90b3R5cGUuZm9ybWF0U3R5bGUgPSBmdW5jdGlvbih2YWwsIHVuaXQpIHtcclxuICAgIHJldHVybiB2YWwgPT09IDAgPyAwIDogdmFsICsgdW5pdDtcclxufTtcclxuXHJcbi8vIENvbnN0cnVjdHMgdGhlIGNvbXB1dGVkIGRpc3BsYXkgc3RhdGUgb2YgdGhlIGN1ZSAoYSBkaXYpLiBQbGFjZXMgdGhlIGRpdlxyXG4vLyBpbnRvIHRoZSBvdmVybGF5IHdoaWNoIHNob3VsZCBiZSBhIGJsb2NrIGxldmVsIGVsZW1lbnQgKHVzdWFsbHkgYSBkaXYpLlxyXG5mdW5jdGlvbiBDdWVTdHlsZUJveCh3aW5kb3csIGN1ZSwgc3R5bGVPcHRpb25zKSB7XHJcbiAgICB2YXIgaXNJRTggPSAodHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIikgJiZcclxuICAgICAgICAoL01TSUVcXHM4XFwuMC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICB2YXIgY29sb3IgPSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMSlcIjtcclxuICAgIHZhciBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwgMCwgMCwgMC44KVwiO1xyXG4gICAgdmFyIHRleHRTaGFkb3cgPSBcIlwiO1xyXG5cclxuICAgIGlmKHR5cGVvZiBXZWJWVFRTZXQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBjb2xvciA9IFdlYlZUVFNldC5mb250U2V0O1xyXG4gICAgICAgIGJhY2tncm91bmRDb2xvciA9IFdlYlZUVFNldC5iYWNrZ3JvdW5kU2V0O1xyXG4gICAgICAgIHRleHRTaGFkb3cgPSBXZWJWVFRTZXQuZWRnZVNldDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNJRTgpIHtcclxuICAgICAgICBjb2xvciA9IFwicmdiKDI1NSwgMjU1LCAyNTUpXCI7XHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoMCwgMCwgMClcIjtcclxuICAgIH1cclxuXHJcbiAgICBTdHlsZUJveC5jYWxsKHRoaXMpO1xyXG4gICAgdGhpcy5jdWUgPSBjdWU7XHJcblxyXG4gICAgLy8gUGFyc2Ugb3VyIGN1ZSdzIHRleHQgaW50byBhIERPTSB0cmVlIHJvb3RlZCBhdCAnY3VlRGl2Jy4gVGhpcyBkaXYgd2lsbFxyXG4gICAgLy8gaGF2ZSBpbmxpbmUgcG9zaXRpb25pbmcgYW5kIHdpbGwgZnVuY3Rpb24gYXMgdGhlIGN1ZSBiYWNrZ3JvdW5kIGJveC5cclxuICAgIHRoaXMuY3VlRGl2ID0gcGFyc2VDb250ZW50KHdpbmRvdywgY3VlLnRleHQpO1xyXG4gICAgdmFyIHN0eWxlcyA9IHtcclxuICAgICAgICBjb2xvcjogY29sb3IsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3IsXHJcbiAgICAgICAgdGV4dFNoYWRvdzogdGV4dFNoYWRvdyxcclxuICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxyXG4gICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICBkaXNwbGF5OiBcImlubGluZVwiXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghaXNJRTgpIHtcclxuICAgICAgICBzdHlsZXMud3JpdGluZ01vZGUgPSBjdWUudmVydGljYWwgPT09IFwiXCIgPyBcImhvcml6b250YWwtdGJcIlxyXG4gICAgICAgICAgICA6IGN1ZS52ZXJ0aWNhbCA9PT0gXCJsclwiID8gXCJ2ZXJ0aWNhbC1sclwiXHJcbiAgICAgICAgICAgIDogXCJ2ZXJ0aWNhbC1ybFwiO1xyXG4gICAgICAgIHN0eWxlcy51bmljb2RlQmlkaSA9IFwicGxhaW50ZXh0XCI7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFwcGx5U3R5bGVzKHN0eWxlcywgdGhpcy5jdWVEaXYpO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhbiBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgZGl2IHRoYXQgd2lsbCBiZSB1c2VkIHRvIHBvc2l0aW9uIHRoZSBjdWVcclxuICAgIC8vIGRpdi4gTm90ZSwgYWxsIFdlYlZUVCBjdWUtc2V0dGluZyBhbGlnbm1lbnRzIGFyZSBlcXVpdmFsZW50IHRvIHRoZSBDU1NcclxuICAgIC8vIG1pcnJvcnMgb2YgdGhlbSBleGNlcHQgXCJtaWRkbGVcIiB3aGljaCBpcyBcImNlbnRlclwiIGluIENTUy5cclxuICAgIHRoaXMuZGl2ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzdHlsZXMgPSB7XHJcbiAgICAgICAgdGV4dEFsaWduOiBjdWUuYWxpZ24gPT09IFwibWlkZGxlXCIgPyBcImNlbnRlclwiIDogY3VlLmFsaWduLFxyXG4gICAgICAgIGZvbnQ6IHN0eWxlT3B0aW9ucy5mb250LFxyXG4gICAgICAgIHdoaXRlU3BhY2U6IFwicHJlLWxpbmVcIixcclxuICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghaXNJRTgpIHtcclxuICAgICAgICBzdHlsZXMuZGlyZWN0aW9uID0gZGV0ZXJtaW5lQmlkaSh0aGlzLmN1ZURpdik7XHJcbiAgICAgICAgc3R5bGVzLndyaXRpbmdNb2RlID0gY3VlLnZlcnRpY2FsID09PSBcIlwiID8gXCJob3Jpem9udGFsLXRiXCJcclxuICAgICAgICAgICAgOiBjdWUudmVydGljYWwgPT09IFwibHJcIiA/IFwidmVydGljYWwtbHJcIlxyXG4gICAgICAgICAgICA6IFwidmVydGljYWwtcmxcIi5cclxuICAgICAgICAgICAgc3R5bGVzdW5pY29kZUJpZGkgPSAgXCJwbGFpbnRleHRcIjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFwcGx5U3R5bGVzKHN0eWxlcyk7XHJcblxyXG4gICAgdGhpcy5kaXYuYXBwZW5kQ2hpbGQodGhpcy5jdWVEaXYpO1xyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgcmVmZXJlbmNlIGVkZ2Ugb2YgdGhlIHZpZXdwb3J0IHRvIHRoZSB0ZXh0XHJcbiAgICAvLyBwb3NpdGlvbiBvZiB0aGUgY3VlIGJveC4gVGhlIHJlZmVyZW5jZSBlZGdlIHdpbGwgYmUgcmVzb2x2ZWQgbGF0ZXIgd2hlblxyXG4gICAgLy8gdGhlIGJveCBvcmllbnRhdGlvbiBzdHlsZXMgYXJlIGFwcGxpZWQuXHJcbiAgICB2YXIgdGV4dFBvcyA9IDA7XHJcbiAgICBzd2l0Y2ggKGN1ZS5wb3NpdGlvbkFsaWduKSB7XHJcbiAgICAgICAgY2FzZSBcInN0YXJ0XCI6XHJcbiAgICAgICAgICAgIHRleHRQb3MgPSBjdWUucG9zaXRpb247XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJtaWRkbGVcIjpcclxuICAgICAgICAgICAgdGV4dFBvcyA9IGN1ZS5wb3NpdGlvbiAtIChjdWUuc2l6ZSAvIDIpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZW5kXCI6XHJcbiAgICAgICAgICAgIHRleHRQb3MgPSBjdWUucG9zaXRpb24gLSBjdWUuc2l6ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSG9yaXpvbnRhbCBib3ggb3JpZW50YXRpb247IHRleHRQb3MgaXMgdGhlIGRpc3RhbmNlIGZyb20gdGhlIGxlZnQgZWRnZSBvZiB0aGVcclxuICAgIC8vIGFyZWEgdG8gdGhlIGxlZnQgZWRnZSBvZiB0aGUgYm94IGFuZCBjdWUuc2l6ZSBpcyB0aGUgZGlzdGFuY2UgZXh0ZW5kaW5nIHRvXHJcbiAgICAvLyB0aGUgcmlnaHQgZnJvbSB0aGVyZS5cclxuICAgIGlmIChjdWUudmVydGljYWwgPT09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKHtcclxuICAgICAgICAgICAgbGVmdDogIHRoaXMuZm9ybWF0U3R5bGUodGV4dFBvcywgXCIlXCIpLFxyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5mb3JtYXRTdHlsZShjdWUuc2l6ZSwgXCIlXCIpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gVmVydGljYWwgYm94IG9yaWVudGF0aW9uOyB0ZXh0UG9zIGlzIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSB0b3AgZWRnZSBvZiB0aGVcclxuICAgICAgICAvLyBhcmVhIHRvIHRoZSB0b3AgZWRnZSBvZiB0aGUgYm94IGFuZCBjdWUuc2l6ZSBpcyB0aGUgaGVpZ2h0IGV4dGVuZGluZ1xyXG4gICAgICAgIC8vIGRvd253YXJkcyBmcm9tIHRoZXJlLlxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKHtcclxuICAgICAgICAgICAgdG9wOiB0aGlzLmZvcm1hdFN0eWxlKHRleHRQb3MsIFwiJVwiKSxcclxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmZvcm1hdFN0eWxlKGN1ZS5zaXplLCBcIiVcIilcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vdmUgPSBmdW5jdGlvbihib3gpIHtcclxuICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKHtcclxuICAgICAgICAgICAgdG9wOiB0aGlzLmZvcm1hdFN0eWxlKGJveC50b3AsIFwicHhcIiksXHJcbiAgICAgICAgICAgIGJvdHRvbTogdGhpcy5mb3JtYXRTdHlsZShib3guYm90dG9tLCBcInB4XCIpLFxyXG4gICAgICAgICAgICBsZWZ0OiB0aGlzLmZvcm1hdFN0eWxlKGJveC5sZWZ0LCBcInB4XCIpLFxyXG4gICAgICAgICAgICByaWdodDogdGhpcy5mb3JtYXRTdHlsZShib3gucmlnaHQsIFwicHhcIiksXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5mb3JtYXRTdHlsZShib3guaGVpZ2h0LCBcInB4XCIpLFxyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5mb3JtYXRTdHlsZShib3gud2lkdGgsIFwicHhcIilcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuQ3VlU3R5bGVCb3gucHJvdG90eXBlID0gX29iakNyZWF0ZShTdHlsZUJveC5wcm90b3R5cGUpO1xyXG5DdWVTdHlsZUJveC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDdWVTdHlsZUJveDtcclxuXHJcbi8vIFJlcHJlc2VudHMgdGhlIGNvLW9yZGluYXRlcyBvZiBhbiBFbGVtZW50IGluIGEgd2F5IHRoYXQgd2UgY2FuIGVhc2lseVxyXG4vLyBjb21wdXRlIHRoaW5ncyB3aXRoIHN1Y2ggYXMgaWYgaXQgb3ZlcmxhcHMgb3IgaW50ZXJzZWN0cyB3aXRoIGFub3RoZXIgRWxlbWVudC5cclxuLy8gQ2FuIGluaXRpYWxpemUgaXQgd2l0aCBlaXRoZXIgYSBTdHlsZUJveCBvciBhbm90aGVyIEJveFBvc2l0aW9uLlxyXG5mdW5jdGlvbiBCb3hQb3NpdGlvbihvYmopIHtcclxuICAgIHZhciBpc0lFOCA9ICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiKSAmJlxyXG4gICAgICAgICgvTVNJRVxcczhcXC4wLykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuXHJcbiAgICAvLyBFaXRoZXIgYSBCb3hQb3NpdGlvbiB3YXMgcGFzc2VkIGluIGFuZCB3ZSBuZWVkIHRvIGNvcHkgaXQsIG9yIGEgU3R5bGVCb3hcclxuICAgIC8vIHdhcyBwYXNzZWQgaW4gYW5kIHdlIG5lZWQgdG8gY29weSB0aGUgcmVzdWx0cyBvZiAnZ2V0Qm91bmRpbmdDbGllbnRSZWN0J1xyXG4gICAgLy8gYXMgdGhlIG9iamVjdCByZXR1cm5lZCBpcyByZWFkb25seS4gQWxsIGNvLW9yZGluYXRlIHZhbHVlcyBhcmUgaW4gcmVmZXJlbmNlXHJcbiAgICAvLyB0byB0aGUgdmlld3BvcnQgb3JpZ2luICh0b3AgbGVmdCkuXHJcbiAgICB2YXIgbGgsIGhlaWdodCwgd2lkdGgsIHRvcDtcclxuICAgIGlmIChvYmouZGl2KSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gb2JqLmRpdi5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgd2lkdGggPSBvYmouZGl2Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIHRvcCA9IG9iai5kaXYub2Zmc2V0VG9wO1xyXG5cclxuICAgICAgICB2YXIgcmVjdHMgPSAocmVjdHMgPSBvYmouZGl2LmNoaWxkTm9kZXMpICYmIChyZWN0cyA9IHJlY3RzWzBdKSAmJlxyXG4gICAgICAgICAgICByZWN0cy5nZXRDbGllbnRSZWN0cyAmJiByZWN0cy5nZXRDbGllbnRSZWN0cygpO1xyXG4gICAgICAgIG9iaiA9IG9iai5kaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgLy8gSW4gY2VydGFpbiBjYXNlcyB0aGUgb3V0dGVyIGRpdiB3aWxsIGJlIHNsaWdodGx5IGxhcmdlciB0aGVuIHRoZSBzdW0gb2ZcclxuICAgICAgICAvLyB0aGUgaW5uZXIgZGl2J3MgbGluZXMuIFRoaXMgY291bGQgYmUgZHVlIHRvIGJvbGQgdGV4dCwgZXRjLCBvbiBzb21lIHBsYXRmb3Jtcy5cclxuICAgICAgICAvLyBJbiB0aGlzIGNhc2Ugd2Ugc2hvdWxkIGdldCB0aGUgYXZlcmFnZSBsaW5lIGhlaWdodCBhbmQgdXNlIHRoYXQuIFRoaXMgd2lsbFxyXG4gICAgICAgIC8vIHJlc3VsdCBpbiB0aGUgZGVzaXJlZCBiZWhhdmlvdXIuXHJcbiAgICAgICAgbGggPSByZWN0cyA/IE1hdGgubWF4KChyZWN0c1swXSAmJiByZWN0c1swXS5oZWlnaHQpIHx8IDAsIG9iai5oZWlnaHQgLyByZWN0cy5sZW5ndGgpXHJcbiAgICAgICAgICAgIDogMDtcclxuXHJcbiAgICB9XHJcbiAgICB0aGlzLmxlZnQgPSBvYmoubGVmdDtcclxuICAgIHRoaXMucmlnaHQgPSBvYmoucmlnaHQ7XHJcbiAgICB0aGlzLnRvcCA9IG9iai50b3AgfHwgdG9wO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBvYmouaGVpZ2h0IHx8IGhlaWdodDtcclxuICAgIHRoaXMuYm90dG9tID0gb2JqLmJvdHRvbSB8fCAodG9wICsgKG9iai5oZWlnaHQgfHwgaGVpZ2h0KSk7XHJcbiAgICB0aGlzLndpZHRoID0gb2JqLndpZHRoIHx8IHdpZHRoO1xyXG4gICAgdGhpcy5saW5lSGVpZ2h0ID0gbGggIT09IHVuZGVmaW5lZCA/IGxoIDogb2JqLmxpbmVIZWlnaHQ7XHJcblxyXG4gICAgaWYgKGlzSUU4ICYmICF0aGlzLmxpbmVIZWlnaHQpIHtcclxuICAgICAgICB0aGlzLmxpbmVIZWlnaHQgPSAxMztcclxuICAgIH1cclxufVxyXG5cclxuLy8gTW92ZSB0aGUgYm94IGFsb25nIGEgcGFydGljdWxhciBheGlzLiBPcHRpb25hbGx5IHBhc3MgaW4gYW4gYW1vdW50IHRvIG1vdmVcclxuLy8gdGhlIGJveC4gSWYgbm8gYW1vdW50IGlzIHBhc3NlZCB0aGVuIHRoZSBkZWZhdWx0IGlzIHRoZSBsaW5lIGhlaWdodCBvZiB0aGVcclxuLy8gYm94LlxyXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKGF4aXMsIHRvTW92ZSkge1xyXG4gICAgdG9Nb3ZlID0gdG9Nb3ZlICE9PSB1bmRlZmluZWQgPyB0b01vdmUgOiB0aGlzLmxpbmVIZWlnaHQ7XHJcbiAgICBzd2l0Y2ggKGF4aXMpIHtcclxuICAgICAgICBjYXNlIFwiK3hcIjpcclxuICAgICAgICAgICAgdGhpcy5sZWZ0ICs9IHRvTW92ZTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodCArPSB0b01vdmU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCIteFwiOlxyXG4gICAgICAgICAgICB0aGlzLmxlZnQgLT0gdG9Nb3ZlO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0IC09IHRvTW92ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIit5XCI6XHJcbiAgICAgICAgICAgIHRoaXMudG9wICs9IHRvTW92ZTtcclxuICAgICAgICAgICAgdGhpcy5ib3R0b20gKz0gdG9Nb3ZlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiLXlcIjpcclxuICAgICAgICAgICAgdGhpcy50b3AgLT0gdG9Nb3ZlO1xyXG4gICAgICAgICAgICB0aGlzLmJvdHRvbSAtPSB0b01vdmU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gQ2hlY2sgaWYgdGhpcyBib3ggb3ZlcmxhcHMgYW5vdGhlciBib3gsIGIyLlxyXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUub3ZlcmxhcHMgPSBmdW5jdGlvbihiMikge1xyXG4gICAgcmV0dXJuIHRoaXMubGVmdCA8IGIyLnJpZ2h0ICYmXHJcbiAgICAgICAgdGhpcy5yaWdodCA+IGIyLmxlZnQgJiZcclxuICAgICAgICB0aGlzLnRvcCA8IGIyLmJvdHRvbSAmJlxyXG4gICAgICAgIHRoaXMuYm90dG9tID4gYjIudG9wO1xyXG59O1xyXG5cclxuLy8gQ2hlY2sgaWYgdGhpcyBib3ggb3ZlcmxhcHMgYW55IG90aGVyIGJveGVzIGluIGJveGVzLlxyXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUub3ZlcmxhcHNBbnkgPSBmdW5jdGlvbihib3hlcykge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib3hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXBzKGJveGVzW2ldKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vLyBDaGVjayBpZiB0aGlzIGJveCBpcyB3aXRoaW4gYW5vdGhlciBib3guXHJcbkJveFBvc2l0aW9uLnByb3RvdHlwZS53aXRoaW4gPSBmdW5jdGlvbihjb250YWluZXIpIHtcclxuICAgIHJldHVybiB0aGlzLnRvcCA+PSBjb250YWluZXIudG9wICYmXHJcbiAgICAgICAgdGhpcy5ib3R0b20gPD0gY29udGFpbmVyLmJvdHRvbSAmJlxyXG4gICAgICAgIHRoaXMubGVmdCA+PSBjb250YWluZXIubGVmdCAmJlxyXG4gICAgICAgIHRoaXMucmlnaHQgPD0gY29udGFpbmVyLnJpZ2h0O1xyXG59O1xyXG5cclxuLy8gQ2hlY2sgaWYgdGhpcyBib3ggaXMgZW50aXJlbHkgd2l0aGluIHRoZSBjb250YWluZXIgb3IgaXQgaXMgb3ZlcmxhcHBpbmdcclxuLy8gb24gdGhlIGVkZ2Ugb3Bwb3NpdGUgb2YgdGhlIGF4aXMgZGlyZWN0aW9uIHBhc3NlZC4gRm9yIGV4YW1wbGUsIGlmIFwiK3hcIiBpc1xyXG4vLyBwYXNzZWQgYW5kIHRoZSBib3ggaXMgb3ZlcmxhcHBpbmcgb24gdGhlIGxlZnQgZWRnZSBvZiB0aGUgY29udGFpbmVyLCB0aGVuXHJcbi8vIHJldHVybiB0cnVlLlxyXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUub3ZlcmxhcHNPcHBvc2l0ZUF4aXMgPSBmdW5jdGlvbihjb250YWluZXIsIGF4aXMpIHtcclxuICAgIHN3aXRjaCAoYXhpcykge1xyXG4gICAgICAgIGNhc2UgXCIreFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZWZ0IDwgY29udGFpbmVyLmxlZnQ7XHJcbiAgICAgICAgY2FzZSBcIi14XCI6XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJpZ2h0ID4gY29udGFpbmVyLnJpZ2h0O1xyXG4gICAgICAgIGNhc2UgXCIreVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3AgPCBjb250YWluZXIudG9wO1xyXG4gICAgICAgIGNhc2UgXCIteVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ib3R0b20gPiBjb250YWluZXIuYm90dG9tO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gRmluZCB0aGUgcGVyY2VudGFnZSBvZiB0aGUgYXJlYSB0aGF0IHRoaXMgYm94IGlzIG92ZXJsYXBwaW5nIHdpdGggYW5vdGhlclxyXG4vLyBib3guXHJcbkJveFBvc2l0aW9uLnByb3RvdHlwZS5pbnRlcnNlY3RQZXJjZW50YWdlID0gZnVuY3Rpb24oYjIpIHtcclxuICAgIHZhciB4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5yaWdodCwgYjIucmlnaHQpIC0gTWF0aC5tYXgodGhpcy5sZWZ0LCBiMi5sZWZ0KSksXHJcbiAgICAgICAgeSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuYm90dG9tLCBiMi5ib3R0b20pIC0gTWF0aC5tYXgodGhpcy50b3AsIGIyLnRvcCkpLFxyXG4gICAgICAgIGludGVyc2VjdEFyZWEgPSB4ICogeTtcclxuICAgIHJldHVybiBpbnRlcnNlY3RBcmVhIC8gKHRoaXMuaGVpZ2h0ICogdGhpcy53aWR0aCk7XHJcbn07XHJcblxyXG4vLyBDb252ZXJ0IHRoZSBwb3NpdGlvbnMgZnJvbSB0aGlzIGJveCB0byBDU1MgY29tcGF0aWJsZSBwb3NpdGlvbnMgdXNpbmdcclxuLy8gdGhlIHJlZmVyZW5jZSBjb250YWluZXIncyBwb3NpdGlvbnMuIFRoaXMgaGFzIHRvIGJlIGRvbmUgYmVjYXVzZSB0aGlzXHJcbi8vIGJveCdzIHBvc2l0aW9ucyBhcmUgaW4gcmVmZXJlbmNlIHRvIHRoZSB2aWV3cG9ydCBvcmlnaW4sIHdoZXJlYXMsIENTU1xyXG4vLyB2YWx1ZXMgYXJlIGluIHJlZmVyZWNuZSB0byB0aGVpciByZXNwZWN0aXZlIGVkZ2VzLlxyXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUudG9DU1NDb21wYXRWYWx1ZXMgPSBmdW5jdGlvbihyZWZlcmVuY2UpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9wOiB0aGlzLnRvcCAtIHJlZmVyZW5jZS50b3AsXHJcbiAgICAgICAgYm90dG9tOiByZWZlcmVuY2UuYm90dG9tIC0gdGhpcy5ib3R0b20sXHJcbiAgICAgICAgbGVmdDogdGhpcy5sZWZ0IC0gcmVmZXJlbmNlLmxlZnQsXHJcbiAgICAgICAgcmlnaHQ6IHJlZmVyZW5jZS5yaWdodCAtIHRoaXMucmlnaHQsXHJcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aFxyXG4gICAgfTtcclxufTtcclxuXHJcbi8vIEdldCBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBib3gncyBwb3NpdGlvbiB3aXRob3V0IGFueXRoaW5nIGV4dHJhLlxyXG4vLyBDYW4gcGFzcyBhIFN0eWxlQm94LCBIVE1MRWxlbWVudCwgb3IgYW5vdGhlciBCb3hQb3NpdG9uLlxyXG5Cb3hQb3NpdGlvbi5nZXRTaW1wbGVCb3hQb3NpdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgdmFyIGhlaWdodCA9IG9iai5kaXYgPyBvYmouZGl2Lm9mZnNldEhlaWdodCA6IG9iai50YWdOYW1lID8gb2JqLm9mZnNldEhlaWdodCA6IDA7XHJcbiAgICB2YXIgd2lkdGggPSBvYmouZGl2ID8gb2JqLmRpdi5vZmZzZXRXaWR0aCA6IG9iai50YWdOYW1lID8gb2JqLm9mZnNldFdpZHRoIDogMDtcclxuICAgIHZhciB0b3AgPSBvYmouZGl2ID8gb2JqLmRpdi5vZmZzZXRUb3AgOiBvYmoudGFnTmFtZSA/IG9iai5vZmZzZXRUb3AgOiAwO1xyXG5cclxuICAgIG9iaiA9IG9iai5kaXYgPyBvYmouZGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDpcclxuICAgICAgICBvYmoudGFnTmFtZSA/IG9iai5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA6IG9iajtcclxuICAgIHZhciByZXQgPSB7XHJcbiAgICAgICAgbGVmdDogb2JqLmxlZnQsXHJcbiAgICAgICAgcmlnaHQ6IG9iai5yaWdodCxcclxuICAgICAgICB0b3A6IG9iai50b3AgfHwgdG9wLFxyXG4gICAgICAgIGhlaWdodDogb2JqLmhlaWdodCB8fCBoZWlnaHQsXHJcbiAgICAgICAgYm90dG9tOiBvYmouYm90dG9tIHx8ICh0b3AgKyAob2JqLmhlaWdodCB8fCBoZWlnaHQpKSxcclxuICAgICAgICB3aWR0aDogb2JqLndpZHRoIHx8IHdpZHRoXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcbi8vIE1vdmUgYSBTdHlsZUJveCB0byBpdHMgc3BlY2lmaWVkLCBvciBuZXh0IGJlc3QsIHBvc2l0aW9uLiBUaGUgY29udGFpbmVyQm94XHJcbi8vIGlzIHRoZSBib3ggdGhhdCBjb250YWlucyB0aGUgU3R5bGVCb3gsIHN1Y2ggYXMgYSBkaXYuIGJveFBvc2l0aW9ucyBhcmVcclxuLy8gYSBsaXN0IG9mIG90aGVyIGJveGVzIHRoYXQgdGhlIHN0eWxlQm94IGNhbid0IG92ZXJsYXAgd2l0aC5cclxuZnVuY3Rpb24gbW92ZUJveFRvTGluZVBvc2l0aW9uKHdpbmRvdywgc3R5bGVCb3gsIGNvbnRhaW5lckJveCwgYm94UG9zaXRpb25zKSB7XHJcblxyXG4gICAgLy8gRmluZCB0aGUgYmVzdCBwb3NpdGlvbiBmb3IgYSBjdWUgYm94LCBiLCBvbiB0aGUgdmlkZW8uIFRoZSBheGlzIHBhcmFtZXRlclxyXG4gICAgLy8gaXMgYSBsaXN0IG9mIGF4aXMsIHRoZSBvcmRlciBvZiB3aGljaCwgaXQgd2lsbCBtb3ZlIHRoZSBib3ggYWxvbmcuIEZvciBleGFtcGxlOlxyXG4gICAgLy8gUGFzc2luZyBbXCIreFwiLCBcIi14XCJdIHdpbGwgbW92ZSB0aGUgYm94IGZpcnN0IGFsb25nIHRoZSB4IGF4aXMgaW4gdGhlIHBvc2l0aXZlXHJcbiAgICAvLyBkaXJlY3Rpb24uIElmIGl0IGRvZXNuJ3QgZmluZCBhIGdvb2QgcG9zaXRpb24gZm9yIGl0IHRoZXJlIGl0IHdpbGwgdGhlbiBtb3ZlXHJcbiAgICAvLyBpdCBhbG9uZyB0aGUgeCBheGlzIGluIHRoZSBuZWdhdGl2ZSBkaXJlY3Rpb24uXHJcbiAgICBmdW5jdGlvbiBmaW5kQmVzdFBvc2l0aW9uKGIsIGF4aXMpIHtcclxuICAgICAgICB2YXIgYmVzdFBvc2l0aW9uLFxyXG4gICAgICAgICAgICBzcGVjaWZpZWRQb3NpdGlvbiA9IG5ldyBCb3hQb3NpdGlvbihiKSxcclxuICAgICAgICAgICAgcGVyY2VudGFnZSA9IDE7IC8vIEhpZ2hlc3QgcG9zc2libGUgc28gdGhlIGZpcnN0IHRoaW5nIHdlIGdldCBpcyBiZXR0ZXIuXHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB3aGlsZSAoYi5vdmVybGFwc09wcG9zaXRlQXhpcyhjb250YWluZXJCb3gsIGF4aXNbaV0pIHx8XHJcbiAgICAgICAgICAgIChiLndpdGhpbihjb250YWluZXJCb3gpICYmIGIub3ZlcmxhcHNBbnkoYm94UG9zaXRpb25zKSkpIHtcclxuICAgICAgICAgICAgICAgIGIubW92ZShheGlzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBXZSBmb3VuZCBhIHNwb3Qgd2hlcmUgd2UgYXJlbid0IG92ZXJsYXBwaW5nIGFueXRoaW5nLiBUaGlzIGlzIG91clxyXG4gICAgICAgICAgICAvLyBiZXN0IHBvc2l0aW9uLlxyXG4gICAgICAgICAgICBpZiAoYi53aXRoaW4oY29udGFpbmVyQm94KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHAgPSBiLmludGVyc2VjdFBlcmNlbnRhZ2UoY29udGFpbmVyQm94KTtcclxuICAgICAgICAgICAgLy8gSWYgd2UncmUgb3V0c2lkZSB0aGUgY29udGFpbmVyIGJveCBsZXNzIHRoZW4gd2Ugd2VyZSBvbiBvdXIgbGFzdCB0cnlcclxuICAgICAgICAgICAgLy8gdGhlbiByZW1lbWJlciB0aGlzIHBvc2l0aW9uIGFzIHRoZSBiZXN0IHBvc2l0aW9uLlxyXG4gICAgICAgICAgICBpZiAocGVyY2VudGFnZSA+IHApIHtcclxuICAgICAgICAgICAgICAgIGJlc3RQb3NpdGlvbiA9IG5ldyBCb3hQb3NpdGlvbihiKTtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSBwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFJlc2V0IHRoZSBib3ggcG9zaXRpb24gdG8gdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cclxuICAgICAgICAgICAgYiA9IG5ldyBCb3hQb3NpdGlvbihzcGVjaWZpZWRQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiZXN0UG9zaXRpb24gfHwgc3BlY2lmaWVkUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJveFBvc2l0aW9uID0gbmV3IEJveFBvc2l0aW9uKHN0eWxlQm94KSxcclxuICAgICAgICBjdWUgPSBzdHlsZUJveC5jdWUsXHJcbiAgICAgICAgbGluZVBvcyA9IGNvbXB1dGVMaW5lUG9zKGN1ZSksXHJcbiAgICAgICAgYXhpcyA9IFtdO1xyXG5cclxuICAgIC8vIElmIHdlIGhhdmUgYSBsaW5lIG51bWJlciB0byBhbGlnbiB0aGUgY3VlIHRvLlxyXG4gICAgaWYgKGN1ZS5zbmFwVG9MaW5lcykge1xyXG4gICAgICAgIHZhciBzaXplO1xyXG4gICAgICAgIHN3aXRjaCAoY3VlLnZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJcIjpcclxuICAgICAgICAgICAgICAgIGF4aXMgPSBbIFwiK3lcIiwgXCIteVwiIF07XHJcbiAgICAgICAgICAgICAgICBzaXplID0gXCJoZWlnaHRcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicmxcIjpcclxuICAgICAgICAgICAgICAgIGF4aXMgPSBbIFwiK3hcIiwgXCIteFwiIF07XHJcbiAgICAgICAgICAgICAgICBzaXplID0gXCJ3aWR0aFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsclwiOlxyXG4gICAgICAgICAgICAgICAgYXhpcyA9IFsgXCIteFwiLCBcIit4XCIgXTtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBcIndpZHRoXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzdGVwID0gYm94UG9zaXRpb24ubGluZUhlaWdodCxcclxuICAgICAgICAgICAgcG9zaXRpb24gPSBzdGVwICogTWF0aC5yb3VuZChsaW5lUG9zKSxcclxuICAgICAgICAgICAgbWF4UG9zaXRpb24gPSBjb250YWluZXJCb3hbc2l6ZV0gKyBzdGVwLFxyXG4gICAgICAgICAgICBpbml0aWFsQXhpcyA9IGF4aXNbMF07XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBzcGVjaWZpZWQgaW50aWFsIHBvc2l0aW9uIGlzIGdyZWF0ZXIgdGhlbiB0aGUgbWF4IHBvc2l0aW9uIHRoZW5cclxuICAgICAgICAvLyBjbGFtcCB0aGUgYm94IHRvIHRoZSBhbW91bnQgb2Ygc3RlcHMgaXQgd291bGQgdGFrZSBmb3IgdGhlIGJveCB0b1xyXG4gICAgICAgIC8vIHJlYWNoIHRoZSBtYXggcG9zaXRpb24uXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHBvc2l0aW9uKSA+IG1heFBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24gPCAwID8gLTEgOiAxO1xyXG4gICAgICAgICAgICBwb3NpdGlvbiAqPSBNYXRoLmNlaWwobWF4UG9zaXRpb24gLyBzdGVwKSAqIHN0ZXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiBjb21wdXRlZCBsaW5lIHBvc2l0aW9uIHJldHVybnMgbmVnYXRpdmUgdGhlbiBsaW5lIG51bWJlcnMgYXJlXHJcbiAgICAgICAgLy8gcmVsYXRpdmUgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdmlkZW8gaW5zdGVhZCBvZiB0aGUgdG9wLiBUaGVyZWZvcmUsIHdlXHJcbiAgICAgICAgLy8gbmVlZCB0byBpbmNyZWFzZSBvdXIgaW5pdGlhbCBwb3NpdGlvbiBieSB0aGUgbGVuZ3RoIG9yIHdpZHRoIG9mIHRoZVxyXG4gICAgICAgIC8vIHZpZGVvLCBkZXBlbmRpbmcgb24gdGhlIHdyaXRpbmcgZGlyZWN0aW9uLCBhbmQgcmV2ZXJzZSBvdXIgYXhpcyBkaXJlY3Rpb25zLlxyXG4gICAgICAgIGlmIChsaW5lUG9zIDwgMCkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbiArPSBjdWUudmVydGljYWwgPT09IFwiXCIgPyBjb250YWluZXJCb3guaGVpZ2h0IDogY29udGFpbmVyQm94LndpZHRoO1xyXG4gICAgICAgICAgICBheGlzID0gYXhpcy5yZXZlcnNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNb3ZlIHRoZSBib3ggdG8gdGhlIHNwZWNpZmllZCBwb3NpdGlvbi4gVGhpcyBtYXkgbm90IGJlIGl0cyBiZXN0XHJcbiAgICAgICAgLy8gcG9zaXRpb24uXHJcbiAgICAgICAgYm94UG9zaXRpb24ubW92ZShpbml0aWFsQXhpcywgcG9zaXRpb24pO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHBlcmNlbnRhZ2UgbGluZSB2YWx1ZSBmb3IgdGhlIGN1ZS5cclxuICAgICAgICB2YXIgY2FsY3VsYXRlZFBlcmNlbnRhZ2UgPSAoYm94UG9zaXRpb24ubGluZUhlaWdodCAvIGNvbnRhaW5lckJveC5oZWlnaHQpICogMTAwO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGN1ZS5saW5lQWxpZ24pIHtcclxuICAgICAgICAgICAgY2FzZSBcIm1pZGRsZVwiOlxyXG4gICAgICAgICAgICAgICAgbGluZVBvcyAtPSAoY2FsY3VsYXRlZFBlcmNlbnRhZ2UgLyAyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZW5kXCI6XHJcbiAgICAgICAgICAgICAgICBsaW5lUG9zIC09IGNhbGN1bGF0ZWRQZXJjZW50YWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBcHBseSBpbml0aWFsIGxpbmUgcG9zaXRpb24gdG8gdGhlIGN1ZSBib3guXHJcbiAgICAgICAgc3dpdGNoIChjdWUudmVydGljYWwpIHtcclxuICAgICAgICAgICAgY2FzZSBcIlwiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVCb3guYXBwbHlTdHlsZXMoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogc3R5bGVCb3guZm9ybWF0U3R5bGUobGluZVBvcywgXCIlXCIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicmxcIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlQm94LmFwcGx5U3R5bGVzKHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBzdHlsZUJveC5mb3JtYXRTdHlsZShsaW5lUG9zLCBcIiVcIilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsclwiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVCb3guYXBwbHlTdHlsZXMoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBzdHlsZUJveC5mb3JtYXRTdHlsZShsaW5lUG9zLCBcIiVcIilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBheGlzID0gWyBcIit5XCIsIFwiLXhcIiwgXCIreFwiLCBcIi15XCIgXTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBib3ggcG9zaXRpb24gYWdhaW4gYWZ0ZXIgd2UndmUgYXBwbGllZCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uaW5nXHJcbiAgICAgICAgLy8gdG8gaXQuXHJcbiAgICAgICAgYm94UG9zaXRpb24gPSBuZXcgQm94UG9zaXRpb24oc3R5bGVCb3gpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBiZXN0UG9zaXRpb24gPSBmaW5kQmVzdFBvc2l0aW9uKGJveFBvc2l0aW9uLCBheGlzKTtcclxuICAgIHN0eWxlQm94Lm1vdmUoYmVzdFBvc2l0aW9uLnRvQ1NTQ29tcGF0VmFsdWVzKGNvbnRhaW5lckJveCkpO1xyXG59XHJcblxyXG4vKmZ1bmN0aW9uIFdlYlZUVCgpIHtcclxuIC8vIE5vdGhpbmdcclxuIH0qL1xyXG5cclxuLy8gSGVscGVyIHRvIGFsbG93IHN0cmluZ3MgdG8gYmUgZGVjb2RlZCBpbnN0ZWFkIG9mIHRoZSBkZWZhdWx0IGJpbmFyeSB1dGY4IGRhdGEuXHJcbldlYlZUVC5TdHJpbmdEZWNvZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRlY29kZTogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgLSBleHBlY3RlZCBzdHJpbmcgZGF0YS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVVUklDb21wb25lbnQoZGF0YSkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5XZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSA9IGZ1bmN0aW9uKHdpbmRvdywgY3VldGV4dCkge1xyXG4gICAgaWYgKCF3aW5kb3cgfHwgIWN1ZXRleHQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJzZUNvbnRlbnQod2luZG93LCBjdWV0ZXh0KTtcclxufTtcclxuXHJcbnZhciBGT05UX1NJWkVfUEVSQ0VOVCA9IDAuMDU7XHJcbnZhciBGT05UX1NUWUxFID0gXCJzYW5zLXNlcmlmXCI7XHJcbnZhciBDVUVfQkFDS0dST1VORF9QQURESU5HID0gXCIxLjUlXCI7XHJcblxyXG4vLyBSdW5zIHRoZSBwcm9jZXNzaW5nIG1vZGVsIG92ZXIgdGhlIGN1ZXMgYW5kIHJlZ2lvbnMgcGFzc2VkIHRvIGl0LlxyXG4vLyBAcGFyYW0gb3ZlcmxheSBBIGJsb2NrIGxldmVsIGVsZW1lbnQgKHVzdWFsbHkgYSBkaXYpIHRoYXQgdGhlIGNvbXB1dGVkIGN1ZXNcclxuLy8gICAgICAgICAgICAgICAgYW5kIHJlZ2lvbnMgd2lsbCBiZSBwbGFjZWQgaW50by5cclxuV2ViVlRULnByb2Nlc3NDdWVzID0gZnVuY3Rpb24od2luZG93LCBjdWVzLCBvdmVybGF5KSB7XHJcbiAgICBpZiAoIXdpbmRvdyB8fCAhY3VlcyB8fCAhb3ZlcmxheSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSBhbGwgcHJldmlvdXMgY2hpbGRyZW4uXHJcbiAgICB3aGlsZSAob3ZlcmxheS5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgb3ZlcmxheS5yZW1vdmVDaGlsZChvdmVybGF5LmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwYWRkZWRPdmVybGF5ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBwYWRkZWRPdmVybGF5LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS5sZWZ0ID0gXCIwXCI7XHJcbiAgICBwYWRkZWRPdmVybGF5LnN0eWxlLnJpZ2h0ID0gXCIwXCI7XHJcbiAgICBwYWRkZWRPdmVybGF5LnN0eWxlLnRvcCA9IFwiMFwiO1xyXG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS5ib3R0b20gPSBcIjBcIjtcclxuICAgIHBhZGRlZE92ZXJsYXkuc3R5bGUubWFyZ2luID0gQ1VFX0JBQ0tHUk9VTkRfUEFERElORztcclxuICAgIG92ZXJsYXkuYXBwZW5kQ2hpbGQocGFkZGVkT3ZlcmxheSk7XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHdlIG5lZWQgdG8gY29tcHV0ZSB0aGUgZGlzcGxheSBzdGF0ZXMgb2YgdGhlIGN1ZXMuIFRoaXMgY291bGRcclxuICAgIC8vIGJlIHRoZSBjYXNlIGlmIGEgY3VlJ3Mgc3RhdGUgaGFzIGJlZW4gY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBjb21wdXRhdGlvbiBvclxyXG4gICAgLy8gaWYgaXQgaGFzIG5vdCBiZWVuIGNvbXB1dGVkIHlldC5cclxuICAgIGZ1bmN0aW9uIHNob3VsZENvbXB1dGUoY3Vlcykge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3Vlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY3Vlc1tpXS5oYXNCZWVuUmVzZXQgfHwgIWN1ZXNbaV0uZGlzcGxheVN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2UgZG9uJ3QgbmVlZCB0byByZWNvbXB1dGUgdGhlIGN1ZXMnIGRpc3BsYXkgc3RhdGVzLiBKdXN0IHJldXNlIHRoZW0uXHJcbiAgICBpZiAoIXNob3VsZENvbXB1dGUoY3VlcykpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcGFkZGVkT3ZlcmxheS5hcHBlbmRDaGlsZChjdWVzW2ldLmRpc3BsYXlTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm94UG9zaXRpb25zID0gW10sXHJcbiAgICAgICAgY29udGFpbmVyQm94ID0gQm94UG9zaXRpb24uZ2V0U2ltcGxlQm94UG9zaXRpb24ocGFkZGVkT3ZlcmxheSksXHJcbiAgICAgICAgZm9udFNpemUgPSBNYXRoLnJvdW5kKGNvbnRhaW5lckJveC5oZWlnaHQgKiBGT05UX1NJWkVfUEVSQ0VOVCAqIDEwMCkgLyAxMDA7XHJcbiAgICB2YXIgc3R5bGVPcHRpb25zID0ge1xyXG4gICAgICAgIGZvbnQ6IChmb250U2l6ZSAqIGZvbnRTY2FsZSkgKyBcInB4IFwiICsgRk9OVF9TVFlMRVxyXG4gICAgfTtcclxuXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHN0eWxlQm94LCBjdWU7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3Vlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjdWUgPSBjdWVzW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gQ29tcHV0ZSB0aGUgaW50aWFsIHBvc2l0aW9uIGFuZCBzdHlsZXMgb2YgdGhlIGN1ZSBkaXYuXHJcbiAgICAgICAgICAgIHN0eWxlQm94ID0gbmV3IEN1ZVN0eWxlQm94KHdpbmRvdywgY3VlLCBzdHlsZU9wdGlvbnMpO1xyXG4gICAgICAgICAgICBwYWRkZWRPdmVybGF5LmFwcGVuZENoaWxkKHN0eWxlQm94LmRpdik7XHJcblxyXG4gICAgICAgICAgICAvLyBNb3ZlIHRoZSBjdWUgZGl2IHRvIGl0J3MgY29ycmVjdCBsaW5lIHBvc2l0aW9uLlxyXG4gICAgICAgICAgICBtb3ZlQm94VG9MaW5lUG9zaXRpb24od2luZG93LCBzdHlsZUJveCwgY29udGFpbmVyQm94LCBib3hQb3NpdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhlIGNvbXB1dGVkIGRpdiBzbyB0aGF0IHdlIGRvbid0IGhhdmUgdG8gcmVjb21wdXRlIGl0IGxhdGVyXHJcbiAgICAgICAgICAgIC8vIGlmIHdlIGRvbid0IGhhdmUgdG9vLlxyXG4gICAgICAgICAgICBjdWUuZGlzcGxheVN0YXRlID0gc3R5bGVCb3guZGl2O1xyXG5cclxuICAgICAgICAgICAgYm94UG9zaXRpb25zLnB1c2goQm94UG9zaXRpb24uZ2V0U2ltcGxlQm94UG9zaXRpb24oc3R5bGVCb3gpKTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG59O1xyXG5cclxuV2ViVlRULlBhcnNlciA9IGZ1bmN0aW9uKHdpbmRvdywgZGVjb2Rlcikge1xyXG4gICAgdGhpcy53aW5kb3cgPSB3aW5kb3c7XHJcbiAgICB0aGlzLnN0YXRlID0gXCJJTklUSUFMXCI7XHJcbiAgICB0aGlzLmJ1ZmZlciA9IFwiXCI7XHJcbiAgICB0aGlzLmRlY29kZXIgPSBkZWNvZGVyIHx8IG5ldyBUZXh0RGVjb2RlcihcInV0ZjhcIik7XHJcbiAgICB0aGlzLnJlZ2lvbkxpc3QgPSBbXTtcclxufTtcclxuXHJcbldlYlZUVC5QYXJzZXIucHJvdG90eXBlID0ge1xyXG4gICAgLy8gSWYgdGhlIGVycm9yIGlzIGEgUGFyc2luZ0Vycm9yIHRoZW4gcmVwb3J0IGl0IHRvIHRoZSBjb25zdW1lciBpZlxyXG4gICAgLy8gcG9zc2libGUuIElmIGl0J3Mgbm90IGEgUGFyc2luZ0Vycm9yIHRoZW4gdGhyb3cgaXQgbGlrZSBub3JtYWwuXHJcbiAgICByZXBvcnRPclRocm93RXJyb3I6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFBhcnNpbmdFcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLm9ucGFyc2luZ2Vycm9yICYmIHRoaXMub25wYXJzaW5nZXJyb3IoZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChkYXRhLCBmbHVzaGluZykge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBkYXRhIHRoZW4gd2Ugd29uJ3QgZGVjb2RlIGl0LCBidXQgd2lsbCBqdXN0IHRyeSB0byBwYXJzZVxyXG4gICAgICAgIC8vIHdoYXRldmVyIGlzIGluIGJ1ZmZlciBhbHJlYWR5LiBUaGlzIG1heSBvY2N1ciBpbiBjaXJjdW1zdGFuY2VzLCBmb3JcclxuICAgICAgICAvLyBleGFtcGxlIHdoZW4gZmx1c2goKSBpcyBjYWxsZWQuXHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gVHJ5IHRvIGRlY29kZSB0aGUgZGF0YSB0aGF0IHdlIHJlY2VpdmVkLlxyXG4gICAgICAgICAgICBzZWxmLmJ1ZmZlciArPSBzZWxmLmRlY29kZXIuZGVjb2RlKGRhdGEsIHtzdHJlYW06IHRydWV9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY29sbGVjdE5leHRMaW5lKCkge1xyXG4gICAgICAgICAgICB2YXIgYnVmZmVyID0gc2VsZi5idWZmZXI7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAocG9zIDwgYnVmZmVyLmxlbmd0aCAmJiBidWZmZXJbcG9zXSAhPT0gJ1xccicgJiYgYnVmZmVyW3Bvc10gIT09ICdcXG4nKSB7XHJcbiAgICAgICAgICAgICAgICArK3BvcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbGluZSA9IGJ1ZmZlci5zdWJzdHIoMCwgcG9zKTtcclxuICAgICAgICAgICAgLy8gQWR2YW5jZSB0aGUgYnVmZmVyIGVhcmx5IGluIGNhc2Ugd2UgZmFpbCBiZWxvdy5cclxuICAgICAgICAgICAgaWYgKGJ1ZmZlcltwb3NdID09PSAnXFxyJykge1xyXG4gICAgICAgICAgICAgICAgKytwb3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJ1ZmZlcltwb3NdID09PSAnXFxuJykge1xyXG4gICAgICAgICAgICAgICAgKytwb3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5idWZmZXIgPSBidWZmZXIuc3Vic3RyKHBvcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBsaW5lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMy40IFdlYlZUVCByZWdpb24gYW5kIFdlYlZUVCByZWdpb24gc2V0dGluZ3Mgc3ludGF4XHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VSZWdpb24oaW5wdXQpIHtcclxuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gbmV3IFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgICAgICBwYXJzZU9wdGlvbnMoaW5wdXQsIGZ1bmN0aW9uIChrLCB2KSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGspIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Muc2V0KGssIHYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2lkdGhcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MucGVyY2VudChrLCB2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxpbmVzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmludGVnZXIoaywgdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZWdpb25hbmNob3JcIjpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidmlld3BvcnRhbmNob3JcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHh5ID0gdi5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeHkubGVuZ3RoICE9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHRvIG1ha2Ugc3VyZSBib3RoIHggYW5kIHkgcGFyc2UsIHNvIHVzZSBhIHRlbXBvcmFyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXR0aW5ncyBvYmplY3QgaGVyZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFuY2hvciA9IG5ldyBTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmNob3IucGVyY2VudChcInhcIiwgeHlbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmNob3IucGVyY2VudChcInlcIiwgeHlbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFuY2hvci5oYXMoXCJ4XCIpIHx8ICFhbmNob3IuaGFzKFwieVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Muc2V0KGsgKyBcIlhcIiwgYW5jaG9yLmdldChcInhcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5zZXQoayArIFwiWVwiLCBhbmNob3IuZ2V0KFwieVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzY3JvbGxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KGssIHYsIFtcInVwXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIC89LywgL1xccy8pO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSByZWdpb24sIHVzaW5nIGRlZmF1bHQgdmFsdWVzIGZvciBhbnkgdmFsdWVzIHRoYXQgd2VyZSBub3RcclxuICAgICAgICAgICAgLy8gc3BlY2lmaWVkLlxyXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuaGFzKFwiaWRcIikpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWdpb24gPSBuZXcgc2VsZi53aW5kb3cuVlRUUmVnaW9uKCk7XHJcbiAgICAgICAgICAgICAgICByZWdpb24ud2lkdGggPSBzZXR0aW5ncy5nZXQoXCJ3aWR0aFwiLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgcmVnaW9uLmxpbmVzID0gc2V0dGluZ3MuZ2V0KFwibGluZXNcIiwgMyk7XHJcbiAgICAgICAgICAgICAgICByZWdpb24ucmVnaW9uQW5jaG9yWCA9IHNldHRpbmdzLmdldChcInJlZ2lvbmFuY2hvclhcIiwgMCk7XHJcbiAgICAgICAgICAgICAgICByZWdpb24ucmVnaW9uQW5jaG9yWSA9IHNldHRpbmdzLmdldChcInJlZ2lvbmFuY2hvcllcIiwgMTAwKTtcclxuICAgICAgICAgICAgICAgIHJlZ2lvbi52aWV3cG9ydEFuY2hvclggPSBzZXR0aW5ncy5nZXQoXCJ2aWV3cG9ydGFuY2hvclhcIiwgMCk7XHJcbiAgICAgICAgICAgICAgICByZWdpb24udmlld3BvcnRBbmNob3JZID0gc2V0dGluZ3MuZ2V0KFwidmlld3BvcnRhbmNob3JZXCIsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICByZWdpb24uc2Nyb2xsID0gc2V0dGluZ3MuZ2V0KFwic2Nyb2xsXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIHJlZ2lvbi5cclxuICAgICAgICAgICAgICAgIHNlbGYub25yZWdpb24gJiYgc2VsZi5vbnJlZ2lvbihyZWdpb24pO1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhlIFZUVFJlZ2lvbiBmb3IgbGF0ZXIgaW4gY2FzZSB3ZSBwYXJzZSBhbnkgVlRUQ3VlcyB0aGF0XHJcbiAgICAgICAgICAgICAgICAvLyByZWZlcmVuY2UgaXQuXHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlZ2lvbkxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHNldHRpbmdzLmdldChcImlkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbjogcmVnaW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMy4yIFdlYlZUVCBtZXRhZGF0YSBoZWFkZXIgc3ludGF4XHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VIZWFkZXIoaW5wdXQpIHtcclxuICAgICAgICAgICAgcGFyc2VPcHRpb25zKGlucHV0LCBmdW5jdGlvbiAoaywgdikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlJlZ2lvblwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAzLjMgV2ViVlRUIHJlZ2lvbiBtZXRhZGF0YSBoZWFkZXIgc3ludGF4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlUmVnaW9uKHYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgLzovKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDUuMSBXZWJWVFQgZmlsZSBwYXJzaW5nLlxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gXCJJTklUSUFMXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIGNhbid0IHN0YXJ0IHBhcnNpbmcgdW50aWwgd2UgaGF2ZSB0aGUgZmlyc3QgbGluZS5cclxuICAgICAgICAgICAgICAgIGlmICghL1xcclxcbnxcXG4vLnRlc3Qoc2VsZi5idWZmZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGluZSA9IGNvbGxlY3ROZXh0TGluZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtID0gbGluZS5tYXRjaCgvXldFQlZUVChbIFxcdF0uKik/JC8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtIHx8ICFtWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNpbmdFcnJvcihQYXJzaW5nRXJyb3IuRXJyb3JzLkJhZFNpZ25hdHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiSEVBREVSXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhbHJlYWR5Q29sbGVjdGVkTGluZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB3aGlsZSAoc2VsZi5idWZmZXIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIGNhbid0IHBhcnNlIGEgbGluZSB1bnRpbCB3ZSBoYXZlIHRoZSBmdWxsIGxpbmUuXHJcbiAgICAgICAgICAgICAgICBpZiAoIS9cXHJcXG58XFxuLy50ZXN0KHNlbGYuYnVmZmVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghYWxyZWFkeUNvbGxlY3RlZExpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gY29sbGVjdE5leHRMaW5lKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlDb2xsZWN0ZWRMaW5lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNlbGYuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiSEVBREVSXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDEzLTE4IC0gQWxsb3cgYSBoZWFkZXIgKG1ldGFkYXRhKSB1bmRlciB0aGUgV0VCVlRUIGxpbmUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvOi8udGVzdChsaW5lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VIZWFkZXIobGluZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFuIGVtcHR5IGxpbmUgdGVybWluYXRlcyB0aGUgaGVhZGVyIGFuZCBzdGFydHMgdGhlIGJvZHkgKGN1ZXMpLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiSURcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiTk9URVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgTk9URSBibG9ja3MuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiSURcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiSURcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIHRoZSBzdGFydCBvZiBOT1RFIGJsb2Nrcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9eTk9URSgkfFsgXFx0XSkvLnRlc3QobGluZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIk5PVEVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDE5LTI5IC0gQWxsb3cgYW55IG51bWJlciBvZiBsaW5lIHRlcm1pbmF0b3JzLCB0aGVuIGluaXRpYWxpemUgbmV3IGN1ZSB2YWx1ZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdWUgPSBuZXcgc2VsZi53aW5kb3cuVlRUQ3VlKDAsIDAsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJDVUVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMzAtMzkgLSBDaGVjayBpZiBzZWxmIGxpbmUgY29udGFpbnMgYW4gb3B0aW9uYWwgaWRlbnRpZmllciBvciB0aW1pbmcgZGF0YS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmUuaW5kZXhPZihcIi0tPlwiKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VlLmlkID0gbGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvY2VzcyBsaW5lIGFzIHN0YXJ0IG9mIGEgY3VlLlxyXG4gICAgICAgICAgICAgICAgICAgIC8qZmFsbHMgdGhyb3VnaCovXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkNVRVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA0MCAtIENvbGxlY3QgY3VlIHRpbWluZ3MgYW5kIHNldHRpbmdzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VDdWUobGluZSwgc2VsZi5jdWUsIHNlbGYucmVnaW9uTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVwb3J0T3JUaHJvd0Vycm9yKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW4gY2FzZSBvZiBhbiBlcnJvciBpZ25vcmUgcmVzdCBvZiB0aGUgY3VlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiQkFEQ1VFXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJDVUVURVhUXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJDVUVURVhUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoYXNTdWJzdHJpbmcgPSBsaW5lLmluZGV4T2YoXCItLT5cIikgIT09IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAzNCAtIElmIHdlIGhhdmUgYW4gZW1wdHkgbGluZSB0aGVuIHJlcG9ydCB0aGUgY3VlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAzNSAtIElmIHdlIGhhdmUgdGhlIHNwZWNpYWwgc3Vic3RyaW5nICctLT4nIHRoZW4gcmVwb3J0IHRoZSBjdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJ1dCBkbyBub3QgY29sbGVjdCB0aGUgbGluZSBhcyB3ZSBuZWVkIHRvIHByb2Nlc3MgdGhlIGN1cnJlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25lIGFzIGEgbmV3IGN1ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5lIHx8IGhhc1N1YnN0cmluZyAmJiAoYWxyZWFkeUNvbGxlY3RlZExpbmUgPSB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgYXJlIGRvbmUgcGFyc2luZyBzZWxmIGN1ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25jdWUgJiYgc2VsZi5vbmN1ZShzZWxmLmN1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJJRFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuY3VlLnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VlLnRleHQgKz0gXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1ZS50ZXh0ICs9IGxpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJCQURDVUVcIjogLy8gQkFEQ1VFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDU0LTYyIC0gQ29sbGVjdCBhbmQgZGlzY2FyZCB0aGUgcmVtYWluaW5nIGN1ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJJRFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCFmbHVzaGluZykge1xyXG4gICAgICAgICAgICAgICAgLy/rlYzrlYzroZwgKO2VnOq4hyB2dHTroZwg7LaU7KCVKSBjdWXqsIAg64Ko7JWEIOyeiOuKlOyxhOuhnCBzZWxmLmZsdXNoKCnrpbwg7Zi47Lac7ZW07IScIGN1ZeqwgCDsnojquLAg65WM66y47JeQIOuLpOyLnCBzZWxmLnBhcnNlKCnrpbwg7YOA64qUIOqyveyasOqwgCDsg53quYAuXHJcbiAgICAgICAgICAgICAgICAvL+yZnCDsnbTroIfqsowg7Kec7JesIOyeiOuKlOyngCDrqqjrpbTqsqDqs6Ag7J2864uoIOyVhOuemOyZgCDqsJnsnYAg7L2U65Oc66GcIOychOq4sOulvCDqt7nrs7XtlZzri6QuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gXCJDVUVURVhUXCIgJiYgc2VsZi5jdWUgJiYgc2VsZi5vbmN1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYub25jdWUoc2VsZi5jdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5mbHVzaCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHNlbGYucmVwb3J0T3JUaHJvd0Vycm9yKGUpO1xyXG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgY3VycmVudGx5IHBhcnNpbmcgYSBjdWUsIHJlcG9ydCB3aGF0IHdlIGhhdmUuXHJcbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXRlID09PSBcIkNVRVRFWFRcIiAmJiBzZWxmLmN1ZSAmJiBzZWxmLm9uY3VlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uY3VlKHNlbGYuY3VlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmN1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vIEVudGVyIEJBRFdFQlZUVCBzdGF0ZSBpZiBoZWFkZXIgd2FzIG5vdCBwYXJzZWQgY29ycmVjdGx5IG90aGVyd2lzZVxyXG4gICAgICAgICAgICAvLyBhbm90aGVyIGV4Y2VwdGlvbiBvY2N1cnJlZCBzbyBlbnRlciBCQURDVUUgc3RhdGUuXHJcbiAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBzZWxmLnN0YXRlID09PSBcIklOSVRJQUxcIiA/IFwiQkFEV0VCVlRUXCIgOiBcIkJBRENVRVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBmbHVzaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gRmluaXNoIGRlY29kaW5nIHRoZSBzdHJlYW0uXHJcbiAgICAgICAgICAgIHNlbGYuYnVmZmVyICs9IHNlbGYuZGVjb2Rlci5kZWNvZGUoKTtcclxuICAgICAgICAgICAgLy8gU3ludGhlc2l6ZSB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IGN1ZSBvciByZWdpb24uXHJcbiAgICAgICAgICAgIGlmIChzZWxmLmN1ZSB8fCBzZWxmLnN0YXRlID09PSBcIkhFQURFUlwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmJ1ZmZlciArPSBcIlxcblxcblwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wYXJzZShudWxsLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJZiB3ZSd2ZSBmbHVzaGVkLCBwYXJzZWQsIGFuZCB3ZSdyZSBzdGlsbCBvbiB0aGUgSU5JVElBTCBzdGF0ZSB0aGVuXHJcbiAgICAgICAgICAgIC8vIHRoYXQgbWVhbnMgd2UgZG9uJ3QgaGF2ZSBlbm91Z2ggb2YgdGhlIHN0cmVhbSB0byBwYXJzZSB0aGUgZmlyc3RcclxuICAgICAgICAgICAgLy8gbGluZS5cclxuICAgICAgICAgICAgaWYgKHNlbGYuc3RhdGUgPT09IFwiSU5JVElBTFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2luZ0Vycm9yKFBhcnNpbmdFcnJvci5FcnJvcnMuQmFkU2lnbmF0dXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICBzZWxmLnJlcG9ydE9yVGhyb3dFcnJvcihlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5vbmZsdXNoICYmIHNlbGYub25mbHVzaCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2ViVlRUOyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxMyB2dHQuanMgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5sZXQgVlRUUmVnaW9uID0gXCJcIjtcclxuXHJcbnZhciBzY3JvbGxTZXR0aW5nID0ge1xyXG4gICAgXCJcIjogdHJ1ZSxcclxuICAgIFwidXBcIjogdHJ1ZVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZmluZFNjcm9sbFNldHRpbmcodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgc2Nyb2xsID0gc2Nyb2xsU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcclxuICAgIHJldHVybiBzY3JvbGwgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgKHZhbHVlID49IDAgJiYgdmFsdWUgPD0gMTAwKTtcclxufVxyXG5cclxuLy8gVlRUUmVnaW9uIHNoaW0gaHR0cDovL2Rldi53My5vcmcvaHRtbDUvd2VidnR0LyN2dHRyZWdpb24taW50ZXJmYWNlXHJcblZUVFJlZ2lvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIF93aWR0aCA9IDEwMDtcclxuICAgIHZhciBfbGluZXMgPSAzO1xyXG4gICAgdmFyIF9yZWdpb25BbmNob3JYID0gMDtcclxuICAgIHZhciBfcmVnaW9uQW5jaG9yWSA9IDEwMDtcclxuICAgIHZhciBfdmlld3BvcnRBbmNob3JYID0gMDtcclxuICAgIHZhciBfdmlld3BvcnRBbmNob3JZID0gMTAwO1xyXG4gICAgdmFyIF9zY3JvbGwgPSBcIlwiO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcclxuICAgICAgICBcIndpZHRoXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfd2lkdGg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZFBlcmNlbnRWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXaWR0aCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF93aWR0aCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImxpbmVzXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfbGluZXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTGluZXMgbXVzdCBiZSBzZXQgdG8gYSBudW1iZXIuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX2xpbmVzID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicmVnaW9uQW5jaG9yWVwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2lvbkFuY2hvclk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZFBlcmNlbnRWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWdpb25BbmNob3JYIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3JlZ2lvbkFuY2hvclkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJyZWdpb25BbmNob3JYXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfcmVnaW9uQW5jaG9yWDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVnaW9uQW5jaG9yWSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9yZWdpb25BbmNob3JYID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidmlld3BvcnRBbmNob3JZXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdmlld3BvcnRBbmNob3JZO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVmlld3BvcnRBbmNob3JZIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3ZpZXdwb3J0QW5jaG9yWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInZpZXdwb3J0QW5jaG9yWFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZpZXdwb3J0QW5jaG9yWDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkUGVyY2VudFZhbHVlKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlZpZXdwb3J0QW5jaG9yWCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF92aWV3cG9ydEFuY2hvclggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzY3JvbGxcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zY3JvbGw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZFNjcm9sbFNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gSGF2ZSB0byBjaGVjayBmb3IgZmFsc2UgYXMgYW4gZW1wdHkgc3RyaW5nIGlzIGEgbGVnYWwgdmFsdWUuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3Njcm9sbCA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVlRUUmVnaW9uOyJdLCJzb3VyY2VSb290IjoiIn0=