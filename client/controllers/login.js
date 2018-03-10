
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
		// console.log($scope.employee);
		 $http.post('/api/EmployeeAuthenticate/', $scope.employee).success(function(response){
            debugger
            if (response == null) {
                return;
			}
			debugger
			$cookies.put('loginEmployeeId', response._id);
			$location.path('role');
			// $.cookie("loginEmployeeId", response._id, {expires:1, domain: "http://localhost:3000"});
			// console.log(response._id);
			// console.log($.cookie("loginEmployeeId"));
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