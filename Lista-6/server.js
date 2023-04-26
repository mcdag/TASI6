const express = require("express");
const server = express();
let list = require('./list.json');

const days = ['domingo', 'segunda','terça', 'quarta','quinta', 'sexta', 'sábado'];

server.get('/agenda',(req, res) => {
  return res.status(200).json(list);
});

server.get('/agenda/:id',(req, res) => {
  const { id } = req.params;
  if(list[days[id]]){
    return res.status(200).json(list[days[id]]);
  } else {
    return res.status(204);
  }
});

server.put('/agenda',(req, res) => {
  const agenda = req.body;
  list = agenda;
  return res.status(201).json(list);
});

server.post('/agenda/:id',(req, res) => {
  const {id} = req.params;
  const {tarefas} = req.body;
  if(list[days[id]]) {
    list[days[id]].push(tarefas);
    return res.status(201).json(list[days[id]]);
  }
  return res.status(204);
});

server.delete('/agenda/:id/:tarefa',(req, res) => {
  const {id, tarefa} = req.params;
  if(list[days[id]]) {
    list[days[id]].splice(tarefa, 1);
    return res.status(201).json(list[days[id]]);
  }
  return res.status(204);
});

server.listen(3000, () => {
  console.log("Servidor ativod!")
})