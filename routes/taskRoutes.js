const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/all', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/create', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;