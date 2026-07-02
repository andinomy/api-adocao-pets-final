const express = require('express');
const petController = require('../controllers/petController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/available', petController.listAvailable);

router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router.get('/', petController.list);
router.get('/:id', petController.findById);
router.post('/', petController.create);
router.put('/:id', petController.update);
router.delete('/:id', petController.remove);

module.exports = router;
