const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculatorPackage = grpcObject.calculatorPackage;

const server = new grpc.Server();

server.bindAsync("localhost:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err != null) {
    return console.error(err);
  }
  server.start();
  console.log(`gRPC listening on ${ port }`);
},);

server.addService(calculatorPackage.Calculator.service, {
  add: (call, callback) => {
    callback(null, {
      result: call.request.a + call.request.b,
    });
  },
  sub: (call, callback) => {
    callback(null, {
      result: call.request.a - call.request.b,
    });
  },
  mult: (call, callback) => {
    callback(null, {
      result: call.request.a * call.request.b,
    });
  },
  div: (call, callback) => {
    callback(null, {
      result: call.request.a / call.request.b,
    });
  },
});