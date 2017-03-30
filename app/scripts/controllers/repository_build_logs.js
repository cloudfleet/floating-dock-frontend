'use strict';

/**
 * @ngdoc function
 * @name marinaFrontendApp.controller:RepositoryCtrl
 * @description
 * # RepositoryCtrl
 * Controller of the marinaFrontendApp
 */
angular.module('marinaFrontendApp')
  .controller('RepositoryBuildLogsCtrl',
  [ '$scope', '$stateParams','marinaApi',
    function ($scope, $stateParams, marinaApi) {

      $scope.repository_owner_name = $stateParams.owner;
      $scope.repository_name = $stateParams.name;
      $scope.build_id = $stateParams.build_id;


      marinaApi.getBuildLogs($scope.repository_owner_name, $scope.repository_name, $scope.build_id).then(function(data){
        $scope.logs = data;
      });


  }]);
