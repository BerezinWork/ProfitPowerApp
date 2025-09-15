const express = require('express');
const cors = require('cors');
const fs = require('fs').promises; // Используем промисы для асинхронной работы с файлами

const transactionsRouter = require('./routes/transactions');
const categoriesRouter = require('./routes/categories');

const app = express();
const PORT = 4000; // Выбираем порт для бэкенда

// Middleware
app.use(cors()); // Разрешаем CORS-запросы
app.use(express.json()); // Позволяем серверу принимать JSON в теле запроса

// Transactions
app.use('/api/transactions', transactionsRouter);

// Categories
app.use('/api/categories', categoriesRouter);

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});