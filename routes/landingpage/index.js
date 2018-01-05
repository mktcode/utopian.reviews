var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    if (req.session.steem) {
        res.redirect('/v');
    } else {
        let options = {noMod: false};
        if (req.query.noMod) {
            options.noMod = true;
            if (!req.session.noMod) {
                res.redirect('/');
            } else {
                options.username = req.session.noMod;
                req.session.destroy();
                res.render('landingpage/index', options);
            }
        } else {
            res.render('landingpage/index');
        }
    }
});

module.exports = router;
