const Router = require('express');
const router = new Router();
const TodoController = require('../controllers/todo.controller');

router.get('/todos', TodoController.getTodos);
router.get('/todos-completed/:id', TodoController.getTodosCompleted);
router.post('/todo', TodoController.createTodo);
router.delete('/todo', TodoController.deleteTodo);
router.put('/todo', TodoController.updateTodo);

module.exports = router;
