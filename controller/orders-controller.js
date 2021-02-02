const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('meineDatenbank.json');
const meineDatenbank = low(adapter);
const createError = require('http-errors');

meineDatenbank.defaults({ orders: [] }).write();

const ordersGetController = (req, res, next) => {
  const allOrders = meineDatenbank.get('orders').value();
  res.status(200).json(allOrders);
};

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
    meineDatenbank.get('orders').push(newOrder)
      .last()
      .assign({ id })
      .write();
    res.status(201).send('Gepostet unter der Id: ' + id);
  }
};

const ordersGetIdController = (req, res, next) => {
  const id = req.params.id;
  const order = meineDatenbank.get('orders')
    .filter({ id })
    .value();
  if (!order.length) {
    const error = createError(422, 'Es gibt keine Bestellung mit der Id ' + id);
    throw error;
  } else {
    res.status(200).json(order);
  }
};

const ordersPutIdController = (req, res, next) => {
  const newData = req.body;
  const id = req.params.id;
  const founded = meineDatenbank.get('orders').find({ id });
  if (!founded.value()) {
    const error = createError(422, 'Es gibt keine Bestellung mit der Id ' + id);
    throw error;
  } else {
    founded
      .assign(newData)
      .write();
    res.status(200).send('Bestellung mit der Id: ' + id + ' mit neuen Datan aktualisiert.');
  }
};

const ordersDeleteIdController = (req, res, next) => {
  const id = req.params.id;
  const order = meineDatenbank.get('orders')
    .filter({ id })
    .value();
  if (!order.length) {
    const error = createError(422, 'Es gibt keine Bestellung mit der Id ' + id);
    throw error;
  } else {
    meineDatenbank.get('orders')
      .remove({ id })
      .write();
    res.status(200).send('Bestellung mit der Id: ' + id + ' aus der Datenbank entfernt.');
  }
};

module.exports = { ordersGetController, ordersPostController, ordersGetIdController, ordersPutIdController, ordersDeleteIdController };