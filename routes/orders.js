const express = require('express');
const router = express.Router();
const {
  ordersGetController,
  ordersPostController,
  ordersGetIdController,
  ordersPutIdController,
  ordersDeleteIdController
} = require('../controller/orders-controller');

const { check } = require('express-validator');

const validDataOrder = [
  check('produkt-id')
    .not()
    .isEmpty()
    .withMessage('Produkt-ID muss angegeben werden.')
    .trim(),
  check('anzahl')
    .not()
    .isEmpty()
    .withMessage('Anzahl muss angegeben werden')
    .isInt({
      min: 1,
      max: 30
    })
    .withMessage('Anzahl soll eine ganze Zahl zwischen 1 und 30 sein.')
    .trim()
];

const validDataUpdateOrder = [
  check('produkt-id')
    .not()
    .isEmpty()
    .optional()
    .withMessage('Produkt-ID muss angegeben werden.')
    .trim(),
  check('anzahl')
    .not()
    .isEmpty()
    .optional()
    .withMessage('Anzahl muss angegeben werden')
    .isInt({
      min: 1,
      max: 30
    })
    .withMessage('Anzahl soll eine ganze Zahl zwischen 1 und 30 sein.')
    .trim()
];

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