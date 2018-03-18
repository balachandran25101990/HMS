HMS.controller('ProductController', ['$rootScope','$scope', '$http', '$location', '$routeParams', '$cookies', function($rootScope, $scope, $http, $location, $routeParams, $cookies){
	$scope.getProducts = function(){
		$http.get('/api/products').success(function(response){
			if(response != null)
			{
                $scope.productArray = response;
			}
		});
	}
    $scope.getProducts();
	
	$scope.getProduct = function(){
		var id = $routeParams.id;
		$http.get('/api/product/'+id).success(function(response){
			$scope.product = response;
		});
	}
	
	$scope.addProduct = function(){
		if($scope.product == undefined || $scope.product.ProductName == undefined || $scope.product.ProductName == "")
		{
			demo.showNotification("Ensure Product Name!", 2, 'warning');
			return false;
        }
        if($scope.product == undefined || $scope.product.ProductCategory == undefined || $scope.product.ProductCategory == "")
		{
			demo.showNotification("Ensure Product Category!", 2, 'warning');
			return false;
        }
        if($scope.product == undefined || $scope.product.ProductId == undefined || $scope.product.ProductId == "")
		{
			demo.showNotification("Ensure Product BarCode Details!", 2, 'warning');
			return false;
        }
        if($scope.product == undefined || $scope.product.ProductAdv == undefined || $scope.product.ProductAdv == "")
		{
			demo.showNotification("Ensure Product Advantage!", 2, 'warning');
			return false;
        }
        if($scope.product == undefined || $scope.product.ProductDisAdv == undefined || $scope.product.ProductDisAdv == "")
		{
			demo.showNotification("Ensure Product Dis Advantage!", 2, 'warning');
			return false;
        }
        
		if($scope.product._id == undefined)
		{
			var loginEmployeeCookieId = $cookies.get('loginEmployeeId');
			if(loginEmployeeCookieId == undefined)
			{
				$location.path("/login");
				return false;
			}
			$scope.product.CreatedBy = loginEmployeeCookieId;
			$http.post('/api/products/', $scope.product).success(function(response){
				if(response != null)
				{
					demo.showNotification("Product added Successfully!", 1, 'done');
					$scope.getProducts();
                    $scope.product = {};
                    angular.element('.roleFloat').addClass('is-empty');
				}
				else
				demo.showNotification("Error in Add Product!", 3, 'error');
			});
		}
		else
		$scope.updateProduct();
	}
	
	$scope.editProduct = function(row)
	{
		angular.element('.roleFloat').removeClass('is-empty');
        $scope.product = row;
        $("#ddlProductCategory > option:selected").val($scope.product.ProductCategory);
	}
	
	$scope.updateProduct = function(){
		var loginEmployeeCookieId = $cookies.get('loginEmployeeId');
		if(loginEmployeeCookieId == undefined)
		{
			$location.path("/login");
			return false;
		}
		$scope.product.UpdatedBy =  $.cookie("loginEmployeeId");
		$http.put('/api/products/', $scope.product).success(function(response){
			if(response != null)
			{
				demo.showNotification("Product Updated Successfully!", 1, 'done');
				$scope.getProducts();
				$scope.product = {};
				angular.element('.roleFloat').addClass('is-empty');
			}
			else
			demo.showNotification("Error in Update Product!", 3, 'error');
		});
	}
	
	$scope.deleteProduct = function(row){
		$http.delete('/api/products/'+row._id).success(function(response){
			if(response != null)
			{
				demo.showNotification("Product Deleted Successfully!", 1, 'done');
				$scope.getProducts();
			}
			else
			demo.showNotification("Error in Delete Product!", 3, 'error');
		});
    }
    $scope.clearProduct = function()
    {
        $scope.product = {};
        angular.element('.roleFloat').addClass('is-empty');
	}
}]);