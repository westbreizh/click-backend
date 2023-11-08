const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required()
});

function validateEmail(req, res, next) {
    console.log('req.body', req.body);
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({message: "Vos données ne sont pas valides."});
    console.log('error dans validate login', error);
  } else {
    next();
  }
}

module.exports = validateEmail;

