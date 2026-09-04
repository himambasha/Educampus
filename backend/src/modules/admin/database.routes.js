const express = require('express');
const router = express.Router();
const { getDatabaseStats, getModelData } = require('./database.controller');

router.get('/stats', getDatabaseStats);
router.get('/model/:model', getModelData);

module.exports = router;