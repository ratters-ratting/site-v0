var express = require('express');
var router = express.Router();
const { render } = require("pug");
const { createHash } = require("crypto");
let d3 = import("d3-array").then(obj => d3 = obj);

const randElem = arr => arr[Math.floor(Math.random() * arr.length)];

const rawQuestions = [{
        q: "Respond true",
        a: ["true", "false"]
    },
    {
        q: "Respond false",
        a: ["false", "true"]
    },
];

const questions = {};
const questionHashes = [];
for (const r of rawQuestions) {
    const hash = createHash("md5").update(r.q).digest("base64");
    questions[hash] = {
        qtn: r.q,
        crct: r.a[0],
        all: r.a
    };
    questionHashes.push(hash);
}


function generate_question() {
    return shuffle(questions[randElem(questionHashes)]);
}

function generateFormBody(queryHash) {
    // const queryHash = randElem(questionHashes);
    const ansrs = d3.shuffle(questions[queryHash].all).map((v, i) => [v, `${i}. ${v}`]);
    // let resp = `input(type="hidden" id="queryHash", name="queryHash", value="${queryHash}")\n`;
    resp = `label(name="queryQuestion" id="queryQuestion") ${questions[queryHash].qtn}\nbr\n`;
    for (const ans of ansrs) {
        resp += `input(type="radio" name="answer" value="${ans[0]}")\n`;
        resp += `label ${ans[1]}\n`;
        resp += `br\n`;
    }
    console.log(resp);
    resp = render(resp);
    return resp.slice(1, resp.length-2);
}



/* GET home page. */
router.get('/', function (req, res, next) {
    const queryHash = randElem(questionHashes);
    res.render('index', {
        title: 'Express',
        queryHash,
        formFormat: generateFormBody(queryHash)
    });
});
router.post('/', (req, res, next) => {
    // console.log(req);
    const queryHash = randElem(questionHashes);
    console.log(req.body);
    res.render('index', {
        title: "Express",
        formFormat: generateFormBody(queryHash)
    });
});


router.altName = "";
module.exports = router;