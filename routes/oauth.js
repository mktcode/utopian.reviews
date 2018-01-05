var express = require('express');
var steem = require('../utils/steem')
let utopian = require('utopian-api');
var router = express.Router();

router.get("/t",(req,res) => {

    res.send("hi")
})

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.query.access_token) {
        let uri = steem.getLoginURL();
        res.redirect(uri);
    } else {
        steem.setAccessToken(req.query.access_token);
        steem.me(function(err, response) {
            let mod = utopian.getModerator(response.user);
            mod.then((mod) => {
                console.log(mod)
                if (mod.length === 1 && mod[0].account === response.user) {
                    response.account.json_metadata = JSON.parse(response.account.json_metadata);
                    response.access_token = req.query.access_token;
                    response.utopian = {
                        user: mod
                    };
                    req.session.steem = response;
                    console.log("yes")
                    res.redirect("/")
                } else {
                    req.session.noMod = response.user;
                    console.log("no")
                    res.redirect('/?noMod=true')
                }
            });
        });
    }
});

module.exports = router;
