(function () {
  'use strict';

  angular
    .module('App')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['DataItems'];
  function MenuController(DataItems) {
    var vm = this;

    vm.availableVideoYears = DataItems.availableVideoYears;
    vm.availableBookTopics = DataItems.availableBookTopics;
  }
})();
