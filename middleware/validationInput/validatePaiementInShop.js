const Joi = require('joi');

const schema = Joi.object({
  userInfo: Joi.object().required(),
  articleList: Joi.string().max(1000).required(),
  totalPrice: Joi.number().precision(2).required(),
  hubChoice: Joi.string().max(1000).required(),
  hubBackChoice: Joi.string().max(1000).required(),
  racquetPlayer: Joi.string().max(30).required(),
}).unknown(true);

function validatePaiementInShop(req, res, next) {
  console.log('req.body', req.body);
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({message: "Vos données ne sont pas valides."});
    console.log('error dans validate paiement in shop', error);
  } else {
    next();
  }
}

module.exports = validatePaiementInShop;
