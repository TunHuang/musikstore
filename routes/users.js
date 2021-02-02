const express = require('express');
const router = express.Router();
const { usersGetController, usersPostController, usersGetIdController, usersPutIdController, usersDeleteIdController } = require('../controller/users-controller');

router
  .route('/')
  .get(usersGetController)
  .post(usersPostController)
;

router
  .route('/:id')
  .get(usersGetIdController)
  .put(usersPutIdController)
  .delete(usersDeleteIdController)
;

module.exports = router;
