"use strict";

const fs = require("fs");
const net = require ("net");
const filename = process.argv[2];

const server = net.createServer(function(connection) {
  console.log("Subscriber connected.");
  connection.write(JSON.stringify({
    type: "watching",
    file: filename
  }) + "\n");

  let watcher = fs.watchFile(filename, function(){
    connection.write(JSON.stringify({
      type: "changed",
      file: filename,
      timestamp: Date.now()
    }) + "\n");

    console.log("touched");
  });

  connection.on('close', function(){
    console.log("Subscriber disconnected.")
    watcher.close();
  });

});

if (!filename) {
  throw Error("No filename was specified.");
}

server.listen(5432, function(){
  console.log("Listenning for subscribers...");
});
