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
router.get('/loaderio-7f198f81f13f87e24fd020c5f2b52e78.txt', models.loader);

module.exports = router;