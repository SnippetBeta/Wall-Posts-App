//server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var admin = require("firebase-admin");  //Firebase
     var request = require('request');
     var MetaInspector = require('node-metainspector');
     
     
    var api_key = 'key-04ba0802a7be0f0b8d6aec061d17076e';
    var domain = 'snpyt.com';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    
    var serviceAccount = require("./snippet-c40dd-firebase-adminsdk-lwbj8-3ccdb7575e.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://snippet-c40dd.firebaseio.com"
    });

    var db = admin.database();
        app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
        });
   
    app.set('view engine', 'ejs');


    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


    var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
    
    });


 app.post('/api/validate/image', function(req, res) {
          
          
       if("url" in req.body){

          request('https://api.sightengine.com/1.0/nudity.json?api_user='+ '1807209849' + '&api_secret=' + '5Vbk5hEpaF76us5mR54B' + '&url=' + req.body.url, 
          function (error, response, body) {
              
              console.log(req.body);
              console.log(body);
              
                    if (!error && response.statusCode === 200) {
                        
                      if(JSON.parse(body).status === 'success') {
                            if(JSON.parse(body).nudity.safe > 0.6){
                                res.status(200);
                                res.json(JSON.parse(body));
                            }else{
                                res.status(400);
                                res.json(JSON.parse(body));
                            }
                       }else{
                           res.status(400);
                           res.json(JSON.parse(body));
                       }
                       
                    }else{
                        res.status(400);
                      res.json(JSON.parse(body));
                    }
          });
   
   
        }else{
             res.status(400);
             res.send("INVALID REQUEST");
        }

     });
    
     app.post('/api/crawl', function(req, res) {
         
         console.log(req.body);
         
         if("url" in req.body){
         
            console.log(req.body.url);
          request('http://gateway-a.watsonplatform.net/calls/url/URLGetCombinedData?apikey=d31084e0635902aab7337aef09f56d85afc04fbe&disambiguate=1&outputMode=json&useMetadata=1&extract=page-image,title,author,pub-date&url=' + req.body.url, 
          function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        
                      if("url" in JSON.parse(body)) { 
                            console.log(body); 
                            res.status(200);
                            res.json(JSON.parse(body));
                       }else{
                           res.status(400);
                           res.json(JSON.parse(body));
                       }
                       
                    }else{
                        res.status(400);
                      res.json(JSON.parse(body));
                    }
          });
        }else{
             res.status(400);
             res.send("INVALID REQUEST");
        }
     });
    

/*
     app.get('/', function(req, res) {
          res.status(200);
          res.json({resonse:'SUCESSS'});
     });
*/     
     
       app.post('/api/email/invite', function(req, res) {
       
       
       if("user" in req.body && "invite_url" in req.body && "board" in req.body){
         
  
                    var data = {from: "Snpyt <support@snpyt.com>",
                              to: req.body.user.email,
                              subject: "You've been invited to collaborate",
                              text: "You're invited to collaborate with" + req.body.user.displayName + " on " + req.body.board.name + " \n" + "Click here to view: " + req.body.invite_url};

                    mailgun.messages().send(data, function (error, body) {
                        if(error){
                            res.status(400);
                             res.json(error);


                        }else{
                            res.status(200);
                            res.json({status: 'OK'});
                        }
                      console.log(body);
                    });
                    
           }
 /*
          request.post('https://api.mailgun.net/v3/sandbox080eb090e286457e8795a53468eb25d0.mailgun.org/messages', {from: "Mailgun Sandbox <postmaster@sandbox080eb090e286457e8795a53468eb25d0.mailgun.org>",
              to: "Saboor <snippet.info@gmail.com>",
              subject: "Hello Saboor",
              text: "Congratulations Saboor, you just sent an email with Mailgun!  You are truly awesome!"}) 
          .on('response', function (response) {
                      res.status(400);
                      res.json({status: 'OK'});
          })
          .on('error', function (err) {
              res.status(400);
             res.json(err);
          });
    */
     });
     
     
     app.get('/board', function(req, res) {
        
   if (req.xhr) {
    return res.status(404).send(req.url + ' not found');
  }
  
  
  if(req.param('key')){
      
        var truncate = function(string){
          if (string.length > 55)
             return string.substring(0,55)+'...';
          else
             return string;
       };
      
        var ref = db.ref("boards").child(req.param('key'));


        ref.once("value", function(data) {
            
            if(data.val() !== null){
                
                        data.val();
                        
                        var prev = truncate(data.val().name);

                         var metaTags = {
                            metaTagsUrl: '//snpyt.com/board?key=' + req.param('key'),
                            metaTagsSite: '@Test',
                            metaTagsImg: "http://res.cloudinary.com/veedbeta/image/upload/v1489998648/logo2.fw_eot1kk.png",
                            metaTagsTitle: '\"' + prev + "\"",
                            metaTagsName: 'snpyt',
                            metaTagsType: 'website',
                            metaTagsDescription: '',
                            metaTagsRobots: 'index,follow',
                            metaTagsKeyWords: 'bookmarks,code, colors,images, save, raindropio, pocket, pinterest'
                    };

                    //res.render(path.join(__dirname, './public/index.ejs'), metaTags);//render index.ejs with meta tags

                    res.render('index',metaTags);
             }else{
                 
                    var metaTags = {
		metaTagsUrl: '//thealadeproject.org/apps',
		metaTagsSite: '@Test',
		metaTagsImg: 'http://res.cloudinary.com/veedbeta/image/upload/v1489998648/logo2.fw_eot1kk.png',
		metaTagsTitle: 'The A.L.A.D.E Project: Apps',
		metaTagsName: 'thealadeproject',
		metaTagsType: 'website',
		metaTagsDescription: "Culturally relevant games, apps, and educational resources.",
		metaTagsRobots: 'index,follow',
		metaTagsKeyWords: 'bookmarks,code, colors,images, save, raindropio, pocket, pinterest'
	};

        //res.render(path.join(__dirname, './public/index.ejs'), metaTags);//render index.ejs with meta tags
       
        res.render('index',metaTags);
        
             }
            
        });
      
  }else{
      
 var metaTags = {
		metaTagsUrl: '//snpyt.com',
		metaTagsSite: '@Test',
		metaTagsImg: 'http://res.cloudinary.com/veedbeta/image/upload/v1489992030/mockup2_aett4z.jpg',
		metaTagsTitle: 'Snpyt Beta - A smarter way to save your favorites',
		metaTagsName: 'snpyt',
		metaTagsType: 'website',
		metaTagsDescription: "Conveniently save code, images, colors , text , and articles for later",
		metaTagsRobots: 'index,follow',
		metaTagsKeyWords: 'bookmarks,code, colors,images, save, raindropio, pocket, pinterest'
	};


        //res.render(path.join(__dirname, './public/index.ejs'), metaTags);//render index.ejs with meta tags
       
        res.render('index',metaTags);

        //res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
        
  }
	   
	    
        
        
    });
     
     
     app.get('/*', function(req, res) {
         
          if (req.xhr) {
            return res.status(404).send(req.url + ' not found');
          }
          
   
        var metaTags = {
		metaTagsUrl: '//snpyt.com',
		metaTagsSite: '@Test',
		metaTagsImg: 'http://res.cloudinary.com/veedbeta/image/upload/v1489992030/mockup2_aett4z.jpg',
		metaTagsTitle: 'Snpyt Beta - A smarter way to save your favorites',
		metaTagsName: 'snpyt',
		metaTagsType: 'website',
		metaTagsDescription: "Conveniently save code, images, colors , text , and articles for later",
		metaTagsRobots: 'index,follow',
		metaTagsKeyWords: 'bookmarks,code, colors,images, save, raindropio, pocket, pinterest'
	};

        //res.render(path.join(__dirname, './public/index.ejs'), metaTags);//render index.ejs with meta tags
       
        res.render('index',metaTags);
        
     });

      
