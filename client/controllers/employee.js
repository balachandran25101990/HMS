HMS.controller('EmployeeController', ['$rootScope','$scope', '$http', '$location', '$routeParams', '$cookies', function($rootScope, $scope, $http, $location, $routeParams, $cookies){
	$scope.getRoles = function(){
		$http.get('/api/roles').success(function(response){
			if(response != null)
			{
				$scope.roleArray = response.splice(1);	
			}
		});
    }
    $scope.getRoles();
    $scope.getEmployees = function(){
		$http.get('/api/employees').success(function(response){
			if(response != null)
			{
                $scope.employeeArray = response.splice(1);
                debugger	
                angular.forEach($scope.employeeArray, function(value, key){
                    debugger
                    var role = $scope.roleArray.find(x => x._id === value.RoleId);
                    value.Role = role.Name;
                })
			}
		});
	}
    $scope.getEmployees();
	
	$scope.getEmployee = function(){
		var id = $routeParams.id;
		$http.get('/api/employee/'+id).success(function(response){
			$scope.employee = response;
		});
	}
	
	$scope.addEmployee = function(){
		if($scope.employee == undefined || $scope.employee.FirstName == undefined || $scope.employee.FirstName == "")
		{
			demo.showNotification("Ensure First Name!", 2, 'warning');
			return false;
        }
        if($scope.employee == undefined || $scope.employee.LastName == undefined || $scope.employee.LastName == "")
		{
			demo.showNotification("Ensure Last Name!", 2, 'warning');
			return false;
        }
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
        if($scope.employee == undefined || $scope.employee.Mobile == undefined || $scope.employee.Mobile == "")
		{
			demo.showNotification("Ensure Mobile!", 2, 'warning');
			return false;
        }
        if($scope.employee == undefined || $scope.employee.RoleId == undefined || $scope.employee.RoleId == "")
		{
			demo.showNotification("Ensure Role!", 2, 'warning');
			return false;
        }
        if($scope.employee == undefined || $scope.employee.EmailId == undefined || $scope.employee.EmailId == "")
		{
			demo.showNotification("Ensure EmailId!", 2, 'warning');
			return false;
		}
		if($scope.employee._id == undefined)
		{
			var loginEmployeeCookieId = $cookies.get('loginEmployeeId');
			if(loginEmployeeCookieId == undefined)
			{
				$location.path("/login");
				return false;
			}
			$scope.employee.CreatedBy = loginEmployeeCookieId;
			$http.post('/api/employees/', $scope.employee).success(function(response){
				if(response != null)
				{
					demo.showNotification("Employee added Successfully!", 1, 'done');
					$scope.getEmployees();
                    $scope.employee = {};
                    angular.element('.roleFloat').addClass('is-empty');
				}
				else
				demo.showNotification("Error in Add Employee!", 3, 'error');
			});
		}
		else
		$scope.updateEmployee();
	}
	
	$scope.editEmployee = function(row)
	{
        debugger
		angular.element('.roleFloat').removeClass('is-empty');
        $scope.employee = row;
        $("#ddlRole > option:selected").val($scope.employee.RoleId);
	}
	
	$scope.updateEmployee = function(){
		var loginEmployeeCookieId = $cookies.get('loginEmployeeId');
		if(loginEmployeeCookieId == undefined)
		{
			$location.path("/login");
			return false;
		}
		$scope.employee.UpdatedBy =  $.cookie("loginEmployeeId");
		$http.put('/api/employees/', $scope.employee).success(function(response){
			if(response != null)
			{
				demo.showNotification("Employee Updated Successfully!", 1, 'done');
				$scope.getEmployees();
				$scope.employee = {};
				angular.element('.roleFloat').addClass('is-empty');
			}
			else
			demo.showNotification("Error in Update Employee!", 3, 'error');
		});
	}
	
	$scope.deleteEmployee = function(row){
		$http.delete('/api/employees/'+row._id).success(function(response){
			if(response != null)
			{
				demo.showNotification("Employee Deleted Successfully!", 1, 'done');
				$scope.getEmployees();
			}
			else
			demo.showNotification("Error in Delete Employee!", 3, 'error');
		});
    }
    $scope.clearEmployee = function()
    {
        $scope.employee = {};
        angular.element('.roleFloat').addClass('is-empty');
	}
	$scope.combineName = function(row)
	{
		return row.FirstName + " " + (row.MiddleName == null ? "" : row.MiddleName) + " " + row.LastName;
	}
}]);