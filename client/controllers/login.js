
HMS.controller('LoginController', ['$rootScope', '$scope', '$http', '$location', '$routeParams', '$cookies', function($rootScope, $scope, $http, $location, $routeParams, $cookies){
	$scope.getRoles = function(){
		$http.get('/api/roles').success(function(response){
			$scope.roles = response;
		});
	}

	$scope.getRole = function(){
		var id = $routeParams.id;
		$http.get('/api/roles/'+id).success(function(response){
			$scope.role = response;
		});
	}
    $scope.employee = {};
	$scope.LoginValidate = function(){
		if($scope.employee == undefined || $scope.employee.Code == undefined || $scope.employee.Code == "")
		{
			demo.showNotification("Ensure Code!", 2, 'warning');
			return false;
		}
		if($scope.employee == undefined || $scope.employee.Password == undefined || $scope.employee.Password == "")
		{
			demo.showNotification("Ensure Password!", 2, 'warning');
			return false;
		}
		 $http.post('/api/EmployeeAuthenticate/', $scope.employee).success(function(response){
            debugger
            if (response == null) {
				demo.showNotification("Authentication failed!", 3, 'error');
				return;
			}
			$cookies.put('loginEmployeeId', response._id);
			$location.path('role');
         });
	}

	$scope.updateBook = function(){
		var id = $routeParams.id;
		$http.put('/api/books/'+id, $scope.book).success(function(response){
			window.location.href='#/books';
		});
	}

	$scope.removeBook = function(id){
		$http.delete('/api/books/'+id).success(function(response){
			window.location.href='#/books';
		});
	}
}]);