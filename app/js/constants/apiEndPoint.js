(function () {
  'use strict';

  angular
    .module('App')
    .constant('ApiEndPoint', {
      //apiUrl: 'https://nodeapimy.herokuapp.com/api/',
      //url:'https://nodeapimy.herokuapp.com/'
      apiUrl: 'http://localhost:8080/api/',
      url: 'http://localhost:8080/'
    });

})();
