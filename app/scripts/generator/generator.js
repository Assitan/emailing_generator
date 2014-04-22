'use strict';

angular.module('emailingGeneratorApp')
   .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/generateur');

    var mainCountries = ['BE-fr','DE-de','ES-es','FR-fr','IT-it'];
    var allCountries = ['AT-de','BE-fr','BE-nl','CH-de','CH-fr','CH-it','DE-de','ES-es','FR-fr','IT-it','LU-fr','NL-nl','UK-en'];

    for (var i = 0; i < mainCountries.length; i++) {
        state_kit(mainCountries[i]);
        state_kit700(mainCountries[i]);
    };

    for (var i = 0; i < allCountries.length; i++) {
        state_news(allCountries[i]);
        state_news700(allCountries[i]);
    };


    function state_kit(country){
        $stateProvider.state('kit_' + country, {
            url: '/kit/' + country,
            templateUrl: 'views/templates/newsletters/kit/kit-' + country + '.html'
        });
    };
    function state_kit700(country){
        $stateProvider.state('kit700_' + country, {
            url: '/kit700/' + country,
            templateUrl: 'views/templates/newsletters/kit700/kit700-' + country + '.html'
        });
    };
    function state_news(country){
        $stateProvider.state('news_' + country, {
            url: '/news/' + country,
            templateUrl: 'views/templates/newsletters/news/news-' + country + '.html'
        });
    };
    function state_news700(country){
        $stateProvider.state('news700_'+ country, {
            url: '/news700/' + country,
            templateUrl: 'views/templates/newsletters/news/news700-' + country + '.html'
        });
    };
  })  
  .controller('MainCtrl', function ($scope, $rootScope, $http, $firebase) {  
     // NAVIGATION
    var mainCountries = ['BE-fr','DE-de','ES-es','FR-fr','IT-it'];
    var allCountries = ['AT-de','BE-fr','BE-nl','CH-de','CH-fr','CH-it','DE-de','ES-es','FR-fr','IT-it','LU-fr','NL-nl','UK-en'];


    $scope.countries = [
        {
            title: 'kit',
            name: mainCountries
        },
        {
            title: 'kit700',
            name: mainCountries
        },
        {
            title: 'news',
            name: allCountries
        },
        {
            title: 'news700',
            name: allCountries
        }
    ];

   
    $scope.year = new Date();

    //AJOUT DES TRACKINGS DS LA BDD 
    //TODO : mettre dans un factory
    var fb_url = 'https://emailing-generator.firebaseio.com',
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

    var xsrf = $.param({fkey: "key"});
    $http({
      url:'/ss.json',
      method : 'POST',
      data: xsrf,
      headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
    }).success(function(data, status, headers, config) {
      console.log(data);
    })
    
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
   .directive('mdmRender', function() {
    return{    
        restrict:'A',
        transclude:true,
        templateUrl:'/views/templates/fr.html',   
        link:function(scope,element,attrs,ctrl, transclude){
          element.click(function(){
            element.find('textarea').html(transclude());
          });
        }
    };
  })
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
  }])
  .directive('cross', function() {
    return {
      template: '<a href="#" type="button" class="btn btn-danger btn-sm glyphicon glyphicon-remove croix"></a>'
    };
  });

    
