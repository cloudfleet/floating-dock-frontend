'use strict';

/**
 * @ngdoc function
 * @name marinaFrontendApp.controller:OrganizationCtrl
 * @description
 * # OrganizationCtrl
 * Controller of the marinaFrontendApp
 */
angular.module('marinaFrontendApp')
  .controller('OrganizationCtrl',
  [ '$scope', '$stateParams', '$state', '$http', 'marinaApi', 'organization',
    function ($scope, $stateParams, $state, $http, marinaApi, organization) {
      $scope.organization = organization;

      $scope.save = function()
      {
        $scope.organization.$save().then(function() {
          marinaApi.refreshUser();
          $state.go("app.organization_edit", {id: $scope.organization.id});
        });
      };

      $scope.showApiKey = function() {
        $scope.api_key = organization.api_key;
      }

      $scope.hideApiKey = function() {
        $scope.api_key = '';
      }

      $scope.getPotentialMembers = function(text)
      {
        return $http.get('/api/v1/users/names', {
          params: {
            query: text
          }
        }).then(function(response){
          return response.data;
        });
      };

      $scope.removeMember = function(member)
      {
        organization.$removeMember({user_id: member.id}).then(organization.$get());
      }

      $scope.addMember = function(name)
      {
        organization.$addMember({name: name}).then(organization.$get());
        $scope.new_member_name = '';
      }

  }]);
