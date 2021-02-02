const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('meineDatenbank.json');
const meineDatenbank = low(adapter);

meineDatenbank.defaults({ users: [] }).write();

const usersGetController = (req, res, next) => {
  const allUsers = meineDatenbank.get('users').value();
  res.status(200).json(allUsers);
};

const usersPostController = (req, res, next) => {
  const newUser = req.body;
  const id = Date.now().toString();
  meineDatenbank.get('users').push(newUser)
    .last()
    .assign({id: id})
    .write();
  res.status(201).send('Gepostet unter der ID: ' + id);
};

const usersGetIdController = (req, res, next) => {
  const user = meineDatenbank.get('users')
    .filter({id: req.params.id})
    .value();
  res.status(200).json(user);
};

const usersPutIdController = (req, res, next) => {
  const newData = req.body;
  const id = req.params.id;
  meineDatenbank.get('users')
    .find({id: id})
    .assign(newData)
    .write();
  res.status(200).send('User mit der Id: ' + id + ' mit neuen Datan aktualisiert.');
};

const usersDeleteIdController = (req, res, next) => {
  const id = req.params.id;
  meineDatenbank.get('users')
    .remove({id: id})
    .write();
  res.status(200).send('User mit der Id: ' + id + ' aus der Datenbank entfernt.');
};

module.exports = { usersGetController, usersPostController, usersGetIdController, usersPutIdController, usersDeleteIdController };