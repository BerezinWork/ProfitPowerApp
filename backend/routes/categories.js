const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

// GET /api/categories - Получить все категории
router.get('/api/categories', async (req, res) => {
    try {
        const data = await fs.readFile('./data.json', 'utf-8');
        const db = JSON.parse(data);
        res.json(db.categories);
    } catch (error) {
        console.error('Ошибка при чтении файла data.json:', error);
        res.status(500).json({ message: 'Ошибка на сервере' });
    }
});

// POST /api/categories - Добавить категорию
router.post('/', async (req, res) => {
    try {
        // 1. Получаем данные из тела запроса
        const { type, name } = req.body;

        // 2. Валидация: проверяем, что все нужные данные пришли
        if (!type || !name || (type !== 'expense' && type !== 'income')) {
            return res.status(400).json({ message: 'Неверные данные: укажите тип (expense/income) и название категории' });
        }

        // 3. Читаем текущие данные из файла
        const data = await fs.readFile('./data.json', 'utf-8');
        const db = JSON.parse(data);

        // 4. Проверяем, существует ли такая категория, чтобы избежать дубликатов
        if (db.categories[type].includes(name)) {
            return res.status(409).json({ message: 'Такая категория уже существует' }); // 409 Conflict
        }

        // 5. Добавляем новую категорию в нужный массив (expense или income)
        db.categories[type].push(name);

        // 6. Перезаписываем файл data.json с новыми данными
        await fs.writeFile('./data.json', JSON.stringify(db, null, 2));

        // 7. Отправляем успешный ответ с обновленным списком категорий этого типа
        res.status(201).json(db.categories[type]);

    } catch (error) {
        console.error('Ошибка при добавлении категории:', error);
        res.status(500).json({ message: 'Ошибка на сервере' });
    }
});

// DELETE /api/categories - Удалить категорию
router.delete('/', async (req, res) => {
    try {
        const { type, name } = req.body;
        if (!type || !name) {
            return res.status(400).json({ message: 'Укажите тип и название категории' });
        }

        const data = await fs.readFile('./data.json', 'utf-8');
        const db = JSON.parse(data);

        if (!db.categories[type]) {
            return res.status(404).json({ message: 'Тип категории не найден' });
        }

        const initialLength = db.categories[type].length;
        db.categories[type] = db.categories[type].filter(c => c !== name);

        if (db.categories[type].length === initialLength) {
            return res.status(404).json({ message: 'Категория для удаления не найдена' });
        }

        await fs.writeFile('./data.json', JSON.stringify(db, null, 2));
        res.status(200).json({ message: 'Категория успешно удалена' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка на сервере' });
    }
});

// PUT /api/categories - Редактировать категорию
router.put('/', async (req, res) => {
    try {
        const { type, oldName, newName } = req.body;
        if (!type || !oldName || !newName) {
            return res.status(400).json({ message: 'Укажите тип, старое и новое название' });
        }

        const data = await fs.readFile('./data.json', 'utf-8');
        const db = JSON.parse(data);

        if (!db.categories[type]) {
            return res.status(404).json({ message: 'Тип категории не найден' });
        }

        const categoryIndex = db.categories[type].findIndex(c => c === oldName);
        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Категория для редактирования не найдена' });
        }

        db.categories[type][categoryIndex] = newName;

        await fs.writeFile('./data.json', JSON.stringify(db, null, 2));
        res.status(200).json(db.categories[type]);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка на сервере' });
    }
});

module.exports = router;