var express = require('express');
var router = express.Router();


module.exports = function(userRepo){

  router.route('/')
    .get(userRepo.getAllUsers)
    .put(userRepo.updateUserById)
    .delete(userRepo.deleteUserById)
    .post(userRepo.create);

  router.route('/:id')
    .get(userRepo.getById)
    .put(userRepo.updateById)
    .delete(userRepo.deleteById);

  return router;
}
