/* Запускаем приложение */
const express = require('express');
const app = express();
const parser = require('body-parser');
const config = require('./config/config')(__dirname);
const auth = require('./routes/auth');

// Устанавливаум папку ресурсов по умолчанию
app.use(express.static('public'));
// Устанавливаум twig как шаблонизатор по умолчанию
app.set('views', config.viewRoot);
app.set('view engine', config.appEngine);
// Подключаем парсер post-запросов
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

/* Инициализируем маршруты */
// Обрабатываем запрос авторизации
app.use('/auth', auth);
// Роутим дефолтный запрос
app.get('/', (req, res) => {
    res.render('index', { title : config.appName });
});

// Запускаем сервер и
app.listen(config.port, () => {
    console.log('Server is run on port: ' + config.port);
    console.log('Application is running');
    console.log('Config is loaded');
});


