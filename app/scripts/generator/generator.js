'use strict';

angular.module('emailingGeneratorApp')
    
  .controller('MainCtrl', function ($scope, $rootScope, $http, $firebase) {
     // NAVIGATION
  
    $scope.main_countries = ['FR-fr','BE-fr','DE-de','ES-es','IT-it'];

    $scope.all_countries = ['AT-de','BE-fr','BE-nl','CH-de','CH-fr','CH-it','DE-de','ES-es','FR-fr','IT-it','LU-fr','NL-nl','UK-en']; 

    $scope.setColor = [
        {
            title: 'background',
            colour: ''
        },
        {
            title:'texte header & footer',
            colour: ''
        },
        {
            title:'bordure',
            colour: ''
        }
    ];

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
        colors    = new Firebase(fb_url + '/generalColors');

    //TRACKINGS
    /*$scope.addTrackings = function(){
      trackings_FR.update($scope.tracking.FR);
      trackings_DE.update($scope.tracking.DE);
    };*/

    trackings_FR_fr.on('value', function(snap) {
      $scope.getTracking_FR_fr = snap.val();
    });

    /*trackings_DE_de.on('value', function(snap) {
      $scope.getTracking_DE_de = snap.val();
    });*/

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