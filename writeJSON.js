/**
 * Created by wangzhilong on 16/4/7.
 */
var fs = require('fs');
module.exports = function(fileName, fileString,routerObj,callback){
    fs.writeFile(__dirname+'/jsonData/'+fileName+'.json',fileString, function(err){
        if (err){
            callback(err,null);
        }
        else {
            fs.writeFile(__dirname+'/routers/router.json',JSON.stringify(routerObj),function(err){
                if (err){
                    callback(err,null);
                }
                else {
                    callback(null, 'success');
                }
            });
        }
    });
};