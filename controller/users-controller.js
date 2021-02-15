const User = require('../models/user-model');
const createError = require('http-errors');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

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
      const newUser = req.body;
      const existedUser = await User.find({ email: newUser.email });
      if (existedUser.length > 0) {
        res.status(409).send('Es gibt bereits einen Nutzer mit der Email-Adresse.');
      } else {
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        const createdUser = await User.create({ ...newUser, password: hashedPassword });
        res.status(201).send(createdUser);
      }
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

const usersPutIdController = async (req, res, next) => {
  try {
    const newData = req.body;
    const _id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        fehlerBeiValidierung: errors.array()
      });
    } else {
      const existedUser = await User.find({ email: newData.email });
      if (existedUser.length > 0) {
        res.status(409).send('Es gibt bereits einen Nutzer mit der Email-Adresse.');
      } else if (newData.password) {
        const hashedPassword = await bcrypt.hash(newData.password, 10);
        const updatedUser = await User.findOneAndUpdate({ _id }, { ...newData, password: hashedPassword }, { new: true });
        res.status(200).send(updatedUser);
      } else {
        const updatedUser = await User.findOneAndUpdate({ _id }, newData, { new: true });
        res.status(200).send(updatedUser);
      }
    }
  }
  catch (err) {
    next(err);
  }
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