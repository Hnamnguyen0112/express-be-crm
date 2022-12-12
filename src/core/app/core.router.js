const express = require('express');
const apiRouter = require('../../routes');

const router = express.Router();

router.use('/api', apiRouter);

module.exports = router;
