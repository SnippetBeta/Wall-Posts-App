angular.module('adeayo')
.service('FirebaseHandler', function(Config, UrlCrawler) {


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


this.getPinsForBoard = function(key ,callback){
   
            
             Config.database().ref().child("pins").orderByChild("board").equalTo(key).on('child_added', function(data) { 
                                 response = data.val();
                                 response['key'] = data.key;
                                 
                                 callback(response);
             });
};


this.setPinsForBoardChangeListener = function(key ,callback){
            
             Config.database().ref().child("pins").orderByChild("board").equalTo(key).on('child_changed', function(data) { 
                 
                                 response = data.val();
                                 response['key'] = data.key;
                                 
                                 callback(response);
             });
};


this.setPinsForBoardRemoveListener = function(key ,callback){
            
             Config.database().ref().child("pins").orderByChild("board").equalTo(key).on('child_removed', function(data) { 
                 
                                 response = data.val();
                                 response['key'] = data.key;
                                 
                                 callback(response);
             });
};


this.getAllUsers = function(callback){
   
             Config.database().ref().child("users").on('child_added', function(data) { 
                                 response = data.val();
                                 response['key'] = data.key;
                                 
                                 callback(response);
             });
};


this.getSelectedUsers = function(collaborators, callback){
   
            console.log(collaborators);
            var users = [];
            
            Config.database().ref().child("users").once('value', function(data) { 
                
               var all_users = data.val();
               
               console.log('ALL USERS');
               console.log(all_users);
               
                for(var key in collaborators){
                    if(key in all_users){
                        console.log('KEY FOUND');
                        console.log(all_users[key]);
                        all_users[key]['accountExists'] = true;
                        users.push(all_users[key]);
                    }
                    
                }
                
                callback(users);
                
                                 
             });
           
};



this.getUserBoards = function(callback){
   
        if(Config.getUser()){ //Required data is present
            
             Config.database().ref().child("boards").orderByChild("owner").equalTo(Config.getUser().uid).on('child_added', function(data) { 
                                 response = data.val();
                                 response['key'] = data.key;
                                 callback(response);
             });
         }
};

this.getSharedUserBoards = function(callback){
   
        if(Config.getUser()){ //Required data is present
            
            
             Config.database().ref().child("boards").once('value', function(data) { 
                 
                                 var allboards = data.val();
                                 
                                 for ( var key in allboards ){
                                     
                                     if(Config.getUser().uid in allboards[key].collaborators){
                                                                                  
                                         Config.database().ref().child("boards/" + key).once('value', function(data) { 

                                                                response = data.val();
                                                                response['key'] = data.key;
                                                                callback(response);

                                            });
             
                                         
                                     }
                                 }
             });
             
         }
};

this.createBoard = function(data ,callback){
   
        
        if("name" in data && "isPrivate" in data && Config.getUser()){ //Required data is present
            
             Config.database().ref().child("users").child(Config.getUser().uid).once("value", function(user_data) { 
                                 
                                 //Check if the user already has a board with that name
                                 
                                 var user = user_data.val();
                                 console.log(Config.getUser());
                                 
                                 if('boards' in user){ //If the user already has boards created
                                     
                                    var isUnique = true;
                                     
                                    for (var key in user.boards){ //Check to see if the name is unique
                                         
                                         if(data.name.trim(0) === user.boards[key].name.trim(0)){
                                             isUnique = false;
                                         }
                                         
                                    }
                                    
                                    if(isUnique){ //The name is unique
                                        
                                        
                                        
                                                           
            
            var d = new Date();
            var seconds = d.getTime() / 1000;
            
            data['owner'] = Config.getUser().uid;
            data['createdAt'] = seconds; //Add time stamp to saved data
            
            
         
            
            
             var newBoardRef  = firebaseRef.child("boards").push();
             
             data['access_code'] = newBoardRef.key + Config.getUser().uid;
             
                    newBoardRef.set(data ,function(error) {
                                if (error) {
                                   response = { success: false, message: error };
                                   callback(response);
                                } else { //Board was saved correctly

                            var newBoardUnderUserRef  = Config.database().ref().child("users").child(Config.getUser().uid).child("boards").push(); 
                            //Save id and name under user node        
                            newBoardUnderUserRef.set({key: newBoardRef.key, name: data.name} ,function(error) {
                                                if (error) {
                                                   response = { success: false, message: error };
                                                   callback(response);
                                                } else {
                                                    response = { success: true,  key: newBoardRef.key};
                                                    callback(response);
                                                }
                                        });
                          
                                }
                        });
                                        
                                        
                                    }else{ //if title is not unique
                                        
                                        response = { success: false, message: 'Try a different board name (you\'ve already got one like this).' };
                                        callback(response);
                                        
                                        
                                    }
                                    
                                }else{
                                    
                                    
                                    
                                                       
            
             var d = new Date();
            var seconds = d.getTime() / 1000;
            
            data['owner'] = Config.getUser().uid;

            data['createdAt'] = seconds; //Add time stamp to saved data
         
             var newBoardRef  = firebaseRef.child("boards").push(); 
             
             data['access_code'] = newBoardRef.key + Config.getUser().uid;
             
                    newBoardRef.set(data ,function(error) {
                                if (error) {
                                   response = { success: false, message: error };
                                   callback(response);
                                } else { //Board was saved correctly

                            var newBoardUnderUserRef  = Config.database().ref().child("users").child(Config.getUser().uid).child("boards").push(); 
                            //Save id and name under user node        
                            newBoardUnderUserRef.set({key: newBoardRef.key, name: data.name} ,function(error) {
                                                if (error) {
                                                   response = { success: false, message: error };
                                                   callback(response);
                                                } else {
                                                    response = { success: true,  key: newBoardRef.key};
                                                    callback(response);
                                                }
                                        });
                          
                                }
                        });
                        
                                    
                                }
                                 
                              });  
           
            
        }else{
            response = { success: false, message: 'Please enter all data' };
            callback(response);
        }
        
        
};
     
this.savePin = function(data ,callback){
        
        if(Config.getUser() && "type" in data && "content" in data && "board" in data){
            
            
            var d = new Date();
            var seconds = d.getTime() / 1000;
            
            data['createdAt'] = seconds;
            data['uid'] = Config.getUser().uid;
          
            
            var new_key = '';

            switch(data.type){
               case "colors":
                    //var re = new RegExp(/#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3}/g);
                    //console.log(data.content.match(re));
                    //data.content = data.content.match(re); 
                    
                    var newPinRef  = firebaseRef.child("pins").push(); 
                    new_key = newPinRef.key;
                    newPinRef.set(data ,function(error) {
                                if (error) {
                                  alert("Data could not be saved." + error);
                                   response = { success: false, message: error };
                                   callback(response);
                                } else {

                                    response = { success: true,  key: newPinRef.key};
                                    callback(response);
                                }
                        });
                    break;
               case "url":
                    UrlCrawler.ExtractDataFromURL(data.content, function(response)  { 
                    if(response.success){
                      data.content = response.data;
                       var newPinRef  = firebaseRef.child("pins").push(); 
                       new_key = newPinRef.key;
                        newPinRef.set(data ,function(error) {
                                if (error) {
                                  alert("Data could not be saved." + error);
                                   response = { success: false, message: error };
                                        callback(response);
                                } else {

                                    response = { success: true,  key: newPinRef.key};
                                    callback(response);
                                }
                        });
                    }else{
                        
                        response = { success: false, message: "Please enter a valid url" };
                        callback(response);
                        
                    }
                     });
                     
                    break;
                case "image":
                    UrlCrawler.isImageValid(data.content, function(response)  { 
                    if(response.success){
                       var newPinRef  = firebaseRef.child("pins").push(); 
                       new_key = newPinRef.key;
                        newPinRef.set(data ,function(error) {
                                if (error) {
                                  alert("Data could not be saved." + error);
                                   response = { success: false, message: error };
                                        callback(response);
                                } else {

                                    response = { success: true,  key: newPinRef.key};
                                    callback(response);
                                }
                        });
                    }else{
                        response = { success: false, message: "Please enter a valid url" };
                        callback(response);
                    }
                     });
                     
                    break;
               default:
                   console.log(data);
                    var newPinRef  = firebaseRef.child("pins").push();
                    new_key = newPinRef.key;
                    newPinRef.set(data ,function(error) {
                                if (error) {
                                  alert("Data could not be saved." + error);
                                   response = { success: false, message: error };
                                        callback(response);
                                } else {

                                    response = { success: true,  key: newPinRef.key};
                                    callback(response);
                                }
                        });
                        break;
            }
            
    
                        firebaseRef.child("boards").child(data.board).update( { recentSnip : new_key } ,function(error) {
                                    
                          });                                
                        
                         firebaseRef.child("boards").child(data.board).transaction(function(board) {
                            if (board) {
                                
                              console.log(board);
                              
                              if (board.snip_count) {
                                board.snip_count++;
                              } else {
                                  board.snip_count = 1;
                              }
                            }
                            return board;
                          });
        }
        };
        
this.updatePin = function(data ,callback){
        
        if(Config.getUser() && "type" in data && "content" in data && "board" in data && "key" in data){
            
            var d = new Date();
            var seconds = d.getTime() / 1000;
            
            data['createdAt'] = seconds;
            data['uid'] = Config.getUser().uid;
            

            switch(data.type){
               case "colors":
                    //var re = new RegExp(/#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3}/g);
                    //console.log(data.content.match(re));
                    //data.content = data.content.match(re); 
                    
                    var newPinRef  = firebaseRef.child("pins/" + data.key).update(data ,function(error) {
                                if (error) {
                                  alert("Data could not be saved." + error);
                                   response = { success: false, message: error };
                                   callback(response);
                                } else {

                                    response = { success: true,  key: newPinRef.key};
                                    callback(response);
                                }
                        });
                    break;
               case "url":
                    
                     var newPinRef  = firebaseRef.child("pins/" + data.key).update(data ,function(error) {
                                if (error) {
                                  alert("Data could not be saved." + error);
                                   response = { success: false, message: error };
                                   callback(response);
                                } else {

                                    response = { success: true,  key: newPinRef.key};
                                    callback(response);
                                }
                        });
                     
                    break;
                case "image":
                    UrlCrawler.isImageValid(data.content, function(response)  { 
                    if(response.success){
                             var newPinRef  = firebaseRef.child("pins/" + data.key).update(data ,function(error) {
                                if (error) {
                                  alert("Data could not be saved." + error);
                                   response = { success: false, message: error };
                                   callback(response);
                                } else {

                                    response = { success: true,  key: newPinRef.key};
                                    callback(response);
                                }
                        });
                    }else{
                        response = { success: false, message: "Please enter a valid url" };
                        callback(response);
                    }
                     });
                     
                    break;
               default:
                   console.log(data);
                         var newPinRef  = firebaseRef.child("pins/" + data.key).update(data ,function(error) {
                                if (error) {
                                  alert("Data could not be saved." + error);
                                   response = { success: false, message: error };
                                   callback(response);
                                } else {

                                    response = { success: true,  key: newPinRef.key};
                                    callback(response);
                                }
                        });
                        break;
            }
        }
        };
    
});/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


