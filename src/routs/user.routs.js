const Router = require('express');
const router = new Router();
const UserController = require('../controllers/user.controller');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/user/:id', UserController.getUser);

// router.get('/todos', UserController.getTodos);
// router.get('/todos-completed', UserController.getTodosCompleted);
// router.post('/todo', UserController.createTodo);
// router.delete('/todo', UserController.deleteTodo);
// router.put('/todo', UserController.updateTodo);

module.exports = router;
