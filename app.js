/**
 * Created by wangzhilong on 16/3/29.
 */
var express = require('express');
var app = express();
var fileObjectReader = require('./readJSONFileObject');
var pathHandler = require('./pathHandler');

app.get('/*', function(req, res){
    console.log(req.path);
    pathHandler(req.path);
    res.send('mock in develop');
});

app.get('/v1/carts/:sid/addresses', function(req, res){
    var addresses = fileObjectReader('addresses', function(data){
        if (data) {
            res.contentType("application/json");
            res.send(JSON.stringify(data));
        }
        else {
            res.status(404);
            res.send('error');
        }
    });
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("mock server is running on "+ host + ":"+port);
});