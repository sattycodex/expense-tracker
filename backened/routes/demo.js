const express = require('express');
const { demo } = require('../controller/demo');

const router = express.Router();

router.get('/demo', demo);


module.exports = router;