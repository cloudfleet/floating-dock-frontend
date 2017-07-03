'use strict';

/**
 * @ngdoc service
 * @name marinaFrontendApp.cockpit.api
 * @description
 * # cockpit.api
 * Service in the marinaFrontendApp.
 */
angular.module('marinaFrontendApp')
  .factory('marinaApi', ['Resource', '$http', '$q', '$rootScope', '$state',
    function ($resource, $http, $q, $rootScope, $state) {

      var localStorageBuildlogsKeyPrefix = 'marina.builds.logs.';

      var service = {

        User: $resource(
          '/api/v1/users/:id',
          {id:'@id'},
          {
            generateApiKey: {method: 'POST', url: '/api/v1/users/:id/generate_api_key'}
          }
        ),

        Organization: $resource(
          '/api/v1/organizations/:id',
          {id: '@id'},
          {
            addMember: {method: 'POST', url: '/api/v1/organizations/:id/add_user'},
            removeMember: {method: 'DELETE', url: '/api/v1/organizations/:id/remove_user'},
            generateApiKey: {method: 'POST', url: '/api/v1/organizations/:id/generate_api_key'}
          }
        ),

        Repository: $resource(
          '/api/v1/repos/:namespace/:name',
          {namespace: '@owner_name', name: '@name'},
          {create: {url: '/api/v1/repos', method: 'POST'},
           query: {url: '/api/v1/repos/:namespace', method: 'GET', isArray: true},
          }
        ),
        Dashboard: $resource(
          '/api/v1/dashboard'
        ),

        refreshUser: function()
        {
          if(!$rootScope.user.$get) {
            $rootScope.user = new service.User($rootScope.user);
          }
          return $rootScope.user.$get();
        },

        buildRepositoryTag: function(repository, tag_id) {
          var deferred = $q.defer();

          $http.post('/api/v1/repos/' + repository.owner_name + '/' + repository.name + '/tags/' + tag_id + '/build').
            success(function (data) {
              deferred.resolve(data);
            }).
            error(function () {
              deferred.resolve(null);
            });
          return deferred.promise;
        },

        getBuildLogs: function (owner_name, name, build_id) {

          var deferred = $q.defer();

          $http.get('/api/v1/repos/' + owner_name + '/' + name + '/builds/' + build_id + '/logs').
            success(function (data) {
              deferred.resolve(data);
            }).
            error(function () {
              deferred.resolve(null);
            });
          return deferred.promise;
        },

        search: function (query) {
          var deferred = $q.defer();

          $http({
            method: 'GET',
            url: '/api/v1/search',
            params: {q: query}
          }).
            success(function (data) {
              deferred.resolve(data);
            }).
            error(function () {
              deferred.resolve(null);
            });
          return deferred.promise;
        }


      };
      return service;

    }]);
