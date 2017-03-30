'use strict';

/**
 * @ngdoc config
 * @name config.marinaFrontendApp
 * @description
 * config of the marinaFrontendApp
 */
angular.module('marinaFrontendApp')
    .run(
    ['$rootScope', '$auth', '$state',
        function ($rootScope, $auth, $state) {
          $rootScope.$on('auth:login-success', function(ev, user) {
              $state.go('app.dashboard');
          });

          $rootScope.$on('auth:login-error', function(ev, message) {
            alert(
              "Registration failed: \n" +
              "-------------------- \n"
              message.errors.full_messages.join("\n")
            );
          });

          $rootScope.$on('auth:logout-success', function(ev) {
              $state.go('index');
          });

          $rootScope.$on('auth:registration-email-success', function(ev, message) {
              alert("A registration email was sent to " + message.email);
              $state.go('index');
          });
          $rootScope.$on('auth:registration-email-error', function(ev, message) {
              alert(
                "Registration failed: \n" +
                "-------------------- \n"
                message.errors.full_messages.join("\n")
              );
          });
        }
    ]);
