var express = require('express');
var router = express.Router();
const { receivePublicToken, getTransactions } = require("./controller");

router.post('/get_access_token', receivePublicToken);
/* GET home page. */
router.post('/', getTransactions);
module.exports = router;
