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

console.log("Bem-vindo ao Bato-papo UOL!!!! \n Digite seu nome para se conectar! \n E digite '.' para se descontectar!");
let user = "", chat;
let connected = false;

rl.addListener('line', line => {
  if(user == ""){
    chat = client.connect({username: line, message: ""}, (err, response) => {});
    connected = true;
    user = line;

    chat.on('data', (data) => {
      if(data.username == ""){
        console.log(`* ${data.message} pessoa(s) está(ão) online *`);
      } else if(data.username != user){
        console.log(`${data.username}: ${data.message}`);
      }
    })
  } else if (connected) {
    client.send({ username: user, message: line}, (err, response) => {});
    if(line == "."){
      connected = false;
      console.log("Você desconectou-se do chat! \n Bem-vindo ao Bato-papo UOL!!!! \n Digite seu nome para se conectar! \n E digite '.' para se descontectar!");
      user = "";
    }
  }
});
