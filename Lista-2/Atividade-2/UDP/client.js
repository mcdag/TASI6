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

console.log("Bem-vindo a calculadora mágica! Digite o que deseja saber: ")
console.log("Lembre-se de digitar com espaços entre os dados");

rl.addListener('line', line => {
    client.send(Buffer.from(line), 8081, 'localhost', (error) => {
       if(error) client.close();
    });
});