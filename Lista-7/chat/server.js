var WebSocketServer = require("ws").Server;
wss = new WebSocketServer({ port: 8080, path: "/chat" });
let users = [];

wss.on("connection", function (ws) {
  users.push(ws);
  ws.on("message", function (message) {
    users.forEach(user => {
      if(user.request.username != message.username){
        user.send({ username: `${message.username}`, message: `${message.message}`});
      }
    })
  });
});

const http = require("http");

http.createServer(function (req, res) {
    res.writeHeader(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });
    () => {
      res.write("data: " + randomInt(100, 127) + "\n\n");
    };
  })
  .listen(9090);