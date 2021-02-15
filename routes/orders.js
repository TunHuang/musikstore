const express = require('express');
const router = express.Router();
const {
  ordersGetController,
  ordersPostController,
  ordersGetIdController,
  ordersPutIdController,
  ordersDeleteIdController
} = require('../controller/orders-controller');

const {
  validDataOrder,
  validDataUpdateOrder
} = require('../validations/order-validation');

router
  .route('/')
    .get(ordersGetController)
    .post(validDataOrder, ordersPostController)
;

router
  .route('/:id')
    .get(ordersGetIdController)
    .put(validDataUpdateOrder, ordersPutIdController)
    .delete(ordersDeleteIdController)
;

module.exports = router;