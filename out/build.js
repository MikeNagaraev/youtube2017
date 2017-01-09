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
	
	var _loader = __webpack_require__(2);
	
	var _loader2 = _interopRequireDefault(_loader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var loader = new _loader2.default();
	var layout = new _layout2.default(loader);
	layout.init();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Layout = function () {
		function Layout(loader) {
			_classCallCheck(this, Layout);
	
			this.loader = loader;
		}
	
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
				var inputVal = document.getElementById('search-input').value;
				inputVal = inputVal.trim();
				if (inputVal.length) {
					document.getElementById('results').style.left = '0px';
					this.loader.loadVideos(inputVal);
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
				footer.setAttribute('class', 'footer');
				pagination.setAttribute('class', 'pagination');
				footer.appendChild(pagination);
				document.body.appendChild(footer);
			}
		}, {
			key: 'clearFooter',
			value: function clearFooter() {
				var pagination = document.querySelector('.pagination');
				pagination.innerHTML = '';
			}
		}, {
			key: 'removeActiveState',
			value: function removeActiveState() {
				var pages = document.querySelector('.pagination').children;
				for (var i = 0; i < pages.length; i++) {
					pages[i].className = "";
				}
			}
		}, {
			key: 'makeActiveState',
			value: function makeActiveState(page) {
				this.removeActiveState();
				if (typeof page != 'number') {
					page.classList.add('active');
				} else {
					document.querySelector('.pagination').children[page].classList.add('active');
				}
			}
		}, {
			key: 'addPageToFooter',
			value: function addPageToFooter(newPageId) {
				var pagination = document.querySelector('.pagination');
				if (pagination.children.length < 5) {
					var li = document.createElement('li'),
					    link = document.createElement('a');
					link.setAttribute('class', 'page');
					link.innerHTML = newPageId;
					li.appendChild(link);
					pagination.appendChild(li);
				}
			}
		}, {
			key: 'getActivePageId',
			value: function getActivePageId() {
				var pages = document.querySelector('.pagination').children;
				for (var i = 0; i < pages.length; i++) {
					if (pages[i].className == 'active') {
						return i;
					}
				}
			}
		}, {
			key: 'changeValuesPages',
			value: function changeValuesPages(start, end) {
				this.clearFooter();
				for (var i = start; i <= end; i++) {
					this.addPageToFooter(i);
				}
			}
	
			/////// TODO ///////
	
		}, {
			key: 'addPreviousPage',
			value: function addPreviousPage() {
				var li = document.createElement('li'),
				    link = document.createElement('a');
				link.innerHTML = 'Previous';
				li.appendChild(link);
				document.querySelector('.pagination').insertBefore(li);
			}
		}, {
			key: 'addNextPage',
			value: function addNextPage() {}
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
			this.value = '';
			this.wasLoaded = false;
		}
	
		_createClass(Loader, [{
			key: 'loadVideos',
			value: function loadVideos(valueQuery) {
				this.value = valueQuery;
				if (this.wasLoaded) {
					this.nextPage = '';
					this.manager.reInit();
				} else {
					this.manager = new _slideManager2.default(this);
					this.wasLoaded = true;
					this.manager.pinListeners();
				}
				this.getVideos();
	
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
	
	var _resize = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SlideManager = function () {
		function SlideManager(loader) {
			_classCallCheck(this, SlideManager);
	
			this.loader = loader;
			this.slides = [];
			this.maxItems = 4;
			this.wasLeftSlide = false;
			this.swipe = new _swipe2.default();
			this.layout = new _layout2.default();
			this.buffer = [];
		}
	
		_createClass(SlideManager, [{
			key: 'reInit',
			value: function reInit() {
				this.animateTransition(false);
				this.slides = [];
				this.buffer = [];
				this.layout.clearResults();
				this.layout.clearFooter();
			}
		}, {
			key: 'pushItem',
			value: function pushItem(video) {
				this.buffer.push(video);
				this.maxItems = (0, _resize.maxCountInScreen)();
				if (this.buffer.length === this.maxItems) {
					if (this.slides.length === 0) {
						this.slides.push(new _slide2.default(this.buffer, 0, 'active'));
					} else {
						this.slides.push(new _slide2.default(this.buffer, this.slides[this.slides.length - 1].id + 1));
					}
					this.layout.renderSlide(this.lastSlide());
					this.layout.addPageToFooter(this.countSlides());
					if (this.countSlides() === 1) {
						this.layout.makeActiveState(0);
					}
					this.buffer = [];
				}
			}
		}, {
			key: 'pushItems',
			value: function pushItems(slides, countInSlide) {
				var _this = this;
	
				for (var i = 0; i < slides.length; i++) {
					slides[i].items.forEach(function (video) {
						_this.pushItem(video);
					});
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
			key: 'setActiveSLide',
			value: function setActiveSLide(slideId) {
				if (slideId && slideId < this.countSlides()) {
					for (var i = 0; i < this.countSlides(); i++) {
						this.slides[i].setState('passive');
					}
					this.slides[slideId].setState('active');
				}
			}
		}, {
			key: 'slideLeft',
			value: function slideLeft(transitionId) {
				var oldActiveId = this.findActiveSlide();
				if (oldActiveId) {
					var newActiveId = typeof transitionId === 'number' ? transitionId : oldActiveId - 1;
					this.slides[oldActiveId].setState('passive');
					this.slides[newActiveId].setState('active');
					var slideLeftPos = parseInt(this.slides[newActiveId].posLeft, 10);
					this.animateTransition(true);
					this.resetLeftFlag();
					this.changeFooterPage(newActiveId);
					this.setContainerPos(-slideLeftPos);
				}
			}
		}, {
			key: 'slideRight',
			value: function slideRight(transitionId) {
				var oldActiveId = this.findActiveSlide(),
				    newActiveId = typeof transitionId === 'number' ? transitionId : oldActiveId + 1;
				if (oldActiveId != this.slides.length - 1) {
					this.slides[oldActiveId].setState('passive');
					this.slides[newActiveId].setState('active');
					var slideLeftPos = parseInt(this.slides[newActiveId].posLeft, 10);
					this.animateTransition(true);
					this.resetLeftFlag();
					this.changeFooterPage(newActiveId);
					this.setContainerPos(-slideLeftPos);
				}
				this.preLoadVideos();
			}
		}, {
			key: 'changeFooterPage',
			value: function changeFooterPage(newSlideId) {
				if (newSlideId == 1) {
					this.layout.changeValuesPages(newSlideId, this.slides.length);
					this.layout.makeActiveState(newSlideId);
				} else if (newSlideId == 0) {
					this.layout.makeActiveState(newSlideId);
				} else {
					this.layout.changeValuesPages(newSlideId - 1, this.slides.length);
					this.layout.makeActiveState(2);
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
			key: 'setLeftFlag',
			value: function setLeftFlag(slideId) {
				console.log(this.slides[slideId].items[0].title);
				this.slides[slideId].items[0].left = true;
				this.wasLeftSlide = true;
			}
		}, {
			key: 'resetLeftFlag',
			value: function resetLeftFlag() {
				if (this.wasLeftSlide) {
					for (var i = 0; i < this.countSlides(); i++) {
						this.slides[i].items.forEach(function (video) {
							if (video.left) video.left = false;
						});
					}
					this.wasLeftSlide = false;
				}
			}
		}, {
			key: 'findSlideByLeftFlag',
			value: function findSlideByLeftFlag() {
				for (var i = 0; i < this.countSlides(); i++) {
					for (var j = 0; j < this.slides[i].items.length; j++) {
						if (this.slides[i].items[j].left) return i;
					}
				}
			}
		}, {
			key: 'pinListeners',
			value: function pinListeners() {
				this.pinSwipe();
				this.pinTransitionPage();
				this.pinResize();
			}
		}, {
			key: 'pinTransitionPage',
			value: function pinTransitionPage() {
				var _this2 = this;
	
				document.querySelector('.pagination').addEventListener('click', function (e) {
					if (e.target.className == 'page') {
						var currentSlide = _this2.findActiveSlide(),
						    newSlide = parseInt(e.target.innerHTML, 10) - 1;
						if (newSlide > currentSlide) {
							_this2.slideRight(newSlide);
						} else if (newSlide < currentSlide) {
							_this2.slideLeft(newSlide);
						}
					}
				});
			}
		}, {
			key: 'pinResize',
			value: function pinResize() {
				var _this3 = this;
	
				window.addEventListener('resize', function () {
					if (_this3.countSlides()) {
						var wasActiveSlideId = _this3.findActiveSlide();
						if (!_this3.wasLeftSlide) {
							_this3.setLeftFlag(wasActiveSlideId);
						} else {
							var slides = _this3.slides;
							_this3.reInit();
							_this3.pushItems(slides);
							var resizedSlideId = _this3.findSlideByLeftFlag();
							_this3.setActiveSLide(resizedSlideId);
							_this3.setContainerPos(-resizedSlideId * document.documentElement.clientWidth);
							_this3.changeFooterPage(resizedSlideId);
						}
					}
				});
			}
		}, {
			key: 'pinSwipe',
			value: function pinSwipe() {
				var _this4 = this;
	
				document.getElementById('results').addEventListener('mousedown', function (e) {
					e.preventDefault();
					_this4.swipe.mouseDown = true;
					_this4.swipe.x = e.pageX;
					_this4.swipe.y = e.pageY;
				});
	
				document.getElementById('results').addEventListener('mousemove', function (e) {
					if (_this4.swipe.mouseDown && _this4.slides.length) {
						var deltaX = _this4.swipe.x - e.pageX;
						var slideLeftPos = parseInt(_this4.slides[_this4.findActiveSlide()].posLeft, 10);
						_this4.animateTransition(false);
						_this4.setContainerPos(-slideLeftPos - deltaX);
					}
				});
				document.addEventListener('mouseup', function (e) {
					e.preventDefault();
					if (_this4.swipe.mouseDown) {
						var deltaX = _this4.swipe.x - e.pageX;
						if (deltaX < -150) {
							_this4.slideLeft();
						} else {
							_this4.backSlide();
						}
						if (deltaX > 150) {
							_this4.slideRight();
						} else {
							_this4.backSlide();
						}
						_this4.swipe.mouseDown = false;
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
			this.state = state || 'passive';
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

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// const resize = () => {
	// 	let widthScreen = document.documentElement.clientWidth;
	// 	// if (wasSize >= widthScreen) {
	// 	// 	console.log(wasSize, widthScreen)
	// 	// 	return;
	// 	// }
	// 	return maxCountInScreen();
	// }
	
	var maxCountInScreen = function maxCountInScreen() {
		var widthScreen = document.documentElement.clientWidth;
		switch (true) {
			case widthScreen <= 800:
				return 1;
			case widthScreen <= 1150:
				return 2;
			case widthScreen <= 1600:
				return 3;
			case widthScreen <= 1920:
				return 4;
			default:
				return 4;
		}
	};
	
	//
	// const calculateSlides = maxCount => slides => {
	//
	// }
	
	exports.maxCountInScreen = maxCountInScreen;

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map