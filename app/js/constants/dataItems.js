(function () {
  'use strict';

  angular
    .module('App')
    .value('DataItems', {
      availableVideoYears: [2016, 2015, 2014],
      availableBookTopics: [
        {
          title: 'Computer Science',
          name: 'cs'
        }, {
          title: 'Programming',
          name: 'programming'
        }, {
          title: 'JavaScript',
          name: 'javascript'
        }
      ]
    });

})();
