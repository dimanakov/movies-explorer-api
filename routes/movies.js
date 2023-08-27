const router = require('express').Router();
const { getUserMovies, addMovie, removeMovie } = require('../controllers/movies');
const { movieValidator, movieIdValidator } = require('../middlewares/requestValidator');

router.get('/', getUserMovies);
router.post('/', movieValidator, addMovie);
router.delete('/:_id', movieIdValidator, removeMovie);

module.exports = router;
