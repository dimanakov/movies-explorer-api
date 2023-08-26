const router = require('express').Router();
const { getUserProfile, updateUserProfile } = require('../controllers/users');
const { updateUserProfileValidator } = require('../middlewares/requestValidator');

router.get('/me', getUserProfile);
router.patch('/me', updateUserProfileValidator, updateUserProfile);

module.exports = router;
