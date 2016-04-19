//var BaseRepo = require('./baseRepository');
// TODO: database meegeven
module.exports = function(newsql){

  var baseRepo = require('./baseRepository')(newsql, 'Users');

  return {
    create: function(req, res, next){
      baseRepo.create(req, res, next);
    },
    getById: function(req, res, next){
      baseRepo.getById(req, res, next);
    },
    updateById: function(req, res, next){
      baseRepo.updateById(req, res, next);
    },
    deleteById: function(req, res, next){
      baseRepo.deleteById(req, res, next);
    },
    // Get all users from database
    getAllUsers: function(req, res, next){
      newsql.find('Users', {}, function(err, users) {
        res.json(users);
      })
    },
    // Add user to database
    createUser: function(req, res, next){
      var data = {};
      for(var k in req.body){
        data[k] = req.body[k];
      }
      newsql.insert('Users', data, function(err, pk) {
        if(err) {  console.log(err); return next(err); }
        else {
          res.send("User '" + data.username + "' is added to the database with PK: " + pk.id);
        }
      })
    },
    // Update a user by Id
    updateUserById: function(req, res, next){
      var data = req.body;

      newsql.update('Users', data, { username: data.username }, function(err) {
        if(err) { console.log(err); return next(err); }
        else {
          console.log("Succesfully updated user");
          res.json("User " + data.username + " is updated");
        }
      })
    },
    // Delete a user by Id
    deleteUserById: function(req, res, next){
      newsql.del('Users', { id: req.body.id }, function(err) {
        if(err) { return next(err); }
        else {
          console.log(err);
          res.send("User with ID " + req.body.id + " is deleted");
        }
      })
    }
  }

}
