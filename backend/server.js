const express = require('express');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const server = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = '123456789';
const expiresIn = '1h';

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(middlewares);

// Endpoint para login
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get('users').find({ username, password }).value();

  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid login credentials' });
  }
});

// Middleware para verificar el token
server.use((req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      jwt.verify(token, SECRET_KEY);
      next();
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
