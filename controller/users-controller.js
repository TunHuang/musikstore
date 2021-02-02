const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('meineDatenbank.json');
const meineDatenbank = low(adapter);
const createError = require('http-errors');

meineDatenbank.defaults({ users: [] }).write();

const usersGetController = (req, res, next) => {
  const allUsers = meineDatenbank.get('users').value();
  res.status(200).json(allUsers);
};

const usersPostController = (req, res, next) => {
  const newUser = req.body;
  const id = Date.now().toString();
  if (!newUser.vorname) {
    const error = createError(422, 'Der Vorname muss angegeben werden.');
    throw error;
  } else if (!newUser.nachname) {
    const error = createError(422, 'Der Nachname muss angegeben werden.');
    throw error;
  } else if (!newUser.email) {
    const error = createError(422, 'Die E-Mail muss angegeben werden.');
    throw error;
  } else if (!newUser.password) {
    const error = createError(422, 'Ein Passwort muss angegeben werden.');
    throw error;
  } else {
    meineDatenbank.get('users').push(newUser)
      .last()
      .assign({ id })
      .write();
    res.status(201).send('Gepostet unter der ID: ' + id);
  }
};

const usersGetIdController = (req, res, next) => {
  const id = req.params.id
  const user = meineDatenbank.get('users')
    .filter({ id })
    .value();
  if (!user.length) {
    const error = createError(422, 'Es gibt keinen User mit der Id ' + id);
    throw error;
  } else {
    res.status(200).json(user);
  }
};

const usersPutIdController = (req, res, next) => {
  const newData = req.body;
  const id = req.params.id;
  const founded = meineDatenbank.get('users').find({ id });
  if (!founded.value()) {
    const error = createError(422, 'Es gibt keinen User mit der Id ' + id);
    throw error;
  } else {
    founded
      .assign(newData)
      .write();
    res.status(200).send('User mit der Id: ' + id + ' mit neuen Datan aktualisiert.');
  }
};

const usersDeleteIdController = (req, res, next) => {
  const id = req.params.id;
  const user = meineDatenbank.get('users')
    .filter({ id })
    .value();
  if (!user.length) {
    const error = createError(422, 'Es gibt keinen User mit der Id ' + id);
    throw error;
  } else {
    meineDatenbank.get('users')
      .remove({ id })
      .write();
    res.status(200).send('User mit der Id: ' + id + ' aus der Datenbank entfernt.');
  }
};

module.exports = { usersGetController, usersPostController, usersGetIdController, usersPutIdController, usersDeleteIdController };