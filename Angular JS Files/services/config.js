/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('adeayo')
.service('Config', function() {

    var app = null;
    var auth = null; 
    var database = null;
    var google_auth_provider = null;
    var facebook_auth_provider = null;
    var twitter_auth_provider = null;
    var github_auth_provider = null;
    var user = null;
    var init = false;
    var currentBoard = '';
    
    this.initFirebase = function(_app){
        
          app =  _app;
          
          auth = firebase.auth();
          
          database = firebase.database();
          
          console.log(firebase.auth());
          
          google_auth_provider = new firebase.auth.GoogleAuthProvider();
         facebook_auth_provider = new firebase.auth.FacebookAuthProvider();
         twitter_auth_provider = new firebase.auth.TwitterAuthProvider();
         github_auth_provider = new firebase.auth.GithubAuthProvider();

    };
    
    
    this.herokuUrl = function () {
        return 'https://snippet3j23h45node.herokuapp.com/';
    };
    
    this.currentBoard = function () {
        return currentBoard;
    };
    
    this.setCurrentBoard = function (_currentBoard) { 
       currentBoard = _currentBoard;
    };
    
        this.auth = function(){
            return auth;
    };
    
            this.database = function(){
            return database;
    };
    
            this.app = function(){
            return app;
    };
    
               this.github_auth_provider = function(){
            return github_auth_provider;
    };
    
                this.google_auth_provider = function(){
            return google_auth_provider;
    };
    
                    this.facebook_auth_provider = function(){
            return facebook_auth_provider;
    };
    
                        this.twitter_auth_provider = function(){
            return twitter_auth_provider;
    };
    
    
    this.getInit = function(){return init;};
    
    this.setInit = function(_init){init = _init;};
    
    
    this.setUser = function(_user)
    {
        user = _user;
    };
    
    
   this.getUser = function()
    {
        return user;
    };
    
    
    
    

});