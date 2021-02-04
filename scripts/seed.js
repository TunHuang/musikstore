const faker = require('faker');
const mongoose = require('mongoose');
const User = require('../models/user-model');
const Record = require('../models/record-model');
const Order = require('../models/order-model');

const uri = 'mongodb://localhost:27017/kleinseeding';


mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

let users = [];
for (let i = 0; i < 20; i++) {
  const vorname = faker.name.firstName();
  const nachname = faker.name.lastName();
  let newUser = {
    vorname,
    nachname,
    email: faker.internet.email(vorname, nachname),
    password: faker.internet.password(10)
  };
  users.push(newUser);
}

User.insertMany(users);

let records = [];
for (let i = 0; i < 20; i++) {
  const interpret = faker.internet.userName();
  const album = faker.lorem.word();
  const jahr = 2010;
  let newRecord = {
    interpret,
    album,
    jahr
  };
  records.push(newRecord);
}

Record.insertMany(records);

let orders = [];
for (let i = 0; i < 20; i++) {
  const produktId = faker.random.number(9999999999);
  const anzahl = faker.random.number(10);
  let newOrder = {
    "produkt-id": produktId,
    anzahl
  };
  orders.push(newOrder);
}

Order.insertMany(orders);

mongoose.connection.close;