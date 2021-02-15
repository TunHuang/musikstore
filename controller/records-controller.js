const Record = require('../models/record-model');
const { validationResult } = require('express-validator');

const recordsGetController = (req, res, next) => Record.find((err, docs) => {
  if (err) {
    res.status(500).send('Fehler bei GET auf /records/: ' + err);
  } else {
    res.status(200).send(docs);
  }
});

const recordsPostController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        fehlerBeiValidierung: errors.array()
      });
    } else {
      const newRecord = await Record.create(req.body);
      res.status(201).send(newRecord);
    }
  } catch (err) {
    next(err);
  }
};

const recordsGetIdController = (req, res, next) => {
  const _id = req.params.id;
  Record.find({ _id }, (err, docs) => {
    if (err) {
      res.status(500).send('Fehler bei GET auf /records/ mit ID: ' + err);
    } else {
      res.status(200).send(docs);
    }
  });

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
    const error = new Error(err);
    error.status = 500;
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

const recordsDeleteIdController = (req, res, next) => {
  const _id = req.params.id;
  Record.deleteOne({ _id }, (err, record) => {
    if (err) {
      res.status(500).send('Fehler beim Löschen: ' + err);
    } else {
      res.status(200).send(record);
    }
  });

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