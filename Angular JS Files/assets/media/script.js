var app = angular.module('myApp', ['ngMaterial','ngRoute', 'akoenig.deckgrid', 'angularMoment', 'LocalStorageModule']);


app.directive('errSrc', function() {
      return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src != attrs.errSrc) {
              attrs.$set('src', attrs.errSrc);
            }
          });
          
          attrs.$observe('ngSrc', function(value) {
            if (!value && attrs.errSrc) {
              attrs.$set('src', attrs.errSrc);
            }
          });
        }
      }
    });



app.directive('resize', function ($window) {
    return function (scope, element, attr) {

        var w = angular.element($window);
        scope.$watch(function () {
            return {
                'h': w.height(), 
                'w': w.width()
            };
        }, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;
            
            if(newValue.w < 960){
            scope.spacing = "";
            
           
                    if(newValue.w > 600){
                    scope.status = "medium";
                    scope.image_grid_class="rig columns-3";
                    }else{
                    scope.status = "small";
                    scope.image_grid_class="rig columns-2";
                    }
            
            }else{
            scope.status = "large";
            scope.spacing = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
            scope.image_grid_class="rig columns-4";

            }

            scope.resizeWithOffset = function (offsetH) {
                scope.$eval(attr.notifier);
                return { 
                    'height': (newValue.h - offsetH) + 'px'                    
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
}); 


app.service('video_dataholder', function() {
    
    var colorTiles = [];
    var colorTiles1 = [];
    var colorTiles2 = [];
    var colorTiles3 = [];
   var new_videos = 0;

    
    
     this.getVideosCount = function () {
        return new_videos;
    };
    
    this.setVideosCount = function (count) {
        new_videos = count;
    };
    
    this.getTiles = function () {
        return colorTiles;
    };
    
    this.getTiles1 = function () {
        return colorTiles1;
    };
    
    this.getTiles2 = function () {
        return colorTiles2;
    };
    
    this.getTiles3 = function () {
        return colorTiles3;
    };
    
    this.setTiles = function (tiles) {
       colorTiles =  tiles;
       x = 0;
       
       for(i = 0; i < colorTiles.length; i++){
            
            if(x<=2){
            x+=1;
            }else{
                x=1;
            }
                        
           if(x===1){
               colorTiles1.push(colorTiles[i]);
           }else if(x===2){
              colorTiles2.push(colorTiles[i]);
           }else if(x===3){
               colorTiles3.push(colorTiles[i]);
           }
        
       }
    };
});


app.service('article_dataholder', function() {
    
    var colorTiles = [];
    var colorTiles1 = [];
    var colorTiles2 = [];
    var colorTiles3 = [];
   var new_articles = 0;

    
    
     this.getArticlesCount = function () {
        return new_articles;
    };
    
    this.setArticlesCount = function (count) {
        new_articles = count;
    };

    this.getTiles = function () {
        return colorTiles;
    };
    
    this.getTiles1 = function () {
        return colorTiles1;
    };
    
    this.getTiles2 = function () {
        return colorTiles2;
    };
    
    this.getTiles3 = function () {
        return colorTiles3;
    };
    
    this.setTiles = function (tiles) {
       colorTiles =  tiles;
       x = 0;
       
       for(i = 0; i < colorTiles.length; i++){
            
            if(x<=2){
            x+=1;
            }else{
                x=1;
            }
                        
           if(x===1){
               colorTiles1.push(colorTiles[i]);
           }else if(x===2){
              colorTiles2.push(colorTiles[i]);
           }else if(x===3){
               colorTiles3.push(colorTiles[i]);
           }
        
       }
    };
});


app.config(function($routeProvider) {
  $routeProvider
  
  .when('/', {
    templateUrl : 'pages/home.html',
    controller  : 'HomeController'
  })

  .when('/watch', {
    templateUrl : 'pages/watch.html',
    controller  : 'WatchController'
  })

  .when('/read', {
    templateUrl : 'pages/read.html',
    controller  : 'ReadController'
  })

  .when('/projects', {
    templateUrl : 'pages/projects.html',
    controller  : 'ProjectsController'
  })
  .otherwise({redirectTo: '/'});
});

app.config(function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('adeayo');
  // localStorageServiceProvider.setStorageCookieDomain('example.com');
  // localStorageServiceProvider.setStorageType('sessionStorage');
});



app.controller('HomeController', function($scope, $http, video_dataholder, $window, $log, $rootScope, localStorageService) {    
          $rootScope.heading = "Adeayo.me";

    });


app.controller('WatchController', function($scope, $http, video_dataholder, $window, $log, $rootScope, localStorageService) {    

   
   $rootScope.heading = "Watch Tech News";

if(video_dataholder.getTiles().length < 1){
 $http({
    method : "GET",
    url : "https://api.parse.com/1/classes/Video",
    headers: { 'X-Parse-Application-Id':'4WShWGs2N5eF0WL3qBj3Gbqm61JyY3tPzSzVU6Q0', 'X-Parse-REST-API-Key':'zzdstYJ7wIe9RMsxbcxD2rg6O2cKc8D53XZL38lf'},
    params: {
        where : {"provider_id":{"$regex":"^UC-kFCSJLpxuJdgMnQz8Dvrg|UCgyqtNWZmIxTx3b6OxTSALw|UCftwRNsjfRo08xYE31tkiyw|UCCjyq_K1Xwfg8Lndy7lKMpA|UCddiUEpeqJcYeBxX1IVBKvQ|UCOmcA3f_RrH6b9NmcNa4tdg|6OW5aJYBFM33zXQlBKPNA|UCSwkELX52qCd-72ubE3lAcw|UCLA_DiR1FfKNvjuUpBHmylQ|UC8wXC0ZCfGt3HaVLy_fdTQw"}},
        order : "-date_published"
    }
        }).then(function mySuccess(response) {
            
      $scope.videos = response.data.results;
      console.log(response.data.results);
      var vs = response.data.results;  
      var vs = arrUnique(vs);

      video_dataholder.setTiles(getTiles(vs));
       $scope.colorTiles = video_dataholder.getTiles();
       $scope.colorTiles1 = video_dataholder.getTiles1();
       $scope.colorTiles2 = video_dataholder.getTiles2();
       $scope.colorTiles3 = video_dataholder.getTiles3();
      $scope.videosLoaded = true;
      
      $rootScope.new_videos = howManyNewVideos(vs);
      localStorageService.set("latest_video_watched", vs[0].date_published.iso);
      video_dataholder.setVideosCount(howManyNewVideos(vs));
     
    }, function myError(response) {
              $scope.videosLoaded = false;
  });
}else{
       $scope.colorTiles = video_dataholder.getTiles();
         $scope.colorTiles1 = video_dataholder.getTiles1();
       $scope.colorTiles2 = video_dataholder.getTiles2();
       $scope.colorTiles3 = video_dataholder.getTiles3();
      $scope.videosLoaded = true;
      $rootScope.new_videos = video_dataholder.getVideosCount();

      
}
  
  var COLORS = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4', '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00', '#d7ccc8', '#bcaaa4', '#795548', '#d7ccc8', '#bcaaa4', '#8d6e63', '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#cfd8dc', '#b0bec5', '#78909c'];

 function howManyNewVideos(arr) {
     
     var d = new Date();
        d.setDate(d.getDate() - 1);
        
     var count = 0;
    arr.forEach(function(item) {
        if(new Date(item.date_published.iso) > d){
            count++;
        }
    });
    return count;
}

   function arrUnique(arr) {
    var cleaned = [];
    arr.forEach(function(itm) {
        var unique = true;
        cleaned.forEach(function(itm2) {
            if (itm.video_id == itm2.video_id) unique = false;
        });
        if (unique)  cleaned.push(itm);
    });
    return cleaned;
}

    
   function getTiles(videos) {
    var tiles = [];
    for (var i = 0; i < videos.length; i++) {
        
        var col, row;
        col = 1; 
        row = 1;
        
     switch(i+1) {
        case 1:
           col = 2; 
            row = 2;
            break;
        case 4:
            col = 2;
            break;
       
        case 5:
        case 10:
        case 15:
        case 20:
        case 25:
        case 30:
        case 35:
        case 40:
        case 45:
        case 50:
        case 55:
        case 60:
        case 65:
        case 70:
        case 75:
        case 80:
        case 85:
        case 90:
        case 95:
        case 100:
          
           col = 2; 
            row = 2;
            break;
        }
        
       var d = new Date(videos[i].date_published.iso);
      tiles.push({
        color: randomColor(),
        colspan: col,
        rowspan: row,
        video: videos[i],
        dateobj: d
      });
    }
    return tiles;
  }


  function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  function randomSpan() {
    var r = Math.random();
    if (r < 0.8) {
      return 1;
    } else if (r < 0.9) {
      return 2;
    } else {
      return 3;
    }
  }
});


app.controller('myAppController', function($scope, $log, $timeout, $mdSidenav, $rootScope) {
$(".button-collapse").sideNav();
          
$scope.spacing = '................................';

$scope.notifyServiceOnChage = function(){
     console.log($scope.windowHeight);
  };
  
  $scope.hide = function (){
      $('.button-collapse').sideNav('show');
  };

});


app.controller('ReadController', function($scope, $http, article_dataholder, $window, $log, $rootScope) { 
    
          $rootScope.heading = "Read Tech News";

    
    $scope.notifyServiceOnChage = function(){
     console.log($scope.windowHeight);
  };
  
  
if(article_dataholder.getTiles().length < 1){
 $http({
    method : "GET",
    url : "https://api.parse.com/1/classes/NewsArticle",
    headers: { 'X-Parse-Application-Id':'4WShWGs2N5eF0WL3qBj3Gbqm61JyY3tPzSzVU6Q0', 'X-Parse-REST-API-Key':'zzdstYJ7wIe9RMsxbcxD2rg6O2cKc8D53XZL38lf'},
    params: {
        where : {"rss_id":{"$regex":"^venture_beat|android_authority|android_central|wired_tech|digital_trends_all|the_verge_mobile_posts|cnet_news|tech_crunch_main|pc_mag"}},
        order : "-date_published"
    }
        }).then(function mySuccess(response) {
            
      $scope.articles = response.data.results;
      console.log(response.data.results);
      var as = response.data.results;  
      var as = arrUnique(as);

      article_dataholder.setTiles(getTiles(as));
      
       $scope.colorTiles = article_dataholder.getTiles();
       $scope.colorTiles1 = article_dataholder.getTiles1();
       $scope.colorTiles2 = article_dataholder.getTiles2();
       $scope.colorTiles3 = article_dataholder.getTiles3();
      $scope.articlesLoaded = true;
      
       $rootScope.new_articles = howManyNewArticles(as);
      localStorageService.set("latest_article_read", as[0].date_published.iso);
      article_dataholder.setArticlesCount(howManyNewArticles(as));

     
    }, function myError(response) {
              $scope.articlesLoaded = false;
  });
}else{
       $scope.colorTiles = article_dataholder.getTiles();
         $scope.colorTiles1 = article_dataholder.getTiles1();
       $scope.colorTiles2 = article_dataholder.getTiles2();
       $scope.colorTiles3 = article_dataholder.getTiles3();
      $scope.articlesLoaded = true;
        $rootScope.new_articles = article_dataholder.getArticlesCount();

}
  
  var COLORS = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4', '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00', '#d7ccc8', '#bcaaa4', '#795548', '#d7ccc8', '#bcaaa4', '#8d6e63', '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#cfd8dc', '#b0bec5', '#78909c'];

function howManyNewArticles(arr) {
    var d = new Date();
        d.setDate(d.getDate() - 1);
     var count = 0;
    arr.forEach(function(item) {
        if(new Date(item.date_published.iso) > d){
            count++;
        }
    });
    return count;
}

   function arrUnique(arr) {
    var cleaned = [];
    arr.forEach(function(itm) {
        var unique = true;
        cleaned.forEach(function(itm2) {
            if (itm.article_id == itm2.article_id) unique = false;
        });
        if (unique)  cleaned.push(itm);
    });
    return cleaned;
}

    
   function getTiles(articles) {
    var tiles = [];
    for (var i = 0; i < articles.length; i++) {
        
        var col, row;
        col = 1; 
        row = 1;
        
     switch(i+1) {
        case 1:
           col = 2; 
            row = 2;
            break;
        case 4:
            col = 2;
            break;
       
        case 5:
        case 10:
        case 15:
        case 20:
        case 25:
        case 30:
        case 35:
        case 40:
        case 45:
        case 50:
        case 55:
        case 60:
        case 65:
        case 70:
        case 75:
        case 80:
        case 85:
        case 90:
        case 95:
        case 100:
          
           col = 2; 
            row = 2;
            break;
        }
        
       var d = new Date(articles[i].date_published.iso);
      tiles.push({
        color: randomColor(),
        colspan: col,
        rowspan: row,
        article: articles[i],
        dateobj: d
      });
    }
    return tiles;
  }


  function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  function randomSpan() {
    var r = Math.random();
    if (r < 0.8) {
      return 1;
    } else if (r < 0.9) {
      return 2;
    } else {
      return 3;
    }
  }
});
app.controller('ProjectsController', function($scope) {
    $scope.image_grid_class="rig columns-3";
});
