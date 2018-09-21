/*! For license information please see ovenplayer.provider.RtmpProvider.js.LICENSE */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{119:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.getBrowser=function(){if(-1!=(navigator.userAgent.indexOf("Opera")||navigator.userAgent.indexOf("OPR")))return"opera";if(-1!=navigator.userAgent.indexOf("Chrome"))return"chrome";if(-1!=navigator.userAgent.indexOf("Safari"))return"safari";if(-1!=navigator.userAgent.indexOf("Firefox"))return"firefox";if(-1!=navigator.userAgent.indexOf("MSIE")){navigator.userAgent.indexOf("MSIE");return function(){for(var e=3,t=document.createElement("div"),n=t.getElementsByTagName("i");t.innerHTML="\x3c!--[if gt IE "+ ++e+"]><i></i><![endif]--\x3e",n[0];);return e>4?e:void 0}()<9?"oldIE":"modernIE"}return"unknown"}},278:function(e,t,n){e.exports=n.p+"OvenPlayerFlash.swf"},279:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(119),a=n(9),u=function(e){return e&&e.__esModule?e:{default:e}}(n(278));t.default=function(e,t){var n={},i=e.getAttribute("data-parent-id"),o="",l=(0,r.getBrowser)();OvenPlayerConsole.log("MediaManager loaded. browserType : "+l);return n.create=function(){return OvenPlayerConsole.log("MediaManager createElement()"),o&&n.destroy(),function(){if(t!==a.PROVIDER_RTMP)(o=document.createElement("video")).setAttribute("disableRemotePlayback",""),o.setAttribute("webkit-playsinline",""),o.setAttribute("playsinline",""),e.appendChild(o);else{var n=void 0,r=void 0,s=void 0,f=void 0,c=void 0,d=void 0,g=void 0,v=void 0,m=void 0;(n=document.createElement("param")).setAttribute("name","movie"),n.setAttribute("value",u.default),(r=document.createElement("param")).setAttribute("name","flashvars"),r.setAttribute("value","playerId="+i),(s=document.createElement("param")).setAttribute("name","allowscriptaccess"),s.setAttribute("value","always"),(f=document.createElement("param")).setAttribute("name","allowfullscreen"),f.setAttribute("value","true"),(c=document.createElement("param")).setAttribute("name","quality"),c.setAttribute("value","height"),(d=document.createElement("param")).setAttribute("name","name"),d.setAttribute("value",i+"-flash"),(g=document.createElement("param")).setAttribute("name","menu"),g.setAttribute("value","false"),(v=document.createElement("param")).setAttribute("name","quality"),v.setAttribute("value","high"),(m=document.createElement("param")).setAttribute("name","bgcolor"),m.setAttribute("value","#000000"),(o=document.createElement("object")).setAttribute("id",i+"-flash"),o.setAttribute("name",i+"-flash"),o.setAttribute("width","100%"),o.setAttribute("height","100%"),"oldIE"!==l?(o.setAttribute("data",u.default),o.setAttribute("type","application/x-shockwave-flash")):(o.setAttribute("classid","clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"),o.appendChild(n)),o.appendChild(m),o.appendChild(v),o.appendChild(f),o.appendChild(s),o.appendChild(r),e.appendChild(o)}return o}()},n.destroy=function(){OvenPlayerConsole.log("MediaManager removeElement()"),e.removeChild(o),o=null},n}},282:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(9);t.default=function(e,t){var n={isJSReady:function(){return!0},time:function(e){t.trigger(r.CONTENT_TIME,e),t.trigger(r.CONTENT_BUFFER,e)},volumeChanged:function(e){t.trigger(r.CONTENT_VOLUME,e)},stateChanged:function(e){t.setState(e.newstate),t.trigger(r.PLAYER_STATE,e)},metaChanged:function(e){t.trigger(r.CONTENT_META,e)},error:function(e){t.setState(r.STATE_ERROR),t.pause(),t.trigger(r.ERROR,e)}};return n}},283:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(60)),a=i(n(282)),u=n(9);function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){OvenPlayerConsole.log("CORE loaded. ");var i={};(0,r.default)(i);var o=t,l=(0,a.default)(o,i),s=!1,f=!1,c=u.STATE_IDLE,d=-1,g=[],v=function(e){var t=Math.max(0,d);if(e)for(var r=0;r<e.length;r++)if(e[r].default&&(t=r),n.getQualityLabel()&&e[r].label===n.getQualityLabel())return r;return t},m=function(e){var t=g[d];OvenPlayerConsole.log("source loaded : ",t,"lastPlayPosition : "+e);var n=o.getCurrentSource();t.file!==n?o.load(t.file):0===e&&i.getPosition()>0&&i.seek(e),e>0&&(i.seek(e),i.play()),i.trigger(u.CONTENT_LEVELS,{currentQuality:d})};return i.triggerEventFromExternal=function(e,t){return l[e]?l[e](t):null},i.getName=function(){return e},i.canSeek=function(){return s},i.setCanSeek=function(e){s=e},i.isSeeking=function(){return f},i.setSeeking=function(e){f=e},i.setState=function(e){c=e},i.getState=function(){return c},i.setBuffer=function(e){},i.getBuffer=function(){return o.getBuffer?o.getBuffer():null},i.getDuration=function(){return o.getDuration?o.getDuration():0},i.getPosition=function(){return o.getPosition?o.getPosition():0},i.setVolume=function(e){return o.setVolume?o.setVolume(e):0},i.getVolume=function(){return o.setVolume?o.getVolume():0},i.setMute=function(){o.setMute()},i.getMute=function(){return!!o.getMute&&o.getMute()},i.preload=function(e,t){OvenPlayerConsole.log("CORE : preload() ",e,t);var n=0;return d=v(g=e),console.log(o),new Promise(function(e,r){!function a(){return n++,o.isFlashReady&&o.isFlashReady()?(m(t||0),e()):n<100?void setTimeout(a,100):r()}()})},i.load=function(e){d=v(g=e),m(e.starttime||0)},i.play=function(){o.play&&o.play()},i.pause=function(){o.pause&&o.pause()},i.seek=function(e){o.seek(e)},i.setPlaybackRate=function(e){return 0},i.getPlaybackRate=function(){return 0},i.getQualityLevels=function(){return g.map(function(e,t){return{file:e.file,type:e.type,label:e.label,index:t}})},i.getCurrentQuality=function(){var e=g[d];return{file:e.file,type:e.type,label:e.label,index:d}},i.setCurrentQuality=function(e,t){return d!=e&&(e>-1&&g&&g.length>e?(i.setState(u.STATE_IDLE),OvenPlayerConsole.log("source changed : "+e),d=e,i.trigger(u.CONTENT_LEVEL_CHANGED,{currentQuality:e}),n.setQualityLabel(g[e].label),t&&m(o.getCurrentTime()||0),d):void 0)},i.stop=function(){OvenPlayerConsole.log("CORE : stop() "),o.stop()},i.destroy=function(){OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied"),o.remove()},i.super=function(e){var t=i[e];return function(){return t.apply(i,arguments)}},i}},61:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(279)),a=n(9),u=i(n(283));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t){var n=(0,r.default)(e,a.PROVIDER_RTMP),i=n.create(),o=(0,u.default)(a.PROVIDER_RTMP,i,t),l=o.super("destroy");return OvenPlayerConsole.log("RTMP PROVIDER LOADED."),o.destroy=function(){n.destroy(),OvenPlayerConsole.log("RTMP : PROVIDER DESTROYED."),l()},o}}}]);
//# sourceMappingURL=ovenplayer.provider.RtmpProvider.js.map