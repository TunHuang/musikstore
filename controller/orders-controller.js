const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('meineDatenbank.json');
const meineDatenbank = low(adapter);

meineDatenbank.defaults({ orders: [] }).write();

const ordersGetController = (req, res, next) => {
  const allOrders = meineDatenbank.get('orders').value();
  res.status(200).json(allOrders);
};

const ordersPostController = (req, res, next) => {
  const newOrder = req.body;
  const id = Date.now().toString();
  meineDatenbank.get('orders').push(newOrder)
    .last()
    .assign({ id })
    .write();
  res.status(201).send('Gepostet unter der Id: ' + id);
};

const ordersGetIdController = (req, res, next) => {
  const order = meineDatenbank.get('orders')
    .filter({id: req.params.id})
    .value();
  res.status(200).json(order);
};

const ordersPutIdController = (req, res, next) => {
  const newData = req.body;
  const id = req.params.id;
  meineDatenbank.get('orders')
    .find({id})
    .assign(newData)
    .write();
  res.status(200).send('Order mit der Id: ' + id + ' mit neuen Datan aktualisiert.');
};

const ordersDeleteIdController = (req, res, next) => {
  const id = req.params.id;
  meineDatenbank.get('orders')
    .remove({id})
    .write();
  res.status(200).send('Order mit der Id: ' + id + ' aus der Datenbank entfernt.');
};

module.exports = { ordersGetController, ordersPostController, ordersGetIdController, ordersPutIdController, ordersDeleteIdController };