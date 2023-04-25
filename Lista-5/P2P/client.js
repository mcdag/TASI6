const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("../chat.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const chatPackage = grpcObject.chatPackage;

const readline = require("readline");

const client = new chatPackage.Chat(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let chat = client.connect({username: "", message: ""});

chat.on('data', (data) => {
  console.log(`${data.username}: ${data.message}`);
})

rl.addListener('line', line => {
  client.send({ username: "Maria", message: line}, (err, response) => {});
});
