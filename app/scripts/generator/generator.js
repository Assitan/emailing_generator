'use strict';

angular.module('emailingGeneratorApp')

   .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/generateur/fr');

    $stateProvider
    .state('fr', {
        url: '/generateur/fr',
        templateUrl: 'views/templates/fr.html'
      })
    .state('de', {
        url: '/generateur/de',
        templateUrl: 'views/templates/de.html'
      })
    .state('es', {
        url: '/generateur/es',
        templateUrl: 'views/templates/es.html'
      })
    .state('it', {
        url: '/generateur/it',
        templateUrl: 'views/templates/it.html'
      })
    .state('uk', {
        url: '/generateur/uk',
        templateUrl: 'views/templates/uk.html'
      });

  })
  .controller('MainCtrl', function ($scope, $rootScope, $http, $firebase) {  

    // NAVIGATION
    $scope.countries = ['fr','de','es','it','uk'];

    // SETTINGS
    $scope.settingsGeneralColor = [
      {
  	    id: 'change_bg',
  		label: 'background',
  	  },
  	  {
  		id: 'change_text_info',
  		label: 'texte header & footer',
  	  },
      {
  		id: 'change_border_bottom',
  		label: 'Bordure',
  	  }
    ];
    // $scope.setGeneralColor = function() {
    //   $scope.setColorBg = {
    //     colour: ''
    //   };
    //   $scope.setColorText = {
    //     colour: ''
    //   };
    //   $scope.setColorBorder = {
    //     colour: ''
    //   };
    // };

    $scope.settingsSectionColor = [
      {
        id: 'change_bg',
        label: 'background'
      },
      {
        id: 'change_text_info',
        label: 'texte'
      }
    ];

    $scope.getGeneralColor = function() {
      $scope.getColor = {
        color: ''
      };
    };

    //AJOUT DES TRACKINGS DS LA BDD 
    //TODO : mettre dans un factory
    var trackings_fb = new Firebase("https://emailing-generator.firebaseio.com/trackings"),
        colors_fb = new Firebase("https://emailing-generator.firebaseio.com/colors");

    $scope.add_tracking = $firebase(trackings_fb);

    $scope.addTrackings = function(){
        trackings_fb.update($scope.tracking);
    };

    trackings_fb.on('value', function(snap) {
      $scope.getTracking = snap.val();
    });


    $scope.add_colors = $firebase(colors_fb);

    $scope.setGeneralColor = function() {
        console.log($scope.setColor);
        colors_fb.update($scope.setColor);
    };

    colors_fb.on('value', function(snap) {
      $scope.getColor = snap.val();
    });
    
  })
  .directive('mdmAddactiveclass', function() {
      return function (scope, element, attrs) {
        element.siblings(':first').addClass('active');
        element.click(function(){
            element.siblings().removeClass('active');
            $(this).addClass('active');     
        });
      };
    })
  .directive('mdmChangecolor', function() {
    return function (scope, element, attrs){
      function changeColor(btn,item,style){
        $(btn).colpick({
            layout:'hex',
             onSubmit:function(hsb,hex,rgb,el) {
                $(item).css(style, '#' + hex);
                $(item).colpickHide();
            }
        });
      }
    };
  })
   .directive('mdmShowpane', function() {
    return function (scope, element, attrs) {
        element.click(function(){
            if(element.next().is(':hidden')){ 
              $(this).removeClass('glyphicon-cog')
                     .addClass('glyphicon-chevron-right')
                     .css('margin-right','229px');
              element.next().show();
            }else{
              $(this).removeClass('glyphicon-chevron-right')
                     .addClass('glyphicon-cog')
                     .css('margin-right',0);
              element.next().hide();     
            }
          });
      };
  })
   .directive('mdmReplace', function() {
    return function (scope, element, attrs){
      template: '<form role="form" id="options_sections" class="col-sm-1">'+
                  '<button ng-model="link" type="button" class="btn btn-default glyphicon glyphicon-link"></button>'+
                  '<button ng-model="alt" type="button" class="btn btn-default">alt</button>'+
                  '<button ng-model="img" type="file" class="btn btn-default">image</button>'+
                '</form>'
    };
  })
  .directive('cross', function() {
    return {
      template: '<a href="#" type="button" class="btn btn-danger btn-sm glyphicon glyphicon-remove croix"></a>'
    };
  });

    
