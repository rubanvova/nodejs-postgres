const db = require('../db');
const bcrypt = require('bcryptjs');

class UserController {
  async registration(req, res) {
    try {
      const { name, surname, email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const created_on = await new Date();

      if (name && surname && email && password) {
        const newUser = await db.query(
          `INSERT INTO person (name, surname, email, password, created_on) values ($1, $2, $3, $4, $5) RETURNING *`,
          [name, surname, email, hash, created_on]
        );

        res.json(newUser.rows[0]);
      } else {
        res.status(401).send('all fields req');
      }
    } catch (error) {
      if (error.code === '23505') {
        res.status(401).send({ error: 'email not uniq' });
      }

      res.status(500).send();
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await db.query(
        `SELECT * FROM person WHERE email LIKE '${email}'`
      );

      if (user.rows.length) {
        const validPass = await bcrypt.compare(password, user.rows[0].password);

        if (validPass) {
          const { password, ...restUser } = user.rows[0];
          res.status(200).send(restUser);
        } else {
          res.status(401).send({ error: 'incorrect password' });
        }
      } else {
        res.status(401).send({ error: 'incorrect email' });
      }
    } catch (error) {
      res.status(500).send();
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await db.query(`SELECT * FROM person WHERE id = $1`, [id]);
      const { password, ...restUser } = user.rows[0];

      res.status(200).send(restUser);
    } catch (error) {
      res.status(500).send(error.code);
    }
  }
}

module.exports = new UserController();
