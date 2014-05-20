'use strict';

angular.module('emailingGeneratorApp')
    
  .controller('MainCtrl', function ($scope, $http, $firebase, FBURL) {

     // NAVIGATION
    $scope.main_countries = [
        'FR-fr',
        'BE-fr',
        'DE-de',
        'ES-es',
        'IT-it'
    ];

    $scope.all_countries = [
        'AT-de',
        'BE-fr',
        'BE-nl',
        'CH-de',
        'CH-fr',
        'CH-it',
        'DE-de',
        'ES-es',
        'FR-fr',
        'IT-it',
        'LU-fr',
        'NL-nl',
        'UK-en'
    ]; 

   //ANNÉE FOOTER
    $scope.year = new Date();

    //GET FILE
    function readFile(evt) {

    var f = evt.target.files[0]; 
    var t = document.getElementById('targetFile');

    if (f) {
        var r = new FileReader();
        r.onload = function(e) { 
            var contents = e.target.result;
            t.value = contents;
        }
            r.readAsText(f);
        } else { 
            alert("fichier non chargé");
        }
    }

   $('#fileinput').on('change', readFile);

    //AJOUT DES TRACKINGS DS LA BDD 
    //TODO : mettre dans un factory
    var trackings = new Firebase(FBURL + '/trackings'),
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
        colors          = new Firebase(FBURL  + '/generalColors');

    //TRACKINGS
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
        $scope.$watch('setColor', function(newVal, oldVal) {
            colors.update(newVal);
        });
    };

    colors.on('value', function(snap) {
      $scope.getColor = snap.val();
    });

    // handleColors.setListToScope($scope, 'background');
    //   $scope.setColor = {};

    //   $scope.addNewItem = function() {
    //     itemService.addItem($scope.setColor);
    //     $scope.newItem = {};
    //   };

  })
    // .factory('handleColors', ['FBURL', 'Firebase', '$firebase','angularFire', function (FBURL, Firebase, $firebase, angularFire) {
    //     var generalColors = new Firebase(FBURL + '/generalColors');
    //     //var langRef = trackingsLang.push();

    //     // trackingsLang.on('value', function(snap) {
    //     //   $scope.getTrackingsLang = snap.val();
    //     //   console.log($scope.getTrackingsLang);
    //     // });

    //     return {
    //         setListToScope: function(scope, localScopeVarName) {
    //          angularFire(generalColors, scope, localScopeVarName);
    //         },
    //         addItem: function(item){
    //             generalColors.push(item);
    //         }
    //     }
    // }])
    .directive('mdmAddactiveclass', function() {
      return function (scope, element, attrs) {
        element.siblings(':first-child').addClass('active');
        element.click(function(){
            element.siblings().removeClass('active');
            $(this).addClass('active');
        });
      };
    })
   //get new code html of newsletter
   .directive('mdmRender', [function () {
    	return function (scope, element, attrs){
    		element.children().unwrap('<span class="ng-scope ng-binding"></span>');
    	};
    }])
   .directive('mdmResult', [function () {        
        return function (scope, element, attrs){
            scope.getTextToCopy = function() {
                return element.siblings('#render').children('span').html();
            };
            scope.infoCopy = function () {
                element.after('<p class="copy-infos">copié</p>');
                element.siblings('p').delay(400).fadeOut();
            };     
       };
   }])
   .directive('removeCode', [function () {
       return function (scope, element, attrs){            
            element.click(function(){
                var currentHtml = element.parent().siblings('#render').children().html();
                //var result = currentHtml.replace(/<ng-include src="\'views\/templates\/scripts\.html\'"><\/ng-include>/g, "");
                var result = currentHtml.replace(/&lt;ng-include src="\'views\/templates\/scripts\.html'" class="include"&gt\;&lt\;\/ng-include&gt\;/g, "");
               
                element.parent().parent().parent().find('.generate_zone').html('<td align="center" ng-model="outputCode">'+result+'</td>');
              
            });
       };
   }])
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