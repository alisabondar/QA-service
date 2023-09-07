const express = require('express');
const router = express.Router();
const models = require('./database/dbModels');

router.get('/qa/questions/:product_id', models.fetchQue);
router.get('/qa/questions/:question_id/answers', models.fetchAns);
router.post('/qa/questions/:product_id', models.postQue);
router.post('/qa/questions/:question_id/answers', models.postAns);
router.put('/qa/questions/:question_id/helpful', models.helpQue);
router.put('/qa/questions/:question_id/report', models.repQue);
router.put('/qa/answers/:answer_id/helpful', models.helpAns);
router.put('/qa/answers/:answer_id/report', models.repAns);
router.get('/loaderio-e37a58cf89c7c4475f8b6f73d6230d8d');

module.exports = router;