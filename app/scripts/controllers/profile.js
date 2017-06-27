'use strict';

/**
 * @ngdoc function
 * @name marinaFrontendApp.controller:RepositoryCtrl
 * @description
 * # RepositoryCtrl
 * Controller of the marinaFrontendApp
 */
angular.module('marinaFrontendApp')
  .controller('ProfileCtrl',
  [ '$scope', '$stateParams', '$location', 'marinaApi', 'profile_user',
    function ($scope, $stateParams, $location, marinaApi, profile_user) {
      $scope.profile_user = profile_user;


      $scope.web_hook_base_url =
          $location.protocol() +
          '://'+ $location.host() +
          '/api/v1/api/v1/github/pushes';

      $scope.showApiKey = function() {
        if(!profile_user.api_key)
        {
          marinaApi.User.generateApiKey({id: profile_user.id}).$promise.then(function() {
            profile_user.$get().then(function(){
              $scope.api_key = profile_user.api_key;
            });
          });
        }
        else {
          $scope.api_key = profile_user.api_key;
        }
      }

      $scope.hideApiKey = function() {
        $scope.api_key = '';
      }


  }]);
