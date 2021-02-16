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

const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

router
  .route('/')
    .get(recordsGetController)
    .post(auth, validDataRecord, recordsPostController)
;

router
  .route('/:id')
    .get(recordsGetIdController)
    .put(validDataUpdateRecord, recordsPutIdController)
    .delete(recordsDeleteIdController)
;

module.exports = router;