const Joi = require('joi');

const schema = Joi.object({
  userInfo: Joi.object().required(),
  articleList: Joi.array().items(Joi.object()).required(),
  totalPrice: Joi.string().max(30).required(),
  hubChoice: Joi.object().required(),
  hubBackChoice: Joi.object().required(),
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
