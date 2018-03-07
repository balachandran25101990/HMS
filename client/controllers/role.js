var HMS = angular.module('HMS');

HMS.controller('RolesController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('BooksController loaded...');

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

	$scope.addRole = function(){
		console.log($scope.role);
		$http.post('/api/roles/', $scope.role).success(function(response){
			window.location.href='#/role';
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