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
const user = require('../middleware/userMiddleware');
const admin = require('../middleware/adminMiddleware');

router
  .route('/')
    // .get(isAdmin, auth, usersGetController)
    .get(auth, admin, usersGetController)
    .post(validDataUser, usersPostController)
;

router
  .route('/:id')
    .get(auth, user, usersGetIdController)
    .put(auth, user, validDataUpdateUser, usersPutIdController)
    .delete(auth, user, usersDeleteIdController)
;

router
  .route('/login')
    .post(usersLoginController)
;

module.exports = router;
