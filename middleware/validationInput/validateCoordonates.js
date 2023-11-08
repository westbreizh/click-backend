const Joi = require('joi');

const schema = Joi.object({
  road: Joi.string().max(30).allow(''),
  city: Joi.string().max(30).allow(''),
  postalCode: Joi.string().max(30).allow(''),
  telephone: Joi.string()
  .pattern(/^\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}$/)

});


function validateCoordonates(req, res, next) {
  console.log('req.body', req.body);
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({message: "Vos données ne sont pas valides."});
    console.log('error dans validate coodonates', error);
  } else {
    next();
  }
}

module.exports = validateCoordonates;

