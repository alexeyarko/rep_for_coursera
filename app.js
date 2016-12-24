	(function () {
        'use strict';
        angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

		LunchCheckController.$inject = ['$scope'];

		function LunchCheckController ($scope) {
			$scope.name = "";
			$scope.msgText = "";

			$scope.tooMuch = function () {
				var i = 0;
				var inputString = $scope.name;
				
				if (inputString == "" || inputString == undefined) {
					$scope.msgText = "Please enter data first";
					$scope.colorMsg = "color_msg_red";
					$scope.colorTextBox = "color_text_box_red";
				}
				else{	
					var iArray = inputString.split(","); 
					var colItems = iArray.length;
					if (colItems <= 3) 
						{
							$scope.msgText = "Enjoy! ";
							$scope.colorMsg = "color_msg_green";
							$scope.colorTextBox = "color_text_box_green";
						}
					else
						{
							$scope.msgText = "Too much! ";
							$scope.colorMsg = "color_msg_green";
							$scope.colorTextBox = "color_text_box_green";
						}
    
				};
			};
		}
	})();
