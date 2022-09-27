const express = require('express');
const todoRoutes = require('./routs/todo.routs');
const userRoutes = require('./routs/user.routs');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use('/api', todoRoutes);
app.use('/api', userRoutes);

const PORT = '8080';
app.listen(PORT, () => console.log(`open server :${PORT}`));

// "start": "node index.js",
// "dev": "nodemon index.js"
