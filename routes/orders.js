const express = require('express');
const router = express.Router();
const { ordersGetController, ordersPostController, ordersGetIdController, ordersPutIdController, ordersDeleteIdController } = require('../controller/orders-controller');

router
  .route('/')
    .get(ordersGetController)
    .post(ordersPostController)
;

router
  .route('/:id')
    .get(ordersGetIdController)
    .put(ordersPutIdController)
    .delete(ordersDeleteIdController)
;

module.exports = router;