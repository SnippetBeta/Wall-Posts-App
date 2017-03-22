/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 

angular.module('adeayo', ['ngRoute', 'google.places', 'mentio', 'hljs', 'uiGmapgoogle-maps', 'angularMoment', 'LocalStorageModule', 'angular-clipboard', 'ngMaterial' , 'ngTagsInput', 'ui.ace', 'angularGrid', 'ngAnimate'])



.config(function($mdThemingProvider) {
    
     var black = $mdThemingProvider.extendPalette('grey', {
    '500': '#f36'
    });
    
     var orange = $mdThemingProvider.extendPalette('orange', {
    'A700': '#F1C40F',
    'A400': '#F1C40F',
    'A200': '#F1C40F',
    'A100': '#F1C40F'
    });
      
    var white = $mdThemingProvider.extendPalette('grey', {
    '500': '#fff'
    });
    
     var darkblue = $mdThemingProvider.extendPalette('indigo', {
    '500': '#1ABC9C',
    '600': '#1ABC9C'
        });
        
    $mdThemingProvider.definePalette('darkblue', darkblue);
    $mdThemingProvider.definePalette('orange', orange);
    $mdThemingProvider.definePalette('white', white);

   
    
    $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('pink');
    
    
 
  $mdThemingProvider.theme('whiteBackgroundTheme')
    .primaryPalette('white')
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('purple', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });
    
})

  .run(['Config', function(Config) {
        
            // Initialize Firebase
                var config = {
                apiKey: "AIzaSyAxUtA_cc5XpLm_EGYNVq_1xNp8GhFQwjI",
                authDomain: "snippet-c40dd.firebaseapp.com",
                databaseURL: "https://snippet-c40dd.firebaseio.com",
              };
            
            var app = firebase.initializeApp(config);

            Config.initFirebase(app);
            
            
                filepicker.setKey("Ab7CeI67lREaB4q0jovilz");


    }])


.config(function($routeProvider, $locationProvider, $httpProvider) {
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
   //$locationProvider.html5Mode(true);
  $routeProvider
  .otherwise({redirectTo: '/'});
});






