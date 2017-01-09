export default class Layout {
	constructor(loader) {
		this.loader = loader;
	}

	init() {
		this.renderContainer();
		this.renderFooter();
	}

	renderContainer() {
		let container = document.createElement('div'),
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

	renderForm() {
		let form = document.createElement('form');
		form.setAttribute('id', 'search-form');
		form.setAttribute('action', '#');
		document.getElementById('header-site').appendChild(form);
		this.renderIcon();
		this.renderInput();
		this.renderButton();
	}

	renderIcon() {
		let img = document.createElement('img');
		img.setAttribute('src', './images/youtube.png');
		img.setAttribute('id', 'youtube-icon');
		document.getElementById('search-form').appendChild(img);
		img.addEventListener('click', () => {
			this.clearResults();
			document.getElementById('search-input').value = '';
			document.getElementById('results').style.left = '0px';
		});
	}

	renderInput() {
		let input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('id', 'search-input');
		input.setAttribute('autofocus', 'true');
		input.addEventListener('keyup', e => {
			if (e.keyCode === 13) {
				this.startSearch();
			}
		});
		document.getElementById('search-form').appendChild(input);
	}

	renderButton() {
		let searchButton = document.createElement('button'),
			span = document.createElement('span');
		searchButton.setAttribute('type', 'submit');
		searchButton.setAttribute('id', 'search-button');
		span.setAttribute('id', 'search-icon');
		searchButton.appendChild(span);
		searchButton.addEventListener('click', () => {
			this.startSearch();
		});
		document.getElementById('search-form').appendChild(searchButton);
	}

	startSearch() {
		this.clearResults();
		let inputVal = document.getElementById('search-input').value;
		inputVal = inputVal.trim();
		if (inputVal.length) {
			document.getElementById('results').style.left = '0px';
			this.loader.loadVideos(inputVal);
		}
	}

	renderSlides(slides) {
		this.clearResults();
		slides.forEach(slide => {
			this.renderSlide(slide);
		});
	}

	renderSlide(slide) {
		let slideDiv = document.createElement('div'),
			videoList = document.createElement('ul');
		slideDiv.setAttribute('class', 'slide');
		videoList.setAttribute('class', 'videoList');
		slideDiv.appendChild(videoList);
		document.getElementById('results').appendChild(slideDiv);
		slideDiv.style.left = slide.id * document.documentElement.clientWidth + 'px';
		slide.posLeft = slideDiv.style.left;
		slide.items.forEach(item => {
			this.renderVideo(item, videoList);
		});
	}

	renderVideo(video, videoList) {
		let li = document.createElement('li'),
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

	renderTitle(li, title, href) {
		let titleDiv = document.createElement('div'),
			h3 = document.createElement('h3'),
			a = document.createElement('a');
		a.setAttribute('href', href);
		titleDiv.setAttribute('class', 'title-video');
		h3.innerHTML = title;
		a.appendChild(h3);
		titleDiv.appendChild(a);
		li.appendChild(titleDiv);
	}

	renderImg(li, href, img) {
		let imageDiv = document.createElement('div'),
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

	pinIframeOnImg(img, play, iframe, imageDiv) {
		play.addEventListener('click', e => {
			this.renderIframe(iframe, imageDiv);
			img.style.display = 'none';
			iframe.style.display = 'flex';
			e.preventDefault();
			play.style.display = 'none';
		});
	}

	renderIframe(iframe, imageDiv) {
		iframe.setAttribute('frameborder', '0');
		iframe.setAttribute('allowfullscreen', '');
		imageDiv.appendChild(iframe);
	}

	renderDate(li, date) {
		this.renderItem(li, date, 'fa fa-calendar');
	}

	renderChannel(li, channel) {
		this.renderItem(li, channel, 'fa fa-user-circle-o');
	}

	renderDescription(li, description) {
		this.renderItem(li, description, 'fa fa-pencil');
	}

	renderItem(li, item, classIcon) {
		let itemDiv = document.createElement('div'),
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

	renderViewInfo(li, views, likes, dislikes, comments) {
		let viewDiv = document.createElement('div'),
			ul = document.createElement('ul');
		viewDiv.setAttribute('class', 'views-info');
		this.renderViewItem(ul, 'fa fa-eye', views);
		this.renderViewItem(ul, 'fa fa-thumbs-o-up', likes);
		this.renderViewItem(ul, 'fa fa-thumbs-o-down', dislikes);
		this.renderViewItem(ul, 'fa fa-comment-o', comments);
		viewDiv.appendChild(ul);
		li.appendChild(viewDiv);
	}

	renderViewItem(ul, iconClass, count) {
		let li = document.createElement('li'),
			icon = document.createElement('i'),
			p = document.createElement('p');
		icon.setAttribute('class', iconClass);
		li.appendChild(icon);
		p.innerHTML = count ? count : 0;
		li.appendChild(p);
		ul.appendChild(li);
	}

	renderFooter() {
		let footer = document.createElement('div'),
			pagination = document.createElement('ul');
		footer.setAttribute('class', 'footer');
		pagination.setAttribute('class', 'pagination');
		footer.appendChild(pagination);
		document.body.appendChild(footer);
	}

	clearFooter() {
		let pagination = document.querySelector('.pagination');
		pagination.innerHTML = '';
	}

	removeActivePage() {
		let pages = document.querySelector('.pagination').children;
		for (let i = 0; i < pages.length; i++) {
			pages[i].className = "";
		}
	}

	makeActivePage(page) {
		this.removeActivePage();
		if (typeof page != 'number') {
			page.classList.add('active');
		} else {
			document.querySelector('.pagination').children[page].classList.add('active');
		}
	}

	addPageToFooter(newPageId) {
		let pagination = document.querySelector('.pagination');
		if (pagination.children.length < 5) {
			let li = document.createElement('li'),
				link = document.createElement('a');
			link.setAttribute('class', 'page');
			link.innerHTML = newPageId;
			li.appendChild(link);
			pagination.appendChild(li);
		}
	}

	getActivePageId() {
		let pages = document.querySelector('.pagination').children;
		for (let i = 0; i < pages.length; i++) {
			if (pages[i].className == 'active') {
				return i;
			}
		}
	}

	changeValuesPages(start, end) {
		this.clearFooter();
		for (let i = start; i <= end; i++) {
			this.addPageToFooter(i);
		}
	}

	clearResults() {
		document.getElementById('results').innerHTML = '';
		document.getElementById('search-input').focus();
		this.clearFooter();
	}

	isEmpty() {
		return document.getElementById('results').innerHTML ? false : true;
	}

}
