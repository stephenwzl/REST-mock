/**
 * Created by wangzhilong on 16/4/8.
 */
var fs = require('fs');

module.exports = function(fileName){
    fs.unlinkSync(__dirname+'/jsonData/'+fileName+'.json');
};