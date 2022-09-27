const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql2 = require('mysql2');

const billRouter = require('./routes/bill');
const memberRouter = require('./routes/member');
const generalRouter = require('./routes/general');
const sequelize = require('./models').sequelize;
const { swaggerUi, specs } = require('./swagger/swagger');

const { appendFileSync } = require('fs');

require("dotenv").config({ path: ".env" });

const app = express();

(async () => {
    await sequelize.sync();
})();

app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/bill', billRouter);
app.use('/api/member', memberRouter);
app.use('/api', generalRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));


// 404 미들웨어
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    // res.render('error');
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기중");
});