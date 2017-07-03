'use strict';

/**
 * @ngdoc function
 * @name marinaFrontendApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the marinaFrontendApp
 */
angular.module('marinaFrontendApp')
  .controller('SearchCtrl',
  [ '$scope', '$stateParams', '$state', 'search_results',
    function ($scope, $stateParams, $state, search_results) {
      $scope.search_results = search_results;
      $scope.getLink = function(search_result) {
        if(search_result.owner_name) {
          return $state.href('app.repository', {owner: search_result.owner_name, name: search_result.name});
        } else {
          return $state.href('app.repository_list', {owner: search_result.name});
        }
      }
  }]);
