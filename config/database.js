
module.exports = function(newsql, dbConfig){
  var self = this;

  // Repository paths. Name used as key to reference the repository.
  var repositoryPaths = [
    { name: "user", path: "../lib/repositories/userRepository" }
  ]

  self.initRepositories = function(){
    if(!self.repositories){
      self.repositories = {};
    }
    for(var i = 0; i < repositoryPaths.length; i++){
      var Repo = require(repositoryPaths[i].path);
      self.repositories[repositoryPaths[i].name] = new Repo(newsql);
    }
  }

  // Init all the repositories
  self.initRepositories();

  // Init NewSQL
  newsql.config(dbConfig);
}
