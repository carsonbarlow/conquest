(function(){

  var image_urls ={
    food_icon: '/images/icons/food.jpg',
    wood_icon: '/images/icons/wood.jpg',
    stone_icon: '/images/icons/stone.jpg',
    gold_icon: '/images/icons/gold.jpg',
    science_icon: '/images/icons/science.jpg',
    mysticism_icon: '/images/icons/mysticism.jpg',
    favor_icon: '/images/icons/favor.jpg',
    worker_icon: '/images/icons/worker.jpg',
    troop_icon: '/images/icons/troop.jpg',
    specialist_icon: '/images/icons/specialist.jpg'
  }

  var UI = function(){
    this.map_div = $('#map');
    
    this.map_div.css('width', window.innerWidth + "px");
    this.map_div.css('height', window.innerHeight + "px");
  };

  var Player = function(){
    this.selected_province = 1;
    this.update = function(info){
      for (key in info){
        this[key] = info[key];
      }
    };
  };


  var ui = new UI();
  var game = angular.module('game',[]);
  var player = new Player();
  var map;



  game.controller('ResourceController', ['$http', '$scope', function($http, $scope){
    $scope.player = {};
    $scope.image_urls = image_urls;
    $http.get('/playerData.json').success(function(data){
      $scope.player = data;
      player.update(data);
    });
    
  }]);

  game.directive('province', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/province.html',
      controller: function($scope){
        $scope.player = player;
        $scope.image_urls = image_urls;
        $scope.getResourceIncrease = function(type){
          if (!map) return '';
          return map[player.selected_province][type];
        };
        $scope.getProvinceName = function(){
          if (!map) return '';
          return map[player.selected_province].name;
        };
        $scope.closeProvince = function(){
          var p = $('province')[0];
          $(p).hide();
        }
      },
      controllerAs: 'provinceCtrl'
    };
  });

  game.directive('resourceProduction', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/resourceProduction.html',
      controller: function($scope, $element){
        $scope.building_name = $($element[0]).data('resourceType');
      },
      controllerAs: 'resourceProductionCtrl'
    };
  });

  game.directive('assignmentSlot', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/assignmentSlot.html',
      controller: function($scope, $element){
        $scope.gathering_type = $($element[0]).data('type');
      },
      controllerAs: 'resourceProductionCtrl'
    };
  });

  game.controller('MapController', ['$http', '$scope', function($http, $scope){
    $scope.map;
    $http.get('/map_data.json').success(function(data){
      $scope.map = data;
      map = data;
      place_cities(data);
    });
    var inner_map_div = $('#inner_map');
    function place_cities(cities){
      for (var i = 0; i < cities.length; i++){
        var city = document.createElement('DIV');
        city.innerHTML = cities[i].name;
        $(city).addClass('city');
        city.style['left'] = cities[i].location_x + 'px';
        city.style['top'] = cities[i].location_y + 'px';
        inner_map_div.append(city);
      }
    }

    var map_arrow_helper = {
      map_top_arrow: {direction:'top',volocity:10},
      map_bottom_arrow: {direction:'top',volocity:-10},
      map_left_arrow: {direction:'left',volocity:10},
      map_right_arrow: {direction:'left',volocity:-10}
    }
    $('.map_arrow').on('mouseover', function(){
      var move_pattern = map_arrow_helper[$(this).prop('id')];
      var move_interval = setInterval(function(){
        inner_map_div.css(move_pattern.direction, (parseInt(inner_map_div.css(move_pattern.direction))+move_pattern.volocity)+'px');
      },1000.0/30);
      $(this).on('mouseleave', function(){
        clearInterval(move_interval);
      });
    });
  }]);




})();