const net = require("net")

const handleConnection = socket => {
    socket.on('data', data => {
        const unm = unmarshalling(data);
        const operation = unm[0], a = unm[1], b = unm[2];
        var result;

        switch (operation) {
            case 0:
                result = a + b;
                break;
            case 1:
                result = a - b;
                break;
            case 2:
                result = a/b;
                break;
            default:
                result = a*b;
          };
          
          const ans = marshalling(result);
          socket.write(ans);
    });
};

const unmarshalling = (data) => {
    const unm = data.toString();

    const operation = parseInt(unm.substring(0,2), 2);
    const a = parseInt(unm.substring(2, 34), 2);
    const b = parseInt(unm.substring(34, 66), 2);

    return [operation, a, b];
};

const marshalling = (ans) => {
    return ans.toString(2);
};

const server = net.createServer(handleConnection)
server.listen(4000, 'localhost')