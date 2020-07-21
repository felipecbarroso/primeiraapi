const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { model } = require('../models/user');
class  UserController {
    //EXERCÍCIO TRABALHO
    random(req, res){        
            console.log('GET USERS');
            const valor = Math.random();
            if (valor > 0.5){
            return res.json({msg: "1"});
            } else {return res.json({msg: "0"})}
        }

    //EXERCÍCIO TRABALHO
    impar(req, res){
        console.log('GET USERS 2');
        const { id } = req.params;
        let x = parseInt(id);
        console.log(x);
        console.log(x % 2);
        if (id % 2 == 0){
        return res.json({msg: "O número é par"});
        } else {return res.json({msg: "O número é ímpar"})}  
    }

    //EXERCÍCIO TRABALHO
    soma(req, res){
            const { num1, num2 } = req.body;
    console.log(req.body);
    return res.json({msg: Number(num1) + Number(num2)});
    }

    //EXERCÍCIO TRABALHO
    nome(req, res){
        const { nome, sobrenome, idade } = req.body;
        console.log(req.body);
        return res.json({msg: `Meu nome é ${nome} ${sobrenome} e tenho ${idade} anos.`});
    }

    //CRIANDO USUÁRIO
    async store(req, res){
        const user = await userModel.create(req.body)
        user.pass = undefined;
        return res.status(201).json({ user });
    }

    //DELETANDO USUÁRIO
    async destroy(req, res){
        const {id} = req.params;
        await userModel.findByIdAndDelete(id);
        return res.json({msg: "Usuário deletado"});
    }

    //ATUALIZANDO USUÁRIO
    async update(req, res){
        const {id} = req.params;
        delete req.body.pass;
        const user = await userModel.findOneAndUpdate(id, req.body, {
            new: true,
        });
        user.pass = undefined
        return res.json({user});
    }

    //ENCONTRAR UM USUÁRIO
    async show(req, res){
        const {id} = req.params;
        const user = await userModel.findById(id);
        return res.json({user});
    }

    //LISTAR TODOS USUÁRIOS
    async index(req, res){
       const users = await userModel.find();
       return res.json({users});
    }

    //LOGIN
    async auth(req, res){
        const {email, pass} = req.body;
        const user = await userModel.findOne({email:email})
        if (!user){
            return res.status(401).json({msg: "Credenciais inválidas"});
        }
        if(!(await bcrypt.compare(pass, user.pass))){
            return res.status(401).json({msg: "Credenciais inválidas"});
        }

        const { _id:id } = user;
        const token = jwt.sign({id}, 'fn34u795fn23', {
            expiresIn: '1d'
        })
        return res.json({ token });
    }


}
module.exports = new UserController();