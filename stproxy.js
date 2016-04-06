/**
 * Created by wangzhilong on 16/4/1.
 */
var urllib  = require('url');
var request = require('request');
var _ = require('lodash');


var ALLOW_HOSTNAME = [
    'restapi.elenet.me'
];
module.exports = function (req, res, next) {
    var url = decodeURIComponent(req.query.url);
    var hostname = urllib.parse(url).hostname;

    if (ALLOW_HOSTNAME.indexOf(hostname) === -1) {
        return res.send(hostname + ' is not allowed');
    }

    request.get({
            url: url,
            headers: _.omit(req.headers, ['cookie', 'refer']),
        })
        .on('response', function (response) {
            res.set(response.headers);
        })
        .on('error', function (err) {
            console.log(err);
        })
        .pipe(res);
};