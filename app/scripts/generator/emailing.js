'use strict';

angular.module('emailingGeneratorApp')
  .run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  })
  .controller('EmailingCtrl', function ($scope){
    $scope.edit = {
      strapline: ''
    };

    var fb_url = 'https://emailing-generator.firebaseio.com',
        texts = new Firebase(fb_url + '/texts');

    //TEXTES
    $scope.addStrapline = function() {
      texts.update($scope.edit);
    };

    texts.on('value', function(snap) {
      $scope.getStrapline = snap.val();
    });
  })
  .directive('editStrapline', [function () {
    return function (scope, element, attrs){
      element.click(function(){
        element.focus();
        console.log(element);
      });
    };
  }]);