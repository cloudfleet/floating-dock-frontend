'use strict';

/**
 * @ngdoc function
 * @name marinaFrontendApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the marinaFrontendApp
 */
angular.module('marinaFrontendApp')
  .controller('DashboardCtrl',
  [ '$scope', '$stateParams', 'dashboard_data',
    function ($scope, $stateParams, dashboard_data) {
      $scope.dashboard_data = dashboard_data;
  }]);
