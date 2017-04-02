'use strict';

/**
 * @ngdoc function
 * @name marinaFrontendApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the marinaFrontendApp
 */
angular.module('marinaFrontendApp')
  .controller('RepositoryListCtrl',
  [ '$scope', 'globals', 'repositoryList', '$stateParams',
    function ($scope, globals, repositoryList, $stateParams) {
      $scope.repositories = repositoryList;
      $scope.namespace = $stateParams.owner || 'All';
      $scope.organization = _.find($scope.user.organizations, function(o){
        return o.name === $scope.namespace;
      });
      $scope.canEdit = $scope.organization && $scope.organization.role === 'admin';

  }]);
