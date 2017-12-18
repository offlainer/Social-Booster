const express = require('express');
const router = express.Router();
const Page = require('../classes/page/page');
const log = require('../config/eye')('router[workspace]');

router.get('/', (req, res) => {
    log.info('Go to the workspace page');

    if (req.isAuthenticated()) {
        let page = new Page({
            id : 'workspace',
            content : {
                user : req.user
            },
            message : {
                info : {
                    body : 'Здесь находятся все доступные вам операции ' +
                    'над необъятным пространством социальных сетей.\n\n ' +
                    'Представьте, что вы хирург, а это ваш операционный стол ' +
                    'на котором лежит пациент - социальная сеть :)\n\n' +
                    'Let it go!'
                }
            }
        });
        page.message.info.head = `Вас приветствует клиентская платформа проекта ${page.getTitle()}!`;

        res.render(page.id, { page : page });
    } else {
        log.info(`Can't show the page. User is not authorized`);

        res.redirect('/');
    }
});

module.exports = router;