/**
 * Created by wangzhilong on 16/3/29.
 */
var fs = require("fs");

module.exports = function(fileName, callback) {
    fs.readFile(__dirname + "/" + fileName + ".json", 'utf-8', function(err, data) {
        if (err) {
            console.log("read error");
            callback(null);
        }
        else {
            data = JSON.parse(data);
            callback(data);
        }
    });
};