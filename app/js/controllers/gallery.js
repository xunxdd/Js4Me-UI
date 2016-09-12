(function () {
  'use strict';

  angular
    .module('App')
    .controller('GalleryController', GalleryController);

  GalleryController.$inject = ['ApiService', '$window'];
  function GalleryController( ApiService, $window) {
    var vm = this,
        classes = [
          'darkred', 'orange', 'purple', 'green', 'purple2', 'yellow', 'navy'
        ];

    vm.openPostInBrowser = openPostInBrowser;
    vm.expandFeed = expandFeed;

    init();

    function init() {
      vm.feeds =[];
      vm.blogs=[];
      vm.isLoadingFeeds = true;
      vm.isLoadingBlogs = true;

      ApiService.getFeedsJson().then(handleFeedsJson);
      ApiService.getBlogsJson().then(handleBlogsJson);
    }

    function handleFeedsJson(response) {
      var data = response.data, i, l = data.length,
          colorLen = classes.length;

      for (i = 0; i < l; i++) {
        var feedData = {
          name: data[i].name,
          logo: data[i].logo,
          class: classes[i% colorLen],
          data: []
        };
        vm.feeds.push(feedData);
        vm.isLoadingFeeds = false;
        getFeed(feedData);
      }
    }

    function getFeed(feedData) {

      if (!feedData.name) {
        return;
      }
      ApiService.getFeedsByName(feedData.name).then(function(response) {
          feedData.data = response.data;
      });
    }

    function handleBlogsJson(response) {
      var data = response.data, i, l = data.length,
        colorLen = classes.length;

      for (i = 0; i < l; i++) {
        var blogData = {
          twitterId: data[i].twitterId,
          name: data[i].name,
          class: classes[i% colorLen],
          data: []
        };
        getBlog(blogData);
        vm.isLoadingBlogs = false;
        vm.blogs.push(blogData);

      }
    }

    function getBlog(blogData) {
      if (!blogData.twitterId) {
        return;
      }
      ApiService.getBlogsByTwitterId(blogData.twitterId).then(function (response) {
          blogData.data = response.data;
      });
    }

    function openPostInBrowser(post) {
      $window.open(post.link, '_blank');
    }

    function expandFeed(feed) {
        feed.open = !feed.open;
    }
  }
})();
