HMS.controller('RolesController', ['$rootScope','$scope', '$http', '$location', '$routeParams', '$cookies', function($rootScope, $scope, $http, $location, $routeParams, $cookies){
	$scope.getRoles = function(){
		$http.get('/api/roles').success(function(response){
			if(response != null)
			{
				$scope.rolesArray = response.splice(1);	
			}
		});
	}
	$scope.getRoles();
	
	$scope.getRole = function(){
		var id = $routeParams.id;
		$http.get('/api/roles/'+id).success(function(response){
			$scope.role = response;
		});
	}
	
	$scope.addRole = function(){
		if($scope.role == undefined || $scope.role.Name == undefined || $scope.role.Name == "")
		{
			demo.showNotification("Ensure Name!", 2, 'warning');
			return false;
		}
		if($scope.role._id == undefined)
		{
			var loginEmployeeCookieId = $cookies.get('loginEmployeeId');
			if(loginEmployeeCookieId == undefined)
			{
				$location.path("/login");
				return false;
			}
			$scope.role.CreatedBy = loginEmployeeCookieId;
			$http.post('/api/roles/', $scope.role).success(function(response){
				if(response != null)
				{
					demo.showNotification("Role added/ Updated Successfully!", 1, 'done');
					$scope.getRoles();
					$scope.role = {};
				}
				else
				demo.showNotification("Error in Add/ Update Role!", 3, 'error');
			});
		}
		else
		$scope.updateRole();
	}
	
	$scope.editRole = function(row)
	{
		angular.element('.roleFloat').removeClass('is-empty');
		$scope.role = row;
	}
	
	$scope.updateRole = function(){
		var loginEmployeeCookieId = $cookies.get('loginEmployeeId');
		if(loginEmployeeCookieId == undefined)
		{
			$location.path("/login");
			return false;
		}
		$scope.role.UpdatedBy =  $.cookie("loginEmployeeId");
		$http.put('/api/roles/', $scope.role).success(function(response){
			if(response != null)
			{
				demo.showNotification("Role added/ Updated Successfully!", 1, 'done');
				$scope.getRoles();
				$scope.role = {};
				angular.element('.roleFloat').addClass('is-empty');
			}
			else
			demo.showNotification("Error in Add/ Update Role!", 3, 'error');
		});
	}
	
	$scope.deleteRole = function(row){
		debugger
		$http.delete('/api/roles/'+row._id).success(function(response){
			debugger
			if(response != null)
			{
				demo.showNotification("Role Deleted Successfully!", 1, 'done');
				$scope.getRoles();
			}
			else
			demo.showNotification("Error in Delete Role!", 3, 'error');
		});
	}
}]);