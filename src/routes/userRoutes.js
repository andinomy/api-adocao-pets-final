const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', userController.create);

router.use(authMiddleware);

router.get('/', roleMiddleware('admin'), userController.list);
router.get('/:id', userController.findById);
router.put('/:id', userController.update);
router.delete('/:id', roleMiddleware('admin'), userController.remove);

module.exports = router;
