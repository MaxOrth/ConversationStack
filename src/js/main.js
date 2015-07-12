/*
 * ANGULAR SETUP AND CONFIGURATION
 */

var app = angular.module("conversation-stack", ["ngMaterial"], function($provide) {
	// stuff for angular to not freak out with chrome apps
	$provide.decorator('$window', function($delegate) {
		$delegate.history = null;
		return $delegate;
	});
});
// themes
app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme("main").primaryPalette("red");
	$mdThemingProvider.theme("settings").primaryPalette("grey");
	$mdThemingProvider.theme("help").primaryPalette("indigo");
});
// controller
app.controller("mainController", mainController);
// directives
app.directive("navContent", function() {
	return {
		restrict: 'E',
		templateUrl: 'nav.html'
	};
});


/*
 * HELPER FUNCTIONS
 */

window.$ = function(s) { return document.querySelector(s); };
window.$$ = function(s) { return document.querySelectorAll(s); };
document.addEventListener("readystatechange", function() { if (document.readyState === "complete") main(); });