'use strict';

// binary message buffering
module.exports = function (socket, timeout) {
  let buffer = [];
  let sender = null;
  let length = 0;
  return (data) => {
    buffer.push(data);
    length += data.length;
    if (!sender) {
      sender = setTimeout(() => {
        socket.send(Buffer.concat(buffer, length));
        buffer = [];
        sender = null;
        length = 0;
      }, timeout);
    }
  };
};
