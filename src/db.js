const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  port: '5432',
  database: 'node_postgres',
});

// psql -U postgres -h localhost -p 5432 -d node_postgres
// pass 1234

module.exports = pool;
