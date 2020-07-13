const routes = require('express').Router();

routes.get("/users", (req, res) =>{
    console.log('GET USERS');
    const valor = Math.random();
    if (valor > 0.5){
    return res.json({msg: "1"});
    } else {return res.json({msg: "0"})}
});

routes.get("/users/:id", (req, res) =>{
    console.log('GET USERS 2');
    const { id } = req.params;
    let x = parseInt(id);
    console.log(x);
    console.log(x % 2);
    if (id % 2 == 0){
    return res.json({msg: "O número é par"});
    } else {return res.json({msg: "O número é ímpar"})}  
});

routes.post("/users", (req, res) =>{
    const { num1, num2 } = req.body;
    console.log(req.body);
    return res.json({msg: Number(num1) + Number(num2)});
});

routes.post("/users", (req, res) =>{
    const { nome, sobrenome, idade } = req.body;
    console.log(req.body);
    return res.json({msg: `Meu nome é ${nome} ${sobrenome} e tenho ${idade} anos.`});
});

module.exports = routes;