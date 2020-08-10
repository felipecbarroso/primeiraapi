const yup = require('yup');

class validators {
  async userValidators(req, res, next) {
    const userMask = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required().email(),
      pass: yup.string().required(),
    });
    const userValidate = await userMask.isValid(req.body, { strict: true });
    if (!userValidate) {
      return res.status(400).json({ msg: 'Dados inválidos' });
    }
    next();
  }

  async userUpdateValidators(req, res, next) {
    const userMask = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
    });
    const userValidate = await userMask.isValid(req.body);
    if (!userValidate) {
      return res.status(400).json({ msg: 'Dados inválidos' });
    }
    next();
  }
}
module.exports = new validators();
