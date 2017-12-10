/* Запускаем приложение */
const express = require('express');
const app = express();
const config = require('./config/config')(__dirname);
const log = require('./config/eye')('core');
const passport = require('./config/passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const client = require('./routes/client');

/* Инициализируем middlewares */
// Устанавливаум папку ресурсов по умолчанию
app.use(express.static('public'));
// Устанавливаум cookie
app.use(session({
    secret: "sb0prj",
    cookie: { maxAge: 1000 * 60 * 5}
}));
// Устанавливаум twig как шаблонизатор по умолчанию
app.set('views', config.viewRoot);
app.set('view engine', config.appEngine);
// Подключаем парсер запросов
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//* Инициализируем passport и сессию пользователя */
app.use(passport.initialize());
app.use(passport.session());

/* Инициализируем маршруты */
// Обрабатываем запрос авторизации
app.use('/auth', auth);
// Обрабатываем запросы от клиента
app.use('/client', client);
// Обрабатываем запрос страницы профиля
app.use('/profile', profile);

// Роутим home запрос
app.get('/', (req, res) => {
    log.info('Route to the home page');

    res.render('index', { title : config.appName, user : req.user });
});
// Роутим logout-запрос
app.get('/logout', (req, res) => {
    if (req.user) {
        log.done(`User ${req.user.name} is logout now`);
        req.logout();
    }
    res.redirect('/');
});

// Запускаем сервер
app.listen(config.port, () => {
    log.info(`Server is run on port: ${config.port}`);
    log.info('Application is running');
    log.info('Config is loaded');
});


