(function () {
  'use strict';

  angular
    .module('App')
    .controller('NewsFeedsController', NewsFeedsController);

  NewsFeedsController.$inject = ['ApiService', '$window'];
  function NewsFeedsController(ApiService, $window) {
    var vm = this,
      classes = [
        'darkred', 'orange', 'purple', 'green', 'purple2', 'yellow', 'navy'
      ];

    vm.openPostInBrowser = openPostInBrowser;
    vm.expandFeed = expandFeed;

    init();

    function init() {
      vm.feeds =[];
      vm.isLoadingFeeds = true;

      ApiService.getFeedsJson().then(handleFeedsJson);
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

    function openPostInBrowser(post) {
      $window.open(post.link, '_blank');
    }

    function expandFeed(feed) {
      feed.open = !feed.open;
    }
  }
})();
