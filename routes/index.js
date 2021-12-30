var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.query);
    res.render('index', { title: 'Express' });
});


router.post('/', (req, res, next) => {
    console.log(req.body);
    res.render('index', { title: "Express" });
});


router.altName = "";
module.exports = router;
