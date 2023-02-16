const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const readline = require('readline');

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
    
    rl.addListener('line', line => {
        server.send(Buffer.from(`Maria: ${line}`), rinfo.port, 'localhost')
    });
});

server.bind(8081);