const maxCountInScreen = () => {
	let widthScreen = document.documentElement.clientWidth;
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
}

export {
	maxCountInScreen,
}
