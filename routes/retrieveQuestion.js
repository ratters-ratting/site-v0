var express = require('express');
var router = express.Router();

const randElem = arr => arr[Math.floor(Math.random() * arr.length)];

const shuffle = arr1 => arr1.sort(() => (Math.random() > 0.5) ? 1 : -1);
const rawQuestions = [{
        q: "Respond true",
        a: ["true", "false"]
    },
    {
        q: "Respond false",
        a: ["false", "true"]
    },
];

const qObj = {};
const qNames = [];
for (const question of rawQuestions) {
    qObj[question.q] = {
        correct: question.a[0],
        all: question.a
    };
    qNames.push(question.q);
}

function generate_question() {
    elem = randElem(qNames);
    return {
        q: elem,
        a: shuffle(qObj[elem].all)
    };
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send(generate_question());
});

module.exports = router;