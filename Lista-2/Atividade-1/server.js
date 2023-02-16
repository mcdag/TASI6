const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const readline = require('readline');

var clientPort = -1;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

server.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(msg.toString());
    clientPort = rinfo.port;
});

rl.addListener('line', line => {
    if(clientPort == -1){
        console.log('O cliente ainda não se conectou ao servidor')
    } else {
        server.send(Buffer.from(`Maria: ${line}`), clientPort, 'localhost')
    }
});

server.bind(8081);