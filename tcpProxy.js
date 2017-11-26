var net = require('net');
var http = require('http');

var targetHostname = '127.0.0.1'
var targetNumport = 3000

var tcpServer = net.createServer(function(socket) {	
	socket.on('data', function(data) {
	   console.log('\n\nReceived msg from sensor:\n\n' + data);

	   var options = {
	       host: targetHostname,
	       port: targetNumport,
	       method: 'POST',
           path: '/sensors/alarm',
	       headers: {
               'Content-Type': 'application/json',
       		   'Content-Length': Buffer.byteLength(data)
  	       }
	   };

	   var req = http.request(options, function(res) {
	       res.setEncoding('utf8');
               res.on('data', function (chunk) {
                   console.log('\n\nResponse:\n\n' + chunk);
	       });
	   });

	   req.write(data);
	   req.end();
  
       });		
	
	   socket.on('error', function(err) {
	   console.log('\n\n' + err)
	})
});

tcpServer.listen(1336, '127.0.0.1');

console.log('\n\nServer running at 127.0.0.1:1336');

