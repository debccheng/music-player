parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"JSfv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.fetchTracks=void 0;var e=function(e,t,n,r){return new(n||(n=Promise))(function(o,c){function a(e){try{u(r.next(e))}catch(t){c(t)}}function i(e){try{u(r.throw(e))}catch(t){c(t)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(a,i)}u((r=r.apply(e,t||[])).next())})},t=function(e,t){var n,r,o,c,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return c={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function i(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;c&&(c=0,i[0]&&(a=0)),a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(u){i=[6,u],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},n={method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}},r=function(){return e(void 0,void 0,void 0,function(){var e;return t(this,function(t){switch(t.label){case 0:return[4,fetch("src/mock/tracks.json",n)];case 1:if(!(e=t.sent()).ok)throw new Error("An error has occurred: ".concat(e.status));return[4,e.json()];case 2:return[2,t.sent()]}})})};exports.fetchTracks=r;
},{}],"FCax":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SHADOW_ANIMATION=exports.SCREEN_INITIAL=exports.SCREEN_GLOW_ANIMATION=exports.SCREEN_DIM_GLOW_ANIMATION=exports.SCREEN_BOX_SHADOW=exports.LIGHT_ANIMATION=void 0;var e="0 0 5.5em 1.5em rgba(255, 255, 255, 0.66)";exports.SCREEN_BOX_SHADOW=e;var s="0.5s ease-in-out infinite fuzzy-screen, 3s ease-in infinite glow";exports.SCREEN_GLOW_ANIMATION=s;var i="0.5s ease-in-out infinite fuzzy-screen, 0.5s ease-in-out infinite dim-glow";exports.SCREEN_DIM_GLOW_ANIMATION=i;var t="0.5s ease-in-out infinite fuzzy-screen";exports.SCREEN_INITIAL=t;var r="3s steps(2) infinite shadow-change";exports.SHADOW_ANIMATION=r;var I="3s steps(2) infinite light-change";exports.LIGHT_ANIMATION=I;
},{}],"Fppm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.visualise=exports.showPlaylist=exports.scrollAudioIntoView=exports.resetCSSAnimation=exports.playCSSAnimation=exports.changeCSSAnimation=void 0;var e=require("./constants"),t=function(){var e,t=document.getElementById("screen"),n=document.getElementById("shadow"),r=null===(e=document.querySelectorAll(".svg-container"))||void 0===e?void 0:e[0];return t&&n&&r?[t,n,r]:[]},n=function(){var e=document.querySelector(".playlist");e&&(e.style.animation="1s load-playlist forwards")};exports.showPlaylist=n;var r=function(e){var t=document.querySelectorAll("li");t&&t.length>e+1&&setTimeout(function(){t[e].scrollIntoView({behavior:"smooth"})},200)};exports.scrollAudioIntoView=r;var i=function(n){var r=t();if(3===r.length){var i=r[0],a=r[1],o=r[2];i.style.setProperty("--screenImage",'url("'.concat(n,'")')),i.style.setProperty("--screenGlow",e.SCREEN_BOX_SHADOW),i.style.animation=e.SCREEN_GLOW_ANIMATION,a.style.opacity="0.5",a.style.animation=e.SHADOW_ANIMATION,o.style.filter="brightness(100%)",o.style.animation=e.LIGHT_ANIMATION}};exports.playCSSAnimation=i;var a=function(){var n=t();if(3===n.length){var r=n[0],i=n[1],a=n[2];r.style.animation=e.SCREEN_DIM_GLOW_ANIMATION,i.style.opacity="0.2",i.style.animation="none",a.style.filter="brightness(80%)",a.style.animation="none"}};exports.changeCSSAnimation=a;var o=function(){var n=t();if(3===n.length){var r=n[0],i=n[1],a=n[2];r.style.setProperty("--screenImage","none"),r.style.setProperty("--screenGlow","none"),r.style.animation=e.SCREEN_INITIAL,i.style.opacity="0.1",i.style.animation="none",a.style.filter="brightness(50%)",a.style.animation="none"}};exports.resetCSSAnimation=o;var s=function e(t){var n=t.analyser,r=t.ctx,i=t.bufferLength,a=t.dataArray,o=t.barWidth,s=t.height,l=t.width;requestAnimationFrame(function(){return e({analyser:n,ctx:r,bufferLength:i,dataArray:a,barWidth:o,height:s,width:l})});var c=0,y=0;n.getByteFrequencyData(a),r.clearRect(0,0,l,s);for(var u=0;u<i;u+=1)y=a[u],r.fillStyle="rgba(255, 255, 255, 0.5)",r.strokeStyle="white",r.fillRect(c-4,s-y,o-4,y),r.lineWidth=2,r.strokeRect(c-4,s-y,o-4,y),c+=o+1},l=function(e,t){var n=e.createAnalyser(),r=document.getElementById("screen"),i=document.getElementById("canvas");i.width=r.clientWidth,i.height=5*r.clientHeight;var a=i.getContext("2d");t.connect(n),n.connect(e.destination),n.fftSize=64;var o=n.frequencyBinCount,l=new Uint8Array(o),c=i.width,y=i.height;s({analyser:n,ctx:a,bufferLength:o,dataArray:l,height:y,width:c,barWidth:c/o*3})};exports.visualise=l;
},{"./constants":"FCax"}],"GUxD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.displayPlaylist=exports.SliderActions=exports.ButtonActions=void 0;var e=function(e){var t=document.querySelector(".playlist"),n=document.createDocumentFragment();e.forEach(function(e){var t=document.createElement("li"),l=document.createDocumentFragment(),r=document.createElement("h2"),a=document.createElement("h3"),o=document.createElement("div"),i=document.createElement("img");r.innerText=e.title,a.innerText=e.artist,i.src=e.cover,i.className="album-cover",o.append(r),o.append(a),l.append(i),l.append(o),t.append(l),n.append(t)}),t.append(n)};exports.displayPlaylist=e;var t=function(e){var t=document.getElementById("slider");t&&(t.value=String(e))},n=function(e){e.ontimeupdate=function(){t(Math.floor(e.currentTime))}},l=function(e){var t=e.duration,l=e.index,r=e.audio,a=document.querySelector(".playlist").querySelectorAll("li");if(a&&a.length>l){a[l].style.cssText="background-color: rgba(17, 17, 17, 0.5)";var o=a[l].querySelector("div"),i=document.createElement("input");i.type="range",i.value="0",i.max=String(t),i.id="slider",null==o||o.append(i),i.addEventListener("change",function(){r.currentTime=+i.value}),i.addEventListener("mousedown",function(){r.ontimeupdate=null}),i.addEventListener("mouseup",function(){n(r)})}},r=function(){var e=document.getElementById("slider");null==e||e.remove()},a=function(e,t){var n=document.querySelector(".playlist").querySelectorAll("li");!n||n.length<=e||n.forEach(function(n,l){var r=n.querySelector("div");if(l!==e){var a=document.createElement("button");a.className="playlist-play-button",a.classList.add(String(l)),a.addEventListener("click",function(e){var n=e.target;if(n instanceof HTMLButtonElement){var l=n.className.slice(-1);t(+l)}}),null==r||r.append(a)}})},o=function(e,t){var n=document.querySelector(".playlist").querySelectorAll("li");if(n&&!(n.length<=e)){n[e].style.cssText="background-color: rgba(17, 17, 17, 0.2)";var l=n[e].querySelector("div"),r=document.createElement("button");r.className="playlist-play-button",r.classList.add(String(e)),r.addEventListener("click",function(e){var n=e.target;if(n instanceof HTMLButtonElement){var l=n.className.slice(-1);t(+l)}}),null==l||l.append(r)}},i=function(e){var t=document.querySelector(".playlist").querySelectorAll("li");if(t&&!(t.length<=e)){var n=t[e].querySelector("div"),l=null==n?void 0:n.querySelector(".playlist-play-button");null==l||l.remove()}},c={linkSliderWithAudio:n,updateSlider:t,createSlider:l,removeSlider:r};exports.SliderActions=c;var u={createPlaylistPlayButtons:a,addPlaylistButton:o,removePlaylistButton:i};exports.ButtonActions=u;
},{}],"YACm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AudioState=exports.AudioPlayer=void 0;var e,t=require("./api"),n=require("./animations"),o=require("./utils"),i=function(e,t,n,o){return new(n||(n=Promise))(function(i,u){function r(e){try{c(o.next(e))}catch(t){u(t)}}function a(e){try{c(o.throw(e))}catch(t){u(t)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(r,a)}c((o=o.apply(e,t||[])).next())})},u=function(e,t){var n,o,i,u,r={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return u={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function a(a){return function(c){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;u&&(u=0,a[0]&&(r=0)),r;)try{if(n=1,o&&(i=2&a[0]?o.return:a[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,a[1])).done)return i;switch(o=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return r.label++,{value:a[1],done:!1};case 5:r.label++,o=a[1],a=[0];continue;case 7:a=r.ops.pop(),r.trys.pop();continue;default:if(!(i=(i=r.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){r=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){r.label=a[1];break}if(6===a[0]&&r.label<i[1]){r.label=i[1],i=a;break}if(i&&r.label<i[2]){r.label=i[2],r.ops.push(a);break}i[2]&&r.ops.pop(),r.trys.pop();continue}a=t.call(e,r)}catch(c){a=[6,c],o=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}};exports.AudioState=e,function(e){e[e.playing=0]="playing",e[e.paused=1]="paused",e[e.stopped=2]="stopped"}(e||(exports.AudioState=e={}));var r=function(){function r(){}var a;return a=r,r.initialise=function(){return i(void 0,void 0,void 0,function(){var n;return u(a,function(i){switch(i.label){case 0:return[4,(0,t.fetchTracks)()];case 1:return n=i.sent().tracks,this.playlist=n,this.index=0,this.audioState=e.paused,(0,o.displayPlaylist)(n),o.ButtonActions.createPlaylistPlayButtons(this.index,this.changeTrack),this.load(this.index),[2]}})})},r.getAudioState=function(){return a.audioState},r.checkForPlayingAudio=function(){return!a.currentAudio.paused&&a.currentAudio.duration>0},r.cleanup=function(){a.srcNode&&a.srcNode.disconnect(),a.audioContext&&a.audioContext.close()},r.load=function(e){var t,n=null===(t=a.playlist)||void 0===t?void 0:t[e];a.currentAudio=new Audio(n.src),a.currentAudio.volume=a.volume||.5,a.currentAudio.onloadedmetadata=function(){var t=Math.floor(a.currentAudio.duration);o.SliderActions.createSlider({duration:t,audio:a.currentAudio,index:e}),o.SliderActions.linkSliderWithAudio(a.currentAudio)}},r.stop=function(){a.checkForPlayingAudio()&&(a.currentAudio.pause(),a.currentAudio.currentTime=0,a.audioState=e.stopped,a.cleanup())},r.pause=function(){a.checkForPlayingAudio()&&(a.currentAudio.pause(),a.audioState=e.paused,(0,n.changeCSSAnimation)())},r.changeTrack=function(e){a.stop(),o.SliderActions.removeSlider(),o.ButtonActions.addPlaylistButton(a.index,a.changeTrack),a.index=e,o.ButtonActions.removePlaylistButton(a.index),a.load(a.index),a.play()},r.play=function(){var t;a.currentAudio.play(),(0,n.scrollAudioIntoView)(a.index),a.audioState=e.playing,a.currentAudio.onended=function(){a.index+1<a.playlist.length?(o.SliderActions.removeSlider(),o.ButtonActions.addPlaylistButton(a.index,a.changeTrack),a.index+=1,o.ButtonActions.removePlaylistButton(a.index),a.load(a.index),a.play()):(0,n.resetCSSAnimation)()},a.audioContext=new AudioContext,a.srcNode=a.audioContext.createMediaElementSource(a.currentAudio),(0,n.visualise)(a.audioContext,a.srcNode),(0,n.playCSSAnimation)((null===(t=a.playlist[a.index])||void 0===t?void 0:t.cover)||"")},r.increaseVolume=function(){a.currentAudio.volume<1&&(a.currentAudio.volume=+(a.currentAudio.volume+.1).toFixed(1),a.volume=a.currentAudio.volume)},r.decreaseVolume=function(){a.currentAudio.volume>0&&(a.currentAudio.volume=+(a.currentAudio.volume-.1).toFixed(1),a.volume=a.currentAudio.volume)},r}();exports.AudioPlayer=r;
},{"./api":"JSfv","./animations":"Fppm","./utils":"GUxD"}],"KUU8":[function(require,module,exports) {
"use strict";var e=require("./audio"),i=require("./animations");e.AudioPlayer.initialise();var t=document.getElementById("play-button");null==t||t.addEventListener("click",function(){var t=e.AudioPlayer.getAudioState();(0,i.showPlaylist)(),t!==e.AudioState.playing?e.AudioPlayer.play():e.AudioPlayer.pause()});var a=document.getElementById("increase-volume"),l=document.getElementById("decrease-volume");null==a||a.addEventListener("click",function(){e.AudioPlayer.increaseVolume()}),null==l||l.addEventListener("click",function(){e.AudioPlayer.decreaseVolume()});
},{"./audio":"YACm","./animations":"Fppm"}]},{},["KUU8"], null)