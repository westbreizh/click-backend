const Joi = require('joi');

const schema = Joi.object({
  stringFromPlayer: Joi.string().max(30).allow(null, ''),
  stringFromShopId: Joi.number().integer().min(1).max(99).allow(null),
  stringRopeChoice: Joi.number().integer().min(10).max(35).allow(null),
  racquetPlayer: Joi.string().max(30).allow(null, ''),
  hubChoiceId: Joi.number().integer().min(10).max(99).allow(null),
  hubBackChoiceId: Joi.number().integer().min(10).max(99).allow(null),
  numberKnotChoice: Joi.number().integer().min(0).max(9).allow(null),
}).unknown(true);

function validatePreferencePlayer(req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({message: "Vos données ne sont pas valides."});
    console.log('error dans validate preference player', error);
  } else {
    next();
  }
}

module.exports = validatePreferencePlayer;
