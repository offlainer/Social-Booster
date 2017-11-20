const express = require('express');
const app = express();

// Роутим дефолтный запрос
app.get('/', (req, res) => res.send('Hello'));
// Запускаем сервер
app.listen(3000, () => console.log('Server is started'));