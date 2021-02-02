const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('meineDatenbank.json');
const meineDatenbank = low(adapter);

meineDatenbank.defaults({ records: [] }).write();

const recordsGetController = (req, res, next) => {
  const allRecords = meineDatenbank.get('records').value();
  res.status(200).json(allRecords);
};

const recordsPostController = (req, res, next) => {
  const newRecord = req.body;
  const id = Date.now().toString();
  if (!newRecord.interpret) {
    const error = new Error('Der Interpret muss angegeben werden.');
    error.statusCode = 422;
    throw error;
  } else if (!newRecord.album) {
    const error = new Error('Das Album muss angegeben werden.');
    error.statusCode = 422;
    throw error;
  } else {
    meineDatenbank.get('records').push(newRecord)
      .last()
      .assign({ id: id })
      .write();
    res.status(201).send('Gepostet unter der Id: ' + id);
  }
};

const recordsGetIdController = (req, res, next) => {
  const id = req.params.id;
  const record = meineDatenbank.get('records')
    .filter({ id })
    .value();
  if (!record.length) {
    const error = new Error('Es gibt kein Record mit der Id ' + id);
    error.statusCode = 422;
    throw error;
  } else {
    res.status(200).json(record);
  }
};

const recordsPutIdController = (req, res, next) => {
  const newData = req.body;
  const id = req.params.id;
  const found = meineDatenbank.get('records').find({ id });
  if (!found.value()) {
    const error = new Error('Es gibt kein Record mit der Id ' + id);
    error.statusCode = 422;
    throw error;
  } else {
    found
      .assign(newData)
      .write();
    res.status(200).send('Record mit der Id: ' + id + ' mit neuen Daten aktualisiert.');
  }
};

const recordsDeleteIdController = (req, res, next) => {
  const id = req.params.id;
  const record = meineDatenbank.get('records')
    .filter({ id })
    .value();
  if (!record.length) {
    const error = new Error('Es gibt kein Record mit der Id ' + id);
    error.statusCode = 422;
    throw error;
  } else {
    meineDatenbank.get('records')
      .remove({ id })
      .write();
    res.status(200).send('Record mit der Id: ' + id + ' aus der Datanbank entfernt.');
  }
};

module.exports = { recordsGetController, recordsPostController, recordsGetIdController, recordsPutIdController, recordsDeleteIdController };