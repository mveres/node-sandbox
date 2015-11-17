const
  events = require('events'),
  util = require('util'),

  LDJClient = function(stream) {
    events.EventEmitter.call(this);

    let
      self = this,
      buffer = '';

    stream.on('data', function(data) {
      buffer += data;
      let boundary = bufer.indexOf('\n');
      
      while(boundary != -1) {
        let input = buffer.substr(0, boundary);
        buffer = buffer.substr(boundary + 1);

        self.emit('message', JSON.parse(input));
        boundary = bufer.indexOf('\n');
      }
    });
  };

util.inherits(LDJClient, events.EventEmitter);
