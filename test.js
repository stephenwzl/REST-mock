/**
 * Created by wangzhilong on 16/4/7.
 */
var exec = require('child_process').exec;

var cmdStr = 'node app.js';
exec(cmdStr, function(err, stdOut, sterr){
   if (err) {
       console.log(sterr);
   }else {
       console.log(stdOut);
   }
});