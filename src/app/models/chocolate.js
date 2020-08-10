// const { string } = require('yup');
const mongoose = require('../../config/db');

const ChocoSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },

    marca: {
      type: String,
    },

    valor: {
      type: Number,
    },

    imagem: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Choco = mongoose.model('Choco', ChocoSchema);
module.exports = Choco;
