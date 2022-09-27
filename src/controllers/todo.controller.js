const db = require('../db');

class TodoController {
  async createTodo(req, res) {
    const { title, completed, user_id } = req.body;

    const newTodo = await db.query(
      `INSERT INTO todos (title, completed, user_id) values ($1, $2, $3) RETURNING *`,
      [title, completed, user_id]
    );

    res.json(newTodo.rows[0]);
  }

  async getTodos(req, res) {
    const { search, id } = req.query;
    if (search) {
      const resultSearch = await db.query(
        `SELECT * FROM todos WHERE user_id = ${id} AND title LIKE '${search}%'`
      );

      res.json(resultSearch.rows);
    } else {
      const todos = await db.query(`SELECT * FROM todos WHERE user_id = ${id}`);
      res.json(todos.rows);
    }
  }

  async getTodosCompleted(req, res) {
    const { id } = req.params;
    const todos = await db.query(
      `SELECT * FROM todos WHERE completed = CAST(true AS boolean) AND user_id=${id}`
    );

    res.json(todos.rows);
  }

  async deleteTodo(req, res) {
    const { id } = req.body;

    const todo = await db.query(`DELETE FROM todos WHERE id = $1`, [id]);

    res.json(todo.rows[0]);
  }

  async updateTodo(req, res) {
    const { id, title, completed } = req.body;

    if (title) {
      const resTitle = await db.query(
        `UPDATE todos set title = $1 WHERE id = $2`,
        [title, id]
      );
      res.json(resTitle.rows[0]);
    }

    if (completed === 0 || completed === 1) {
      const resCompleted = await db.query(
        `UPDATE todos set completed = $1 WHERE id = $2`,
        [completed, id]
      );
      res.json(resCompleted.rows[0]);
    }
  }
}

module.exports = new TodoController();
