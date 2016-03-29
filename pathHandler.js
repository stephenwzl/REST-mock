/**
 * Created by wangzhilong on 16/3/29.
 */
var URLPattern = require('url-pattern');

var pathHandler = function(path){
    var pattern = new URLPattern('/user/:id/addresses');
    var results = pattern.match(path);
    console.log(results);
};

module.exports = pathHandler;