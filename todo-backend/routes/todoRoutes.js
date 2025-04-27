const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
router.get('/:id', todoController.getTodoById);
router.post('/:id/notes', todoController.addNote);

router.get('/export', todoController.exportTodos);


module.exports = router;
