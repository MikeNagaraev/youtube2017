const apiKey = 'AIzaSyAeSlcNwi1BcFtSx_LX6Yv3o-OozPJ5aLk'; //AIzaSyBq_TNf3mo1y7mI6Yrtb23E5t1qA7eZlxEx
//
//
import SlideManager from './slideManager'
const maxQueryCount = 15;
export default class Loader {
	constructor() {
		this.queryCount = maxQueryCount;
		this.nextPage = '';
		this.value = '';
		this.wasLoaded = false;
	}

	loadVideos(valueQuery) {
		this.value = valueQuery;
		console.log(this.wasLoaded)
		if (this.wasLoaded) {
			this.nextPage = '';
			this.manager.reInit();
		} else {
			this.manager = new SlideManager(this);
			this.wasLoaded = true;
			this.manager.pinSwipe()
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

	getVideos() {
			const searchUrl = 'https://www.googleapis.com/youtube/v3/search?pageToken=';

			let url = searchUrl + (this.nextPage ? this.nextPage : '') +
				'&part=snippet&maxResults=' + maxQueryCount +
				'&q=' + this.value + '&key=' + apiKey,
				items;
			const statisticsUrl = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=';
			fetch(url)
				.then(response => response.json())
				.then(response => {
					this.nextPage = response.nextPageToken;
					items = response.items;
					return items;
				})
				.then(items => {
					items = this.formObjects(items)
					return items.slice(1, items.length);
				})
				.then(videoObjs => {
					this.pushStatistics(videoObjs)
				})
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

	formObjects(arrayVideos) {
		let result = [];
		arrayVideos.forEach(video => {
			result.push(this.getVideoObject(video));
		})
		return result;
	}

	getVideoObject(item) {
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

	pushStatistics(videos) {
		const statisticsUrl = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=';
		videos.forEach((item) => {
			if (item.videoId != '') {
				let url = statisticsUrl + item.videoId + '&key=' + apiKey;
				fetch(url).then(response => response.json())
					.then(statistic => {
						item.views = statistic.items[0].statistics.viewCount;
						item.likes = statistic.items[0].statistics.likeCount;
						item.dislikes = statistic.items[0].statistics.dislikeCount;
						item.comments = statistic.items[0].statistics.commentCount;
						this.manager.pushItem(item);
					}).catch(err => console.log(err))
			}
		})
	}
}
