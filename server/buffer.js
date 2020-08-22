'use strict';

// string message buffering
module.exports = function (socket, timeout) {
  let s = '';
  let sender = null;
  return (data) => {
    s += data;
    if (!sender) {
      sender = setTimeout(() => {
        socket.send(s);
        s = '';
        sender = null;
      }, timeout);
    }
  };
};
