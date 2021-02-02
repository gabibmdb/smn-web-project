import express from 'express';

import UsersController from './controllers/UsersController';

const routes = express.Router();

const usersController = new UsersController();


//CREATE USERS
routes.post('/users', usersController.create);

//LIST USERS
routes.get('/users', usersController.index);

//SHOW USERS
routes.get('/users/:id', usersController.show);

//routes.ts deve ser importado no arquivo do servidor, server.ts
export default routes;