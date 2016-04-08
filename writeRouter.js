/**
 * Created by wangzhilong on 16/4/8.
 */
var fs = require('fs');

module.exports = function(routerObject, callback){
    fs.writeFile(__dirname+'/routers/router.json',JSON.stringify(routerObject),function(err){
        if (err){
            callback(err,null);
        }
        else {
            callback(null,'success');
        }
    });
};