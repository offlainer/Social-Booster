/* Подключаем приложение */
const express = require('express');
const app = express();
// Включаем посредника для страницы аутентификации
const auth = require('./routes/auth');

/* Задаем конфиг для приложения */
// Название приложения
app.set('project_name', 'Social Booster');
// Устанавливаум папку ресурсов по умолчанию
app.use(express.static('public'));
// Устанавливаум twig как шаблонизатор по умолчанию
app.set('views', './views');
app.set('view engine', 'twig');

/* Инициализируем маршруты */
// Роутим запрос авторизации
app.use('/auth', auth);
// Роутим дефолтный запрос
app.get('/', (req, res) => res.render('index', { title : app.get('project_name')}));
// Запускаем сервер
app.listen(3000, () => console.log('Server is started'));