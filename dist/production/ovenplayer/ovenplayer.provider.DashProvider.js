/*! For license information please see ovenplayer.provider.DashProvider.js.LICENSE */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{197:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t,r){var n=t?1e3:1024;if(Math.abs(e)<n)return e+" B";var a=r||"B",o=["k"+a,"M"+a,"G"+a,"T"+a,"P"+a,"E"+a,"Z"+a,"Y"+a],i=-1;do{e/=n,++i}while(Math.abs(e)>=n&&i<o.length-1);return e.toFixed(1)+o[i]}},367:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.pickCurrentSource=t.errorTrigger=t.separateLive=t.extractVideoElement=void 0;var n=r(5),a=function(e){return e&&e.__esModule?e:{default:e}}(r(7));t.extractVideoElement=function(e){return a.default.isElement(e)?e:e.getVideoElement?e.getVideoElement():e.media?e.media:null},t.separateLive=function(e){return!!e.isDynamic&&e.isDynamic()},t.errorTrigger=function(e,t){t.setState(n.STATE_ERROR),t.pause(),t.trigger(n.ERROR,e)},t.pickCurrentSource=function(e,t,r){var n=Math.max(0,t);if(e)for(var a=0;a<e.length;a++)if(e[a].default&&(n=a),r.getSourceLabel()&&e[a].label===r.getSourceLabel())return a;return n}},368:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.getBrowserLanguage=function(){var e=window.navigator,t=["language","browserLanguage","systemLanguage","userLanguage"],r=void 0,n=void 0;if(Array.isArray(e.languages))for(r=0;r<e.languages.length;r++)if((n=e.languages[r])&&n.length)return n;for(r=0;r<t.length;r++)if((n=e[t[r]])&&n.length)return n;return null},t.getBrowser=function(){if(-1!=(navigator.userAgent.indexOf("Opera")||navigator.userAgent.indexOf("OPR")))return"opera";if(-1!=navigator.userAgent.indexOf("Chrome"))return"chrome";if(-1!=navigator.userAgent.indexOf("Safari"))return"safari";if(-1!=navigator.userAgent.indexOf("Firefox"))return"firefox";if(-1!=navigator.userAgent.indexOf("MSIE")){navigator.userAgent.indexOf("MSIE");return function(){for(var e=3,t=document.createElement("div"),r=t.getElementsByTagName("i");t.innerHTML="\x3c!--[if gt IE "+ ++e+"]><i></i><![endif]--\x3e",r[0];);return e>4?e:void 0}()<9?"oldIE":"modernIE"}return"unknown"}},369:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(368),a=r(5),o=function(e){return e&&e.__esModule?e:{default:e}}(r(370));t.default=function(e,t,r){var i={},u=e.getAttribute("data-parent-id"),l="",s=(0,n.getBrowser)();OvenPlayerConsole.log("MediaManager loaded. browserType : "+s);return i.create=function(){return OvenPlayerConsole.log("MediaManager createElement()"),l&&i.destroy(),function(){if(t!==a.PROVIDER_RTMP)(l=document.createElement("video")).setAttribute("disableRemotePlayback",""),l.setAttribute("webkit-playsinline","true"),l.setAttribute("playsinline","true"),r&&l.setAttribute("loop",""),e.appendChild(l);else{var n=void 0,i=void 0,c=void 0,d=void 0,f=void 0,g=void 0,E=void 0,v=void 0,m=void 0,y=void 0;(n=document.createElement("param")).setAttribute("name","movie"),n.setAttribute("value",o.default),(i=document.createElement("param")).setAttribute("name","flashvars"),i.setAttribute("value","playerId="+u),(c=document.createElement("param")).setAttribute("name","allowscriptaccess"),c.setAttribute("value","always"),(d=document.createElement("param")).setAttribute("name","allowfullscreen"),d.setAttribute("value","true"),(f=document.createElement("param")).setAttribute("name","quality"),f.setAttribute("value","height"),(g=document.createElement("param")).setAttribute("name","name"),g.setAttribute("value",u+"-flash"),(E=document.createElement("param")).setAttribute("name","menu"),E.setAttribute("value","false"),(v=document.createElement("param")).setAttribute("name","quality"),v.setAttribute("value","high"),(m=document.createElement("param")).setAttribute("name","bgcolor"),m.setAttribute("value","#000000"),y&&((y=document.createElement("param")).setAttribute("name","loop"),y.setAttribute("value","true")),(l=document.createElement("object")).setAttribute("id",u+"-flash"),l.setAttribute("name",u+"-flash"),l.setAttribute("width","100%"),l.setAttribute("height","100%"),l.setAttribute("scale","default"),"oldIE"!==s?(l.setAttribute("data",o.default),l.setAttribute("type","application/x-shockwave-flash")):(l.setAttribute("classid","clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"),l.appendChild(n)),y&&l.appendChild(y),l.appendChild(m),l.appendChild(v),l.appendChild(d),l.appendChild(c),l.appendChild(i),e.appendChild(l)}return l}()},i.destroy=function(){OvenPlayerConsole.log("MediaManager removeElement()"),e.removeChild(l),l=null},i}},370:function(e,t,r){e.exports=r.p+"OvenPlayerFlash.swf"},371:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=u(r(88)),a=u(r(372)),o=r(367),i=r(5);function u(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,r){OvenPlayerConsole.log("CORE loaded. ");var u={};(0,n.default)(u);var l=(0,a.default)(e.extendedElement,u),s=(0,o.extractVideoElement)(e.extendedElement);t.getConfig().image;s.playbackRate=s.defaultPlaybackRate=t.getPlaybackRate();var c=function(n){var a=e.sources[e.currentSource];if(e.framerate=a.framerate,e.framerate||t.setTimecodeMode(!0),r)r(a,n);else{OvenPlayerConsole.log("source loaded : ",a,"lastPlayPosition : "+n);var o=s.src,i=document.createElement("source");i.src=a.file,i.src!==o?(s.src=e.sources[e.currentSource].file,o&&s.load()):0===n&&s.currentTime>0&&u.seek(n),n>0&&(u.seek(n),u.play())}};return u.getName=function(){return e.name},u.canSeek=function(){return e.canSeek},u.setCanSeek=function(t){e.canSeek=t},u.isSeeking=function(){return e.seeking},u.setSeeking=function(t){e.seeking=t},u.setState=function(t){if(e.state!==t){var r=e.state;switch(t){case i.STATE_COMPLETE:u.trigger(i.PLAYER_COMPLETE);break;case i.STATE_PAUSED:u.trigger(i.PLAYER_PAUSE,{prevState:e.state});break;case i.STATE_PLAYING:u.trigger(i.PLAYER_PLAY,{prevState:e.state})}e.state=t,u.trigger(i.PLAYER_STATE,{prevstate:r,newstate:e.state})}},u.getState=function(){return e.state},u.setBuffer=function(t){e.buffer=t},u.getBuffer=function(){return e.buffer},u.getDuration=function(){return s.duration===1/0||(0,o.separateLive)(e.extendedElement)?1/0:s.duration},u.getPosition=function(){return s?s.currentTime:0},u.setVolume=function(e){if(!s)return!1;s.volume=e/100},u.getVolume=function(){return s?100*s.volume:0},u.setMute=function(e){return!!s&&(void 0===e?(s.muted=!s.muted,u.trigger(i.CONTENT_MUTE,{mute:s.muted})):(s.muted=e,u.trigger(i.CONTENT_MUTE,{mute:s.muted})),s.muted)},u.getMute=function(){return!!s&&s.muted},u.preload=function(r,n){return e.sources=r,e.currentSource=(0,o.pickCurrentSource)(r,e.currentSource,t),c(n||0),new Promise(function(e,r){e(),t.isAutoStart()&&u.play(),t.isMute()&&u.setMute(!0),t.getVolume()&&u.setVolume(t.getVolume())})},u.load=function(r){e.sources=r,e.currentSource=(0,o.pickCurrentSource)(r,e.currentSource,t),c(e.sources.starttime||0)},u.play=function(){if(!s)return!1;if(u.getState()!==i.STATE_PLAYING){var e=s.play();void 0!==e&&e.then(function(e){}).catch(function(e){setTimeout(function(){u.play()},1e3)})}},u.pause=function(){if(!s)return!1;u.getState()===i.STATE_PLAYING&&s.pause()},u.seek=function(e){if(!s)return!1;s.currentTime=e},u.setPlaybackRate=function(e){return!!s&&(u.trigger(i.PLAYBACK_RATE_CHANGED,{playbackRate:e}),s.playbackRate=s.defaultPlaybackRate=e)},u.getPlaybackRate=function(){return s?s.playbackRate:0},u.getSources=function(){return s?e.sources.map(function(e,t){return{file:e.file,type:e.type,label:e.label,index:t}}):[]},u.getCurrentSource=function(){return e.currentSource},u.setCurrentSource=function(r,n){return e.currentSource!==r&&(r>-1&&e.sources&&e.sources.length>r?(u.setState(i.STATE_IDLE),OvenPlayerConsole.log("source changed : "+r),e.currentSource=r,u.trigger(i.CONTENT_SOURCE_CHANGED,{currentSource:r}),t.setSourceLabel(e.sources[r].label),n&&c(s.currentTime||0),e.currentSource):void 0)},u.getQualityLevels=function(){return s?e.qualityLevels:[]},u.getCurrentQuality=function(){return s?e.currentQuality:null},u.setCurrentQuality=function(e){},u.isAutoQuality=function(){},u.setAutoQuality=function(e){},u.getFramerate=function(){return e.framerate},u.setFramerate=function(t){return e.framerate=t},u.seekFrame=function(t){var r=e.framerate,n=(s.currentTime*r+t)/r;n+=1e-5,u.pause(),u.seek(n)},u.stop=function(){if(!s)return!1;for(OvenPlayerConsole.log("CORE : stop() "),s.removeAttribute("preload"),s.removeAttribute("src");s.firstChild;)s.removeChild(s.firstChild);u.pause(),u.setState(i.STATE_IDLE)},u.destroy=function(){if(!s)return!1;u.stop(),l.destroy(),u.off(),OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied")},u.super=function(e){var t=u[e];return function(){return t.apply(u,arguments)}},u}},372:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(5),a=r(367);t.default=function(e,t){var r={};OvenPlayerConsole.log("EventListener loaded.",e,t);var o={},i=(0,a.extractVideoElement)(e);return r.canplay=function(){t.setCanSeek(!0),t.trigger(n.CONTENT_BUFFER_FULL),OvenPlayerConsole.log("EventListener : on canplay")},r.durationchange=function(){r.progress(),OvenPlayerConsole.log("EventListener : on durationchange")},r.ended=function(){OvenPlayerConsole.log("EventListener : on ended"),t.getState()!=n.STATE_IDLE&&t.getState()!=n.STATE_COMPLETE&&(t.trigger(n.CONTENT_COMPLETE),t.setState(n.STATE_COMPLETE))},r.loadeddata=function(){OvenPlayerConsole.log("EventListener : on loadeddata")},r.loadedmetadata=function(){var r=i.duration===1/0||(0,a.separateLive)(e),o=t.getSources(),u=t.getCurrentSource(),l=u>-1?o[u].type:"",s={duration:r?1/0:i.duration,type:l};OvenPlayerConsole.log("EventListener : on loadedmetadata",s),t.trigger(n.CONTENT_META,s)},r.pause=function(){return t.getState()!==n.STATE_COMPLETE&&t.getState()!==n.STATE_ERROR&&!i.ended&&!i.error&&i.currentTime!==i.duration&&(OvenPlayerConsole.log("EventListener : on pause"),void t.setState(n.STATE_PAUSED))},r.play=function(){i.paused||t.getState()===n.STATE_PLAYING||(OvenPlayerConsole.log("EventListener : on play"),t.setState(n.STATE_LOADING))},r.playing=function(){OvenPlayerConsole.log("EventListener : on playing"),t.setState(n.STATE_PLAYING)},r.progress=function(){var e=i.buffered;if(!e)return!1;var r=i.duration,a=i.currentTime,o=function(e,t,r){return Math.max(Math.min(e,r),t)}((e.length>0?e.end(e.length-1):0)/r,0,1);OvenPlayerConsole.log("EventListener : on progress",100*o),t.setBuffer(100*o),t.trigger(n.CONTENT_BUFFER,{bufferPercent:100*o,position:a,duration:r})},r.stalled=function(){OvenPlayerConsole.log("EventListener : on stall")},r.timeupdate=function(){var e=i.currentTime,r=i.duration;isNaN(r)||(t.isSeeking()||i.paused||t.setState(n.STATE_PLAYING),(t.getState()===n.STATE_PLAYING||t.isSeeking())&&t.trigger(n.CONTENT_TIME,{position:e,duration:r}))},r.resize=function(){OvenPlayerConsole.log("EventListener : on resize")},r.seeking=function(){t.setSeeking(!0),OvenPlayerConsole.log("EventListener : on seeking",i.currentTime),t.trigger(n.CONTENT_SEEK,{position:i.currentTime})},r.seeked=function(){t.isSeeking()&&(OvenPlayerConsole.log("EventListener : on seeked"),t.setSeeking(!1),t.trigger(n.CONTENT_SEEKED))},r.waiting=function(){OvenPlayerConsole.log("EventListener : on waiting",t.getState()),t.isSeeking()?t.setState(n.STATE_LOADING):t.getState()===n.STATE_PLAYING&&t.setState(n.STATE_STALLED)},r.volumechange=function(){OvenPlayerConsole.log("EventListener : on volumechange",Math.round(100*i.volume)),t.trigger(n.CONTENT_VOLUME,{volume:Math.round(100*i.volume),mute:i.muted})},r.error=function(){var e=i.error&&i.error.code||0,t={0:n.PLAYER_UNKNWON_ERROR,1:n.PLAYER_UNKNWON_OPERATION_ERROR,2:n.PLAYER_UNKNWON_NEWWORK_ERROR,3:n.PLAYER_UNKNWON_DECODE_ERROR,4:n.PLAYER_FILE_ERROR}[e]||0;OvenPlayerConsole.log("EventListener : on error",t),(0,a.errorTrigger)(n.ERRORS[t])},Object.keys(r).forEach(function(e){i.removeEventListener(e,r[e]),i.addEventListener(e,r[e])}),o.destroy=function(){OvenPlayerConsole.log("EventListener : destroy()"),Object.keys(r).forEach(function(e){i.removeEventListener(e,r[e])})},o}},94:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=l(r(369)),a=l(r(371)),o=r(367),i=l(r(197)),u=r(5);function l(e){return e&&e.__esModule?e:{default:e}}var s="download",c="manifestError";t.default=function(e,t){var r={},l=null,d=null,f=0,g=!1,E=(0,n.default)(e,u.PROVIDER_DASH,t.isLoop()),v=E.create();try{(l=dashjs.MediaPlayer().create()).getDebug().setLogToBrowserConsole(!1),l.initialize(v,null,!1);var m={name:u.PROVIDER_DASH,extendedElement:l,listener:null,canSeek:!1,isLive:!1,seeking:!1,state:u.STATE_IDLE,buffer:0,framerate:0,currentQuality:-1,currentSource:-1,qualityLevels:[],sources:[]};r=(0,a.default)(m,t,function(e,t){OvenPlayerConsole.log("DASH : onExtendedLoad : ",e,"lastPlayPosition : "+t),l.setAutoSwitchQuality(!0),l.attachSource(e.file),f=t}),d=r.super("destroy"),OvenPlayerConsole.log("DASH PROVIDER LOADED."),l.on(dashjs.MediaPlayer.events.ERROR,function(e){if(e&&!g&&(e.error===s||e.error===c)){g=!0;var t=u.ERRORS[u.PLAYER_UNKNWON_NEWWORK_ERROR];t.error=e,(0,o.errorTrigger)(t,r)}}),l.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED,function(e){e&&e.mediaType&&"video"===e.mediaType&&r.trigger(u.CONTENT_LEVEL_CHANGED,{isAuto:l.getAutoSwitchQuality(),currentQuality:m.currentQuality,type:"request"})}),l.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED,function(e){e&&e.mediaType&&"video"===e.mediaType&&(m.currentQuality=e.newQuality,r.trigger(u.CONTENT_LEVEL_CHANGED,{isAuto:l.getAutoSwitchQuality(),currentQuality:e.newQuality,type:"render"}))}),r.on(u.CONTENT_META,function(e){OvenPlayerConsole.log("GetStreamInfo  : ",l.getQualityFor("video"),l.getBitrateInfoListFor("video"),l.getBitrateInfoListFor("video")[l.getQualityFor("video")]);var t=l.getBitrateInfoListFor("video");m.currentQuality=l.getQualityFor("video");for(var n=0;n<t.length;n++)m.qualityLevels.push({bitrate:t[n].bitrate,height:t[n].height,width:t[n].width,index:t[n].qualityIndex,label:t[n].width+"x"+t[n].height+", "+(0,i.default)(t[n].bitrate,!0,"bps")});l.isDynamic()?r.play():f&&(l.seek(f),r.play())},r),r.setCurrentQuality=function(e){return r.getState()!==u.STATE_PLAYING&&r.play(),m.currentQuality=e,l.getAutoSwitchQuality()&&l.setAutoSwitchQuality(!1),l.setQualityFor("video",e),m.currentQuality},r.isAutoQuality=function(){return l.getAutoSwitchQuality()},r.setAutoQuality=function(e){l.setAutoSwitchQuality(e)},r.destroy=function(){l.reset(),E.destroy(),E=null,v=null,OvenPlayerConsole.log("DASH : PROVIDER DESTROYED."),d()}}catch(e){throw new Error(e)}return r}}}]);