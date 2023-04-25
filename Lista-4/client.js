const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
calculatorPackage = grpcObject.calculatorPackage;

const readline = require("readline");

const client = new calculatorPackage.Calculator(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Bem-vindo à calculadora mágica! Digite o que deseja saber: ")
console.log("* Lembre-se de digitar com espaços entre os dados *");

rl.addListener('line', line => {
    var msg = line.split(" "), a, b;
    const acceptable = (msg.length === 3 && !isNaN(msg[0]) && !isNaN(msg[2]) && 
        (msg[1] == '+'|| msg[1] == '-'|| msg[1] == '/' || msg[1] == '*'));
    
    if(acceptable){
        operation = msg[1];
        a = parseInt(msg[0]);
        b = parseInt(msg[2]);

        switch (operation) {
          case "+":
            client.add({ a, b }, (err, response) => {
              console.log(response.result);
            });
            break;
          case "-":
            client.sub({ a, b }, (err, response) => {
              console.log(response.result);
            });
            break;
          case "*":
            client.mult({ a, b }, (err, response) => {
              console.log(response.result);
            });
            break;
          default:
            client.div({ a, b }, (err, response) => {
              console.log(response.result);
            });
        }

    } else {
        console.log("Por favor, digite uma operação válida.")
    };
});
