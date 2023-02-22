const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (data, rinfo) => {
    const unm = unmarshalling(data);
    const operation = unm[0];
    const a = unm[1];
    const b = unm[2];
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
    server.send(Buffer.from(ans), rinfo.port, 'localhost')
});

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

server.bind(8081);