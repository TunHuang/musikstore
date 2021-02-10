const User = require('../models/user-model');
const createError = require('http-errors');
const { validationResult } = require('express-validator');

const usersGetController = (req, res, next) => User.find((err, docs) => {
  if (err) {
    res.status(500).send('Fehler bei GET auf /users/: ' + err);
  } else {
    res.status(200).send(docs);
  }
});

const usersPostController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        fehlerBeiValidierung: errors.array()
      });
    } else {
      const newUser = await User.create(req.body);
      res.status(200).send(newUser);
    }
  } catch (err) {
    next(err);
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
  User.findOneAndUpdate({ _id }, newData, { new: true }, (err, user) => {
    if (err) {
      const error = createError(500, err);
      next(error);
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