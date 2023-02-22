const net = require('net')
const readline = require('readline')

const client = new net.Socket()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.connect(4000, 'localhost', ()=> {
    console.log("Bem-vindo à calculadora mágica! Digite o que deseja saber: ")
    console.log("* Lembre-se de digitar com espaços entre os dados *");

    client.on('data', data => {
        const ans = unmarshalling(data);
        console.log(ans);
    });

    rl.addListener('line', line => {
        var msg = line.split(" "), a, b;
        const acceptable = (msg.length === 3 && !isNaN(msg[0]) && !isNaN(msg[2]) && 
            (msg[1] == '+'|| msg[1] == '-'|| msg[1] == '/' || msg[1] == '*'));
        
        if(acceptable){
            operation = msg[1];
            a = parseInt(msg[0]);
            b = parseInt(msg[2]);

            const mes = marshalling(a, operation, b);

            client.write(mes);

        } else {
            console.log("Por favor, digite uma operação válida.")
        };
    });
});

const marshalling = (a, operation, b) => {
    var ans, a2, op2, b2, size;

    switch (operation) {
        case '+':
            op2 = '00';
            break;
        case '-':
            op2 = '01';
            break;
        case '/':
            op2 = '10';
            break;
        default:
            op2 = '11';
      };

      a2 = (a >>> 0).toString(2);
      size = 32 - a2.length;

      for(var i = 0; i<size; i++) {
        a2 = '0' + a2;
      }

      b2 = (b >>> 0).toString(2);
      size = 32 - b2.length;

      for(var i = 0; i<size; i++) {
        b2 = '0' + b2;
      }

      ans = op2 + a2 + b2;

      return ans;
};

const unmarshalling = (data) => {
    const ans = data.toString();
    return parseInt(ans, 2);
};