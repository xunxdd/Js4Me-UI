(function () {
  'use strict';

  angular
    .module('App')
    .controller('BlogFeedsController', BlogFeedsController);

  BlogFeedsController.$inject = ['ApiService', '$window', '$q'];
  function BlogFeedsController( ApiService, $window, $q) {
    var vm = this,
      classes = [
        'darkred', 'orange', 'purple', 'green', 'purple2', 'yellow', 'navy'
      ];

    vm.openPostInBrowser = openPostInBrowser;
    vm.expandFeed = expandFeed;

    init();

    function init() {
      vm.blogs=[];
      vm.isLoadingBlogs = true;

      ApiService.getBlogsJson().then(handleBlogsJson);
    }

    function handleBlogsJson(response) {
      var data = response.data, i, l = data.length,
        colorLen = classes.length,
        promises = [],
        blogs =[];

      for (i = 0; i < l; i++) {
        if (data[i].feed) {
          var blogData = {
            twitterId: data[i].twitterId,
            name: data[i].name,
            class: classes[i% colorLen],
            data: []
          };

          promises.push(getBlog(blogData)) ;
          blogs.push(blogData);
        }
      }

      $q.when(promises).then(function () {
        blogs = blogs.sort(sortByPubdate);
        console.log(blogs);
        vm.blogs = blogs;
        vm.isLoadingBlogs = false;
      });
    }

    function sortByPubdate(a, b) {
      var pubDateA = new Date(a.pubdate) ,
          pubDateB= new Date(b.pubdate) ;
      return (pubDateA > pubDateB) ? 1 : ((pubDateB > pubDateB) ? -1 : 0);
    }
    function getBlog(blogData) {
      if (!blogData.twitterId) {
        return;
      }
      return ApiService.getBlogsByTwitterId(blogData.twitterId).then(function (response) {
        blogData.data = response.data;
       //console.log('agag');
        return blogData;
        //console.log(response.data[0]);
        //blogData.latest = response.data[0];
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
