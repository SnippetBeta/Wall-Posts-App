angular.module('adeayo')

.service('LocationService', function() {

    var user_current_coordinates = {
        latitude:'',
        longitude:'',
        plain_location:'',
        full_location:''
        };
        
    var location_set = false;
        
    this.getUserLocation = function(){
        return user_current_coordinates;
    };
    
    this.isLocationSet = function(){
        return location_set;
    };
    
    this.setUserLocation = function(lat, long, plain_location, full_location){
        user_current_coordinates.latitude = lat;
        user_current_coordinates.longitude = long;
        user_current_coordinates.plain_location = plain_location;
        user_current_coordinates.full_location = full_location;
        location_set = true;
    };
    
    var setUserLocation = function(lat, long, plain_location, full_location){
        user_current_coordinates.latitude = lat;
        user_current_coordinates.longitude = long;
        user_current_coordinates.plain_location = plain_location;
        user_current_coordinates.full_location = full_location;
    };
    
    this.findUserLocation = function(callback){
        
                 if (typeof navigator !== "undefined" && typeof navigator.geolocation !== "undefined") {
                   console.log("Asking user to get their location");
                   navigator.geolocation.getCurrentPosition(geolocationCallback, errorHandler);
                 } else {
                   console.log("Your browser does not support the HTML5 Geolocation API, so this demo will not work.");
                   errorHandler(error);
                 }


                function geolocationCallback(location) {
                 var latitude = location.coords.latitude;
                 var longitude = location.coords.longitude;

                 console.log("Retrieved user's location: [" + latitude + ", " + longitude + "]");

                   var geocoder = new google.maps.Geocoder;

                    var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};

                   geocoder.geocode({'location': latlng}, function(results, status) {
                       if (status === google.maps.GeocoderStatus.OK) {
                         if (results[1]) {
                           
                           response = { success: true };
                           callback(response, (results[0].address_components[3].short_name + ", " + results[0].address_components[4].short_name), results[1].formatted_address, latlng);
                           
                           
                           
                           setUserLocation(latitude, longitude, results[0].address_components[3].short_name + ", " + results[0].address_components[4].short_name, results[1].formatted_address);
                           console.log(results[1].formatted_address);
                           location_set = true;
                           
                         } else {
                          response = { success: false, message: 'No results found' };
                          callback(response);
                          location_set = false;
                         }
                       } else {
                         response = { success: false, message: status };
                         callback(response);
                         location_set = false;
                       }
                     });
                     
               };

               /* Handles any errors from trying to get the user's current location */
               function errorHandler(error) {
                 if (error.code == 1) {
                   console.log();
                   response = { success: false, message: "PERMISSION_DENIED: User denied access to their location" };
                   callback(response);
                 } else if (error.code === 2) {
                   response = { success: false, message: "POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached" };
                   callback(response);
                 } else if (error.code === 3) {
                   response = { success: false, message: "TIMEOUT: Calculating the user's location too took long"};
                   callback(response);
                 } else {
                   console.log()
                   response = { success: false, message: "Unexpected error code"};
                   callback(response);
                 }
                 
                 location_set = false;
                }
    };

});