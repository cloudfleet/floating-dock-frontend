'use strict';

/**
 * @ngdoc filter
 * @name marinaFrontendApp.filter:fromNow
 * @function
 * @description
 * # fromNow
 * Filter in the marinaFrontendApp.
 */
angular.module('marinaFrontendApp')
  .filter('fromNow', function () {
    return function (date) {
      return moment(date).fromNow();
    };
  })
  .filter('durationFromSeconds', function () {
    return function (duration_seconds) {
      return moment.duration(duration_seconds, 'seconds').humanize();
    };
  })
  .filter('statusBadgeClass', function () {
    return function (build) {
      if(build)
      {
        if(build.state == "pushed")
        {
          return "success";
        }
        else if(build.state == "failed") {
          return "danger";
        }
        else {
          return "warning";
        }
      }
      else {
        return "warning";
      }

    };
  });
