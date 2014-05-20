'use strict';

angular.module('emailingGeneratorApp')
  .run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  })
  .controller('EmailingCtrl', function ($scope,$timeout,FBURL){

    var texts = new Firebase(FBURL + '/texts');

    var surtitre = 'surtitre'

    $scope.edit = {
        strapline_fr: surtitre,
        strapline_de: surtitre,
        strapline_es: surtitre,
        strapline_en: surtitre,
        strapline_it: surtitre,
        strapline_nl: surtitre
    };

    $scope.addStrapline = function() {
        $scope.$watch('edit', function(newVal, oldVal) {
            texts.update(newVal);
        });
    };
   
    texts.on('value', function(snap) {
      $scope.getStrapline = snap.val();
    });

  });