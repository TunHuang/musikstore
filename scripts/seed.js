const faker = require('faker');
const mongoose = require('mongoose');
const User = require('../models/user-model');
const Record = require('../models/record-model');
const Order = require('../models/order-model');

const uri = 'mongodb://localhost:27017/seededRecordshop';


mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;

db.on('error', error => console.error(error));

db.once('open', () => {
  console.log('Verbnindung steht');

  // Seeding users
  let users = [];

  // damit die Emails nur aus Kleinbuchstaben besteht, wie sonst durch sanitization erreicht wird.
  // Es ist wichtig für Suche/Vergleich.
  const schreibErsteBuchstabeKlein = str => str.slice(0, 1).toLowerCase() + str.slice(1);

  for (let i = 0; i < 20; i++) {
    const vorname = faker.name.firstName();
    const nachname = faker.name.lastName();
    let newUser = {
      vorname,
      nachname,
      email: faker.internet.email(schreibErsteBuchstabeKlein(vorname), schreibErsteBuchstabeKlein(nachname)),
      password: faker.internet.password(10)
    };
    users.push(newUser);
  }

  let userPromise = User.insertMany(users);

  // Seeding records
  let records = [];

  for (let i = 0; i < 20; i++) {
    const interpret = faker.internet.userName();
    const album = faker.lorem.word();
    const jahr = faker.random.number({
      'min': 1960,
      'max': 2021
    });
    let newRecord = {
      interpret,
      album,
      jahr
    };
    records.push(newRecord);
  }

  let recordPromise = Record.insertMany(records);

  // Seeding orders
  let orders = [];
  for (let i = 0; i < 20; i++) {
    const produktId = faker.random.number(9999999999);
    const anzahl = faker.random.number({
      'min': 1,
      'max': 10
    });
    let newOrder = {
      "produkt-id": produktId,
      anzahl
    };
    orders.push(newOrder);
  }

  let orderPromise = Order.insertMany(orders);

  Promise.all([userPromise, recordPromise, orderPromise]).then(values => {
    console.log('Datenbank erfolgreich geseedet', values);
    db.close();
  }).catch(error => console.error("Fehler beim Seeden", error));
});