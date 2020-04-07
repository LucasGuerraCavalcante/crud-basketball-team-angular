const express = require('express');
const TeamController = require('./controllers/TeamController');

const router = express.Router();

router.get('/', TeamController.index);
router.put('/', TeamController.update);
router.post('/', TeamController.create);
router.delete('/', TeamController.delete);


module.exports = router;