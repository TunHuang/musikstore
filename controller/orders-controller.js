const Order = require('../models/order-model');
const createError = require('http-errors');
const { validationResult } = require('express-validator');

const ordersGetController = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (err) {
    const error = createError(500, err);
    next(error);
  }
};

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
    const error = createError(500, err);
    next(error);
  }
};

const ordersGetIdController = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const foundOrder = await Order.find({ _id });
    res.status(200).send(foundOrder);
  } catch (err) {
    const error = createError(500, 'Fehler bei GET auf /orders/ mit ID ' + err);
    next(error);
  }
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