var express = require('express');
let utopian = require('utopian-api');
let moment = require('moment');
let rq = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json([]);
});

router.get('/moderator.json', (req, res) => {
    if (!req.query.account) {
        res.json({});
    } else {

        Promise.all([
            utopian.getModerator(req.query.account),
            utopian.getPendingPostsByModerator(req.query.account)
        ]).then((results) => {
            res.json(Object.assign(results[0][0],{pending_posts:results[1].total}));
        })
    }
});

router.get('/posts/:status/:user.json', (req,res) => {

    let status = req.params.status;
    if (req.query.skip) {
        skip = parseInt(req.query.skip);
        if (skip < 0 || skip > 50) {
            skip = 20;
        }
    } else {
        skip = 0;
    }
    let limit = parseInt(req.query.limit);

    if (limit < 0 || limit > 50) {
        limit = 20;
    }

    if (status !== "accepted" && status !== "hidden") {
        next();
    } else {
        rq("https://utopian.plus/posts/"+status+"/"+req.params.user+".json?skip="+skip+"&limit="+limit, (err,result,body) => {
            res.json(JSON.parse(body));
        })
    }

});


module.exports = router;
