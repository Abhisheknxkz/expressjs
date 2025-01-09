const router = require('express').Router();
const getProductsCRUD = require('../products/routers');

router.use('/products', getProductsCRUD);

module.exports = router;