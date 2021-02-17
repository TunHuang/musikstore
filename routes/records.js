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
const admin = require('../middleware/adminMiddleware');

router
  .route('/')
    .get(recordsGetController)
    .post(auth, admin, validDataRecord, recordsPostController)
;

router
  .route('/:id')
    .get(recordsGetIdController)
    .put(auth, admin, validDataUpdateRecord, recordsPutIdController)
    .delete(auth, admin, recordsDeleteIdController)
;

module.exports = router;