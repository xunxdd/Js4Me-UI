(function () {
  'use strict';

  angular
    .module('App')
    .controller('BooksController', BooksController);

  BooksController.$inject = ['ApiService', 'DataItems', '$stateParams'];
  function BooksController(ApiService,DataItems,  $stateParams) {
    var vm=this,
        topic = $stateParams.topic  || 'javascript',
        topicTitles = DataItems.availableBookTopics.filter(function (t) {
            return t.name === topic
        });

    vm.title = topicTitles.length? topicTitles[0].title : 'JavaScript';

    ApiService.getBooks(topic).then(function(response) {
      var data =response.data;
      vm.books=data;
      //console.log(data);
    });

    function openVideo(video) {
      window.open(video.link, '_blank');
    }
  }
})();
