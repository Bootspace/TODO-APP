const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { dbConfig } = require('./config/db');
const userRoutes = require('./routes/user_route');
const todoRoutes = require('./routes/todo_route');
const port = process.env.PORT || 3322;

const app = express();
dbConfig();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API running...');
});

// Imported routes
app.use('/api/user', userRoutes);
app.use('/api/todo', todoRoutes);

app.listen(port, () => {
    console.log(`Server running on Port:${port}`);
});