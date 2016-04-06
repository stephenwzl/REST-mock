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

app.get('/v1/carts/:sid/addresses', function(req, res, next){
    var addresses = fileObjectReader('addresses', function(data){
        if (data) {
            res.contentType("application/json");
            res.send(JSON.stringify(data));
        }
        else {
            next();
        }
    });
});

app.use(function(req, res, next) {
    console.log(req.originalUrl);
    var sreq = http.request({
        host:     'restapi.elenet.me', // 目标主机
        path:     req.originalUrl,
        method:   req.method, // 请求方式
        headers:  req.headers
    }, function(sres){
        res.writeHead(sres.statusCode,sres.headers);
        sres.pipe(res);
        sres.on('end', function(){
            console.log(req.originalUrl + 'done');
        });
    });
    req.pipe(sreq);
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("mock server is running on "+ host + ":"+port);
});
