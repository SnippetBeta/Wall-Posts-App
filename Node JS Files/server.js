//server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var admin = require("firebase-admin");  //Firebase
    var request = require('request');
    var MetaInspector = require('node-metainspector');
    
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
    
    
      
