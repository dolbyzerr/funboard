require("babel/register")
var app = require("./lib/server")
var build = require("./lib/build")
var package = require('./package.json')

build.run(function(err, stats){
  if (err) { throw err }
  console.log('- build complete')

  var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('- %s app listening at http://%s:%s', package.name, host, port);

  })
})

