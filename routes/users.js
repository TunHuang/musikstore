const express = require('express');
const router = express.Router();

const {
  usersGetController,
  usersPostController,
  usersGetIdController,
  usersPutIdController,
  usersDeleteIdController
} = require('../controller/users-controller');

const {
  validDataUser,
  validDataUpdateUser
} = require('../validations/user-validation');

router
  .route('/')
    .get(usersGetController)
    .post(validDataUser, usersPostController)
;

router
  .route('/:id')
    .get(usersGetIdController)
    .put(validDataUpdateUser, usersPutIdController)
    .delete(usersDeleteIdController)
;

module.exports = router;
