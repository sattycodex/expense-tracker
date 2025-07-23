const express = require('express');
const {home} = require('../controller/dashboard.controller');


const router = express.Router();

router.get('/home', home);


module.exports = router;