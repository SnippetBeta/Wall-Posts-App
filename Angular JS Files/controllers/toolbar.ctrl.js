angular.module('adeayo')

.controller('toolbar_controller', function($scope, $mdPanel,  $mdDialog, $timeout, $sce, $mdUtil, $animate, $document ,$location, $rootScope, $route) {
  

$scope.$on('$locationChangeSuccess', function(/* EDIT: remove params for jshint */) {
                            console.log('$locationChangeSuccess called');
                            
                   var path = $location.path();
          
            if(path === '/'){ //Home
             
                    } else {
                         $("md-toolbar").css("background-color", "#3F51B5");
                         $("md-toolbar").css("box-shadow", "0px 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 0px 2px 2px rgba(0, 0, 0, 0.098), 0px 0px 5px 1px rgba(0, 0, 0, 0.084)");
                          $document.off('scroll');
                    }
                    
        });
        
        
     


});