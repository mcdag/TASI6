const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("../chat.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const chatPackage = grpcObject.chatPackage;

const readline = require("readline");

const client = new chatPackage.Chat(
  "0.0.0.0",
  grpc.credentials.createInsecure()
);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Digite seu nome!");
let user = "";

rl.addListener('line', line => {
  if(user == ""){
    let chat = client.connect({username: line, message: ""});

    chat.on('data', (data) => {
      if(user == ""){
        console.log(`${data.message} pessoa(s) online!`)
      } else {
        console.log(`${data.username}: ${data.message}`);
      }
      user = line;
    })
  }
  client.send({ username: user, message: line}, (err, response) => {});
});
