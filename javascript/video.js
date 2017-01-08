export default class Video {
	constructor(video) {
		this.hrefYouTube = video.href;
		this.iframe = video.iframe;
		this.title = video.title;
		this.imgUrl = video.imgUrl;
		this.channel = video.channel;
		this.date = video.date;
		this.views = video.views;
		this.likes = video.likes;
		this.dislikes = video.dislikes;
		this.comments = video.comments;
		this.description = video.description;
	}
}
