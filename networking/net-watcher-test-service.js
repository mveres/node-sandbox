"use strict";

const
  net = require('net'),
  server = net.createServer(function(connection) {
    console.log("Subscriber connected")

    connection.write('{"type":"changed", "file":"tar');

    let timer = setTimeout(function () {
      connection.write('get.txt", "timestamp":"1358175758495"}' + "\n");
    }, 1000);

    connection.on('end', function(){
      clearTimeout(timer);
      console.log("Subscriber disconnected")
    });
  });

server.listen('5432', function() {
  console.log("Test server listening for subscribers...");
});
