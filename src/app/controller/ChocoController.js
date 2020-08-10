const chocoModel = require('../models/chocolate');

class ChocoController {
  async show(req, res) {
    const { id } = req.params;
    const choco = await chocoModel.findById(id);
    return res.json({ choco });
  }

  async index(req, res) {
    const choco = await chocoModel.find();
    return res.json({ choco });

  }

  async update(req, res) {
    const { id } = req.params;
    delete req.body.pass;
    const choco = await chocoModel.findOneAndUpdate(id, req.body, {
      new: true,
    });
    user.pass = undefined;
    return res.json({ choco });
  }

  async store(req, res) {
    const { key } = req.file;
    req.body.imagem = `${process.env.URL_HOST}/images/${key}`;
    const choco = await chocoModel.create(req.body);
    return res.status(201).json({ choco });
  }

  async destroy(req, res) {
    const { id } = req.params;
    await chocoModel.findByIdAndDelete(id);
    return res.json({ msg: 'Produto deletado' });
  }
}
module.exports = new ChocoController();
