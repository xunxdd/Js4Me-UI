(function () {
  'use strict';

  angular
    .module('App')
    .controller('BlogsController', BlogsController);

  BlogsController.$inject = ['ApiService', '$window'];
  function BlogsController(ApiService, $window) {
    var vm=this;

    vm.openBlog = openBlog;

    init();

    function init() {
      ApiService.getTwitterStats().then(function (response) {
          vm.twitters = response.data;
      });
    }

    function openBlog(url) {
      $window.open(url, '_blank');
    }
  }
})();
