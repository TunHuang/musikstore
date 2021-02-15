const Order = require('../models/order-model');
const createError = require('http-errors');
const { validationResult } = require('express-validator');

const ordersGetController = (req, res, next) => Order.find((err, docs) => {
  if (err) {
    res.status(500).send('Fehler bei GET auf /orders/: ' + err);
  } else {
    res.status(200).send(docs);
  }
});

const ordersPostController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        fehlerBeiValidierung: errors.array()
      });
    } else {
      const newOrder = await Order.create(req.body);
      res.status(201).send(newOrder);
    }
  } catch (err) {
    next(err);
  }
};

const ordersGetIdController = (req, res, next) => {
  const _id = req.params.id;
  Order.find({ _id }, (err, docs) => {
    if (err) {
      res.status(500).send('Fehler bei GET auf /users/ mit ID: ' + err);
    } else {
      res.status(200).send(docs);
    }
  });
};

const ordersPutIdController = async (req, res, next) => {
  try {
    const newData = req.body;
    const _id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        fehlerBeiValidierung: errors.array()
      });
    } else {
      const updatedOrder = await Order.findOneAndUpdate({ _id }, newData, { new: true });
      res.status(200).send(updatedOrder);
    }
  }
  catch (err) {
    const error = createError(500, err);
    next(error);
  }
};

const ordersDeleteIdController = (req, res, next) => {
  const _id = req.params.id;
  Order.deleteOne({ _id }, (err, order) => {
    if (err) {
      res.status(500).send('Fehler beim Löschen: ' + err);
    } else {
      res.status(200).send(order);
    }
  });
};

module.exports = { ordersGetController, ordersPostController, ordersGetIdController, ordersPutIdController, ordersDeleteIdController };