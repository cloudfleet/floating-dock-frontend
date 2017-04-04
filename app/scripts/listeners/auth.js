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
          $rootScope.$on('auth:password-change-success', function() {
              $state.go('app.dashboard');
          });
          $rootScope.$on('auth:password-change-error', function(ev, message) {
            $rootScope.globals.showMessage(
              "Login failed",
              message.errors.full_messages
            );
          });
          $rootScope.$on('auth:login-error', function(ev, message) {
            $rootScope.globals.showMessage(
              "Login failed",
              message.errors
            );
          });

          $rootScope.$on('auth:logout-success', function(ev) {
              $state.go('index');
          });

          $rootScope.$on('auth:registration-email-success', function(ev, message) {
            $rootScope.globals.showMessage(
              "Registration Successful",
              ["A registration email was sent to " + message.email]
            );
            $state.go('index');
          });
          $rootScope.$on('auth:registration-email-error', function(ev, message) {
            $rootScope.globals.showMessage(
              "Registration Failed",
              message.errors.full_messages
            );
          });
          $rootScope.$on('auth:password-reset-request-success', function(ev, message) {
            $rootScope.globals.showMessage(
              "Password Reset Successful",
              ["A reset email was sent to " + message.email]
            );
            $state.go('index');
          });
          $rootScope.$on('auth:password-reset-request-error', function(ev, message) {
            $rootScope.globals.showMessage(
              "Password Reset Failed",
              message.errors.full_messages
            );
          });
          $rootScope.$on('auth:password-reset-confirm-success', function() {
            $state.go('auth.update_password');
          });


        }
    ]);
