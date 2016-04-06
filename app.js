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

//app.get('/v1/carts/:sid/addresses', function(req, res){
//    var addresses = fileObjectReader('addresses', function(data){
//        if (data) {
//            res.contentType("application/json");
//            res.send(JSON.stringify(data));
//        }
//        else {
//            res.error("not found");
//        }
//    });
//});

app.all('*', function(req, res, next){
    console.log(req.path);
    next();
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
