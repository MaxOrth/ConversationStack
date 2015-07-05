chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create("index.html", {
		"outerBounds": {
			width: 960,
			height: 720
		},
		"frame": {
			color: "#fafafa"
		}
	});
});