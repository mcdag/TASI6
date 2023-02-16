const net = require('net')
const readline = require('readline')

const client = new net.Socket()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

client.connect(4000, 'localhost', ()=> {
    console.log("Bem-vindo a calculadora mágica! Digite o que deseja saber: ")
    console.log("Lembre-se de digitar com espaços entre os dados");

    client.on('data', data => {
        console.log(data.toString())
    })
    rl.addListener('line', line => {
        client.write(line)
    })
})

