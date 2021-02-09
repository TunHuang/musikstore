const Order = require('../models/order-model');

const ordersGetController = (req, res, next) => Order.find((err, docs) => {
  if (err) {
    res.status(500).send('Fehler bei GET auf /orders/: ' + err);
  } else {
    res.status(200).send(docs);
  }
});

const ordersPostController = (req, res, next) => {
  const newOrder = req.body;
  const id = Date.now().toString();
  if (!newOrder['produkt-id']) {
    const error = createError(422, 'Die Produkt-Id muss angegeben werden.');
    throw error;
  } else if (!newOrder.anzahl) {
    const error = createError(422, 'Die Anzahl muss angegeben werden.');
    throw error;
  } else {
    Order.create(newOrder, (err, order) => {
      if (err) {
        res.status(500).send('Fehler bei POST auf /orders/: ' + err);
      } else {
        res.status(201).send('Gepostet als ' + order)
      }
    });
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

const ordersPutIdController = (req, res, next) => {
  const newData = req.body;
  const _id = req.params.id;
  Order.findOneAndUpdate({ _id }, newData, {new:true}, (err, order) => {
    if (err) {
      next(err);
    } else {
      res.status(200).send(order);
    }
  });
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