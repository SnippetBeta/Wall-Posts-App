angular.module('adeayo')
.service('UserService', ['Config', function(Config) {

    var firebaseRef = Config.database().ref();

    function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
    }

    this.getMainFirebaseRef = function () {
        return firebaseRef;
    };


    
    


this.LogInWithEmail = function(email, password, callback){

        Config.auth().signInWithEmailAndPassword(email, password).then(function(user) {

            console.log(user);

            firebaseRef.child("users").child(user.uid).once("value", function(data) {
                var user_snapshot = data.val();
                Config.setUser(user_snapshot);
                console.log(Config.getUser());
                response = { success: true };
                callback(response);
            });

          }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        response = { success: false, message: errorMessage, code: errorCode, email: email };
        callback(response);
        // ...
      });
      };

this.SignUpWithEmail = function(email, password, photoURL, name, callback){

        Config.auth().createUserWithEmailAndPassword(email, password).then(function(user) {

            console.log(user);
   
            firebaseRef.child("users").child(user.uid).set({
                                  email: email,
                                  displayName: name,
                                  photoURL: photoURL,
                                  uid: user.uid
                                } , function(error) {
                                    
                                if (error) {
                                    
                                    var __user = Config.auth().currentUser;

                                        __user.delete().then(function() {
                                            
                                                response = { success: false, message: 'errorMessage', code: 'errorCode' };
                                                callback(response);
                                                
                                        }, function(error) {
                                            
                                                response = { success: false, message: 'errorMessage', code: 'errorCode' };
                                                callback(response);
                                            
                                        });

                                } else {

                                    response = { success: true };
                                    callback(response);
      
                                }
                          });
                            
            // ...
          }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                // ...
            response = { success: false, message: errorMessage, code: errorCode, email: email };
            callback(response);
        });
                

      };


          
this.LogInWithGithub = function(callback){

        Config.auth().signInWithPopup(Config.github_auth_provider()).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("USER****************");
            console.log(user);
            
           firebaseRef.child("users").child(user.uid).once("value", function(data) {

                        if(data.val()){
                            
                            response = { success: true };
                            callback(response);
                            
                        }else{
                              firebaseRef.child("users").child(user.uid).update({
                                  email: user.email,
                                  displayName: "displayName" in user ? user.displayName : user.email.split("@")[0],
                                  photoURL: user.photoURL,
                                  uid: user.uid
                                } , function(error) {
                                    
                                if (error) {
                                    
                                                Config.auth().signOut().then(function() {
                                                    Config.setUser(null);
                                                  }, function(error) {});
                                    
                                                response = { success: false, message: errorMessage, code: errorCode };
                                                callback(response);

                                } else {
                                    
                                                
                                    response = { success: true };
                                    callback(response);
      
                                    
                                }
                          });
                      }
  
                });
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            
            response = { success: false, message: errorMessage, code: errorCode, email: email };
            callback(response);
            // ...
            });
        };
 
this.LogInWithGoogle = function(callback){

        Config.auth().signInWithPopup(Config.google_auth_provider()).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("USER****************");
            console.log(user);
            
             firebaseRef.child("users").child(user.uid).once("value", function(data) {

                        if(data.val()){
                            
                            response = { success: true };
                            callback(response);
                            
                        }else{
                              firebaseRef.child("users").child(user.uid).update({
                                  email: user.email,
                                  displayName: "displayName" in user ? user.displayName : user.email.split("@")[0],
                                  photoURL: user.photoURL,
                                  uid: user.uid
                                } , function(error) {
                                    
                                if (error) {
                                    
                                                Config.auth().signOut().then(function() {
                                                    Config.setUser(null);
                                                  }, function(error) {});
                                    
                                                response = { success: false, message: errorMessage, code: errorCode };
                                                callback(response);

                                } else {
                                    
                                                
                                    response = { success: true };
                                    callback(response);
      
                                    
                                }
                          });
                      }
  
                });
                          
                          
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            
            response = { success: false, message: errorMessage, code: errorCode, email: email };
            callback(response);
            // ...
            });
        };
     
   
    
}]);/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


