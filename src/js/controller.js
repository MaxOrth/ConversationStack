/*
 * UI EVENTS, SETUP, ETC
 */
var UI = {
	isClosed: true, // whether side menu is closed
	prepped: false, // whether an open was prepped
	lastScroll: 0, // last scroll value
	scrollShrink: 0, // amount toolbar is shrunk
	lastTime: 0, // last time event listener was added
	current: "main", // current view
	view: [] // previous view 
};

function main() {
	var container = $("#container");
	
	// throttle
	throttle("touchmove", "tTouchMove", container);
	
	$("#close").addEventListener("click", closeApp);
	container.addEventListener("touchstart", menuTouch);
	container.addEventListener("tTouchmove", menuTouch);
	container.addEventListener("touchend", menuTouch);
	scrollListeners();
}

function scrollListeners() {
	var content = $(".mainContent");
	// don't try to add listener if el doesn't exist (e.g. during early ms of load) OR if not a mobile device OR if lots of these firing
	if (!content || !MOBILE || (Date.now() - UI.lastTime < 800)) return; 
	throttle("scroll", "tScroll", content);
	content.addEventListener("tScroll", scrollShrink);
	UI.lastTime = Date.now();
}

function closeApp() {
	chrome.app.window.current().close();
}

function scrollShrink(e) {
	var amt = e.target.scrollTop;
	var ds = amt - UI.lastScroll;
	var shrinkSpeed = 0.5;

	if (ds > 0 && UI.scrollShrink < 64) { // more to shrink
		UI.scrollShrink += ds * shrinkSpeed * 0.5;
		if (UI.scrollShrink > 64) UI.scrollShrink = 64;
	} else if (ds < 0 && UI.scrollShrink > 0) { // more to un-shrink
		UI.scrollShrink += ds * shrinkSpeed * 0.5;
		if (UI.scrollShrink < 0) UI.scrollShrink = 0;
	}
	$("md-toolbar").style.transform = "translate3d(0, -" + ~~UI.scrollShrink + "px, 0)";
	$("#tabContainer").style.transform = "translate3d(0, -" + (~~UI.scrollShrink + 1) + "px, 0)";

	UI.lastScroll = amt;
}

function menuTouch(e) {
	if (e.touches.length > 1) {
		return;
	}
	
	switch (e.type) {
		case "touchstart":
			UI.startX = e.touches[0].pageX;
			UI.startY = e.touches[0].pageY;
			break;
		case "touchmove":
			UI.dx = e.touches[0].pageX - UI.startX;
			var dy = e.touches[0].pageY - UI.startY;

			if (Math.abs(dy) < Math.abs(UI.dx)) {
				e.preventDefault();
			} else {
				return;
			}
			
			var el = $("#sidenav");
			if (UI.isClosed && UI.dx < 0) { // if swiping to open
				el.style.transform = "translate3d(" + UI.dx + "px, 0, 0)";
			} else if (UI.isClosed && UI.dx > 20 && UI.dx < 304) { // if swiping to close
				el.style.transform = "translate3d(" + (UI.dx - 304) + "px, 0, 0)";
			} else if (UI.isClosed && UI.dx > 0 && UI.dx < 20) { // prep for open
				UI.prepped = true;
				$("#sidenav").style.transform = "translate3d(-100%, 0, 0)";
				el.className = el.className.replace(/\bmd-closed\b/, ""); // remove md-closed class, which hides the element
			}
			break;
		case "touchend":
			if (UI.isClosed && UI.dx > 152) { // if it should be open
				$("#sidenav").style.transform = "translate3d(0%, 0, 0)";
				openSideMenu();
			} else if (!UI.isClosed && UI.dx < -152) { // it should be closed
				$("#sidenav").style.transform = "translate3d(-100%, 0, 0)";
				closeSideMenu();
			}
			
			if (UI.prepped && UI.isClosed) { // ensure it's closed
				$("#sidenav").className += " md-closed";
			}
			UI.prepped = false;
			
			$("#sidenav").style.transform = "";
			break;
	}
}

function mainController($scope, $mdSidenav, $mdUtil, $mdMedia) {
	$scope.topics = model.topics;
	$scope.agenda = model.agenda;
	
	$scope.openView = function(name) {
		// take care of any UI changes
		switch(UI.current) {
			case "main":
				$scope.closeMenu();
				break;
		}
		// switch
		setTimeout(function() {
			$("#view_"+ UI.current).style.display = "";
			$("#view_"+ name).style.display = "block";
			UI.view.push(UI.current);
			UI.current = name;
		}, 150);
	};
	
	$scope.back = function() {
		$scope.openView(UI.view.pop());
	};
	
	// toggle menu display on button click
	$scope.openMenu = $mdUtil.debounce(function() {
		$mdSidenav("menu").open();
		UI.isClosed = false;
	}, 50); // 50ms debounce wait
	// close menu on main body click
	$scope.closeMenu = $mdUtil.debounce(function() {
		$mdSidenav("menu").close();
		UI.isClosed = true;
	}, 50);
	
	$scope.connectListeners = scrollListeners;
	
	window.openSideMenu = $scope.openMenu;
	window.closeSideMenu = $scope.closeMenu;
	window.MOBILE = $mdMedia("sm");
}


// UI EVENT THROTTLER
function throttle (type, name, obj) {
	var obj = obj || window;
	var running = false;
	var func = function() {
		if (running) { return; }
		running = true;
		requestAnimationFrame(function() {
			obj.dispatchEvent(new CustomEvent(name));
			running = false;
		});
	};
	obj.addEventListener(type, func);
};