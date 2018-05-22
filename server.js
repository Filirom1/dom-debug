var http = require('http');
var querystring = require('querystring');

function processPost(request, response, callback) {
  var queryData = "";

  request.on('data', function(data) {
      queryData += data;
  });
  
  request.on('end', function() {
      request.body = queryData
      callback();
  });
}

var server = http.createServer(function(req, res) {
  processPost(req, res, function() {
    res.writeHead(200);
    var output = JSON.stringify({
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      
    }, null, 4);
    console.log(output)
    res.end(output);
  });
});

server.listen(process.env.PORT || 8080);