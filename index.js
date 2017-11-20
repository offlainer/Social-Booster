/* Подключаем приложение */
const express = require('express');
const app = express();
/* Инициализируем маршруты */

// Включаем посредника для страницы аутентификации
const auth = require('./routes/auth');

// Роутим запрос авторизации
app.use('/auth', auth);
// Роутим дефолтный запрос
app.get('/', (req, res) => res.send('Hello'));
// Запускаем сервер
app.listen(3000, () => console.log('Server is started'));