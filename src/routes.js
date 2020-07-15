const routes = require('express').Router();
const userController = require("./app/controller/UserController");

routes.get("/random", userController.random);
routes.get("/impar/:id", userController.impar);
routes.post("/soma", userController.soma);
routes.post("/nome", userController.nome);
routes.post("/users", userController.store);
routes.get("/users", userController.index);
routes.get("/users/:id", userController.show);
routes.delete("/users/:id", userController.destroy);
routes.put("/users/:id", userController.update);
module.exports = routes;