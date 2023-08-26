const mongoose = require('mongoose');
const NOT_FOUND_404 = require('../errors/NOT_FOUND_404');
const BAD_REQUEST_400 = require('../errors/BAD_REQUEST_400');
const User = require('../models/user');

module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ name: user.name, email: user.email, _id: user._id });
    })
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, email } },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NOT_FOUND_404(' Пользователь по указанному _id не найден.'));
        return;
      }
      res.send({ name: user.name, email: user.email, _id: user._id });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BAD_REQUEST_400('Переданы некорректные данные при обновлении профиля.'));
        return;
      }
      next(err);
    });
};