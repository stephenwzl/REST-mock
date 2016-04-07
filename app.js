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
    var options = {
        host: 'restapi.elenet.me',
        port: u.port || 80,
        path: u.path,
        method: req.method,
        headers: {
            'cookie':req.header('cookie'),
            'User-Agent': req.header('User-Agent') || '',
            'X-DeviceInfo': req.header('X-DeviceInfo') || ''
        }
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

////another server for dashboard
//var dashboard = express();
//
//dashboard.set('views',require('path').join(__dirname,'views'));
//dashboard.set('view engine', 'html');
//dashboard.use(express.static(__dirname+'/views'));
//
//dashboard.get('/',function(req, res){
//    res.render('index');
//});
//
//dashboard.listen(3000, function(){
//    console.log("dashboard run on 127.0.0.1:3000");
//});