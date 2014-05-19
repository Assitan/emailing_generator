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
    'colorpicker.module',
    'ngClipboard'
  ]
)
  .config(function ($stateProvider, $urlRouterProvider,$locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('main', {
        url: 'main',
        templateUrl: 'index.html'
    })
    .state('cut', {
        url: 'cut',
        templateUrl: ''
    })
    .state('generate', {
        url: 'generate',
        templateUrl: 'views/generate.html'
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
            templateUrl: 'views/templates/newsletters/news700/news700-' + country + '.html'
        });
    };

    $locationProvider.html5Mode(true);
  })
    .config(['ngClipProvider', function(ngClipProvider) { 
        ngClipProvider.setPath("bower_components/zeroclipboard/ZeroClipboard.swf");
    }]);

