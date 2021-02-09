const Record = require('../models/record-model');

const recordsGetController = (req, res, next) => Record.find((err, docs) => {
  if (err) {
    res.status(500).send('Fehler bei GET auf /records/: ' + err);
  } else {
    res.status(200).send(docs);
  }
});

const recordsPostController = (req, res, next) => {
  const newRecord = req.body;
  if (!newRecord.interpret) {
    const error = new Error('Der Interpret muss angegeben werden.');
    error.statusCode = 422;
    throw error;
  } else if (!newRecord.album) {
    const error = new Error('Das Album muss angegeben werden.');
    error.statusCode = 422;
    throw error;
  } else {
    Record.create(newRecord, (err, record) => {
      if (err) {
        res.status(500).send('Fehler bei POST auf /records/: ' + err);
      } else {
        res.status(201).send('Gepostet als ' + record);
      }
    });
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

const recordsPutIdController = (req, res, next) => {
  const newData = req.body;
  const _id = req.params.id;
  Record.findOneAndUpdate({ _id }, newData, { new: true }, (err, record) => {
    if (err) {
      next(err);
    } else {
      res.status(200).send(record);
    }
  });

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