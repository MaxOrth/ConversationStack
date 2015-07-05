function main() {
	
}


window.$ = function(s) { return document.querySelector(s); };
document.onreadystatechange = function() { if (document.readyState === "complete") main(); };