function mainController($scope, $mdSidenav, $mdUtil, $mdMedia) {
	$scope.topics = model.topics;
	$scope.agenda = model.agenda;
	
	$scope.$watch($mdMedia.bind("sm"), function(oldValue, newValue) {
		if (newValue) {
			$("md-toolbar").setAttribute("scroll-shrink", "");
		} else {
			$("md-toolbar").removeAttribute("scroll-shrink");
		}
	});
	$scope.$watch(function() {
		var shift = parseFloat(a.style.webkitTransform.split("px,")[1]);
		return (innerHeight - 64 - shift) + "px";
	}, function(oldValue, newValue) {
		$("#mainContent").style.height = newValue;
	});
	
//	// toggle menu display on button click
//	$scope.toggleMenu = $mdUtil.debounce(function() {
//		$mdSidenav("menu").toggle();
//	}, 50); // 50ms debounce wait
//	// close menu on main body click
//	$scope.closeMenu = $mdSidenav("menu").close;
}

