// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function($routeProvider, $locationProvider) {
  $routeProvider

  // route for the home page
    .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'mainController'
  })

  // route for the about page
  .when('/all', {
    templateUrl: 'pages/books.html',
    controller: 'booksController'
  })

  // route for the contact page
  .when('/contact', {
    templateUrl: 'pages/contact.html',
    controller: 'contactController'
  });
  $locationProvider.html5Mode(true);
});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope, $http) {

  $scope.credit = function() {

    Materialize.toast('John Dews-Flick 2016', 4000)


  }

  $('#book').focus();


  $scope.recent = [];

  $scope.fromNow = function(time) {

    return moment(time).format("YYYY") + " | " + moment(time).fromNow();



  }

  $scope.newBook = function(book) {
    if (book.length < 12) {
      return alert('Invalid Barcode');
    }
    $scope.book = '';
    $('#book').focus();
    $http.post('/book', {
      isbn: book
    }).success(function(res) {

      console.log(res);

      if (res.error) {

        alert('not found')
      } else {
        $scope.book = '';
        $('#book').focus();
        $scope.recent.unshift(res);
        if (res.duplicate) {
          Materialize.toast('Duplicate Entry', 4000)
        }
      }

    });

  }





});

scotchApp.controller('booksController', function($scope, $http) {
  $scope.fromNow = function(time) {
    return moment(time).format("YYYY") + " | " + moment(time).fromNow();
  }

  $scope.authors = function(authors) {

    output = "";

    for (entry in authors) {
      console.log(authors[entry]);
      output = output + " " + authors[entry] + ",";
    }
    output = output.substring(0, output.length - 1);


    return output

  }

  $scope.books = [];
  $http.get('/books').success(function(res) {
    $scope.books = res;

  });
});

scotchApp.controller('contactController', function($scope) {
  $scope.message = 'Contact us! JK. This is just a demo.';
});
