(function () {
  'use strict';

  angular
    .module('App')
    .controller('VideosController', VideosController);

  VideosController.$inject = ['ApiService', 'ApiEndPoint', '$stateParams'];
  function VideosController(ApiService, ApiEndPoint, $stateParams) {
    var vm=this,
        imgUrl = ApiEndPoint.url + 'images/',
        year =Number($stateParams.year)  || 2016;

    vm.openVideo = openVideo;

    ApiService.getVideosJson().then(function(response) {
      var data =response.data;
      var dataForYear = data.filter(function (d) {
            return d.year === year;
        }),
        videos = dataForYear.length? dataForYear[0].videos : data[0].videos;
        videos = videos.map( function (video) {
          video.img = imgUrl + (video.img);
          return video;

        });

      vm.videos=videos;
    });

    function openVideo(video) {
      window.open(video.link, '_blank');
    }
  }
})();
