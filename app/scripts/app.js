'use strict';

angular
  .module('emailingGeneratorApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.router',
    'firebase',
    'xeditable',
    'colorpicker.module'

  ], function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
 
  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */ 
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
    for(name in obj) {
      value = obj[name];
        
      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
      
    return query.length ? query.substr(0, query.length - 1) : query;
  };
 
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
})
  .config(function ($stateProvider, $urlRouterProvider,$locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('accueil', {
        url: 'main',
        templateUrl: 'views/main.html'
    })
    .state('generate', {
        url: 'generate',
        templateUrl: 'views/generate.html'
    })
    .state('render', {
        url: 'render',
        templateUrl: 'views/render.html'
    });

    var mainCountries = ['BE-fr','DE-de','ES-es','FR-fr','IT-it'],
        allCountries = ['AT-de','BE-fr','BE-nl','CH-de','CH-fr','CH-it','DE-de','ES-es','FR-fr','IT-it','LU-fr','NL-nl','UK-en'],
        i = 0,
        j = 0;

    for (var i = 0; i < mainCountries.length; i++) {
        state_kit(mainCountries[i]);
        state_kit700(mainCountries[i]);
    };

    for (var j = 0; j < allCountries.length; j++) {
        state_news(allCountries[j]);
        state_news700(allCountries[j]);

    };

    function state_kit(country){
        $stateProvider.state('accueil.kit_' + country, {
            url: '/kit/' + country,
            templateUrl: 'views/templates/newsletters/kit/kit-' + country + '.html'
        });
    };

    function state_kit700(country){
        $stateProvider.state('accueil.kit700_' + country, {
            url: '/kit700/' + country,
            templateUrl: 'views/templates/newsletters/kit700/kit700-' + country + '.html'
        });
    };

    function state_news(country){
        $stateProvider.state('accueil.news_' + country, {
            url: '/news/' + country,
            templateUrl: 'views/templates/newsletters/news/news-' + country + '.html'
        });
    };

    function state_news700(country){
        $stateProvider.state('accueil.news700_'+ country, {
            url: '/news700/' + country,
            templateUrl: 'views/templates/newsletters/news700/news700-' + country + '.html'
        });
    };

    $locationProvider.html5Mode(true);
  });

