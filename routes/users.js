const express = require('express');
const router = express.Router();

const {
  usersGetController,
  usersPostController,
  usersGetIdController,
  usersPutIdController,
  usersDeleteIdController,
  usersLoginController
} = require('../controller/users-controller');

const {
  validDataUser,
  validDataUpdateUser
} = require('../validations/user-validation');

const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

router
  .route('/')
    // .get(isAdmin, auth, usersGetController)
    .get(usersGetController)
    .post(validDataUser, usersPostController)
;

router
  .route('/:id')
    .get(auth, usersGetIdController)
    .put(auth, validDataUpdateUser, usersPutIdController)
    .delete(auth, usersDeleteIdController)
;

router
  .route('/login')
    .post(usersLoginController)
;

module.exports = router;
