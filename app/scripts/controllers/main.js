'use strict';

/**
 * @ngdoc function
 * @name marinaFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the marinaFrontendApp
 */
angular
  .module('marinaFrontendApp')
  .controller('AppCtrl', ['$scope', '$window', '$auth', 'globals',
    function ($scope, $window, $auth, globals) {

      globals.loadGlobalConfig().then(function(data){
        $scope.config = data;
      });

      function isSmartDevice($window) {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;
        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice($window) && angular.element($window.document.body).addClass('smart');


      // config
      $scope.app = {
        name: 'Floating Dock',
        version: '1.0.1',
        // for chart colors
        color: {
          primary: '#e26826',
          info: '#088076',
          success: '#27c24c',
          warning: '#fad733',
          danger: '#f05050',
          light: '#e8eff0',
          dark: '#3a3f51',
          black: '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-cf-orange',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: true,
          asideFolded: true
        }
      };
    }]);
