/**
 * Created by wangzhilong on 16/3/29.
 */
var express = require('express');
var app = express();
var fileObjectReader = require('./readJSONFileObject');
var pathHandler = require('./pathHandler');
var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var url = require('url');
var routerLoader = require('./routerLoader');
var bodyParser = require('body-parser');
var settings = require('./config');

app.all('*', function(req, res, next){
    var routers = routerLoader();
    var isRespond = false;
    for (key in routers) {
        if (pathHandler(req.path, key)) {
            isRespond = true;
            fileObjectReader(routers[key],function(err, data){
                if (err) {
                    res.send(err);
                } else  {
                    res.send(data);
                }
            });
        }
    }
    if (!isRespond) {
        next();
    }
});

app.use(function(req, res, next) {
    var u = url.parse(req.url);
    var headers = req.headers;
    delete headers.host;
    var options = {
        host: settings.proxyHost,
        port: u.port || settings.proxyPort ||80,
        path: u.path,
        method: req.method,
        headers: headers
    };
    var sreq = http.request(options, function(sres){
        res.writeHead(sres.statusCode,sres.headers);
        sres.pipe(res);
    });
    req.pipe(sreq);
});

var server = app.listen(80, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("mock server is running on "+ host + ":"+port);
});

//another server for dashboard
var dashboard = express();
dashboard.use(bodyParser.json());
dashboard.use(bodyParser.urlencoded({extended:false}));
dashboard.set('views',require('path').join(__dirname,'views'));
dashboard.use(express.static(__dirname+'/views'));
dashboard.set('view engine', 'ejs');


dashboard.get('/',function(req, res){
    res.render('index',{routers: getRouters()});
});

dashboard.post('/addrouter',function(req, res){
    var route = req.body.pathName;
    var fileString = req.body.pathJSON;
    if (route && fileString) {
        var routers = routerLoader();
        routers[route] = route.replace(/\//g,"%");
        require('./writeJSON')(route.replace(/\//g,"%"),fileString,routers,function(err,success){
            if (success) {
                res.redirect('/');
            }else  {
                res.send(err);
            }
        });
    }
    else {
        res.send('not allowed');
    }
});

dashboard.post('/delete', function(req,res){
    var keyname = req.body.keyname;
    var router = routerLoader();
    var fileName = router[keyname];
    delete router[keyname];
    require('./jsonDelete')(fileName);
    require('./writeRouter')(router,function(err,success){
        var resObj = {
            success: false
        };
        if (err){
        }else {
            resObj.success = true;

        }
        res.send(resObj);
    });
});

function getRouters() {
    var routers = routerLoader();
    var array = [];
    for (key in routers) {
        array.push(key);
    }
    return array;
}

dashboard.listen(3000, function(){
    console.log("dashboard run on 127.0.0.1:3000");
});