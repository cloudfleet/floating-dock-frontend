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
  [ '$scope', '$stateParams', '$state', '$http', '$location', 'marinaApi', 'organization',
    function ($scope, $stateParams, $state, $http, $location, marinaApi, organization) {
      $scope.organization = organization;

      $scope.web_hook_base_url =
          $location.protocol() +
          '://'+ $location.host() +
          '/api/v1/github/pushes';

      $scope.save = function()
      {
        $scope.organization.$save().then(function() {
          marinaApi.refreshUser();
          $state.go("app.organization_edit", {id: $scope.organization.id});
        });
      };

      $scope.showApiKey = function() {
        if(!organization.api_key)
        {
          marinaApi.Organization.generateApiKey({id: organization.id}).$promise.then(function() {
            organization.$get().then(function(){
              $scope.api_key = organization.api_key;
            });
          });
        }
        else {
          $scope.api_key = organization.api_key;
        }
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
