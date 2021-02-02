const express = require('express');
const router = express.Router();
const { recordsGetController, recordsPostController, recordsGetIdController, recordsPutIdController, recordsDeleteIdController } = require('../controller/records-controller');

router
  .route('/')
    .get(recordsGetController)
    .post(recordsPostController)
;

router
  .route('/:id')
  .get(recordsGetIdController)
  .put(recordsPutIdController)
  .delete(recordsDeleteIdController)
;

module.exports = router;