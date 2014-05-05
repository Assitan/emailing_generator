'use strict';

angular.module('emailingGeneratorApp')
    
  .controller('MainCtrl', function ($scope, $rootScope, $http, $firebase) {
     // NAVIGATION
  
    $scope.main_countries = ['FR-fr','BE-fr','DE-de','ES-es','IT-it'];

    $scope.all_countries = ['AT-de','BE-fr','BE-nl','CH-de','CH-fr','CH-it','DE-de','ES-es','FR-fr','IT-it','LU-fr','NL-nl','UK-en']; 

   //ANNÉE FOOTER
    $scope.year = new Date();

    //AJOUT DES TRACKINGS DS LA BDD 
    //TODO : mettre dans un factory
    var fb_url = new Firebase('https://emailing-generator.firebaseio.com'),
        trackings = new Firebase(fb_url + '/trackings'),
        trackings_FR_fr = new Firebase(trackings + '/FR_fr'),
        trackings_ES_es = new Firebase(trackings + '/ES_es'),
        trackings_DE_de = new Firebase(trackings + '/DE_de'),
        trackings_UK_en = new Firebase(trackings + '/UK_en'),
        trackings_IT_it = new Firebase(trackings + '/IT_it'),
        trackings_NL_nl = new Firebase(trackings + '/NL_nl'),
        trackings_CH_it = new Firebase(trackings + '/CH_it'),
        trackings_CH_fr = new Firebase(trackings + '/CH_fr'),
        trackings_BE_fr = new Firebase(trackings + '/BE_fr'),
        trackings_BE_nl = new Firebase(trackings + '/BE_nl'),
        trackings_LU_fr = new Firebase(trackings + '/LU_fr'),
        trackings_AT_de = new Firebase(trackings + '/AT_de'),
        colors          = new Firebase(fb_url + '/generalColors');

    //TRACKINGS
    /*$scope.addTrackings = function(){
      trackings_FR.update($scope.tracking.FR);
      trackings_DE.update($scope.tracking.DE);
    };*/

     trackings_FR_fr.on('value', function(snap) {
      $scope.getTrackings_FR_fr = snap.val();
    });
     trackings_ES_es.on('value', function(snap) {
      $scope.getTrackings_ES_es = snap.val();
    });
      trackings_DE_de.on('value', function(snap) {
      $scope.getTrackings_DE_de = snap.val();
    });
     trackings_UK_en.on('value', function(snap) {
      $scope.getTrackings_UK_en = snap.val();
    });
    trackings_IT_it.on('value', function(snap) {
      $scope.getTrackings_IT_it = snap.val();
    });
     trackings_NL_nl.on('value', function(snap) {
      $scope.getTrackings_NL_nl = snap.val();
    });
     trackings_CH_it.on('value', function(snap) {
      $scope.getTrackings_CH_it = snap.val();
    });
     trackings_CH_fr.on('value', function(snap) {
      $scope.getTrackings_CH_fr = snap.val();
    });
     trackings_BE_fr.on('value', function(snap) {
      $scope.getTrackings_BE_fr = snap.val();
    });
     trackings_BE_nl.on('value', function(snap) {
      $scope.getTrackings_BE_nl = snap.val();
    });
     trackings_LU_fr.on('value', function(snap) {
      $scope.getTrackings_LU_fr = snap.val();
    });
     trackings_AT_de.on('value', function(snap) {
      $scope.getTrackings_AT_de = snap.val();
    });

    //COLORS
    $scope.setGeneralColor = function() {
        colors.update($scope.setColor);
    };

    colors.on('value', function(snap) {
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
   //get new code html of newsletter
   .directive('mdmRenderfr', function() {
    return{    
        restrict:'A',
        transclude:true,
        templateUrl:'/views/templates/newsletters/kit/kit-FR-fr.html',   
        link:function(scope,element,attrs,ctrl,transclude){
            element.find('textarea').html(transclude());
           /* transclude(function(clone){
                element.find('textarea').append(clone);
              });*/
            var val = element.val();
            // var result = val.replace( '<ng-include src="\'views\/templates\/[a-z]\.html\'"><\/ng-include>', '');
            var result = val.replace( '<ng-include src="\'views/templates/head.html\'"><\/ng-include>', '');
            var result = result.replace( '<ng-include src="\'views/templates/scripts.html\'"><\/ng-include>', '');
            //console.log(result);
        }
    };
  })
   .directive('mdmRenderbe', function() {
    return{    
        restrict:'A',
        transclude:true,
        templateUrl:'/views/templates/newsletters/kit/kit-BE-fr.html',   
        link:function(scope,element,attrs,ctrl,transclude){
            //element.find('textarea').html(transclude());
            transclude(function(clone){
                element.find('textarea').append(clone);
              });
        }
    };
  })

//    directive('mdmRender', function ($compile) {

//     var frTemplate = '<div class="entry-photo"><h2>&nbsp;</h2><div class="entry-img"><span><a href="{{rootDirectory}}{{content.data}}"><img ng-src="{{rootDirectory}}{{content.data}}" alt="entry photo"></a></span></div><div class="entry-text"><div class="entry-title">{{content.title}}</div><div class="entry-copy">{{content.description}}</div></div></div>';
//     var deTemplate = '<div class="entry-photo"><h2>&nbsp;</h2><div class="entry-img"><span><a href="{{rootDirectory}}{{content.data}}"><img ng-src="{{rootDirectory}}{{content.data}}" alt="entry photo"></a></span></div><div class="entry-text"><div class="entry-title">{{content.title}}</div><div class="entry-copy">{{content.description}}</div></div></div>';
//     var esTemplate = '<div class="entry-photo"><h2>&nbsp;</h2><div class="entry-img"><span><a href="{{rootDirectory}}{{content.data}}"><img ng-src="{{rootDirectory}}{{content.data}}" alt="entry photo"></a></span></div><div class="entry-text"><div class="entry-title">{{content.title}}</div><div class="entry-copy">{{content.description}}</div></div></div>';

//     var getTemplate = function(contentType) {
//         var template = '';

//         switch(contentType) {
//             case 'fr':
//                 template = frTemplate;
//                 break;
//             case 'de':
//                 template = deTemplate;
//                 break;
//             case 'es':
//                 template = esTemplate;
//                 break;
//         }

//         return template;
//     }

//     var linker = function(scope, element, attrs) {
//         scope.rootDirectory = '/views/templates/newsletters/kit/';

//         element.find('textarea').html(transclude());
//     }

//     return {
//         restrict: "AE",
//         rep1ace: true,
//         link: linker,
       
//     };
// })
   .directive('mdmDraggable', ['$document', function($document) {
    return function (scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;
 
      element.on('mousedown', function(event) {
        event.preventDefault();
        element.css({        
          'opacity': '.7',
          'border': '2px dashed black',
          'box-shadow':'0 0 5px #333',
          'cursor':'move',
          'z-index':100
        });
        startX = event.pageX - x;
        startY = event.pageY - y;

        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });
 
      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }
 
      function mouseup() {
        element.css({
          'opacity': 1,
          'border': '4px solid rgba(247, 247, 247, 0.57)',
          'box-shadow':'none'
        });
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
      }
    };
  }]);