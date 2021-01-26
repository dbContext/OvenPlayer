/*! ovenplayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (MIT) | Github : https://ovenplayer.com */
(window["webpackJsonpOvenPlayer"] = window["webpackJsonpOvenPlayer"] || []).push([["smiparser"],{

/***/ "./src/js/api/caption/parser/SmiParser.js":
/*!************************************************!*\
  !*** ./src/js/api/caption/parser/SmiParser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

/*
 *  sami-parser
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2013 Constantine Kim <elegantcoder@gmail.com>
 *  https://github.com/elegantcoder/sami-parser
 *
 */

var langCodes = ["ab", "aa", "af", "ak", "sq", "am", "ar", "an", "hy", "as", "av", "ae", "ay", "az", "bm", "ba", "eu", "be", "bn", "bh", "bi", "nb", "bs", "br", "bg", "my", "es", "ca", "km", "ch", "ce", "ny", "ny", "zh", "za", "cu", "cu", "cv", "kw", "co", "cr", "hr", "cs", "da", "dv", "dv", "nl", "dz", "en", "eo", "et", "ee", "fo", "fj", "fi", "nl", "fr", "ff", "gd", "gl", "lg", "ka", "de", "ki", "el", "kl", "gn", "gu", "ht", "ht", "ha", "he", "hz", "hi", "ho", "hu", "is", "io", "ig", "id", "ia", "ie", "iu", "ik", "ga", "it", "ja", "jv", "kl", "kn", "kr", "ks", "kk", "ki", "rw", "ky", "kv", "kg", "ko", "kj", "ku", "kj", "ky", "lo", "la", "lv", "lb", "li", "li", "li", "ln", "lt", "lu", "lb", "mk", "mg", "ms", "ml", "dv", "mt", "gv", "mi", "mr", "mh", "ro", "ro", "mn", "na", "nv", "nv", "nd", "nr", "ng", "ne", "nd", "se", "no", "nb", "nn", "ii", "ny", "nn", "ie", "oc", "oj", "cu", "cu", "cu", "or", "om", "os", "os", "pi", "pa", "ps", "fa", "pl", "pt", "pa", "ps", "qu", "ro", "rm", "rn", "ru", "sm", "sg", "sa", "sc", "gd", "sr", "sn", "ii", "sd", "si", "si", "sk", "sl", "so", "st", "nr", "es", "su", "sw", "ss", "sv", "tl", "ty", "tg", "ta", "tt", "te", "th", "bo", "ti", "to", "ts", "tn", "tr", "tk", "tw", "ug", "uk", "ur", "ug", "uz", "ca", "ve", "vi", "vo", "wa", "cy", "fy", "wo", "xh", "yi", "yo", "za", "zu"];

var reOpenSync = /<sync/i;

var reCloseSync = /<sync|<\/body|<\/sami/i;

var reLineEnding = /\r\n?|\n/g;

var reBrokenTag = /<[a-z]*[^>]*<[a-z]*/g;

var reStartTime = /<sync[^>]+?start[^=]*=[^0-9]*([0-9]*)["^0-9"]*/i;

var reBr = /<br[^>]*>/ig;

var reStyle = /<style[^>]*>([\s\S]*?)<\/style[^>]*>/i;

var reComment = /(<!--|-->)/g;

var clone = function clone(obj) {
    var flags, key, newInstance;
    if (obj == null || (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object') {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (obj instanceof RegExp) {
        flags = '';
        if (obj.global != null) {
            flags += 'g';
        }
        if (obj.ignoreCase != null) {
            flags += 'i';
        }
        if (obj.multiline != null) {
            flags += 'm';
        }
        if (obj.sticky != null) {
            flags += 'y';
        }
        return new RegExp(obj.source, flags);
    }
    newInstance = new obj.constructor();
    for (key in obj) {
        newInstance[key] = clone(obj[key]);
    }
    return newInstance;
};

var strip_tags = function strip_tags(input, allowed) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Luke Godfrey
    // +      input by: Pul
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Alex
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Marc Palau
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Eric Nagel
    // +      input by: Bobby Drake
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Tomasz Wesolowski
    // +      input by: Evertjan Garretsen
    // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
    // *     returns 2: '<p>Kevin van Zonneveld</p>'
    // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
    // *     example 4: strip_tags('1 < 5 5 > 1');
    // *     returns 4: '1 < 5 5 > 1'
    // *     example 5: strip_tags('1 <br/> 1');
    // *     returns 5: '1  1'
    // *     example 6: strip_tags('1 <br/> 1', '<br>');
    // *     returns 6: '1  1'
    // *     example 7: strip_tags('1 <br/> 1', '<br><br/>');
    // *     returns 7: '1 <br/> 1'
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};

var _sort = function _sort(langItem) {
    return langItem.sort(function (a, b) {
        var res;
        if ((res = a.start - b.start) === 0) {
            return a.end - b.end;
        } else {
            return res;
        }
    });
};

var _mergeMultiLanguages = function _mergeMultiLanguages(arr) {
    var content, dict, i, idx, key, lang, ret, val, _i, _len, _ref;
    dict = {};
    i = arr.length;
    ret = [];
    for (i = _i = 0, _len = arr.length; _i < _len; i = ++_i) {
        val = arr[i];
        key = val.startTime + ',' + val.endTime;
        if ((idx = dict[key]) !== void 0) {
            _ref = val.languages;
            for (lang in _ref) {
                content = _ref[lang];
                ret[idx].languages[lang] = content;
            }
        } else {
            ret.push(val);
            dict[key] = ret.length - 1;
        }
    }
    return ret;
};

var SmiParser = function SmiParser(sami, options) {
    var definedLangs, duration, errors, getDefinedLangs, getLanguage, key, makeEndTime, parse, result, value, _ref, fixedLang;
    parse = function parse() {
        var element, error, innerText, isBroken, item, lang, langItem, lineNum, nextStartTagIdx, ret, startTagIdx, startTime, str, tempRet, _ref, _ref1, _ref2;
        error = function error(_error2) {
            var e;
            e = new Error(_error2);
            e.line = lineNum;
            e.context = element;
            return errors.push(e);
        };
        lineNum = 1;
        ret = [];
        tempRet = {};
        str = sami;
        while (true) {
            startTagIdx = str.search();
            if (nextStartTagIdx <= 0 || startTagIdx < 0) {
                break;
            }
            nextStartTagIdx = str.slice(startTagIdx + 1).search(reCloseSync) + 1;
            if (nextStartTagIdx > 0) {
                element = str.slice(startTagIdx, startTagIdx + nextStartTagIdx);
            } else {
                element = str.slice(startTagIdx);
            }
            lineNum += ((_ref = str.slice(0, startTagIdx).match(reLineEnding)) != null ? _ref.length : void 0) || 0;
            if (isBroken = reBrokenTag.test(element)) {
                error('ERROR_BROKEN_TAGS');
            }
            str = str.slice(startTagIdx + nextStartTagIdx);
            startTime = +((_ref1 = element.match(reStartTime)) != null ? parseFloat(_ref1[1] / 1000) : void 0); //HSLEE ms -> s 로 변경
            if (startTime === null || startTime < 0) {
                error('ERROR_INVALID_TIME');
            }

            // We don't need complex language. cus SMI doens't obey the rules...
            lang = getLanguage(element);
            //lang = "ko";
            if (!lang) {
                // continue;
                error('ERROR_INVALID_LANGUAGE');
            }
            lineNum += ((_ref2 = element.match(reLineEnding)) != null ? _ref2.length : void 0) || 0;
            element = element.replace(reLineEnding, '');
            element = element.replace(reBr, "\n");
            innerText = strip_tags(element).trim();

            //HSLEE : 20180530 - 우린 랭기지 구분이 필요 없다. 있는거 그대로 보여줄뿐
            item = {
                start: startTime,
                //languages: {},
                text: "",
                contents: innerText
            };
            if (lang) {
                //item.languages[lang] = innerText;
                item.text = innerText;
            }
            tempRet[lang] || (tempRet[lang] = []);
            //tempRet[lang].push(item);
            if (item.start) {
                tempRet[lang].push(item);
            }
        }

        //fixed by hslee 190130
        //SMI was designed for multi language. But global standard (my guess) SRT, VTT doesn't support multi language.
        //This update is handling if SMI has multiple languages.
        fixedLang = fixedLang || (0, _browser.getBrowserLanguage)();
        var convertedLanguageNames = Object.keys(tempRet);

        if (convertedLanguageNames && convertedLanguageNames.length > 0) {
            if (convertedLanguageNames.indexOf(fixedLang) > -1) {
                langItem = tempRet[fixedLang];
            } else {
                langItem = tempRet[convertedLanguageNames.filter(function (name) {
                    return name !== "undefined";
                })[0]];
            }
            langItem = _sort(langItem);
            langItem = makeEndTime(langItem);
            ret = ret.concat(langItem);
        }

        //ret = _mergeMultiLanguages(ret);
        ret = _sort(ret);
        return ret;
    };
    getLanguage = function getLanguage(element) {
        var className, lang;
        if (!element) {
            return;
        }
        for (className in definedLangs) {
            lang = definedLangs[className];
            if (lang.reClassName.test(element)) {
                return lang.lang;
            }
        }
    };
    getDefinedLangs = function getDefinedLangs() {
        var className, declaration, e, error, lang, matched, parsed, rule, selector, _i, _len, _ref, _ref1, _results;
        try {
            matched = ((_ref = sami.match(reStyle)) != null ? _ref[1] : void 0) || '';
            matched = matched.replace(reComment, '');
            parsed = cssParse(matched);
            _ref1 = parsed.stylesheet.rules;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                rule = _ref1[_i];
                selector = rule.selectors[0];
                if ((selector != null ? selector[0] : void 0) === '.') {
                    _results.push(function () {
                        var _j, _len1, _ref2, _results1;
                        _ref2 = rule.declarations;
                        _results1 = [];
                        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                            declaration = _ref2[_j];
                            if (declaration.property.toLowerCase() === 'lang') {
                                className = selector.slice(1);
                                lang = declaration.value.slice(0, 2);
                                if (~langCodes.indexOf(lang)) {
                                    _results1.push(definedLangs[className] = {
                                        lang: lang,
                                        reClassName: new RegExp("class[^=]*?=[\"'\S]*(" + className + ")['\"\S]?", 'i')
                                    });
                                } else {
                                    throw Error();
                                }
                            } else {
                                _results1.push(void 0);
                            }
                        }
                        return _results1;
                    }());
                } else {
                    _results.push(void 0);
                }
            }
            return _results;
        } catch (_error) {
            e = _error;
            errors.push(error = new Error('ERROR_INVALID_LANGUAGE_DEFINITION'));
        }
    };
    makeEndTime = function makeEndTime(langItem) {
        var i, item, _ref;
        i = langItem.length;
        while (i--) {
            item = langItem[i];
            if ((_ref = langItem[i - 1]) != null) {
                //HSLEE : 이왕이면 SRT 파서와 포맷을 맞추자
                _ref.end = item.start;
            }
            if (!item.contents || item.contents === '&nbsp;') {
                langItem.splice(i, 1);
            } else {
                delete langItem[i].contents;
                if (!item.end) {
                    item.end = item.start + duration;
                }
            }
        }
        return langItem;
    };
    errors = [];
    definedLangs = {
        KRCC: {
            lang: 'ko',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(KRCC)['\"\S]?", 'i')
        },
        KOCC: {
            lang: 'ko',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(KOCC)['\"\S]?", 'i')
        },
        KR: {
            lang: 'ko',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(KR)['\"\S]?", 'i')
        },
        ENCC: {
            lang: 'en',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(ENCC)['\"\S]?", 'i')
        },
        EGCC: {
            lang: 'en',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(EGCC)['\"\S]?", 'i')
        },
        EN: {
            lang: 'en',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(EN)['\"\S]?", 'i')
        },
        JPCC: {
            lang: 'ja',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(JPCC)['\"\S]?", 'i')
        }
    };
    if (options != null ? options.definedLangs : void 0) {
        _ref = options.definedLangs;
        for (key in _ref) {
            value = _ref[key];
            definedLangs[key] = value;
        }
    }
    duration = (options != null ? options.duration : void 0) || 10; //HSLEE ms -> s 로 변경
    fixedLang = options.fixedLang;
    sami = sami.trim();
    //getDefinedLangs();
    result = parse();
    return {
        result: result,
        errors: errors
    };
};

exports["default"] = SmiParser;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PdmVuUGxheWVyLy4vc3JjL2pzL2FwaS9jYXB0aW9uL3BhcnNlci9TbWlQYXJzZXIuanMiXSwibmFtZXMiOlsibGFuZ0NvZGVzIiwicmVPcGVuU3luYyIsInJlQ2xvc2VTeW5jIiwicmVMaW5lRW5kaW5nIiwicmVCcm9rZW5UYWciLCJyZVN0YXJ0VGltZSIsInJlQnIiLCJyZVN0eWxlIiwicmVDb21tZW50IiwiY2xvbmUiLCJvYmoiLCJmbGFncyIsImtleSIsIm5ld0luc3RhbmNlIiwiRGF0ZSIsImdldFRpbWUiLCJSZWdFeHAiLCJnbG9iYWwiLCJpZ25vcmVDYXNlIiwibXVsdGlsaW5lIiwic3RpY2t5Iiwic291cmNlIiwiY29uc3RydWN0b3IiLCJzdHJpcF90YWdzIiwiaW5wdXQiLCJhbGxvd2VkIiwidG9Mb3dlckNhc2UiLCJtYXRjaCIsImpvaW4iLCJ0YWdzIiwiY29tbWVudHNBbmRQaHBUYWdzIiwicmVwbGFjZSIsIiQwIiwiJDEiLCJpbmRleE9mIiwiX3NvcnQiLCJsYW5nSXRlbSIsInNvcnQiLCJhIiwiYiIsInJlcyIsInN0YXJ0IiwiZW5kIiwiX21lcmdlTXVsdGlMYW5ndWFnZXMiLCJhcnIiLCJjb250ZW50IiwiZGljdCIsImkiLCJpZHgiLCJsYW5nIiwicmV0IiwidmFsIiwiX2kiLCJfbGVuIiwiX3JlZiIsImxlbmd0aCIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJsYW5ndWFnZXMiLCJwdXNoIiwiU21pUGFyc2VyIiwic2FtaSIsIm9wdGlvbnMiLCJkZWZpbmVkTGFuZ3MiLCJkdXJhdGlvbiIsImVycm9ycyIsImdldERlZmluZWRMYW5ncyIsImdldExhbmd1YWdlIiwibWFrZUVuZFRpbWUiLCJwYXJzZSIsInJlc3VsdCIsInZhbHVlIiwiZml4ZWRMYW5nIiwiZWxlbWVudCIsImVycm9yIiwiaW5uZXJUZXh0IiwiaXNCcm9rZW4iLCJpdGVtIiwibGluZU51bSIsIm5leHRTdGFydFRhZ0lkeCIsInN0YXJ0VGFnSWR4Iiwic3RyIiwidGVtcFJldCIsIl9yZWYxIiwiX3JlZjIiLCJlIiwiRXJyb3IiLCJsaW5lIiwiY29udGV4dCIsInNlYXJjaCIsInNsaWNlIiwidGVzdCIsInBhcnNlRmxvYXQiLCJ0cmltIiwidGV4dCIsImNvbnRlbnRzIiwiY29udmVydGVkTGFuZ3VhZ2VOYW1lcyIsIk9iamVjdCIsImtleXMiLCJmaWx0ZXIiLCJuYW1lIiwiY29uY2F0IiwiY2xhc3NOYW1lIiwicmVDbGFzc05hbWUiLCJkZWNsYXJhdGlvbiIsIm1hdGNoZWQiLCJwYXJzZWQiLCJydWxlIiwic2VsZWN0b3IiLCJfcmVzdWx0cyIsImNzc1BhcnNlIiwic3R5bGVzaGVldCIsInJ1bGVzIiwic2VsZWN0b3JzIiwiX2oiLCJfbGVuMSIsIl9yZXN1bHRzMSIsImRlY2xhcmF0aW9ucyIsInByb3BlcnR5IiwiX2Vycm9yIiwic3BsaWNlIiwiS1JDQyIsIktPQ0MiLCJLUiIsIkVOQ0MiLCJFR0NDIiwiRU4iLCJKUENDIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7OztBQVNBLElBQU1BLFlBQVksQ0FBQyxJQUFELEVBQU0sSUFBTixFQUFXLElBQVgsRUFBaUIsSUFBakIsRUFBdUIsSUFBdkIsRUFBNkIsSUFBN0IsRUFBbUMsSUFBbkMsRUFBeUMsSUFBekMsRUFBK0MsSUFBL0MsRUFBcUQsSUFBckQsRUFBMkQsSUFBM0QsRUFBaUUsSUFBakUsRUFBdUUsSUFBdkUsRUFBNkUsSUFBN0UsRUFBbUYsSUFBbkYsRUFBeUYsSUFBekYsRUFBK0YsSUFBL0YsRUFBcUcsSUFBckcsRUFBMkcsSUFBM0csRUFBaUgsSUFBakgsRUFBdUgsSUFBdkgsRUFBNkgsSUFBN0gsRUFBa0ksSUFBbEksRUFBdUksSUFBdkksRUFBNEksSUFBNUksRUFBaUosSUFBakosRUFBc0osSUFBdEosRUFBMkosSUFBM0osRUFBZ0ssSUFBaEssRUFBcUssSUFBckssRUFBMEssSUFBMUssRUFBK0ssSUFBL0ssRUFBb0wsSUFBcEwsRUFBeUwsSUFBekws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LEVBQWlELEdBQWpEO0FBRlg7QUF6QkssS0FBZjtBQThCQSxRQUFJOEMsV0FBVyxJQUFYLEdBQWtCQSxRQUFRQyxZQUExQixHQUF5QyxLQUFLLENBQWxELEVBQXFEO0FBQ2pEVCxlQUFPUSxRQUFRQyxZQUFmO0FBQ0EsYUFBS25ELEdBQUwsSUFBWTBDLElBQVosRUFBa0I7QUFDZGlCLG9CQUFRakIsS0FBSzFDLEdBQUwsQ0FBUjtBQUNBbUQseUJBQWFuRCxHQUFiLElBQW9CMkQsS0FBcEI7QUFDSDtBQUNKO0FBQ0RQLGVBQVcsQ0FBQ0YsV0FBVyxJQUFYLEdBQWtCQSxRQUFRRSxRQUExQixHQUFxQyxLQUFLLENBQTNDLEtBQWlELEVBQTVELENBek1zQyxDQXlNMEI7QUFDaEVRLGdCQUFZVixRQUFRVSxTQUFwQjtBQUNBWCxXQUFPQSxLQUFLZ0MsSUFBTCxFQUFQO0FBQ0E7QUFDQXZCLGFBQVNELE9BQVQ7QUFDQSxXQUFPO0FBQ0hDLGdCQUFRQSxNQURMO0FBRUhMLGdCQUFRQTtBQUZMLEtBQVA7QUFJSCxDQWxORDs7cUJBcU5lTCxTIiwiZmlsZSI6InNtaXBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2V0QnJvd3Nlckxhbmd1YWdlfSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xyXG4vKlxyXG4gKiAgc2FtaS1wYXJzZXJcclxuICogIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxyXG4gKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDEzIENvbnN0YW50aW5lIEtpbSA8ZWxlZ2FudGNvZGVyQGdtYWlsLmNvbT5cclxuICogIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVnYW50Y29kZXIvc2FtaS1wYXJzZXJcclxuICpcclxuICovXHJcblxyXG5jb25zdCBsYW5nQ29kZXMgPSBbXCJhYlwiLFwiYWFcIixcImFmXCIsIFwiYWtcIiwgXCJzcVwiLCBcImFtXCIsIFwiYXJcIiwgXCJhblwiLCBcImh5XCIsIFwiYXNcIiwgXCJhdlwiLCBcImFlXCIsIFwiYXlcIiwgXCJhelwiLCBcImJtXCIsIFwiYmFcIiwgXCJldVwiLCBcImJlXCIsIFwiYm5cIiwgXCJiaFwiLCBcImJpXCIsIFwibmJcIixcImJzXCIsXCJiclwiLFwiYmdcIixcIm15XCIsXCJlc1wiLFwiY2FcIixcImttXCIsXCJjaFwiLFwiY2VcIixcIm55XCIsXCJueVwiLFwiemhcIixcInphXCIsXCJjdVwiLFwiY3VcIixcImN2XCIsXCJrd1wiLFxyXG4gICAgXCJjb1wiLFwiY3JcIixcImhyXCIsXCJjc1wiLFwiZGFcIixcImR2XCIsXCJkdlwiLFwibmxcIixcImR6XCIsXCJlblwiLFwiZW9cIixcImV0XCIsXCJlZVwiLFwiZm9cIixcImZqXCIsXCJmaVwiLFwibmxcIixcImZyXCIsXCJmZlwiLFwiZ2RcIixcImdsXCIsXCJsZ1wiLFwia2FcIixcImRlXCIsXCJraVwiLFwiZWxcIixcImtsXCIsXCJnblwiLFwiZ3VcIixcImh0XCIsXCJodFwiLFwiaGFcIixcImhlXCIsXCJoelwiLFwiaGlcIixcImhvXCIsXCJodVwiLFwiaXNcIixcImlvXCIsXCJpZ1wiLFwiaWRcIixcImlhXCIsXCJpZVwiLFwiaXVcIixcImlrXCIsXCJnYVwiLFxyXG4gICAgXCJpdFwiLFwiamFcIixcImp2XCIsXCJrbFwiLFwia25cIixcImtyXCIsXCJrc1wiLFwia2tcIixcImtpXCIsXCJyd1wiLFwia3lcIixcImt2XCIsXCJrZ1wiLFwia29cIixcImtqXCIsXCJrdVwiLFwia2pcIixcImt5XCIsXCJsb1wiLFwibGFcIixcImx2XCIsXCJsYlwiLFwibGlcIixcImxpXCIsXCJsaVwiLFwibG5cIixcImx0XCIsXCJsdVwiLFwibGJcIixcIm1rXCIsXCJtZ1wiLFwibXNcIixcIm1sXCIsXCJkdlwiLFwibXRcIixcImd2XCIsXCJtaVwiLFwibXJcIixcIm1oXCIsXCJyb1wiLFwicm9cIixcIm1uXCIsXCJuYVwiLFwibnZcIixcIm52XCIsXCJuZFwiLFxyXG4gICAgXCJuclwiLFwibmdcIixcIm5lXCIsXCJuZFwiLFwic2VcIixcIm5vXCIsXCJuYlwiLFwibm5cIixcImlpXCIsXCJueVwiLFwibm5cIixcImllXCIsXCJvY1wiLFwib2pcIixcImN1XCIsXCJjdVwiLFwiY3VcIixcIm9yXCIsXCJvbVwiLFwib3NcIixcIm9zXCIsXCJwaVwiLFwicGFcIixcInBzXCIsXCJmYVwiLFwicGxcIixcInB0XCIsXCJwYVwiLFwicHNcIixcInF1XCIsXCJyb1wiLFwicm1cIixcInJuXCIsXCJydVwiLFwic21cIixcInNnXCIsXCJzYVwiLFwic2NcIixcImdkXCIsXCJzclwiLFwic25cIixcImlpXCIsXCJzZFwiLFwic2lcIixcInNpXCIsXCJza1wiLFxyXG4gICAgXCJzbFwiLFwic29cIixcInN0XCIsXCJuclwiLFwiZXNcIixcInN1XCIsXCJzd1wiLFwic3NcIixcInN2XCIsXCJ0bFwiLFwidHlcIixcInRnXCIsXCJ0YVwiLFwidHRcIixcInRlXCIsXCJ0aFwiLFwiYm9cIixcInRpXCIsXCJ0b1wiLFwidHNcIixcInRuXCIsXCJ0clwiLFwidGtcIixcInR3XCIsXCJ1Z1wiLFwidWtcIixcInVyXCIsXCJ1Z1wiLFwidXpcIixcImNhXCIsXCJ2ZVwiLFwidmlcIixcInZvXCIsXCJ3YVwiLFwiY3lcIixcImZ5XCIsXCJ3b1wiLFwieGhcIixcInlpXCIsXCJ5b1wiLFwiemFcIixcInp1XCJdO1xyXG5cclxuY29uc3QgcmVPcGVuU3luYyA9IC88c3luYy9pO1xyXG5cclxuY29uc3QgcmVDbG9zZVN5bmMgPSAvPHN5bmN8PFxcL2JvZHl8PFxcL3NhbWkvaTtcclxuXHJcbmNvbnN0IHJlTGluZUVuZGluZyA9IC9cXHJcXG4/fFxcbi9nO1xyXG5cclxuY29uc3QgcmVCcm9rZW5UYWcgPSAvPFthLXpdKltePl0qPFthLXpdKi9nO1xyXG5cclxuY29uc3QgcmVTdGFydFRpbWUgPSAvPHN5bmNbXj5dKz9zdGFydFtePV0qPVteMC05XSooWzAtOV0qKVtcIl4wLTlcIl0qL2k7XHJcblxyXG5jb25zdCByZUJyID0gLzxicltePl0qPi9pZztcclxuXHJcbmNvbnN0IHJlU3R5bGUgPSAvPHN0eWxlW14+XSo+KFtcXHNcXFNdKj8pPFxcL3N0eWxlW14+XSo+L2k7XHJcblxyXG5jb25zdCByZUNvbW1lbnQgPSAvKDwhLS18LS0+KS9nO1xyXG5cclxuY29uc3QgY2xvbmUgPSBmdW5jdGlvbihvYmopIHtcclxuICAgIHZhciBmbGFncywga2V5LCBuZXdJbnN0YW5jZTtcclxuICAgIGlmICgob2JqID09IG51bGwpIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKG9iai5nZXRUaW1lKCkpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xyXG4gICAgICAgIGZsYWdzID0gJyc7XHJcbiAgICAgICAgaWYgKG9iai5nbG9iYWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmbGFncyArPSAnZyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmouaWdub3JlQ2FzZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZsYWdzICs9ICdpJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9iai5tdWx0aWxpbmUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmbGFncyArPSAnbSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmouc3RpY2t5ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZmxhZ3MgKz0gJ3knO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChvYmouc291cmNlLCBmbGFncyk7XHJcbiAgICB9XHJcbiAgICBuZXdJbnN0YW5jZSA9IG5ldyBvYmouY29uc3RydWN0b3IoKTtcclxuICAgIGZvciAoa2V5IGluIG9iaikge1xyXG4gICAgICAgIG5ld0luc3RhbmNlW2tleV0gPSBjbG9uZShvYmpba2V5XSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3SW5zdGFuY2U7XHJcbn07XHJcblxyXG5jb25zdCBzdHJpcF90YWdzID0gZnVuY3Rpb24gKGlucHV0LCBhbGxvd2VkKSB7XHJcbiAgICAvLyBodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldFxyXG4gICAgLy8gKyAgIG9yaWdpbmFsIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICBpbXByb3ZlZCBieTogTHVrZSBHb2RmcmV5XHJcbiAgICAvLyArICAgICAgaW5wdXQgYnk6IFB1bFxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogT25ubyBNYXJzbWFuXHJcbiAgICAvLyArICAgICAgaW5wdXQgYnk6IEFsZXhcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgICAgaW5wdXQgYnk6IE1hcmMgUGFsYXVcclxuICAgIC8vICsgICBpbXByb3ZlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgICAgaW5wdXQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBFcmljIE5hZ2VsXHJcbiAgICAvLyArICAgICAgaW5wdXQgYnk6IEJvYmJ5IERyYWtlXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBUb21hc3ogV2Vzb2xvd3NraVxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBFdmVydGphbiBHYXJyZXRzZW5cclxuICAgIC8vICsgICAgcmV2aXNlZCBieTogUmFmYcWCIEt1a2F3c2tpIChodHRwOi8vYmxvZy5rdWthd3NraS5wbC8pXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDE6IHN0cmlwX3RhZ3MoJzxwPktldmluPC9wPiA8YnIgLz48Yj52YW48L2I+IDxpPlpvbm5ldmVsZDwvaT4nLCAnPGk+PGI+Jyk7XHJcbiAgICAvLyAqICAgICByZXR1cm5zIDE6ICdLZXZpbiA8Yj52YW48L2I+IDxpPlpvbm5ldmVsZDwvaT4nXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDI6IHN0cmlwX3RhZ3MoJzxwPktldmluIDxpbWcgc3JjPVwic29tZWltYWdlLnBuZ1wiIG9ubW91c2VvdmVyPVwic29tZUZ1bmN0aW9uKClcIj52YW4gPGk+Wm9ubmV2ZWxkPC9pPjwvcD4nLCAnPHA+Jyk7XHJcbiAgICAvLyAqICAgICByZXR1cm5zIDI6ICc8cD5LZXZpbiB2YW4gWm9ubmV2ZWxkPC9wPidcclxuICAgIC8vICogICAgIGV4YW1wbGUgMzogc3RyaXBfdGFncyhcIjxhIGhyZWY9J2h0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0Jz5LZXZpbiB2YW4gWm9ubmV2ZWxkPC9hPlwiLCBcIjxhPlwiKTtcclxuICAgIC8vICogICAgIHJldHVybnMgMzogJzxhIGhyZWY9J2h0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0Jz5LZXZpbiB2YW4gWm9ubmV2ZWxkPC9hPidcclxuICAgIC8vICogICAgIGV4YW1wbGUgNDogc3RyaXBfdGFncygnMSA8IDUgNSA+IDEnKTtcclxuICAgIC8vICogICAgIHJldHVybnMgNDogJzEgPCA1IDUgPiAxJ1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSA1OiBzdHJpcF90YWdzKCcxIDxici8+IDEnKTtcclxuICAgIC8vICogICAgIHJldHVybnMgNTogJzEgIDEnXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDY6IHN0cmlwX3RhZ3MoJzEgPGJyLz4gMScsICc8YnI+Jyk7XHJcbiAgICAvLyAqICAgICByZXR1cm5zIDY6ICcxICAxJ1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSA3OiBzdHJpcF90YWdzKCcxIDxici8+IDEnLCAnPGJyPjxici8+Jyk7XHJcbiAgICAvLyAqICAgICByZXR1cm5zIDc6ICcxIDxici8+IDEnXHJcbiAgICBhbGxvd2VkID0gKCgoYWxsb3dlZCB8fCBcIlwiKSArIFwiXCIpLnRvTG93ZXJDYXNlKCkubWF0Y2goLzxbYS16XVthLXowLTldKj4vZykgfHwgW10pLmpvaW4oJycpOyAvLyBtYWtpbmcgc3VyZSB0aGUgYWxsb3dlZCBhcmcgaXMgYSBzdHJpbmcgY29udGFpbmluZyBvbmx5IHRhZ3MgaW4gbG93ZXJjYXNlICg8YT48Yj48Yz4pXHJcbiAgICB2YXIgdGFncyA9IC88XFwvPyhbYS16XVthLXowLTldKilcXGJbXj5dKj4vZ2ksXHJcbiAgICAgICAgY29tbWVudHNBbmRQaHBUYWdzID0gLzwhLS1bXFxzXFxTXSo/LS0+fDxcXD8oPzpwaHApP1tcXHNcXFNdKj9cXD8+L2dpO1xyXG4gICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoY29tbWVudHNBbmRQaHBUYWdzLCAnJykucmVwbGFjZSh0YWdzLCBmdW5jdGlvbigkMCwgJDEpIHtcclxuICAgICAgICByZXR1cm4gYWxsb3dlZC5pbmRleE9mKCc8JyArICQxLnRvTG93ZXJDYXNlKCkgKyAnPicpID4gLTEgPyAkMCA6ICcnO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBfc29ydCA9IGZ1bmN0aW9uKGxhbmdJdGVtKSB7XHJcbiAgICByZXR1cm4gbGFuZ0l0ZW0uc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgdmFyIHJlcztcclxuICAgICAgICBpZiAoKHJlcyA9IGEuc3RhcnQgLSBiLnN0YXJ0KSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5lbmQgLSBiLmVuZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3QgX21lcmdlTXVsdGlMYW5ndWFnZXMgPSBmdW5jdGlvbihhcnIpIHtcclxuICAgIHZhciBjb250ZW50LCBkaWN0LCBpLCBpZHgsIGtleSwgbGFuZywgcmV0LCB2YWwsIF9pLCBfbGVuLCBfcmVmO1xyXG4gICAgZGljdCA9IHt9O1xyXG4gICAgaSA9IGFyci5sZW5ndGg7XHJcbiAgICByZXQgPSBbXTtcclxuICAgIGZvciAoaSA9IF9pID0gMCwgX2xlbiA9IGFyci5sZW5ndGg7IF9pIDwgX2xlbjsgaSA9ICsrX2kpIHtcclxuICAgICAgICB2YWwgPSBhcnJbaV07XHJcbiAgICAgICAga2V5ID0gdmFsLnN0YXJ0VGltZSArICcsJyArIHZhbC5lbmRUaW1lO1xyXG4gICAgICAgIGlmICgoaWR4ID0gZGljdFtrZXldKSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgIF9yZWYgPSB2YWwubGFuZ3VhZ2VzO1xyXG4gICAgICAgICAgICBmb3IgKGxhbmcgaW4gX3JlZikge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IF9yZWZbbGFuZ107XHJcbiAgICAgICAgICAgICAgICByZXRbaWR4XS5sYW5ndWFnZXNbbGFuZ10gPSBjb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0LnB1c2godmFsKTtcclxuICAgICAgICAgICAgZGljdFtrZXldID0gcmV0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcbmNvbnN0IFNtaVBhcnNlciA9IGZ1bmN0aW9uKHNhbWksIG9wdGlvbnMpIHtcclxuICAgIHZhciBkZWZpbmVkTGFuZ3MsIGR1cmF0aW9uLCBlcnJvcnMsIGdldERlZmluZWRMYW5ncywgZ2V0TGFuZ3VhZ2UsIGtleSwgbWFrZUVuZFRpbWUsIHBhcnNlLCByZXN1bHQsIHZhbHVlLCBfcmVmLCBmaXhlZExhbmc7XHJcbiAgICBwYXJzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50LCBlcnJvciwgaW5uZXJUZXh0LCBpc0Jyb2tlbiwgaXRlbSwgbGFuZywgbGFuZ0l0ZW0sIGxpbmVOdW0sIG5leHRTdGFydFRhZ0lkeCwgcmV0LCBzdGFydFRhZ0lkeCwgc3RhcnRUaW1lLCBzdHIsIHRlbXBSZXQsIF9yZWYsIF9yZWYxLCBfcmVmMjtcclxuICAgICAgICBlcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZhciBlO1xyXG4gICAgICAgICAgICBlID0gbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgZS5saW5lID0gbGluZU51bTtcclxuICAgICAgICAgICAgZS5jb250ZXh0ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgcmV0dXJuIGVycm9ycy5wdXNoKGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGluZU51bSA9IDE7XHJcbiAgICAgICAgcmV0ID0gW107XHJcbiAgICAgICAgdGVtcFJldCA9IHt9O1xyXG4gICAgICAgIHN0ciA9IHNhbWk7XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgc3RhcnRUYWdJZHggPSBzdHIuc2VhcmNoKCk7XHJcbiAgICAgICAgICAgIGlmIChuZXh0U3RhcnRUYWdJZHggPD0gMCB8fCBzdGFydFRhZ0lkeCA8IDApIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5leHRTdGFydFRhZ0lkeCA9IHN0ci5zbGljZShzdGFydFRhZ0lkeCArIDEpLnNlYXJjaChyZUNsb3NlU3luYykgKyAxO1xyXG4gICAgICAgICAgICBpZiAobmV4dFN0YXJ0VGFnSWR4ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHN0ci5zbGljZShzdGFydFRhZ0lkeCwgc3RhcnRUYWdJZHggKyBuZXh0U3RhcnRUYWdJZHgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHN0ci5zbGljZShzdGFydFRhZ0lkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGluZU51bSArPSAoKF9yZWYgPSBzdHIuc2xpY2UoMCwgc3RhcnRUYWdJZHgpLm1hdGNoKHJlTGluZUVuZGluZykpICE9IG51bGwgPyBfcmVmLmxlbmd0aCA6IHZvaWQgMCkgfHwgMDtcclxuICAgICAgICAgICAgaWYgKGlzQnJva2VuID0gcmVCcm9rZW5UYWcudGVzdChlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IoJ0VSUk9SX0JST0tFTl9UQUdTJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4ICsgbmV4dFN0YXJ0VGFnSWR4KTtcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gKygoX3JlZjEgPSBlbGVtZW50Lm1hdGNoKHJlU3RhcnRUaW1lKSkgIT0gbnVsbCA/IHBhcnNlRmxvYXQoX3JlZjFbMV0vMTAwMCkgOiB2b2lkIDApOyAgLy9IU0xFRSBtcyAtPiBzIOuhnCDrs4Dqsr1cclxuICAgICAgICAgICAgaWYgKHN0YXJ0VGltZSA9PT0gbnVsbCB8fCBzdGFydFRpbWUgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcignRVJST1JfSU5WQUxJRF9USU1FJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgY29tcGxleCBsYW5ndWFnZS4gY3VzIFNNSSBkb2Vucyd0IG9iZXkgdGhlIHJ1bGVzLi4uXHJcbiAgICAgICAgICAgIGxhbmcgPSBnZXRMYW5ndWFnZShlbGVtZW50KTtcclxuICAgICAgICAgICAgLy9sYW5nID0gXCJrb1wiO1xyXG4gICAgICAgICAgICBpZiAoIWxhbmcpIHtcclxuICAgICAgICAgICAgICAgLy8gY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBlcnJvcignRVJST1JfSU5WQUxJRF9MQU5HVUFHRScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpbmVOdW0gKz0gKChfcmVmMiA9IGVsZW1lbnQubWF0Y2gocmVMaW5lRW5kaW5nKSkgIT0gbnVsbCA/IF9yZWYyLmxlbmd0aCA6IHZvaWQgMCkgfHwgMDtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucmVwbGFjZShyZUxpbmVFbmRpbmcsICcnKTtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucmVwbGFjZShyZUJyLCBcIlxcblwiKTtcclxuICAgICAgICAgICAgaW5uZXJUZXh0ID0gc3RyaXBfdGFncyhlbGVtZW50KS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICAvL0hTTEVFIDogMjAxODA1MzAgLSDsmrDrprAg656t6riw7KeAIOq1rOu2hOydtCDtlYTsmpQg7JeG64ukLiDsnojripTqsbAg6re464yA66GcIOuztOyXrOykhOu/kFxyXG4gICAgICAgICAgICBpdGVtID0ge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0VGltZSxcclxuICAgICAgICAgICAgICAgIC8vbGFuZ3VhZ2VzOiB7fSxcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50czogaW5uZXJUZXh0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChsYW5nKSB7XHJcbiAgICAgICAgICAgICAgICAvL2l0ZW0ubGFuZ3VhZ2VzW2xhbmddID0gaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICAgICAgaXRlbS50ZXh0ID0gaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRlbXBSZXRbbGFuZ10gfHwgKHRlbXBSZXRbbGFuZ10gPSBbXSk7XHJcbiAgICAgICAgICAgIC8vdGVtcFJldFtsYW5nXS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICBpZihpdGVtLnN0YXJ0KXtcclxuICAgICAgICAgICAgICAgIHRlbXBSZXRbbGFuZ10ucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZml4ZWQgYnkgaHNsZWUgMTkwMTMwXHJcbiAgICAgICAgLy9TTUkgd2FzIGRlc2lnbmVkIGZvciBtdWx0aSBsYW5ndWFnZS4gQnV0IGdsb2JhbCBzdGFuZGFyZCAobXkgZ3Vlc3MpIFNSVCwgVlRUIGRvZXNuJ3Qgc3VwcG9ydCBtdWx0aSBsYW5ndWFnZS5cclxuICAgICAgICAvL1RoaXMgdXBkYXRlIGlzIGhhbmRsaW5nIGlmIFNNSSBoYXMgbXVsdGlwbGUgbGFuZ3VhZ2VzLlxyXG4gICAgICAgIGZpeGVkTGFuZyA9IGZpeGVkTGFuZyB8fCBnZXRCcm93c2VyTGFuZ3VhZ2UoKTtcclxuICAgICAgICBsZXQgY29udmVydGVkTGFuZ3VhZ2VOYW1lcyA9IE9iamVjdC5rZXlzKHRlbXBSZXQpO1xyXG5cclxuICAgICAgICBpZihjb252ZXJ0ZWRMYW5ndWFnZU5hbWVzICYmIGNvbnZlcnRlZExhbmd1YWdlTmFtZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGlmKGNvbnZlcnRlZExhbmd1YWdlTmFtZXMuaW5kZXhPZihmaXhlZExhbmcpID4gLTEpe1xyXG4gICAgICAgICAgICAgICAgbGFuZ0l0ZW0gPSB0ZW1wUmV0W2ZpeGVkTGFuZ107XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGFuZ0l0ZW0gPSB0ZW1wUmV0W2NvbnZlcnRlZExhbmd1YWdlTmFtZXMuZmlsdGVyKGZ1bmN0aW9uKG5hbWUpe3JldHVybiBuYW1lICE9PSBcInVuZGVmaW5lZFwifSlbMF1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxhbmdJdGVtID0gX3NvcnQobGFuZ0l0ZW0pO1xyXG4gICAgICAgICAgICBsYW5nSXRlbSA9IG1ha2VFbmRUaW1lKGxhbmdJdGVtKTtcclxuICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChsYW5nSXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JldCA9IF9tZXJnZU11bHRpTGFuZ3VhZ2VzKHJldCk7XHJcbiAgICAgICAgcmV0ID0gX3NvcnQocmV0KTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfTtcclxuICAgIGdldExhbmd1YWdlID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBjbGFzc05hbWUsIGxhbmc7XHJcbiAgICAgICAgaWYoIWVsZW1lbnQpe3JldHVybiA7fVxyXG4gICAgICAgIGZvciAoY2xhc3NOYW1lIGluIGRlZmluZWRMYW5ncykge1xyXG4gICAgICAgICAgICBsYW5nID0gZGVmaW5lZExhbmdzW2NsYXNzTmFtZV07XHJcbiAgICAgICAgICAgIGlmIChsYW5nLnJlQ2xhc3NOYW1lLnRlc3QoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsYW5nLmxhbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZ2V0RGVmaW5lZExhbmdzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSwgZGVjbGFyYXRpb24sIGUsIGVycm9yLCBsYW5nLCBtYXRjaGVkLCBwYXJzZWQsIHJ1bGUsIHNlbGVjdG9yLCBfaSwgX2xlbiwgX3JlZiwgX3JlZjEsIF9yZXN1bHRzO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG1hdGNoZWQgPSAoKF9yZWYgPSBzYW1pLm1hdGNoKHJlU3R5bGUpKSAhPSBudWxsID8gX3JlZlsxXSA6IHZvaWQgMCkgfHwgJyc7XHJcbiAgICAgICAgICAgIG1hdGNoZWQgPSBtYXRjaGVkLnJlcGxhY2UocmVDb21tZW50LCAnJyk7XHJcbiAgICAgICAgICAgIHBhcnNlZCA9IGNzc1BhcnNlKG1hdGNoZWQpO1xyXG4gICAgICAgICAgICBfcmVmMSA9IHBhcnNlZC5zdHlsZXNoZWV0LnJ1bGVzO1xyXG4gICAgICAgICAgICBfcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBydWxlID0gX3JlZjFbX2ldO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBydWxlLnNlbGVjdG9yc1swXTtcclxuICAgICAgICAgICAgICAgIGlmICgoc2VsZWN0b3IgIT0gbnVsbCA/IHNlbGVjdG9yWzBdIDogdm9pZCAwKSA9PT0gJy4nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCgoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfaiwgX2xlbjEsIF9yZWYyLCBfcmVzdWx0czE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWYyID0gcnVsZS5kZWNsYXJhdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzMSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uID0gX3JlZjJbX2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlY2xhcmF0aW9uLnByb3BlcnR5LnRvTG93ZXJDYXNlKCkgPT09ICdsYW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IHNlbGVjdG9yLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmcgPSBkZWNsYXJhdGlvbi52YWx1ZS5zbGljZSgwLCAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAofmxhbmdDb2Rlcy5pbmRleE9mKGxhbmcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzMS5wdXNoKGRlZmluZWRMYW5nc1tjbGFzc05hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZzogbGFuZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooXCIgKyBjbGFzc05hbWUgKyBcIilbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0czEucHVzaCh2b2lkIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVzdWx0czE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godm9pZCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XHJcbiAgICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7XHJcbiAgICAgICAgICAgIGUgPSBfZXJyb3I7XHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycm9yID0gbmV3IEVycm9yKCdFUlJPUl9JTlZBTElEX0xBTkdVQUdFX0RFRklOSVRJT04nKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIG1ha2VFbmRUaW1lID0gZnVuY3Rpb24obGFuZ0l0ZW0pIHtcclxuICAgICAgICB2YXIgaSwgaXRlbSwgX3JlZjtcclxuICAgICAgICBpID0gbGFuZ0l0ZW0ubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgaXRlbSA9IGxhbmdJdGVtW2ldO1xyXG4gICAgICAgICAgICBpZiAoKF9yZWYgPSBsYW5nSXRlbVtpIC0gMV0pICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vSFNMRUUgOiDsnbTsmZXsnbTrqbQgU1JUIO2MjOyEnOyZgCDtj6zrp7fsnYQg66ee7LaU7J6QXHJcbiAgICAgICAgICAgICAgICBfcmVmLmVuZCA9IGl0ZW0uc3RhcnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpdGVtLmNvbnRlbnRzIHx8IGl0ZW0uY29udGVudHMgPT09ICcmbmJzcDsnKSB7XHJcbiAgICAgICAgICAgICAgICBsYW5nSXRlbS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbGFuZ0l0ZW1baV0uY29udGVudHM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5lbmQgPSBpdGVtLnN0YXJ0ICsgZHVyYXRpb247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhbmdJdGVtO1xyXG4gICAgfTtcclxuICAgIGVycm9ycyA9IFtdO1xyXG4gICAgZGVmaW5lZExhbmdzID0ge1xyXG4gICAgICAgIEtSQ0M6IHtcclxuICAgICAgICAgICAgbGFuZzogJ2tvJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihLUkNDKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEtPQ0M6IHtcclxuICAgICAgICAgICAgbGFuZzogJ2tvJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihLT0NDKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEtSOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdrbycsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooS1IpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRU5DQzoge1xyXG4gICAgICAgICAgICBsYW5nOiAnZW4nLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEVOQ0MpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRUdDQzoge1xyXG4gICAgICAgICAgICBsYW5nOiAnZW4nLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEVHQ0MpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRU46IHtcclxuICAgICAgICAgICAgbGFuZzogJ2VuJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihFTilbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBKUENDOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdqYScsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooSlBDQylbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGlmIChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmRlZmluZWRMYW5ncyA6IHZvaWQgMCkge1xyXG4gICAgICAgIF9yZWYgPSBvcHRpb25zLmRlZmluZWRMYW5ncztcclxuICAgICAgICBmb3IgKGtleSBpbiBfcmVmKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gX3JlZltrZXldO1xyXG4gICAgICAgICAgICBkZWZpbmVkTGFuZ3Nba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGR1cmF0aW9uID0gKG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMuZHVyYXRpb24gOiB2b2lkIDApIHx8IDEwOyAvL0hTTEVFIG1zIC0+IHMg66GcIOuzgOqyvVxyXG4gICAgZml4ZWRMYW5nID0gb3B0aW9ucy5maXhlZExhbmc7XHJcbiAgICBzYW1pID0gc2FtaS50cmltKCk7XHJcbiAgICAvL2dldERlZmluZWRMYW5ncygpO1xyXG4gICAgcmVzdWx0ID0gcGFyc2UoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdWx0OiByZXN1bHQsXHJcbiAgICAgICAgZXJyb3JzOiBlcnJvcnNcclxuICAgIH07XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU21pUGFyc2VyOyJdLCJzb3VyY2VSb290IjoiIn0=