const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

// GET /api/transactions - Получить все транзакции
router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile('./data.json', 'utf-8');
        const db = JSON.parse(data);
        res.json(db.transactions);
    } catch (error) {
        console.error('Ошибка при чтении файла data.json:', error);
        res.status(500).json({ message: 'Ошибка на сервере' });
    }
});

// GET /api/transactions/:id - Получить одну транзакцию по ID
router.get('/:id', async (req, res) => {
    try {
        // 1. Получаем ID из параметров URL (например, из /api/transactions/t123)
        const { id } = req.params;

        // 2. Читаем наш файл с данными
        const data = await fs.readFile('./data.json', 'utf-8');
        const db = JSON.parse(data);

        // 3. Используем метод .find() для поиска транзакции с нужным ID
        const transaction = db.transactions.find(t => t.id === id);

        // 4. Проверяем, была ли транзакция найдена
        if (transaction) {
            // Если да - отправляем ее клиенту
            res.json(transaction);
        } else {
            // Если нет - отправляем ошибку 404 (Not Found)
            res.status(404).json({ message: 'Транзакция не найдена' });
        }
    } catch (error) {
        console.error('Ошибка при поиске транзакции:', error);
        res.status(500).json({ message: 'Ошибка на сервере' });
    }
});

// POST /api/transactions - Создать новую транзакцию
router.post('/', async (req, res) => {
    try {
        // 1. Получаем новую транзакцию из тела запроса
        const newTransaction = req.body;

        // 2. Простая валидация: проверяем, что есть хотя бы сумма и категория
        if (!newTransaction.amount || !newTransaction.category) {
            return res.status(400).json({ message: 'Недостаточно данных для создания транзакции' });
        }

        // 3. Читаем текущие данные из файла
        const data = await fs.readFile('./data.json', 'utf-8');
        const db = JSON.parse(data);

        // 4. Генерируем простой уникальный ID для новой транзакции
        // (В реальном приложении лучше использовать UUID, но для начала этого хватит)
        newTransaction.id = 't' + Date.now();

        // 5. Добавляем новую транзакцию в массив
        db.transactions.push(newTransaction);

        // 6. Перезаписываем файл data.json с новыми данными
        // JSON.stringify(db, null, 2) делает JSON-файл красивым и читаемым
        await fs.writeFile('./data.json', JSON.stringify(db, null, 2));

        // 7. Отправляем успешный ответ с созданной транзакцией
        res.status(201).json(newTransaction);

    } catch (error) {
        console.error('Ошибка при записи в файл data.json:', error);
        res.status(500).json({ message: 'Ошибка на сервере' });
    }
});

// DELETE /api/transactions/:id - Удалить транзакцию
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fs.readFile('./data.json', 'utf-8');
        const db = JSON.parse(data);

        const initialLength = db.transactions.length;
        // Оставляем только те транзакции, у которых id НЕ совпадает с удаляемым
        db.transactions = db.transactions.filter(t => t.id !== id);

        if (db.transactions.length === initialLength) {
            return res.status(404).json({ message: 'Транзакция для удаления не найдена' });
        }

        await fs.writeFile('./data.json', JSON.stringify(db, null, 2));
        res.status(200).json({ message: 'Транзакция успешно удалена' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка на сервере' });
    }
});

// PUT /api/transactions/:id - Редактировать транзакцию
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const data = await fs.readFile('./data.json', 'utf-8');
        const db = JSON.parse(data);

        const transactionIndex = db.transactions.findIndex(t => t.id === id);

        if (transactionIndex === -1) {
            return res.status(404).json({ message: 'Транзакция для редактирования не найдена' });
        }

        // Обновляем объект, сохраняя старые поля, если новые не переданы
        const originalTransaction = db.transactions[transactionIndex];
        db.transactions[transactionIndex] = { ...originalTransaction, ...updatedData };

        await fs.writeFile('./data.json', JSON.stringify(db, null, 2));
        res.status(200).json(db.transactions[transactionIndex]); // Возвращаем обновленный объект
    } catch (error) {
        res.status(500).json({ message: 'Ошибка на сервере' });
    }
});

module.exports = router;