const { getAPIOpenSecurity } = require('../auth');

const router = require('express').Router();

router.get('/security', getAPIOpenSecurity);

module.exports = router;