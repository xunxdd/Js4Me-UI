angular.module('App', ['ionic', 'ngCordova', 'ngAnimate', 'ngSanitize'])

  .run(runFunc);

runFunc.$inject =['$ionicPlatform', '$rootScope'];

function runFunc($ionicPlatform, $rootScope) {

  $ionicPlatform.ready(onIonicPlatformReady);

  $rootScope.$on('$stateChangeError', function() {
      console.log('state change error');
  });

  $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from) {
    $rootScope.previousState = from.name;
    $rootScope.currentState = to.name;
  });


  function onIonicPlatformReady() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  }

}
