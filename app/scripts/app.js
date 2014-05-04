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
<<<<<<< HEAD
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
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/generateur');

    var mainCountries = ['BE-fr','DE-de','ES-es','FR-fr','IT-it'],
        allCountries = ['AT-de','BE-fr','BE-nl','CH-de','CH-fr','CH-it','DE-de','ES-es','FR-fr','IT-it','LU-fr','NL-nl','UK-en'],
        i = 0;

    for (; i < mainCountries.length; i++) {
        state_kit(mainCountries[i]);
        state_kit700(mainCountries[i]);
    };

    for (; i < allCountries.length; i++) {
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

  });
=======
  ]);
>>>>>>> a7d8dbc1cb1e89c8abd77354af473be2fd8ed6ae

