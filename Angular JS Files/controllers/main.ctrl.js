angular.module('adeayo')

.controller('main_controller', function($mdDialog,$mdSidenav, $mdToast, $scope, $location, $rootScope, $timeout) {
    
   $scope.toast = function (message){
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .hideDelay(1500)
    );
   };
    
    
        $scope.goto = function(href){
        
        /*
        if(href === '/s/query' || href === '/f/analyze'){ 
            if(Config.getUser()){
                $location.path(href);
            }else{
                $location.path('/login?alert=true');
            }
            
        }else{
        */
            $location.url(href);    
    
    };
    
});