module.exports = function(){

  var config = {};

  // Database config
  config.database = {
    dbConfig: {
        "host"     : "127.0.0.1",
        "database" : "API_Test",
        "user"     : "root",
        "password" : "root",
        "port"     : 8889,
        "supportBigNumbers" : true,
        "connectionLimit"   : 32
    },
    "autoConvert": true
  }

  return config;
}
