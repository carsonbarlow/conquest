
(function(){
  var app = angular.module('authentication', []);
  app.controller('authenticateController', authenticateController);

  function authenticateController($scope){
    $scope.attempt_login = function(){
      if ($scope.user_name == 'carson_barlow' && $scope.password == 'password'){
        window.location.href = 'game.html';
      }else{
        alert('Sorry.  Wrong user name or password.');
        $scope.user_name = '';
        $scope.password = '';
      }
    };
  }
})();