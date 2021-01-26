const express = require('express');
const router = express.Router();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('meineDatenbank.json');
const meineDatenbank = low(adapter);

meineDatenbank.defaults({ records: [] }).write();

router.get('/', (req, res) => {
  let allRecords = meineDatenbank.get('records').value();
  res.json(allRecords);
});

router.post('/:interpret', (req, res) => {
  let newRecord = {
    interpret: req.params.interpret
  };
  meineDatenbank.get('records').push(newRecord).write();
  res.status(201).send('Gepostet unter dem Interpret: ' + newRecord.interpret);
});

module.exports = router;