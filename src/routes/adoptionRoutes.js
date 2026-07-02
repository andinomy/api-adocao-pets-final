const express = require('express');
const adoptionController = require('../controllers/adoptionController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', roleMiddleware('admin'), adoptionController.list);
router.post('/', roleMiddleware('adopter'), adoptionController.create);

module.exports = router;
