const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const logger = require('../../helper/logger');

module.exports = async (req, res, next) => {
  // const {authorization} = req.headers;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token nao enviado' });
  }
  const jwtParts = authHeader.split(' ');
  const [scheme, token] = jwtParts;

  if (jwtParts.length !== 2) {
    return res.status(401).json({ erro: 'Token com formato inválido' });
  }

  if (scheme !== 'Bearer') {
    return res.status(401).json({ erro: 'Token com prefixo inválido' });
  }

  try {
    const tokenDecoded = await promisify(jwt.verify)(token, 'fn34u795fn23');
    return next();
  } catch (error) {
    logger.error(error);
    return res.status(401).json({ erro: 'Token com problema' });
  }
};
