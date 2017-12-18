/* Запускаем приложение */
const express = require('express');
const app = express();
const config = require('./config/config')(__dirname);
const log = require('./config/eye')('core');
const passport = require('./config/passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const client = require('./routes/client');
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const workspace = require('./routes/workspace');
const Page = require('./classes/page/page');

/* Инициализируем обработчики запросов */
// Устанавливаум папку ресурсов по умолчанию
app.use(express.static('public'));
// Устанавливаум cookie
app.use(session({
    secret: "sb0prj",
    cookie: { maxAge: 1000 * 60 * 3}
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
// Обрабатываем запрос страницы панели
app.use('/workspace', workspace);

// Роутим home запрос
app.get('/', (req, res) => {
    log.info('Route to the home page');

    let page = new Page({
        id : 'index',
        content : {
            user : req.user
        }
    });

    res.render(page.id, {page : page});
});
// Роутим logout-запрос
app.get('/logout', (req, res) => {
    log.info(`Try to logout user ${req.user.email}}`);

    if (req.user) {
        log.done(`User ${req.user.email} is logout now`);
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


