angular.module('adeayo')
.service('UrlCrawler', function($http, Config) {

        
        this.ExtractDataFromURL = function(url ,callback){
        
            $http.post(Config.herokuUrl() + 'api/crawl', 
            {
                                url: escape(url) 
                                        //locations: [ $scope.info.location.geometry.viewport.b.b ,$scope.info.location.geometry.viewport.b.f,$scope.info.location.geometry.viewport.f.b, $scope.info.location.geometry.viewport.f.f]
                            })
                            .success(function (data) {
                                
                                console.log(data);
                                response = { success: true, data: data  };
                                callback(response);

                            }).error(function (err) {
                            
                               response = { success: false, message: 'Error crawling url' };
                                callback(response);
                    });
        };
        
          this.isImageValid = function(url ,callback){
              
              
               response = { success: true};
             callback(response);
        /*
            $http.get(url, {'headers': { 'X-Requested-With' :'XMLHttpRequest'}})
                            .success(function (data) {
                                console.log(data);
                                response = { success: true};
                                callback(response);

                            }).error(function (err) {
                            
                               response = { success: false, message: 'Image does not exist' };
                               callback(response);
                    });
                    
                    */
        };
 
});/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


