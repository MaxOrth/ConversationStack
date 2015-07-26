/*
 * ANGULAR SETUP AND CONFIGURATION
 */

Colors = {
	"main": "red",
	"plan": "green",
	"review": "amber",
	"settings": "grey",
	"help": "indigo",
	"secondary": "blue",
        "graph": "purple",
};


window.app = angular.module("conversation-stack", ["ngMaterial"], function($provide) {
	// stuff for angular to not freak out with chrome apps
	$provide.decorator('$window', function($delegate) {
		$delegate.history = null;
		return $delegate;
	});
});
// themes
app.config(function($mdThemingProvider) {
	for (var i in Colors) {
		$mdThemingProvider.theme(i).primaryPalette(Colors[i]).accentPalette(Colors.secondary);
	}
});
// controller
app.controller("mainController", mainController);
	
function main() {
	// SET UP MODEL
	model.onload();
	// SETUP UI AND CONTROLLER
	uiSetup();
}


/*
 * HELPER FUNCTIONS
 */
storage = {
	save: function(key, value) {
		var storageArea = model.settings.syncData ? chrome.storage.sync : chrome.storage.local;
		var obj = {};
		obj[key] = value;
		storageArea.set(obj, LOGRF);
	},
	saveLocal: function(key, value) {
		var storageArea = chrome.storage.local;
		var obj = {};
		obj[key] = value;
		storageArea.set(obj, LOGRF);
	},
	load: function(key, callback, defaultValue) {
		var storageArea = model.settings.syncData ? chrome.storage.sync : chrome.storage.local;
		storageArea.get(key, function(data) {
			if (chrome.runtime.lastError) { // could not get data
				console.log(chrome.runtime.lastError);
				return;
			}
			if (data.hasOwnProperty(key)) {
				callback(data[key]); // return the value
			} else {
				callback(defaultValue);
			}
		});
	},
	loadLocal: function(key, callback, defaultValue) {
		var storageArea = chrome.storage.local;
		storageArea.get(key, function(data) {
			if (chrome.runtime.lastError) { // could not get data
				console.log(chrome.runtime.lastError);
				return;
			}
			if (data.hasOwnProperty(key)) {
				callback(data[key]); // return the value
			} else {
				callback(defaultValue);
			}
		});
	},
	remove: function(key) {
		var storageArea = model.settings.syncData ? chrome.storage.sync : chrome.storage.local;
		storageArea.remove(key);
	},
	clearAll: function(mode) {
		var storageArea = chrome.storage[mode];
		storageArea.clear();
	}
};

window.$ = function(s) { return document.querySelector(s); };
window.$$ = function(s) { return document.querySelectorAll(s); };
window.LOGF = function(a) { console.log(a); };
window.LOGRF = function() { console.log(chrome.runtime.lastError); };
document.addEventListener("readystatechange", function() { if (document.readyState === "complete") main(); });
