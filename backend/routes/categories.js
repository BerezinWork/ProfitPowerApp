const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

// GET /api/categories - Получить все категории
router.get('/', async (req, res) => {
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
        const { type, name } = req.body;
        // ... (валидация остается той же) ...
        const data = await fs.readFile('./data.json', 'utf-8');
        const db = JSON.parse(data);

        // Проверяем, что категории с таким именем еще нет
        const alreadyExists = db.categories[type].some(cat => cat.name === name);
        if (alreadyExists) {
            return res.status(409).json({ message: 'Такая категория уже существует' });
        }

        // Создаем новый объект категории с уникальным ID
        const newCategory = {
            id: `cat-${type.slice(0, 3)}-${Date.now()}`, // Например: 'cat-exp-1700000000000'
            name: name
        };
        db.categories[type].push(newCategory);

        await fs.writeFile('./data.json', JSON.stringify(db, null, 2));
        res.status(201).json(db.categories[type]);
    } catch (error) { res.status(500).json({ message: 'Ошибка на сервере' }); }
});

// PUT /api/categories - Редактировать (переименовать) категорию
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name: newName, type } = req.body; // Получаем новое имя и тип из тела
        if (!newName || !type) {
            return res.status(400).json({ message: 'Укажите новое имя и тип категории' });
        }

        const data = await fs.readFile('./data.json', 'utf-8');
        const db = JSON.parse(data);

        const category = db.categories[type].find(c => c.id === id);
        if (!category) {
            return res.status(404).json({ message: 'Категория для редактирования не найдена' });
        }

        category.name = newName; // Меняем имя найденного объекта

        await fs.writeFile('./data.json', JSON.stringify(db, null, 2));
        res.status(200).json(db.categories[type]);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка на сервере' });
    }
});

// DELETE /api/categories/:id - Удалить категорию по ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.body; // Тип нужен, чтобы знать, в каком массиве искать
        if (!type) {
            return res.status(400).json({ message: 'Укажите тип категории' });
        }

        const data = await fs.readFile('./data.json', 'utf-8');
        const db = JSON.parse(data);

        const initialLength = db.categories[type].length;
        // Фильтруем массив, оставляя все, кроме категории с нужным ID
        db.categories[type] = db.categories[type].filter(c => c.id !== id);

        if (db.categories[type].length === initialLength) {
            return res.status(404).json({ message: 'Категория для удаления не найдена' });
        }

        await fs.writeFile('./data.json', JSON.stringify(db, null, 2));
        res.status(200).json({ message: 'Категория успешно удалена' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка на сервере' });
    }
});

module.exports = router;