angular.module('adeayo')

.config(function($routeProvider, $locationProvider, $httpProvider) {
 
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
   //$locationProvider.html5Mode(true);

  $routeProvider
      .when('/my-wall', {
    templateUrl : 'templates/wall.html',
    controller  : 'wall_controller'
  });
  
  })



.controller('wall_controller', function($scope, $mdPanel, $location, $document, $timeout, $window, $rootScope, Config) { 

    
    
    $scope.posts = [];
    
       Config.database().ref().child("adesWallPosts").on('child_added', function(data) { 
           
           $timeout (function(){ var response = data.val();
                                 response['key'] = data.key;
                                 $scope.posts.push(response);
                                 console.log($scope.posts);},10);
                                
                                 
             });
             
$scope.openTextDialog = function() {      

      var position = $mdPanel.newPanelPosition()
                .absolute()
                .center();
        
        var animation = $mdPanel.newPanelAnimation();
        animation.duration(200);
        animation.openFrom('.animation-target');
        animation.closeTo('.animation-target');
        animation.withAnimation($mdPanel.animation.FADE);
  
        var config = {
              animation: animation,
              attachTo: angular.element(document.body),
              controller: 'TextPostDialogController',
              controllerAs: 'ctrl',
              disableParentScroll: true,
              templateUrl: 'templates/post-text-dialog.html',
              hasBackdrop: true,
              panelClass: 'post-dialog',
              position: position,
              trapFocus: true,
              zIndex: 150000,
              clickOutsideToClose: false,
              escapeToClose: true,
              focusOnOpen: true
            };

            $mdPanel.open(config);
            
}; 
  
})

.controller('TextPostDialogController', function($scope, $timeout, $document, $mdToast, $http, $mdPanel, $mdDialog, mdPanelRef, Config) {
    
    
    $("md-toolbar").css("background-color", "#3F51B5");
    $("md-toolbar").css("box-shadow", "0px 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 0px 2px 2px rgba(0, 0, 0, 0.098), 0px 0px 5px 1px rgba(0, 0, 0, 0.084)");
      $document.off('scroll');

 $scope.cancel = function() {      
      mdPanelRef.close().then(function() {
    mdPanelRef.destroy();
    });
    };
    
    
     $scope.data  = {
      text:'',
      type:'text',
      place:null,
      image:''
    };
    
    $scope.showError = false;
    $scope.errorMessage = '';
    $scope.posting = false;
    
            $scope.isImage = false;

        
    $scope.clearImage = function(){
        $scope.isImage = false;
        $scope.data.image = '';
    };
    
    $scope.savePin = function (isFormValid){
         
         if("text" in $scope.data || ($scope.isImage && $scope.data.image.length > 1)){
            
         
            
            var myData = {};
            
            
            if($scope.data.place){
                myData['place'] = $scope.data.place;
            }
            
            if($scope.isImage){
                myData['content'] = $scope.data.image;
                myData['type'] = 'image';
                
                
                      $http.post(Config.herokuUrl() + 'api/validate/image', 
                            {
                                                url: myData.content 
                                                        //locations: [ $scope.info.location.geometry.viewport.b.b ,$scope.info.location.geometry.viewport.b.f,$scope.info.location.geometry.viewport.f.b, $scope.info.location.geometry.viewport.f.f]
                                            })
                                            .success(function (data) {
                                                
                                                console.log(data);
                                                
                                                var newPinRef  =  Config.database().ref().child("adesWallPosts").push();
                                                new_key = newPinRef.key;
                                                newPinRef.set(myData ,function(error) {
                                                            if (error) {
                                                              alert("Data could not be saved." + error);
                                                            } else {


                                                                $scope.cancel();

                                                                    //response = { success: true,  key: newPinRef.key};
                                                            }
                                                    });

                                            }).error(function (err) {
                                                
                                            alert('This image contains nudity!!!');
                                                    
                                                    
                     });
        
        
            }else if($scope.data.text.length > 1 ){
                
                
                myData['content'] = $scope.data.text;
                myData['type'] = 'text';
                
                    var d = new Date();
            var seconds = d.getTime() / 1000;
            
            myData['createdAt'] = seconds;
            
                    var newPinRef  =  Config.database().ref().child("adesWallPosts").push();
                    new_key = newPinRef.key;
                    newPinRef.set(myData ,function(error) {
                                if (error) {
                                  alert("Data could not be saved." + error);
                                } else {
                                    
                                    
                                    $scope.cancel();

                                        //response = { success: true,  key: newPinRef.key};
                                }
                        });
            
            
            
            }
          
        }
          
    };
    
                 
$scope.openLocationDialog = function() {      
     
        
      var position = $mdPanel.newPanelPosition()
                .absolute()
                .center();
        
        var animation = $mdPanel.newPanelAnimation();
        animation.duration(200);
        animation.openFrom('.animation-target');
        animation.closeTo('.animation-target');
        animation.withAnimation($mdPanel.animation.FADE);
  
        var config = {
              animation: animation,
              attachTo: angular.element(document.body),
              controller: 'LocationDialogController',
              controllerAs: 'ctrl',
              disableParentScroll: true,
              templateUrl: 'templates/location-dialog.html',
              hasBackdrop: true,
              panelClass: 'location-dialog',
              trapFocus: true,
              zIndex: 150000,
              clickOutsideToClose: false,
              escapeToClose: true,
              focusOnOpen: true
            };
            
             $mdDialog.show(config).then(function(place) {
                    
                    $scope.data.place = place;
                    
                    console.log(place);

                }, function() {
                  console.log('YOUR CANCELLED IT');
                });
            
}; 


   $scope.OpenCloudinaryWidget = function() {
    cloudinary.openUploadWidget({ cloud_name: 'dlrqkxpoe', upload_preset: 'buvpvpu0', cropping: 'server', multiple: false, max_file_size:5000000,
        client_allowed_formats:["png", "jpg", "jpeg"], theme:'minimal', sources:['local', 'url'], 'folder': 'user_photos'}, 
    function(error, result) { 
        if(error){
            $timeout(function() {            
                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent("Error uploading try again :(")
                                          .hideDelay(3000)); 
                                    
          },10);
        }else{
            $timeout(function() {
            
            $mdToast.show(
                                        $mdToast.simple()
                                          .textContent("Image uploaded succesfully")
                                          .hideDelay(3000));
                                  
            $scope.data.image = result[0].url;
            $scope.isImage = true;
          },10);
        }
        
    });
  };
    
})

.controller('LocationDialogController', function($scope, $timeout, $mdDialog, $mdToast, LocationService, Config) {

 $scope.hide = function(obj) {
      $mdDialog.hide(obj);
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    
    $scope.autocompleteOptions = {
                        componentRestrictions: {}
                    };
                 
    $scope.location_set = false;
    
    $scope.map = { center: { latitude: 38.9071923, longitude: -77.03687070000001}, zoom: 6, options: {scrollwheel: false}};

                    
   $scope.info = {location:null, place:null};
  
   $scope.location_placeholder = 'Enter location';

    LocationService.findUserLocation(function (response, plain_location, full_location, latlng) {

                if (response.success) {

                    $timeout( function (){
                        $scope.location_placeholder = plain_location;
                        $scope.map = {center: {latitude: latlng.lat, longitude: latlng.lng}, zoom: 17};
                        $scope.info.place = {formated_address:plain_location, lat:latlng.lat, long:latlng.lng};
                        $scope.location_set = true;
                    });
                    
                    console.log('User location retrieved: ' + plain_location);

                } else {

                }
    });
    
    

    
        
      $scope.$watch('info.location',function() {
          console.log($scope.info.location);
            if("geometry" in $scope.info.location){
                    console.log($scope.info.location);
                    $scope.info.place = {formated_address:$scope.info.location.formatted_address, lat:$scope.info.location.geometry.location.lat(), long:$scope.info.location.geometry.location.lng()};
                    $scope.map = { center: { latitude: $scope.info.location.geometry.location.lat(), longitude: $scope.info.location.geometry.location.lng()}, zoom: 10 };
                    $scope.location_set = true;
                    console.log($scope.map);
                }
   }, true);
    

    $scope.posting = false;
        
    $scope.submit = function (isFormValid){
         
         if($scope.location_set && $scope.info.place){
            
            $scope.hide($scope.info.place);
          
        }
          
    };
    
});