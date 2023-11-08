const Joi = require('joi');

const schema = Joi.object({
  userId: Joi.number().integer().required(),
  resetToken: Joi.string().required(),
  newPassword: Joi.string()
  .pattern(/^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/)
  .required(),
});

function validateSaveResetPassword(req, res, next) {
    console.log('req.body', req.body);
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({message: "Vos données ne sont pas valides."});
    console.log('error dans validate login', error);
  } else {
    next();
  }
}

module.exports = validateSaveResetPassword;

