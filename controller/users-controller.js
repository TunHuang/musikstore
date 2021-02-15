const User = require('../models/user-model');
const createError = require('http-errors');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const usersGetController = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    const error = createError(500, 'Fehler bei GET auf /users/ ' + err);
    next(error);
  }
};

const usersPostController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // kann man den errors-array auch mit middleware ausgeben?
      res.status(422).json({
        fehlerBeiValidierung: errors.array()
      });
    } else {
      const newUser = req.body;
      const existedUser = await User.find({ email: newUser.email });
      if (existedUser.length > 0) {
        const error = createError(409, 'Es gibt bereits einen Nutzer mit der Email-Adresse.');
        next(error);
      } else {
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        const createdUser = await User.create({ ...newUser, password: hashedPassword });
        res.status(201).send(createdUser);
      }
    }
  } catch (err) {
    const error = createError(500, 'Fehler bei POST auf /users/ ' + err);
    next(error);
  }
};

const usersGetIdController = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const foundUser = await User.find({ _id });
    res.status(200).send(foundUser);
  } catch (err) {
    const error = createError(500, 'Fehler bei GET auf /users/ mit ID ' + err);
    next(error);
  }
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
        const error = createError(409, 'Es gibt bereits einen Nutzer mit der Email-Adresse.');
        next(error);
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
    const error = createError(500, 'Fehler bei PUT auf /users/ mit ID ' + err);
    next(error);
  }
};

const usersDeleteIdController = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const result = await User.deleteOne({ _id });
    res.status(200).send(result);
  }
  catch (err) {
    const error = createError(500, 'Fehler bei DELETE auf /users/ mit ID ' + err);
    next(error);
  }
};

module.exports = { usersGetController, usersPostController, usersGetIdController, usersPutIdController, usersDeleteIdController };