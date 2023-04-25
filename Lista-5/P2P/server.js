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

server.bindAsync("localhost:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err != null) {
    return console.error(err);
  }
  server.start();
},);

server.addService(chatPackage.Chat.service, {
  connect: (call, callback) => {
    rl.addListener('line', line => {
      call.write({
        username: "João",
        message: line
      });
    })
  },
  send: (call, callback) => {
    console.log(`${call.request.username}: ${call.request.message}`)
  },
});