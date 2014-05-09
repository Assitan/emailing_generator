'use strict';

angular.module('emailingGeneratorApp')
  .run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  })
  .controller('EmailingCtrl', function ($scope,$timeout){

     var fb_url = 'https://generator-newsletters.firebaseio.com',
        texts = new Firebase(fb_url + '/texts');

    $scope.edit = {
        strapline_fr:'strapline',
        strapline_de:'strapline',
        strapline_es:'strapline',
        strapline_en:'strapline',
        strapline_it:'strapline',
        strapline_nl:'strapline'
    };

    $scope.addStrapline = function() {
        $scope.$watch('edit', function(newVal, oldVal) {
            texts.update(newVal);
            console.log(newVal);
        });
    };
   
    texts.on('value', function(snap) {
      $scope.getStrapline = snap.val();
    });

  });