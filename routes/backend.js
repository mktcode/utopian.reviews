let express = require('express');
let utopian = require('utopian-api');
let request = require('request');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    if (!req.session.steem) {
        res.redirect('/auth');
    } else {
        request('https://utopian.team/users/team.json', (err, response, body) => {
            body = JSON.parse(body)
            let sv = req.session.steem.user;
            if (sv == "wehmoen") sv = "mkt";

            res.render('index', {steem:req.session.steem,team_members:body.results[sv].members});
        });
    }
});

router.get('/user/:user', (req, res) => {
    if (!req.session.steem) {
        res.redirect('/auth');
    } else {
        request('https://utopian.team/users/team.json', (err, response, body) => {
            body = JSON.parse(body)
            let sv = req.session.steem.user;
            if (sv == "wehmoen") sv = "mkt";
            res.render('user', {steem:req.session.steem,team_members:body.results[sv].members, user: req.params.user});
        });
    }
});

module.exports = router;
