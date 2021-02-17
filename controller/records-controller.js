const Record = require('../models/record-model');
const User = require('../models/user-model');
const { validationResult } = require('express-validator');
const createError = require('http-errors');

const recordsGetController = async (req, res, next) => {
  try {
    const records = await Record.find();
    res.status(200).send(records);
  } catch (err) {
    const error = createError(500, 'Fehler bei GET auf /records/ ' + err);
    next(error);
  }
};

const recordsPostController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const user = await User.findOne({_id : req.tokenUser.userId});
    if (!user.admin) {
      res.status(401).send('Nur Administratoren dürfen das tun.');
    } else if (!errors.isEmpty()) {
      res.status(422).json({
        fehlerBeiValidierung: errors.array()
      });
    } else {
      const newRecord = await Record.create(req.body);
      res.status(201).send(newRecord);
    }
  } catch (err) {
    const error = createError(500, 'Fehler bei POST auf /records/ ' + err);
    next(error);
  }
};

const recordsGetIdController = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const foundRecord = await Record.find({ _id });
    res.status(200).send(foundRecord);
  } catch (err) {
    const error = createError(500, 'Fehler bei GET auf /records/ mit ID ' + err);
    next(error);
  };

  // const record = meineDatenbank.get('records')
  //   .filter({ id })
  //   .value();
  // if (!record.length) {
  //   const error = new Error('Es gibt kein Record mit der Id ' + id);
  //   error.statusCode = 422;
  //   throw error;
  // } else {
  //   res.status(200).json(record);
  // }
};

const recordsPutIdController = async (req, res, next) => {
  try {
    const newData = req.body;
    const _id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        fehlerBeiValidierung: errors.array()
      });
    } else {
      const updatedRecord = await Record.findOneAndUpdate({ _id }, newData, { new: true });
      res.status(200).send(updatedRecord);
    }
  }
  catch (err) {
    const error = createError(500, 'Fehler bei PUT auf /records/ mit ID ' + err);
    next(error);
  }

  // const found = meineDatenbank.get('records').find({ id });
  // if (!found.value()) {
  //   const error = new Error('Es gibt kein Record mit der Id ' + id);
  //   error.statusCode = 422;
  //   throw error;
  // } else {
  //   found
  //     .assign(newData)
  //     .write();
  //   res.status(200).send('Record mit der Id: ' + id + ' mit neuen Daten aktualisiert.');
  // }
};

const recordsDeleteIdController = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const result = await Record.deleteOne({ _id });
    res.status(200).send(result);
  }
  catch (err) {
    const error = createError(500, 'Fehler bei DELETE auf /records/ mit ID ' + err);
    next(error);
  }

  // const record = meineDatenbank.get('records')
  //   .filter({ id })
  //   .value();
  // if (!record.length) {
  //   const error = new Error('Es gibt kein Record mit der Id ' + id);
  //   error.statusCode = 422;
  //   throw error;
  // } else {
  //   meineDatenbank.get('records')
  //     .remove({ id })
  //     .write();
  //   res.status(200).send('Record mit der Id: ' + id + ' aus der Datanbank entfernt.');
  // }
};

module.exports = { recordsGetController, recordsPostController, recordsGetIdController, recordsPutIdController, recordsDeleteIdController };