const express = require('express');
const router = express.Router();
const undefinedController = require('../controller/undefined-controller');

router
  .route('*')
    .get(undefinedController)
    .post(undefinedController)
    .put(undefinedController)
    .delete(undefinedController)
;

module.exports = router;