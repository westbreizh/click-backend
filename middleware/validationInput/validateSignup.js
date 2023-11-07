const Joi = require('joi');

const schema = Joi.object({
  forename: Joi.string()
    .required()
    .max(30),
  lastname: Joi.string()
    .required()
    .max(30),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .pattern(/^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/)
    .required(),
  passwordConfirm: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Les mots de passes doivent être identiques' }),
  telephone: Joi.string()
    .pattern(/^\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}$/)
});

function validateSignup(req, res, next) {
  const { error } = schema.validate(req.body);
  console.log('req.body', req.body);
  if (error) {
    res.status(400).json({message: "Vos données ne sont pas valides."});
    console.log('error dans validate signup', error);
  } else {
    next();
  }
}

module.exports = validateSignup;