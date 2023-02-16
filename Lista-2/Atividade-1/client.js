const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on('message', (msg) => {
    console.log(msg.toString());
});

rl.addListener('line', line => {
    client.send(Buffer.from(`João: ${line}`), 8081, 'localhost', (error) => {
       if(error) client.close();
    });
});