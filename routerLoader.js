/**
 * Created by wangzhilong on 16/4/7.
 */
var fs = require('fs');

module.exports = function(){
    var stream = fs.readFileSync('./routers/router.json');
    return JSON.parse(stream.toString());
};