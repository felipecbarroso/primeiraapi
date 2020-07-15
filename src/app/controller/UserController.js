const userModel = require('../models/user');
class  UserController {
    random(req, res){        
            console.log('GET USERS');
            const valor = Math.random();
            if (valor > 0.5){
            return res.json({msg: "1"});
            } else {return res.json({msg: "0"})}
        }

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

    soma(req, res){
            const { num1, num2 } = req.body;
    console.log(req.body);
    return res.json({msg: Number(num1) + Number(num2)});
    }

    nome(req, res){
        const { nome, sobrenome, idade } = req.body;
        console.log(req.body);
        return res.json({msg: `Meu nome é ${nome} ${sobrenome} e tenho ${idade} anos.`});
    }

    async store(req, res){
        const user = await userModel.create(req.body)
        console.log(user);
        return res.status(201).json({ user });
    }

    async destroy(req, res){
        const {id} = req.params;
        await userModel.findByIdAndDelete(id);
        return res.json({msg: "Usuário deletado"});
    }

    async update(req, res){
        const user = await userModel.updateOne(req.body)
        const {id} = req.params;
        await userModel.findOneAndUpdate(id, user);
        return res.json({msg: "Usuário atualizado"});
    }

    async show(req, res){
        const {id} = req.params;
        const user = await userModel.findById(id);
        return res.json({user});
    }

    async index(req, res){
       const users = await userModel.find();
       return res.json({users});
    }
}
module.exports = new UserController();