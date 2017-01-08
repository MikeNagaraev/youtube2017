/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _layout = __webpack_require__(1);
	
	var _layout2 = _interopRequireDefault(_layout);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var layout = new _layout2.default();
	layout.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _loader = __webpack_require__(2);
	
	var _loader2 = _interopRequireDefault(_loader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Layout = function () {
		function Layout() {
			_classCallCheck(this, Layout);
		}
		//////////////////////////////////////////////////////
	
	
		_createClass(Layout, [{
			key: 'init',
			value: function init() {
				this.renderContainer();
				this.renderFooter();
			}
		}, {
			key: 'clearResults',
			value: function clearResults() {
				document.getElementById('results').innerHTML = '';
				document.getElementById('search-input').focus();
			}
		}, {
			key: 'renderContainer',
			value: function renderContainer() {
				var container = document.createElement('div'),
				    header = document.createElement('div'),
				    results = document.createElement('div');
				container.setAttribute('id', 'container');
				header.setAttribute('id', 'header-site');
				results.setAttribute('id', 'results');
				container.appendChild(header);
				container.appendChild(results);
				document.body.appendChild(container);
				this.renderForm();
			}
		}, {
			key: 'renderForm',
			value: function renderForm() {
				var _this = this;
	
				var form = document.createElement('form'),
				    img = document.createElement('img');
	
				form.setAttribute('id', 'search-form');
				form.setAttribute('action', '#');
				document.getElementById('header-site').appendChild(form);
				img.setAttribute('src', './images/youtube.png');
				img.setAttribute('id', 'youtube-icon');
				form.appendChild(img);
				img.addEventListener('click', function () {
					_this.clearResults();
					document.getElementById('search-input').value = '';
					document.getElementById('results').style.left = '0px';
				});
				this.renderInput();
				this.renderButton();
			}
		}, {
			key: 'renderInput',
			value: function renderInput() {
				var input = document.createElement('input');
	
				input.setAttribute('type', 'text');
				input.setAttribute('id', 'search-input');
				input.setAttribute('autofocus', 'true');
				document.getElementById('search-form').appendChild(input);
			}
		}, {
			key: 'renderButton',
			value: function renderButton() {
				var _this2 = this;
	
				var searchButton = document.createElement('button'),
				    span = document.createElement('span');
	
				searchButton.setAttribute('type', 'submit');
				searchButton.setAttribute('id', 'search-button');
				searchButton.addEventListener('click', function () {
					_this2.pinSearchOnButton();
				});
				span.setAttribute('id', 'search-icon');
				searchButton.appendChild(span);
				document.getElementById('search-form').appendChild(searchButton);
			}
		}, {
			key: 'pinSearchOnButton',
			value: function pinSearchOnButton() {
				this.clearResults();
				var loader = new _loader2.default();
				var inputVal = document.getElementById('search-input').value;
				inputVal = inputVal.trim();
				if (inputVal.length) {
					document.getElementById('results').style.left = '0px';
					loader.loadVideos(inputVal);
				}
			}
	
			///////////////////////////////////////////////////////////////
	
		}, {
			key: 'renderSlides',
			value: function renderSlides(slides) {
				var _this3 = this;
	
				this.clearResults();
				slides.forEach(function (slide) {
					_this3.renderSlide(slide);
				});
			}
		}, {
			key: 'renderSlide',
			value: function renderSlide(slide) {
				var _this4 = this;
	
				var slideDiv = document.createElement('div'),
				    videoList = document.createElement('ul');
				slideDiv.setAttribute('class', 'slide');
				videoList.setAttribute('class', 'videoList');
				slideDiv.appendChild(videoList);
				document.getElementById('results').appendChild(slideDiv);
				slideDiv.style.left = slide.id * document.documentElement.clientWidth + 'px';
				slide.posLeft = slideDiv.style.left;
				slide.items.forEach(function (item) {
					_this4.renderVideo(item, videoList);
				});
			}
		}, {
			key: 'renderVideo',
			value: function renderVideo(video, videoList) {
				var li = document.createElement('li'),
				    channel = document.createElement('div'),
				    viewsInfo = document.createElement('div');
				this.renderTitle(li, video.title, video.hrefYouTube);
				this.renderImg(li, video.iframe, video.imgUrl);
				this.renderDate(li, video.date);
				this.renderChannel(li, video.channel);
				this.renderDescription(li, video.description);
				this.renderViewInfo(li, video.views, video.likes, video.dislikes, video.comments);
				videoList.appendChild(li);
			}
		}, {
			key: 'renderTitle',
			value: function renderTitle(li, title, href) {
				var titleDiv = document.createElement('div'),
				    h3 = document.createElement('h3'),
				    a = document.createElement('a');
				a.setAttribute('href', href);
				titleDiv.setAttribute('class', 'title-video');
				h3.innerHTML = title;
				a.appendChild(h3);
				titleDiv.appendChild(a);
				li.appendChild(titleDiv);
			}
		}, {
			key: 'renderImg',
			value: function renderImg(li, href, img) {
				var imageDiv = document.createElement('div'),
				    imgTag = document.createElement('img'),
				    iframe = document.createElement('iframe'),
				    play = document.createElement('div'),
				    playIcon = document.createElement('i');
				play.setAttribute('class', 'play-video');
				playIcon.setAttribute('class', 'fa fa-play');
				play.appendChild(playIcon);
				imageDiv.setAttribute('class', 'image-video');
				iframe.setAttribute('src', href);
				imgTag.setAttribute('src', img);
				imageDiv.appendChild(imgTag);
				imageDiv.appendChild(play);
				this.pinIframeOnImg(imgTag, play, iframe, imageDiv);
				li.appendChild(imageDiv);
			}
		}, {
			key: 'renderIframe',
			value: function renderIframe(iframe, imageDiv) {
				iframe.setAttribute('frameborder', '0');
				iframe.setAttribute('allowfullscreen', '');
				imageDiv.appendChild(iframe);
			}
		}, {
			key: 'pinIframeOnImg',
			value: function pinIframeOnImg(img, play, iframe, imageDiv) {
				var _this5 = this;
	
				play.addEventListener('click', function (e) {
					_this5.renderIframe(iframe, imageDiv);
					img.style.display = 'none';
					iframe.style.display = 'flex';
					e.preventDefault();
					play.style.display = 'none';
				});
			}
		}, {
			key: 'renderDate',
			value: function renderDate(li, date) {
				this.renderItem(li, date, 'fa fa-calendar');
			}
		}, {
			key: 'renderChannel',
			value: function renderChannel(li, channel) {
				this.renderItem(li, channel, 'fa fa-user-circle-o');
			}
		}, {
			key: 'renderDescription',
			value: function renderDescription(li, description) {
				this.renderItem(li, description, 'fa fa-pencil');
			}
		}, {
			key: 'renderItem',
			value: function renderItem(li, item, classIcon) {
				var itemDiv = document.createElement('div'),
				    p = document.createElement('p'),
				    icon = document.createElement('i'),
				    span = document.createElement('span');
				icon.setAttribute('class', classIcon);
				icon.classList.add('icon-item');
				span.innerHTML = item;
				span.setAttribute('class', 'text-item');
				p.appendChild(icon);
				p.appendChild(span);
				itemDiv.appendChild(p);
				itemDiv.setAttribute('class', 'item-div');
				li.appendChild(itemDiv);
			}
		}, {
			key: 'renderViewInfo',
			value: function renderViewInfo(li, views, likes, dislikes, comments) {
				var viewDiv = document.createElement('div'),
				    ul = document.createElement('ul');
	
				viewDiv.setAttribute('class', 'views-info');
				this.renderViewItem(ul, 'fa fa-eye', views);
				this.renderViewItem(ul, 'fa fa-thumbs-o-up', likes);
				this.renderViewItem(ul, 'fa fa-thumbs-o-down', dislikes);
				this.renderViewItem(ul, 'fa fa-comment-o', comments);
				viewDiv.appendChild(ul);
				li.appendChild(viewDiv);
			}
		}, {
			key: 'renderViewItem',
			value: function renderViewItem(ul, iconClass, count) {
				var li = document.createElement('li'),
				    icon = document.createElement('i'),
				    p = document.createElement('p');
				icon.setAttribute('class', iconClass);
				li.appendChild(icon);
				p.innerHTML = count ? count : 0;
				li.appendChild(p);
				ul.appendChild(li);
			}
		}, {
			key: 'renderFooter',
			value: function renderFooter() {
				var footer = document.createElement('div'),
				    pagination = document.createElement('ul');
	
				for (var i = 1; i <= 5; i++) {
					var li = document.createElement('li'),
					    link = document.createElement('a');
					link.setAttribute('class', 'page');
					link.innerHTML = i;
					li.appendChild(link);
					pagination.appendChild(li);
				}
				footer.setAttribute('class', 'footer');
				pagination.setAttribute('class', 'pagination');
				footer.appendChild(pagination);
				document.body.appendChild(footer);
			}
		}]);
	
		return Layout;
	}();
	
	exports.default = Layout;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _slideManager = __webpack_require__(3);
	
	var _slideManager2 = _interopRequireDefault(_slideManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var apiKey = 'AIzaSyAeSlcNwi1BcFtSx_LX6Yv3o-OozPJ5aLk'; //AIzaSyBq_TNf3mo1y7mI6Yrtb23E5t1qA7eZlxEx
	//
	//
	
	var maxQueryCount = 15;
	
	var Loader = function () {
		function Loader() {
			_classCallCheck(this, Loader);
	
			this.queryCount = maxQueryCount;
			this.nextPage = '';
		}
	
		_createClass(Loader, [{
			key: 'loadVideos',
			value: function loadVideos(valueQuery) {
				this.value = valueQuery;
				this.manager = new _slideManager2.default(this);
				this.getVideos();
				this.manager.pinSwipe();
				// this.fakeVideos();
			}
	
			// fakeVideos() {
			// 	let fakeVideos = [];
			// 	let fakeItem = {
			// 		hrefYouTube: 'https://www.youtube.com/watch?v=' + 'KesUyAZ1cHk',
			// 		iframe: 'https://www.youtube.com/embed/' + 'KesUyAZ1cHk',
			// 		title: 'Title',
			// 		imgUrl: 'https://i.ytimg.com/vi/OBSx0laWFZk/maxresdefault.jpg',
			// 		channel: 'channel',
			// 		date: '2015-11-11',
			// 		views: 120,
			// 		likes: 230,
			// 		dislikes: 10,
			// 		comments: 10,
			// 		description: 'blablablabla',
			// 		videoId: 'KesUyAZ1cHk'
			// 	}
			// 	for (let i = 0; i < 12; i++) {
			// 		fakeVideos.push(fakeItem)
			// 	}
			// 	let slideManager = new SlideManager();
			// 	slideManager.getItems(fakeVideos);
			// }
	
		}, {
			key: 'getVideos',
			value: function getVideos() {
				var _this = this;
	
				var searchUrl = 'https://www.googleapis.com/youtube/v3/search?pageToken=';
	
				var url = searchUrl + (this.nextPage ? this.nextPage : '') + '&part=snippet&maxResults=' + maxQueryCount + '&q=' + this.value + '&key=' + apiKey,
				    items = void 0;
				var statisticsUrl = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=';
				fetch(url).then(function (response) {
					return response.json();
				}).then(function (response) {
					_this.nextPage = response.nextPageToken;
					items = response.items;
					return items;
				}).then(function (items) {
					items = _this.formObjects(items);
					return items.slice(1, items.length);
				}).then(function (videoObjs) {
					_this.pushStatistics(videoObjs);
				});
			}
			//
			// checkCorrectData(items) {
			// 	console.log('error')
			// 	for (let i = 0; i < items.length; i++) {
			// 		if (!items[i].id.videoId) {
			// 			return false;
			// 		}
			// 	}
			// 	return true;
			// }
	
		}, {
			key: 'formObjects',
			value: function formObjects(arrayVideos) {
				var _this2 = this;
	
				var result = [];
				arrayVideos.forEach(function (video) {
					result.push(_this2.getVideoObject(video));
				});
				return result;
			}
		}, {
			key: 'getVideoObject',
			value: function getVideoObject(item) {
				return {
					hrefYouTube: 'https://www.youtube.com/watch?v=' + (item.id.videoId ? item.id.videoId : ''),
					iframe: 'https://www.youtube.com/embed/' + (item.id.videoId ? item.id.videoId : ''),
					title: item.snippet.title,
					imgUrl: item.snippet.thumbnails.medium.url,
					channel: item.snippet.channelTitle,
					date: item.snippet.publishedAt.substring(0, 10),
					views: 0,
					likes: 0,
					dislikes: 0,
					comments: 0,
					description: item.snippet.description,
					videoId: item.id.videoId ? item.id.videoId : ''
				};
			}
		}, {
			key: 'pushStatistics',
			value: function pushStatistics(videos) {
				var _this3 = this;
	
				var statisticsUrl = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=';
				videos.forEach(function (item) {
					if (item.videoId != '') {
						var url = statisticsUrl + item.videoId + '&key=' + apiKey;
						fetch(url).then(function (response) {
							return response.json();
						}).then(function (statistic) {
							item.views = statistic.items[0].statistics.viewCount;
							item.likes = statistic.items[0].statistics.likeCount;
							item.dislikes = statistic.items[0].statistics.dislikeCount;
							item.comments = statistic.items[0].statistics.commentCount;
							_this3.manager.pushItem(item);
						}).catch(function (err) {
							return console.log(err);
						});
					}
				});
			}
		}]);
	
		return Loader;
	}();
	
	exports.default = Loader;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _layout = __webpack_require__(1);
	
	var _layout2 = _interopRequireDefault(_layout);
	
	var _swipe = __webpack_require__(4);
	
	var _swipe2 = _interopRequireDefault(_swipe);
	
	var _slide = __webpack_require__(5);
	
	var _slide2 = _interopRequireDefault(_slide);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var maxItemsInSlide = 4;
	var swipe = new _swipe2.default();
	
	var SlideManager = function () {
		function SlideManager(loader) {
			_classCallCheck(this, SlideManager);
	
			this.loader = loader;
			this.slides = [];
			this.resize = false;
			this.layout = new _layout2.default();
			this.buffer = [];
		}
	
		_createClass(SlideManager, [{
			key: 'pushItem',
			value: function pushItem(item) {
				this.buffer.push(item);
				if (this.buffer.length === maxItemsInSlide) {
					if (this.slides.length === 0) {
						this.slides.push(new _slide2.default(this.buffer, 0, 'active'));
					} else {
						this.slides.push(new _slide2.default(this.buffer, this.slides[this.slides.length - 1].id + 1, 'passive'));
					}
					this.layout.renderSlide(this.lastSlide());
					this.buffer = [];
				}
			}
		}, {
			key: 'lastSlide',
			value: function lastSlide() {
				return this.slides[this.slides.length - 1];
			}
		}, {
			key: 'noSlides',
			value: function noSlides() {
				return this.slides.length ? false : true;
			}
		}, {
			key: 'countSlides',
			value: function countSlides() {
				return this.slides.length;
			}
		}, {
			key: 'slideLeft',
			value: function slideLeft() {
				var oldActiveId = this.findActiveSlide();
				if (oldActiveId) {
					var newActiveId = oldActiveId - 1;
					this.slides[oldActiveId].setState('passive');
					this.slides[newActiveId].setState('active');
					var slideLeftPos = parseInt(this.slides[newActiveId].posLeft, 10);
					this.animateTransition(true);
					this.setContainerPos(-slideLeftPos);
				}
			}
		}, {
			key: 'slideRight',
			value: function slideRight() {
				this.preLoadVideos();
				var oldActiveId = this.findActiveSlide(),
				    newActiveId = oldActiveId + 1;
				if (oldActiveId != this.slides.length - 1) {
					this.slides[oldActiveId].setState('passive');
					this.slides[newActiveId].setState('active');
					var slideLeftPos = parseInt(this.slides[newActiveId].posLeft, 10);
					this.animateTransition(true);
					this.setContainerPos(-slideLeftPos);
				}
			}
		}, {
			key: 'preLoadVideos',
			value: function preLoadVideos() {
				if (this.findActiveSlide() >= this.slides.length - 2) {
					this.loader.getVideos();
				}
			}
		}, {
			key: 'setContainerPos',
			value: function setContainerPos(pos) {
				document.getElementById('results').style.left = pos + 'px';
			}
		}, {
			key: 'animateTransition',
			value: function animateTransition(flag) {
				var container = document.getElementById('results');
				container.style.transition = flag ? "left .5s" : "left .0s";
			}
		}, {
			key: 'findActiveSlide',
			value: function findActiveSlide() {
				for (var i = 0; i < this.slides.length; i++) {
					if (this.slides[i].isActive()) {
						return i;
					}
				}
			}
		}, {
			key: 'backSlide',
			value: function backSlide() {
				var slideLeftPos = parseInt(this.slides[this.findActiveSlide()].posLeft, 10);
				this.animateTransition(true);
				this.setContainerPos(-slideLeftPos);
			}
		}, {
			key: 'pinSwipe',
			value: function pinSwipe() {
				var _this = this;
	
				document.getElementById('results').addEventListener('mousedown', function (e) {
					if (e.target.className == 'videoList') {
						swipe.mouseDown = true;
						swipe.x = e.pageX;
						swipe.y = e.pageY;
					}
				});
	
				document.getElementById('results').addEventListener('mousemove', function (e) {
					if (swipe.mouseDown && _this.slides.length) {
						var deltaX = swipe.x - e.pageX;
						var slideLeftPos = parseInt(_this.slides[_this.findActiveSlide()].posLeft, 10);
						_this.animateTransition(false);
						_this.setContainerPos(-slideLeftPos - deltaX);
					}
				});
				document.addEventListener('mouseup', function (e) {
					e.preventDefault();
					if (swipe.mouseDown) {
						var deltaX = swipe.x - e.pageX;
						if (deltaX < -150) {
							_this.slideLeft();
						} else {
							_this.backSlide();
						}
						if (deltaX > 150) {
							_this.slideRight();
						} else {
							_this.backSlide();
						}
						swipe.mouseDown = false;
					};
				});
			}
		}]);
	
		return SlideManager;
	}();
	
	exports.default = SlideManager;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Swipe = function Swipe() {
		_classCallCheck(this, Swipe);
	
		this.mouseDown = false;
		this.x = 0;
		this.y = 0;
	};
	
	exports.default = Swipe;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Slide = function () {
		function Slide(items, id, state) {
			_classCallCheck(this, Slide);
	
			this.items = Array.isArray(items) ? items : [items];
			this.id = id || 0;
			this.state = state;
		}
	
		_createClass(Slide, [{
			key: 'addItem',
			value: function addItem(item) {
				this.items.push(item);
			}
		}, {
			key: 'setState',
			value: function setState(state) {
				this.state = state;
			}
		}, {
			key: 'isActive',
			value: function isActive() {
				return this.state === 'active' ? true : false;
			}
	
			//
			// set items(items) {
			// 	this.items = items;
			// }
			//
			// get items() {
			// 	return this.items;
			// }
	
		}]);
	
		return Slide;
	}();
	
	exports.default = Slide;

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map