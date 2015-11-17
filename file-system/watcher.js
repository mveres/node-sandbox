"use strict";
const
  fs = require("fs"),
  filename = process.argv[2]
  spawn = require("child_process").spawn

if (!filename)
  throw Error("A file to watch must be specified!");

if (!fs.existsSync(filename))
  throw Error("The file doesn't exist");

fs.watch(filename, function() {
  let ls = spawn('ls', ['-lh', filename]);
  let output = '';
  ls.stdout.on('data', function(chunk){
    output += chunk;
  });

  ls.on('close', function(){
    let parts = output.split(/|s+/);
    console.dir([parts[0], parts[4], parts[8]]);
  });
});

console.log("Now watching " + filename + " for changes...");
