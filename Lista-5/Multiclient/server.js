const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("../chat.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const chatPackage = grpcObject.chatPackage;

const server = new grpc.Server();
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

server.bindAsync("0.0.0.0", grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err != null) {
    return console.error(err);
  }
  server.start();
},);

let users = [];
server.addService(chatPackage.Chat.service, {
  connect: (call, callback) => {
    if(!users.includes(call)){
      call.write({
        username: "",
        message: users.length.toString()
      });
      users.push(call);
    }
  },
  send: (call, callback) => {
    if(call.request.message == "."){
      let newUsers = users.filter(user => user.request.username != call.request.username);
      users = newUsers;
      
      users.forEach(user => {
        if(call.request.username != user.request.username){
          user.write({ username: `${call.request.username}`, message: "* desconectou-se *"});
        }
      })
      call.end();
    } else {
      users.forEach(user => {
        if(call.request.username != user.request.username){
          user.write({ username: `${call.request.username}`, message: `${call.request.message}`});
        }
      })
    }
  },
});