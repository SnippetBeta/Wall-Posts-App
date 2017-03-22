angular.module('adeayo')

.config(function($routeProvider, $locationProvider, $httpProvider) {
 
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
   //$locationProvider.html5Mode(true);

  $routeProvider
      .when('/', {
    templateUrl : 'templates/home.html',
    controller  : 'home_controller'
  });
  
  })



.controller('home_controller', function($scope, $location, $document, $window, $rootScope) { 

    
    if($document.scrollTop() > 350){
                              $("md-toolbar").css("background-color", "#3F51B5");
                              $("md-toolbar").css("box-shadow", "0px 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 0px 2px 2px rgba(0, 0, 0, 0.098), 0px 0px 5px 1px rgba(0, 0, 0, 0.084)");
                          //$(".navbar-fixed-top").show();
                          console.log('color');
                        }else{
                            //$(".navbar-fixed-top").setAnimationDuration(300);
                            //$(".navbar-fixed-top").hide();
                            $("md-toolbar").css("background-color", "transparent");
                            $("md-toolbar").css("box-shadow", "0 2px 5px rgba(0, 0, 0, 0.0)");
                            //console.log('transparent');
                        }
                        
   $document.on('scroll', function() {
                         // console.log('Document scrolled to ', $document.scrollLeft(), $document.scrollTop());
                          if($document.scrollTop() > 350){
                              $("md-toolbar").css("background-color", "#3F51B5");
                              $("md-toolbar").css("box-shadow", "0px 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 0px 2px 2px rgba(0, 0, 0, 0.098), 0px 0px 5px 1px rgba(0, 0, 0, 0.084)");
                          //$(".navbar-fixed-top").show();
                          //console.log('color');
                        }else{
                            //$(".navbar-fixed-top").setAnimationDuration(300);
                            //$(".navbar-fixed-top").hide();
                            $("md-toolbar").css("background-color", "transparent");
                            $("md-toolbar").css("box-shadow", "0 2px 5px rgba(0, 0, 0, 0.0)");
                            //console.log('transparent');
                        }
                        
                        if($document.scrollTop() > $window.innerHeight){
                            //console.log("SCROLLED TO BOTTOM");
                        }
                        
                     });
                     
                     
                   
  



});