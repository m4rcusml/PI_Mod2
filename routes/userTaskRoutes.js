const express = require('express');
const router = express.Router();
const userTaskController = require('../controllers/userTaskController');

router.post('/', userTaskController.createUserTask);
router.get('/user/:userName', userTaskController.getTasksByUserName);
router.get('/task/:taskId', userTaskController.getUsersByTaskId);
router.delete('/', userTaskController.deleteUserTask);

module.exports = router;

