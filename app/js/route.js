(function() {
  'use strict';

  angular.module('App')
    .config(routeConfig);

    routeConfig.$inject= ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {


      $stateProvider

        .state('app', {
          url: '/app',
          abstract: true,
          controller: 'MenuController',
          bindToController: true,
          controllerAs: 'vm',
          templateUrl: 'templates/menu.html'
        })
        .state('app.newsfeeds', {
          url: "/newsfeeds",
          cache: false,
          views: {
            viewContent: {
              templateUrl: "templates/newsfeeds.html",
              controller: 'NewsFeedsController',
              bindToController: true,
              controllerAs: 'vm'
            }
          }
        })
        .state('app.blogfeeds', {
          url: "/blogfeeds",
          cache: false,
          views: {
            viewContent: {
              templateUrl: "templates/blogfeeds.html",
              controller: 'BlogFeedsController',
              bindToController: true,
              controllerAs: 'vm'
            }
          }
        })
        .state('app.blogs', {
          url: "/blogs",
          cache: false,
          views: {
            viewContent: {
              templateUrl: "templates/blogs.html",
              controller: 'BlogsController',
              bindToController: true,
              controllerAs: 'vm'
            }
          }
        })
        .state('app.videos', {
          url: "/videos/:year",
          cache: false,
          views: {
            viewContent: {
              templateUrl: "templates/videos.html",
              controller: 'VideosController',
              bindToController: true,
              controllerAs: 'vm'
            }
          }
        })
        .state('app.books', {
          url: "/books/:topic",
          cache: false,
          views: {
            viewContent: {
              templateUrl: "templates/books.html",
              controller: "BooksController",
              bindToController: true,
              controllerAs: 'vm'
            }
          }
        });

      $urlRouterProvider.otherwise('app/newsfeeds');

    }

})();
