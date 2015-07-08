var app = angular.module("conversation-stack", ["ngMaterial"], function($provide) {
	$provide.decorator('$window', function($delegate) {
		$delegate.history = null;
		return $delegate;
	});
});
app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme("default");
//			.primaryPalette("red");
});
app.controller("mainController", mainController);

function main() {
	$("#close").addEventListener("click", closeApp);
}

function closeApp() {
	chrome.app.window.current().close();
}

window.$ = function(s) { return document.querySelector(s); };
document.addEventListener("readystatechange", function() { if (document.readyState === "complete") main(); });