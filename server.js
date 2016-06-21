// Muaz Khan   - www.MuazKhan.com
// MIT License - www.WebRTC-Experiment.com/licence
// Source Code - https://github.com/muaz-khan/WebRTC-Scalable-Broadcast

var fs = require("fs");
var path = require('path');

var app = require('http').createServer(function (request, response) {
    var uri = require('url').parse(request.url).pathname,
        filename = path.join(process.cwd(), uri);
    var isWin = !!process.platform.match(/^win/);

    if (fs.statSync(filename).isDirectory()) {
        if(!isWin) filename += '/index.html';
        else filename += '\\index.html';
    }

    fs.exists(filename, function (exists) {
        fs.readFile(filename, 'binary', function (err, file) {

            response.writeHead(200);
            response.write(file, 'binary');
            response.end();
        });
    });
});

app = app.listen(process.env.PORT || 8888, process.env.IP || "0.0.0.0", function() {
    var addr = app.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});

require('./WebRTC-Scalable-Broadcast.js')(app);
