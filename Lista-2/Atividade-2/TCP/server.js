const net = require("net")

const handleConnection = socket => {
    socket.on('data', data => {
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
          socket.write(ans.toString());
    });
};

const server = net.createServer(handleConnection)
server.listen(4000, 'localhost')