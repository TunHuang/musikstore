const express = require('express');
const router = express.Router();

const {
  recordsGetController,
  recordsPostController,
  recordsGetIdController,
  recordsPutIdController,
  recordsDeleteIdController
} = require('../controller/records-controller');

const {
  validDataRecord,
  validDataUpdateRecord
} = require('../validations/record-validation');

router
  .route('/')
    .get(recordsGetController)
    .post(validDataRecord, recordsPostController)
;

router
  .route('/:id')
    .get(recordsGetIdController)
    .put(validDataUpdateRecord, recordsPutIdController)
    .delete(recordsDeleteIdController)
;

module.exports = router;