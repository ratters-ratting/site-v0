var express = require("express");
var router = express.Router();

const shuffle = (arr1) => arr1.sort(() => (Math.random() > 0.5 ? 1 : -1));
const rawQuestions = [
    {
        q: "Respond true",
        a: ["true", "false"],
    },
    {
        q: "Respond false",
        a: ["false", "true"],
    },
];

const questionObj = {};
const questions = [];
for (const question of rawQuestions) {
    questionObj[question.q] = {
        correct: question.a[0],
        all: question.a,
    };
    questions.push(question.q);
}

function generateQuestion() {
    question = questions[Math.floor(Math.random() * questions.length)];
    return {
        q: question,
        a: shuffle(questionObj[question].all),
    };
}

function validateQuestionAnswer(question, answer) {
    return questionObj[question]?.correct == answer;
}

router.get("/", function (req, res, next) {
    res.send(generateQuestion());
});

router.post("/", function (req, res, next) {
    console.log(req.body);
    res.send(validateQuestionAnswer(req.body.question, req.body.answer));
});

module.exports = router;
