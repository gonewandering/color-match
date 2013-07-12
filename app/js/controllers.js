'use strict';

/* Controllers */

function HomeCtrl($scope) {

		$scope.searchWord = "Pancake";
		
		$scope.colors = [
			"#666",
			"#999",
			"#333"
		];
		
	  	$scope.getColors = function () { 
		  	var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		  	var alpha1 = "Jumblingvextfrowzyhacks".toUpperCase();  
		  	
		  	$scope.colors[0] = convertColor($scope.searchWord, alpha);
		  	$scope.colors[1] = convertColor($scope.searchWord, alpha.split("").reverse().join(""));
		  	$scope.colors[2] = convertColor($scope.searchWord, alpha1);
	  	}
	  	
	  	$scope.getColors();
	  	
  }
  
  function convertColor(word, alpha) {
  	  word = word.toUpperCase();
  	  var wordArray = [];
  	  var avg = 0;
  	  
	  for(var i in word.split("")) {
		  var letnum = alpha.indexOf(word[i])+1;
		  wordArray.push(letnum);
	  }
	  
	var sum = wordArray.reduce(function(a, b) { return a + b });
	var avg = sum / wordArray.length;
	var ratio = Math.round(16777215*(avg/26));
	
	return(ratio.toString(16));
  }
  
  String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
  }