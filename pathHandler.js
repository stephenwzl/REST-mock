/**
 * Created by wangzhilong on 16/3/29.
 */
var URLPattern = require('url-pattern');

var pathHandler = function(path,pattern){
    var pattern = new URLPattern(pattern);
    var results = pattern.match(path);
    return results;
};

module.exports = pathHandler;