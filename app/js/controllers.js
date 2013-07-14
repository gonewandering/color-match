'use strict';

/* Controllers */

function HomeCtrl($scope) {

	$scope.color = "006699";
     
	$scope.colors = {};
	
	$scope.outfit = {};
	
	$scope.colors.color = [];
	$scope.colors.accents = [];
	$scope.colors.complements = [];
	$scope.colors.neutrals = [];
	
	var activeColor = {
		type: null,
		num: null
	};
	
	var map = {
		glasses: { type: "complements", num: 0 },
		earrings: { type: "complements", num: 1 },
		shirt: { type: "color", num: 0 },
		jacket: { type: "accents", num: 1 },
		purse: { type: "complements", num: 1 },
		skirt: { type: "neutrals", num: 1 },
		buttons: { type: "complements", num: 0 },
		boots: { type: "neutrals", num: 0 }
	};
	
	$scope.setOutfit = function () {
		for (var item in map) {
			$scope.outfit[item] = $scope.colors[map[item].type][map[item].num];
		}
	}
	
	$scope.setItem = function (item) {
		console.log(item);
		console.log($scope.colors[activeColor.type][activeColor.num]);
		
		map[item].type = activeColor.type;
		map[item].num = activeColor.num;

		$scope.setOutfit();
	}
	
	$scope.activeColor = function (type, num) { 
		activeColor = {
			type: type,
			num: num
		};
	}

  	$scope.getColors = function () {
  		$scope.color = $scope.color.replace("#", "");
		
  		if ($scope.color.length) {
  			var colors = tinycolor($scope.color);
  			$scope.colors.color = [tinycolor.lighten(colors, 0).toHex(), tinycolor.lighten(colors, 10).toHex(), tinycolor.lighten(colors, 30).toHex() ]
	  		var triad = tinycolor.triad($scope.color);
		  	$scope.colors.accents=[triad[0].toHex(), triad[1].toHex(), triad[2].toHex()];
		  	
		  	var comp = tinycolor.complement($scope.color);
		  	var splitComp = tinycolor.splitcomplement($scope.color);
		  	$scope.colors.complements=[comp.toHex(), splitComp[1].toHex(), splitComp[2].toHex()];
		  	
		  	var neutrals = tinycolor.neutral($scope.color);
		  	$scope.colors.neutrals =[neutrals[0].toHex(), neutrals[1].toHex(), neutrals[2].toHex()];
	  	}
	  	
	  	$scope.setOutfit();
  	}
  	
    $('#colorpicker').farbtastic(function (farbe) { 
	    farbe = farbe.replace("#", "");
	    $scope.$apply(function() { 
	    	$scope.color = farbe;
	    	$scope.getColors();
	    });
    });
    
    $scope.$watch("color", function () { $scope.getColors(); });
}