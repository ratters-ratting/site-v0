const axios = require("axios");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
    console.log(req.query);
});

router.post("/", (req, res, next) => {
    console.log(req.body);
    axios
        .post("http://127.0.0.1:3000/retrieveQuestion", { question: req.body.question, answer: req.body.answer })
        .then((resp) => resp.data)
        .then((resp) => res.render("index", { title: "Express", resultStatus: resp ? "success" : "failed" }));
});

router.altName = "";
module.exports = router;
