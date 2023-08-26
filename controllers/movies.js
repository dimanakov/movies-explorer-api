const FOBIDDEN_403 = require('../errors/FORBIDDEN_403');
const NOT_FOUND_404 = require('../errors/NOT_FOUND_404');
const Movie = require('../models/movie');

module.exports.getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    owner: req.user._id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch(next);
};

module.exports.removeMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        next(new NOT_FOUND_404('Фильм не найден'));
        return;
      }
      if (movie.owner._id.toString() !== req.user._id) {
        next(new FOBIDDEN_403('Удаление чужих фильмов невозможно'));
        return;
      }
      Movie.deleteOne(movie)
        .then(() => {
          res.send({ message: 'Фильм удалён из сохранённых' });
        })
        .catch(next);
    })
    .catch(next);
};
