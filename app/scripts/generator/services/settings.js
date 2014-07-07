app
  .factory('storageFactory', ['$sessionStorage','$localStorage', function ($sessionStorage,$localStorage){
      var track_begin = $sessionStorage;
      var track_end = $localStorage;
      var setColor = $localStorage;
      var title = $localStorage;

      return{
        trackBegin: function(){
          return track_begin;
        },
        trackEnd: function(){
          return track_end;
        },
        generalColor: function(){
          return setColor;
        },
        templateTitle: function(){
          return title;
        }
      };
    }]);