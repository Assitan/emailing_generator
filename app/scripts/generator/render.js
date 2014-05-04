'use strict';

angular.module('emailingGeneratorApp')
  .controller('RenderCtrl', function ($scope, $http) {

    
  })
  .directive('cross', function() {
    return {
      template: '<a href="#" type="button" class="btn btn-danger btn-sm glyphicon glyphicon-remove croix"></a>'
    };
  });
