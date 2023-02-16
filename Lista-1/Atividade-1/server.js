const net = require("net")
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const handleConnection = socket => {
    socket.on('data', data => {
        console.log(data.toString())
    })
    rl.addListener('line', line => {
        socket.write(`Maria: ${line}`)
    })
}

const server = net.createServer(handleConnection)
server.listen(4000, 'localhost')