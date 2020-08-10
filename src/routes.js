const routes = require('express').Router();
const multer = require('multer');
const userController = require('./app/controller/UserController');
const chocoController = require('./app/controller/ChocoController');
const validators = require('./app/middlewares/validators');
const multerConfig = require('./config/multer')
const jwtMid = require('./app/middlewares/jwt');

routes.post('/users', validators.userValidators, userController.store);
routes.post('/login', userController.auth);


// routes.use(jwtMid);

routes.get('/random', userController.random);
routes.get('/impar/:id', userController.impar);
routes.post('/soma', userController.soma);
routes.post('/nome', userController.nome);
routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.delete('/users/:id', userController.destroy);
routes.put(
  '/users/:id',
  validators.userUpdateValidators,
  userController.update
);

routes.post(
  '/choco',
  multer(multerConfig).single('file'),
  chocoController.store
);
routes.get('/choco/:id', chocoController.show);
routes.get('/choco', chocoController.index);
routes.put('/choco/:id', chocoController.update);
routes.delete('/choco/:id', chocoController.destroy);

module.exports = routes;
