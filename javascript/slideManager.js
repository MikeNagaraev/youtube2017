import Layout from './layout';
import Swipe from './swipe';
import Slide from './slide';

const maxItemsInSlide = 4;
let swipe = new Swipe();
export default class SlideManager {
	constructor(loader) {
		this.loader = loader;
		this.slides = [];
		this.resize = false;
		this.layout = new Layout();
		this.buffer = [];
	}

	reInit() {
		this.animateTransition(false);
		this.slides = [];
		this.buffer = [];
	}

	pushItem(item) {
		this.buffer.push(item);
		if (this.buffer.length === maxItemsInSlide) {
			if (this.slides.length === 0) {
				this.slides.push(new Slide(this.buffer, 0, 'active'))
			} else {
				this.slides.push(new Slide(this.buffer,
					this.slides[this.slides.length - 1].id + 1, 'passive'))
			}
			this.layout.renderSlide(this.lastSlide());
			this.buffer = [];
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

	slideLeft() {
		let oldActiveId = this.findActiveSlide();
		if (oldActiveId) {
			let newActiveId = oldActiveId - 1;
			this.slides[oldActiveId].setState('passive');
			this.slides[newActiveId].setState('active');
			let slideLeftPos = parseInt(this.slides[newActiveId].posLeft, 10);
			this.animateTransition(true)
			this.setContainerPos(-slideLeftPos);
		}
	}

	slideRight() {
		this.preLoadVideos();
		let oldActiveId = this.findActiveSlide(),
			newActiveId = oldActiveId + 1;
		if (oldActiveId != this.slides.length - 1) {
			this.slides[oldActiveId].setState('passive');
			this.slides[newActiveId].setState('active');
			let slideLeftPos = parseInt(this.slides[newActiveId].posLeft, 10);
			this.animateTransition(true)
			this.setContainerPos(-slideLeftPos);
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

	pinSwipe() {
		document.getElementById('results').addEventListener('mousedown', (e) => {
			if (e.target.className == 'videoList') {
				swipe.mouseDown = true;
				swipe.x = e.pageX;
				swipe.y = e.pageY;
			}
		});

		document.getElementById('results').addEventListener('mousemove', e => {
			if (swipe.mouseDown && this.slides.length) {
				let deltaX = swipe.x - e.pageX;
				let slideLeftPos = parseInt(this.slides[this.findActiveSlide()].posLeft, 10);
				this.animateTransition(false)
				this.setContainerPos(-slideLeftPos - deltaX);
			}
		});
		document.addEventListener('mouseup', (e) => {
			e.preventDefault();
			if (swipe.mouseDown) {
				let deltaX = swipe.x - e.pageX;
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
				swipe.mouseDown = false;
			};
		});
	}
}
