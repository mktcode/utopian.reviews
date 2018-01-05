let express = require('express');
let utopian = require('utopian-api');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    if (!req.session.steem) {
        res.redirect('/auth');
    } else {
        Promise.all([
            utopian.getPendingPostsByModerator(req.session.steem.name)
        ]).then((responses) => {
            console.log(responses[0].total)
            res.render('index', {steem:req.session.steem, pending_posts: responses[0]});
        });
    }
});

module.exports = router;
