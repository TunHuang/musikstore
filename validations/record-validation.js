const { check } = require('express-validator');

const validDataRecord = [
  check('interpret')
    .not()
    .isEmpty()
    .withMessage('Interpret muss angegeben werden.')
    .trim()
    .escape(),
  check('album')
    .not()
    .isEmpty()
    .withMessage('Album muss angegeben werden.')
    .trim()
    .escape(),
  check('jahr')
    .not()
    .isEmpty()
    .withMessage('Erscheinungsjahr muss angegeben werden.')
    .isInt({
      min: 1960,
      max: 2021
    })
    .withMessage('Erscheinungsjahr muss zwischen 1960 und 2021 liegen.')
    .trim()
];

const validDataUpdateRecord = [
  check('interpret')
    .not()
    .isEmpty()
    .withMessage('Interpret muss angegeben werden.')
    .optional()
    .trim()
    .escape(),
  check('album')
    .not()
    .isEmpty()
    .withMessage('Album muss angegeben werden.')
    .optional()
    .trim()
    .escape(),
  check('jahr')
    .not()
    .isEmpty()
    .withMessage('Erscheinungsjahr muss angegeben werden.')
    .optional()
    .isInt({
      min: 1960,
      max: 2021
    })
    .withMessage('Erscheinungsjahr muss zwischen 1960 und 2021 liegen.')
    .trim()
];

module.exports = {
  validDataRecord,
  validDataUpdateRecord
};