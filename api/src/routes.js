const express = require('express');
const routes = express.Router();

const Aluno = require('./controllers/aluno');
const Telefone = require('./controllers/telefone');
const Atividade = require('./controllers/atividade');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Escola ACME' });
});

routes.post('/alunos', Aluno.create);
routes.get('/alunos', Aluno.read);
routes.get('/alunos/:ra', Aluno.readOne);
routes.patch('/alunos/:ra', Aluno.update);
routes.delete('/alunos/:ra', Aluno.remove);

routes.post('/telefones', Telefone.create);
routes.get('/telefones', Telefone.read);
routes.get('/telefones/:id', Telefone.readOne);
routes.patch('/telefones/:id', Telefone.update);
routes.delete('/telefones/:id', Telefone.remove);

routes.post('/atividades', Atividade.create);
routes.get('/atividades', Atividade.read);
routes.get('/atividades/:id', Atividade.readOne);
routes.patch('/atividades/:id', Atividade.update);
routes.delete('/atividades/:id', Atividade.remove);

module.exports = routes;