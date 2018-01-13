var express = require('express');
let utopian = require('utopian-api');
let moment = require('moment');
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

router.get('/urgent.json', (req, res) => {
    if (!req.query.account) {
        res.json({count:0,results:[]});
    } else {

        utopian.getPendingPostsByModerator(req.query.account).then((result) => {
            let posts = [];
            if (result.results.length === 0) {
                res.json({count:0,results:[]});
            } else {
                result.results.forEach((post) => {
                    var duration = moment.duration(moment().diff(post.created));
                    var hours = duration.asDays();
                    if (parseInt(hours) >= 4) {
                        posts.push(post);
                    }
                });
                res.json({total:posts.length,results:posts})
            }
        })

    }
});



module.exports = router;
