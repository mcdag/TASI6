const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Bem-vindo a sua agenda online! \n");
console.log("Você pode realizar as seguintes ações: \n 1) Ver a agenda \n 2) Ver tarefas do dia - Passe o dia \n 3) Editar a agenda - Passe a agenda \n 4) Adicionar uma tarefa ao dia - Passe o dia e a tarefa \n 5) Deletar uma atividade do dia - Passe o dia e a atividade \n ");
const days = ['domingo', 'segunda','terça', 'quarta','quinta', 'sexta', 'sábado'];
let id, tarefa;

rl.addListener('line', line => {
  let data = line.split(/\s+/).join('');
  data = data.split("-");
  switch (data[0]) {
    case '1':
      fetch('http://localhost:3000/agenda', { method: 'GET' }).then((response) => {
        response.json().then(res => {
          console.log(res);
        });
      })
      break; 
    case '2':
      id = days.indexOf(data[1]);
      fetch(`http://localhost:3000/agenda/${id}`, { method: 'GET' }).then((response) => {
        response.json().then(res => {
          console.log(res);
        });
      })
      break; 
    case '3':
      fetch(`http://localhost:3000/agenda/${id}`, { method: 'PUT', body: data[2]}).then((response) => {
        response.json().then(res => {
          console.log(res);
        });
      })
      break; 
    case '4':
      id = days.indexOf(data[1]);
      tarefa = data[2];
      fetch(`http://localhost:3000/agenda/${id}`, { method: 'POST', body: tarefa }).then((response) => {
        response.json().then(res => {
          console.log(res);
        });
      })
      break; 
    case '5':
      id = days.indexOf(data[1]);
      tarefa = data[2];
      fetch(`http://localhost:3000/agenda/${id}/${tarefa}`, { method: 'DELETE' }).then((response) => {
        response.json().then(res => {
          console.log(res);
        });
      })
      break; 
    default:
      console.log("Digite uma das opções válidas");
  };
});