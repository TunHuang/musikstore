const User = require('../models/user-model');

const usersGetController = (req, res, next) => User.find((err, docs) => {
  if (err) {
    res.status(500).send('Fehler bei GET auf /users/: ' + err);
  } else {
    res.status(200).send(docs);
  }
});

const usersPostController = (req, res, next) => {
  const newUser = req.body;
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
    User.create(newUser, (err, user) => {
      if (err) {
        res.status(500).send('Fehler bei POST auf /users/: ' + err);
      } else {
        res.status(201).send('Gepostet als ' + user)
      }
    });
  }
};

const usersGetIdController = (req, res, next) => {
  const _id = req.params.id;
  User.find({ _id }, (err, docs) => {
    if (err) {
      res.status(500).send('Fehler bei GET auf /users/ mit ID: ' + err);
    } else {
      res.status(200).send(docs);
    }
  });
};

const usersPutIdController = (req, res, next) => {
  const newData = req.body;
  const _id = req.params.id;
  User.findOneAndUpdate({ _id }, newData, {new: true}, (err, user) => {
    if (err) {
      next(err);
    } else {
      res.status(200).send(user);
    }
  });
};

const usersDeleteIdController = (req, res, next) => {
  const _id = req.params.id;
  User.deleteOne({ _id }, (err, user) => {
    if (err) {
      res.status(500).send('Fehler beim Löschen: ' + err);
    } else {
      res.status(200).send(user);
    }
  });
};

module.exports = { usersGetController, usersPostController, usersGetIdController, usersPutIdController, usersDeleteIdController };