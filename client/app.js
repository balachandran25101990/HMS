var HMS = angular.module('HMS',['ngRoute', 'ngCookies']);

HMS.config(function($routeProvider){
	$routeProvider.when('/role', {
		controller:'RolesController',
		templateUrl: 'views/role.html'
	})
	.when('/books', {
		controller:'BooksController',
		templateUrl: 'views/books.html'
	})
	.when('/books/details/:id',{
		controller:'BooksController',
		templateUrl: 'views/book_details.html'
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