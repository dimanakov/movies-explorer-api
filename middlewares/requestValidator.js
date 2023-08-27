const { Joi, celebrate } = require('celebrate');
const { regexpURL } = require('../utils/constants');

module.exports.signupValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().max(127).email(),
    password: Joi.string().required(),
  }).unknown(true),
});

module.exports.signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().max(127).email(),
    password: Joi.string().required(),
  }).unknown(true),
});

module.exports.updateUserProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().max(127).email(),
  }),
});

module.exports.movieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regexpURL),
    trailerLink: Joi.string().required().pattern(regexpURL),
    thumbnail: Joi.string().required().pattern(regexpURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.movieIdValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});
