const { check } = require('express-validator');

const validDataUser = [
  check('vorname')
    .not()
    .isEmpty()
    .withMessage('Vorname muss angegeben werden.')
    .isAlpha('de-DE', { ignore: ' -' })
    .withMessage('Vorname enthält unzulässige Zeichen')
    .trim(),
  check('nachname')
    .not()
    .isEmpty()
    .withMessage('Nachname muss angegeben werden.')
    .isAlpha('de-DE', {ignore: ' -'})
    .withMessage('Nachname enthält unzulässige Zeichen')
    .trim(),
  check('email')
    .not()
    .isEmpty()
    .withMessage('E-Mail muss angegeben werden.')
    .isEmail()
    .withMessage('E-Mail-Format ist ungültig.')
    .trim()
    .normalizeEmail(),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Passwort muss angegeben werden.')
    .isStrongPassword()
    .withMessage('Passwort ist nicht sicher. Es soll mindestens acht Zeichen enthalten, davon mindestens eine Kleinbuchstabe, mindestens eine Großbuchstabe, mindestens eine Nummer und mindestens ein Sonderzeichen.')
    .trim(),
  check('isAdmin')
    .optional()
    .isBoolean()
];

const validDataUpdateUser = [
  check('vorname')
    .not()
    .isEmpty()
    .optional()
    .withMessage('Vorname muss angegeben werden.')
    .isAlpha('de-DE', { ignore: ' -' })
    .withMessage('Vorname enthält unzulässige Zeichen')
    .trim(),
  check('nachname')
    .not()
    .isEmpty()
    .optional()
    .withMessage('Nachname muss angegeben werden.')
    .isAlpha('de-DE', {ignore: ' -'})
    .withMessage('Nachname enthält unzulässige Zeichen')
    .trim(),
  check('email')
    .not()
    .isEmpty()
    .optional()
    .withMessage('E-Mail muss angegeben werden.')
    .isEmail()
    .withMessage('E-Mail-Format ist ungültig.')
    .trim()
    .normalizeEmail(),
  check('password')
    .not()
    .isEmpty()
    .optional()
    .withMessage('Passwort muss angegeben werden.')
    .isStrongPassword()
    .withMessage('Passwort ist nicht sicher. Es soll mindestens acht Zeichen enthalten, davon mindestens eine Kleinbuchstabe, mindestens eine Großbuchstabe, mindestens eine Nummer und mindestens ein Sonderzeichen.')
    .trim()
];

module.exports = {
  validDataUser,
  validDataUpdateUser
};