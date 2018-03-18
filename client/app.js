var HMS = angular.module('HMS',['ngRoute', 'ngCookies']);

HMS.config(function($routeProvider){
	$routeProvider.when('/role', {
		controller:'RolesController',
		templateUrl: 'views/role.html'
	})
	.when('/employee', {
		controller:'EmployeeController',
		templateUrl: 'views/employee.html'
	})
	.when('/product',{
		controller:'ProductController',
		templateUrl: 'views/product.html'
	})
	.when('/books/add',{
		controller:'BooksController',
		templateUrl: 'views/add_book.html'
	})
	.when('/books/edit/:id',{
		controller:'BooksController',
		templateUrl: 'views/edit_book.html'
	})
	.when('/login', {
		templateUrl: 'views/login.html',
		controller: "LoginController"
	})
	.when('/master', {
		templateUrl : 'views/master.html'
	})
	.otherwise({
		redirectTo: '/login'
	});
});