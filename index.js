var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
app.engine('html', ejs.renderFile);

app.use(express.static(__dirname + '/public'));
app.use(function(req, res){
    res.render('index.html');
});

var queue = ['http://placekitten.com/500/500'];

function changeImage(image){
    io.sockets.emit('image:change', image);
}

io.on('connection', function(socket){

    socket.on('image:set', function(url){
        queue.push(url);
    });

    socket.on('image:upload', function(options, binaryData){
        var buf = new Buffer(binaryData, 'binary')
        fs.writeFile( path.resolve(__dirname, 'public', 'images', options.name) , buf, function(err){
            if(err) { console.log(err); return; }
            queue.push('/images/' + options.name);
        });
    });

    setInterval(function(){
        if(queue.length){
            changeImage(queue.shift());
        }
    }, 5000);

});
