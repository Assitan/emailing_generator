'use strict';

angular.module('emailingGeneratorApp')
  .run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  })
  .controller('EmailingCtrl', function ($scope,$timeout){

    $scope.addOutput = function() {
      if ($scope.outputCode) {
        $scope.list.push(this.outputCode);
        $scope.outputCode = '';
      }
    };

     var fb_url = 'https://generator-newsletters.firebaseio.com',
        texts = new Firebase(fb_url + '/texts');

    $scope.edit = {
        strapline_fr:'surtitre',
        strapline_de:'surtitre',
        strapline_es:'surtitre',
        strapline_en:'surtitre',
        strapline_it:'surtitre',
        strapline_nl:'surtitre'
    };

    $scope.addStrapline = function() {
        $scope.$watch('edit', function(newVal, oldVal) {
            texts.update(newVal);
        });
    };
   
    texts.on('value', function(snap) {
      $scope.getStrapline = snap.val();
    });

  })
  .directive('addOutputHtmail', [function () {
      return {
          restrict: 'A',
          link: function (scope, element, attrs) {
              element.click(function(){

              })
          }
      };
  }]);