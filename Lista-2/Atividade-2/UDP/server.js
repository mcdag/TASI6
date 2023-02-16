const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (data, rinfo) => {
    var msg = data.toString().split(" "), ans, operation = "xxxx", a, b;
    const wrong = (msg.length == 1 || msg.length == 2 || isNaN(msg[0]) || isNaN(msg[2]));
        
    if(!wrong){
        operation = msg[1].toString();
        a = parseInt(msg[0]);
        b = parseInt(msg[2]);
    }

    switch (operation) {
        case '+':
            ans = a + b;
            break;
        case '-':
            ans = a - b;
            break;
        case '/':
            ans = a/b;
            break;
        case '*':
            ans = a*b;
            break;
        default:
            ans = "Por favor, digite uma operação válida.";
      };

    server.send(Buffer.from(ans.toString()), rinfo.port, 'localhost')
});

server.bind(8081);