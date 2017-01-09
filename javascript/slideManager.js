import Layout from './layout';
import Swipe from './swipe';
import Slide from './slide';
import {
	maxCountInScreen,
} from './resize';


export default class SlideManager {
	constructor(loader) {
		this.loader = loader;
		this.slides = [];
		this.maxItems = 4;
		this.wasLeftSlide = false;
		this.swipe = new Swipe();
		this.layout = new Layout();
		this.buffer = [];
	}

	reInit() {
		this.animateTransition(false);
		this.slides = [];
		this.buffer = [];
		this.layout.clearResults();
		this.layout.clearFooter();
	}

	pushItem(video) {
		this.buffer.push(video);
		this.maxItems = maxCountInScreen()
		if (this.buffer.length === this.maxItems) {
			if (this.slides.length === 0) {
				this.slides.push(new Slide(this.buffer, 0, 'active'))
			} else {
				this.slides.push(new Slide(this.buffer,
					this.slides[this.slides.length - 1].id + 1))
			}
			this.layout.renderSlide(this.lastSlide());
			this.layout.addPageToFooter(this.countSlides())
			if (this.countSlides() === 1) {
				this.layout.makeActiveState(0)
			}
			this.buffer = [];
		}
	}

	pushItems(slides, countInSlide) {
		for (let i = 0; i < slides.length; i++) {
			slides[i].items.forEach(video => {
				this.pushItem(video);
			})
		}
	}

	lastSlide() {
		return this.slides[this.slides.length - 1];
	}

	noSlides() {
		return this.slides.length ? false : true;
	}

	countSlides() {
		return this.slides.length;
	}

	setActiveSLide(slideId) {
		if (slideId && slideId < this.countSlides()) {
			for (let i = 0; i < this.countSlides(); i++) {
				this.slides[i].setState('passive');
			}
			this.slides[slideId].setState('active');
		}
	}

	slideLeft(transitionId) {
		let oldActiveId = this.findActiveSlide();
		if (oldActiveId) {
			let newActiveId = typeof transitionId === 'number' ? transitionId : oldActiveId - 1;
			this.slides[oldActiveId].setState('passive');
			this.slides[newActiveId].setState('active');
			let slideLeftPos = parseInt(this.slides[newActiveId].posLeft, 10);
			this.animateTransition(true);
			this.resetLeftFlag();
			this.changeFooterPage(newActiveId);
			this.setContainerPos(-slideLeftPos);
		}
	}

	slideRight(transitionId) {
		let oldActiveId = this.findActiveSlide(),
			newActiveId = typeof transitionId === 'number' ? transitionId : oldActiveId + 1;
		if (oldActiveId != this.slides.length - 1) {
			this.slides[oldActiveId].setState('passive');
			this.slides[newActiveId].setState('active');
			let slideLeftPos = parseInt(this.slides[newActiveId].posLeft, 10);
			this.animateTransition(true);
			this.resetLeftFlag();
			this.changeFooterPage(newActiveId);
			this.setContainerPos(-slideLeftPos);
		}
		this.preLoadVideos();
	}

	changeFooterPage(newSlideId) {
		if (newSlideId == 1) {
			this.layout.changeValuesPages(newSlideId, this.slides.length)
			this.layout.makeActiveState(newSlideId);
		} else if (newSlideId == 0) {
			this.layout.makeActiveState(newSlideId);
		} else {
			this.layout.changeValuesPages(newSlideId - 1, this.slides.length)
			this.layout.makeActiveState(2);
		}
	}

	preLoadVideos() {
		if (this.findActiveSlide() >= this.slides.length - 2) {
			this.loader.getVideos();
		}
	}

	setContainerPos(pos) {
		document.getElementById('results').style.left = pos + 'px';
	}

	animateTransition(flag) {
		let container = document.getElementById('results');
		container.style.transition = flag ? "left .5s" : "left .0s";
	}

	findActiveSlide() {
		for (let i = 0; i < this.slides.length; i++) {
			if (this.slides[i].isActive()) {
				return i;
			}
		}
	}

	backSlide() {
		let slideLeftPos = parseInt(this.slides[this.findActiveSlide()].posLeft, 10);
		this.animateTransition(true)
		this.setContainerPos(-slideLeftPos);
	}

	setLeftFlag(slideId) {
		console.log(this.slides[slideId].items[0].title)
		this.slides[slideId].items[0].left = true;
		this.wasLeftSlide = true;
	}

	resetLeftFlag() {
		if (this.wasLeftSlide) {
			for (let i = 0; i < this.countSlides(); i++) {
				this.slides[i].items.forEach(video => {
					if (video.left) video.left = false;
				})
			}
			this.wasLeftSlide = false;
		}
	}

	findSlideByLeftFlag() {
		for (let i = 0; i < this.countSlides(); i++) {
			for (let j = 0; j < this.slides[i].items.length; j++) {
				if (this.slides[i].items[j].left) return i;
			}
		}
	}

	pinListeners() {
		this.pinSwipe();
		this.pinTransitionPage();
		this.pinResize();
	}

	pinTransitionPage() {
		document.querySelector('.pagination').addEventListener('click', e => {
			if (e.target.className == 'page') {
				let currentSlide = this.findActiveSlide(),
					newSlide = parseInt(e.target.innerHTML, 10) - 1;
				if (newSlide > currentSlide) {
					this.slideRight(newSlide);
				} else if (newSlide < currentSlide) {
					this.slideLeft(newSlide);
				}
			}
		})
	}

	pinResize() {
		window.addEventListener('resize', () => {
			if (this.countSlides()) {
				let wasActiveSlideId = this.findActiveSlide();
				if (!this.wasLeftSlide) {
					this.setLeftFlag(wasActiveSlideId)
				} else {
					let slides = this.slides;
					this.reInit();
					this.pushItems(slides);
					let resizedSlideId = this.findSlideByLeftFlag();
					this.setActiveSLide(resizedSlideId)
					this.setContainerPos(-resizedSlideId * document.documentElement.clientWidth)
					this.changeFooterPage(resizedSlideId)
				}
			}
		})
	}


	pinSwipe() {
		document.getElementById('results').addEventListener('mousedown', (e) => {
			e.preventDefault();
			this.swipe.mouseDown = true;
			this.swipe.x = e.pageX;
			this.swipe.y = e.pageY;
		});

		document.getElementById('results').addEventListener('mousemove', e => {
			if (this.swipe.mouseDown && this.slides.length) {
				let deltaX = this.swipe.x - e.pageX;
				let slideLeftPos = parseInt(this.slides[this.findActiveSlide()].posLeft, 10);
				this.animateTransition(false)
				this.setContainerPos(-slideLeftPos - deltaX);
			}
		});
		document.addEventListener('mouseup', (e) => {
			e.preventDefault();
			if (this.swipe.mouseDown) {
				let deltaX = this.swipe.x - e.pageX;
				if (deltaX < -150) {
					this.slideLeft();
				} else {
					this.backSlide()
				}
				if (deltaX > 150) {
					this.slideRight();
				} else {
					this.backSlide()
				}
				this.swipe.mouseDown = false;
			};
		});
	}
}
