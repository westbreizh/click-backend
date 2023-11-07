const Joi = require('joi');

const schema = Joi.object({
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required()
});

function validateLogin(req, res, next) {
    console.log('req.body', req.body);
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
}

module.exports = validateLogin;

/*
const Joi = require('joi');

const schema = Joi.object({
    password: Joi.string()
    .pattern(new RegExp('^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$'))
    .required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required()
});

function validateLogin(req, res, next) {
    console.log('req.body', req.body);
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({message: "Vos données ne sont pas valides."});
  } else {
    next();
  }
}

module.exports = validateLogin;
*/