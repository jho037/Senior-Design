var express = require('express');
var router = express.Router();
const { receivePublicToken, getTransactions, getProgressTransactions, unLink } = require("./controller");

router.post('/get_access_token', receivePublicToken);
/* GET home page. */
router.post('/', getTransactions);
router.post('/progressTrans', getProgressTransactions);
router.post('/unLink', unLink);

module.exports = router;
