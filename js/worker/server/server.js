/*
 * Web Server
 */
var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
    ).listen(8080);

/*
 * Finanace data server
 */
var http = require('http');
    
var options = {
  hostname: 'download.finance.yahoo.com',
  port: 80,
  path: '/d/quotes.csv?s=GOOG&f=snr',
  method: 'GET'
};

http.get(options, function(response) {
  response.setEncoding(encoding="utf8");
      response.addListener('data', function (data) {
        console.log(data);
      });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

