const net = require("net")

var clients = []

const handleConnection = socket => {
    var name = ''
    socket.write("Digite seu nome!")

    socket.on('data', data => {
        if(name == '') {
            name = data.toString()
            clients.push(socket)
        } else {
            console.log(`${name}: ${data.toString()}`)
            sendToAll(name, data)
        }
    })
}

const sendToAll = (name, data) => {
    for(let i=0; i<clients.length; i++) {
        clients[i].write(`${name}: ${data.toString()}`)
    }
}

const server = net.createServer(handleConnection)
server.listen(4000, 'localhost')