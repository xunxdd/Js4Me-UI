(function () {
  'use strict';

  angular
    .module('App')
    .service('ApiService', ApiService);

  ApiService.$inject = ['$q', '$http', 'ApiEndPoint'];
  function ApiService($q, $http, ApiEndPoint) {
    var srv = this,
        apiHost = ApiEndPoint.apiUrl;

    srv.getFeedsJson = getFeedsJson;
    srv.getFeedsByName = getFeedsByName;
    srv.getBlogsJson = getBlogsJson;
    srv.getBlogsByTwitterId = getBlogsByTwitterId;
    srv.getVideosJson = getVideosJson;
    srv.getBooks = getBooks;
    srv.getTwitterStats = getTwitterStats;

    /**implementation**/
    function getBooks(topic) {
      return getDataFromHttpHost(apiHost + 'books/' + topic);
    }

    function getVideosJson() {
      return getDataFromHttpHost(apiHost + 'videojson');
    }

    function getFeedsJson() {
        return getDataFromHttpHost(apiHost + 'feedjson');
    }

    function getBlogsJson() {
      return getDataFromHttpHost(apiHost + 'blogjson');
    }

    function getTwitterStats() {
      return getDataFromHttpHost(apiHost + 'twitterStats');
    }

    function getFeedsByName(feedId) {
      return getDataFromHttpHost(apiHost + 'feeds/' + feedId);
    }

    function getBlogsByTwitterId(twitterId) {
      return getDataFromHttpHost(apiHost + 'blogs/' + twitterId);
    }

    function getDataFromHttpHost(url, success, failure) {
      return $http({
        method: 'GET',
        url: url
      });
    }
  }
})();
