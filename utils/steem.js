var sc2 = require('sc2-sdk');
var config = require("../config");

var steem = sc2.Initialize({
    app: config.oauth.client_id,
    callbackURL: config.oauth.redirect_uri,
    scope: ["login","offline"]
});

module.exports = steem;