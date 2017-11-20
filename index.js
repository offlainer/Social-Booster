/* Подключаем приложение */
const express = require('express');
const app = express();
// Включаем посредника для страницы аутентификации
const auth = require('./routes/auth');
// Устанавливаум twig как шаблонизатор по умолчанию
app.set('views', './views');
app.set('view engine', 'twig');
/* Конфигурируем приложение */
// Название приложения
app.set('project_name', 'Social Booster');
/* Инициализируем маршруты */
// Роутим запрос авторизации
app.use('/auth', auth);
// Роутим дефолтный запрос
app.get('/', (req, res) => res.render('layout', { title : app.get('project_name')}));
// Запускаем сервер
app.listen(3000, () => console.log('Server is started'));